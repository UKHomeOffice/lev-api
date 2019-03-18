'use strict';

const key2Field = v =>
      v.replace(/([A-Z]+)/g, '_$1').toLowerCase();

module.exports = {
  key2Field: key2Field
};
