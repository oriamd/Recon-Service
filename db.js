const mysql = require('mysql');
const dbLogger = require('./helpers/logger')('db');
const config = require('./config');
const host = process.env.DB_HOST || config.db.host;

const con = mysql.createConnection({
        host: host,
        user: process.env.DB_USERNAME || config.db.user,
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