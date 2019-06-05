'use strict';

const errors = require('lev-restify').errors;
const promiseRejectionHandler = require('../lib/promise-rejection-handler.js');
const readiness = require('../lib/readiness');

module.exports = (req, res, next) => {
  readiness()
    .then(r => {
      res.send('OK');
    })
    .catch(promiseRejectionHandler(next));
};
