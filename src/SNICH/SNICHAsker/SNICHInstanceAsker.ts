import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
import { qpWithValue } from '../../extension';
import { SNICHAskerCore } from './SNICHAskerCore';


export class SNICHInstanceAsker extends SNICHAskerCore {

    type = "SNICHInstanceAsker";

    super(logger: SNICHLogger) { }

    async askSelectInstance(instances: SNICHConfig.Instance[]) {
        const func = 'askSelectInstance';
        this.logger.info(this.type, func, `ENTERING`);

        let result: SNICHConfig.Instance | undefined | null = undefined;

        try {
            let instanceQPs: qpWithValue[] = [];

            if (instances && instances.length > 0) {
                instanceQPs = instances.map((instance) => {
                    let qp: qpWithValue = {
                        value: instance,
                        label: instance.name,
                    }
                    return qp;
                })
            } else {
                throw new Error('Got here but no instances configured!');
            }

            let instanceAnswer = await vscode.window.showQuickPick(instanceQPs, { ignoreFocusOut: true, placeHolder: "Select instance" });

            if (instanceAnswer) {
                result = instanceAnswer.value;
            } else {
                result = null;
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVINg`);
        }

        return result;
    }

    async askForInstanceURL() {
        const func = 'askForInstanceURL';
        this.logger.info(this.type, func, `ENTERING`);

        let result: string | undefined = undefined;

        try {

            let enteredInstanceValue = await vscode.window.showInputBox({
                ignoreFocusOut: true,
                prompt: `Enter Instance Name or URL.`,
                placeHolder: "https://dev00000.service-now.com",
                validateInput: (value) => this.inputEntryMandatory(value)
            });

            result = enteredInstanceValue;

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }


}