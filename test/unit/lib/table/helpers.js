'use strict';

const proxyquire = require('proxyquire');
const { key2Field } = require('../../../../src/lib/table/helpers');

describe('lib/table/helpers.js', () => {
  describe('key2Field()', () => {
    it('is a function', () => (typeof key2Field).should.equal('function'));
    it('takes one arguments', () => key2Field.length.should.equal(1));

    describe('when called with one argument', () => {
      describe('that is a string', () => {
        describe('that is camel-case', () => {
          let result;

          before(() => {
            result = key2Field('myVeryNiceField');
          });

          it('returns a string', () => (typeof result).should.equal('string'));
          it('returns the original string with words separated by underscores', () => result.should.equal('my_very_nice_field'));
        });
      });
    });
  });
});
