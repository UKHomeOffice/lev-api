'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_audit');
const model = require('../../../model/partnership_registration_v1');
const metrics = require('../../../lib/metrics');
const reqInfo = require('lev-restify').reqInfo;
const params = require('../../../lib/params');

module.exports = {
  read: (req, res, next) => {
    if (!req.headers['x-auth-aud'] || !req.headers['x-auth-username']) {
      next(new errors.UnauthorizedError());
    } else if (!req.params.id) {
      next(new errors.BadRequestError('Must provide an ID'));
    } else if (!req.params.id.match(/^\d+$/)) {
      next(new errors.BadRequestError('ID must be an integer'));
    } else {
      const ri = reqInfo(req);
      const startTime = moment();
      const id = Number(req.params.id);

      audit.create(ri.username, ri.client, req.url, ri.groups, 'lookup', 'partnership')
        .then(() => model.read(id))
        .then(r => {
          if (r) {
            res.send(r);
            metrics.lookup('partnership', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), id);
            next();
          } else {
            next(new errors.NotFoundError());
          }
        })
        .catch(promiseRejectionHandler(next));
    }
  },
  search: (req, res, next) => {
    if (!req.headers['x-auth-aud'] || !req.headers['x-auth-username']) {
      next(new errors.UnauthorizedError());
    } else if (!req.query.surname) {
      next(new errors.BadRequestError('Must provide the surname parameter'));
    } else if (!req.query.forenames) {
      next(new errors.BadRequestError('Must provide the forenames parameter'));
    } else if (!req.query.dateOfPartnership) {
      next(new errors.BadRequestError('Must provide the dateOfPartnership parameter'));
    } else {
      const ri = reqInfo(req);
      const startTime = moment();
      const surname = new RegExp('^' + params.name2regex(req.query.surname) + '$', 'i');
      const forenames = new RegExp('^' + params.name2regex(req.query.forenames) + '(\\s|$)', 'i');
      const dom = params.parseDate(req.query.dateOfPartnership);

      if (dom && !dom.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfPartnership: '${req.query.dateOfPartnership}', please use ISO format - e.g. 2000-01-31`));
      } else {
        const query = {
          dateOfPartnership: dom.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        };

        audit.create(ri.username, ri.client, req.url, ri.groups, 'search', 'partnership')
          .then(() => model.search(query))
          .then(r => {
            res.send(r);
            metrics.search('partnership', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), req.query);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
