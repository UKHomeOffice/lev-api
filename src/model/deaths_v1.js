'use strict';

const db = require('../lib/db.js');
require('functional-augments-object');

const record2Object = r => {
  for(let k in r) {
    if(r.hasOwnProperty(k) && r[k] === null) {
      delete r[k];
    }
  }

  return {
    id: Number(r['id']),
    date: r['date'],
    registrar: {
      signature: r['registrar_signature'],
      district: r['registrar_district'],
      subdistrict: r['registrar_subdistrict'],
      administrativeArea: r['registrar_administrative_area']
    },
    deceased: {
      name: r['deceased_name'],
      forenames: r['deceased_forenames'],
      surname: r['deceased_surname'],
      dateOfDeath: r['deceased_date_of_death'],
      deathplace: r['deceased_deathplace'],
      sex: r['deceased_sex'],
      age: Number(r['deceased_age']),
      occupation: r['deceased_occupation'],
      causeOfDeath: r['deceased_cause_of_death']
    },
    previousRegistration: r['previous_registration'] && Number(r['previous_registration'])
  };
};

const selectFragment = 'SELECT id,\n'
      + '       date,\n'
      + '       registrar_signature,\n'
      + '       registrar_subdistrict,\n'
      + '       registrar_district,\n'
      + '       registrar_administrative_area,\n'
      + '       deceased_name,\n'
      + '       deceased_forenames,\n'
      + '       deceased_surname,\n'
      + '       deceased_date_of_death,\n'
      + '       deceased_deathplace,\n'
      + '       deceased_sex,\n'
      + '       deceased_age,\n'
      + '       deceased_occupation,\n'
      + '       deceased_cause_of_death,\n'
      + '       previous_registration\n'
      + 'FROM deaths_v1';

const key2Field = v =>
      v.replace(/([A-Z]+)/g, '_$1').toLowerCase();

const value2Operator = v =>
      typeof v === 'string' && v.indexOf('%') !== -1 ? 'LIKE' : '=';

const pair2Equation = (v, k) =>
      key2Field(k) + ' ' + value2Operator(v) + ' ${' + k + '}';

const terms2Where = terms =>
      'WHERE ' + terms.map(pair2Equation).join(' AND ');

const convertDates = v =>
      v && v.isValid && v.isValid() ? v.format('YYYY-MM-DD') : v;

module.exports = {
  read: id =>
    db.oneOrNone([selectFragment, 'WHERE id = $1'].join('\n'), [id], r => r && record2Object(r)),
  search: terms => {
    const processedTerms = db.processTerms(terms);
    const sql = [selectFragment, processedTerms.sql, 'LIMIT 25'].join('\n');

    return db.any(sql, processedTerms.params)
      .then(r => r.map(record2Object));
  }
};
