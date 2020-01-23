'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_audit');
const model = require('../../../model/marriage_registration_v1');
const metrics = require('../../../lib/metrics');
const reqInfo = require('lev-restify').reqInfo;
const params = require('../../../lib/params');

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

      audit.create(ri.username, ri.client, req.url, ri.groups, 'lookup', 'marriage')
        .then(() => model.read(id))
        .then(r => {
          if (r) {
            res.send(r);
            metrics.lookup('marriage', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), id);
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
    } else if (!req.query.dateOfMarriage) {
      next(new errors.BadRequestError('Must provide the dateOfMarriage parameter'));
    } else {
      const startTime = moment();
      const surname = new RegExp('^' + params.name2regex(req.query.surname) + '$', 'i');
      const forenames = new RegExp('^' + params.name2regex(req.query.forenames) + '(\\s|$)', 'i');
      const dom = params.parseDate(req.query.dateOfMarriage);

      if (dom && !dom.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfMarriage: '${req.query.dateOfMarriage}', please use ISO format - e.g. 2000-01-31`));
      } else {
        const query = {
          dateOfMarriage: dom.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        };

        audit.create(ri.username, ri.client, req.url, ri.groups, 'search', 'marriage')
          .then(() => model.search(query))
          .then(r => {
            res.send(r);
            metrics.search('marriage', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), req.query);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
