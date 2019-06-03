'use strict';

const postgres = require('../../lib/postgres');

const reduce2Object = (acc, e) => {
    acc[e.username] = acc[e.username] || {};
    acc[e.username][e.date] = e.count;
    return acc;
};

module.exports = {
  create: (username, client, uri, groups, operation, dataset) =>
    postgres.none('INSERT INTO lev_audit (date_time, username, client, uri, groups, operation, dataset) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6)', [username, client, uri, groups, operation, dataset]),
  search: (start, finish, username, group, operation, dataset) => {
    const usernameFragment = username ? ' AND username LIKE \'%$3#%\'' : '';
    const groupFragment = group ? ' AND groups @> $4' : '';
    const operationFragment = operation ? ' AND operation = $5' : '';
    const datasetFragment = dataset ? ' AND dataset = $6' : '';

    return postgres.any('SELECT regexp_replace(username, \'.gsi.gov.uk$\', \'.gov.uk\') as username, date_time::date AS date, count(*) AS count FROM lev_audit WHERE date_time::date >= $1 AND date_time::date <= $2' + usernameFragment + groupFragment + operationFragment + datasetFragment + ' GROUP BY 1, date', [start, finish, username, [group], operation, dataset])
      .then(r => r.reduce(reduce2Object, {}));
  }
};
