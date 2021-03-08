import * as vscode from 'vscode';
import { SNICHLogger } from '../SNICHLogger/SNICHLogger';
import { InstanceFileMan } from '../../FileMan/InstanceFileMan';
import { WSFileMan } from '../../FileMan/WSFileMan';
import { SNICHConnection } from '../SNICHConnection/SNICHConnection';
import { SNICHInstancesService } from './SNICHInstancesService';
import { SNICHInstanceAsker } from '../SNICHAsker/SNICHInstanceAsker';
import { SNICHTableConfig } from '../SNICHTableConfig/SNICHTableConfig';


export class SNICHInstance {
    private data: SNICHConfig.Instance = {
        _id: undefined,
        name: "",
        rootPath: {
            path: "",
            fspath: ""
        },
        last_selected: 0
    };

    logger: SNICHLogger;
    type = "SNICHInstance";

    constructor(logger: SNICHLogger, data?: SNICHConfig.Instance) {
        const func = 'constructor';
        this.logger = logger;

        this.logger.info(this.type, func, `ENTERING`);

        this.logger.info(this.type, func, `LEAVING`);

    }

    async load() {
        const func = 'load';
        this.logger.info(this.type, func, "ENTERING");

        let result: boolean | undefined = false;
        const iService = new SNICHInstancesService(this.logger);
        //how many total?
        const count = await iService.count();
        if (count == 1) {
            let snInstances = await iService.getMultiple();
            this.setData(snInstances[0]);
            result = true;

        } else if (count && count > 1) {
            result = await this.selectInstance();
        } else {
            this.logger.error(this.type, func, `No instances configured. Cannot load!`);
            result = false;
        }

        this.logger.info(this.type, func, `LEAVING`);
        return result;
    }

    async save() {
        const func = 'save';
        this.logger.info(this.type, func, `ENTERING`);
        const iService = new SNICHInstancesService(this.logger);
        if (this.data._id) {
            await iService.update(this.data._id, this.getData());
        } else {
            let insertResult = await iService.insert(this.getData());
            if (insertResult) {
                this.setData(insertResult); //so we store _id in class/memory
            }
        }
        this.logger.info(this.type, func, `LEAVING`);
    }


    async selectInstance(): Promise<boolean | undefined> {
        const func = 'selectInstance';
        this.logger.info(this.type, func, "ENTERING");

        var res = undefined;

        try {

            let iService = new SNICHInstancesService(this.logger);
            let instances = await iService.getMultiple({}, [['sort', { last_selected: -1 }]]);

            let selectedInstance = await new SNICHInstanceAsker(this.logger).askSelectInstance(instances);
            if (selectedInstance) {
                this.setData(selectedInstance);
                res = true;
            } else {
                res = false;
            }
        } catch (e) {
            this.logger.reportException(this.type, func, e);
            res = undefined;
        } finally {
            this.logger.info(this.type, func, "LEAVING");
        }

        return res;
    }

