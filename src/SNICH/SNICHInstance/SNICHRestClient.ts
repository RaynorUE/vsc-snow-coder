import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHConnection } from './SNICHConnection';
import * as rp from 'request-promise-native';
import requestPromise = require('request-promise-native');

export class SNICHRestClient {
    connection: SNICHConnection;
    client = rp;
    constructor(conn: SNICHConnection) {
        this.connection = conn;
        this.client = rp.defaults({
            baseUrl: this.connection.getURL(),
            gzip: true,
            json: true
        })


        this.enableAuth();

    }


    /**
     * Used if we need to make a call with no authentication information. 
     * Must be called after every request, or we will re-enable auth.
     */
    disableAuth() {
        this.client = this.client.defaults({ auth: undefined });
    }

    enableAuth() {
        const authType = this.connection.getAuthType();
        if (authType == SNICHConfig.authTypes.Basic) {
            this.client = this.client.defaults({ auth: { bearer: undefined, username: this.connection.getUserName(), password: this.connection.getPassword() } });
        } else if (authType == SNICHConfig.authTypes.OAuth) {
            const oAuthToken = this.connection.getOAuthToken();
            this.client = this.client.defaults({ auth: { username: undefined, password: undefined, bearer: `${oAuthToken.access_token}` } });
        } else {
            throw new Error("Auth type not defined. Unable to create SNICHRestClient");
        }
    }


    async get(url: string, config?: rp.RequestPromiseOptions):Promise<requestPromise.FullResponse> {
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

    async put(url: string, data: any, config?: rp.RequestPromiseOptions):Promise<requestPromise.FullResponse> {
        if(!config){
            config = {};
        }
        config.body = data;
        let result = await this.client.put(url, config);
        this.enableAuth();
        return result;
    }
    async patch(url: string, data: any, config?: rp.RequestPromiseOptions):Promise<requestPromise.FullResponse> {
        if(!config){
            config = {};
        }
        config.body = data;
        let result = await this.client.put(url, config);
        this.enableAuth();
        return result;
    }

    async post(url: string, data: any, config?: rp.RequestPromiseOptions):Promise<requestPromise.FullResponse> {
        if(!config){
            config = {};
        }
        config.body = data;
        let result = await this.client.post(url, config);
        this.enableAuth();
        return result;
    }

    async delete(url: string, config?: rp.RequestPromiseOptions):Promise<requestPromise.FullResponse> {
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

