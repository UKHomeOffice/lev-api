'use strict';

const config = require('../../config.js');
const restify = require('lev-restify');
const bunyan = require('bunyan');
const httpd = restify.createServer({
  name: config.name
});


// disable default bunyan stream to stdout
httpd.log.level(bunyan.FATAL + 1);

httpd.log.addStream({
  level: 'debug',
  stream: {
    write: entry => {
      const logObject = JSON.parse(entry);
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
      });
    }
  }
});

module.exports = httpd;
