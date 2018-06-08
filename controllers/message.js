const DBHelper = require('../helpers/dbHelper');
const con = require('../db');
const dbHelper = DBHelper(con);
const moment = require('moment');

const TimeWindowInSec =  5;

class Message{

    /**
     * Get Messages which created in the past Default TimeWindow time
     * @param destReconunitid if provided then return only messages referred  to reconunitid
     * @param timeFrame if provided then uses this as TimeWindow
     * @return Promise(data/error)
     */
    get(destReconunitid, timeFrame ) {
        let now = moment();
        if(timeFrame == null){
            timeFrame = TimeWindowInSec;
        }
        if(destReconunitid != null){
            return dbHelper.query(`SELECT * FROM message WHERE createdon >= '${now.subtract('s',timeFrame).format('YYYY-MM-DD HH:mm:ss')}' AND dest_reconunitid = ${destReconunitid}`)
        }else{
            return dbHelper.query(`SELECT * FROM message WHERE createdon >= '${now.subtract('s',timeFrame).format('YYYY-MM-DD HH:mm:ss')}'`)
        }
    }

    /**
     * Get All Messages
     * @param destReconunitid if provided then return only messages referred  to reconunitid
     * @return Promise(data/error)
     */
    getAll(destReconunitid) {
        let now = moment();
        if(destReconunitid != null){
            return dbHelper.query(`SELECT * FROM message WHERE dest_reconunitid = ${destReconunitid}`)
        }else{
            return dbHelper.query(`SELECT * FROM message`)
        }
    }

    new(data) {
        data.createdon  = moment().format('YYYY-MM-DD HH:mm:ss');
        return dbHelper.insert('message', data);
    }

}

module.exports = new Message;