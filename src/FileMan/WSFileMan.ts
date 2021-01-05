import * as vscode from 'vscode';


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
     * Adjust the .vscode/settings.json file so that the files.excluded shows the .vscode folder..
     */
    async showDotVSCodeFolder() {

    }

    async hideDotVSCodeFolder() {

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

        //look for .vscode folder at WS Root.

        //configure the settings file, to hide the folders and files that do not need to be shown..

        //copy over @types files

        //create jsconfig.json

    }


    async configureDotVScodeSettings() {
        const wsRoot = this.getWSRootUri();

        let fileResult = undefined;

        if (!wsRoot) {
            return fileResult;
        }

        let existingSettingsData: WSDotVscodeSettings = {};
        let dotSettingsPath = vscode.Uri.joinPath(wsRoot, './vscode', 'settings.json');

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


    async getDotVScodeSettings() {
        const wsRoot = this.getWSRootUri();

        if (!wsRoot) {
            return undefined;
        }

        fs.readFile(vscode.Uri.joinPath(wsRoot, '.vscode', 'settings.json'))

        return
    }

}