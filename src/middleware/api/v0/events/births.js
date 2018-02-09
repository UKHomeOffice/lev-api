'use strict';

const errors = require('restify-errors');
const moment = require('moment');
const promiseRejectionHandler = require('../../../../lib/promise-rejection-handler');
const audit = require('../../../../model/lev_audit');
const model = require('../../../../model/lev');

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
      const id = req.params.id;

      audit.create(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url)
        .then(() => model.read(id))
        .then(r => {
          if (r) {
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
      const lastname = req.query.lastname;
      const forenames = req.query.forenames ? req.query.forenames.trim().replace(/\s+/g, ' ').split(' ')
            : [];
      const forename1 = req.query.forename1 || forenames[0];
      const forename2 = req.query.forename2 || forenames[1];
      const forename3 = req.query.forename3 || forenames[2];
      const forename4 = req.query.forename4 || forenames.splice(3).join(' ') || undefined;
      const dob = moment(req.query.dateofbirth, 'YYYY-MM-DD');
      const fieldLength = 128;
      const isTooLong = s => String(s || '').length > fieldLength;

      if (!dob.isValid()) {
        next(new errors.BadRequestError(`Invalid date of birth: '${req.query.dateofbirth}', please use ISO format - e.g. dateofbirth=2000-01-31`));
      } else if (isTooLong(lastname.length)) {
        next(new errors.BadRequestError(`Lastname field must contain ${fieldLength} characters or less`));
      } else if ([req.query.forenames, req.query.forename1, req.query.forename2, req.query.forename3, req.query.forename4].filter(isTooLong).length > 0) {
        next(new errors.BadRequestError(`Forename fields must contain ${fieldLength} characters or less`));
      } else {
        audit.create(req.headers['x-auth-username'], req.headers['x-auth-aud'], req.url)
          .then(() => model.search(dob, lastname, forename1, forename2, forename3, forename4))
          .then(r => {
            res.send(r.map(censorRecord));
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
