'use strict';

const errors = require('restify-errors');
const promiseRejectionHandler = require('../lib/promise-rejection-handler');
const readiness = require('../lib/readiness');

module.exports = {
  liveness: (req, res, next) => {
    res.send('OK');
  },
  readiness: (req, res, next) => {
    readiness()
      .then(r => {
        res.send('OK');
      })
      .catch(promiseRejectionHandler(next));
  }
};
