'use strict';

module.exports = (req) => ({
  username: req.headers['x-auth-username'],
  client: req.headers['x-auth-aud'],
  groups: req.headers['x-auth-groups'] && String(req.headers['x-auth-groups']).split(',') || []
});
