'use strict';

const errors = require('restify-errors');
const moment = require('moment');
const promiseRejectionHandler = require('../../../../lib/promise-rejection-handler');
const audit = require('../../../../model/lev_audit');
const model = require('../../../../model/birth_registration_v0');
const StatsD = require('hot-shots');
const client = new StatsD();

const parseDate = d =>
      d && moment(d, 'YYYY-MM-DD');

const name2regex = n => n
      .trim()
      .replace(/[\s-]+/, '[\\s-]+');

const censorRecord = r =>
      !r.status.blockedRegistration ? r : {
        location: {},
        subjects: {
          child: {
            originalName: {},
            name: {}
          },
          father: {
            name: {}
          },
          mother: {
            name: {}
          },
          informant: {
            name: {}
          }
        },
        systemNumber: r.systemNumber,
        id: r.id,
        status: {
          blockedRegistration: true
        },
        previousRegistration: {}
      };

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
            client.increment('lev.api.birth');
            res.send(censorRecord(r));
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
    } else if (!req.query.lastname) {
      next(new errors.BadRequestError('Must provide the lastname parameter'));
    } else if (!req.query.dateofbirth) {
      next(new errors.BadRequestError('Must provide date of birth parameter - e.g. dateofbirth=2000-01-31'));
    } else if (!req.query.forenames && !req.query.forename1) {
      next(new errors.BadRequestError('Must provide either the forenames or forename1 parameter'));
    } else if (req.query.forenames && req.query.forename1) {
      next(new errors.BadRequestError('Must only provide forenames, or forename1 (plus optionally forename2, 3, and 4)'));
    } else {
      const surname = new RegExp('^' + name2regex(req.query.lastname) + '$', 'i');
      const forenames = new RegExp('^' + name2regex(req.query.forenames || [req.query.forename1, req.query.forenames2, req.query.forename3, req.query.forename4].join(' ')) + '(\\s|$)', 'i');
      const dob = parseDate(req.query.dateofbirth);

      if (!dob.isValid()) {
        next(new errors.BadRequestError(`Invalid date of birth: '${req.query.dateofbirth}', please use ISO format - e.g. dateofbirth=2000-01-31`));
      } else {
        audit.create(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url)
          .then(() => model.search({
            dateOfBirth: dob && dob.format('YYYY-MM-DD'),
            surname: surname,
            forenames: forenames
          }))
          .then(r => {
            client.increment('lev.api.birth.search');
            res.send(r.map(censorRecord));
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
