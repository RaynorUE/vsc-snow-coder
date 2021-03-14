import { SNICHLogger } from "../SNICHLogger/SNICHLogger"


export class SNICHPackage {
    data: SNICHConfig.Package[] = [];

    logger: SNICHLogger;
    type = "SNICHPackage";
    instance_id = "";

    constructor(logger: SNICHLogger, instance_id: string) {
        this.logger = logger;
        this.setInstanceId(instance_id);
    }

    setInstanceId(id: string) { this.instance_id = id; }
    getInstanceId() { return this.instance_id; }

    selectPackage() {

    }

    addPackage() {

    }

    removePackage() {

    }

}