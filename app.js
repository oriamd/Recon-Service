const db = require('./db.js');
const express = require('express');
const appLogger = require('Logger')('app');
const ApiResponse = require('./helpers/apiResponse');
const app = express();

const TargetController = require('./controllers/targetController')


app.use(function (req, res, next) {
    appLogger.writeLog(`New Request '${req.originalUrl}' from  ${req.ip}`);
    next()
});

app.use('/target', TargetController);

app.use(function (err, req, res, next) {
    appLogger(err.stack);
    res.status(500).send(ApiResponse(false, 'Something broke!'));

});

module.exports = app;
