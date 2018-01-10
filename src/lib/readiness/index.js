'use strict';

const config = require('../../../config');

module.exports = config.mock ? () => new Promise(resolve => resolve()) : require('./postgres');
