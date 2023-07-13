'use strict';
const logger = require('./httpd').log;

logger.addStream({
    name: 'lev-api',
    level: 'debug',
    path: 'lev-api.log'
});


