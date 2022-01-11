import * as vscode from 'vscode';
import * as crypto from 'crypto';
import { BackFileMan } from './BackFileMan';
import { SNICHLogger } from '../SNICH/SNICHLogger/SNICHLogger';
import { currentSNRelease } from '../extension';


/**
 * Used to re/write files in the context of the Workspace folder path
 */

const fs = vscode.workspace.fs;


export class WSFileMan {

    type = "WSFileMan";
    private logger: SNICHLogger;

    constructor(logger: SNICHLogger) {
        this.logger = logger;
    }

    getWSRootUri(): vscode.Uri | undefined {
        let rootUri: vscode.Uri | undefined = undefined;
        const wsFolders = vscode.workspace.workspaceFolders
        if (wsFolders && wsFolders[0]) {
            const rootFolder = wsFolders[0];
            rootUri = rootFolder.uri;
        }
        return rootUri;
    }

    /**
     * will check to see if the current workspace root is actually a SNICH root... This is to account for times when people open the "Instance named" folder instead of the "workspace" folder they used during setup..
     * 
     * @return True: All good, False: Have a workspace folder but not configured, Undefined: No workspace folder open.
     */
    async validateWorkspace(): Promise<WorkspaceValidity> {
        var func = "validateWorkspace"
        this.logger.info(this.type, func, "ENTERING");
        const wsRoot = this.getWSRootUri();
        let wsValidity:WorkspaceValidity = undefined;

        if (wsRoot) {
            
            try {
                let rootContents = await fs.readDirectory(wsRoot);

                if(rootContents.length === 0){
                    wsValidity = 'empty';
                } else if(rootContents.length > 0){
                    wsValidity = "not_empty";
                    if(rootContents.find((item) => item[0] == '.snich')){
                        wsValidity  = "has_dot_snich";
                    }
                }

            } catch (e) {
                wsValidity = undefined;
            }


        } else {
            wsValidity = 'multiple_workspace_root_folders';
        }
        this.logger.info(this.type, func, "LEAVING");

        return wsValidity;
    }

    /**
     * Used to setup the current workspace. Will handle things such as the .vscode config, and "exclude folders", etc.
     * Will also handle validation checks, etc. 
     * Will be called on first instance creation or on activation and an instance is already configured (To ensure workspace config stays current)
     */
    async setupNewWorkspace() {
        let func = "setupWorkspace";
        this.logger.info(this.type, func, "ENTERIN");
        const wsRoot = this.getWSRootUri();
        if (!wsRoot) {
            throw new Error('Workspace is not loaded! Cannot proceed with setup. This was likely called in error!');
        }

        await Promise.all([
            this.configureDotSnichFolder(wsRoot),
            this.configureDotVScodeSettings(),
            this.configureTypeFiles(wsRoot),
            this.configureJSConfigJSON(wsRoot)
        ]);

        this.logger.info(this.type, func, "LEAVING");
        return 
    }

    async configureDotSnichFolder(wsRoot: vscode.Uri) {
        //always make sure our .snich folder is created in the WSRoot..

        return await fs.createDirectory(vscode.Uri.joinPath(wsRoot, '.snich'));
    }

    async configureTypeFiles(wsRoot: vscode.Uri) {
        await Promise.all([
            this.configureServerTypeFiles(wsRoot),
            this.configureClientTypeFiles(wsRoot)
        ]);
    }

    async configureClientTypeFiles(wsRoot: vscode.Uri) {

        let sourceTypeFile = await new BackFileMan().getClientTSDef();
        let existingTSFilePath = vscode.Uri.joinPath(wsRoot, '.snich', '@types', 'GlideSoft', 'client.d.ts');
        let existingTSFile = undefined;
        let writeFile = true;

        let fileResult = undefined;

        try {
            existingTSFile = await fs.readFile(existingTSFilePath);
        } catch (e) {
            existingTSFile = undefined;
        }

        if (existingTSFile) {
            //compare and set write file flag
            let sourceContentHash = crypto.createHash('md5').update(sourceTypeFile).digest("hex");
            let existingContentHash = crypto.createHash('md5').update(existingTSFile).digest("hex");

            if (sourceContentHash == existingContentHash) {
                writeFile = false;
            }
        }

        if (writeFile) {
            fileResult = await fs.writeFile(existingTSFilePath, sourceTypeFile);
        }

        return fileResult;
    }

