import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import { qpWithValue } from '../../extension';
import * as vscode from 'vscode';

export class SNICHAskerCore {
    logger: SNICHLogger;
    yesNo: qpWithValue[] = [{ label: "$(thumbsup) Yes", value: "yes" }, { label: "$(thumbsdown) No", value: "no" }];
    type = "SNICHAskerCore"
    constructor(logger: SNICHLogger) {
        this.logger = logger;
    }

    async askYesNo(message: string) {
        const func = 'askValidateInstanceURL';
        this.logger.info(this.type, func, `ENTERING`);

        let result: boolean | undefined = false;

        try {
            let confirm = await vscode.window.showQuickPick(this.yesNo, { ignoreFocusOut: true, placeHolder: message });

            if (!confirm) {
                result = undefined;
            } else if (confirm.value == 'yes') {
                result = true;
            } else if (confirm.value == 'no') {
                result = false;
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    inputEntryMandatory(value: any) {
        if (!value) {
            return 'Entry required.';
        } else {
            return null;
        }
    }
}