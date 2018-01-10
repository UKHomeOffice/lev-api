'use strict';

const errors = require('restify-errors');
const moment = require('moment');
const promiseRejectionHandler = require('../../../../lib/promise-rejection-handler');
const model = require('../../../../model/lev_api_audit');

const dateFormat = 'YYYY-MM-DD';

module.exports = {
    search: (req, res, next) => {
        const user = req.query.user;
        const from = moment(req.query.from || '1970-01-01', dateFormat);
        const to = req.query.to ? moment(req.query.to, dateFormat) : moment();

        if (!from.isValid()) {
            next(new errors.BadRequestError(`Invalid 'from' date: '${req.query.from}', please use ISO format - e.g. from=2000-01-31`));
        } else if (!to.isValid()) {
            next(new errors.BadRequestError(`Invalid 'to' date: '${req.query.to}', please use ISO format - e.g. to=2000-01-31`));
        } else {
            model.search(from, to, user)
                .then(r => {
                    res.send(r);
                    next();
                })
                .catch(promiseRejectionHandler(next));
        }
    }
};
