import axios from 'axios';
import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHConnection } from './SNICHConnection';

export class SNICHRestClient {
    connection: SNICHConnection;
    client = axios;
    constructor(conn: SNICHConnection) {
        this.connection = conn;
        
        this.client.defaults.baseURL = this.connection.getURL();

        const authType = this.connection.getAuthType();
        if(authType == SNICHConfig.authTypes.Basic){
            this.client.defaults.auth = {
                username: this.connection.getUserName(),
                password: this.connection.getPassword()
            }
        } else if(authType == SNICHConfig.authTypes.OAuth){
            const oAuthToken = this.connection.getOAuthToken();
            this.client.defaults.headers.Authorization = `${oAuthToken.token_type} ${oAuthToken.access_token}`;
        } else {
            throw new Error("Auth type not defined. Unable to create SNICHRestClient");
        }
    }

    /**
     * Used if we need to make a call with no authentication information. Currently this is 
     */
    disableAuth(){
        this.client.defaults.auth = undefined;
        this.client.defaults.headers.Authorization = undefined;
    }

    get(url: string) {

    }

    put(url: string, data:any) {

    }
    patch(url: string, data:any) {

    }
    post() {

    }
    delete() {

    }

}