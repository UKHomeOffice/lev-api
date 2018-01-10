'use strict';

const db = require('../lib/db');
const documentStore = require('../lib/document-store');

const model = documentStore('marriage_registration_v1', [
  'bride_forenames',
  'bride_surname',
  'groom_forenames',
  'groom_surname'
]);

module.exports = {
  read: model.read,
  search: terms => model.search({
    brideForenames: terms.forenames,
    brideSurname: terms.surname
  }).then(r => model.search({
    groomForenames: terms.forenames,
    groomSurname: terms.surname
  }).then(r2 => r.concat(r2)))
};
