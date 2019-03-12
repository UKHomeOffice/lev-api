'use strict';

const dao = require('../../lib/table')('lev_audit', ['id', 'date_time', 'username', 'client', 'uri', 'groups', 'operation', 'dataset']);
const moment = require('moment');

require('functional-augments');

const groupBy = k => arr => arr.reduce((acc, cur) => {
  acc[cur[k]] = acc[cur[k]] || [];
  acc[cur[k]].push(cur);
  return acc;
}, {});

const count = r => {
  if (!r) {
    return r;
  }

  const proc = r.map(e => Object.assign(e, {date: new moment(e['date_time']).format('YYYY-MM-DD')}));

  return groupBy('username')(proc)
    .map(groupBy('date'))
    .map(e1 => e1.map(e2 => e2.length));
};

module.exports = {
  create: (username, client, uri, groups, operation, dataset) => new Promise(resolve => resolve(undefined)),
  search: (start, finish, username) => dao.search({
    username: username,
    dateTime: {
      '>=': start,
      '<=': finish
    }
  }).then(count)
};
