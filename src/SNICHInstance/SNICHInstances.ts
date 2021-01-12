import { SNICHConfig } from '../@types/SNICHConfig';
import { SNICHInstancesService } from './SNICHInstancesService';
import * as vscode from 'vscode';


export class SNICHInstances {
    inService: SNICHInstancesService;

    lastSelectedInstanceId: string = "";

    constructor() {
        this.inService = new SNICHInstancesService()
    }

    load() {
        //May need this func to "Load the DB" if we can't do it easily in the constructor due to async..
    }

    async selectInstance() {
        //this would be QPItem list to select instances...
        //get last selected first, then all but last selected, so it's at the top..

        let instanceQPs = [];
        let lastSelected = undefined;
        let instances = await this.inService.getMultiple();

        if (instances.length === 0) {
            throw "No instances found. Not sure how we got here without a valid workspace configuration..";
        }

        instanceQPs = instances.map((instance) => {
            if (instance._id == this.lastSelectedInstanceId) {
                lastSelected = instance;
            } else {
                return instance;
            }
        })

        if (lastSelected) {
            instanceQPs.unshift(lastSelected);
        }

        //show quick pick

    }

    async saveInstance(instanceData: SNICHInstance) {

    }
}


export class SNICHInstance {
    data: SNICHConfig.Instance = {
        connection: {
            auth: { type: "basic", writeBasicToDisk: false },
            url: "",
        },
        name: "",
        rootPath: vscode.Uri.parse(""),
        _id: ""
    }
}



