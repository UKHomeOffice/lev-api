'use strict';

const documentStore = require('../lib/document-store');

const model = documentStore('lev.marriage_registration_v1', [
  'date_of_marriage',
  'bride_forenames',
  'bride_surname',
  'groom_forenames',
  'groom_surname'
]);

module.exports = {
  read: model.read,
  search: terms => model.search({
    dateOfMarriage: terms.dateOfMarriage,
    brideForenames: terms.forenames,
    brideSurname: terms.surname
  }).then(r => model.search({
    dateOfMarriage: terms.dateOfMarriage,
    groomForenames: terms.forenames,
    groomSurname: terms.surname
  }).then(r2 => r.concat(r2)))
};
