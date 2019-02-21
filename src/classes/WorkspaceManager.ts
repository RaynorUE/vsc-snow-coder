import * as fs from "fs";
import * as vscode from 'vscode';
import { SystemLogHelper } from './LogHelper';
import {InstanceMaster, InstanceConfig} from './InstanceConfigManager';
import { snTableConfig, snTableField } from "../myTypes/globals";
import { RESTClient } from "./RESTClient";
import { InstanceTableConfig } from "./SNDefaultTables";
import * as path from 'path';
import * as crypto from 'crypto';

/**
* This class is intended to manage the configuration, files, and folders within the workspace. 
* Used For
*  - Creating, Updating, Deleting files/folders within the workspace.
*  - Loading .json data files as objects to be use when needed. 
* Not Used For
*  - Saving Files to SN
*  - Should never be making a REST Call from this class. 
*/

export class WorkspaceManager{
    
    readonly configFileName:string = "servicenow_config.json";
    readonly tableConfigFileName:string = "servicenow_table_config.json";
    readonly syncedFilesName:string = "servicenow_synced_files.json";
    logger:SystemLogHelper;
    lib:string = 'ConfigMgr';
    
    constructor(logger?:SystemLogHelper){
        let func = 'constructor';
        this.logger = logger || new SystemLogHelper();
        this.logger.info(this.lib, func, 'START');
        
        
        this.logger.info(this.lib, func, 'END');
    }
    
    /**
    * Requires an instanceData object and will create the files/folders based on that.
    * @param instanceData 
    */
    setupNewInstance(instance:InstanceMaster){
        let func = "setupNewInstance";
        this.logger.info(this.lib, func, 'START');
        
        if(vscode.workspace.workspaceFolders){
            let wsFolder = vscode.workspace.workspaceFolders[0];
            
            
            let rootPath = path.resolve(wsFolder.uri.fsPath, instance.config.name);
            instance.config.fsPath = rootPath;
            this.logger.info(this.lib, func, 'Resolved path is: ', rootPath);
            if(!fs.existsSync(rootPath)){
                fs.mkdirSync(rootPath);
            }
            this.logger.info(this.lib, func, 'Folder created. Converting Instance Data to JSON');
            
            this.writeInstanceConfig(instance);
            this.writeTableConfig(instance);
            
        }
        this.logger.info(this.lib, func, 'END', {instance:instance});
        return instance;
    }
    
    
    /**
    * Used to load all the instances based on the folder configuration of the workspace. 
    * @param wsFolders 
    */
    loadWorkspaceInstances(wsFolders:Array<vscode.WorkspaceFolder>){
        let func = "loadWorkspaceInstances";
        let instanceList:Array<InstanceMaster> = [];
        //@todo need to also watch the folder path, to see if it gets delete that we remove from the instanceList
        this.logger.info(this.lib, func, "Testing Statically First folder");
        let rootPath = wsFolders[0].uri.fsPath;
        var subFolders = fs.readdirSync(rootPath);
        subFolders.forEach((folder) =>{
            var snJSONPath = path.resolve(rootPath, folder, this.configFileName);
            this.logger.info(this.lib, func, "Seeing if JSON file exists at:", snJSONPath);
            if(fs.existsSync(snJSONPath)){
                //setup InstanceMaster class.
                let instance = new InstanceMaster();
                this.logger.debug(this.lib, func, "Found!");
                instance.config = <InstanceConfig>this.loadJSONFromFile(snJSONPath);
                
                //load table config from stored value.
                
                var tableConfigPath = path.resolve(rootPath, folder, this.tableConfigFileName);
                this.logger.info(this.lib, func, "Checking for table config at path:", tableConfigPath);
                if(fs.existsSync(tableConfigPath)){
                    let tableConfig = new InstanceTableConfig(<InstanceTableConfig>this.loadJSONFromFile(tableConfigPath));
                    instance.tableConfig = tableConfig;
                }
                instanceList.push(instance);
            }
        });
        this.logger.info(this.lib, func, "Loaded instanceList:", instanceList);
        this.logger.info(this.lib, func, "END");
        return instanceList;
    }
    
