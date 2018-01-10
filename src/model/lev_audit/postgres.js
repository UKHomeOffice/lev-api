'use strict';

const postgres = require('../../lib/postgres');

const reduce2Object = (acc, e) => {
    acc[e.username] = acc[e.username] || {};
    acc[e.username][e.date] = e.count;
    return acc;
};

module.exports = {
  create: (username, client, uri) =>
    postgres.none('INSERT INTO lev_audit (date_time, username, client, uri) VALUES (current_timestamp, $1, $2, $3)', [username, client, uri]),
  search: (start, finish, username) => {
    const usernameFragment = username ? ' AND username LIKE \'%$3#%\'' : '';

    return postgres.any('SELECT username, date_time::date AS date, count(*) AS count FROM lev_audit WHERE date_time::date >= $1 AND date_time::date <= $2' + usernameFragment + ' GROUP BY username, date', [start, finish, username])
      .then(r => r.reduce(reduce2Object, {}));
  }
};
