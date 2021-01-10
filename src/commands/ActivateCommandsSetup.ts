import * as vscode from 'vscode';
import { extensionContext } from '../extension2';

export class ActivateCommandsSetup {
    
    constructor(){}

    async setupNewInstance(){
        let logger = new SystemLogHelper();
        let func = 'setup.new_instance';
        logger.info(lib, func, 'START');
        await instanceList.setupNew();
        logger.info(lib, func, 'END');
    }
}