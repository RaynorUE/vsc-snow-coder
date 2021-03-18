import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';
import { SNICHPackageFileService } from "./SNICHPackageFileService";
import { WSFileMan } from "../../FileMan/WSFileMan";

export class SNICHPackageFile {

    data: SNICHConfig.File | undefined;

    fields = ["sys_scope", "sys_scope.source", "sys_scope.sys_class_name", "sys_id"];

    logger: SNICHLogger;
    type = "SNICHPackageFile";
    snInstance: undefined | SNICHInstance;


    constructor(logger: SNICHLogger) {
        const func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    /** will call WSFileman?  */
    async saveFile(file: SNICHConfig.File) {

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