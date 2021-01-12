import * as vscode from 'vscode';
import { SNICHConfig } from '../@types/SNICHConfig';

export class SNICHInstance {
    data: SNICHConfig.Instance = {
        _id: "",
        connection: {
            auth: {
                writeBasicToDisk: false,

                type: SNICHConfig.authTypes.None
            },
            url: ""
        },
        name: "",
        rootPath: vscode.Uri.parse("")
    };

    constructor() {
    }

    setName(name: string) { this.data.name = name }
    getName() { return this.data.name }

    setId(id: string) { this.data._id = id }
    getId() { return this.data._id }

    setRootPath(uri: vscode.Uri) { this.data.rootPath = uri }
    getRootPath() { return this.data.rootPath }

    getAuthType() { return this.data.connection.auth.type }
    setAuthType(authType: SNICHConfig.authTypes) { this.data.connection.auth.type = authType }

    setUserName(userName: string) {

    }

    setPassword(password: string) {
        /**
         * @todo setup crypto!
         */
    }

    getPassword() {
        /**@todo decrypt via crypto. */
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



    /**
     * Set the internal data object from some source DB, JSON file, etc.
     * @param data Data loaded from somewhere
     */
    setData(data: SNICHConfig.Instance) {
        //de-reference
        const newData = { ...data };
        newData.rootPath = vscode.Uri.parse(`${data.rootPath.scheme}://${data.rootPath.path}`);

        this.data = newData;
    }
}
