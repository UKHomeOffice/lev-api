'use strict';

const documentStore = require('../lib/document-store');

const model = documentStore('partnership_registration_v1', [
  'date_of_partnership',
  'partner1_forenames',
  'partner1_surname',
  'partner2_forenames',
  'partner2_surname'
]);

module.exports = {
  read: model.read,
  search: terms => model.search({
    dateOfPartnership: terms.dateOfPartnership,
    partner1Forenames: terms.forenames,
    partner1Surname: terms.surname
  }).then(r => model.search({
    dateOfPartnership: terms.dateOfPartnership,
    partner2Forenames: terms.forenames,
    partner2Surname: terms.surname
  }).then(r2 => r.concat(r2)))
};
