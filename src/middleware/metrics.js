'use strict';

const metrics = require('../lib/metrics');
const register = metrics.prometheus.register;

module.exports = (req, res, next) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
};
