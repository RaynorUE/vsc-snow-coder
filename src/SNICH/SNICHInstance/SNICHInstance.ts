import * as vscode from 'vscode';
import { SNICHConfig } from '../../@types/SNICHConfig';
import { SNICHConnection } from './SNICHConnection';

export class SNICHInstance {
    private data: SNICHConfig.Instance = {
        _id: "",
        connection: {
            auth: {
                type: SNICHConfig.authTypes.None
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
        this.data.connection = connData; //make sure we have latest connection data as well.
        return this.data
    }
}

