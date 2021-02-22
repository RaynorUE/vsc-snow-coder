// import * as WebSocket from 'ws';
// import * as Express from 'express';

// const nodePath = require('path');
// import { workspace } from 'vscode';

// export class SNScriptSyncListener {

//     private WebSocket = WebSocket;
//     private app = Express();

//     constructor() {

//         /***** NOT TO SELF! DO NOT EVEN BOTHER WITH HIS WAY OF GETTING DATA... WE WILL USE IT JUST FOR THE RECORD TO SYNC!?!?
//          * This way we do not have to worry some of the things he is, such as ACLs, etc... (his comment about app scopes)... Since we handle multi-app scope in a single setup..
//          * 
//         */

//     }
//     /*
//         startServers(){

//             if (typeof workspace.rootPath == 'undefined') {
//                 vscode.window.showWarningMessage("Please open a folder, before running ScriptSync");
//                 return;
//             }

//             // fs.watch(workspace.rootPath, { recursive: true }, (eventType, filename) => { 
//             // 	if (eventType == 'change' && serverRunning && watchFileSystem && filename.includes("^")){
//             // 		if ((Math.floor(+new Date() / 1000) - lastSave) > 3){
//             // 			vscode.workspace.openTextDocument(workspace.rootPath + nodePath.sep +filename).then(
//             // 				document => {saveFieldsToServiceNow(document, false)});
//             // 		}
//             // 	}
//             // }); 


//             let sourceDir = path.join(__filename, '..', '..', 'autocomplete') + nodePath.sep;
//             let targetDir = path.join(workspace.rootPath, 'autocomplete') + nodePath.sep;
//             eu.copyFile(sourceDir + 'client.d.ts.txt', targetDir + 'client.d.ts', function () { });
//             eu.copyFile(sourceDir + 'server.d.ts.txt', targetDir + 'server.d.ts', function () { });
//             targetDir = path.join(workspace.rootPath, '') + nodePath.sep;
//             eu.copyFileIfNotExists(sourceDir + 'jsconfig.json.txt', targetDir + 'jsconfig.json', function () { });


//             //init the webserver
//             app.use(bodyParser.urlencoded({ extended: true }));
//             app.use(bodyParser.text({ limit: '200mb' }));

//             app.get('/', function (req, res) {
//                 res.end('Please post data for sn-scriptsync to this endpoint');
//             });
//             app.post('/', function (req, res) {

//                 lastSave = Math.floor(+new Date() / 1000); //prevent immediate postback of saved file
//                 console.log('Recieved from SN-ScriptSync', req.body);
//                 var postedJson = JSON.parse(req.body);
//                 eu.writeInstanceSettings(postedJson.instance);
//                 if (postedJson.action == 'saveFieldAsFile' || !postedJson.action)
//                     saveFieldAsFile(postedJson);
//                 else if (postedJson.action == 'saveWidget')
//                     saveWidget(postedJson);
//                 else if (postedJson.action == 'linkAppToVSCode')
//                     linkAppToVSCode(postedJson);
//                 //requestRecord(postedJson,wss);


//                 res.setHeader("Access-Control-Allow-Origin", "*");
//                 res.setHeader('Access-Control-Allow-Methods', 'POST');
//                 res.end('Data received');
//             });
//             expressListen = app.listen(1977);

//             //Start WebSocket Server
//             wss = new WebSocket.Server({ port: 1978 });
//             wss.on('connection', (ws: WebSocket) => {

//                 if (!serverRunning) return;

//                 if (wss.clients.size > 1) {
//                     ws.close(0, 'max connection');
//                 }
//                 ws.on('message', function incoming(message) {
//                     let messageJson = JSON.parse(message)
//                     if (messageJson.hasOwnProperty('error')) {
//                         if (messageJson.error.detail.includes("ACL"))
//                             messageJson.error.detail = "ACL Error, try changing scope in the browser";
//                         else if (messageJson.error.detail.includes("Required to provide Auth information"))
//                             messageJson.error.detail = "Could not sync file, no valid token. Try typing the slashcommand /token in a active browser session and retry.";


//                         vscode.window.showErrorMessage("Error while saving file: " + messageJson.error.detail);

