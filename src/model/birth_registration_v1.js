'use strict';

const db = require('../lib/db');
const documentStore = require('../lib/document-store');

module.exports = documentStore('birth_registration_v1', [
  'forenames',
  'surname',
  'date_of_birth'
]);
