import * as vscode from 'vscode';
import { SystemLogHelper } from '../classes/LogHelper';

/**
 * Purpose is to handle read/writing files related to a given instance
 */

export class InstanceFileMan {
    instance: SNICHConfig.Instance;
    logger: SystemLogHelper;
    type = 'InstanceFileMan';

    constructor(logger: SystemLogHelper, instance: SNICHConfig.Instance) {
        this.instance = instance;
        this.logger = logger;
    }

    async createInstanceRoot(iRoot: vscode.Uri) {
        let func = 'createInstanceRoot';
        this.logger.info(this.type, func, "ENTERING");
        this.logger.debug(this.type, func, "iRoot: ", iRoot);

        let res = false;

        try {
            let fs = vscode.workspace.fs;
            let existingDir = await fs.readDirectory(iRoot);
            if (existingDir) {
                res = true;
            } else {

                let newDir = await fs.createDirectory(iRoot);
                res = true; // if we make it to this line, previous did not throw an error, otherwise directory got created... somewhere! hah.
            }
        } catch (e) {

        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }
    }

}