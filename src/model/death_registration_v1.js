'use strict';

const db = require('../lib/db');
const documentStore = require('../lib/document-store');

module.exports = documentStore('death_registration_v1', [
  'forenames',
  'surname',
  'date_of_birth',
  'date_of_death'
]);
