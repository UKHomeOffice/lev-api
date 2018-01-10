'use strict';

const db = require('../../../src/lib/db.js');
const moment = require('moment');

describe('lib/db.js', () => {
  describe('processTerms()', () => {
    it('is a function', () => (typeof db.processTerms).should.equal('function'));
    it('takes one argument', () => db.processTerms.length.should.equal(1));

    describe('When called with no arguments', () => {
      it('Throws an error', () => expect(db.processTerms).to.throw());
      it('Throws a ReferenceError', () => expect(db.processTerms).to.throw(ReferenceError));
    });

    describe('When called with a non-object argument', () => {
      it('Throws an error', () => expect(() => db.processTerms(true)).to.throw());
      it('Throws a TypeError', () => expect(() => db.processTerms(true)).to.throw(TypeError));
    });

    describe('When called with an object argument', () => {
      let result;

      before(() => {
        result = db.processTerms({
          date: new Date('2001-09-28 01:00:00'),
          moment: moment('2001-09-28 01:00:00'),
          number: 3.14,
          regEx: /^John(\s|\s.*\s)Smith$/,
          string: 'string'
        });
      });

      it('Reduces the object', () => result.should.deep.equal({
        sql: 'WHERE date = ${date}\n'
           + '  AND moment = ${moment}\n'
           + '  AND number = ${number}\n'
           + '  AND anglicise(reg_ex) ~ anglicise(${regEx})\n'
           + '  AND string = ${string}',
        params: {
          date: '2001-09-28T00:00:00.000Z',
          moment: '2001-09-28T00:00:00.000Z',
          number: 3.14,
          regEx: '^John(\\s|\\s.*\\s)Smith$',
          string: 'string'
        }
      }));
    });
  });
});
