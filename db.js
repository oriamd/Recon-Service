const mysql = require('mysql');
const dbLogger = require('./helpers/logger')('db');
try {
    require.resolve('./config');
    var config = require('./config');
} catch (e) {
}
const host = process.env.DB_HOST || config.db.host;

const conf = {
    connectionLimit : 10,
    host: host,
    user: process.env.DB_USERNAME || config.db.user,
    password: process.env.DB_PASSWORD || config.db.password,
    database: "recon"
};

var pool  = mysql.createPool(conf);


const db ={
  query: function (query) {
      return new Promise(function (resolve, reject) {
          pool.getConnection(function(err, connection) {

              if(err){
                  reject(err);
              }
              connection.query(query, function (error, results, fields) {
                  connection.release();
                  if (error){
                      reject(error)
                  }else{
                      resolve(results)
                  }
              });
          });
      })
  }  
};

module.exports = db;