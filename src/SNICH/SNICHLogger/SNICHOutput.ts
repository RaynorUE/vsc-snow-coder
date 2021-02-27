import { SNICHLogger } from './SNICHLogger';
import { snichOutput } from '../../extension';
import { workspace } from 'vscode';

export class SNICHOutput extends SNICHLogger {

    snichOut = snichOutput;

    super() { }

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
        let prefix = `${logLevelLabel} {${library} : ${func}} - `;
        var fullMsg = `${prefix}${msg}`;
        if (level <= this.logLevel) {
            let log = this.snichOut.appendLine;

            if (arguments.length > 4) {

                let objPadding: string[] = [];
                objPadding.length = prefix.length;
                objPadding.fill("");

                log(fullMsg + `\n${objPadding.join(" ")}` + JSON.stringify(obj));
            } else {
                log(fullMsg);
            }
        }
        //this.entry++;
    }


    setLogLevel() {
        let settings = workspace.getConfiguration();
        var level = settings.get('snich.output.logLevel') || 0;
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

    clear() {
        this.snichOut.clear();
    }

    show(preserveFocus?: boolean) {
        this.snichOut.show(preserveFocus);
    }

    hide() {
        this.snichOut.hide();
    }

}