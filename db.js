const mysql = require('mysql');
const dbLogger = require('Logger')('db');
try{
    const config = require('./config');
}catch (e){
    dbLogger.writeLog(e)
}
const host = process.env.DB_HOST || config.db.host;

const con = mysql.createConnection({
        host: host,
        user: process.env.DB_USERNAME || config.db.username,
        password: process.env.DB_PASSWORD || config.db.password,
        database: "recon"
    }
);
con.connect(function (err) {
    if (err) {
        dbLogger.writeLog(err);
    } else {
        dbLogger.writeLog("db connected to " + host);
    }
});

module.exports = con;