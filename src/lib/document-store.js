'use strict';

const table = require('./table');

require('functional-augments');

const cleanupInner = e => {
  if(e === null) {
    return undefined;
  } else if (e instanceof Object) {
    return e.map(cleanupInner);
  } else {
    return e;
  }
};

module.exports = (tableName, searchFields, dataField, idField) => {
  if (tableName === undefined) {
    throw ReferenceError('First argument, tableName, was not defined');
  } else if (typeof tableName !== 'string') {
    throw TypeError('First argument, tableName, was not a string');
  }

  if (searchFields === undefined) {
    searchFields = [];
  } else if (!(searchFields instanceof Array)) {
    throw TypeError('Second argument, searchFields, was not an array');
  }

  if (dataField === undefined) {
    dataField = 'data';
  } else if (typeof dataField !== 'string') {
    throw TypeError('Third argument, dataField, was not a string');
  }

  if (idField === undefined) {
    idField = 'id';
  } else if (typeof idField !== 'string') {
    throw TypeError('Forth argument, idField, was not a string');
  }

  const cleanup = r => r && r[dataField].map(cleanupInner);

  const dao = table(tableName, [dataField], idField);

  return {
    read: id => {
      if (id === undefined) {
        throw ReferenceError('First argument, id, was not defined');
      } else if (!Number.isInteger(id)) {
        throw TypeError('First argument, id, was not an integer');
      }

      return dao.read(id).then(r => cleanup(r));
    },
    search: terms => {
      if (terms === undefined) {
        throw ReferenceError('First argument, terms, was not defined');
      } else if (!(terms instanceof Object)) {
        throw TypeError('First argument, terms, was not an object');
      }

      return dao.search(terms).then(r => r.map(cleanup));
    }
  };
};
