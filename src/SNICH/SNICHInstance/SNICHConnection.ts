import requestPromise = require('request-promise-native');
import { SNQPItem } from '../../@Types';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';
import { SNICHRestClient } from './SNICHRestClient';
import * as vscode from 'vscode';
import { SystemLogHelper } from '../../classes/LogHelper';

export class SNICHConnection {
    private data: SNICHConfig.Connection = {
        auth: {
            type: "None",
            username: "",
            password: "",
            writeBasicToDisk: false,
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
                },
            }

        },
        url: ""
    }

    type = "SNICHConnection";
    logger: SystemLogHelper;

    constructor(logger: SystemLogHelper) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, "ENTERING");

        this.logger.info(this.type, func, "LEAVING");
    }

    async setupAuth(): Promise<boolean> {
        var func = "setupAuth";
        this.logger.info(this.type, func, "ENTERING");


        //vscode window asking which auth type

        let authOptions = <Array<SNQPItem>>[
            { label: "Basic", description: "Use basic authentication. Password stored un-encrypted.", value: "basic" },
            { label: "OAuth (Preferred)", description: "Use OAuth to authenticate. SNICH never sees your username or password.", value: "OAuth" },
        ];

        let authSelect = await vscode.window.showQuickPick(authOptions, { placeHolder: "Select an authentcation option", ignoreFocusOut: false });

        if (!authSelect) {
            this.logger.info(this.type, func, "LEAVING");
            return this.abortSetup();
        }

        let authSetup = false;

        if (authSelect.value == "basic") {
            authSetup = await this.setupBasicAuth();
        } else if (authSelect.value == "OAuth") {
            authSetup = await this.setupOAuth();
        }
        this.logger.info(this.type, func, "Authsetup: ", authSetup);
        this.logger.info(this.type, func, "LEAVING");

        return authSetup;
    }

    async setupBasicAuth(): Promise<boolean> {
        var func = "setupBasicAuth";
        this.logger.info(this.type, func, "ENTERING");
        let result = false;

        this.setAuthType("Basic");
        this.setStoreBasicToDisk(true);

        let username = await this.askForUsername();
        let password = await this.askForPassword();

        if (!username || !password) {
            this.abortSetup();
        }

        let connResult = false;
        try {
            connResult = await this.testConnection();
        } catch (e) {
            connResult = false;
        }

        result = connResult;

        this.logger.info(this.type, func, "LEAVING");


        return result;
    }

    async askForUsername(): Promise<string> {
        var inputConfig: vscode.InputBoxOptions = {
            prompt: `Enter User Name`,
            ignoreFocusOut: true,
            validateInput: (value) => this.inputEntryMandatory(value)
        }
        let username = await vscode.window.showInputBox(inputConfig);
        if (username) {
            this.setUserName(username);
        } else {
            username = "";
        }

        return username;
    }

    async askForPassword(): Promise<string> {
        var inputConfig: vscode.InputBoxOptions = {
            prompt: `Enter password for ${this.getUserName()}`,
            password: true,
            ignoreFocusOut: true,
            validateInput: (value) => this.inputEntryMandatory(value)
        }
        let password = await vscode.window.showInputBox(inputConfig);
        if (password) {
            this.setPassword(password);
        } else {
            password = "";
        }

        return password;
    }

    async setupOAuth(): Promise<boolean> {
        var func = "setupOAuth";
        this.logger.info(this.type, func, "ENTERING");
        let result = false;

        //if oAuth
        //ask for "Setup new, got my stuff, open list of OAuth providers";

        //if Setup New, launch to form view (like you do already)

        //if open list of OAuth Provides, open window, and move on..


        //ask for OAuth Details method
        //await clientID
        //await client secret

        //Method for "Launch Web Server" and "Launch OAuth code grant flow browser", useful for first setup, but also useful when refresh token does not work or is expired..
        /*
                let connTest = await this.testConnection();
                if (connTest != 200) {
                    if (connTest == 401) {
        
                    } else {
                        this.logger.info(this.type, func, "LEAVING");
                        return false;
                    }
        
                }
                */

        return result;
    }

    async launchOAuth(): Promise<boolean> {
        let result = false;


        return result;
    }



    /**
     * Will handle if access token has expired and attempt to get a new refresh token..
     */
    async getOAuthAccessToken(): Promise<SNICHConfig.OAuthToken | undefined> {

        if (this.data.auth.type !== 'OAuth') {
            throw 'Attempted to get an OAuthAccessToken and Auth type is: ' + this.data.auth.type;
        }


        const oAuthData = this.data.auth.OAuth;
        let launchFlow = false;

        if (!oAuthData.token.access_token) {
            launchFlow = true;
        }

        let now = Date.now();
        let hadTokenFor = now - oAuthData.lastRetrieved + 10000; //add 10000 milliseconds (10 seconds), to account for time sync issues, and making sure we attempt to get a new token BEFORE it actually expires.
        let expiresIn = oAuthData.token.expires_in * 1000; //SN returns "Seconds" need this to be milliseconds for comparison


        if (hadTokenFor < expiresIn && !launchFlow) {
            //Token not expired, return it!
            return oAuthData.token;

        } else if (!launchFlow) {
            //Token expired, get a new one!
            const sConn = this;
            const rClient = new SNICHRestClient(this.logger, sConn);

            const config: requestPromise.RequestPromiseOptions = {
                form: {
                    grant_type: "refresh_token",
                    client_id: oAuthData.client_id,
                    client_secret: oAuthData.client_secret,
                    refresh_token: oAuthData.token.refresh_token
                }
            }


            try {
                let results: any = await rClient.get('/oauth_token.do', config);
                if (results) {
                    let accessToken: SNICHConfig.OAuthToken = results;
                    return accessToken;
                }

            } catch (e) {
                launchFlow = true;

            }
        }


        if (launchFlow) {
            // call the method to launch the flow and test connection, etc.. 
        }



    }

    async testConnection(attemptNumber?: number): Promise<boolean> {
        let func = 'testConnection';
        this.logger.info(this.type, func, "ENTERING");
        let rClient = new SNICHRestClient(this.logger, this);

        let result = false;
        let retry = false;
        let maxAttempts = 3;

        if (!attemptNumber) {
            attemptNumber = 0;
        }

        this.logger.debug(this.type, func, "About to get the current user!");

        try {
            let restResult: any = await rClient.get('/api/now/table/sys_user', { qs: { sysparm_query: `sys_id=javascript:gs.getUserID()`, sysparm_limit: 1, sysparm_fields: "user_name" } });
            this.logger.debug(this.type, func, "result: ", restResult);
            if (restResult.result[0]?.user_name) {
                result = true;
            }
        } catch (e) {
            this.logger.warn(this.type, func, "an error occurred making the rest call!", e);
            const error: rpError = e;
            if (error.name == 'StatusCodeError' && error.statusCode == 401) {
                result = false;
                retry = true;
            }
        }

        if (retry && attemptNumber < maxAttempts) {
            this.logger.warn(this.type, func, `Bad login. Retrying... Attempt ( ${attemptNumber} / ${maxAttempts} )`);
            if (this.data.auth.type == 'Basic') {
                await this.askForPassword();
            } else {

            }
            attemptNumber++;
            return await this.testConnection(attemptNumber);
        }

        this.logger.info(this.type, func, "LEAVING");
        return result;

    }

    async handleAuthFailure() {
        /**
         * @todo if 401, and type is basic, re-ask for password. If type is oauth
         */
    }

    /**
     * Puts a record in the SN Instance, performing an update with the supplied data.
     */
    async putRecord(tableName: string, sys_id: string, body: requestPromise.RequestPromiseOptions) {
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        //spread in our incoming body object, 
        const config: requestPromise.RequestPromiseOptions = {
            body: { ...body },
            qs: {
                sysparm_exclude_reference_links: true,
                sysparm_display_value: false,
            }
        }

        rClient.put(`/api/now/table/${tableName}/${sys_id}`, config);
    }

    async getRecord(tableName: string, sys_id: string, fields: string[], displayValue: boolean | "all") {
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        rClient.get(`/api/now/table/${tableName}/${sys_id}`, config);

    }

    async getRecords(tableName: string, query: string, fields: string[], displayValue?: boolean | "all") {
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        if (!displayValue) {
            displayValue = false;
        }

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_query: query,
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        let restResults = await rClient.get(`/api/now/table/${tableName}`, config);

        return restResults;
    }

    /**
     * 
     * @param name the name of the user preference to get
     * @param username The username to get the preference for. If not supplied will grab "global"
     */
    async getPreference(name: string, username?: string) {

        let encQuery = `name=${name}^system=true^user=NULL`;
        if (username) {
            encQuery = `name=${name}^user.user_name=${username}`;
        }

        let result = await this.getRecords('sys_user_preference', encQuery, ['value', 'name']);

        return result;
    }

    async executeBackgroundScript(script: string, scope: string) {
        // Storing here a way to login with a get request and grab the g_ck and also likely setup the cookiejar
        // https://dev96649.service-now.com/login.do?user_name=admin&sys_action=sysverb_login&user_password=hz3O0dCsMCeZ
    }


    getURL() { return this.data.url };
    setURL(url: string) { this.data.url = url }
    setData(data: SNICHConfig.Connection) {
        const newData = { ...data }
        this.data = newData;
    }
    getData() { return this.data }
    getAuthType() { return this.data.auth.type }
    setAuthType(authType: SNICHConfig.authTypes) { this.data.auth.type = authType }
    getUserName() { return this.data.auth.username }
    setUserName(userName: string) {
        this.data.auth.username = userName;
    }
    setStoreBasicToDisk(flag: boolean) {
        this.data.auth.writeBasicToDisk = flag;
    }
    getStoreBasicToDisk() { return this.data.auth.writeBasicToDisk }
    getPassword() {
        var func = 'getPassword';
        this.logger.info(this.type, func, "ENTERING");
        if (!this.data.auth.password) {
            return ``;
        }

        var crypt = new SNICHCrypto();
        this.logger.debug(this.type, func, "About to decrypt password: ", this.data.auth.password);
        var decryptedPw = crypt.decrypt(this.data.auth.password);
        this.logger.debug(this.type, func, "Finished decrypting password");

        this.logger.info(this.type, func, "LEAVING");

        return decryptedPw || ``;
    }
    setPassword(password: string) {
        /**
         * @todo setup crypto!
         */
        if (password) {
            var crypt = new SNICHCrypto();
            var encryptedPw = crypt.encrypt(password);
            this.data.auth.password = encryptedPw;
        } else {
            this.data.auth.password = '';
        }

    }
    getclientId() { return this.data.auth.OAuth?.client_id }
    setClientId(clientId: string) {
        this.data.auth.OAuth.client_id = clientId;

    }
    getClientSecret() {
        if (this.data.auth.OAuth.client_secret) {
            return new SNICHCrypto().decrypt(this.data.auth.OAuth.client_secret);
        } else {
            return ``;
        }
    }
    setClientSecret(secret: string) {
        this.data.auth.OAuth.client_secret = new SNICHCrypto().encrypt(secret);
    }
    getOAuthToken() { return this.data.auth.OAuth.token }
    setOAuthToken(token: SNICHConfig.OAuthToken) {
        this.data.auth.OAuth.token = token;
    }

    abortSetup(msg?: string) {
        vscode.window.showWarningMessage(`Instance Authentication Setup Aborted. ${msg || ""}`);
        return false;
    }

    inputEntryMandatory(value: any) {
        if (!value) {
            return 'Entry required.';
        } else {
            return null;
        }
    }
}