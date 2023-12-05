'use strict';

const postgres = require('../postgres');

const tableDependencies = [
  'lev.birth_registration_v0',
  'lev.birth_registration_v1',
  'lev.death_registration_v1',
  'lev.marriage_registration_v1',
  'lev.partnership_registration_v1'
];
const readinessQuery = 'SELECT ' + tableDependencies.map(s => `'${s}'::REGCLASS`).join(', ');

module.exports = () => postgres.one(readinessQuery);
