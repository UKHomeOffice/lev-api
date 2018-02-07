'use strict';

const db = require('../lib/db');
const documentStore = require('../lib/document-store');

const model = documentStore('marriage_registration_v1', [
  'bride_forenames',
  'bride_surname',
  'bride_date_of_birth',
  'groom_forenames',
  'groom_surname',
  'groom_date_of_birth'
]);

module.exports = {
  read: model.read,
  search: terms => model.search({
    brideForenames: terms.forenames,
    brideSurname: terms.surname,
    brideDateOfBirth: terms.dateOfBirth
  }).then(r => model.search({
    groomForenames: terms.forenames,
    groomSurname: terms.surname,
    groomDateOfBirth: terms.dateOfBirth
  }).then(r2 => r.concat(r2)))
};
