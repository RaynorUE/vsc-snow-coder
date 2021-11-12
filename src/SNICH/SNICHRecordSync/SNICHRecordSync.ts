//import { WSFileMan } from "../../FileMan/WSFileMan";
import { SNICHConnection } from "../SNICHConnection/SNICHConnection";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import { SNICHPackage } from "../SNICHPackage/SNICHPackage";
import { SNICHTableConfig } from "../SNICHTableConfig/SNICHTableConfig";
import * as vscode from 'vscode';
import { VSCODEPrefs } from "../SNICHUtils/VSCODEPrefs";

export class SNICHRecordSync {

    alwaysPullFields = ["sys_scope", "sys_scope.source", "sys_scope.sys_class_name", "sys_id"]; //always add these fields to API Calls so we have them.

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

                            const fields: string[] = this.alwaysPullFields;
                            fields.push(currentConfig.display_field);

                            if (currentConfig.group_by?.name) fields.push(currentConfig.group_by.name);

                            //nened to get the synced fields
                            currentConfig.synced_fields.forEach((field) => {
                                fields.push(field.name);
                            });

                            //and also any fields that are part of our display value.
                            currentConfig.additional_display_fields.forEach((field) => {
                                fields.push(field);
                            });


                            let recordsResult = await sConn.getRecords<any>(tableName, query, fields, true);
                            asyncResponseObj.recordsResult = recordsResult;
                            this.logger.debug(this.type, func, `reordsResult`, recordsResult);
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

                    let appFilesResult = await Promise.all(fileRequests);
                    this.logger.debug(this.type, func, `appFilesResult:`, appFilesResult);

                    if (appFilesResult) {
                        //const wsFMan = new WSFileMan(this.logger);
                        const instanceRoot = sInstance.getRootPath();
                        const multiFieldSep = new VSCODEPrefs().getMultiFieldSep();
                        
                        //TODO: Need to lookup how to find what OS i'm running on... so i can only do the bad char replace on windows.
                        //TODO: Need to complete bad char replace as well ocne we figure out the OS..
                        const badCharReplaceWith = new VSCODEPrefs().fileInvalCharSub();
                        
                        const packRoot = vscode.Uri.joinPath(instanceRoot, `${selectedPack.name} (${selectedPack.source})`);
                        const writeFilesData: any[] = [];

                        appFilesResult.forEach((result) => {
                            const tConfig = result.tableConfig;
                            const groupByColumnName = tConfig.group_by?.name;
                            this.logger.info(this.type, func, 'tConfig:', tConfig);
                            const recs: any[] = result.recordsResult;
                            


                            recs.forEach((rec) => {
                                let tableRoot = vscode.Uri.joinPath(packRoot, `${tConfig.name} (${tConfig.label})`);
                                if (groupByColumnName && rec[groupByColumnName]) tableRoot = vscode.Uri.joinPath(tableRoot, rec[groupByColumnName]);

                                //just the one field..
                                if (tConfig.synced_fields.length == 1) {
                                    let fileNameParts = [`${rec[tConfig.display_field]}`];
                                    if (tConfig.additional_display_fields.length > 0) {
                                        this.logger.debug(this.type, func, `Had additional display fields.`);

                                        tConfig.additional_display_fields.forEach((field) => {
                                            fileNameParts.push(`${rec[field]}`);
                                        });
                                    }

                                    let syncedField = tConfig.synced_fields[0];
                                    let fileName = `${fileNameParts.join(multiFieldSep)}.${syncedField.extension}`;
                                    let fullFilePath = vscode.Uri.joinPath(tableRoot, fileName);
                                    this.logger.debug(this.type, func, `fullFilePath: `, fullFilePath);


                                    let content = Buffer.from(rec[syncedField.name]);

                                    writeFilesData.push( {fullFilePath: fullFilePath, content:content});

                                } else if (tConfig.synced_fields.length > 1) {
                                    //gotta add the display name/s to the folder name, then the file names by label of field after..

                                }
                            });
                        });

                        if(writeFilesData.length > 0){
                            this.logger.debug(this.type, func, `writeFilesData`, writeFilesData);
                            await Promise.all(writeFilesData.map(async (data) => vscode.workspace.fs.writeFile(data.fullFilePath, data.content)));
                        }
                       
                    }
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