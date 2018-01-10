'use strict';

const config = require('../../../config');

require('functional-augments');

const key2Field = v =>
      v.replace(/([A-Z]+)/g, '_$1').toLowerCase();

module.exports = (tableName, fields, idField) => {
  const reduce2Store = (acc, cur) => acc.set(cur[idField], cur);
  const store = (require(`../../../mock/${tableName}.json`)).reduce(reduce2Store, new Map());

  return {
    read: id => new Promise(resolve => resolve(store.get(id))),
    search: terms => {
      const filteredTerms = terms.filter(v => v !== undefined);

      const reducer = obj => (acc, cur, key) => {
        let test = false;

        const field = key2Field(key);

        if (cur instanceof RegExp) {
          test = obj[field] && obj[field].match && obj[field].match(cur);
        } else if (cur instanceof Date || cur && cur.isValid && cur.isValid()) {
          test = obj[field] === cur.toISOString();
        } else if (cur instanceof Object) {
          test = true;
          if(cur['>'] !== undefined) {
            test = test && obj[field] > cur['>'];
          }
          if(cur['<'] !== undefined) {
            test = test && obj[field] < cur['<'];
          }
          if(cur['>='] !== undefined) {
            test = test && obj[field] >= cur['>='];
          }
          if(cur['<='] !== undefined) {
            test = test && obj[field] <= cur['<='];
          }
        } else {
          test = obj[field] === cur;
        }

        return acc && test;
      };
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
