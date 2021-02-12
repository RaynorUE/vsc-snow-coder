import { SystemLogHelper } from "../../classes/LogHelper";
import * as vscode from 'vscode';
import { SNICHTableConfigService } from "./SNICHTableConfigService";


export class SNICHTableConfig {

    private data: SNICHConfig.Table = {
        _id: undefined,
        instance_id: "",
        name: "",
        additional_display_fields: [],
        display_field: "",
        fields: [],
        label: "",
        super_class: ""
    };

    logger: SystemLogHelper;
    type = "SNICHTableConfig";
    constructor(logger: SystemLogHelper) {
        var func = 'constructor';
        this.logger = logger;
        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);
    }

    async load(instanceId?: string) {
        var func = 'load';
        this.logger.info(this.type, func, `ENTERING`);
        if (!instanceId) {
            this.logger.info(this.type, func, `LEAVING`);
            throw new Error('Attempted to load an SNICHConnection without an instance ID. This would be fruitless.');
        } else {
            const connService = new SNICHTableConfigService(this.logger);
            let foundConnection = await connService.getByInstanceId(instanceId);
            if (foundConnection) {
                this.setData(foundConnection);
            } else {
                this.logger.debug(this.type, func, `Cannot find connection by id, but id provided, creating new connection.`);
                this.data.instance_id = instanceId;
                await this.save();
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }

    async save() {
        var func = 'save';
        this.logger.info(this.type, func, `ENTERING`);
        const connService = new SNICHConnectionsService(this.logger);
        if (this.data._id) {
            await connService.update(this.data._id, this.getData());
        } else {
            let insertResult = await connService.insert(this.getData());
            if (insertResult) {
                this.setData(insertResult); //so we store _id in class/memory
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }

    setup() {

    }

    getData() {
        return this.data;
    }

    setData(data: SNICHConfig.Table) {
        this.data = data;
    }


}
