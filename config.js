'use strict';

const packageJson = require('./package.json');

module.exports = {
    name: packageJson.name,
    env: process.env.NODE_ENV,
    httpd: {
        host: process.env.LISTEN_HOST || '0.0.0.0',
        port: process.env.LISTEN_PORT || 8080
    },
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        name: process.env.POSTGRES_DB,
        pass: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER
    }
};