//                         markFileAsDirty(window.activeTextEditor.document);
//                     }
//                     else if (messageJson.action == "requestAppMeta") {
//                         setScopeTreeView(messageJson);
//                     }
//                     else if (messageJson.action == "writeInstanceSettings") {
//                         eu.writeInstanceSettings(messageJson.instance);
//                     }
//                     else if (messageJson.hasOwnProperty('actionGoal')) {
//                         if (messageJson.actionGoal == 'updateCheck') {

//                             openFiles[messageJson.fileName].sys_updated_on = messageJson.result.sys_updated_on;
//                             openFiles[messageJson.fileName].sys_updated_by = messageJson.result.sys_updated_by;
//                             openFiles[messageJson.fileName].scope = messageJson.result['sys_scope.scope'];
//                             openFiles[messageJson.fileName].content = messageJson.result[messageJson.fieldName];
//                         }
//                         if (messageJson.actionGoal == 'getCurrent') {
//                             eu.writeFile(messageJson.fileName, messageJson.result[messageJson.fieldName], true, function () { });

//                         }
//                         else {
//                             saveRequestResponse(messageJson);
//                         }

//                     }
//                     else {
//                         saveRequestResponse(messageJson); //fallback for older version of browser extension
//                     }
//                 });

//                 //send immediatly a feedback to the incoming connection    
//                 ws.send('["Connected to VS Code ScriptScync WebSocket"]', function () { });

//             });
//             updateScriptSyncStatusBarItem('Running');
//             serverRunning = true;

//         }
//         */


//     saveFieldAsFile(postedJson: any) {

//         let req = <any>{};
//         req.action = 'requestRecord';
//         req.actionGoal = 'saveCheck';
//         req.name = postedJson.name.replace(/[^a-z0-9 \.\-+]+/gi, '').replace(/\./g, '-');
//         req.instance = postedJson.instance;
//         req.tableName = postedJson.table;
//         req.fieldName = postedJson.field;
//         req.sys_id = postedJson.sys_id + "?sysparm_fields=name,sys_updated_on,sys_updated_by,sys_scope.scope," + postedJson.field;
//         //requestRecords(req); // mmaybe implemt later to check changes with server version

//         var fileExtension = ".js";
//         var fieldType: string = postedJson.fieldType;
//         if (fieldType.includes("xml"))
//             fileExtension = ".xml";
//         else if (fieldType.includes("html"))
//             fileExtension = ".html";
//         else if (fieldType.includes("json"))
//             fileExtension = ".json";
//         else if (fieldType.includes("css") || fieldType == "properties" || req.fieldName == "css")
//             fileExtension = ".scss";
//         else if (req.name.lastIndexOf("-") > -1 && ["ecc_agent_script_file"].includes(req.tableName)) {
//             var fileextens = req.name.substring(req.name.lastIndexOf("-") + 1, req.name.length);
//             if (fileextens.length < 5) {
//                 fileExtension = "." + fileextens;
//                 req.name = req.name.substring(0, req.name.lastIndexOf("-"));
//             }
//         }
//         else if (fieldType.includes("string") || fieldType == "conditions")
//             fileExtension = ".txt";

//         var fileName = workspace.rootPath + nodePath.sep + postedJson.instance.name + nodePath.sep + postedJson.table + nodePath.sep +
//             postedJson.field + '^' + req.name.replace(/[^a-z0-9 \.\-+]+/gi, '').replace(/\./g, '-') + '^' + postedJson.sys_id + fileExtension;
//         /*
//     eu.writeFile(fileName, postedJson.content, true, function (err) {
//         if (err) {
//             err.response = {};
//             err.response.result = {};
//             err.send = false;
//             wss.clients.forEach(function each(client) {
//                 if (client.readyState === WebSocket.OPEN && !err.send) {
//                     client.send(JSON.stringify(err));
//                     err.send = true;
//                 }
//             });
//         }
//         else {
//             postedJson.result = '';
//             postedJson.contentLength = postedJson.content.length;
//             postedJson.send = false;

