import { workspace } from 'vscode';

export class SNICHLogger {

    //* Log Level Constants */
    _DEBUG: number = 4;
    _INFO: number = 3;
    _WARN: number = 2;
    _ERROR: number = 1;
    _NONE: number = 0;

    // entry we're on and padding to provide.
    //private entry:number;
    //private padding:string;
    logLevel: number = this._NONE;



    constructor() {
        //this.entry = 0;
        //this.padding = "0000000";

        this.setLogLevel();
    }

    setLogLevel() {
        let settings = workspace.getConfiguration();
        var level = settings.get('snich.logLevel') || 0;
        if (level === 'Debug') {
            this.logLevel = this._DEBUG;
        }
        else if (level === 'Info') {
            this.logLevel = this._INFO;
        }
        else if (level === 'Warn') {
            this.logLevel = this._WARN;
        }
        else if (level === 'Error') {
            this.logLevel = this._ERROR;
        } else {
            this.logLevel = this._NONE;
        }
    }

    getLogLevelLabel(level: number) {
        if (level === 0) {
            return " NONE:";
        } else if (level === 1) {
            return "ERROR:";
        } else if (level === 2) {
            return " WARN:";
        } else if (level === 3) {
            return " INFO:";
        } else if (level === 4) {
            return "DEBUG:";
        }
    }

    inChattyMode() {
        if (this.logLevel > this._WARN) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param level The logging level
     * @param library The class / library calling the logger
     * @param func //the function you're in.
     * @param msg  //the message you want to log
     * @param obj //An object or variable to include.
     */
    log(level: number, library: string, func: string, msg: string, obj?: any) {
        if (this.logLevel === this._NONE) {
            return;
        }
        /*
        var entryNumPadded = this.padding.substring(0, this.padding.length - ("" + this.entry).length) + this.entry;
        var fullMsg = `[${entryNumPadded}] - {${library} : ${func}} - ${msg}`;
        */
        var logLevelLabel = this.getLogLevelLabel(level);
        var fullMsg = `${logLevelLabel} {${library} : ${func}} - ${msg}`;
        if (level <= this.logLevel) {
            let log = console.log;

            if (level === this._WARN) {
                log = console.warn;
            } else if (level === this._ERROR) {
                log = console.error;
            }

            if (arguments.length > 4) {
                log(fullMsg, obj);
            } else {
                log(fullMsg);
            }
        }
        //this.entry++;
    }

    debug(library: string, func: string, msg: string, obj?: any) {
        if (arguments.length == 3) {
            this.log(this._DEBUG, library, func, msg);
        } else {
            this.log(this._DEBUG, library, func, msg, obj);
        }
    }
    info(library: string, func: string, msg: string, obj?: any) {
        if (arguments.length == 3) {
            this.log(this._INFO, library, func, msg);
        } else {
            this.log(this._INFO, library, func, msg, obj);
        }
    }
    warn(library: string, func: string, msg: string, obj?: any) {
        if (arguments.length == 3) {
            this.log(this._WARN, library, func, msg);
        } else {
            this.log(this._WARN, library, func, msg, obj);
        }
    }
    error(library: string, func: string, msg: string, obj?: any) {
        if (arguments.length == 3) {
            this.log(this._ERROR, library, func, msg);
        } else {
            this.log(this._ERROR, library, func, msg, obj);
        }
    }

    reportException(library: string, func: string, e: any) {
        this.log(this._ERROR, library, func, 'EXCEPTION', e);
    }
}