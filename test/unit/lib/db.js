'use strict';

const pgp = require('pg-promise');
const proxyquire = require('proxyquire');
const moment = require('moment');

const anyStub = sinon.stub();
const noneStub = sinon.stub();
const oneStub = sinon.stub();
const oneOrNoneStub = sinon.stub();

const pgpMock = () => ({
  any: anyStub,
  none: noneStub,
  one: oneStub,
  oneOrNone: oneOrNoneStub
});

const db = proxyquire('../../../src/lib/db.js', { 'pg-promise': (x) => Object.assign(pgpMock, pgp(x)) });

describe('lib/db.js', () => {
  describe('any()', () => {
    it('is a function', () => (typeof db.any).should.equal('function'));
    it('takes two arguments', () => db.any.length.should.equal(2));

    describe('When called with two arguments', () => {
      const q = 'foo';
      const v = 'bar';

      before(() => {
        db.any(q, v);
      });

      it('Calls the parent library', () => anyStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => anyStub.should.have.been.calledWith(q, v));
    });
  });

  describe('none()', () => {
    it('is a function', () => (typeof db.none).should.equal('function'));
    it('takes two arguments', () => db.none.length.should.equal(2));

    describe('When called with two arguments', () => {
      const q = 'foo';
      const v = 'bar';

      before(() => {
        db.none(q, v);
      });

      it('Calls the parent library', () => noneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => noneStub.should.have.been.calledWith(q, v));
    });
  });

  describe('one()', () => {
    it('is a function', () => (typeof db.one).should.equal('function'));
    it('takes three arguments', () => db.one.length.should.equal(3));

    describe('When called with three arguments', () => {
      const q = 'foo';
      const v = 'bar';
      const cb = 'baz';

      before(() => {
        db.one(q, v, cb);
      });

      it('Calls the parent library', () => oneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => oneStub.should.have.been.calledWith(q, v, cb));
    });
  });

  describe('oneOrNone()', () => {
    it('is a function', () => (typeof db.oneOrNone).should.equal('function'));
    it('takes three arguments', () => db.oneOrNone.length.should.equal(3));

    describe('When called with three arguments', () => {
      const q = 'foo';
      const v = 'bar';
      const cb = 'baz';

      before(() => {
        db.oneOrNone(q, v, cb);
      });

      it('Calls the parent library', () => oneOrNoneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => oneOrNoneStub.should.have.been.calledWith(q, v, cb));
    });
  });

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
