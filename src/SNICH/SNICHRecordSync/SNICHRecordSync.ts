import { SNICHLogger } from "../SNICHLogger/SNICHLogger";


export class SNICHRecordSync {

    logger: SNICHLogger;
    type = "SNICHRecordSync";

    constructor(logger: SNICHLogger) {
        const func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    pullNewFile() {

        /** */
    }

    pullFile() {

    }

    pushFile() {

    }
}