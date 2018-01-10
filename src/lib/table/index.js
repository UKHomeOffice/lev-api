'use strict';

require('functional-augments');

const config = require('../../../config');
const store = config.mock ? require('./memory') : require('./postgres');

const cleanupInner = e => {
        if(e === null) {
          return undefined;
        } else {
          return e;
        }
      };
const cleanup = r =>
      r && r.map(cleanupInner);

const andReducer = f => (acc, cur) => acc && f(cur);
const allTrue = f => arr => arr.reduce(andReducer(f), true);

const isValidName = n => n.match(/^.+$/) !== null;
const allValidNames = allTrue(isValidName);

module.exports = (tableName, fields, idField) => {
  if (tableName === undefined) {
    throw ReferenceError('First argument, tableName, was not defined');
  } else if (typeof tableName !== 'string') {
    throw TypeError('First argument, tableName, was not a string');
  } else if (!isValidName(tableName)) {
    throw RangeError(`First argument, tableName, ${tableName} is not a valid name`);
  }

  if (fields === undefined) {
    throw ReferenceError('Second argument, fields, was not defined');
  } else if (!(fields instanceof Array)) {
    throw TypeError('Second argument, fields, was not an array');
  } else if (fields.length < 1) {
    throw RangeError(`Second argument, fields, was empty`);
  } else if (!allValidNames(fields)) {
    throw RangeError(`Second argument, fields, contained an invalid name`);
  }

  if (idField === undefined) {
    idField = 'id';
  } else if (typeof idField !== 'string') {
    throw TypeError('Third argument, idField, was not a string');
  } else if (!isValidName(idField)) {
    throw RangeError(`Third argument, idField, ${tableName} is not a valid name`);
  }

  const dao = store(tableName, fields, idField);

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
