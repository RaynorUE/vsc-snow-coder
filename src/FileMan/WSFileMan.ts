import * as vscode from 'vscode';
import * as crypto from 'crypto';
import { BackFileMan } from './BackFileMan';
import { SystemLogHelper } from '../classes/LogHelper';


/**
 * Used to re/write files in the context of the Workspace folder path
 */

const fs = vscode.workspace.fs;


export class WSFileMan {

    type = "WSFileMan";
    private logger: SystemLogHelper;

    constructor(logger: SystemLogHelper) {
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
    async validateWorkspace(): Promise<Boolean | undefined> {
        var func = "validateWorkspace"
        this.logger.info(this.type, func, "ENTERING");
        const wsRoot = this.getWSRootUri();
        let wsValidity = undefined;

        if (wsRoot) {
            wsValidity = false; //we are in a root folder for our workspace... 

            let dotSnichFolder = undefined;

            try {
                dotSnichFolder = await fs.readDirectory(vscode.Uri.joinPath(wsRoot, '.snich'));
            } catch (e) {
                dotSnichFolder = undefined;
            }

            if (dotSnichFolder) {
                wsValidity = true;
            }
        }
        this.logger.info(this.type, func, "LEAVING");

        return wsValidity;
    }

    /**
     * Used to setup the current workspace. Will handle things such as the .vscode config, and "exclude folders", etc.
     * Will also handle validation checks, etc. 
     * Will be called on first instance creation or on activation and an instance is already configured (To ensure workspace config stays current)
     */
    async setupWorkspace() {
        let func = "setupWorkspace";
        this.logger.info(this.type, func, "ENTERIN");
        const wsRoot = this.getWSRootUri();
        if (!wsRoot) {
            throw new Error('Workspace is not loaded! Cannot proceed with setup. This was likely called in error!');
        }

        await this.configureDotSnichFolder(wsRoot);



        this.logger.info(this.type, func, "LEAVING");
        return await Promise.all([
            this.configureDotVScodeSettings(),
            this.configureTypeFiles(wsRoot),
            this.configureJSConfigJSON(wsRoot)
        ]);
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
        let existingTypeFilePath = vscode.Uri.joinPath(wsRoot, '.snich', '@types', 'GlideSoft', 'client.d.ts');
        let existingTypeFile = undefined;
        let writeFile = true;

        let fileResult = undefined;

        try {
            existingTypeFile = await fs.readFile(existingTypeFilePath);
        } catch (e) {
            existingTypeFile = undefined;
        }

        if (existingTypeFile) {
            //compare and set write file flag
            let sourceContentHash = crypto.createHash('md5').update(sourceTypeFile).digest("hex");
            let existingContentHash = crypto.createHash('md5').update(existingTypeFile).digest("hex");

            if (sourceContentHash == existingContentHash) {
                writeFile = false;
            }
        }

        if (writeFile) {
            fileResult = await fs.writeFile(existingTypeFilePath, sourceTypeFile);
        }

        return fileResult;
    }

    async configureServerTypeFiles(wsRoot: vscode.Uri) {

        let sourceTypeFile = await new BackFileMan().getServerTSDef();
        let existingTypeFilePath = vscode.Uri.joinPath(wsRoot, '.snich', '@types', 'GlideSoft', 'server_scoped.d.ts');
        let existingTypeFile = undefined;
        let writeFile = true;

        let fileResult = undefined;

        try {
            existingTypeFile = await fs.readFile(existingTypeFilePath);
        } catch (e) {
            existingTypeFile = undefined;
        }

        if (existingTypeFile) {
            //compare and set write file flag
            let sourceContentHash = crypto.createHash('md5').update(sourceTypeFile).digest("hex");
            let existingContentHash = crypto.createHash('md5').update(existingTypeFile).digest("hex");

            if (sourceContentHash == existingContentHash) {
                writeFile = false;
            }
        }

        if (writeFile) {
            fileResult = await fs.writeFile(existingTypeFilePath, sourceTypeFile);
        }

        return fileResult;

    }

    async configureDotVScodeSettings() {

        let settings = vscode.workspace.getConfiguration();
        let filesExclude: WSDotVscodeSettings.FilesExclude = settings.get('files.exclude') || {};


        filesExclude['**/.snich'] = true;
        filesExclude['**/.vscode'] = true;
        filesExclude['**/jsconfig.json'] = true;

        //update workspace .vscode settings
        return await settings.update('files.exclude', filesExclude, false);
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
}