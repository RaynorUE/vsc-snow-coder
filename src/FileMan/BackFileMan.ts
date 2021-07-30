import * as vscode from 'vscode';
import { extensionContext } from '../extension';

/**
 * Used to manage files that are 'in the background' and are not needed to be written to the Workspace
 */

const fs = vscode.workspace.fs;

export class BackFileMan {
    rootUri = vscode.Uri.joinPath(extensionContext.extensionUri, 'SNICH_Background');

    constructor() { }

    getRootUri(): vscode.Uri {
        return this.rootUri;
    }

    async readFile(...parameters: string[]) {
        return await fs.readFile(vscode.Uri.joinPath(this.rootUri, ...parameters))
    }

    async writeFile(data: Uint8Array, ...parameters: string[]) {
        return await fs.writeFile(vscode.Uri.joinPath(this.rootUri, ...parameters), data);
    }

    async readDirectory(...parameters: string[]){
        return await fs.readDirectory(vscode.Uri.joinPath(this.rootUri, ...parameters));
    }

    async getServerTSDefFolder(snReleaseName:string) {
        return await fs.readDirectory(vscode.Uri.joinPath(this.rootUri, 'sn_ts_def', 'ServerScoped', snReleaseName.toLowerCase()));
    }

    async getServerTSDef(snReleaseName: string, fileName:string) {
        return await fs.readFile(vscode.Uri.joinPath(this.rootUri, 'sn_ts_def', 'ServerScoped', snReleaseName.toLowerCase(), fileName))
    }

    async getClientTSDef() {
        return await fs.readFile(vscode.Uri.joinPath(this.rootUri, 'sn_ts_def', 'client.d.ts'))
    }
}