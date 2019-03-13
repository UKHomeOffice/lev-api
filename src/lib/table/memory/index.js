'use strict';

const config = require('../../../../config');
const { key2Field } = require('../helpers');
const { applyTest } = require('./helpers');

require('functional-augments');

module.exports = (tableName, fields, idField) => {
  const reduce2Store = (acc, cur) => acc.set(cur[idField], cur);
  const store = (require(`../../../../mock/${tableName}.json`)).reduce(reduce2Store, new Map());

  return {
    read: id => new Promise(resolve => resolve(store.get(id))),
    search: terms => {
      const filteredTerms = terms.filter(v => v !== undefined);

      const reducer = obj => (acc, cur, key) => acc && applyTest(obj[key2Field(key)], cur);
      const matches = e => filteredTerms.reduce(reducer(e), true);

      return new Promise(resolve => resolve(
        store
          .filter(matches)
          .reduce((acc, cur) => {
            acc.push(cur);
            return acc;
          }, [])
          .slice(0, config.maxRecords)
      ));
    }
  };
};
