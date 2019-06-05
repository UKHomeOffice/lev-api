'use strict';

const promiseRejectionHandler = require('../../../src/lib/promise-rejection-handler');

describe('lib/promise-rejection-handler.js', () => {
  it('is a function', () => (typeof promiseRejectionHandler).should.equal('function'));
  it('takes one argument', () => promiseRejectionHandler.length.should.equal(1));
});
