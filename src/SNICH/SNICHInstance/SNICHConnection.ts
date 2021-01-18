import * as vscode from 'vscode';
import requestPromise = require('request-promise-native');
import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';
import { SNICHRestClient } from './SNICHRestClient';

export class SNICHConnection {
    private data: SNICHConfig.Connection = {
        auth: {
            type: SNICHConfig.authTypes.None,
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
                }
            }

        },
        url: ""
    }

    constructor() {

    }

    setupAuth(){

        //vscode window asking which auth type

        //if basic auth
        //ask for username && password method


        //if oAuth
        //ask for "Setup new, got my stuff, open list of OAuth providers";

        //if Setup New, launch to form view (like you do already)

        //if open list of OAuth Provides, open window, and move on..


        //ask for OAuth Details method
        //await clientID
        //await client secret

        //Method for "Launch Web Server" and "Launch OAuth code grant flow browser", useful for first setup, but also useful when refresh token does not work or is expired..


        //finally test connection. Which will handle re-asking for appropriate into based on config..
        
    }

    async setupBasicAuth():Promise<boolean> {

        let result = false;
        //ask for username

        //ask for password

        return result;
    }

    async setupOAuth():Promise<boolean>{

        let result = false;

        //await for "How to get ClientID/Secret";

        //ask for client id

        //ask for client secret

        //launchOAuth


        return result;
    }

    async launchOAuth():Promise<boolean>{
        let result = false;


        return result;
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
        if (!this.data.auth.password) {
            return ``;
        }
        var crypt = new SNICHCrypto();
        var decryptedPw = crypt.decrypt(this.data.auth.password);
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

    /**
     * Will handle if access token has expired and attempt to get a new refresh token..
     */
    getOAuthAccessToken() {

    }
    

    getOAuthTokenType() { return this.data.auth.OAuth.token.token_type }

    async testConnection():Promise<number | undefined> {
        const sConn = this;
        let rClient = new SNICHRestClient(sConn);
        let result;
        try {
            let restResult = await rClient.get('/api/now/table/', { qs: { sysparm_query: `user_name=${this.getUserName()}`, sysparm_limit: 1 } });
            if (restResult.statusCode) {
                result = restResult.statusCode;
            }
        } catch (e) {
            const error:rpError = e;
            if (error.name == 'StatusCodeError' && error.statusCode == 401) {
                result = e.statusCode
            }
        }

        return result;

    }

    handleAuthFailure() {
        /**
         * @todo if 401, and type is basic, re-ask for password. If type is oauth
         */
    }

    /**
     * Puts a record in the SN Instance, performing an update with the supplied data.
     */
    async putRecord(tableName: string, sys_id: string, body: requestPromise.RequestPromiseOptions) {
        const sConn = this;
        const rClient = new SNICHRestClient(sConn);

        //spread in our incoming body object, 
        const config: requestPromise.RequestPromiseOptions = {
            body: {...body},
            qs: {
                sysparm_exclude_reference_links: true,
                sysparm_display_value: false,
            }
        }

        rClient.put(`/api/now/table/${tableName}/${sys_id}`, config);
    }

    async getRecord(tableName: string, sys_id: string, fields: string[], displayValue: boolean | "all") {
        const sConn = this;
        const rClient = new SNICHRestClient(sConn);

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        rClient.get(`/api/now/table/${tableName}/${sys_id}`, config);

    }

    async getRecords(tableName: string, query: string, fields: string[], displayValue?: boolean | "all"):Promise<any[]> {
        const sConn = this;
        const rClient = new SNICHRestClient(sConn);

        if(!displayValue){
            displayValue = false;
        }

        let result = [];

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_query: query,
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        let restResults = await rClient.get(`/api/now/table/${tableName}`, config);


    }

    /**
     * 
     * @param name the name of the user preference to get
     * @param username The username to get the preference for. If not supplied will grab "global"
     */
    async getPreference(name: string, username?: string){

        let encQuery = `name=${name}^system=true^user=NULL`;
        if(username){
            encQuery = `name=${name}^user.user_name=${username}`;
        }

        let result = await this.getRecords('sys_user_preference', encQuery, ['value','name']);

    }

    executeBackgroundScript(script: string, scope: string) {
        // Storing here a way to login with a get request and grab the g_ck and also likely setup the cookiejar
        // https://dev96649.service-now.com/login.do?user_name=admin&sys_action=sysverb_login&user_password=hz3O0dCsMCeZ
    }


}