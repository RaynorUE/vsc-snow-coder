import * as vscode from 'vscode';
import { extensionContext } from '../extension';

/**
 * Used to manage files that are 'in the background' and are not needed to be written to the Workspace
 */


export class BackFileMan {
    rootUri = vscode.Uri.joinPath(extensionContext.extensionUri, 'SNICH_Background');

    constructor(){}
}