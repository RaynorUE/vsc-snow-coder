import * as vscode from 'vscode';

export class VSCODEPrefs {
    constructor() { }

    getMultiFieldSep() {

        let settings = vscode.workspace.getConfiguration();
        let multiFieldNameSep: string = settings.get('snich.syncedRecordNameSeparator') || "^";
        return multiFieldNameSep;
    }

    fileInvalCharSub() {
        //get the substitution character for bad "file name characters" in windows. 

        let settings = vscode.workspace.getConfiguration();
        return settings.get('snich.fileInvalCharSub') || ""; //just strip it if not specified.
        
    }
}