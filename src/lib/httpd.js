'use strict';

const config = require('../../config.js');
const restify = require('lev-restify');
const bunyan = require('bunyan');
const formatStream = require('./bunyan-stream-formatter.js');

const httpd = restify.createServer({
  name: config.name
});

// disable default bunyan stream to stdout
httpd.log.level(bunyan.FATAL + 1);

httpd.log.addStream({
  level: 'debug',
  stream: {
    write: entry => {
      const logObject = formatStream(JSON.parse(entry));
      process.stdout.write(JSON.stringify(logObject) + '\n');
    }
  }
});

httpd.log.addStream({
  level: 'debug',
  stream: {
    write: entry => {
      const logObject = formatStream(JSON.parse(entry));
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
