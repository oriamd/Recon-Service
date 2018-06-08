const mysql = require('mysql');
const dbLogger = require('./helpers/logger')('db');
try {
    require.resolve('./config');
    var config = require('./config');
} catch (e) {
}

const host = process.env.DB_HOST || config.db.host;

var connection = mysql.createConnection({
        host: host,
        user: process.env.DB_USERNAME || config.db.user,
        password: process.env.DB_PASSWORD || config.db.password,
        database: "recon",
        dateStrings: true
    }
);

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};

connection.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST')
        dbLogger.writeLog(error);

    dbLogger.writeLog('> Re-connecting lost MySQL connection: ' + error.stack);

    connection.connect();
});


connection.connect(function (err) {
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

        connection = mysql.createConnection(tempConn.config);
        handleDisconnect(connection);
        connection.connect();
    });
}

handleDisconnect(connection);

module.exports = connection;