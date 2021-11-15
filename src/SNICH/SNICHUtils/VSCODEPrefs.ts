import * as vscode from 'vscode';

export class VSCODEPrefs {
    constructor() { }

    getMultiFieldSep() {

        let settings = vscode.workspace.getConfiguration();
        let multiFieldNameSep: string = settings.get('snich.syncedRecordNameSeparator') || "^";
        return multiFieldNameSep;
    }

    fileInvalCharSub(): string {
        //get the substitution character for bad "file name characters" in windows. 
        let settings = vscode.workspace.getConfiguration();
        let char = settings.get<string>('snich.fileInvalCharSub.win32');
        if(!char){
            char = ""; //just strip it if not specified.
        }
        return char;
    }
}