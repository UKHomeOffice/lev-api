'use strict';

const postgres = require('../postgres');

const tableDependencies = [
  'birth_registration_v0',
  'birth_registration_v1',
  'death_registration_v1',
  'marriage_registration_v1',
  'partnership_registration_v1'
];
const readinessQuery = 'SELECT ' + tableDependencies.map(s => `'${s}'::REGCLASS`).join(', ');

module.exports = () => postgres.one(readinessQuery);
