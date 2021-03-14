import { SNICHConnection } from "../SNICHConnection/SNICHConnection";
import { SNICHInstance } from "../SNICHInstance/SNICHInstance";
import { SNICHLogger } from "../SNICHLogger/SNICHLogger"


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

            const sConn = new SNICHConnection(this.logger);
            let sConnLoaded = await sConn.load(this.snInstance.getId());

            if (!sConnLoaded) {
                throw new Error('For some reason we failed to load the connection. Please check logs.!');
            }

            const packagesResult = sConn.getAggregate('sys_package', 'active=true',)


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

}