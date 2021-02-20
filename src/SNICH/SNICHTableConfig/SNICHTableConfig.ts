import { SystemLogHelper } from "../../classes/LogHelper";
import * as vscode from 'vscode';
import { SNICHTableConfigService } from "./SNICHTableConfigService";
import { SNICHConnection } from '../SNICHConnection/SNICHConnection';


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

        let result = false;

        try {
            if (!instanceId) {
                this.logger.info(this.type, func, `LEAVING`);
                throw new Error('Attempted to load an SNICHConnection without an instance ID. This would be fruitless.');
            } else {
                const tConfigSrv = new SNICHTableConfigService(this.logger);
                let foundTConfig = await tConfigSrv.getByInstanceId(instanceId);
                if (foundTConfig) {
                    this.setData(foundTConfig);
                    result = true;
                } else {
                    this.logger.debug(this.type, func, `Cannot find TableConfig by instance_id, but instance_id provided.`);

                    /** @todo load tables using preferences. */

                    this.data.instance_id = instanceId;
                    await this.save();
                    result = true;
                }
            }
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
            return result;
        }
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

    async selectTable() {

    }

    async getTable(tableName: string) {

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

    /**
     * 
     * @param appFile Are we configuring applicaation file table? Or should we load all non-app files?
     */
    async setupTable(appFile?: Boolean) {
        var func = 'setupTable';
        this.logger.info(this.type, func, `ENTERING`);

        var sConn = new SNICHConnection(this.logger);
        await sConn.load(this.data.instance_id);


        let tableProgOpts: vscode.ProgressOptions = { location: vscode.ProgressLocation.Notification, cancellable: true, title: "SNICH: Getting tables." };

        let tableResult = undefined;
        let queryParts = [];

        if (appFile) {
            queryParts.push('super_class.name=sys_metadata');
        } else {
            queryParts.push('super_class.name!=sys_metadata');
        }

        this.logger.info(this.type, func, `ENTERING`);
        queryParts.push('ORDERBYDESCsys_updated_on');
        tableResult = await sConn.getAggregate<sys_db_object>('sys_db_object', queryParts.join('^'), ['name', 'label', 'sys_scope', 'sys_package', 'sys_scope.scope', 'sys_package.source'], 'all', tableProgOpts);
        this.logger.debug(this.type, func, `tableResult`, tableResult);



        if (!tableResult) {
            vscode.window.showErrorMessage('Failed attempting to get list of tables. Please review logs.');
            this.logger.info(this.type, func, `LEAVING`);
            return;
        }

        var tableQPs: qpWithValue[] = tableResult.map((rec) => {
            var qpItem: qpWithValue = {
                label: `${rec.label.display_value}`,
                value: rec,
                description: `${rec.name.display_value}`,
                detail: `${rec.sys_package.display_value} (${rec.sys_scope.display_value})`
            };
            return qpItem;
        })

        var tableSelection = await vscode.window.showQuickPick(tableQPs, { ignoreFocusOut: true, matchOnDescription: true, placeHolder: `Select a table.` });

        if (!tableSelection) {
            this.logger.info(this.type, func, `LEAVING`);
            vscode.window.showWarningMessage('Table setup aborted.');
            return;
        }

        let selectedTable = tableSelection.value;
        this.logger.debug(this.type, func, `selectedTable: `, selectedTable);



        /**
         * @todo get all the fields for this table
         */


        /**
         * @todo if "Name" field detected, prompt to use it, else or if no, provide QP To select name field.
         */

        /**
         * @todo Then ask if they wish to "Group by" a particular field (such as table for UI Actions).
         * Indicate that this will create sub-folders grouped by this field value.
         */

        /**
         * @todo then ask if to select additional name fields yes/no
         */

        /**
         * @todo If additional name fields, show list, allow pick many.
         */

        /**
         * @todo detect all script/xml fields and build QP of pre-selected items
         */

        /**
         * @todo then prompt use to confirm fields and select any additional to sync data from.
         */

        /**
         * @todo next, step through all "sync fields" prompting for file extension to use. Should pre-set value based on field type detected
         * Basic map: "Script" = js, "XML" = html (this is better for UI Pages), "css" = css, all else leave blank
         * @todo create a "VSCode PReference / Setting" where they can use an array of object to define the maps (We will intialize the defaults there);
         * @todo add the VSCode preference as part of instance setup (detect if it's there, and do not overwrite any existing config).
         */

        /**
         * @todo once we have all our stuff selected, store the table, and save the new config.
         * @todo present an info message that it's completed, and offer "Sync New Record" and "Sync All New App Files" (NEW Action!);
         */





        this.logger.info(this.type, func, `LEAVING`);

    }

    async addTable(tConfig: SNICHConfig.Table) {
        var func = 'addTaable';
        this.logger.info(this.type, func, `ENTERING`);

        this.data.tables.push(tConfig);
        await this.save();

        this.logger.info(this.type, func, `LEAVING`);
    }

    getData() {
        return this.data;
    }

    setData(data: SNICHConfig.TableConfig) {
        this.data = data;
    }


}


declare interface qpWithValue extends vscode.QuickPickItem {
    value: any;
}