    writeAll(instance:InstanceMaster){
        
    }
    
    writeInstanceConfig(instance:InstanceMaster){
        let func = 'writeInstanceConfig';
        this.logger.info(this.lib, func, "START");
        
        let configJSONPath = path.resolve(instance.config.fsPath, this.configFileName);
        this.writeJSON(instance.config, configJSONPath);
        this.logger.debug(this.lib, func, 'Saved instance config:', instance.config);
        
        this.logger.info(this.lib, func, 'END');
    }
    
    writeTableConfig(instance:InstanceMaster){
        let func = 'writeTableConfig';
        this.logger.info(this.lib, func, "START");
        
        let filePath = path.resolve(instance.config.fsPath, this.tableConfigFileName);
        this.writeJSON(instance.tableConfig, filePath);
        this.logger.debug(this.lib, func, "Saved table config.", instance.tableConfig);
        
        this.logger.info(this.lib, func, 'END');
    }
    
    writeSyncedFiles(appPath:string, syncedFiles:Array<SNSyncedFile>){
        let func = 'writesyncedFiles';
        this.logger.info(this.lib, func, 'START', );
        let filePath = path.resolve(appPath, this.syncedFilesName) ;
        this.writeJSON(syncedFiles, filePath);
        this.logger.info(this.lib, func, 'END');
    }
    
    loadSyncedFiles(instance:InstanceMaster, appScope:string){
        let func = 'loadSyncedFiles';
        this.logger.info(this.lib, func, 'START', );
        
        let rootPath = instance.config.fsPath;
        let syncedFilesPath = path.resolve(rootPath, appScope, "servicenow_synced_files.json");
        this.logger.info(this.lib, func, `Checking for synced Files at path: ${syncedFilesPath}` );
        let syncedFiles:Array<SNSyncedFile> = [];
        
        if(fs.existsSync(syncedFilesPath)){
            this.logger.info(this.lib, func, 'Found! Loading...', syncedFilesPath);
            syncedFiles = <Array<SNSyncedFile>>this.loadJSONFromFile(syncedFilesPath);
        }
        
        this.logger.info(this.lib, func, 'END');   
        return syncedFiles;
        
    }
    
    createSyncedFile(instance:InstanceMaster, table:snTableConfig, record:any){
        let func = 'createSyncedFile';
        this.logger.info(this.lib, func, 'START', {instanceMaster:instance, tableConfig:table, snRecord:record});
        
        let openFile = true;
        let appName = record['sys_scope.name'] + ' (' + record['sys_scope.scope'] + ')';
        let tableName = table.name;
        let multiFile = false;
        
        let syncedFiles = this.loadSyncedFiles(instance, appName);
        
        let appPath = path.resolve(instance.config.fsPath, appName);
        let rootPath = appPath.toString();
        
        if(!fs.existsSync(appPath)){
            this.logger.info(this.lib, func, 'App scope path does not exist. Creating:', appPath);
            fs.mkdirSync(appPath);
        }
        
        
        rootPath = path.resolve(rootPath, tableName);
        if(!fs.existsSync(rootPath)){
            this.logger.info(this.lib, func, "Creating tbale name folder:", rootPath);
            fs.mkdirSync(rootPath);
        }
        
        if(table.fields.length > 1){
            this.logger.info(this.lib, func, 'Table definition has more than one field. Updating root path to be based on display value of record.');
            rootPath = path.resolve(rootPath, record[table.display_field]);
            multiFile = true;
            openFile = false;
        }
        
        if(!fs.existsSync(rootPath)){
            this.logger.info(this.lib, func, 'Path does not exist. Creating.');
            fs.mkdirSync(rootPath);
        }
        
        this.logger.info(this.lib, func, `Create file(s) in ${rootPath} based on table config:`, table);
        
        table.fields.forEach((field) =>{
            this.logger.debug(this.lib, func, 'Processing field:', field);
            let fileName = record[table.display_field];
            if(multiFile){
                fileName = field.label;
            }
            let file = fileName + '.' + field.extention;
            let content = record[field.name];
            let settings = vscode.workspace.getConfiguration();
            var createEmptyFiles = settings.get('snich.createEmptyFiles') || "Yes";
            
            if((createEmptyFiles === 'Yes' && !content) || content){
                let fullPath = path.resolve(rootPath, file);
                this.logger.debug(this.lib, func, `Creating file at ${fullPath}`);
                fs.writeFileSync(fullPath, content,'utf8');
                syncedFiles.push(new SNSyncedFile(fullPath, instance.config.name, field, record));
                if(openFile){
                    this.logger.debug(this.lib, func, `Opening file found at: ${fullPath}`);
                    vscode.window.showTextDocument(vscode.Uri.file(fullPath));
                }
            } else {
                vscode.window.showWarningMessage(`Attempted to create file (${fileName}) and content was empty. This could be due to protection policy. Configure extension settings to change this behavior.` );
            }
        });
        
        this.writeSyncedFiles(appPath, syncedFiles);
        
        this.logger.info(this.lib, func, 'END');
        return true;
    }
    
