'use strict';

const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');

const logger = winston.createLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug'
    }),
    //new winston.transports.Console(),
    new winston.transports.File({
      //path to log file
      filename: 'logs/lev-api.json',
      level: 'debug'
    })
  ]
})

//module.exports = require('./httpd').log;
module.exports = logger;
