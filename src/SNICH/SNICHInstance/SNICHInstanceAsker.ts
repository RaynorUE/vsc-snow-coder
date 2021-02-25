import * as vscode from 'vscode';
import { SystemLogHelper } from '../../classes/LogHelper';
import { qpWithValue } from '../../extension';


export class SNICHInstanceAsker {

    logger: SystemLogHelper;
    type = "SNICHInstanceAsker";
    yesNo: qpWithValue[] = [{ label: "$(thumbsup) Yes", value: "yes" }, { label: "$(thumbsdown) No", value: "no" }];

    constructor(logger: SystemLogHelper) {
        const func = 'constrcutor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

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


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }


}