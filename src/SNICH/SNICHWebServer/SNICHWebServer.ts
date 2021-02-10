//import { extensionContext } from '../../extension';
import * as vscode from 'vscode';
import * as url from 'url';
import http = require('http');

export class SNICHWebServer {
    constructor() {

    }

    /**
     * Start the web server.
     * @param state the state to check for against when getting the result back.
     */
    async listenForCode(state: string): Promise<string | undefined> {
        /*
        const extensionPath = extensionContext.extensionUri;
        let keyPath = vscode.Uri.joinPath(extensionPath, 'WebServer', 'ssl', 'key.pem');
        let certPath = vscode.Uri.joinPath(extensionPath, 'WebServer', 'ssl', 'cert.pem');
        
        let oauthServOptions = {
            key: await vscode.workspace.fs.readFile(keyPath),
            cert: await vscode.workspace.fs.readFile(certPath)
        };
        */
        //lets start with just and http server? Since it'll be localhost..?
        let result = await new Promise<string | undefined>((resolve, reject) => {
            const server = http.createServer(function (req, res) {

                const oauthRedirectPath = /snich_oauth_redirect?.*/;

                if (req.url?.match(oauthRedirectPath)) {
                    console.log('Inside oauthRedirect with code!');
                    const queryObject = url.parse(req.url, true).query;

                    if (queryObject.code && queryObject.state == state) {
                        const oauthCode = queryObject.code.toString();
                        res.write('OAuth Code Recieved by SNICH VSCode Extension. Please close this window.');
                        resolve(oauthCode);
                    } else {
                        res.write('Some error occured. Please retry instance setup again.');
                        vscode.window.showErrorMessage('Failed oauth configuration. Please retry instance setup again.');
                        resolve(undefined);
                    }

                } else {
                    //no query parameters supplied... throw error
                    let errObj = {
                        error: "No query parameters found. You've reached this page in error."
                    };

                    res.writeHead(400, {
                        'Content-Length': JSON.stringify(errObj, null, 4).length,
                        'Content-Type': 'application/json'
                    });

                    res.write(JSON.stringify(errObj, null, 4))
                    server.close();
                    vscode.window.showErrorMessage('Failed OAuth configuration. Please retry instance setup again.');
                    resolve(undefined);
                }

                res.end();
            })

            server.listen(62000);
        })

        return result;



    }
}