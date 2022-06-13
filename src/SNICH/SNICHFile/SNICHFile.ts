import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';
import { SNICHPackageFileService } from "./SNICHFileService";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { VSCODEPrefs } from "../SNICHUtils/VSCODEPrefs";

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
    async savePackageFile(snichInstance: SNICHInstance, snichPackage: SNICHConfig.Package, table: SNICHConfig.Table, sys_id:string, column_name: string, ): Promise<SNICHConfig.File | undefined> {
        const func = 'savePackageFile';
        this.logger.info(this.type, func, `ENTERING`);

        let result;

        try {

            const service = this.getService(true);
            const instanceId = snichInstance.getId();
            
            if (!instanceId) {
                throw new Error('Got here without an instance ID... odd!');
            }
            const packageId = snichPackage._id;
            const instanceRoot = snichInstance.getRootPath();
            const multiFieldSep = new VSCODEPrefs().getMultiFieldSep();
            const packRoot = vscode.Uri.joinPath(instanceRoot, this.fixupPath(`${snichPackage.name} (${snichPackage.source})`));


            await vscode.workspace.fs.writeFile(uri, content);

            const existingFile = service?.get({ instance_id: instanceId, sys_id: sys_id, package_id: packageId, column_name: column_name });
            if (!existingFile) {
                //file doesn't exist... insert it into our DB!
                const fileData: SNICHConfig.File = { instance_id: instanceId, package_id: packageId, table: table, sys_id: sys_id, column_name: column_name, filePath: { fspath: uri.fsPath, path: uri.path } }
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

    /**
     * 
     * Save a generic "Data" file(record) from the instance. This is for saving "generic files" that are not associated to an application scope. Thus packageId is not required.
     * 
     * @param instanceId Instance Id from the SNICH DB
     * @param table table name of rec
     * @param sys_id sys_id of record
     * @param columnName column name that the "content" came from on that record (used for saving)
     * @param name the name of the file (separate from URI)
     * @param uri vsCode URI of file
     * @param content The content
     * @returns 
     */
    async saveDataFile(instanceId: string, table: string, sys_id: string, columnName: string, name: string, uri: vscode.Uri, content: Uint8Array): Promise<SNICHConfig.File | undefined> {
        const func = 'saveDataFile';
        this.logger.info(this.type, func, `ENTERING`);

        let result;

        try {

            const service = this.getService(true);


            await vscode.workspace.fs.writeFile(uri, content);

            const existingFile = service?.get({ instance_id: instanceId, sys_id: sys_id, column_name: columnName });
            if (!existingFile) {
                //file doesn't exist... insert it into our DB!
                const fileData: SNICHConfig.File = { instance_id: instanceId, table: table, sys_id: sys_id, column_name: columnName, filePath: { fspath: uri.fsPath, path: uri.path } }
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

            const service = this.getService(true);
            let fileURIStr = fileURI.toString(true);



        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    /**
     * Called to "Fix" bad characters for the current file system. Mostly effects win32/windows
     * @param path Path to find/replace invalid characters
     */
    fixupPath(path: string) {
        if (process.platform == "win32") {
            const badCharReplaceWith = new VSCODEPrefs().fileInvalCharSub();
            path = path.replace(/[<>:"\/\\\|?\*]/gm, badCharReplaceWith);
        }
        return path;
    }

}