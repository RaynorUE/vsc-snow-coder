import * as vscode from 'vscode';
import { InstanceMaster } from './InstanceConfigManager';
import { SNICHLogger } from '../SNICH/SNICHLogger/SNICHLogger';

export class WebBrowser {

    instance: InstanceMaster;
    logger?: SNICHLogger;

    constructor(instance: InstanceMaster, logger?: SNICHLogger) {
        this.instance = instance;
        if (logger && logger.info) {
            this.logger = logger;
        } else {
            this.logger = new SNICHLogger();
        }
    }


    open(url: string) {
        vscode.env.openExternal(vscode.Uri.parse(url));
    }

    openFile(table_name: string, sys_id: string, app_scope_sys_id?: string, nav_to?: boolean) {
        let url = this.instance.getURL() + '/' + table_name + '.do?sys_id=' + sys_id;

        //if an app_scope is provided, use the sysparm_transaction_scope param to save that annoyance lol. 
        if (app_scope_sys_id) {
            url += '&sysparm_transaction_scope=' + app_scope_sys_id;
        }
        this.open(url);
    }
}