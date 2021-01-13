import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';

export class SNICHConnection {
    private data: SNICHConfig.Connection = {
        auth: {
            type: SNICHConfig.authTypes.None,
            username: "",
            password: "",
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

    getURL(){return this.data.url};
    setURL(url: string){this.data.url = url}

    setData(data: SNICHConfig.Connection) {
        const newData = { ...data }
        this.data = newData;
    }

    getData() { return this.data }

    getAuthType() { return this.data.auth.type }
    setAuthType(authType: SNICHConfig.authTypes) { this.data.auth.type = authType }

    getUserName() { return this.data.auth.username}
    setUserName(userName: string) {
        this.data.auth.username = userName;
    }

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
        var crypt = new SNICHCrypto();
        var encryptedPw = crypt.encrypt(password);
        this.data.auth.password = encryptedPw;
    }

    getclientId() { return this.data.auth.OAuth?.client_id}
    setClientId(clientId: string){
        this.data.auth.OAuth.client_id = clientId;
        
    }

    getClientSecret(){ 
        if(this.data.auth.OAuth.client_secret){
            return new SNICHCrypto().decrypt(this.data.auth.OAuth.client_secret);
        } else {
            return ``;
        }
    }

    setClientSecret(secret: string){
        this.data.auth.OAuth.client_secret = new SNICHCrypto().encrypt(secret);
    }

    getOAuthToken() { return this.data.auth.OAuth.token}
    setOAuthToken(token: SNICHConfig.OAuthToken){
        this.data.auth.OAuth.token = token;
    }

    /**
     * Will handle if access token has expired and attempt to get a new refresh token..
     */
    getOAuthAccessToken(){

    }

    getOAuthTokenType(){ return this.data.auth.OAuth.token.token_type}

    testConnection() {
        /**
         * @todo if 401 unauthorized, call handleAuthFailure, which will handle checking auth types and trying to recover authentication.
         */

    }

    handleAuthFailure() {
        /**
         * @todo if 401, and type is basic, re-ask for password. If type is oauth
         */
    }


}