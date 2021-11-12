import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';
import { SNICHPackageFileService } from "./SNICHPackageFileService";
import { WSFileMan } from "../../FileMan/WSFileMan";

export class SNICHPackageFile {

    service?: SNICHPackageFileService;

    logger: SNICHLogger;
    type = "SNICHPackageFile";



    constructor(logger: SNICHLogger) {
        const func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.setService();

        this.logger.info(this.type, func, `LEAVING`);
    }

    setService(service?: SNICHPackageFileService) {
        this.service = service;
    }

    getService(setup?: boolean) {
        if (setup) {
            if (!this.service) {
                this.service = new SNICHPackageFileService(this.logger);
            }
        }
        return this.service;
    }

    /** will call WSFileman?  */
    //saves the file, writes to the DB
    async saveFile(instanceId: string, packageId: string, table: string, sys_id: string, columnName: string, name: string, uri: vscode.Uri, content: string): Promise<SNICHConfig.File | undefined> {
        const func = 'saveFile';
        this.logger.info(this.type, func, `ENTERING`);

        let result;

        try {

            const service = this.getService(true);


            await vscode.workspace.fs.writeFile(uri, Buffer.from(content));

            const existingFile = service?.get({ instance_id: instanceId, sys_id: sys_id, package_id: packageId, column_name:columnName });
            if (!existingFile) {
                //file doesn't exist... insert it into our DB!
                const fileData: SNICHConfig.File = { instance_id: instanceId, package_id: packageId, table: table, sys_id: sys_id, column_name: columnName, fsPath:uri.fsPath }
                result = service?.insert(fileData);
            }

        } catch (e) {
            this.logger.reportException(this.type, func, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;

    }

    async findFileByURI(fileURI: vscode.Uri) {
        const func = 'findFilebyURI';
        this.logger.info(this.type, func, `ENTERING`);

        let result: SNICHConfig.File | undefined = undefined;

        try {

            let wsFMan = new WSFileMan(this.logger);
            let wsRoot = wsFMan.getWSRootUri();

            if (wsRoot) {

                let fileURIStr = fileURI.toString(true);
                let wsRootStr = wsRoot.toString(true);
                let relativeFilePath = fileURIStr.replace(wsRootStr, '');

                //something to this effect. Not a fan of joining with a comma
                //but I guess all that really matters is that we are storing the same way
                //as we are trying to find it...
                let relativeFilePathFlattened = relativeFilePath.split('/').join(',');
                this.logger.debug(this.type, func, `relativeFilePathFlattened: `, relativeFilePathFlattened);

                let fileService = new SNICHPackageFileService(this.logger);
                fileService.getMultiple();

            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

}