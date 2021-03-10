import { SNICHConnection } from "../SNICHConnection/SNICHConnection";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';
import { SNICHPackageFileService } from "./SNICHPackageFileService";
import { WSFileMan } from "../../FileMan/WSFileMan";

export class SNICHPackageFile {

    data: SNICHConfig.File = {
        _id: undefined,
        content_field: "",
        fsPath: "",
        instance_id: "",
        name: "",
        package_id: "",
        sys_id: "",
        table: ""
    };

    fields = ["sys_scope", "sys_scope.source", "sys_scope.sys_class_name", "sys_id"];

    logger: SNICHLogger;
    type = "SNICHPackageFile";


    constructor(logger: SNICHLogger) {
        const func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    async pullNewFile() {

    }


    async pullFile(fileURI: vscode.Uri) {
        const func = 'pullFile';
        this.logger.info(this.type, func, `ENTERING`);

        let result: boolean | undefined = undefined;

        try {



        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    async pushFile(fileURI: vscode.Uri, value: any) {
        const func = 'pushFile';
        this.logger.info(this.type, func, `ENTERING`);
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
                let relativeFilePathFlattend = relativeFilePath.split('/').join(',');

                let fileService = new SNICHPackageFileService(this.logger);

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