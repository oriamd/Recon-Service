const moment = require('moment');
const fs = require('fs');

class Logger{

    /**
     *
     * @param name of the of the logger
     * @param filePath <String>,<Array(String)> Optional : print the log to file path
     */
    constructor(name, filePath){
        this.name= name;
        this.logFile = filePath;
    }

    /**
     * Write log msg to console, Store it in member log and in Global log
     * @param msg string type
     */
    writeLog(msg){
        let logMsg = `${moment().format("L LT")} # ${this.name} : ${msg}`;
        console.log(logMsg);
        this.writeToFile(logMsg)

    }

    writeToFile(msg){
        if(this.logFile == null){
            return
        }
        if(Array.isArray(this.logFile)){
            for(let filePath of this.logFile){
                fs.appendFile(filePath ,msg+"\n",()=>{});
            }
        }else {
            fs.appendFile(this.logFile, msg + "\n", () => {
            });
        }

    }

}

/**
 * @param name string with the name of the log
 */
module.exports =  function (name,filePath) {
    return new Logger(name,filePath);
};