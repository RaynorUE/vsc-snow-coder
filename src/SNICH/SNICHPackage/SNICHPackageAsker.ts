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


}