'use strict';
const config = require('../../config.js');
const restify = require('lev-restify');
const logger = require('./logger');
const httpd = restify.createServer({
  name: config.name,
  log: logger
});

module.exports = httpd;
