'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_audit');
const model = require('../../../model/birth_registration_v1');
const metrics = require('../../../lib/metrics');
const reqInfo = require('lev-restify').reqInfo;
const params = require('../../../lib/params');
const { censorBirthV1 } = require('../../../lib/censorRecords');

module.exports = {
  read: (req, res, next) => {
    const ri = reqInfo(req);

    if (!ri.client || !ri.username) {
      next(new errors.UnauthorizedError());
    } else if (!req.params.id) {
      next(new errors.BadRequestError('Must provide an ID'));
    } else if (!req.params.id.match(/^\d+$/)) {
      next(new errors.BadRequestError('ID must be an integer'));
    } else {
      const startTime = moment();
      const id = Number(req.params.id);

      audit.create(ri.username, ri.client, req.url, ri.groups, 'lookup', 'birth')
        .then(() => model.read(id))
        .then(r => {
          if (r) {
            res.send(censorBirthV1(r, ri.roles));
            metrics.lookup('birth', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), id);
            next();
          } else {
            next(new errors.NotFoundError());
          }
        })
        .catch(promiseRejectionHandler(next));
    }
  },
  search: (req, res, next) => {
    const ri = reqInfo(req);

    if (!ri.client || !ri.username) {
      next(new errors.UnauthorizedError());
    } else if (!req.query.surname) {
      next(new errors.BadRequestError('Must provide the surname parameter'));
    } else if (!req.query.forenames) {
      next(new errors.BadRequestError('Must provide the forenames parameter'));
    } else if (!req.query.dateOfBirth) {
      next(new errors.BadRequestError('Must provide the dateOfBirth parameter'));
    } else {
      const startTime = moment();
      const surname = new RegExp('^' + params.name2regex(req.query.surname) + '$', 'i');
      const forenames = new RegExp('^' + params.name2regex(req.query.forenames) + '(\\s|$)', 'i');
      const dob = params.parseDate(req.query.dateOfBirth);

      if (dob && !dob.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfBirth: '${req.query.dateOfBirth}', please use ISO format - e.g. 2000-01-31`));
      } else {
        const query = {
          dateOfBirth: dob && dob.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        };

        audit.create(ri.username, ri.client, req.url, ri.groups, 'search', 'birth')
          .then(() => model.search(query))
          .then(r => {
            res.send(r.map(e => censorBirthV1(e, ri.roles)));
            metrics.search('birth', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), req.query);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
