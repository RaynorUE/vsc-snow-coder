import * as vscode from 'vscode';

export class VSCODEPrefs {
    constructor() { }

    getMultiFieldSep() {

        let settings = vscode.workspace.getConfiguration();
        let multiFieldNameSep: string = settings.get('snich.syncedRecordNameSeparator') || "^";
        return multiFieldNameSep;
    }
}