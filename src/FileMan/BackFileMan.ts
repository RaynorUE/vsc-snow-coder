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

    async getServerTSDef() {
        return await fs.readFile(vscode.Uri.joinPath(this.rootUri, 'sn_ts_def', 'server_scoped.d.ts'))
    }

    async getClientTSDef() {
        return await fs.readFile(vscode.Uri.joinPath(this.rootUri, 'sn_ts_def', 'client.d.ts'))
    }
}