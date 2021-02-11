import { SystemLogHelper } from '../classes/LogHelper';
import { SNICHInstance } from '../SNICH/SNICHInstance/SNICHInstance';
import * as vscode from 'vscode';

export class ActivateCommandsInstance {

    type = `ActivateCommandsInstance`;

    constructor() { }

    async setup() {
        let logger = new SystemLogHelper();
        let func = 'setup.new_instance';
        logger.info(this.type, func, 'START');
        await new SNICHInstance(logger).setup();
        logger.info(this.type, func, 'END');
    }


    async testConnection() {
        let logger = new SystemLogHelper();
        let func = 'testConnection';
        logger.info(this.type, func, 'START');

        let sInstance = new SNICHInstance(logger);
        let loadResult = await sInstance.load();

        if (loadResult == false) {
            vscode.window.showWarningMessage('Test connection aborted! No instance selected!');
        } else if (loadResult == undefined) {
            vscode.window.showErrorMessage('Got here and no instances were available. Odd...');
        } else if (loadResult == true) {

            let connResult = await sInstance.connection.testConnection();
            logger.debug(this.type, func, `connResult: `, connResult);
            if (connResult) {
                vscode.window.showInformationMessage('Test connection succesful!');
            } else {
                vscode.window.showErrorMessage('Test connection failed!');
            }

        } else {
            throw new Error('Weird.. super weird..');
        }

        logger.info(this.type, func, 'END');
    }
    /*

    async pullRecord() {
        let logger = new SystemLogHelper();
        let func = 'pullRecord';
        logger.info(this.lib, func, 'START');
        if (!instanceList.atLeastOneConfigured()) {
            return;
        }
        let filePuller = new SNFilePuller(instanceList, logger);

        await filePuller.syncRecord();
        logger.info(this.lib, func, 'END', instanceList);
    }

    async configureTable() {
        let logger = new SystemLogHelper();
        let func = 'snich.instance.setup.new_table';
        logger.info(this.lib, func, 'START');

        if (!instanceList.atLeastOneConfigured()) {
            return;
        }
        let selectedInstance: InstanceMaster = await instanceList.selectInstance();
        if (!selectedInstance) {
            vscode.window.showWarningMessage('Table Configuration Aborted.');
            return undefined;
        }
        await selectedInstance.tableConfig.syncNew(selectedInstance);
        logger.info(this.lib, func, 'END', instanceList);
    }
    */
}