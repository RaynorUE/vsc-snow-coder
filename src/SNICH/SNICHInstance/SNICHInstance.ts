import * as vscode from 'vscode';
import { SystemLogHelper } from '../../classes/LogHelper';
import { WSFileMan } from '../../FileMan/WSFileMan';
import { SNICHConnection } from '../SNICHConnection/SNICHConnection';
import { SNICHInstancesService } from './SNICHInstancesService';

export class SNICHInstance {
    private data: SNICHConfig.Instance = {
        _id: undefined,
        name: "",
        rootPath: {
            path: "",
            fspath: ""
        }
    };

    logger = new SystemLogHelper();
    type = "SNICHInstance";

    connection: SNICHConnection;

    constructor(logger: SystemLogHelper, data?: SNICHConfig.Instance) {
        // If data is supplied, (likely called from instance selection) then use it!
        if (data) {
            this.data = data;

        }
        this.connection = new SNICHConnection(logger, this.getId());

    }

    /**
     * go through all the various setup questions and process for configuring a new SNICH Instance.
     */
    async setup(): Promise<boolean> {
        var func = "setup";
        this.logger.info(this.type, func, "ENTERING");

        let result = false;

        //to save as we go.
        const iService = new SNICHInstancesService(this.logger);

        if (this.getId() === undefined) {
            let insertResult = await iService.insert(this.getData());
            if (!insertResult) {
                this.logger.error(this.type, func, "Initial instance insert failed. Aborting setting!");
                this.logger.info(this.type, func, "LEAVING");
                return this.abortSetup("Critical failure. Check console logs.");
            }
        }

        let yesNo: vscode.QuickPickItem[] = [{ label: "$(thumbsup) Yes" }, { label: "$(thumbsdown) No" }];

        let enteredInstanceValue = await vscode.window.showInputBox({ ignoreFocusOut: true, prompt: `Enter Instance Name or URL.`, placeHolder: "https://dev00000.service-now.com", validateInput: (value) => this.validateName(value) });

        if (!enteredInstanceValue) {
            return this.abortSetup('No instance name or url entered.');
        }

        let instanceUrl = this.connection.getURL() || ``;

        if (enteredInstanceValue.indexOf('http://') > -1 || enteredInstanceValue.indexOf('https://') > -1) {
            //instance entered IS a URL.
            instanceUrl = enteredInstanceValue;
        } else if (enteredInstanceValue.indexOf('.') > -1) {
            //instance entered is not a FULL Url with protocol... add it..
            instanceUrl = `https://${enteredInstanceValue}`;
        } else {
            //last assumption is entered was JUST an instance name..
            instanceUrl = `https://${enteredInstanceValue}.service-now.com`;
        }

        let validateInstanceURL = await vscode.window.showQuickPick(yesNo, { ignoreFocusOut: true, placeHolder: `Continue with instance url? ${instanceUrl}` });
        if (!validateInstanceURL) {
            return this.abortSetup();
        }

        if (validateInstanceURL.label == 'No') {
            return this.setup(); //exit and start setup over again.
        }

        //save url
        await iService.update(this.getId(), this.getData());

        this.connection.setURL(instanceUrl);

        // Validate folder name. Giving an opportunity to change.
        let fixedInstanceName = this.getName() || instanceUrl.replace('https://', '').replace(':', '_');

        let instanceName = await vscode.window.showInputBox({ prompt: `Enter a folder name to use.`, ignoreFocusOut: true, value: fixedInstanceName });
        if (!instanceName) {
            return this.abortSetup('No folder name specified.');
        }

        this.setName(instanceName);

        await iService.update(this.getId(), this.getData());

        let authResult = await this.connection.setupAuth();
        if (!authResult) {
            this.logger.info(this.type, func, "LEAVING");
            return this.abortSetup('Auth setup failed miserably. Please try setting up instance again.');
        }

        let wsFileman = new WSFileMan(this.logger);
        const wsRoot = wsFileman.getWSRootUri();
        if (!wsRoot) {
            this.logger.error(this.type, func, 'For some reason we got here without a workspace root... we should have checked all that before now..')
            return this.abortSetup('No workspace loaded. Please load a folder to use as your workspace.');
        }

        this.setRootPath(vscode.Uri.joinPath(wsRoot, this.getName()));

        this.logger.info(this.type, func, "LEAVING");

        return result;
    }

    setName(name: string) { this.data.name = name }
    getName() { return this.data.name }
    validateName(name: string) {
        if (!name) {
            return 'Nothing entered. Try again.';
        } else {
            return null;
        }
    }

    abortSetup(msg?: string) {
        vscode.window.showWarningMessage('Instance setup aborted. ' + (msg || ""));
        return false;
    }

    setId(id: string) { this.data._id = id }
    getId() { return this.data._id }

    setRootPath(uri: vscode.Uri) {
        this.data.rootPath.fspath = uri.fsPath || "";
        this.data.rootPath.path = uri.path || "";
    }
    getRootPath(): vscode.Uri {
        return vscode.Uri.parse(this.data.rootPath.path);
    }

    setConnection(conn: SNICHConnection) {
        this.connection = conn;
    }

    getConnection() { return this.connection }

    async testConnection() {
        let result = await this.connection.testConnection();

        if (result) {
            vscode.window.showInformationMessage('Test Connection Successful!');
        } else {
            vscode.window.showWarningMessage('Unknown error occurred testing connection. Instance might be unavailable or some other failured occured.');
        }
    }

    async runBackgroundScript() {

    }

    /**
     * Set the internal data object from some source DB, JSON file, etc.
     * @param data Data loaded from somewhere
     */
    setData(data: SNICHConfig.Instance) {
        //de-reference
        const newData = { ...data };
        this.data = newData;
    }

    getData() {
        return this.data
    }
}

