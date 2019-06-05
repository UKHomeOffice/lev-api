'use strict';

const errors = require('lev-restify').errors;
const moment = require('moment');
const promiseRejectionHandler = require('../../../../lib/promise-rejection-handler');
const model = require('../../../../model/lev_audit');

const dateFormat = 'YYYY-MM-DD';

module.exports = {
  search: (req, res, next) => {
    const user = req.query.user;
    const from = moment(req.query.from || '1970-01-01', dateFormat);
    const to = req.query.to ? moment(req.query.to, dateFormat) : moment();
    const group = req.query.group;
    const operation = req.query.operation;
    const dataset = req.query.dataset;

    if (!from.isValid()) {
      next(new errors.BadRequestError(`Invalid 'from' date: '${req.query.from}', please use ISO format - e.g. from=2000-01-31`));
    } else if (!to.isValid()) {
      next(new errors.BadRequestError(`Invalid 'to' date: '${req.query.to}', please use ISO format - e.g. to=2000-01-31`));
    } else {
      model.search(from.format(dateFormat), to.format(dateFormat), user, group, operation, dataset)
        .then(r => {
          res.send(r);
          next();
        })
        .catch(promiseRejectionHandler(next));
    }
  }
};