//             wss.clients.forEach(function each(client) {
//                 if (client.readyState === WebSocket.OPEN && !postedJson.send) {
//                     client.send(JSON.stringify(postedJson));
//                     postedJson.send = true;
//                 }
//             });
//         }
//     });
//     */
//     }
//     saveWidget(postedJson) {
//         //lastsend = 0;
//         var filePath = workspace.rootPath + nodePath.sep + postedJson.instance.name + nodePath.sep +
//             postedJson.tableName + nodePath.sep + postedJson.name + nodePath.sep;

//         var files = {};

//         if (postedJson.widget.hasOwnProperty("option_schema")) { //sp_widget
//             files = {
//                 "1 HTML Template.html": { "content": postedJson.widget.template.value, "openFile": true },
//                 "2 SCSS.scss": { "content": postedJson.widget.css.value, "openFile": true },
//                 "3 Client Script.js": { "content": postedJson.widget.client_script.value, "openFile": true },
//                 "4 Server Script.js": { "content": postedJson.widget.script.value, "openFile": true },
//                 "5 Link function.js": { "content": postedJson.widget.link.value, "openFile": false },
//                 "6 Option schema.json": { "content": postedJson.widget.option_schema.value, "openFile": false },
//                 "7 Demo data.json": { "content": postedJson.widget.demo_data.value, "openFile": false },
//                 "widget.json": { "content": JSON.stringify(postedJson, null, 4), "openFile": false },
//             }
//         }
//         else { //sp_header_footer
//             files = {
//                 "1 HTML Template.html": { "content": postedJson.widget.template.value, "openFile": true },
//                 "2 SCSS.scss": { "content": postedJson.widget.css.value, "openFile": true },
//                 "3 Client Script.js": { "content": postedJson.widget.client_script.value, "openFile": true },
//                 "4 Server Script.js": { "content": postedJson.widget.script.value, "openFile": true },
//                 "5 Link function.js": { "content": postedJson.widget.link.value, "openFile": false },
//                 "widget.json": { "content": JSON.stringify(postedJson, null, 4), "openFile": false },
//             }
//         }

//         var contentLength = 0;
//         for (var file in files) {
//             if (file != "widget.json")
//                 contentLength += files[file].content.length;

//             eu.writeFile(filePath + file, files[file].content, files[file].openFile, function (err) {
//                 if (err) {
//                     //todo
//                 }
//                 else {

//                 }

//             });
//         }

//         let requestJson = <any>{};
//         requestJson.action = 'requestRecords';
//         requestJson.instance = postedJson.instance;
//         requestJson.filePath = filePath;
//         requestJson.tableName = 'sp_ng_template';
//         requestJson.displayValueField = 'sys_name';
//         let fields = [];
//         fields.push({ "name": "template", "fileType": "html" });
//         requestJson.fields = fields;
//         requestJson.queryString = 'sysparm_query=sp_widget=' + postedJson.sys_id;

//         requestRecords(requestJson);

//         var testUrls = [];
//         testUrls.push(postedJson.instance.url + "/$sp.do?id=sp-preview&sys_id=" + postedJson.sys_id);
//         testUrls.push(postedJson.instance.url + "/sp_config?id=" + postedJson.widget.id.displayValue);
//         testUrls.push(postedJson.instance.url + "/sp?id=" + postedJson.widget.id.displayValue);
//         eu.writeFileIfNotExists(filePath + "test_urls.txt", testUrls.join("\n"), false, function () { });

//         postedJson.widget = {};
//         postedJson.result = {};
//         postedJson.content = {};
//         postedJson.fieldName = "template,css,client_script,script,link,option_schema,demo_data";
//         postedJson.content.length = contentLength;
//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(postedJson));
//             }
//         });
//     }

//     linkAppToVSCode(postedJson) {

//         let req = <any>{};
//         req.action = 'requestAppMeta';
//         req.actionGoal = 'saveCheck';
//         req.appId = postedJson.appId;
//         req.appName = postedJson.appName;
//         req.appScope = postedJson.appScope;
//         req.instance = postedJson.instance;
//         requestRecords(req);

//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN && !postedJson.send) {
//                 client.send(JSON.stringify(postedJson));
//                 postedJson.send = true;
//             }
//         });
//     }

//     markFileAsDirty(file: TextDocument): void {

//         if (!serverRunning) return;

//         let insertEdit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
//         let removeEdit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
//         let lastLineIndex: number = file.lineCount - 1;
//         let lastCharacterIndex: number = file.lineAt(lastLineIndex).range.end.character;

