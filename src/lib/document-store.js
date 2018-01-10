'use strict';

const db = require('./db');

const cleanupInner = e => {
        if(e === null) {
          return undefined;
        } else if (e instanceof Object) {
          return e.map(cleanupInner);
        } else {
          return e;
        }
      };
const cleanup = r =>
      r.data.map(cleanupInner);

module.exports = (table, searchFields, dataField, idField) => {
  if (table === undefined) {
    throw ReferenceError('First argument, table, was not defined');
  } else if (typeof table !== 'string') {
    throw TypeError('First argument, table, was not a string');
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

  const select = 'SELECT ${_data:name}';
  const from = 'FROM ${_table:name}';
  const limit = 'LIMIT 25';
  const names = {
    _data: dataField,
    _id: idField,
    _table: table
  };

  return {
    read: id => {
      if (id === undefined) {
        throw ReferenceError('First argument, id, was not defined');
      } else if (!Number.isInteger(id)) {
        throw TypeError('First argument, id, was not an integer');
      }

      return db.oneOrNone([select, from, 'WHERE ${_id:name} = ${id}', limit].join('\n'), Object.assign({id: id}, names))
        .then(r => cleanup(r));
    },
    search: terms => {
      const processedTerms = db.processTerms(terms);
      const sql = [select, from, processedTerms.sql, limit].join('\n');

      return db.any(sql, Object.assign(processedTerms.params, names))
        .then(r => r.map(cleanup));
    }
  };
};
