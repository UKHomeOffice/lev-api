'use strict';

const Bunyan = require('bunyan');
const config = require('../../config.js');

module.exports = new Bunyan({
  name: config.name
});
