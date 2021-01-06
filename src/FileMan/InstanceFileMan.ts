import * as vscode from 'vscode';
import { SNICHConfig } from '../@types/SNICHConfig';

/**
 * Purpose is to handle read/writing files related to a given instance
 */

export class InstanceFileMan {
    instance: SNICHConfig.Instance;

    constructor(instance: SNICHConfig.Instance) {
        this.instance = instance;
    }

}