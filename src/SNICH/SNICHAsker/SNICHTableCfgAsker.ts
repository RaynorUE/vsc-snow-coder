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

    async selectTable(tables: sys_db_object[], existingTables?: SNICHConfig.Table[]) {
        var func = 'selectTable';
        this.logger.info(this.type, func, `ENTERING`);

        let result = undefined;

        try {


            let tableQPs: qpWithValue[] = tables.map((rec) => {
                let qpItem: qpWithValue = {
                    label: `${rec.label.display_value}`,
                    value: rec,
                    description: `${rec.name.display_value}`,
                    detail: `${rec.sys_package.display_value} (${rec.sys_scope.display_value})`
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
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
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

}