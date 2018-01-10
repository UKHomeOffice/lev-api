'use strict';

const log = require('../lib/logger');

module.exports = next => err => {
    log.error(err);
    next(err);
};
