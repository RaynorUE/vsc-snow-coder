import * as vscode from 'vscode';
import * as crypto from 'crypto';
import { BackFileMan } from './BackFileMan';


/**
 * Used to re/write files in the context of the Workspace folder path
 */

const fs = vscode.workspace.fs;


export class WSFileMan {

    constructor() {

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
     */
    async validWorkspace(): Promise<Boolean | undefined> {
        const wsRoot = this.getWSRootUri();
        let wsValidity = undefined;

        if (wsRoot) {
            wsValidity = false; //we are in a root folder for our workspace... 

            let dotSnichFolder = undefined;

            try {
                dotSnichFolder = fs.readDirectory(vscode.Uri.joinPath(wsRoot, '.snich'));
            } catch (e) {
                dotSnichFolder = undefined;
            }

            if (dotSnichFolder) {
                wsValidity = true;
            }
        }

        return wsValidity;
    }

    /**
     * Used to setup the current workspace. Will handle things such as the .vscode config, and "exclude folders", etc.
     * Will also handle validation checks, etc. 
     * Will be called on first instance creation or on activation and an instance is already configured (To ensure workspace config stays current)
     */
    async setupWorkspace() {
        const wsRoot = this.getWSRootUri();
        if (!wsRoot) {
            throw new Error('Workspace is not loaded! Cannot proceed with setup. This was likely called in error!');
        }

        await this.configureDotSnichFolder(wsRoot);


        await Promise.all([
            this.configureDotVScodeSettings(wsRoot),
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

    async configureDotVScodeSettings(wsRoot: vscode.Uri) {

        let existingSettingsData: WSDotVscodeSettings = {};
        let dotSettingsPath = vscode.Uri.joinPath(wsRoot, '.vscode', 'settings.json');

        let fileResult = undefined;

        let existingSettingsFile;
        try {
            existingSettingsFile = await fs.readFile(dotSettingsPath);
        } catch (e) {
            existingSettingsFile = undefined;
        }

        if (existingSettingsFile) {
            existingSettingsData = JSON.parse(existingSettingsFile.toString());
        }


        if (!existingSettingsData['files.exclude']) {
            existingSettingsData['files.exclude'] = {};
        }

        existingSettingsData['files.exclude']['**/.snich'] = true;
        existingSettingsData['files.exclude']['**/.vscode'] = true;

        fileResult = await fs.writeFile(dotSettingsPath, Buffer.from(JSON.stringify(existingSettingsData)));

        return fileResult;
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
    }
}