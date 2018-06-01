const mysql = require('mysql');
const dbLogger = require('./helpers/logger')('db');
try{
    require.resolve('./config');
    var config = require('./config');
}catch(e){}

const host = process.env.DB_HOST || config.db.host;

const con = mysql.createConnection({
        host: host,
        user: process.env.DB_USERNAME || config.db.user,
        password: process.env.DB_PASSWORD || config.db.password,
        database: "recon"
    }
);

con.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST')
        dbLogger.writeLog(error);

    dbLogger.writeLog('> Re-connecting lost MySQL connection: ' + error.stack);

    con.connect();
});


con.connect(function (err) {
    if (err) {
        dbLogger.writeLog(err);
    } else {
        dbLogger.writeLog("db connected to " + host);
    }
});

con.on('error', function(err) {
    if (!err.fatal) {
        return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
    }
    console.log('Re-connecting lost connection: ' + err.stack);
    sql = mysql.createConnection(connection.config);
    handleDisconnect(sql);
    sql.connect();
});

module.exports = con;