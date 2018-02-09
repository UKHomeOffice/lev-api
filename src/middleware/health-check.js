'use strict';

const errors = require('restify-errors');
const promiseRejectionHandler = require('../lib/promise-rejection-handler');
const db = require('../lib/db');

module.exports = {
  liveness: (req, res, next) => {
    res.send({});
  },
  readiness: (req, res, next) => {
    db.one('SELECT 1;')
      .then(r => {
        res.send({});
      })
      .catch(promiseRejectionHandler(next));
  }
};
