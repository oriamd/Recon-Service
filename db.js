const mysql = require('mysql');
const dbLogger = require('./helpers/logger')('db');
try {
    require.resolve('./config');
    var config = require('./config');
} catch (e) {
}
const host = process.env.DB_HOST || config.db.host;
const conf = {
    host: host,
    user: process.env.DB_USERNAME || config.db.user,
    password: process.env.DB_PASSWORD || config.db.password,
    database: "recon",
    dateStrings: true
};
var db = {};


db.connection = mysql.createConnection(conf);
var del = db.connection._protocol._delegateError;

db.connection._protocol._delegateError = function(err, sequence){
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};

db.connection.connect(function (err) {
    if (err) {
        dbLogger.writeLog(err);
    } else {
        dbLogger.writeLog("db connected to " + host);
    }
});

function handleDisconnect(tempConn) {
    tempConn.on('error', function (err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        dbLogger.writeLog('Re-connecting lost connection: ' + err.stack);

        db.connection = mysql.createConnection(conf);
        handleDisconnect(connection);
        db.connection.connect();
    });
}
handleDisconnect(db.connection);

module.exports = db;