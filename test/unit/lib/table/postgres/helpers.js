'use strict';

const moment = require('moment');
const { processTerms } = require('../../../../../src/lib/table/postgres/helpers');

describe('lib/table/postgres/helpers.js', () => {
  describe('processTerms()', () => {
    it('is a function', () => (typeof processTerms).should.equal('function'));
    it('takes one argument', () => processTerms.length.should.equal(1));

    describe('When called with no arguments', () => {
      it('Throws an error', () => expect(processTerms).to.throw());
      it('Throws a ReferenceError', () => expect(processTerms).to.throw(ReferenceError));
    });

    describe('When called with a non-object argument', () => {
      it('Throws an error', () => expect(() => processTerms(true)).to.throw());
      it('Throws a TypeError', () => expect(() => processTerms(true)).to.throw(TypeError));
    });

    describe('When called with an object argument', () => {
      let result;

      before(() => {
        result = processTerms({
          date: new Date('2001-09-28 00:00:00Z'),
          moment: moment('2001-09-28 00:00:00Z'),
          number: 3.14,
          numberInEq: {
            '<': 1,
            '>': 0
          },
          regEx: /^John(\s|\s.*\s)Smith$/,
          string: 'string'
        });
      });

      it('Reduces the object', () => result.should.deep.equal({
        sql: 'WHERE date = ${date}\n'
           + '  AND moment = ${moment}\n'
           + '  AND number = ${number}\n'
           + '  AND number_in_eq < ${numberInEq.<}\n'
           + '  AND number_in_eq > ${numberInEq.>}\n'
           + '  AND anglicise(reg_ex) ~ anglicise(${regEx})\n'
           + '  AND string = ${string}',
        params: {
          date: '2001-09-28T00:00:00.000Z',
          moment: '2001-09-28T00:00:00.000Z',
          number: 3.14,
          numberInEq: {
            '<': 1,
            '>': 0
          },
          regEx: '^John(\\s|\\s.*\\s)Smith$',
          string: 'string'
        }
      }));
    });
  });
});