    loadJSONFromFile(filePath:string){
        let func = 'loadJSONFromFile';
        this.logger.info(this.lib, func, 'START');
        let returnData = {};
        if(fs.existsSync(filePath)){
            this.logger.info(this.lib, func, `Loading json from path: ${filePath}`);
            returnData = JSON.parse(fs.readFileSync(filePath).toString());
        } 
        this.logger.info(this.lib, func, 'END', {returnData:returnData});
        return returnData;
        
    }
    
    writeJSON(objToJSON:object, filePath:string){
        let jsonData = JSON.stringify(objToJSON, null, 4);
        fs.writeFileSync(filePath, jsonData,'utf8');
    }
    
    
    loadObservers(){
        let func = 'funcName';
        this.logger.info(this.lib, func, 'START', );
        vscode.workspace.onWillSaveTextDocument((willSaveEvent) =>{
            let func = "WillSaveTextDocument";
            this.logger.info(this.lib, func, 'Will save event started. About to step into waitUntil. WillSaveEvent currently:', willSaveEvent);
            let document = willSaveEvent.document;
            
            willSaveEvent.waitUntil( new Promise((resolve, reject) =>{
                let func = 'waitUntilPromise';
                this.logger.info(this.lib, func, 'START', document);
                
                let reservedFiles = ['servicenow_config.json', 'servicenow_synced_files.json', 'servicenow_table_config.json'];
                let isReservedFile = false;
                reservedFiles.forEach((fileName) => {
                    if(document.fileName.indexOf(fileName) >-1){
                        isReservedFile = true;
                    }
                });
                
                if(isReservedFile){
                    this.logger.info(this.lib, func, 'File saved was not one to be transmitted', document);
                    this.logger.info(this.lib, func, 'END');
                    resolve();
                    return;
                }
                
                let fileParts = document.fileName.split(path.sep);
                let syncedFiles:Array<SNSyncedFile> = [];
                let instanceConfig = <InstanceConfig>{};
                
                fileParts.forEach((part) =>{
                    //re-build our path as we crawl through it. In short, if we have a path C:\test1\test2\test3\test4, we split it apart
                    //and iterate through and rebuild path as we go so we test "up the path" looking for files. 
                    let currentPath = fileParts.slice(0, fileParts.indexOf(part)).join(path.sep);
                    
                    //see if our synced files exists here.
                    let syncedFilesPath = path.resolve(currentPath, this.syncedFilesName);
                    if(fs.existsSync(syncedFilesPath)){
                        this.logger.info(this.lib, func, 'Found syncedFiles at path:', syncedFilesPath);
                        syncedFiles = <Array<SNSyncedFile>>this.loadJSONFromFile(syncedFilesPath);
                    }
                    
                    //see if our instance config exists here. 
                    let instanceConfigPath = path.resolve(currentPath, this.configFileName);
                    if(fs.existsSync(instanceConfigPath)){
                        this.logger.info(this.lib, func, 'Found instance config at path:', instanceConfigPath);
                        instanceConfig = <InstanceConfig>this.loadJSONFromFile(instanceConfigPath);
                    }
                });
                
                
                let filePath = document.uri.fsPath;
                if(syncedFiles.length > 0){
                    this.logger.info(this.lib, func, 'We have synced files!');
                    let fileConfig = <SNSyncedFile>{};
                    syncedFiles.forEach((syncedFile, index) => {
                        this.logger.info(this.lib, func, 'Seeing if sycned file is same as path of saved file', {synced:syncedFile, file:filePath} );
                        if(syncedFile.fsPath === filePath){
                            this.logger.info(this.lib, func, 'Found synced file that is a match.', syncedFile);
                            fileConfig = syncedFile;
                            index = syncedFiles.length; //should break loop?
                        }
                    });
                    
                    if(fileConfig.fsPath){
                        //read what we have currently on disk so we can compare what's on server to see if server has a newer version.
                        let localContent = fs.readFileSync(fileConfig.fsPath).toString();
                        let localContentHash = crypto.createHash('md5').update(localContent).digest("hex");
                        let serverContent = "";
                        let serverContentHash = "";
                        let newContent = document.getText();
                        
                        let client = new RESTClient(instanceConfig);
                        let contentField = fileConfig.content_field;
                        let action = 'Overwrite'; //default to overwriting on server.
                        return client.getRecord(fileConfig.table, fileConfig.sys_id, [contentField]).then((serverRecord:any) => {
                            serverContent = serverRecord[contentField];
                            serverContentHash = crypto.createHash('md5').update(serverContent).digest("hex");
                            this.logger.info(this.lib, func, 'Comparing Server to Local MD5 Hash:', {serverHash: serverContentHash, localHash: localContentHash});
                            
                            if(localContentHash !== serverContentHash){
                                this.logger.warn(this.lib, func, "Server has is different than current copy on disk.");
                                return vscode.window.showWarningMessage('Server version is newer. If saving from compare window, choose overwrite to update.', 'Overwrite', 'Compare', 'Cancel').then((choice) =>{
                                    this.logger.info(this.lib, func, 'Choice:', choice);
                                    action = choice || "Cancel"; //default to cancel in the event they don't respond.
                                    if(action === "Overwrite"){
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            } else {
                                action = "Overwrite";
                                return true;
                            }
                            
                        }).then((okayToCommit) =>{
                            if(!okayToCommit){
                                //not okay to commit.
                                
                                if(action === "Compare"){
                                    //launch files for comparison. 
                                    let extensionMatch = fileConfig.fsPath.match(/\.[a-zA-Z]*$/);
                                    let extension = '.txt';
                                    if(extensionMatch){
                                        extension = extensionMatch[0];
                                    }
                                    let serverTempFilePath = path.resolve(".", "server_version" + extension);
                                    fs.writeFileSync(serverTempFilePath, serverContent);
                                    vscode.commands.executeCommand('vscode.diff', vscode.Uri.file(serverTempFilePath),vscode.Uri.file(fileConfig.fsPath), "Server File <--> Local File").then(() => {
                                        this.logger.info(this.lib, func, 'END');
                                        resolve();
                                    });
                                } else {
                                    resolve(); //just end.
                                    return;
                                }

                            }
                            
                            if(okayToCommit){
                                let body:any = {};
                                body[contentField] = newContent;
                                this.logger.info(this.lib, func, 'Posting record back to SN!');
                                return client.updateRecord(fileConfig.table, fileConfig.sys_id, body).then((response:any) =>{
                                    this.logger.info(this.lib, func, 'Response from file save:', response);
                                    resolve();
                                    this.logger.info(this.lib, func, 'END');
                                });
                            }
                        });
                    }     
                }
            })
            );
        });
        
        
        
        //======= START Save Document =============
        /*
        vscode.workspace.onDidSaveTextDocument((document:vscode.TextDocument) =>{
            
            let func = 'textDocumentSaved';
            this.logger.info(this.lib, func, 'START', document);
            /*
            let reservedFiles = ['servicenow_config.json', 'servicenow_synced_files.json', 'servicenow_table_config.json'];
            let isReservedFile = false;
            reservedFiles.forEach((fileName) => {
                if(document.fileName.indexOf(fileName) >-1){
                    isReservedFile = true;
                }
            });
            
            if(isReservedFile){
                this.logger.info(this.lib, func, 'File saved was not one to be transmitted', document);
                this.logger.info(this.lib, func, 'END');
                return;
            }
            
            let fileParts = document.fileName.split(path.sep);
            
            let syncedFiles:Array<SNSyncedFile> = [];
            let instanceConfig = <InstanceConfig>{};
            fileParts.forEach((part) =>{
                let syncedFilesPath = path.resolve(fileParts.slice(0, fileParts.indexOf(part)).join(path.sep), "servicenow_synced_files.json");
                if(fs.existsSync(syncedFilesPath)){
                    this.logger.info(this.lib, func, 'Found syncedFiles at path:', syncedFilesPath);
                    syncedFiles = <Array<SNSyncedFile>>this.loadJSONFromFile(syncedFilesPath);
                }
                
                let instanceConfigPath = path.resolve(fileParts.slice(0, fileParts.indexOf(part)).join(path.sep), "servicenow_config.json");
                if(fs.existsSync(instanceConfigPath)){
                    this.logger.info(this.lib, func, 'Found instance config at path:', instanceConfigPath);
                    instanceConfig = <InstanceConfig>this.loadJSONFromFile(instanceConfigPath);
                }
            });
            
            let filePath = document.uri.fsPath;
            if(syncedFiles.length > 0){
                this.logger.info(this.lib, func, 'We have synced files! Attempting to post back update!');
                syncedFiles.forEach((syncedFile) => {
                    this.logger.info(this.lib, func, 'Seeing if sycned file is same as path of saved file', {synced:syncedFile, file:filePath} );
                    if(syncedFile.fsPath === filePath){
                        this.logger.info(this.lib, func, 'Found synced file that is a match.', syncedFile);
                        let content = fs.readFileSync(filePath).toString();
                        let client = new RESTClient(instanceConfig);
                        let body = <any>{};
                        body[syncedFile.content_field] = content;
                        return client.getRecord(syncedFile.table, syncedFile.sys_id, ['sys_id', syncedFile.content_field]).then((serverVersion:any):any =>{
                            let serverContent = JSON.stringify(serverVersion[syncedFile.content_field]);
                            let currentContent = JSON.stringify(content);
                            let serverHash = crypto.createHash('md5').update(serverContent).digest("hex");
                            let currentHash = crypto.createHash('md5').update(currentContent).digest("hex");
                            if(serverHash !== currentHash){
                                this.logger.info(this.lib, func, "Content was different on server!", {server: serverHash, current:currentHash});
                                vscode.commands.executeCommand('vscode.diff', filePath, serverContent, "Local File <--> Server File");
                                
                            } 
                            this.logger.info(this.lib, func, 'Posting record back to SN!');
                            return client.updateRecord(syncedFile.table, syncedFile.sys_id, body).then((response:any) =>{
                                this.logger.info(this.lib, func, 'Response from file save:', response);
                                this.logger.info(this.lib, func, 'END');
                            });
                            
                        });
                        
                    }
                });
            } else {
                this.logger.info(this.lib, func, 'END');
            }
            
        });
        
        //======= END Save Document =============
        this.logger.info(this.lib, func, 'END');
        */
    }
}

export class SNSyncedFile {
    fsPath:string = "";
    table:string = "";
    sys_id:string = "";
    content_field:string = "";
    sys_scope:string = "";
    sys_package:string = "";
    
    constructor(fsPath:string, instanceName:string, snTableField:snTableField, snRecordObj:any){
        this.fsPath = fsPath;
        this.table = snTableField.table;
        this.sys_id = snRecordObj.sys_id;
        this.content_field = snTableField.name;
        this.sys_scope = snRecordObj['sys_scope.scope'];
        this.sys_package = snRecordObj.sys_package || "";
    }
}