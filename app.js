const db = require('./db.js');
const express = require('express');
const appLogger = require('./helpers/logger')('app');
const ApiResponse = require('./helpers/apiResponse');
const app = express();
const TargetController = require('./controllers/targetController');
const ReconUnit = require('./controllers/reconunitController');


app.use(function (req, res, next) {
    appLogger.writeLog(`New Request '${req.originalUrl}' from  ${req.ip}`);
    next()
});

app.use(function (err, req, res, next) {
    appLogger(err.stack);
    res.status(500).send(ApiResponse(false, 'Something broke!'));
});

app.use('/target', TargetController);

app.use('/reconunit', ReconUnit);

module.exports = app;
