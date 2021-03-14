import { SNICHConnection } from "../SNICHConnection/SNICHConnection";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger";
import * as vscode from 'vscode';


export class SNICHPackage {
    data: SNICHConfig.Package[] = [];

    logger: SNICHLogger;
    type = "SNICHPackage";
    snInstance: SNICHInstance;

    pullFields = ["name", "source", "sys_class_name", "version"];

    constructor(logger: SNICHLogger, snInstance: SNICHInstance) {
        this.logger = logger;
        this.snInstance = snInstance;
    }

    setInstance(id: SNICHInstance) { this.snInstance = id; }
    getInstance() { return this.snInstance; }

    async selectPackage(): Promise<SNICHConfig.Package | undefined> {
        const func = 'selectPackage';
        this.logger.info(this.type, func, `ENTERING`);

        let result: boolean | undefined = undefined;

        try {




            let packages = await this.getSysPackages();



        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = undefined;
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }

    addPackage() {

    }

    removePackage() {

    }


    async getSysPackages(): Promise<sys_package[]> {
        const func = 'getSysPackages';
        this.logger.info(this.type, func, `ENTERING`);

        let result: sys_package[] = [];

        try {

            //so we call sys_db object... grouping by sys_package, and sub-fields, then re-build into proper array? Yup.
            const sConn = new SNICHConnection(this.logger);
            let sConnLoaded = await sConn.load(this.snInstance.getId());

            if (!sConnLoaded) {
                throw new Error('For some reason we failed to load the connection. Please check logs.!');
            }


            /** Calling sys_db_object for this data since sys_package is unavailable for web service calls..?? 
             * TODO: this is assuming every package has a table.. oh wait, crap they don't */
            const packagesResult = await sConn.getAggregate<sys_package>('sys_package', 'active=true', this.pullFields, "all", { location: vscode.ProgressLocation.Notification, cancellable: true, title: `Acquiring package list from ${this.snInstance.getName()}` });

            if (!packagesResult || packagesResult.length === 0) {
                throw new Error(`Unable to get packages from instance ${this.snInstance.getName()}`);
            }


        } catch (e) {
            this.logger.error(this.type, func, `Onos an error has occured!`, e);
            result = [];
        } finally {
            this.logger.info(this.type, func, `LEAVING`);
        }
        return result;
    }
}