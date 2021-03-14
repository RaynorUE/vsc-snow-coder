import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
import { qpWithValue } from '../../extension';
import { SNICHAskerCore } from '../SNICHCore/SNICHAskerCore';

/**
 * Class for handling various "Quick pick" and "Quick input" calls. 
 * Will be useful for looping and if we ever want to retrofit to more robust "Input" that vscode offers.
 */
export class SNICHPackageAsker extends SNICHAskerCore {

    type = "SNICHPackageAsker";

    super(logger: SNICHLogger) {
        this.logger = logger;
    }

    async askForPackage(packagesList: sys_package[]) {
        const func = 'askForPackage';
        this.logger.info(this.type, func, `ENTERING`);

        let result: undefined | sys_package = undefined;

        try {

            let packagesQps = packagesList.map((snPackage) => {
                let qpItem: qpWithValue = {
                    label: `${snPackage.name.display_value}`,
                    value: snPackage,
                    description: `${snPackage.source.length == 32 ? `global` : ``}`,
                    detail: `${rec.name.display_value} - ${rec.sys_package.display_value} [${rec.sys_scope.display_value}]`,
                };
            });

            let tableQPs: qpWithValue[] = tables.map((rec) => {
                let tableExists = existingTables.findIndex((eixsting) => eixsting.name == rec.name.value) > -1;

                let qpItem: qpWithValue = {
                    label: `${rec.label.display_value}`,
                    value: rec,
                    description: tableExists ? `Table already configured. Select to reconfigure.` : ``,
                    detail: `${rec.name.display_value} - ${rec.sys_package.display_value} [${rec.sys_scope.display_value}]`,
                };
                return qpItem;
            })

            let tableSelection = await vscode.window.showQuickPick(tableQPs, { ignoreFocusOut: true, matchOnDetail: true, placeHolder: `Select a table.` });

            if (tableSelection) {
                result = tableSelection.value;
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
     * TODO: May not need this, since we can get display value from SN... 
     * @param className 
     * @returns 
     */
    private mapClassNameLabel(className: string): string {

        if (className == SNICHConfig.sys_package_sys_class_names.Application) {
            return SNICHConfig.sys_package_sys_class_labels.Application;
        }

        if (className == SNICHConfig.sys_package_sys_class_names.CustomApplication) {
            return SNICHConfig.sys_package_sys_class_labels.CustomApplication;
        }

        if (className == SNICHConfig.sys_package_sys_class_names.StoreApplication) {
            return SNICHConfig.sys_package_sys_class_labels.StoreApplication;
        }

        if (className == SNICHConfig.sys_package_sys_class_names.SysPlugins) {
            return SNICHConfig.sys_package_sys_class_labels.SysPlugins;
        }

        return "";
    }
}