'use strict';

const errors = require('restify-errors');
const moment = require('moment');
const promiseRejectionHandler = require('../../../lib/promise-rejection-handler');
const audit = require('../../../model/lev_api_audit');
const model = require('../../../model/death_registration_v1');

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

      audit.createRead(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url, id)
        .then(() => model.read(id))
        .then(r => {
          if (r) {
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
    } else if (!req.query.dateOfBirth && !req.query.dateOfDeath) {
      next(new errors.BadRequestError('Must provide either the dateOfBirth or dateOfDeath parameters'));
    } else {
      const surname = new RegExp('^' + name2regex(req.query.surname) + '$');
      const forenames = new RegExp('^' + name2regex(req.query.forenames) + '(\\s|$)');
      const dob = parseDate(req.query.dateOfBirth);
      const dod = parseDate(req.query.dateOfDeath);

      if (dob && !dob.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfBirth: '${req.query.dateOfBirth}', please use ISO format - e.g. 2000-01-31`));
      } else if (dod && !dod.isValid()) {
        next(new errors.BadRequestError(`Invalid parameter, dateOfDeath: '${req.query.dateOfDeath}', please use ISO format - e.g. 2000-01-31`));
      } else {
        model.search({
          dateOfBirth: dob && dob.format('YYYY-MM-DD'),
          dateOfDeath: dod && dod.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        })
          .then(r => {
            res.send(r);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
