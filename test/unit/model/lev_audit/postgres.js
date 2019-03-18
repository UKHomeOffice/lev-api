'use strict';

const proxyquire = require('proxyquire');
const postgresAnyStub = sinon.stub();
const postgresNoneStub = sinon.stub();
const { create, search } = proxyquire('../../../../src/model/lev_audit/postgres', {
  '../../lib/postgres': {
    any: postgresAnyStub,
    none: postgresNoneStub
  }
});

describe('model/lev_audit/postgres.js', () => {
  describe('create()', () => {
    it('is a function', () => (typeof create).should.equal('function'));
    it('takes six arguments', () => create.length.should.equal(6));

    describe('when called', () => {
      let result;

      before(() => {
        postgresNoneStub.returns(Promise.resolve());
        result = create(1, 2, 3, 4, 5, 6);
      });

      it('executes an INSERT statement', () => postgresNoneStub.should.have.been.calledWith(sinon.match(/^INSERT/)));
      it('returns a promise', () => result.should.be.a('Promise'));
    });
  });

  describe('search()', () => {
    it('is a function', () => (typeof search).should.equal('function'));
    it('takes six arguments', () => search.length.should.equal(6));

    describe('when called without optional arguments', () => {
      let result;

      before(() => {
        postgresAnyStub.returns(Promise.resolve([
          { date: '2000-01-01', username: 'one', count: 1 },
          { date: '2000-01-01', username: 'two', count: 2 },
          { date: '2000-01-02', username: 'one', count: 1 }
        ]));
        result = search(1, 2);
      });

      it('executes a SELECT statement', () => postgresAnyStub.should.have.been.calledWith(sinon.match(/^SELECT/)));
      it('returns a promise', () => result.should.be.a('Promise'));
      it('returns a promise that resolves', () => result.should.be.fulfilled);
      it('returns a promise that resolves to a count grouped by username and date', () => result.should.eventually.deep.equal({
        'one': {
          '2000-01-01': 1,
          '2000-01-02': 1
        },
        'two': {
          '2000-01-01': 2
        }
      }));
    });

    describe('when called with optional arguments', () => {
      let result;

      before(() => {
        postgresAnyStub.returns(Promise.resolve([
          { date: '2000-01-01', username: 'one', count: 1 },
          { date: '2000-01-01', username: 'two', count: 2 },
          { date: '2000-01-02', username: 'one', count: 1 }
        ]));
        result = search(1, 2, 3, 4, 5, 6);
      });

      it('executes a SELECT statement', () => postgresAnyStub.should.have.been.calledWith(sinon.match(/^SELECT/)));
      it('returns a promise', () => result.should.be.a('Promise'));
      it('returns a promise that resolves', () => result.should.be.fulfilled);
      it('returns a promise that resolves to a count grouped by username and date', () => result.should.eventually.deep.equal({
        'one': {
          '2000-01-01': 1,
          '2000-01-02': 1
        },
        'two': {
          '2000-01-01': 2
        }
      }));
    });
  });
});
