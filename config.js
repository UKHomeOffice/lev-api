'use strict';

const fs = require('fs');
const packageJson = require('./package.json');

const defaultsFalse = v => String(v || '').match(/(true|yes|on)/i) !== null;
const defaultsTrue = v => String(v || '').match(/(false|no|off)/i) === null;

let dbPassword;

try {
  dbPassword = fs.readFileSync('/app/config/dbpassword.txt', 'utf8', (err, data) => data);
  } catch(err) {}

module.exports = {
  env: process.env.NODE_ENV,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: process.env.LISTEN_PORT || 8080
  },
  maxRecords: 25,
  mock: defaultsFalse(process.env.MOCK),
  name: packageJson.name,
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    name: process.env.POSTGRES_DB,
    pass: process.env.POSTGRES_PASSWORD || dbPassword,
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    region: process.env.AWS_REGION,
    ssl: defaultsTrue(process.env.POSTGRES_SSL)
  }
};