    async configureServerTypeFiles(wsRoot: vscode.Uri) {
        const func = 'configureServerTypeFiles';
        this.logger.info(this.type, func, `ENTERING`);

        let res = true;

        const myTypesWin = vscode.workspace.getConfiguration().get('snich.myTypesWin');
        this.logger.debug(this.type, func, `myTypesWin: `,myTypesWin === false ? 'is false' : 'is not false');
        const backFM = new BackFileMan();
        const sourceTypeFolder = await backFM.getServerTSDefFolder(currentSNRelease);


        if(sourceTypeFolder){

            for(let i = 0; i < sourceTypeFolder.length; i++){
                const item = sourceTypeFolder[i];
                
                let fileName = item[0];
                this.logger.debug(this.type, func, `fileName: `,fileName);

                let sourceTSFile = await backFM.getServerTSDef(currentSNRelease, fileName);
                if(sourceTSFile){
                    this.logger.debug(this.type, func, `Got a SourceTS File`);
                    let existingTSFilePath = vscode.Uri.joinPath(wsRoot, `@types`, `GlideSoft`, `ServerScoped`, currentSNRelease, fileName);

                    let existingTSFile = undefined;
                    let writeFile = true;

                    try {
                        existingTSFile = await fs.readFile(existingTSFilePath)
                    } catch(e){
                        existingTSFile = undefined;
                        res = false;
                    }

                    if(existingTSFile){
                        this.logger.debug(this.type, func, `Got existing TS File!`);
                        let sourceContentHash = crypto.createHash('md5').update(sourceTSFile).digest('hex');
                        let existingContentHash = crypto.createHash('md5').update(existingTSFile).digest('hex');

                        if(sourceContentHash == existingContentHash || (myTypesWin && existingTSFile)){
                            writeFile = false;
                        }


                    }

                    if(writeFile){
                        try {
                            await fs.writeFile(existingTSFilePath, sourceTSFile);
                        } catch(e){
                            res = false;
                        }
                    }
                } else {
                    res = false;
                }
            }
        } else {
            res = false;
        }

        this.logger.info(this.type, func, `LEAVING`);

        return res;

    }

    async configureDotVScodeSettings() {
        const func = 'configureDotVScodeSettings';
        this.logger.info(this.type, func, `ENTERING`);

        let result = false;

        try {

            let settings = vscode.workspace.getConfiguration();
            let filesExclude: WSDotVscodeSettings.FilesExclude = settings.get('files.exclude') || {};

            filesExclude['**/.snich'] = filesExclude['**/.snich'] == undefined ? true : filesExclude['**/.snich'];
            filesExclude['**/.vscode'] = filesExclude['**/.vscode'] == undefined ? true : filesExclude['**/.vscode'];
            filesExclude['**/jsconfig.json'] = filesExclude['**/jsconfig.json'] == undefined ? true : filesExclude['**/jsconfig.json'];
            filesExclude['@types'] = filesExclude['@types'] == undefined ? true : filesExclude['@types'];

            let searchExclude: WSDotVscodeSettings.SearchExclude = settings.get('search.exclude') || {};

            searchExclude['**/.snich'] = searchExclude['**/.snich'] == undefined ? true : searchExclude['**/.snich'];
            searchExclude['**/.vscode'] = searchExclude['**/.vscode'] == undefined ? true : searchExclude['**/.vscode'];
            searchExclude['**/jsconfig.json'] = searchExclude['**/jsconfig.json'] == undefined ? true : searchExclude['**/jsconfig.json'];
            searchExclude['@types'] = searchExclude['@types'] == undefined ? true : searchExclude['@types'];

            //update workspace .vscode settings
            await settings.update('files.exclude', filesExclude, false);
            await settings.update('search.exclude', searchExclude, false);
            this.logger.debug(this.type, func, `Finished settings updates`);
            result = true;
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`, result);
        }

        return result;

    }

    async configureJSConfigJSON(wsRoot: vscode.Uri) {

        let JSConfigFilePath = vscode.Uri.joinPath(wsRoot, 'jsconfig.json');
        let JSConfigFile = undefined;
        let fileResult = undefined;

        try {
            JSConfigFile = await fs.readFile(JSConfigFilePath);
        } catch (e) {
            JSConfigFile = undefined;
        }

        if (!JSConfigFile) {
            let JSConfigFileData = {
                "snich.comment": "This file exists to make the type definitions work. You are welcome to add other properties in here to control behavior of JS files. Please review the JSconfig.json documentation on the vscode website."
            }
            fileResult = await fs.writeFile(JSConfigFilePath, Buffer.from(JSON.stringify(JSConfigFileData, null, '\t')));
        }
        return fileResult;
    }

    async setDebugMode(flag: boolean) {
        const func = 'setupDebugMode';
        this.logger.info(this.type, func, `ENTERING`);

        let result = false;

        try {

            let settings = vscode.workspace.getConfiguration();
            let filesExclude: WSDotVscodeSettings.FilesExclude = settings.get('files.exclude') || {};

            filesExclude['**/.snich'] = !flag;
            filesExclude['**/.vscode'] = !flag;
            filesExclude['**/jsconfig.json'] = !flag;

            await settings.update('files.exclude', filesExclude, false);
            result = true;


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }
}

declare type WorkspaceValidity = undefined | "has_dot_snich" | "empty" | "not_empty" | "multiple_workspace_root_folders";