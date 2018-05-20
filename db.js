const mysql = require('mysql');
const config = require('./config');
const dbLogger = require('Logger')('db');

const con = mysql.createConnection({
        host: process.env.DB_HOST || config.db.host,
        user: process.env.DB_USERNAME || config.db.username,
        password: process.env.DB_PASSWORD || config.db.password,
        database: "recon"
    }
);
con.connect(function (err) {
    if (err) {
        dbLogger.writeLog(err);
    } else {
        dbLogger.writeLog("db connected to " + config.db.host);
    }
});

module.exports = con;