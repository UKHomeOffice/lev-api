'use strict';

const config = require('../../../config');
const postgres = require('../postgres');
const { key2Field } = require('./helpers');

require('functional-augments');

const term2Sql = t => {
  const k = t[0];
  const v = t[1];
  const field = key2Field(k);

  if (v instanceof RegExp) {
    return 'anglicise(' + field + ')' + ' ~ anglicise(${' + k + '})';
  } else if (v instanceof Object) {
    const operators = [ '>', '<', '>=', '<=' ];

    return v.filter((v2, k2) => operators.includes(k)).map((v2, k2) => field + ' ' + k2 + ' ${' + k + '.' + k2 + '}');
  } else {
    return field + ' = ${' + k + '}';
  }
};

const term2Param = v => {
  if (v instanceof RegExp) {
    return v.source;
  } else if (v instanceof Date || v && v.isValid && v.isValid()) {
    return v.toISOString();
  } else {
    return v;
  }
};

const processTerms = terms => {
  if (terms === undefined) {
    throw new ReferenceError('Missing argument, f');
  } else if (!(terms instanceof Object)) {
    throw new TypeError('Argument is not an object');
  }

  const filteredTerms = terms.filter(v => v !== undefined);

  return {
    sql: 'WHERE ' + Object.entries(filteredTerms).map(term2Sql).join('\n  AND '),
    params: filteredTerms.map(term2Param)
  };
};

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
