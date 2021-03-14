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



        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }


}