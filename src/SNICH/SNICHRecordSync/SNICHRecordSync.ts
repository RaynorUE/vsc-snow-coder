import { SNICHConnection } from "../SNICHConnection/SNICHConnection";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import { SNICHPackage } from "../SNICHPackage/SNICHPackage";
import { SNICHTableConfig } from "../SNICHTableConfig/SNICHTableConfig";


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
            let selectedPack: SNICHConfig.Package | undefined;
            let sInstance = new SNICHInstance(this.logger);
            let instanceSelected = await sInstance.load();

            if (instanceSelected == undefined) {
                throw new Error('No instance selected. Aborting file sync.');
            } else if (instanceSelected == false) {
                this.logger.debug(this.type, func, `No instance fpund!`);
                result = false;
            } else if (instanceSelected == true) {
                const packMan = new SNICHPackage(this.logger, sInstance);
                selectedPack = await packMan.selectPackage();
                this.logger.debug(this.type, func, `selectedPackage: `, selectedPack);
                if (selectedPack === undefined) {
                    result = undefined
                } else if (selectedPack) {
                    this.logger.debug(this.type, func, `selectedPack: `, selectedPack);
                    const tConfig = new SNICHTableConfig(this.logger);
                    let tConfigLoaded = await tConfig.load(sInstance.getId());

                    if (!tConfigLoaded) {
                        throw new Error('Unable to load table config for instance.');
                    }

                    const tables = tConfig.getTables();
                    const sConn = new SNICHConnection(this.logger);
                    const sConLoaded = await sConn.load(sInstance.getId());
                    if (!sConLoaded) {
                        throw new Error('Unable to load snich connection for instance!');
                    }

                    //for some reason it's executing the code in the funciton

                    const fileRequests = tables.map(async (tableConfig) => {
                        const currentConfig = { ...tableConfig };
                        const func = 'fileRequest';
                        this.logger.info(this.type, func, `ENTERING`);
                        this.logger.debug(this.type, func, `tableConfig: `, currentConfig);
                        //we will ultimately return an array of the data and table config, so we do not have to go finding tables again..
                        const asyncResponseObj = {
                            recordsResult: <any>[],
                            tableConfig: currentConfig
                        }

                        try {
                            this.logger.debug(this.type, func, `sConn: `, sConn);
                            const tableName = currentConfig.name;
                            const query = "sys_package=" + selectedPack?.sys_id;
                            const fields: string[] = currentConfig.synced_fields.map((field) => {
                                return field.name;
                            });
                            fields.push(currentConfig.display_field);

                            let recordsResult = await sConn.getRecords<any>(tableName, query, fields, false);
                            asyncResponseObj.recordsResult = recordsResult;
                            this.logger.debug(this.type, func, `reordsResult`);
                            if (recordsResult && recordsResult.length > 0) {
                                this.logger.debug(this.type, func, `Records recieved!`);
                            } else {
                                this.logger.debug(this.type, func, `For some reason, no records recieved!`);
                            }
                        } catch (e) {
                            this.logger.error(this.type, func, `Onos an error has occured!`, e);
                        } finally {
                            this.logger.info(this.type, func, `LEAVING`, asyncResponseObj);
                        }
                        return asyncResponseObj;

                    });

                    let promResult = await Promise.all(fileRequests);
                    this.logger.debug(this.type, func, `promResult:`, promResult);
                }
            }




        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
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