import { SystemLogHelper } from "../../classes/LogHelper";
import * as vscode from 'vscode';
import { SNICHTableConfigService } from "./SNICHTableConfigService";


export class SNICHTableConfig {

    private data: SNICHConfig.TableConfig = {
        _id: undefined,
        instance_id: "",
        tables: []
    };

    logger: SystemLogHelper;
    type = "SNICHTableConfig";
    constructor(logger: SystemLogHelper) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    async load(instanceId?: string) {
        var func = 'load';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `instanceId: `, instanceId);

        if (!instanceId) {
            this.logger.info(this.type, func, `LEAVING`);
            throw new Error('Attempted to load an SNICHConnection without an instance ID. This would be fruitless.');
        } else {
            const tConfigSrv = new SNICHTableConfigService(this.logger);
            let foundTConfig = await tConfigSrv.getByInstanceId(instanceId);
            if (foundTConfig) {
                this.setData(foundTConfig);
            } else {
                this.logger.debug(this.type, func, `Cannot find connection by instance_id, but instance_id provided.`);

                /** @todo load tables using preferences. */

                this.data.instance_id = instanceId;
                await this.save();
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }

    async save() {
        var func = 'save';
        this.logger.info(this.type, func, `ENTERING`);
        const tConfigSrv = new SNICHTableConfigService(this.logger);
        if (this.data._id) {
            await tConfigSrv.update(this.data._id, this.getData());
        } else {
            let insertResult = await tConfigSrv.insert(this.getData());
            if (insertResult) {
                this.setData(insertResult); //so we store _id in class/memory
            }
        }

        await this.saveToInstance(); //always save to instance if we're saving.

        this.logger.info(this.type, func, `LEAVING`);
    }

    /**
     * Make a call to the 
     */
    async loadFromInstance() {
        //Always grabs the tableConfig JSON array from the instance, and loads them into the DB
        /** 
         * @todo Call SNICHPreferences here, which will have a method to load table config. Which will handle preference id, username, connection
         * This method is to handle writing to back to the DB once pulled. 
         */

    }

    async saveToInstance() {
        //always save all tableConfigs in a JSON Array system preference.
        /** 
         * @todo call SNICHPreferences here, which will have a method to save tableConfig, which will handle preference id, username, all the things...
         * This method is really just to gather up the tables and save them to the user preferences on SN.
         */
    }

    /**
     * Does this live on SNICHInstance? It is an "Instance action..? Yea, I think so... since it's only really needed on "first time setup?"
     */
    async createDefaults() {

    }

    async setup() {
        var func = 'setup';
    }

    getData() {
        return this.data;
    }

    setData(data: SNICHConfig.TableConfig) {
        this.data = data;
    }


}
