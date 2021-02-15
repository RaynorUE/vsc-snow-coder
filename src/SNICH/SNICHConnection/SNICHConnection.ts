import requestPromise = require('request-promise-native');
import { SNQPItem } from '../../@Types';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';
import { SNICHRestClient } from './SNICHRestClient';
import * as vscode from 'vscode';
import { SystemLogHelper } from '../../classes/LogHelper';
import { SNICHWebServer } from '../SNICHWebServer/SNICHWebServer';
import { SNICHConnectionsService } from './SNICHConnectionsService';

export class SNICHConnection {
    private data: SNICHConfig.Connection = {
        _id: undefined,
        instance_id: "",
        auth: {
            type: "None",
            username: "",
            password: "",
            writeBasicToDisk: false,
            OAuth: {
                client_id: "",
                client_secret: "",
                token_expires_on: 0,
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

    private redirectURL = `http://localhost:62000/snich_oauth_redirect`;

    type = "SNICHConnection";
    logger: SystemLogHelper;

    constructor(logger: SystemLogHelper) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, "ENTERING");

        //load service, load snich connection data or stub in new.

        this.logger.info(this.type, func, "LEAVING");
    }

    async load(instanceId?: string) {
        var func = 'load';
        this.logger.info(this.type, func, `ENTERING`);
        if (!instanceId) {
            this.logger.info(this.type, func, `LEAVING`);
            throw new Error('Attempted to load an SNICHConnection without an instance ID. This would be fruitless.');
        } else {
            const connService = new SNICHConnectionsService(this.logger);
            let foundConnection = await connService.getByInstanceId(instanceId);
            if (foundConnection) {
                this.setData(foundConnection);
            } else {
                this.logger.debug(this.type, func, `Cannot find connection by id, but id provided, creating new connection.`);
                this.data.instance_id = instanceId;
                await this.save();
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }

    async save() {
        var func = 'save';
        this.logger.info(this.type, func, `ENTERING`);
        const connService = new SNICHConnectionsService(this.logger);
        if (this.data._id) {
            await connService.update(this.data._id, this.getData());
        } else {
            let insertResult = await connService.insert(this.getData());
            if (insertResult) {
                this.setData(insertResult); //so we store _id in class/memory
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }



    async setupAuth(): Promise<boolean> {
        var func = "setupAuth";
        this.logger.info(this.type, func, "ENTERING");


        //vscode window asking which auth type

        let authOptions = <Array<SNQPItem>>[
            { label: "$(account) Basic", description: "Use basic authentication. Password stored un-encrypted.", value: "basic" },
            { label: "$(lock) OAuth", description: "Use OAuth to authenticate. SNICH never sees your username or password.", value: "OAuth" },
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
        await this.save();
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
            validateInput: (value) => this.inputEntryMandatory(value),
            value: this.getUserName() || ""
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



        let launchChoices: Array<vscode.QuickPickItem> = [
            {
                label: "$(new-file) Create New",
                description: "Launch browser directly to form pre-filled with necessary bits on: " + this.getURL()
            },
            {
                label: "$(globe) View Existing",
                description: "I have an existing App Registry. Launch My browser directly to list of OAuth App Registrations."
            },
            {
                label: "$(check) I'm good",
                description: "I Have already setup an OAuth Application Registry and I have my Client ID and Client Secret handy."
            }
        ]

        let launchToOAuthAppRegistry = await vscode.window.showQuickPick(launchChoices, { ignoreFocusOut: true, placeHolder: `OAuth Application Registry on ${this.getURL()}?` });

        if (!launchToOAuthAppRegistry || !launchToOAuthAppRegistry.label) {
            this.logger.info(this.type, func, "LEAVING");
            return false;
        }

        if (launchToOAuthAppRegistry.label == 'Create New') {
            let newAppQueryParams = `sys_id=-1&sysparm_query=type=client^redirect_url=${this.redirectURL}^name=VSCode%20S.N.I.C.H.%20Users^logo_url=https://github.com/RaynorUE/snich/blob/master/images/icon-sn-oauth.PNG%3Fraw=true&sysparm_transaction_scope=global`; //?raw=true'
            let appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_entity.do?${newAppQueryParams}`, true);
            vscode.env.openExternal(appRegURL)
        }

        if (launchToOAuthAppRegistry.label == 'View Existing') {
            let queryParams = 'sysparm_query=type=client';
            let appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_entity_list.do?${queryParams}`, true);
            vscode.env.openExternal(appRegURL)
        }

        let clientID = await vscode.window.showInputBox(<vscode.InputBoxOptions>{ value: this.getclientId(), prompt: "Enter Client ID (1/2)", ignoreFocusOut: true, validateInput: (value) => this.inputEntryMandatory(value) });
        let clientSecret = await vscode.window.showInputBox(<vscode.InputBoxOptions>{ value: this.getClientSecret(), prompt: "Enter Client Secret (2/2)", ignoreFocusOut: true, validateInput: (value) => this.inputEntryMandatory(value) });

        if (!clientID || !clientSecret) {
            this.logger.info(this.type, func, "LEAVING");
            return false;
        }

        this.setAuthType('OAuth');
        this.setClientId(clientID);
        this.setClientSecret(clientSecret);

        let state = new SNICHCrypto().getOAuthState();
        // launch to the instance OAuth auth page. And startup our web server to listen for the response!
        const appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_auth.do?response_type=code&client_id=${this.getclientId()}&state=${state}&redirect_url=${this.redirectURL}`, true)
        //const appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_auth.do?client_id=${this.getclientId()}`);
        vscode.env.openExternal(appRegURL);

        let OAuthResult = await new SNICHWebServer().listenForCode(state);

        if (!OAuthResult) {
            this.logger.info(this.type, func, "OAuth setup aborted or failed.");
            this.logger.info(this.type, func, "LEAVING");
            return false;
        }



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
        this.logger.info(this.type, func, 'END');

        return result;
    }

    async launchOAuth(): Promise<boolean> {
        let result = false;


        return result;
    }

    /**
     * Will handle if access token has expired and attempt to get a new refresh token..
     */
    async getAccessToken(oauthCode?: String): Promise<string | undefined> {
        let func = 'getOAuthAccessToken';
        this.logger.info(this.type, func, "ENTERING");

        const oAuthData = this.data.auth.OAuth;

        //check to see if token is expired (looking 10 secs into future, so we trigger expired before token is actuall expired, reducing likelihood of actually using the expired token)
        let tokenExpired = (Date.now() + 10000) - oAuthData.token_expires_on <= 0;

        let res = undefined;

        if (!tokenExpired && !oauthCode) {
            this.logger.debug(this.type, func, "Token not expired! Returning!");
            //Token not expired, return it!
            res = oAuthData.token.access_token;

        } else {
            const oauthTokenURL = `${this.getURL()}/oauth_token.do`;
            let rClient = new SNICHRestClient(this.logger, this);

            if (oauthCode) {
                this.logger.debug(this.type, func, "Getting a new token with an Authorization Code.");
                let reqOpts: requestPromise.RequestPromiseOptions = {
                    form: {
                        grant_type: "authorization_code",
                        client_id: this.getclientId(),
                        client_secret: this.getClientSecret(),
                        code: oauthCode,
                        redirect_uri: this.redirectURL
                    }
                }

                let tokenData: any;

                try {
                    rClient.disableAuth();
                    tokenData = await rClient.post(oauthTokenURL, reqOpts);

                } catch (e) {
                    this.logger.error(this.type, func, "Error attempting to get new token using auth code", JSON.stringify(e, null, 4));
                }

                if (tokenData && tokenData.access_token) {
                    this.data.auth.OAuth.token = tokenData;
                    this.data.auth.OAuth.token_expires_on = this.calcExpiresOn(tokenData.expires_in);
                    res = tokenData.access_token;
                }

            } else if (oAuthData.token?.refresh_token) {
                this.logger.debug(this.type, func, "Token expired. Getting a new one using refresh token!");

                const config: requestPromise.RequestPromiseOptions = {
                    form: {
                        grant_type: "refresh_token",
                        client_id: oAuthData.client_id,
                        client_secret: oAuthData.client_secret,
                        refresh_token: oAuthData.token.refresh_token
                    }
                }

                let tokenData: any;

                try {
                    tokenData = await rClient.post('/oauth_token.do', config);
                } catch (e) {
                    this.logger.error(this.type, func, "Error attempting to get token using refresh token: ", JSON.stringify(e, null, 4));
                }

                if (tokenData && tokenData.access_token) {
                    this.data.auth.OAuth.token = tokenData;
                    this.data.auth.OAuth.token_expires_on = this.calcExpiresOn(tokenData.expires_in);
                }
            }
        }

        this.logger.info(this.type, func, "LEAVING");
        return res;
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
            let testAgain = false;
            this.logger.warn(this.type, func, `Bad login. Retrying... Attempt ( ${attemptNumber} / ${maxAttempts} )`);
            if (this.data.auth.type == 'Basic') {
                let newUsername = await this.askForUsername();
                let newPw = await this.askForPassword();
                if (newPw && newUsername) {
                    testAgain = true;
                }
            } else {

            }
            if (testAgain) {
                attemptNumber++;
                return await this.testConnection(attemptNumber);
            }

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

        if (!fields.includes('sys_id')) {
            fields.push('sys_id');
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

    async getAggregate(tableName: string, query: string, fields: string[], displayValue?: boolean | "all") {
        var func = 'getAggregate';
        this.logger.info(this.type, func, `ENTERING`);
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        if (!displayValue) {
            displayValue = false;
        }

        if (!fields.includes('sys_id')) {
            fields.push('sys_id');
        }

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_query: query,
                sysparm_group_by: fields.join(','),
                sysparm_count: true,
                sysparm_display_value: displayValue
            }
        }

        let restResults = await rClient.get(`/api/now/count/${tableName}`, config);
        this.logger.info(this.type, func, `LEAVING`);

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

    getId() {
        return this.data._id;
    }

    calcExpiresOn(durSecs: number) {
        return Date.now() + (durSecs * 1000);
    }
}