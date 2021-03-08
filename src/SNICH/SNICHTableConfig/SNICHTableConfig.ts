import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';
import { SNICHTableConfigService } from "./SNICHTableConfigService";
import { SNICHConnection } from '../SNICHConnection/SNICHConnection';
import { SNICHTableCfgAsker } from "../SNICHAsker/SNICHTableCfgAsker";
import { tablePreferencesV1 } from "../../@types/v1_deprecated";
import { BackFileMan } from "../../FileMan/BackFileMan";


export class SNICHTableConfig {

    private snPreferenceNames = {
        tConfig: 'vscode.extension.snich.table_config'
    };

    private data: SNICHConfig.TableConfig = {
        _id: undefined,
        instance_id: "",
        version: "2.0.0",
        tables: []
    };

    logger: SNICHLogger;
    type = "SNICHTableConfig";
    constructor(logger: SNICHLogger) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    async load(instanceId?: string, loadFromInstance?: boolean) {
        var func = 'load';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `instanceId: `, instanceId);
        this.logger.debug(this.type, func, `loadFromInstance: `, loadFromInstance);

        let result = false;

        try {
            if (!instanceId) {
                this.logger.info(this.type, func, `LEAVING`);
                throw new Error('Attempted to load an SNICHConnection without an instance ID. This would be fruitless.');
            } else {

                this.setInstanceId(instanceId);
                const tConfigSrv = new SNICHTableConfigService(this.logger);
                let foundTConfig = await tConfigSrv.getByInstanceId(this.getInstanceId());
                this.logger.debug(this.type, func, `foundTConfig: `, foundTConfig);
                let instanceTConfig: SNICHConfig.TableConfig | undefined = undefined;


                //if load from instance, always make that call to get that data...

                if (loadFromInstance || !foundTConfig || (foundTConfig && foundTConfig.tables.length == 0)) {
                    this.logger.debug(this.type, func, `Loading from instance == true, or existing table config not found. Seing if there is a table config on the instance...`);
                    var sConn = new SNICHConnection(this.logger);
                    await sConn.load(this.getInstanceId());
                    let tablesPref = await sConn.getPreference(this.snPreferenceNames.tConfig);
                    if (tablesPref) {
                        instanceTConfig = this.upgradeData(JSON.parse(tablesPref));
                    }
                }

                if (foundTConfig && foundTConfig.tables.length > 0) {
                    this.logger.debug(this.type, func, `Found an existing table config. Means this is unlikely first time setup, merging instance data on top of local config.`);
                    //we found an existing tableConfig, so we assume existing instance config, and we'll merge over from instance
                    const mergedData = { ...foundTConfig, ...instanceTConfig }; //first set to foundTConfig, then overlay instanceTConfig;

                    //what do we do about instance_id? For example, if the tConfig stored on Instance was from one computer
                    //and we're on a seperate computer, they'll have different instance_ids.. so we always overwrite with incoming... yea
                    mergedData.instance_id = this.getInstanceId();
                    this.setData(mergedData);
                    result = true;
                } else if (instanceTConfig) {
                    this.logger.debug(this.type, func, `Did not find a local table config, but did find one on the SN Instance. Using that...`);
                    //use what was found on the instance if we do not have a local config stored already
                    this.setData(instanceTConfig);
                    //await this.save(); /** NOTE: saving should be called by calling functions. This will help reduce whacky looping in the event someone does call externally */
                } else {
                    this.logger.debug(this.type, func, `Did not find a local table config, or one on the instance. Adding in default tables and saving.`);
                    await this.addDefaultTables();
                    //await this.save(); /** NOTE: saving should be called by calling functions. This will help reduce whacky looping in the event someone does call externally */
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

        let result = false;

        try {
            const tConfigSrv = new SNICHTableConfigService(this.logger);


            if (this.data._id) {
                result = await tConfigSrv.update(this.data._id, this.getData());
            } else {
                let insertResult = await tConfigSrv.insert(this.getData());
                if (insertResult) {
                    this.setData(insertResult); //so we store _id in class/memory
                }
            }

            let saveResult = await this.saveToInstance(); //always save to instance if we're saving.

            result = saveResult;
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;


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

    async saveToInstance(): Promise<boolean> {
        const func = 'saveToInstance';
        this.logger.info(this.type, func, `ENTERING`);

        let result = false;

        try {

            //always save all tableConfigs in a JSON Array system preference.
            /** 
             * @todo call SNICHPreferences here, which will have a method to save tableConfig, which will handle preference id, username, all the things...
             * This method is really just to gather up the tables and save them to the user preferences on SN.
             */

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;


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

        let result = false;

        try {

            const asker = new SNICHTableCfgAsker(this.logger);

            const table: SNICHConfig.Table = {
                name: "",
                additional_display_fields: [],
                display_field: "",
                synced_fields: [],
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
                this.logger.info(this.type, func, `LEAVING`);
                return undefined;
            }

            table.name = selectedTable.name.value;

            let tableFields = await this.getInstanceTableFields(selectedTable.name.value);
            this.logger.debug(this.type, func, `tableFields: `, tableFields);

            let groupBy = await asker.selectGroupBy(tableFields);

            if (groupBy === undefined) {
                this.logger.debug(this.type, func, `Groupby selection aborted. Aborting setup!`);
                this.logger.info(this.type, func, `LEAVING`);
                return undefined;
            }

            if (groupBy) {
                table.group_by = groupBy;
            }
            this.logger.debug(this.type, func, `Group by selection complete. Moving on to asking for nameField`);

            let nameField = await asker.selectNameField(tableFields);

            if (!nameField) {
                this.logger.info(this.type, func, `LEAVING`);
                return undefined;
            }

            const addNameFieldsMsg = `Add additional fields to use for file name?`;
            let addNameFields = await asker.askYesNo(addNameFieldsMsg);

            if (addNameFields == undefined) {
                this.logger.info(this.type, func, `LEAVING`);
                return undefined;
            }

            if (addNameFields == true) {
                let nameFields = await asker.selectAdditionalNameFields(tableFields, nameField);

                if (nameFields == undefined) {
                    this.logger.info(this.type, func, `LEAVING`);
                    return undefined;
                }

                nameFields.forEach((sysDic) => {
                    table.additional_display_fields.push(sysDic.element.value);
                });
            }


            let syncedFields = await asker.selectSyncedFields(tableFields);

            if (syncedFields == undefined) {
                this.logger.info(this.type, func, `LEAVING`);
                return undefined;
            }


            //doing a normal for loop so we can break out if aborted.
            for (let i = 0; i < syncedFields.length; i++) {
                let sysDic = syncedFields[i];

                let extension = await asker.selectExtension(sysDic);

                if (extension == undefined) {
                    this.logger.debug(this.type, func, `Abort on extension selection.`);
                    this.logger.info(this.type, func, `LEAVING`);
                    return undefined;
                }

                let fixedExt = extension.replace(/^\./g, ''); //remove starting periods from string, since we will be adding that.

                let snichField: SNICHConfig.Field = {
                    extension: fixedExt,
                    label: sysDic.column_label.value,
                    name: sysDic.element.value
                }
                table.synced_fields.push(snichField);
            }


            /**
             * @todo once we have all our stuff selected, store the table, and save the new config.
             * @todo present an info message that it's completed, and offer "Sync New Record" and "Sync All New App Files" (NEW Action!);
             */

            this.addTable(table);
            let saveResult = await this.save();
            result = saveResult;
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result
    }

    addTable(tConfig: SNICHConfig.Table) {
        var func = 'addTable';
        this.logger.info(this.type, func, `ENTERING`);

        let foundIndex = this.data.tables.findIndex((table) => table.name == tConfig.name);
        if (foundIndex > -1) {
            this.data.tables[foundIndex] = tConfig;
        } else {
            this.data.tables.push(tConfig);
        }

        this.logger.info(this.type, func, `LEAVING`);
    }

    getData() {
        return this.data;
    }

    setData(data: SNICHConfig.TableConfig) {
        this.data = data;
    }

    private setInstanceId(id: string) {
        this.data.instance_id = id;
    }

    private getInstanceId(): string {
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

    async addDefaultTables() {
        const func = 'addDefaultTables';
        this.logger.info(this.type, func, `ENTERING`);

        let result = false;

        try {

            let bsMan = new BackFileMan();
            let defaultTableText = await bsMan.readFile("data_files", "defaults", "default_tables.json");
            if (defaultTableText) {
                let defaultTableData: SNICHConfig.Table[] = JSON.parse(defaultTableText.toString());
                defaultTableData.forEach((defaultTable) => {
                    this.addTable(defaultTable)
                });

                await this.save();
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result
    }

    upgradeData(oldData: any): SNICHConfig.TableConfig | undefined {
        const func = 'upgradeData';
        this.logger.info(this.type, func, `ENTERING`);

        if (oldData) {
            this.logger.debug(this.type, func, `oldData.version: `, oldData.version);
        }

        let result: SNICHConfig.TableConfig | undefined = undefined;
        try {

            let newData = { ...oldData }; //spreading into a new object so we can be overwriting it as we check "upgrading forward to the latest version"

            if (!newData || !newData.version || newData.version == '1.0.0') {
                this.logger.debug(this.type, func, `Data from instance was older than version 2.0.0. Assuming version only version we ever stored prior to this code existing. Converting to v2.`);
                newData = this.convertV1toV2(newData);
            }

            if (newData && newData.version === '2.0.0') {
                this.logger.debug(this.type, func, `Data is on Version 2.0.0, no further upgrading of data needed! Returning!`);
            }

            result = newData;

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVINg`);
        }

        return result;
    }

    convertV1toV2(v1Data: tablePreferencesV1): SNICHConfig.TableConfig | undefined {
        const func = 'convertV1toV2';
        this.logger.info(this.type, func, `ENTERING`);

        let result = undefined;

        try {


            let newTableConfig: SNICHConfig.TableConfig = {
                _id: undefined,
                instance_id: "",
                tables: [],
                version: "2.0.0"
            }

            v1Data.tables.forEach((oldTable) => {
                let newTable: SNICHConfig.Table = {
                    name: oldTable.name,
                    label: oldTable.label,
                    additional_display_fields: oldTable.additional_display_fields,
                    display_field: oldTable.display_field,
                    group_by: undefined,
                    synced_fields: []
                }

                oldTable.fields.forEach((oldField) => {
                    let newField: SNICHConfig.Field = {
                        extension: oldField.extention,
                        label: oldField.label,
                        name: oldField.name
                    }
                    newTable.synced_fields.push(newField);
                });

                newTableConfig.tables.push(newTable);
            });

            result = newTableConfig;

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;

    }
}
