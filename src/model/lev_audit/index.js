'use strict';

const config = require('../../../config');

const store = config.mock ? require('./memory') : require('./postgres');

module.exports = {
  create: (username, client, uri) => store.create(username, client, uri),
  search: (start, finish, username) => store.search(start, finish, username)
};
