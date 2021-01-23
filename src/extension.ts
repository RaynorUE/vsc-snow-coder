import * as vscode from 'vscode';
import { WSFileMan } from './FileMan/WSFileMan';

import { ActivateCommandsInstance } from './commands/ActivateCommandsInstance';
import { SystemLogHelper } from './classes/LogHelper';

export const snichOutput = vscode.window.createOutputChannel('S.N.I.C.H.');
export let extensionContext: vscode.ExtensionContext; //for imports into other classes.



export async function activate(context: vscode.ExtensionContext) {

    extensionContext = context;

    let logger = new SystemLogHelper();
    let lib = "extension.ts";
    let func = "activate";
    logger.info(lib, func, "ENTERING");

    let wsFileMan = new WSFileMan(logger);
    let validWorkspace = await wsFileMan.validateWorkspace();

    logger.debug(lib, func, "Valid Workspace? ", validWorkspace);

    if (validWorkspace == undefined) {
        let errorSelection = await vscode.window.showErrorMessage("Workspace not setup. Please open a workspace or a folder.", "Open", "Cancel");
        if (errorSelection == "Open") {
            vscode.commands.executeCommand('workbench.action.files.openFolder');
            deactivate();
            return;
        } else if (errorSelection == "Cancel") {
            deactivate();
            return;
        }
    } else if (validWorkspace == false) {
        //we have a workspace folder open. Set it up!
        await wsFileMan.setupWorkspace();
    }


    vscode.commands.registerCommand('snich.instance.setup', () => new ActivateCommandsInstance().setup());
    /*vscode.commands.registerCommand('snich.instance.setup.new_table', new ActivateCommandsInstance().configureTable);
    vscode.commands.registerCommand('snich.instance.test_connection', new ActivateCommandsInstance().testConnection);
    vscode.commands.registerCommand('snich.instance.pull_record', new ActivateCommandsInstance().pullRecord);*/


    logger.info(lib, func, "LEAVING");

}


export function deactivate() {

    /**
     * Cleanup? When does the extension deactivate? I don't think there is a cleanup scenario
     */
}