import { AxiosRequestConfig } from 'axios';
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

    async testConnection() {
        const sConn = this;
        let rClient = new SNICHRestClient(sConn);
        let result;
        try {
            let restResult = await rClient.get('/api/now/table/', { qs: { sysparm_query: `user_name=${this.getUserName()}`, sysparm_limit: 1 } });
            if (restResult.statusCode) {
                result = restResult.statusCode;
            }
        } catch (e) {
            if (e.name == 'statusCodeError' && e.statusCode == 401) {
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
    putRecord(tableName: string, sys_id: string, data: string) {

    }

    getRecord(tableName: string, sys_id: string, fields: string[], displayValue: boolean | "all") {
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

    getRecords(tableName: string, query: string, fields: string[], displayValue: boolean | "all") {
        const sConn = this;
        const rClient = new SNICHRestClient(sConn);

        const config: requestPromise.RequestPromiseOptions = {
            qs: {
                sysparm_query: query,
                sysparm_fields: fields.join(','),
                sysparm_exclude_reference_links: true,
                sysparm_display_value: displayValue
            }
        }

        rClient.get(`/api/now/table/${tableName}`, config);

    }

    executeBackgroundScript(script: string, scope: string) {
        // Storing here a way to login with a get request and grab the g_ck and also likely setup the cookiejar
        // https://dev96649.service-now.com/login.do?user_name=admin&sys_action=sysverb_login&user_password=hz3O0dCsMCeZ
    }


}