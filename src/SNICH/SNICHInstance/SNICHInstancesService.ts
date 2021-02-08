import * as vscode from 'vscode';
import { WSFileMan } from '../../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SystemLogHelper } from '../../classes/LogHelper';


export class SNICHInstancesService {
    DB = new AsyncNedb();
    logger: SystemLogHelper;
    type = "SNICHInstancesService";

    constructor(logger: SystemLogHelper) {
        this.logger = logger;
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load instance! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb({
            filename: DBfilePath,
            autoload: true,
        })
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan(this.logger).getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'instances.db');
        }

        return dbPath;
    }

    async insert(data: SNICHConfig.Instance) {
        let func = 'insert';
        this.logger.info(this.type, func, "ENTERING");
        let res = undefined;

        try {

            if (data._id !== undefined) {
                throw new Error('Attempted to insert an instance that already exists.');
            }

            let insertResult = await this.DB.asyncInsert<SNICHConfig.Instance>(data);

            if (insertResult) {
                res = insertResult;
            }

        } catch (e) {
            this.logger.error(this.type, func, JSON.stringify(e));
            res = undefined;
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }

        return res;

    }

    async update(_id: string | undefined, data: SNICHConfig.Instance) {
        let func = 'update'
        this.logger.info(this.type, func, "ENTERING");
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
            this.logger.error(this.type, func, JSON.stringify(e));
            res = false;
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }

        return res;
    }

    async get(query: any) {
        let record: SNICHConfig.Instance | undefined = undefined;
        let foundRecord = await this.DB.asyncFindOne<SNICHConfig.Instance>(query)
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async getMultiple(query?: any) {
        let records: SNICHConfig.Instance[] = [];
        if (!query) {
            query = {};
        }
        let foundRecords = await this.DB.asyncFind<SNICHConfig.Instance>(query);
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