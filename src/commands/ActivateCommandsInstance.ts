import * as vscode from 'vscode';
import { extensionContext } from '../extension2';
import { SystemLogHelper } from '../classes/LogHelper';

export class ActivateCommandsInstance {

    lib = `ActivateCommandsInstance`;

    constructor() { }

    async setup() {
        let logger = new SystemLogHelper();
        let func = 'setup.new_instance';
        logger.info(this.lib, func, 'START');
        await instanceList.setupNew();
        logger.info(this.lib, func, 'END');
    }

    async testConnection() {
        let logger = new SystemLogHelper();
        let func = 'testConnection';
        logger.info(this.lib, func, 'START');

        if (!instanceList.atLeastOneConfigured()) {
            return;
        }

        let selectedInstance = await instanceList.selectInstance();
        if (selectedInstance) {
            let client = new RESTClient(selectedInstance, logger);
            await client.testConnection();
        }
        logger.info(this.lib, func, 'END', instanceList);
    }

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
}