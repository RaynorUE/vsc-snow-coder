import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHConnection } from './SNICHConnection';
import * as rp from 'request-promise-native';

export class SNICHRestClient {
    connection: SNICHConnection;
    client = rp;
    constructor(conn: SNICHConnection) {
        this.connection = conn;
        this.client = rp.defaults({
            baseUrl: this.connection.getURL()
        })


        this.enableAuth();

    }


    /**
     * Used if we need to make a call with no authentication information. 
     * Must be called after every request, or we will re-enable auth.
     */
    disableAuth() {
        this.client.defaults({ auth: undefined });
    }

    enableAuth() {
        const authType = this.connection.getAuthType();
        if (authType == SNICHConfig.authTypes.Basic) {
            this.client.defaults({ auth: { bearer: undefined, username: this.connection.getUserName(), password: this.connection.getPassword() } });
        } else if (authType == SNICHConfig.authTypes.OAuth) {
            const oAuthToken = this.connection.getOAuthToken();
            this.client.defaults({ auth: { username: undefined, password: undefined, bearer: `${oAuthToken.access_token}` } });
        } else {
            throw new Error("Auth type not defined. Unable to create SNICHRestClient");
        }
    }


    async get(url: string, config?: rp.RequestPromiseOptions) {
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

    async put(url: string, data: any, config?: rp.RequestPromiseOptions) {
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
    async patch(url: string, data: any, config?: rp.RequestPromiseOptions) {

    }
    async post(url: string, data: any, config?: rp.RequestPromiseOptions) {

    }
    async delete(url: string, config?: rp.RequestPromiseOptions) {

    }

    async testConnection() {
        let result;
        try {
            let restResult = await this.client.get('/api/now/table/', { qs: { sysparm_query: `user_name=${this.connection.getUserName()}`, sysparm_limit: 1 } });
            if (restResult.body) {
                result = true;
            }
        } catch (e) {
            if (e.name == 'statusCodeError' && e.StatusCode == 401) {
                result = false
            }
        }

        return result;

    }

    async runBackgroundScript() {

    }
}