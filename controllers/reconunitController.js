const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ApiResponse = require('../helpers/apiResponse');
const reconunitControllerLogger = require('../helpers/logger')('reconunitController');
const reconUnit = require('./reconunit');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
    let id = req.params.id;
    reconUnit.get()
        .then(function (data) {
                res.json(new ApiResponse(true, data))
            }
        ).catch(function (error) {
        reconunitControllerLogger.writeLog(error);
        res.json(new ApiResponse(false, error));
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    reconUnit.get(id)
        .then(function (data) {
            if(data.length > 0){
                res.json(new ApiResponse(true, data[0]))
            }else{
                throw 'Record not found'
            }
        })
        .catch(function (error) {
            reconunitControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        })
});

router.post('/', function (req, res) {
    let body = req.body;
    reconUnit.new(body)
        .then(function (data) {
            res.json(new ApiResponse(true, ""))
        })
        .catch(function (error) {
            reconunitControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        });
});

router.put('/:id', function (req, res) {
    let id = req.params.id,
        body = req.body;
    reconUnit.update(id, body)
        .then(function (data) {
            res.json(new ApiResponse(true, ""))
        })
        .catch(function (error) {
            reconunitControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        });
});


module.exports = router;