import * as vscode from 'vscode';
import { WSFileMan } from '../../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';


export class SNICHPackageFileService {
    DB = new AsyncNedb();
    logger: SNICHLogger;
    type = "SNICHPackageFileService"

    constructor(logger: SNICHLogger) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load FileDB! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb({
            filename: DBfilePath.fsPath,
            autoload: true,
        });
        this.logger.info(this.type, func, `LEAVING`);
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan(this.logger).getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'package_files.db');
        }

        return dbPath;
    }


    async insert(data: SNICHConfig.File): Promise<SNICHConfig.File | undefined> {
        let func = 'insert';
        this.logger.info(this.type, func, "ENTERING");
        this.logger.debug(this.type, func, "data: ", data);

        let res = undefined;

        try {

            if (data._id !== undefined) {
                throw new Error('Attempted to insert an connection that already exists.');
            }

            let insertResult = await this.DB.asyncInsert<SNICHConfig.File>(data);

            if (insertResult) {
                this.logger.debug(this.type, func, "insertResult: ", insertResult);
                res = insertResult;
            }

        } catch (e) {
            this.logger.error(this.type, func, e);
            res = undefined;
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }

        return res;
    }

    async update(_id: string, data: any) {
        let func = 'update'
        this.logger.info(this.type, func, "ENTERING");
        this.logger.debug(this.type, func, "_id: ", _id);
        this.logger.debug(this.type, func, "data: ", data);

        let res = false;
        try {
            if (_id === undefined) {
                throw new Error("Attempted to update and ID was undefined. Will be unable to find record!");
            }

            let updateResult = await this.DB.asyncUpdate({ _id: _id }, data);
            if (updateResult) {
                res = true;
            }

        } catch (e) {
            this.logger.error(this.type, func, e);
            res = false;
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }

        return res;
    }

    async getFilesForPackage(application_id: string) {
        var func = 'getByInstanceId';
        this.logger.info(this.type, func, `ENTERING`);
        let records: SNICHConfig.File[] | undefined = undefined;
        let foundRecord = await this.DB.asyncFind<SNICHConfig.File>({ application_id: application_id });
        if (foundRecord) {
            records = foundRecord;
        }
        this.logger.info(this.type, func, `LEAVING`, records);
        return records;
    }

    async getById(_id: string) {
        let record: SNICHConfig.File | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.File>({ _id: _id });
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async get(query: any) {
        let record: SNICHConfig.File | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.File>(query)
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async getMultiple(query?: any) {
        let records: SNICHConfig.File[] = [];
        if (!query) {
            query = {};
        }
        let foundRecords = await this.DB.asyncFind<SNICHConfig.File>(query);
        if (foundRecords && foundRecords.length > 0) {
            records = foundRecords;
        }

        return records;
    }

    async delete(id?: string) {
        const func = 'delete';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `id: `, id);

        let result = false;

        try {
            if (id) {
                this.logger.info(this.type, func, `Id provided, deleting instance record.`);
                const deleteCount = await <Promise<number>>this.DB.asyncRemove({ _id: id });
                if (deleteCount > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                this.logger.info(this.type, func, `Odd... no Id provied. Not deleting anything returning false!`);
                result = false;
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }
}