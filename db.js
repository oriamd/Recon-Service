const mysql = require('mysql');
const config = require('./config');
const dbLogger = require('Logger')('db');

const con = mysql.createConnection(config.db);
con.connect(function (err) {
    if (err) {
        dbLogger.writeLog(err);
    }else {
        dbLogger.writeLog("db connected to " + config.db.host);
    }
});

module.exports = con;