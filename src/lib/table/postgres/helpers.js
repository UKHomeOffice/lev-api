'use strict';

const { key2Field } = require('../helpers');
const moment = require('moment');

require('functional-augments');

const term2Sql = t => {
  const k = t[0];
  const v = t[1];
  const field = key2Field(k);

  if (v instanceof RegExp) {
    return 'anglicise(' + field + ')' + ' ~ anglicise(${' + k + '})';
  } else if (v instanceof Date || v instanceof moment) {
    return field + ' = ${' + k + '}';
  } else if (v instanceof Object) {
    const operators = [ '>', '<', '>=', '<=' ];

    const r = Object.values(v
                            .filter((v2, k2) => operators.includes(k2))
                            .map((v2, k2) => field + ' ' + k2 + ' ${' + k + '.' + k2 + '}')
                           ).join('\n  AND ');

    return r;
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

module.exports = {
  processTerms: processTerms
};
