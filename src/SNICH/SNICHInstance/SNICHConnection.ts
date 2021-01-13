import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHCrypto } from '../SNICHCrypto/SNICHCrypto';

export class SNICHConnection {
    private data: SNICHConfig.Connection = {
        auth: {
            type: SNICHConfig.authTypes.None,

        },
        url: ""
    }

    constructor() {

    }

    setData(data: SNICHConfig.Connection) {
        const newData = { ...data }
        this.data = newData;
    }

    getData() { return this.data }

    getAuthType() { return this.data.auth.type }
    setAuthType(authType: SNICHConfig.authTypes) { this.data.auth.type = authType }

    setUserName(userName: string) {

    }

    setPassword(password: string) {
        /**
         * @todo setup crypto!
         */
        var crypt = new SNICHCrypto();
        var encryptedPw = crypt.encrypt(password);
        this.data.auth.password = encryptedPw;
    }

    getPassword() {
        if (!this.data.auth.password) {
            return '';
        }
        var crypt = new SNICHCrypto();
        var decryptedPw = crypt.decrypt(this.data.auth.password);
        return decryptedPw;
    }

    setBasicAuth(username: string, password: string) {
        this.setUserName(username);
        this.setPassword(password);
    }

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