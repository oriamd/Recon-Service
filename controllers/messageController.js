const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ApiResponse = require('../helpers/apiResponse');
const messageControllerLogger = require('../helpers/logger')('messageController');
const message = require('./message');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
    message.get()
        .then(function (data) {
                res.json(new ApiResponse(true, data))
            }
        ).catch(function (error) {
        messageControllerLogger.writeLog(error);
        res.json(new ApiResponse(false, error));
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let isAll = req.query.all
    if(isAll == '1'){
        message.getAll(id)
            .then(function (data) {
                    res.json(new ApiResponse(true, data))
                }
            ).catch(function (error) {
            messageControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        });
    }else {
        message.get(id)
            .then(function (data) {
                    res.json(new ApiResponse(true, data))
                }
            ).catch(function (error) {
            messageControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        });
    }
});

router.post('/', function (req, res) {
    let body = req.body;
    message.new(body)
        .then(function (data) {
            res.json(new ApiResponse(true, ""))
        })
        .catch(function (error) {
            reconunitControllerLogger.writeLog(error);
            res.json(new ApiResponse(false, error));
        });
});

module.exports = router;