'use strict';

const params = require('../../../src/lib/params');
const moment = require('moment');

describe('lib/params.js', () => {
  it('is an object', () => params.should.be.an('object'));

  describe('name2regex()', () => {
    const subject = params.name2regex;

    it('is a function', () => subject.should.be.a('function'));
    it('takes one argument', () => subject.length.should.equal(1));

    describe('when called with one argument', () => {
      describe('that is a string', () => {
        describe('that is a simple name', () => {
          let result;

          before(() => {
            result = subject('joan');
          });

          it('returns a string', () => result.should.be.a('string'));
          it('returns the input', () => result.should.equal('joan'));
        });

        describe('that has trailing white-space', () => {
          let result;

          before(() => {
            result = subject('  joan  ');
          });

          it('returns a string', () => result.should.be.a('string'));
          it('returns the trimmed input', () => result.should.equal('joan'));
        });

        describe('that has white-space within it', () => {
          let result;

          before(() => {
            result = subject('joan  narcissus');
          });

          it('returns a string', () => result.should.be.a('string'));
          it('returns the input with regex', () => result.should.equal('joan[\\s-]+narcissus'));
        });

        describe('that has hyphens within it', () => {
          let result;

          before(() => {
            result = subject('joan--narcissus');
          });

          it('returns a string', () => result.should.be.a('string'));
          it('returns the input with regex', () => result.should.equal('joan[\\s-]+narcissus'));
        });
      });
    });
  });

  describe('parseDate()', () => {
    const subject = params.parseDate;

    it('is a function', () => subject.should.be.a('function'));
    it('takes one argument', () => subject.length.should.equal(1));

    describe('when called with no arguments', () => {
      let result;

      before(() => {
        result = subject();
      });

      it('returns undefined', () => expect(result).to.be.undefined);
    });

    describe('when called with one argument', () => {
      describe('that is not a string', () => {
        let result;

        before(() => {
          result = subject({});
        });

        it('returns a moment object', () => result.should.be.an.instanceof(moment));
        it('returns an invalid moment object', () => result.isValid().should.be.false);
      });

      describe('that is a string', () => {
        describe('that is not a valid, ISO-8601 date', () => {
          let result;

          before(() => {
            result = subject('01/01/2000');
          });

          it('returns a moment object', () => result.should.be.an.instanceof(moment));
          it('returns an invalid moment object', () => result.isValid().should.be.false);
        });

        describe('that is a valid, ISO-8601 date', () => {
          let result;

          before(() => {
            result = subject('2000-01-01');
          });

          it('returns a moment object', () => result.should.be.an.instanceof(moment));
          it('returns a valid moment object', () => result.isValid().should.be.true);
          it('returns a moment object of the date', () => (result.format('YYYY-MM-DD')).should.equal('2000-01-01'));
        });
      });
    });
  });
});
