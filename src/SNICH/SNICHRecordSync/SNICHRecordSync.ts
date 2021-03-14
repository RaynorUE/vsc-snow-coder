import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
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


    async pullApplicationFiles() {
        const func = 'pullApplicationFiles';
        this.logger.info(this.type, func, `ENTERING`);

        let result: boolean | undefined = undefined;

        try {

            let sInstance = new SNICHInstance(this.logger);
            let instanceSelected = await sInstance.selectInstance();

            if (!instanceSelected) {
                throw new Error('No instance selected. Aborting file sync.');
            }



        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    pullNewApplicationFiles(appId?: string) {

    }

    pullNewFile() {

        /** */
    }

    pullFile() {

    }

    pushFile() {

    }
}