import { SystemLogHelper } from "../../classes/LogHelper";
import * as vscode from 'vscode';
import { SNICHTableConfigService } from "./SNICHTableConfigService";
import { SNICHConnection } from '../SNICHConnection/SNICHConnection';
import { qpWithValue } from '../../extension';
import { SNICHTableCfgAsker } from "./SNICHTableCfgAsker";


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

    /**
     * Func called to "select a table" includes the VSCode quick pick prompts
     * will return selected table or undefined to be handled by calling func
     */
    async selectTable() {
        let func = 'selectTable';
        this.logger.info(this.type, func, `ENTERING`);

        let result = undefined;

        try {

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }

    async getTables() {
        let func = 'selectTable';
        this.logger.info(this.type, func, `ENTERING`);

        let result: SNICHConfig.Table[] = [];

        try {
            result = this.data.tables;
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
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
    async setupTable(appFile?: boolean) {
        var func = 'setupTable';
        this.logger.info(this.type, func, `ENTERING`);

        const yesNo: qpWithValue[] = [{ label: "$(thumbsup) Yes", value: "yes" }, { label: "$(thumbsdown) No", value: "no" }];
        const asker = new SNICHTableCfgAsker(this.logger);

        const table: SNICHConfig.Table = {
            name: "",
            additional_display_fields: [],
            display_field: "",
            fields: [],
            label: "",
            group_by: {
                extension: "",
                label: "",
                name: ""
            }
        }

        let tableResult = await this.getInstanceTables(appFile);

        if (!tableResult || tableResult.length === 0) {
            vscode.window.showErrorMessage('Failed attempting to get list of tables. Please review logs.');
            this.logger.info(this.type, func, `LEAVING`);
            return;
        }

        let existingTables = await this.getTables();

        let selectedTable = await asker.selectTable(tableResult, existingTables);
        this.logger.debug(this.type, func, `selectedTable: `, selectedTable);

        if (!selectedTable) {
            vscode.window.showErrorMessage('No table selected. Aborting setup.');
            this.logger.info(this.type, func, `LEAVING`);
            return;
        }

        table.name = selectedTable.name.value;

        let tableFields = await this.getInstanceTableFields(selectedTable.name.value);
        this.logger.debug(this.type, func, `tableFields: `, tableFields);

        let groupBy = await asker.selectGroupBy(tableFields);


        if (groupBy == undefined) {
            this.logger.info(this.type, func, `LEAVING`);
            vscode.window.showWarningMessage('Table setup aborted.');
            return;
        }

        if (groupBy) {
            table.group_by = groupBy;
        }

        let nameField = await asker.selectNameField(tableFields);



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

    private getInstanceId() {
        return this.data.instance_id;
    }


    async getInstanceTables(appFile?: boolean) {
        var func = 'getInstanceTables';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `appFile: `, appFile);

        let tablesResult: sys_db_object[] = [];

        try {
            var sConn = new SNICHConnection(this.logger);
            await sConn.load(this.data.instance_id);

            let queryParts = [];

            if (appFile) {
                queryParts.push('super_class.name=sys_metadata');
            } else {
                queryParts.push('super_class.name!=sys_metadata');
            }

            queryParts.push('ORDERBYDESCsys_updated_on');

            let tableProgOpts: vscode.ProgressOptions = { location: vscode.ProgressLocation.Notification, cancellable: true, title: "SNICH: Getting tables." };
            let fields = ['name', 'label', 'sys_scope', 'sys_package', 'sys_scope.scope', 'sys_package.source'];

            tablesResult = await sConn.getAggregate<sys_db_object>('sys_db_object', queryParts.join('^'), fields, 'all', tableProgOpts);

            this.logger.debug(this.type, func, `tablesResult`, tablesResult);

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            tablesResult = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return tablesResult;

    }

    /**
     * Get the field names from the instance for the provided table.
     * @param tableName The table name and to get fields for (will get parent extension hierarchy too)
     */
    async getInstanceTableFields(tableName: string, fieldTypesExcl?: string[]) {
        let func = 'getInstanceTableFields';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `tableName: `, tableName);

        let fieldsResult: sys_dictionary[] = [];

        try {

            let sConn = new SNICHConnection(this.logger);
            await sConn.load(this.getInstanceId());

            let qParts = [];
            let includeParents = "javascript:new PAUtils().getTableAncestors('" + tableName + "')";
            qParts.push('name=' + includeParents);
            qParts.push('elementISNOTEMPTY');

            if (fieldTypesExcl && fieldTypesExcl.length > 0) {
                qParts.push('internal_typeNOT IN' + fieldTypesExcl.join(','));
            }

            qParts.push('ORDERBYcolumn_label');

            let tableProgOpts = {
                location: vscode.ProgressLocation.Notification,
                cancellable: true,
                title: `SNICH: Getting fields for table: ${tableName}`
            };

            let fields = ['internal_type', 'column_label', 'element', 'name'];

            fieldsResult = await sConn.getAggregate<sys_dictionary>('sys_dictionary', qParts.join('^'), fields, 'all', tableProgOpts);

            let deDupedFields: sys_dictionary[] = [];
            fieldsResult.forEach((field) => {
                let curElem = field.element.value;
                let exists = deDupedFields.find((elem) => elem.element.value == curElem);
                if (!exists) {
                    deDupedFields.push(field);
                }
            })

            fieldsResult = deDupedFields;

            fieldsResult = fieldsResult.sort((a, b) => (a.column_label.value > b.column_label.value) ? 1 : -1);

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            fieldsResult = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return fieldsResult;
    }
}
