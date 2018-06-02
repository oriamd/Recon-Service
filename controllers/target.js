const DBHelper = require('../helpers/dbHelper');
const con = require('../db');
const dbHelper = DBHelper(con);
const moment = require('moment');

class Target {

    /**
     * Get targets by id or all targets
     * @param targetid
     * @return Primise(data/error)
     */
    get(targetid) {
        if (targetid) {
            // return dbHelper.select('target', `id = ${targetid}`);
            return dbHelper.query(`select target.*, reconunit.name as reconunit_name from target INNER join reconunit on target.reconunitid = reconunit.id where target.id = ${targetid}`)
        } else {
            return dbHelper.query(`select target.*, reconunit.name as reconunit_name from target INNER join reconunit on target.reconunitid = reconunit.id`)
        }
    }

    new(data) {
        data.createdon  = moment().format('YYYY-MM-DD HH:mm:ss');
        if(data.type == "" || data.type == null){
            data.type = 'target';
        }
        return dbHelper.insert('target', data);
    }

    update(targetid, data) {
        return dbHelper.update('target', data, `id = ${targetid}`);
    }

    delete(targetid){
        return dbHelper.delete('target', 'id='+targetid);
    }

}

module.exports = new Target;