'use strict';

const logger = require('../lib/httpd').log

logger.addStream({
  level: 'debug',
  path: './lev-api.log'  // log DEBUG and above to a file
});
