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

            /**
            * TODO: Consider adding a setting to "call this on activation"... And then in both cases, called on demand or on activation
            * Do we skip any files that are "Dirty"? Yea, let's do that so we do not inadvertenly wipe their code..
            * So this should handle that? Calling WSFileMan etc? and add a method to WSFileman for "get dirty workspace files"
            * Oh wait if this is just NEW app files we never would touch a dirty file..
            */

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