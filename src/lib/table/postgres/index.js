'use strict';

const config = require('../../../../config');
const postgres = require('../../postgres');
const { processTerms } = require('./helpers');

module.exports = (tableName, fields, idField) => {
  const select = 'SELECT ${_fields:name}';
  const from = 'FROM ${_table:name}';
  const limit = 'LIMIT ' + config.maxRecords;
  const names = {
    _id: idField,
    _fields: fields,
    _table: tableName
  };

  return {
    read: id => postgres.oneOrNone([select, from, 'WHERE ${_id:name} = ${id}', limit].join('\n'), Object.assign({id: id}, names)),
    search: terms => {
      const processedTerms = processTerms(terms);
      const sql = [select, from, processedTerms.sql, limit].join('\n');

      return postgres.any(sql, Object.assign(processedTerms.params, names));
    }
  };
};
