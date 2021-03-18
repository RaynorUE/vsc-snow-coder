import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import { SNICHPackage } from "../SNICHPackage/SNICHPackage";


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
            let instanceSelected = await sInstance.load();

            if (instanceSelected == undefined) {
                throw new Error('No instance selected. Aborting file sync.');
            } else if (instanceSelected == false) {
                this.logger.debug(this.type, func, `No instance fpund!`);
                result = false;
            } else if (instanceSelected == true) {
                const packMan = new SNICHPackage(this.logger, sInstance);
                let selectedPack = await packMan.selectPackage();
                this.logger.debug(this.type, func, `selectedPackage: `, selectedPack);
                if (selectedPack === undefined) {
                    result = undefined
                } else if (selectedPack) {
                    result = true

                }

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