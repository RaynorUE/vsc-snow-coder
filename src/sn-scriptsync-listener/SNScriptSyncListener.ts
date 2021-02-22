export class SNScriptSyncListener {
    constructor() { }
    /*
        startServers(){
    
            if (typeof workspace.rootPath == 'undefined') {
                vscode.window.showWarningMessage("Please open a folder, before running ScriptSync");
                return;
            }
        
            // fs.watch(workspace.rootPath, { recursive: true }, (eventType, filename) => { 
            // 	if (eventType == 'change' && serverRunning && watchFileSystem && filename.includes("^")){
            // 		if ((Math.floor(+new Date() / 1000) - lastSave) > 3){
            // 			vscode.workspace.openTextDocument(workspace.rootPath + nodePath.sep +filename).then(
            // 				document => {saveFieldsToServiceNow(document, false)});
            // 		}
            // 	}
            // }); 
        
        
            let sourceDir = path.join(__filename, '..', '..', 'autocomplete') + nodePath.sep;
            let targetDir = path.join(workspace.rootPath, 'autocomplete') + nodePath.sep;
            eu.copyFile(sourceDir + 'client.d.ts.txt', targetDir + 'client.d.ts', function () { });
            eu.copyFile(sourceDir + 'server.d.ts.txt', targetDir + 'server.d.ts', function () { });
            targetDir = path.join(workspace.rootPath, '') + nodePath.sep;
            eu.copyFileIfNotExists(sourceDir + 'jsconfig.json.txt', targetDir + 'jsconfig.json', function () { });
        
        
            //init the webserver
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.text({ limit: '200mb' }));
        
            app.get('/', function (req, res) {
                res.end('Please post data for sn-scriptsync to this endpoint');
            });
            app.post('/', function (req, res) {
        
                lastSave = Math.floor(+new Date() / 1000); //prevent immediate postback of saved file
                console.log('Recieved from SN-ScriptSync', req.body);
                var postedJson = JSON.parse(req.body);
                eu.writeInstanceSettings(postedJson.instance);
                if (postedJson.action == 'saveFieldAsFile' || !postedJson.action)
                    saveFieldAsFile(postedJson);
                else if (postedJson.action == 'saveWidget')
                    saveWidget(postedJson);
                else if (postedJson.action == 'linkAppToVSCode')
                    linkAppToVSCode(postedJson);
                //requestRecord(postedJson,wss);
        
        
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Allow-Methods', 'POST');
                res.end('Data received');
            });
            expressListen = app.listen(1977);
        
            //Start WebSocket Server
            wss = new WebSocket.Server({ port: 1978 });
            wss.on('connection', (ws: WebSocket) => {
        
                if (!serverRunning) return;
        
                if (wss.clients.size > 1) {
                    ws.close(0, 'max connection');
                }
                ws.on('message', function incoming(message) {
                    let messageJson = JSON.parse(message)
                    if (messageJson.hasOwnProperty('error')) {
                        if (messageJson.error.detail.includes("ACL"))
                            messageJson.error.detail = "ACL Error, try changing scope in the browser";
                        else if (messageJson.error.detail.includes("Required to provide Auth information"))
                            messageJson.error.detail = "Could not sync file, no valid token. Try typing the slashcommand /token in a active browser session and retry.";
        
        
                        vscode.window.showErrorMessage("Error while saving file: " + messageJson.error.detail);
        
                        markFileAsDirty(window.activeTextEditor.document);
                    }
                    else if (messageJson.action == "requestAppMeta") {
                        setScopeTreeView(messageJson);
                    }
                    else if (messageJson.action == "writeInstanceSettings") {
                        eu.writeInstanceSettings(messageJson.instance);
                    }
                    else if (messageJson.hasOwnProperty('actionGoal')) {
                        if (messageJson.actionGoal == 'updateCheck') {
        
                            openFiles[messageJson.fileName].sys_updated_on = messageJson.result.sys_updated_on;
                            openFiles[messageJson.fileName].sys_updated_by = messageJson.result.sys_updated_by;
                            openFiles[messageJson.fileName].scope = messageJson.result['sys_scope.scope'];
                            openFiles[messageJson.fileName].content = messageJson.result[messageJson.fieldName];
                        }
                        if (messageJson.actionGoal == 'getCurrent') {
                            eu.writeFile(messageJson.fileName, messageJson.result[messageJson.fieldName], true, function () { });
        
                        }
                        else {
                            saveRequestResponse(messageJson);
                        }
        
                    }
                    else {
                        saveRequestResponse(messageJson); //fallback for older version of browser extension
                    }
                });
        
                //send immediatly a feedback to the incoming connection    
                ws.send('["Connected to VS Code ScriptScync WebSocket"]', function () { });
        
            });
            updateScriptSyncStatusBarItem('Running');
            serverRunning = true;
        
        }
        */
}


declare interface scriptSyncPostObj {
    "action": "saveFieldAsFile",
    "instance": {
        "name": "ven01807",
        "url": "https://ven01807.service-now.com",
        "g_ck": "dfb1dfa01b2eec10f0e98487dc4bcb6805122a83ff95829a5d47199161f61a4294e157fd"
    },
    "field": "script",
    "table": "sys_script_include",
    "sys_id": "d65f78c40a0a0b6900196656f35913d3",
    "content": "// Base ajax processor class that other ajax processors extend\n// \n// note that some methods return Java values, not JavaScript values\n\nvar AbstractAjaxProcessor = Class.create();\n\nAbstractAjaxProcessor.prototype = {\n    CALLABLE_PREFIX : 'ajaxFunction_',\n\n    initialize : function(request, responseXML, gc) {\n        this.request = request;\n        this.responseXML = responseXML;\n        this.gc = gc;\n    },\n\n    process : function() {\n        var functionName = this.getName();\n        if (!functionName)\n            return;\n\n        if (functionName.indexOf('_') == 0)\n            return;\n        \n        var f = this[functionName];\n        if (!f) {         \n            functionName = this.CALLABLE_PREFIX + functionName;\n            var f = this[functionName];\n            if (!f)\n                return;\n        }\n        if (typeof f != 'function')\n            return;\n\n        return f.call(this);\n    },\n\n    newItem: function(name) {\n        if (!name)\n            name = \"item\";\n\n        var item = this.getDocument().createElement(name);\n        this.getRootElement().appendChild(item);\n        return item;\n    },\n\n    // returns value of parameter as a Java String instance\n    getParameter: function(name) {\n        return this.request.getParameter(name)\n    },\n\n    getDocument: function() {\n        return this.responseXML;\n    },\n\n    getRootElement: function() {\n        return this.responseXML.getDocumentElement();\n    },\n\n    // returns value of \"sysparm_name\" as a Java String instance\n    getName: function() {\n        return this.getParameter(\"sysparm_name\");\n    },\n\n    // returns value of \"sysparm_value\" as a Java String instance\n    getValue: function() {\n        return this.getParameter(\"sysparm_value\");\n    },\n\n    // returns value of \"sysparm_type\" as a Java String instance\n    getType: function() {\n        return this.getParameter(\"sysparm_type\");\n    },\n\n    getChars: function() {\n        return this.getParameter(\"sysparm_chars\");\n    },\n\n    setAnswer: function(value) {\n        this.getRootElement().setAttribute(\"answer\", value);\n    },\n\n    setError: function(error) {\n        this.getRootElement().setAttribute(\"error\", error);\n    },\n\n    type: \"AbstractAjaxProcessor\"\n}",
    "fieldType": "script_plain",
    "name": "AbstractAjaxProcessor"
}