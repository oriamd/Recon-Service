const app = require('./app');
const port = process.env.PORT || 3000;
const serverLogger = require('logger')('server');


const server = app.listen(port, function() {
    serverLogger.writeLog('Express listening on port ' + port);
});