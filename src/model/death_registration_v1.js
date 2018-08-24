'use strict';

const documentStore = require('../lib/document-store');

const model = documentStore('death_registration_v1', [
  'forenames',
  'surname',
  'date_of_birth',
  'date_of_death'
]);

module.exports = {
  read: model.read,
  search: terms => model.search({
    forenames: terms.forenames,
    surname: terms.surname,
    dateOfBirth: terms.date
  }).then(r => model.search({
    forenames: terms.forenames,
    surname: terms.surname,
    dateOfDeath: terms.date
  }).then(r2 => r.concat(r2)))
};
