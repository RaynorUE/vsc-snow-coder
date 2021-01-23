
export class ActivateCommandsSysApp {

    constructor() { }
    /*
        async loadAllAppFiles() {
            let logger = new SystemLogHelper();
            let func = 'setup.new_instance';
            logger.info(lib, func, 'START');
            await instanceList.setupNew();
            logger.info(lib, func, 'END');
        }
    
        async testConnection() {
            let logger = new SystemLogHelper();
            let func = 'setup.test_connection';
            logger.info(lib, func, 'START');
    
            if (!instanceList.atLeastOneConfigured()) {
                return;
            }
    
            let selectedInstance = await instanceList.selectInstance();
            if (selectedInstance) {
                let client = new RESTClient(selectedInstance, logger);
                await client.testConnection();
            }
            logger.info(lib, func, 'END', instanceList);
        }
        */
}