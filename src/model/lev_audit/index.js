'use strict';

const config = require('../../../config');

const store = config.mock ? require('./memory') : require('./postgres');

module.exports = {
  create: (username, client, uri, groups, operation, dataset) => store.create(username, client, uri, groups, operation, dataset),
  search: (start, finish, username) => store.search(start, finish, username)
};
