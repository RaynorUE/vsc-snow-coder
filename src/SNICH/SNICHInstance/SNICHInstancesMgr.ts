import { SNICHInstance } from './SNICHInstance';
import { SNICHInstancesService } from './SNICHInstancesService';
import { SystemLogHelper } from '../../classes/LogHelper';
import * as vscode from 'vscode';


export class SNICHInstancesMgr {
    inService: SNICHInstancesService;

    lastSelectedInstanceId: string = "";

    logger: SystemLogHelper;

    constructor(logger: SystemLogHelper) {
        this.logger = logger;
        this.inService = new SNICHInstancesService(this.logger)
    }

    load() {
        //May need this func to "Load the DB" if we can't do it easily in the constructor due to async..
    }

    /**
     * 
     * @param instanceId Optionally can provide an instanceId and we will return back that SNICHInstance
     */
    async selectInstance(instanceId?: string) {
        //this would be QPItem list to select instances...
        //get last selected first, then all but last selected, so it's at the top..

        let selectedInstance: SNICHInstance | undefined = undefined;

        if (instanceId) {
            let foundInstance = await this.inService.get({ _id: instanceId });
            if (foundInstance && foundInstance._id) {
                selectedInstance = new SNICHInstance(this.logger, foundInstance);
            }
        }

        if (!instanceId) {

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
        }

        //show quick pick

        return selectedInstance;
    }

    async saveInstance(instanceData: SNICHInstance) {

    }

    /**
     * This method should be called for the "workspace on delete" command, in which we check to see if the folder is the instance folder
     * 
     * @todo consider moving this to SNICHInstance? Nah... 
     * 
     * @param instanceRoot the folder path of the instance to cleanup
     */
    async removeInstance(instanceRoot: vscode.Uri) {

    }
}
