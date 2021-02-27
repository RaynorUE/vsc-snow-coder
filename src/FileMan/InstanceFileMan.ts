import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICH/SNICHLogger/SNICHLogger';

/**
 * Purpose is to handle read/writing files related to a given instance
 */

export class InstanceFileMan {
    logger: SNICHLogger;
    type = 'InstanceFileMan';

    constructor(logger: SNICHLogger) {
        this.logger = logger;
    }

    async createInstanceRoot(iRoot: vscode.Uri) {
        let func = 'createInstanceRoot';
        this.logger.info(this.type, func, "ENTERING");
        this.logger.debug(this.type, func, "iRoot: ", iRoot);

        let res = false;

        try {
            let fs = vscode.workspace.fs;
            let existingDir;
            try {
                existingDir = await fs.readDirectory(iRoot);
            } catch (e) {
                existingDir = undefined;
            }

            if (existingDir) {
                this.logger.debug(this.type, func, "Found existing directory. Returning true!");
                res = true;
            } else {
                this.logger.debug(this.type, func, "Did not find existing directing... creating it!");
                await fs.createDirectory(iRoot);
                res = true; // if we make it to this line, previous did not throw an error, otherwise directory got created... somewhere! hah.
            }
        } catch (e) {
            this.logger.reportException(this.type, func, e);
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }
        return res;
    }

}