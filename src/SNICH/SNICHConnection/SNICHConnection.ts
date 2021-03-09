import requestPromise = require('request-promise-native');
import { SNQPItem } from '../../@Types';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';
import { SNICHRestClient } from './SNICHRestClient';
import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
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

    private redirectURL = `https://localhost:62000/snich_oauth_redirect`;

    type = "SNICHConnection";
    logger: SNICHLogger;

    constructor(logger: SNICHLogger) {
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

    async delete(): Promise<undefined | boolean> {
        const func = 'delete';
        this.logger.info(this.type, func, `ENTERINg`);
        let result = undefined;

        try {

            let connService = new SNICHConnectionsService(this.logger);
            let deleteResult = connService.delete(this.getId());
            result = deleteResult;

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = false;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }

        return result;
    }

    async setupAuth(): Promise<boolean> {
        var func = "setupAuth";
        this.logger.info(this.type, func, "ENTERING");


        //vscode window asking which auth type

        let authOptions = <Array<SNQPItem>>[
            { label: "$(account) Basic", description: "Use basic authentication. Password stored un-encrypted.", value: "basic" },
            { label: "$(lock) OAuth", description: "Use OAuth to authenticate. SNICH never sees your username or password.", value: "OAuth" },
        ];

        let authSelect = await vscode.window.showQuickPick(authOptions, { placeHolder: "Select an authentication option", ignoreFocusOut: true });

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



        let launchChoices: Array<qpWithValue> = [
            {
                label: "$(check) I'm good",
                description: "I Have already setup an OAuth Application Registry and I have my Client ID and Client Secret handy.",
                value: "im_good"
            },
            {
                label: "$(new-file) Create New",
                description: "Launch browser directly to form pre-filled with necessary bits on: " + this.getURL(),
                value: "create_new"
            },
            {
                label: "$(globe) View Existing",
                description: "I have an existing App Registry. Launch My browser directly to list of OAuth App Registrations.",
                value: "view_existing"
            }

        ]

        let launchToOAuthAppRegistry = await vscode.window.showQuickPick(launchChoices, { ignoreFocusOut: true, placeHolder: `OAuth Application Registry on ${this.getURL()}?` });

        if (!launchToOAuthAppRegistry || !launchToOAuthAppRegistry.label) {
            this.logger.info(this.type, func, "LEAVING");
            return false;
        }

        if (launchToOAuthAppRegistry.value === 'create_new') {
            let newAppQueryParams = `sys_id=-1&sysparm_query=type=client^redirect_url=${this.redirectURL}^name=VSCode%20S.N.I.C.H.%20Users^logo_url=https://github.com/RaynorUE/snich/blob/master/images/icon-sn-oauth.PNG%3Fraw=true&sysparm_transaction_scope=global`; //?raw=true'
            let appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_entity.do?${newAppQueryParams}`, true);
            vscode.env.openExternal(appRegURL)
        }

        if (launchToOAuthAppRegistry.value === 'view_existing') {
            let queryParams = 'sysparm_query=type=client';
            let appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_entity_list.do?${queryParams}`, true);
            vscode.env.openExternal(appRegURL)
        }

        let clientID = await vscode.window.showInputBox(<vscode.InputBoxOptions>{ value: this.getclientId(), prompt: "Enter Client ID (1/2)", ignoreFocusOut: true, validateInput: (value) => this.inputEntryMandatory(value) });
        let clientSecret = await vscode.window.showInputBox(<vscode.InputBoxOptions>{ value: this.getClientSecret(), prompt: "Enter Client Secret (2/2)", ignoreFocusOut: true, password: true, validateInput: (value) => this.inputEntryMandatory(value) });

        if (!clientID || !clientSecret) {
            this.logger.info(this.type, func, "LEAVING");
            return false;
        }

        this.setAuthType('OAuth');
        this.setClientId(clientID);
        this.setClientSecret(clientSecret);
        this.save();

        await this.getNewAccessToken();

        let connResult = false;
        try {
            connResult = await this.testConnection();
        } catch (e) {
            connResult = false;
        }

        result = connResult;
        this.logger.info(this.type, func, 'END');

        return result;
    }

    async getNewAccessToken() {
        var func = 'getNewAccessToken';
        this.logger.info(this.type, func, `ENTERING`);

        let res = undefined;

        let state = new SNICHCrypto().getOAuthState();
        // launch to the instance OAuth auth page. And startup our web server to listen for the response!

        const appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_auth.do?response_type=code&client_id=${this.getclientId()}&state=${state}&redirect_url=${this.redirectURL}`, true)
        //const appRegURL = vscode.Uri.parse(`${this.getURL()}/oauth_auth.do?client_id=${this.getclientId()}`);
        vscode.env.openExternal(appRegURL);

        let awaitCodeProgressOpts = { location: vscode.ProgressLocation.Notification, cancellable: true, title: "Awaiting OAuth Code Redirect. Please follow instructions in browser" };
        let OAuthCode = undefined;
        let sWS = new SNICHWebServer();
        await vscode.window.withProgress(awaitCodeProgressOpts, async (prog, cancelToken) => {
            let func = 'awaitCodeProgress';
            this.logger.debug(this.type, func, `ENTERING`);
            prog.report({
                message: "Awaiting OAuthCode Redirect",
            });
            this.logger.info(this.type, func, `Progress report occured.`);

            cancelToken.onCancellationRequested(() => {
                this.logger.debug(this.type, func, `Cancel for awaitOAuthCode. Closing web server!`);
                sWS.closeServer()
            });
            OAuthCode = await sWS.listenForCode(state);
            this.logger.info(this.type, func, `LEAVING`);
            return OAuthCode;
        })


        if (!OAuthCode) {
            this.logger.info(this.type, func, "OAuth setup aborted or failed.");
            this.logger.info(this.type, func, "LEAVING");
            res = undefined;
            return res;
        }

        this.logger.info(this.type, func, `LEAVING`);
        return await this.getAccessToken(OAuthCode);

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
                    baseUrl: "",
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
                    /** TODO: Need to handle errors when bad client id / secret which will cause a 401 here */
                    tokenData = await rClient.post(oauthTokenURL, reqOpts);

                } catch (e) {
                    this.logger.error(this.type, func, "Error attempting to get new token using auth code", JSON.stringify(e, null, 4));
                }

                if (tokenData && tokenData.access_token) {
                    this.setOAuthToken(tokenData);
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
                let refreshTokenInvalid = false;

                try {
                    tokenData = await rClient.post('/oauth_token.do', config);
                } catch (e) {
                    if (e.statusCodeError == 401) {

                        refreshTokenInvalid = true;

                    } else {
                        this.logger.error(this.type, func, "Error attempting to get token using refresh token: ", JSON.stringify(e, null, 4));
                    }

                }

                if (refreshTokenInvalid) {
                    this.logger.info(this.type, func, "LEAVING");
                    return await this.getNewAccessToken();
                }

                if (tokenData && tokenData.access_token) {
                    this.setOAuthToken(tokenData);
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

    async getRecord<T>(tableName: string, sys_id: string, fields: string[], displayValue: boolean | "all"): Promise<T | undefined> {
        var func = 'getRecord';
        this.logger.info(this.type, func, `ENTERING`);
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        let result = undefined;

        if (!fields.includes('sys_id')) {
            fields.push('sys_id');
        }

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        let restResponse = undefined;
        try {

            restResponse = await rClient.get<SNTableAPIResponse<T>>(`/api/now/table/${tableName}/${sys_id}`, config);
            if (restResponse) {
                result = restResponse.result;
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
            return result;
        }

    }

    async getRecords<T>(tableName: string, query: string, fields: string[], displayValue?: boolean | "all"): Promise<T[]> {
        var func = 'getRecords';
        this.logger.info(this.type, func, `ENTERING`);
        const sConn = this;
        const rClient = new SNICHRestClient(this.logger, sConn);

        let result: T[] = [];

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

        let restResponse = undefined;

        try {
            restResponse = await rClient.get<SNTableAPIResponse<T[]>>(`/api/now/table/${tableName}`, config);

            if (restResponse) {
                result = restResponse.result;
            }
        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
            return result;
        }

    }

    async getAggregate<T>(tableName: string, query: string, fields: string[], displayValue?: boolean | "all", progressOpts?: vscode.ProgressOptions, sortUpdated?: "ASC" | "DESC"): Promise<T[]> {
        var func = 'getAggregate';
        this.logger.info(this.type, func, `ENTERING`);

        let execute = async (progress?: vscode.Progress<{ message?: string | undefined; increment?: number | undefined; }>, cancelToken?: vscode.CancellationToken) => {
            let func = 'execute';

            this.logger.debug(this.type, func, `progress: `, progress);
            this.logger.debug(this.type, func, `cancelToken: `, cancelToken);

            const sConn = this;
            const rClient = new SNICHRestClient(this.logger, sConn);

            let result: T[] = [];

            if (!displayValue) {
                displayValue = false;
            }

            if (!fields.includes('sys_id')) {
                fields.push('sys_id');
            }

            if (sortUpdated && !fields.includes('sys_updated_on')) {
                fields.push('sys_updated_on');
            }

            const config: requestPromise.RequestPromiseOptions = {
                qs: {
                    sysparm_query: query,
                    sysparm_group_by: fields.join(','),
                    sysparm_count: true,
                    sysparm_display_value: displayValue
                }
            }

            let restResponse = undefined;
            this.logger.debug(this.type, func, `About to get...`);
            try {
                restResponse = await rClient.get<SNTableStatsResponse>(`/api/now/stats/${tableName}`, config);
                this.logger.info(this.type, func, `restResponse:`, restResponse);

                if (restResponse) {
                    let restResults = restResponse.result;
                    if (restResults && restResults.length > 0) {
                        //remap into flat object since aggregate can be messy..
                        let mappedResults = restResults.map((recRes: any) => {
                            var newObj: any = {};
                            recRes.groupby_fields.forEach((field: any) => {
                                let value = field.value;
                                if (field.field == 'sys_updated_on') {
                                    value = Date.parse(value);
                                }
                                newObj[field.field] = value;

                                if (displayValue == 'all') {
                                    let dv = field.display_value;
                                    newObj[field.field] = {
                                        value: value,
                                        display_value: dv
                                    }
                                }
                            });

                            return newObj;
                        });

                        if (sortUpdated) {
                            if (sortUpdated == 'ASC') {
                                mappedResults = mappedResults.sort((a, b) => a.sys_updated_on - b.sys_updated_on);
                            } else if (sortUpdated == 'DESC') {
                                mappedResults = mappedResults.sort((a, b) => b.sys_updated_on - a.sys_updated_on);
                            }
                        }

                        result = mappedResults;
                    }
                }

            } catch (e) {
                this.logger.error(this.type, func, `Onos an error has occured!`, e);
                result = [];
            } finally {
                this.logger.info(this.type, func, `LEAVING`);
                return result;
            }
        }

        if (progressOpts) {
            return await vscode.window.withProgress(progressOpts, execute);
        } else {
            return await execute();
        }

    }

    /**
     * 
     * @param name the name of the user preference to get
     * @param username The username to get the preference for. If not supplied will grab "global"
     */
    async getPreference(name: string): Promise<string | undefined> {
        const func = 'getPreference';
        this.logger.info(this.type, func, `ENTERING`);
        this.logger.debug(this.type, func, `name: `, name);

        let result = undefined;

        try {

            const sConn = this;
            let rClient = new SNICHRestClient(this.logger, sConn);

            var qConfig: requestPromise.RequestPromiseOptions = {
                qs: {
                    sysparm_pref_name: name
                }
            }

            let prefResult = await rClient.get<any>('/api/now/ui/user/current/preferences', qConfig);
            this.logger.debug(this.type, func, `prefResult: `, prefResult);
            if (prefResult) {
                result = prefResult.result[name];
            }

        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`, result);
        }
        return result;
    }

    async savePreference(name: string, value: string) {
        const func = 'savePreference';
        this.logger.info(this.type, func, `ENTERING`);

        let result = undefined;

        try {

            const sConn = this;
            let rClient = new SNICHRestClient(this.logger, sConn);

            const prefBody: any = {};
            prefBody[name] = value;
            var rpConfig: requestPromise.RequestPromiseOptions = {
                body: prefBody
            }
            let prefResult = await rClient.post('/api/now/ui/user/current/preferences', rpConfig);

            if (prefResult) {
                result = prefResult;
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`, result);
        }

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

    getInstanceId() {
        return this.data.instance_id;
    }

    setInstanceId(id: string) {
        this.data.instance_id = id;
    }

    calcExpiresOn(durSecs: number) {
        return Date.now() + (durSecs * 1000);
    }
}

declare interface qpWithValue extends vscode.QuickPickItem {
    value: any;
}

declare interface preferenceResult {
    result: {
        [prefName: string]: string
    }
}