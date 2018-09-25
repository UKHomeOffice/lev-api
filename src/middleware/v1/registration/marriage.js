'use strict';

const errors = require('restify-errors');
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_audit');
const model = require('../../../model/marriage_registration_v1');
const StatsD = require('hot-shots');
const client = new StatsD();

const parseDate = d =>
      d && moment(d, 'YYYY-MM-DD');

const name2regex = n => n
      .trim()
      .replace(/[\s-]+/, '[\\s-]+');

module.exports = {
  read: (req, res, next) => {
    if (!req.headers['x-auth-aud'] || !req.headers['x-auth-username']) {
      next(new errors.UnauthorizedError());
    } else if (!req.params.id) {
      next(new errors.BadRequestError('Must provide an ID'));
    } else if (!req.params.id.match(/^\d+$/)) {
      next(new errors.BadRequestError('ID must be an integer'));
    } else {
      const id = Number(req.params.id);

      audit.create(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url)
        .then(() => model.read(id))
        .then(r => {
          if (r) {
            client.increment('lev.api.marriage');
            client.increment(`lev.api.${req.headers['x-auth-aud']}.marriage`);
            res.send(r);
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
    } else if (!req.query.dateOfMarriage) {
      next(new errors.BadRequestError('Must provide the dateOfMarriage parameter'));
    } else {
      const surname = new RegExp('^' + name2regex(req.query.surname) + '$', 'i');
      const forenames = new RegExp('^' + name2regex(req.query.forenames) + '(\\s|$)', 'i');
      const dom = parseDate(req.query.dateOfMarriage);

      if (dom && !dom.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfMarriage: '${req.query.dateOfMarriage}', please use ISO format - e.g. 2000-01-31`));
      } else {
        audit.create(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url)
          .then(() => model.search({
            dateOfMarriage: dom.format('YYYY-MM-DD'),
            surname: surname,
            forenames: forenames
          }))
          .then(r => {
            client.increment('lev.api.marriage.search');
            client.increment(`lev.api.${req.headers['x-auth-aud']}.marriage.search`);
            res.send(r);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
