const DBHelper = require('../helpers/dbHelper');
const con = require('../db');
const dbHelper = DBHelper(con);

class ReconUnit {

    /**
     * Get recon unit by id or all recon units
     * @param reconunitid
     * @return Primise(data/error)
     */
    get(reconunitid) {
        if (reconunitid) {
            return dbHelper.select('reconunit', `id = ${reconunitid}`);
        } else {
            return dbHelper.select('reconunit');
        }
    }

    new(data) {
        return dbHelper.insert('reconunit', data);
    }

    update(reconunitid, data) {
        return dbHelper.update('reconunit', data, `id = ${reconunitid}`);
    }


}

module.exports = new ReconUnit;