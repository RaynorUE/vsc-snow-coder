import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import { qpWithValue } from '../../extension';

export class SNICHAskerCore {
    logger: SNICHLogger;
    yesNo: qpWithValue[] = [{ label: "$(thumbsup) Yes", value: "yes" }, { label: "$(thumbsdown) No", value: "no" }];

    constructor(logger: SNICHLogger) {
        this.logger = logger;
    }


    inputEntryMandatory(value: any) {
        if (!value) {
            return 'Entry required.';
        } else {
            return null;
        }
    }
}