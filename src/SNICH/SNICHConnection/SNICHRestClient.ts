import { SNICHConnection } from './SNICHConnection';
import * as rp from 'request-promise-native';
import { SystemLogHelper } from '../../classes/LogHelper';

export class SNICHRestClient {
    connection: SNICHConnection;
    logger: SystemLogHelper;
    client = rp;
    type = 'SNICHRestClient';
    constructor(logger: SystemLogHelper, conn: SNICHConnection) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, "ENTERING");
        this.connection = conn;
        this.logger.debug(this.type, func, "Set this.connection");

        this.enableAuth();

        this.logger.info(this.type, func, "LEAVING");

    }

    getClientDefaults(): rp.RequestPromiseOptions {
        var rpOptions: rp.RequestPromiseOptions = {
            baseUrl: this.connection.getURL(),
            gzip: true,
            json: true
        };
        return rpOptions;
    }


    /**
     * Used if we need to make a call with no authentication information. 
     * Must be called after every request, or we will re-enable auth.
     */
    disableAuth() {
        const basicOptions = { ...this.getClientDefaults(), auth: undefined };
        this.client = rp.defaults(basicOptions);
    }

    enableAuth() {
        var func = 'enableAuth';
        this.logger.info(this.type, func, "ENTERING");
        const authType = this.connection.getAuthType();
        if (authType == "Basic") {
            this.logger.debug(this.type, func, "BAsic auth! setting it up!");
            const basicOptions = { ...this.getClientDefaults(), auth: { user: this.connection.getUserName(), pass: this.connection.getPassword() } };
            this.client = rp.defaults(basicOptions);
        } else if (authType == "OAuth") {
            this.logger.debug(this.type, func, "OAuth! setting it up!");
            const oAuthToken = this.connection.getOAuthToken();
            const OAuthOptions = { ...this.getClientDefaults(), auth: { bearer: `${oAuthToken.access_token}` } }
            this.logger.debug(this.type, func, 'basic options: ', OAuthOptions);
            this.client = rp.defaults(OAuthOptions);
        } else {
            throw new Error("Auth type not defined. Unable to create SNICHRestClient");
        }
        this.logger.info(this.type, func, "LEAVING");

    }


    async get(url: string, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (config) {
            let result = await this.client.get(url, config);
            this.enableAuth();
            return result;
        } else {
            let result = await this.client.get(url);
            this.enableAuth();
            return result;
        }
    }

    async put(url: string, data: any, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (!config) {
            config = {};
        }
        config.body = data;
        let result = await this.client.put(url, config);
        this.enableAuth();
        return result;
    }
    async patch(url: string, data: any, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (!config) {
            config = {};
        }
        config.body = data;
        let result = await this.client.put(url, config);
        this.enableAuth();
        return result;
    }

    async post(url: string, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (!config) {
            config = {};
        }
        let result = await this.client.post(url, config);
        this.enableAuth();
        return result;
    }

    async delete(url: string, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (config) {
            let result = await this.client.delete(url, config);
            this.enableAuth();
            return result;
        } else {
            let result = await this.client.delete(url);
            this.enableAuth();
            return result;
        }
    }
}

