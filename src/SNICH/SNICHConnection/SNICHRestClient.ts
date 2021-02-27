import { SNICHConnection } from './SNICHConnection';
import * as rp from 'request-promise-native';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';

export class SNICHRestClient {
    connection: SNICHConnection;
    logger: SNICHLogger;
    client = rp;
    type = 'SNICHRestClient';
    constructor(logger: SNICHLogger, conn: SNICHConnection) {
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


    async get<T>(url: string, config?: rp.RequestPromiseOptions): Promise<T | undefined> {
        var func = 'get';
        this.logger.info(this.type, func, `ENTERING`);
        let result: T | undefined = undefined;
        let restResponse = undefined;
        try {
            if (config) {
                this.logger.debug(this.type, func, `Have config. Using.`);
                restResponse = await this.client.get(url, config);
            } else {
                restResponse = await this.client.get(url);
            }

            this.logger.debug(this.type, func, `Response recieved: `, restResponse);
            if (restResponse) {
                result = restResponse;
            }
        } catch (e) {
            this.logger.error(this.type, func, `REST API Call Error!`, e);
            result = undefined;
            throw e;
        } finally {
            this.enableAuth();
            this.logger.info(this.type, func, `LEAVING`);
            return result;
        }
    }

    async put<T>(url: string, data: any, config?: rp.RequestPromiseOptions): Promise<T | undefined> {
        var func = 'put';
        this.logger.info(this.type, func, `ENTERING`);
        if (!config) {
            config = {};
        }
        config.body = data;

        let result: T | undefined = undefined;
        let restResponse = undefined;
        try {
            restResponse = await this.client.put(url, config);

            this.logger.debug(this.type, func, `Response recieved: `, restResponse);
            if (restResponse) {
                result = restResponse;
            }

        } catch (e) {
            this.logger.error(this.type, func, `REST API Call Error!`, e);
            result = undefined;
            throw e;
        } finally {
            this.enableAuth();
            this.logger.info(this.type, func, `LEAVING`);
            return result;
        }

    }
    async patch<T>(url: string, data: any, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (!config) {
            config = {};
        }
        config.body = data;
        let result = await this.client.put(url, config);
        this.enableAuth();
        return result;
    }

    async post<T>(url: string, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
        if (!config) {
            config = {};
        }
        let result = await this.client.post(url, config);
        this.enableAuth();
        return result;
    }

    async delete<T>(url: string, config?: rp.RequestPromiseOptions): Promise<rp.FullResponse> {
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

