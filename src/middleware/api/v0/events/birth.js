'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../../lib/promise-rejection-handler');
const audit = require('../../../../model/lev_audit');
const model = require('../../../../model/birth_registration_v0');
const metrics = require('../../../../lib/metrics');
const reqInfo = require('lev-restify').reqInfo;
const params = require('../../../../lib/params');
const { censorBirthV0 } = require('../../../../lib/censorRecords');
//
// const censorRecord = r =>
//       !r.status.blockedRegistration ? r : {
//         location: {},
//         subjects: {
//           child: {
//             originalName: {},
//             name: {}
//           },
//           father: {
//             name: {}
//           },
//           mother: {
//             name: {}
//           },
//           informant: {
//             name: {}
//           }
//         },
//         systemNumber: r.systemNumber,
//         id: r.id,
//         status: {
//           blockedRegistration: true
//         },
//         previousRegistration: {}
//       };

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
            res.send(censorBirthV0(r, ri.roles));
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
    } else if (!req.query.lastname) {
      next(new errors.BadRequestError('Must provide the lastname parameter'));
    } else if (!req.query.dateofbirth) {
      next(new errors.BadRequestError('Must provide date of birth parameter - e.g. dateofbirth=2000-01-31'));
    } else if (!req.query.forenames && !req.query.forename1) {
      next(new errors.BadRequestError('Must provide either the forenames or forename1 parameter'));
    } else if (req.query.forenames && req.query.forename1) {
      next(new errors.BadRequestError('Must only provide forenames, or forename1 (plus optionally forename2, 3, and 4)'));
    } else {
      const startTime = moment();
      const surname = new RegExp('^' + params.name2regex(req.query.lastname) + '$', 'i');
      const forenames = new RegExp('^' + params.name2regex(req.query.forenames || [req.query.forename1, req.query.forenames2, req.query.forename3, req.query.forename4].join(' ')) + '(\\s|$)', 'i');
      const dob = params.parseDate(req.query.dateofbirth);

      if (!dob.isValid()) {
        next(new errors.BadRequestError(`Invalid date of birth: '${req.query.dateofbirth}', please use ISO format - e.g. dateofbirth=2000-01-31`));
      } else {
        const query = {
          dateOfBirth: dob && dob.format('YYYY-MM-DD'),
          surname: surname,
          forenames: forenames
        };

        audit.create(ri.username, ri.client, req.url, ri.groups, 'search', 'birth')
          .then(() => model.search(query))
          .then(r => {
            res.send(r.map((e) => censorBirthV0(e, ri.roles)));
            metrics.search('birth', ri.username, ri.client, ri.groups, ri.roles, startTime, moment(), req.query);
            next();
          })
          .catch(promiseRejectionHandler(next));
      }
    }
  }
};
