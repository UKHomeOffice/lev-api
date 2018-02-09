'use strict';

require('functional-augments-object');
const config = require('../../config.js');

const pgpInit = {};

const pgp = require('pg-promise')(pgpInit);
const pgm = require('pg-monitor');

const connection = {
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.name,
  user: config.postgres.user,
  password: config.postgres.pass
};

const db = pgp(connection);

pgp.pg.types.setTypeParser(1082, val => val);

pgm.attach(pgpInit);

const key2Field = v =>
      v.replace(/([A-Z]+)/g, '_$1').toLowerCase();

const term2Sql = t => {
  const k = t[0];
  const v = t[1];
  const field = key2Field(k);

  if (v instanceof RegExp) {
    return 'anglicise(' + field + ')' + ' ~ anglicise(${' + k + '})';
  } else {
    return field + ' = ${' + k + '}';
  }
};

const term2Param = v => {
  if (v instanceof RegExp) {
    return v.source;
  } else if (v instanceof Date || v && v.isValid && v.isValid()) {
    return v.toISOString();
  } else {
    return v;
  }
}

module.exports = {
  any: (q, v) => db.any(q, v),
  none: (q, v) => db.none(q, v),
  one: (q, v, cb) => db.one(q, v, cb),
  oneOrNone: (q, v, cb) => db.oneOrNone(q, v, cb),
  processTerms: terms => {
    if (terms === undefined) {
      throw new ReferenceError('Missing argument, f');
    } else if (!(terms instanceof Object)) {
      throw new TypeError('Argument is not an object');
    }

    const filteredTerms = terms.filter(v => v !== undefined);

    return {
      sql: 'WHERE ' + Object.entries(filteredTerms).map(term2Sql).join('\n  AND '),
      params: filteredTerms.map(term2Param)
    };
  }
};
