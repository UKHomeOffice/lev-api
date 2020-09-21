'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_audit');
const model = require('../../../model/death_registration_v1');
const metrics = require('../../../lib/metrics');
const reqInfo = require('lev-restify').reqInfo;
const params = require('../../../lib/params');

module.exports = {
  redactDeath: (death, roles) => {
    return roles.fullDetails ? death :
      { date: death.date, forenames: death.forenames, surname: death.surname }
  },
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

      audit.create(ri.username, ri.client, req.url, ri.groups, 'lookup', 'death')
        .then(() => model.read(id))
        .then(r => {
          if (r) {
            res.send(r);
            metrics.lookup('death', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), id);
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
    } else if (!req.query.date) {
      next(new errors.BadRequestError('Must provide the date parameter'));
    } else {
      const startTime = moment();
      const surname = new RegExp('^' + params.name2regex(req.query.surname) + '$', 'i');
      const forenames = new RegExp('^' + params.name2regex(req.query.forenames) + '(\\s|$)', 'i');
      const date = params.parseDate(req.query.date);

      if (date && !date.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, date: '${req.query.date}', please use ISO format - e.g. 2000-01-31`));
      } else {
        const query = {
          date: date && date.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        };

        audit.create(ri.username, ri.client, req.url, ri.groups, 'search', 'death')
          .then(() => model.search(query))
          .then(r => {
            res.send(redactDeath(r, ri.roles));
            metrics.search('death', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), req.query);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
