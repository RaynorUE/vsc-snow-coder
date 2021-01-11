import { SNICHConfig } from '../@types/SNICHConfig';
import { SNICHInstanceService } from './SNICHInstanceService';


export class SNICHInstance {
    inService: SNICHInstanceService;

    lastSelectedInstanceId: string = "";

    constructor() {
        this.inService = new SNICHInstanceService()
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

    async saveInstance(instanceData: SNICHConfig.Instance) {

    }
}