//         insertEdit.insert(file.uri, new vscode.Position(lastLineIndex, lastCharacterIndex), " ");
//         removeEdit.delete(file.uri, new vscode.Range(
//             new vscode.Position(lastLineIndex, lastCharacterIndex), new vscode.Position(lastLineIndex, lastCharacterIndex + 1)));
//         workspace.applyEdit(insertEdit).then(() => {
//             workspace.applyEdit(removeEdit);
//         });
//     }

//     saveRequestResponse(responseJson) {

//         if (!responseJson.hasOwnProperty("results")) {
//             console.log("responseJson does not have property results")
//             //https://github.com/arnoudkooi/sn-scriptsync/issues/19
//             //need to look in this further..
//             return;
//         }
//         let filePath = responseJson.filePath + responseJson.tableName + nodePath.sep;
//         for (let result of responseJson.results) {
//             for (let field of responseJson.fields) {
//                 eu.writeFile(filePath +
//                     field.name.replace(/\./g, '-') + '^' +
//                     result[responseJson.displayValueField].replace(/[^a-z0-9 \.\-+]+/gi, '').replace(/\./, '') + '^' + //strip non alpahanumeric, then replace dot
//                     result.sys_id + '.' +
//                     field.fileType,
//                     result[field.name], false, function () { });
//             }
//         }
//     }

// }


// declare interface scriptSyncPostObj {
//     "action": "saveFieldAsFile",
//     "instance": {
//         "name": "ven01807",
//         "url": "https://ven01807.service-now.com",
//         "g_ck": "dfb1dfa01b2eec10f0e98487dc4bcb6805122a83ff95829a5d47199161f61a4294e157fd"
//     },
//     "field": "script",
//     "table": "sys_script_include",
//     "sys_id": "d65f78c40a0a0b6900196656f35913d3",
//     "content": "// Base ajax processor class that other ajax processors extend\n// \n// note that some methods return Java values, not JavaScript values\n\nvar AbstractAjaxProcessor = Class.create();\n\nAbstractAjaxProcessor.prototype = {\n    CALLABLE_PREFIX : 'ajaxFunction_',\n\n    initialize : function(request, responseXML, gc) {\n        this.request = request;\n        this.responseXML = responseXML;\n        this.gc = gc;\n    },\n\n    process : function() {\n        var functionName = this.getName();\n        if (!functionName)\n            return;\n\n        if (functionName.indexOf('_') == 0)\n            return;\n        \n        var f = this[functionName];\n        if (!f) {         \n            functionName = this.CALLABLE_PREFIX + functionName;\n            var f = this[functionName];\n            if (!f)\n                return;\n        }\n        if (typeof f != 'function')\n            return;\n\n        return f.call(this);\n    },\n\n    newItem: function(name) {\n        if (!name)\n            name = \"item\";\n\n        var item = this.getDocument().createElement(name);\n        this.getRootElement().appendChild(item);\n        return item;\n    },\n\n    // returns value of parameter as a Java String instance\n    getParameter: function(name) {\n        return this.request.getParameter(name)\n    },\n\n    getDocument: function() {\n        return this.responseXML;\n    },\n\n    getRootElement: function() {\n        return this.responseXML.getDocumentElement();\n    },\n\n    // returns value of \"sysparm_name\" as a Java String instance\n    getName: function() {\n        return this.getParameter(\"sysparm_name\");\n    },\n\n    // returns value of \"sysparm_value\" as a Java String instance\n    getValue: function() {\n        return this.getParameter(\"sysparm_value\");\n    },\n\n    // returns value of \"sysparm_type\" as a Java String instance\n    getType: function() {\n        return this.getParameter(\"sysparm_type\");\n    },\n\n    getChars: function() {\n        return this.getParameter(\"sysparm_chars\");\n    },\n\n    setAnswer: function(value) {\n        this.getRootElement().setAttribute(\"answer\", value);\n    },\n\n    setError: function(error) {\n        this.getRootElement().setAttribute(\"error\", error);\n    },\n\n    type: \"AbstractAjaxProcessor\"\n}",
//     "fieldType": "script_plain",
//     "name": "AbstractAjaxProcessor"
// }