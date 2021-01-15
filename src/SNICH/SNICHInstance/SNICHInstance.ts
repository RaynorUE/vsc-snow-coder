import * as vscode from 'vscode';
import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHConnection } from './SNICHConnection';
import { SNICHRestClient } from './SNICHRestClient';

export class SNICHInstance {
    private data: SNICHConfig.Instance = {
        _id: "",
        connection: {
            auth: {
                type: SNICHConfig.authTypes.None,
                writeBasicToDisk: false,
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
        },
        name: "",
        rootPath: vscode.Uri.parse("")
    };

    connection = new SNICHConnection()

    constructor(data?: SNICHConfig.Instance) {
        if (data) {
            this.setData(data);
        }
    }

    /**
     * go through all the various setup questions and process for configuring a new SNICH Instance.
     */
    setup(){
        
    }

    setName(name: string) { this.data.name = name }
    getName() { return this.data.name }

    setId(id: string) { this.data._id = id }
    getId() { return this.data._id }

    setRootPath(uri: vscode.Uri) { this.data.rootPath = uri }
    getRootPath() { return this.data.rootPath }

    setConnection(conn: SNICHConnection) {
        this.connection = conn;
        this.data.connection = conn.getData()
    }

    getConnection() { return this.connection }

    async testConnection(){
        let resultStatusCode = await this.connection.testConnection();

        if(resultStatusCode === 200){
            vscode.window.showInformationMessage('Test Connection Successful!');
        } else if (resultStatusCode == 401){
            //unauthoried
            /**
             * @todo re-ask for authentication information.
             */
        } else {
            vscode.window.showWarningMessage('Unknown error occurred testing connection. Instance might be unavailable or some other failured occured.');
        }
    }

    async runBackgroundScript() {

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

        const newConn = new SNICHConnection();
        newConn.setData(newData.connection);

        this.connection = newConn;

    }

    getData() {
        const connData = { ...this.connection.getData() };
        if (this.connection.getStoreBasicToDisk()) {
            //clearing before any getData calls... which should be when we write to disk.. This effectively lets us store it in memory.
            connData.auth.password = '';

        }

        this.data.connection = connData; //make sure we have latest connection data as well.
        return this.data
    }
}

