const con = require('../db.js');
class DBHelper {

    constructor(mysqlConnection){
        this.con = mysqlConnection;
    }

    select(from, where){
        return new Promise(function (resolve, reject) {

            let query  = `SELECT * FROM ${from}`;
            if(where){
                query = `${query} WHERE ${where}`;
            }

            con.query(query, function (error, results, fields) {
                if (error) {
                    return reject(error)
                }else{
                    resolve(results)
                }
            });
        })
    }

    insert(into,data){
    //TODO
    }

    update(tabel, data){
    //TODO
    }

    query(query){
        //TODO
    }

}

module.exports = function (mysqlConnection) {
    return new DBHelper(mysqlConnection);
};