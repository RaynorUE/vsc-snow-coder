import * as vscode from 'vscode';
import { SystemLogHelper } from '../../classes/LogHelper';
import { SNICHConnection } from './SNICHConnection';

export class SNICHInstance {
    private data: SNICHConfig.Instance = {
        _id: "",
        connection: {
            auth: {
                type: "None",
                writeBasicToDisk: false,
                username: "",
                password: "",
                OAuth: {
                    client_id: "",
                    client_secret: "",
                    lastRetrieved: 0,
                    token: {
                        access_token: "",
                        expires_in: 0,
                        refresh_token: "",
                        scope: "",
                        token_type: ""
                    }
                }


            },
            url: ""
        },
        name: "",
        rootPath: {
            path: "",
            fspath: ""
        }
    };

    logger = new SystemLogHelper();
    type = "SNICHInstance";

    connection = new SNICHConnection();

    constructor(logger: SystemLogHelper, data?: SNICHConfig.Instance) {
        if (data) {
            this.setData(data);
        }
    }

    /**
     * go through all the various setup questions and process for configuring a new SNICH Instance.
     */
    async setup(): Promise<boolean> {
        var func = "setup";
        this.logger.info(this.type, func, "ENTERING");

        let result = false;
        let yesNo: vscode.QuickPickItem[] = [{ label: "Yes" }, { label: "No" }];

        let enteredInstanceValue = await vscode.window.showInputBox({ ignoreFocusOut: true, prompt: `Enter Instance Name or URL.`, placeHolder: "https://dev00000.service-now.com", validateInput: (value) => this.validateName(value) });

        if (!enteredInstanceValue) {
            return this.abortSetup('No instance name or url entered.');
        }

        let instanceUrl = ``;

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

        let yesNoInstance = [...yesNo];
        yesNoInstance[0].label = `Yes --> ${instanceUrl}`;
        let validateInstanceURL = await vscode.window.showQuickPick(yesNo, { ignoreFocusOut: true, placeHolder: `Continue with instance url? ${instanceUrl}` });
        if (!validateInstanceURL) {
            return this.abortSetup();
        }

        if (validateInstanceURL.label == 'No') {
            return this.setup(); //exit and start setup over again.
        }

        this.connection.setURL(instanceUrl);

        // Validate folder name. Giving an opportunity to change.
        let fixedInstanceName = instanceUrl.replace('https://', '').replace(':', '_');

        let instanceName = await vscode.window.showInputBox({ prompt: `Enter a folder name to use.`, ignoreFocusOut: true, value: fixedInstanceName });
        if (!instanceName) {
            return this.abortSetup('No folder name specified.');
        }

        this.setName(instanceName);

        let authResult = await this.connection.setupAuth();
        if (!authResult) {
            this.logger.info(this.type, func, "LEAVING");
            return this.abortSetup('Auth setup failed miserably. Please try setting up instance again.');
        }

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
        this.data.connection = conn.getData()
    }

    getConnection() { return this.connection }

    async testConnection() {
        let resultStatusCode = await this.connection.testConnection();

        if (resultStatusCode === 200) {
            vscode.window.showInformationMessage('Test Connection Successful!');
        } else if (resultStatusCode == 401) {
            //unauthoried
            /**
             * @todo re-ask for authentication information.
             */
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

        const newConn = new SNICHConnection();
        newConn.setData(newData.connection);

        this.connection = newConn;

    }

    getData() {
        const connData = { ...this.connection.getData() };
        if (this.connection.getStoreBasicToDisk()) {
            //clearing before any getData calls... which should be when we write to disk.. This effectively lets us store it in memory.
            connData.auth.password = '';

        }

        this.data.connection = connData; //make sure we have latest connection data as well.
        return this.data
    }
}

