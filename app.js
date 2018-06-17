const db = require('./db.js');
const express = require('express');
const appLogger = require('./helpers/logger')('app');
const ApiResponse = require('./helpers/apiResponse');
const app = express();
const TargetController = require('./controllers/targetController');
const ReconUnitController = require('./controllers/reconunitController');
const MessageController = require('./controllers/messageController');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(function (req, res, next) {
    appLogger.writeLog(`New Request ${req.method} '${req.originalUrl}' from  ${req.ip}`);
    next()
});

app.use(function (err, req, res, next) {
    appLogger(err.stack);
    res.status(500).send(ApiResponse(false, 'Something broke!'));
});

app.use('/target', TargetController);

app.use('/reconunit', ReconUnitController );

app.use('/message', MessageController);

module.exports = app;