    /**
     * go through all the various setup questions and process for configuring a new SNICH Instance.
     */
    async setup(): Promise<boolean> {
        const func = "setup";
        this.logger.info(this.type, func, "ENTERING");

        let result = false;

        const asker = new SNICHInstanceAsker(this.logger);

        //to save as we go.
        const iService = new SNICHInstancesService(this.logger);

        let enteredInstanceValue = await asker.askForInstanceURL();

        if (!enteredInstanceValue) {
            this.logger.info(this.type, func, `LEAVING`);
            return this.abortSetup();
        }

        let instanceUrl = '';

        if (enteredInstanceValue.indexOf('http://') > -1 || enteredInstanceValue.indexOf('https://') > -1) {
            //instance entered IS a URL.
            instanceUrl = enteredInstanceValue;
        } else if (enteredInstanceValue.indexOf('.') > -1) {
            //instance entered is not a FULL Url with protocol... add it..
            instanceUrl = `https://${enteredInstanceValue}`;
        } else {
            //last assumption is entered was JUST an instance name..
            instanceUrl = `https://${enteredInstanceValue}.service-now.com`;
        }

        let validateInstanceURL = await asker.askYesNo(`Continue with instance url? ${instanceUrl}`);
        if (validateInstanceURL == undefined) {
            this.logger.info(this.type, func, "LEAVING");
            return this.abortSetup();
        } else if (validateInstanceURL == false) {
            this.logger.info(this.type, func, `LEAVING`);
            return await this.setup();
        }

        const connection = new SNICHConnection(this.logger);
        connection.setURL(instanceUrl);

        // Validate folder name. Giving an opportunity to change.
        let fixedInstanceName = this.getName() || instanceUrl.replace('https://', '').replace(':', '_');

        let instanceName = await asker.askFolderName(fixedInstanceName);
        if (!instanceName) {
            this.logger.info(this.type, func, `LEAVING`);
            return this.abortSetup('No folder name specified.');
        }

        this.setName(instanceName);

        let foundInstance = await iService.get({ name: this.getName() });

        if (foundInstance) {
            this.logger.debug(this.type, func, "Found instance!", foundInstance);
            let continueConfig = await asker.askYesNo(`Instance found by name [${this.getName()}]. Continue and reconfigure instance?`);
            if (!continueConfig) {
                this.logger.info(this.type, func, "LEAVING");
                return this.abortSetup();
            }

            if (continueConfig == true) {
                this.setData(foundInstance);
                const dataSoFar = connection.getData();
                await connection.load(foundInstance._id);
                connection.setURL(dataSoFar.url);
                connection.save();
            } else {
                this.logger.info(this.type, func, "LEAVING");
                return this.setup();
            }
        } else {
            /**
             * @todo, i think issue is we are smashing over data, wit
             */
            await this.save();
            const dataSoFar = connection.getData();
            await connection.load(this.getId());
            dataSoFar._id = connection.getId();
            connection.setData(dataSoFar);
            await connection.save();

        }

        /** ==== SETUP AUTH! ==== */
        let authResult = await connection.setupAuth();
        if (!authResult) {
            this.logger.info(this.type, func, "LEAVING");
            return this.abortSetup('Auth setup failed miserably. Please try setting up instance again.');
        }



        this.logger.debug(this.type, func, "Saving instance and connection data!");
        await this.save();
        await connection.save();


        /** ==== Seutp Table config, including loading config from instance! ==== */
        let tConfig = new SNICHTableConfig(this.logger);
        await tConfig.load(this.getId(), true);

        /** ==== Setup workspace folders ==== */
        let wsFileman = new WSFileMan(this.logger);
        const wsRoot = wsFileman.getWSRootUri();
        if (!wsRoot) {
            this.logger.error(this.type, func, 'For some reason we got here without a workspace root... we should have checked all that before now..')
            return this.abortSetup('No workspace loaded. Please load a folder to use as your workspace.');
        }

        this.setRootPath(vscode.Uri.joinPath(wsRoot, this.getName()));
        let iFileMan = new InstanceFileMan(this.logger);
        await iFileMan.createInstanceRoot(this.getRootPath());

        this.logger.info(this.type, func, "LEAVING");
        vscode.window.showInformationMessage('Instance setup success! Time to start syncing files!');
        return result;
    }

    setName(name: string) { this.data.name = name }
    getName() { return this.data.name }


    abortSetup(msg?: string) {
        vscode.window.showWarningMessage('Instance setup aborted. ' + (msg || ""));
        return false;
    }

    setId(id: string) { this.data._id = id }
    getId() { return this.data._id }

    setRootPath(uri: vscode.Uri) {
        this.data.rootPath.fspath = uri.fsPath || "";
        this.data.rootPath.path = uri.path || "";
    }
    getRootPath(): vscode.Uri {
        return vscode.Uri.parse(this.data.rootPath.path);
    }

    /**
     * Set the internal data object from some source DB, JSON file, etc.
     * @param data Data loaded from somewhere
     */
    setData(data: SNICHConfig.Instance) {
        //de-reference
        const newData = { ...data };
        this.data = newData;
    }

    getData() {
        return this.data
    }

}
