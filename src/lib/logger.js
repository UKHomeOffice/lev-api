'use strict';

const logger = require('../lib/httpd').log;
const bunyan = require('bunyan');

function modifiedStream() {
  return {
    write: entry => {
      var logObject = JSON.parse(entry)
      logObject['@timestamp'] = logObject.time;
      // delete logObject.time; //TODO - change format

      logObject['message'] = logObject.msg;
      delete logObject.msg;

      logObject['log.level'] = bunyan.nameFromLevel[logObject.level];
      delete logObject.level;

      delete logObject.v;

      // conforming to Elastic Common Schema https://github.com/elastic/ecs/blob/main/CHANGELOG.md#160
      logObject['ecs'] = { 'version' : '1.6.0' };
      

      process.stdout.write(JSON.stringify(logObject) + '\n');
      const fs = require('fs');
      fs.appendFile('./logs/lev-api.log', JSON.stringify(logObject) + '\n', err => {
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
