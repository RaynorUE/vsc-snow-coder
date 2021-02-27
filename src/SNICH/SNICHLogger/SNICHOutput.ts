import { SNICHLogger } from './SNICHLogger';
import { snichOutput } from '../../extension';

export class SNICHOutput extends SNICHLogger {

    output = snichOutput;

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

}