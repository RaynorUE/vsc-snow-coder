import * as vscode from 'vscode';
import {WSFileMan} from './FileMan/WSFileMan';

import { ActivateCommandsSetup } from './commands/ActivateCommandsSetup';

export const snichOutput = vscode.window.createOutputChannel('S.N.I.C.H.');
export let extensionContext: vscode.ExtensionContext; //for imports into other classes.



export async function activate(context: vscode.ExtensionContext) {
    extensionContext = context;

    let wsFileMan = new WSFileMan();
    let validWorkspace = await wsFileMan.validateWorkspace();

    if(validWorkspace == undefined){
        let errorSelection = await vscode.window.showErrorMessage("Workspace not setup. Please open a workspace or a folder.", "Open", "Cancel");
        if(errorSelection == "Open"){
            vscode.commands.executeCommand('workbench.action.files.openFolder');
            deactivate();
            return;
        } else if(errorSelection == "Cancel"){
            deactivate();
            return;
        }
    } else if (validWorkspace = false){
        //we have a workspace folder open. Set it up!
        await wsFileMan.setupWorkspace();
    }


    vscode.commands.registerCommand('snich.setup.new_instance', new ActivateCommandsSetup().setupNewInstance);

}


export function deactivate() {

    /**
     * Cleanup? When does the extension deactivate? I don't think there is a cleanup scenario
     */
}