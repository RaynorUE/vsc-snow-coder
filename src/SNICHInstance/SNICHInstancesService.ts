import * as vscode from 'vscode';
import { WSFileMan } from '../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SNICHConfig } from '../@types/SNICHConfig';


export class SNICHInstancesService {
    DB = new AsyncNedb();
    constructor() {
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load instance! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb(this.getDBFilePath())
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan().getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'instances.db');
        }

        return dbPath;
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