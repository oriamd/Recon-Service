const db = require('../db.js');

class DBHelper {

    select(from, where) {
        return new Promise(function (resolve, reject) {

            let query = `SELECT * FROM ${from}`;
            if (where) {
                query = `${query} WHERE ${where}`;
            }

            resolve(db.query(query))
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

            resolve(db.query(query))
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

            resolve(db.query(query))
        })
    }

    delete(table, where) {
        return new Promise(function (resolve, reject) {
            if (table == null || where == null) {
                return reject('Wrong arguments')
            }

            let query = `DELETE FROM ${table} WHERE ${where}`;

            resolve(db.query(query))
        })
    }

    query(query) {
        return db.query(query);
    }

}

module.exports = function () {
    return new DBHelper();
};