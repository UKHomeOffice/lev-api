'use strict';

const errors = require('restify-errors');
const promiseRejectionHandler = require('../lib/promise-rejection-handler');
const db = require('../lib/db');

const tableDependencies = [
  'birth_registration_v1',
  'death_registration_v1',
  'marriage_registration_v1'
];
const readinessQuery = 'SELECT ' + tableDependencies.map(s => `'${s}'::REGCLASS`).join(', ');

module.exports = {
  liveness: (req, res, next) => {
    res.send({});
  },
  readiness: (req, res, next) => {
    db.one(readinessQuery)
      .then(r => {
        res.send(r);
      })
      .catch(promiseRejectionHandler(next));
  }
};
