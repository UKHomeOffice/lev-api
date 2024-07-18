'use strict';

const pgp = require('pg-promise');
const proxyquire = require('proxyquire');

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

const postgres = proxyquire('../../../src/lib/postgres.js', { 'pg-promise': (x) => Object.assign(pgpMock, pgp(x)) });

describe('lib/postgres.js', () => {
  describe('any()', () => {
    it('is a function', () => (typeof postgres.any).should.equal('function'));
    it('takes two arguments', () => postgres.any.length.should.equal(2));

    describe('When called with two arguments', () => {
      const q = 'foo';
      const v = 'bar';

      before(() => {
        postgres.any(q, v);
      });

      it('Calls the parent library', () => anyStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => anyStub.should.have.been.calledWith(q, v));
    });
  });

  describe('none()', () => {
    it('is a function', () => (typeof postgres.none).should.equal('function'));
    it('takes two arguments', () => postgres.none.length.should.equal(2));

    describe('When called with two arguments', () => {
      const q = 'foo';
      const v = 'bar';

      before(() => {
        postgres.none(q, v);
      });

      it('Calls the parent library', () => noneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => noneStub.should.have.been.calledWith(q, v));
    });
  });

  describe('one()', () => {
    it('is a function', () => (typeof postgres.one).should.equal('function'));
    it('takes three arguments', () => postgres.one.length.should.equal(3));

    describe('When called with three arguments', () => {
      const q = 'foo';
      const v = 'bar';
      const cb = 'baz';

      before(() => {
        postgres.one(q, v, cb);
      });

      it('Calls the parent library', () => oneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => oneStub.should.have.been.calledWith(q, v, cb));
    });
  });

  describe('oneOrNone()', () => {
    it('is a function', () => (typeof postgres.oneOrNone).should.equal('function'));
    it('takes three arguments', () => postgres.oneOrNone.length.should.equal(3));

    describe('When called with three arguments', () => {
      const q = 'foo';
      const v = 'bar';
      const cb = 'baz';

      before(() => {
        postgres.oneOrNone(q, v, cb);
      });

      it('Calls the parent library', () => oneOrNoneStub.should.have.been.called);
      it('Calls the parent library with the same arguments', () => oneOrNoneStub.should.have.been.calledWith(q, v, cb));
    });
  });
});
