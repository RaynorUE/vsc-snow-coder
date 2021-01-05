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

    readFile(uri: vscode.Uri): Thenable<Uint8Array> {
        return fs.readFile(uri)
    }

    writeFile(uri: vscode.Uri, data: Uint8Array) {
        return fs.writeFile(uri, data);
    }
}