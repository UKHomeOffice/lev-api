'use strict';

const documentStore = require('../lib/document-store');

module.exports = documentStore('lev.birth_registration_v1', [
  'forenames',
  'surname',
  'date_of_birth'
]);
