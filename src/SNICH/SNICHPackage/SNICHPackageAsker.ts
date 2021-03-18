import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
import { qpWithValue } from '../../extension';
import { SNICHAskerCore } from '../SNICHCore/SNICHAskerCore';

declare type sys_packageSysClassNames = keyof typeof SNICHConfig.sys_package_sys_class_names;

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
                    label: `${this.getClassIcon(snPackage.sys_class_name.value)} ${snPackage.name.display_value}`,
                    value: snPackage,
                    description: `${snPackage.source.value.length == 32 ? `global` : `${snPackage.source.display_value}`} v${snPackage.version.display_value}`,
                    detail: snPackage.sys_class_name.display_value,
                };
                return qpItem
            });


            let packSelection = await vscode.window.showQuickPick(packagesQps, { ignoreFocusOut: true, matchOnDetail: true, placeHolder: `Select a package.` });

            if (packSelection) {
                result = packSelection.value;
            }
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    private getClassIcon(className: string): string {

        if (className == 'sys_scope') {
            return `$(globe)`;
        }

        if (className == 'sys_app') {
            return `$(extensions)`;
        }

        if (className == 'sys_store_app') {
            return `$(gift)`;
        }

        if (className == 'sys_plugins') {
            return `$(plug)`;
        }

        return "";
    }
}


