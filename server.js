const app = require('./app');
const port = process.env.PORT || 3000;
const logger = require('Logger')('server');

const server = app.listen(port, function() {
    logger.writeLog('Express listening on port ' + port);
});