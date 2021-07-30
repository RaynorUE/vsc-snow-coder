import * as vscode from 'vscode';
import { WSFileMan } from '../FileMan/WSFileMan';
import AsyncNedb from 'nedb-async'
import { SNICHLogger } from '../SNICH/SNICHLogger/SNICHLogger';


export class SNICHFileDB {
    DB = new AsyncNedb();
    logger: SNICHLogger;
    constructor(logger: SNICHLogger) {
        this.logger = logger;
        const DBfilePath = this.getDBFilePath();
        if (!DBfilePath) {
            throw new Error('Unable to load QPItemDB! Somehow this got called without valid workspace!');
        }
        this.DB = new AsyncNedb({autoload: true, filename: this.getDBFilePath()?.fsPath})
    }

    getDBFilePath(): vscode.Uri | undefined {
        const wsRootUri = new WSFileMan(this.logger).getWSRootUri();
        let dbPath = undefined;
        if (wsRootUri) {
            dbPath = vscode.Uri.joinPath(wsRootUri, '.snich', 'db', 'qpitem.db');
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