'use strict';

const moment = require('moment');

const name2regex = n => n
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/[\s-]+/, '[\\s-]+');

const parseDate = d =>
      d && moment(d, 'YYYY-MM-DD', true);

module.exports = {
  name2regex: name2regex,
  parseDate: parseDate
};
