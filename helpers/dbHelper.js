const con = require('../db.js');

class DBHelper {

    constructor(mysqlConnection) {
        this.con = mysqlConnection;
    }

    select(from, where) {
        return new Promise(function (resolve, reject) {

            let query = `SELECT * FROM ${from}`;
            if (where) {
                query = `${query} WHERE ${where}`;
            }

            con.query(query, function (error, results, fields) {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            });
        })
    }

    insert(into, data) {
        return new Promise(function (resolve, reject) {
            if (into == null || data == null) {
                return reject('Wrong arguments')
            }

            let query = null,
                fieldsStr = '(' + Object.keys(data).join(',') + ')',
                valuesStr = "(" + Object.values(data).map(key => `'${key}'`).join(',') + ")";

            query = `INSERT INTO ${into} ${fieldsStr} VALUES ${valuesStr}`;

            con.query(query, function (error, results, fields) {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            });
        })
    }

    update(table, data, where) {
        return new Promise(function (resolve, reject) {
            if (table == null || data == null || where == null) {
                return reject('Wrong arguments')
            }

            let query = null,
                setStr = Object.keys(data)
                    .map((key) => {
                        return key + " = '" + data[key]+"'";
                    })
                    .join(', ');

            query = `UPDATE ${table} SET ${setStr} WHERE ${where}`;

            con.query(query, function (error, results, fields) {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            });
        })
    }

    query(query) {
        return new Promise(function (resolve, reject) {
            con.query(query, function (error, results, fields) {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            });
        })
    }

}

module.exports = function (mysqlConnection) {
    return new DBHelper(mysqlConnection);
};