'use strict';

const moment = require('moment');

const applyTest = (target, test) => {
  let r = false;

  if (test instanceof RegExp) {
    r = target && target.match && target.match(test) !== null;
  } else if (test instanceof moment) {
    r = test.isSame(target);
  } else if (test instanceof Date) {
    r = (new Date(target)) - test === 0;
  } else if (test instanceof Object) {
    r = true;
    if(test['>'] !== undefined) {
      r = r && target > test['>'];
    }
    if(test['<'] !== undefined) {
      r = r && target < test['<'];
    }
    if(test['>='] !== undefined) {
      r = r && target >= test['>='];
    }
    if(test['<='] !== undefined) {
      r = r && target <= test['<='];
    }
    if(test['includes'] !== undefined) {
      r = r && target.includes(test['includes']);
    }
  } else {
    r = target === test;
  }

  return r;
};

module.exports = {
  applyTest: applyTest
};
