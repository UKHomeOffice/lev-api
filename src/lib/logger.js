'use strict';

const logger = require('../lib/httpd').log;
const bunyan = require('bunyan');

// disable default bunyan stream to stdout
logger.level(bunyan.FATAL + 1);

function modifiedStream() {
  return {
    write: entry => {
      const logObject = JSON.parse(entry)
      // new logging elements
      logObject['@timestamp'] = logObject.time;
      logObject['log.level'] = bunyan.nameFromLevel[logObject.level];

      // removing logging elements not required
      delete logObject.level;
      delete logObject.v;

      process.stdout.write(JSON.stringify(logObject) + '\n');
      const fs = require('fs');
      const loggingDir = './logs';
      if (!fs.existsSync(loggingDir)) {
        fs.mkdirSync(loggingDir);
      }
      fs.appendFile(loggingDir + '/lev-api.log', JSON.stringify(logObject) + '\n', err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
    }
  };
};

logger.addStream({
  level: 'debug',
  stream: modifiedStream(),
});
