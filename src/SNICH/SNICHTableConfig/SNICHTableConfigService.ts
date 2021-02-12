import * as vscode from 'vscode';
import { WSFileMan } from '../../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SystemLogHelper } from '../../classes/LogHelper';


export class SNICHTableConfigService {
    DB = new AsyncNedb();
    logger: SystemLogHelper;
    type = "SNICHTableConfigService"

    constructor(logger: SystemLogHelper) {
        this.logger = logger;
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load TableConfigDB! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb({
            filename: DBfilePath.fsPath,
            autoload: true,
        });
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan(this.logger).getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'tables.db');
        }

        return dbPath;
    }


    async insert(data: SNICHConfig.Table) {
        let func = 'insert';
        this.logger.info(this.type, func, "ENTERING");
        this.logger.debug(this.type, func, "data: ", data);

        let res = undefined;

        try {

            if (data._id !== undefined) {
                throw new Error('Attempted to insert an connection that already exists.');
            }

            let insertResult = await this.DB.asyncInsert<SNICHConfig.Table>(data);

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

    async getByInstanceId(_id: string) {
        let record: SNICHConfig.Table | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.Table>({ instance_id: _id });
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async getById(_id: string) {
        let record: SNICHConfig.Table | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.Table>({ _id: _id });
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async get(query: any) {
        let record: SNICHConfig.Table | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.Table>(query)
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async getMultiple(query?: any) {
        let records: SNICHConfig.Table[] = [];
        if (!query) {
            query = {};
        }
        let foundRecords = await this.DB.asyncFind<SNICHConfig.Table>(query);
        if (foundRecords && foundRecords.length > 0) {
            records = foundRecords;
        }

        return records;
    }

    async delete(id: string) {
        const deleteCount = await <Promise<number>>this.DB.asyncRemove({ _id: id });
        return deleteCount;
    }
}