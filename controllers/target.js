const DBHelper = require('../helpers/dbHelper');
const con = require('../db');
const dbHelper = DBHelper(con);

class Target {

    /**
     * Get targets by id or all targets
     * @param targetid
     * @return Primise(data/error)
     */
    get(targetid) {
        if (targetid) {
            return dbHelper.select('target', `id = ${targetid}`);
        } else {
            return dbHelper.select('target');
        }
    }

    new(data) {
        return dbHelper.insert('target', data);
    }

    update(targetid, data) {
        return dbHelper.update('target', data, `id = ${targetid}`);
    }


}

module.exports = new Target;