'use strict';

const config = require('../../config.js');

const pgpInit = {};

const pgp = require('pg-promise')(pgpInit);
const pgm = require('pg-monitor');

const getToken = require('./generateToken.js');

const connection = {
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.name,
  user: config.postgres.user,
  password: config.postgres.pass || (async () => await getToken()),
  ssl: config.postgres.ssl
};

const db = config.mock ? undefined : pgp(connection);

if (!config.mock) {
  pgp.pg.types.setTypeParser(1082, val => val);

  if (config.env !== 'production' && !pgm.isAttached()) {
    pgm.attach(pgpInit);
  }
}

module.exports = {
  any: (q, v) => db.any(q, v),
  none: (q, v) => db.none(q, v),
  one: (q, v, cb) => db.one(q, v, cb),
  oneOrNone: (q, v, cb) => db.oneOrNone(q, v, cb)
};
