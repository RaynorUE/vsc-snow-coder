import * as vscode from 'vscode';
import { WSFileMan } from '../../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';


export class SNICHFileDB {
    logger: SNICHLogger;
    DB = new AsyncNedb();
    constructor(logger: SNICHLogger) {
        this.logger = logger;
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load instance! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb(this.getDBFilePath())
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan(this.logger).getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'files.db');
        }

        return dbPath;
    }

    async get(query: any) {
        let record = undefined;
        let foundRecord = await this.DB.asyncFindOne(query)
        if (foundRecord) {
            record = foundRecord;
        }
        return record;
    }

    async getAll() {
        let records = [];
        let foundRecords = await this.DB.asyncFind({});
        if (foundRecords && foundRecords.length > 0) {
            records = <Array<any>>foundRecords;
        }
        return records;
    }
}