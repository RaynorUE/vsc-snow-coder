/*
 -- Search query that started my exploration ...https://github.com/microsoft/vscode/search?q=authentication
 - led to: https://github.com/microsoft/vscode/blob/e8a26d3ebf5095d4324ad4bf794787540ed3b33e/extensions/github-authentication/src/github.ts

 - which led to: https://github.com/microsoft/vscode/blob/e8a26d3ebf5095d4324ad4bf794787540ed3b33e/extensions/github-authentication/src/githubServer.ts#L133
 - which to led to: codeExchangePromise = promiseFromEvent(this._uriHandler.event, this.exchangeCodeForToken(scopes));


*/

/*
class UriEventHandler extends vscode.EventEmitter<vscode.Uri> implements vscode.UriHandler {
	constructor(private readonly Logger: Log) {
		super();
	}

	public handleUri(uri: vscode.Uri) {
		this.Logger.trace('Handling Uri...');
		this.fire(uri);
	}
}
*/