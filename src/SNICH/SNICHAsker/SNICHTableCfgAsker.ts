import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
import { qpWithValue } from '../../extension';
import { SNICHAskerCore } from './SNICHAskerCore';

/**
 * Class for handling various "Quick pick" and "Quick input" calls. 
 * Will be useful for looping and if we ever want to retrofit to more robust "Input" that vscode offers.
 */
export class SNICHTableCfgAsker extends SNICHAskerCore {

    type = "SNICHTableCfgAsker";

    super(logger: SNICHLogger) {
        this.logger = logger;
    }

    async selectTable(tables: sys_db_object[], existingTables: SNICHConfig.Table[]) {
        var func = 'selectTable';
        this.logger.info(this.type, func, `ENTERING`);

        let result = undefined;

        try {


            let tableQPs: qpWithValue[] = tables.map((rec) => {
                let tableExists = existingTables.findIndex((eixsting) => eixsting.name == rec.name.value) > -1;

                let qpItem: qpWithValue = {
                    label: `${rec.label.display_value}`,
                    value: rec,
                    description: tableExists ? `Table already configured. Select to reconfigure.` : ``,
                    detail: `${rec.name.display_value} - ${rec.sys_package.display_value} [${rec.sys_scope.display_value}]`
                };
                return qpItem;
            })

            let tableSelection = await vscode.window.showQuickPick(tableQPs, { ignoreFocusOut: true, matchOnDescription: true, placeHolder: `Select a table.` });

            if (tableSelection) {
                result = tableSelection.value;
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result
    }

    async selectGroupBy(fields: sys_dictionary[]) {
        let func = 'selectGroupBy';
        this.logger.info(this.type, func, `ENTERING`);

        /**
         * undefined = selection aborted.
         * null = no group by.
         */
        let result: SNICHConfig.Field | undefined | null = undefined

        try {


            let useGroupBySelection = await vscode.window.showQuickPick(this.yesNo, { ignoreFocusOut: true, matchOnDescription: true, placeHolder: `Group records into folder by field? (i.e. group by table name)` });

            if (useGroupBySelection && useGroupBySelection.value == 'yes') {
                let groupByFields: qpWithValue[] = []
                fields.forEach((rec) => {
                    let qpItem: qpWithValue = {
                        label: `${this._iconMap(rec.internal_type.value)} ${rec.column_label.display_value} [${rec.element.display_value}]`,
                        value: rec,
                        description: `${rec.internal_type.value}`,
                    };

                    if (rec.internal_type.value !== 'reference') {
                        groupByFields.push(qpItem);
                    }
                });

                let groupBySelection = await vscode.window.showQuickPick(groupByFields, { ignoreFocusOut: true, matchOnDescription: true, placeHolder: `Select fields for name` });
                if (!groupBySelection) {
                    this.logger.debug(this.type, func, `Group by selection aborted. Moving on...`);
                    result = undefined;
                } else {
                    let gbField: sys_dictionary = groupBySelection.value;
                    result = {
                        extension: "",
                        label: gbField.column_label.value,
                        name: gbField.element.value
                    }
                }
            } else if (useGroupBySelection && useGroupBySelection.value == 'no') {
                result = null;
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`, result);
        }

        return result
    }

    async selectNameField(fields: sys_dictionary[]) {
        let func = 'selectNameField';
        this.logger.info(this.type, func, `ENTERING`);

        /**
         * non empty string is a name field selected.
         * undefined or empty string = selection aborted
         */
        let result: string | undefined = undefined;

        try {
            let nameField = fields.find((val) => val.element.value == 'name');

            let useNameField = false;
            if (nameField) {
                let useNameAnswer = await vscode.window.showQuickPick(this.yesNo, { ignoreFocusOut: true, placeHolder: "Name field detected. Use for file name?" });
                if (useNameAnswer && useNameAnswer.value == "yes") {
                    useNameField = true;
                }
            }

            if (useNameField) {
                result = 'name';
            } else {
                let nameFields = fields.map((rec) => {
                    let qpItem: qpWithValue = {
                        label: `${this._iconMap(rec.internal_type.value)} ${rec.column_label.display_value} [${rec.element.display_value}]`,
                        value: rec,
                        description: `${rec.internal_type.value}`,
                    };
                    return qpItem;
                });

                let nameFieldAnswer = await vscode.window.showQuickPick(nameFields, {
                    ignoreFocusOut: true,
                    placeHolder: "Select field to use for file name. You will be asked for additional fields to make up name next."
                });

                if (!nameFieldAnswer) {
                    result = undefined;
                } else if (nameFieldAnswer) {
                    let sysDic: sys_dictionary = nameFieldAnswer.value;
                    result = sysDic.element.value;
                }
            }
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;

    }

    /**
     * 
     * @param fields Array of dictionary items for selection
     * @param nameField The name field already selected, will be filtered out of list.
     */
    async selectAdditionalNameFields(fields: sys_dictionary[], nameField: string): Promise<sys_dictionary[] | undefined> {
        const func = `selectAdditionalNameFields`;
        this.logger.info(this.type, func, `ENTERING`);

        let result: sys_dictionary[] | undefined = undefined;

        try {

            let nameFieldsQP: qpWithValue[] = [];
            const fieldSep: string = vscode.workspace.getConfiguration().get('snich.syncedRecordNameSeparator') || "^";

            fields.forEach((rec) => {
                if (rec.element.value == nameField) {
                    //do nothing
                } else {
                    let qpItem: qpWithValue = {
                        label: `${this._iconMap(rec.internal_type.value)} ${rec.column_label.display_value} [${rec.element.display_value}]`,
                        value: rec,
                        description: `${rec.internal_type.value}`,
                    };
                    nameFieldsQP.push(qpItem);
                }
            });

            let qpOpts: vscode.QuickPickOptions = {
                canPickMany: true,
                ignoreFocusOut: true,
                placeHolder: `Please select additional fields to use for the file name. Seperator from settings [ ${fieldSep} ]`,
                matchOnDescription: true,
                matchOnDetail: true
            }

            //using any operator so we typescript won't complain about .length and .foreach
            let selectedFields = await vscode.window.showQuickPick<any>(nameFieldsQP, qpOpts);

            if (selectedFields && selectedFields.length && selectedFields.length > 0) {
                let nameFields: sys_dictionary[] = [];
                let fullFileNameParts: string[] = [];
                fullFileNameParts.push(nameField);
                selectedFields.forEach((qp: qpWithValue) => {
                    let dicRec: sys_dictionary = qp.value;
                    nameFields.push(dicRec);
                    fullFileNameParts.push(dicRec.element.value);
                })

                let msg = `File names will be built with pattern: ${fullFileNameParts.join(fieldSep)}`;
                let confirmFileName = await this.askYesNo(msg);

                if (confirmFileName == undefined) {
                    this.logger.debug(this.type, func, `confirmFileName aborted!`);
                    result = undefined;
                } else if (confirmFileName == false) {
                    this.logger.debug(this.type, func, `File name not confirmed. Asking for file name fields again!`);
                    this.logger.info(this.type, func, `LEAVING`);
                    return await this.selectAdditionalNameFields(fields, nameField);
                } else if (confirmFileName == true) {
                    this.logger.debug(this.type, func, `File name confirmed!`);
                    result = nameFields;
                }
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`, result);
        }

        return result

    }

    async selectSyncedFields(fields: sys_dictionary[]) {
        const func = 'selectSyncedFiles';
        this.logger.info(this.type, func, `ENTERING`);

        let result: sys_dictionary[] | undefined;

        try {

            let fieldsQp = fields.map((rec) => {
                let selected = false;
                let intrnlType = rec.internal_type.value;
                if (intrnlType.includes('html') || intrnlType.includes('xml') || intrnlType.includes('script')) {
                    selected = true;
                }
                let qpItem: qpWithValue = {
                    label: `${this._iconMap(rec.internal_type.value)} ${rec.column_label.display_value} [${rec.element.display_value}]`,
                    value: rec,
                    description: `${rec.internal_type.value}`,
                    picked: selected
                };
                return qpItem;
            });

            let selectOpts: vscode.QuickPickOptions = {
                canPickMany: true,
                placeHolder: "Select fields to sync. Note: We've preselected typical fields.",
                matchOnDescription: true,
                ignoreFocusOut: true
            }

            let selectedSyncFields: any = await vscode.window.showQuickPick(fieldsQp, selectOpts);

            if (selectedSyncFields && selectedSyncFields.length && selectedSyncFields.length > 0) {
                let syncedFields: sys_dictionary[] = [];

                selectedSyncFields.forEach((item: qpWithValue) => {
                    let sysDic: sys_dictionary = item.value;
                    syncedFields.push(sysDic);
                });

                result = syncedFields;
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }

    async selectExtension(field: sys_dictionary) {
        const func = "selectExtension";
        this.logger.debug(this.type, func, `ENTERING`);

        let result: string | undefined = undefined;

        try {

            let preFilledExtension = this._extensionMap(field.internal_type.value);

            let inpOpts: vscode.InputBoxOptions = {
                ignoreFocusOut: true,
                value: preFilledExtension,
                prompt: `Enter the file extension to use for ${field.column_label.display_value} (${field.element.value}). If it is a known field type, a suggestion will be pre-filled for you.`,
                placeHolder: `.js, .html, .xml, .d.ts`,
                validateInput: (value) => this.inputEntryMandatory(value)
            }

            let enteredExt = await vscode.window.showInputBox(inpOpts);

            if (enteredExt) {
                result = enteredExt;
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;

        } finally {
            this.logger.debug(this.type, func, `LEAVING`);
        }

        return result;

    }



    private _iconMap(internalType: string) {

        if (internalType.indexOf('date') > -1) {
            return `$(calendar)`;
        } else if (internalType.indexOf('script') > -1) {
            return `$(symbol-object)`;
        } else if (internalType.indexOf('decimal') > -1 || internalType.indexOf('integer') > -1) {
            return `$(symbol-operator)`;
        } else if (internalType.indexOf('html') > -1 || internalType.indexOf('xml') > -1) {
            return `$(code)`;
        } else if (internalType.indexOf('reference') > -1) {
            return '$(references)';
        }

        return `$(symbol-string)`;
    }

    private _extensionMap(internalType: string): string {

        if (internalType.includes('json')) {
            return '.json';
        } else if (internalType.includes('html')) {
            return '.html';
        } else if (internalType.includes('script')) {
            return '.js';
        }
        return '';
    }

}