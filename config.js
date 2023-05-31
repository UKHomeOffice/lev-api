'use strict';

const packageJson = require('./package.json');
const fs = require('fs');

const defaultsFalse = v => String(v || '').match(/(true|yes|on)/i) !== null;
const defaultsTrue = v => String(v || '').match(/(false|no|off)/i) === null;

const dbPassword = fs.readFile('/app/config/dbpassword.txt', 'utf8', (err, data) => {
  if (err) { console.log('file not found') };
  return data;
});

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
    ssl: defaultsTrue(process.env.POSTGRES_SSL)
  }
};
