'use strict';

const documentStore = require('../lib/document-store');

module.exports = documentStore('lev.birth_registration_v0', [
  'forenames',
  'surname',
  'date_of_birth'
]);
