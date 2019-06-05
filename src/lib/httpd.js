'use strict';

const config = require('../../config.js');
const restify = require('lev-restify');
const httpd = restify.createServer({
  name: config.name
});

module.exports = httpd;
