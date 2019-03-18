'use strict';

const proxyquire = require('proxyquire');
const daoSearchStub = sinon.stub();
const { create, search } = proxyquire('../../../../src/model/lev_audit/memory', {
  '../../lib/table': () => ({
    search: daoSearchStub
  })
});

describe('model/lev_audit/memory.js', () => {
  describe('create()', () => {
    it('is a function', () => (typeof create).should.equal('function'));
    it('takes six arguments', () => create.length.should.equal(6));

    describe('when called', () => {
      let result;

      before(() => {
        result = create(1, 2, 3, 4, 5, 6);
      });

      it('returns a promise', () => result.should.be.a('Promise'));
      it('returns a promise that resolves', () => result.should.be.fulfilled);
    });
  });

  describe('search()', () => {
    it('is a function', () => (typeof search).should.equal('function'));
    it('takes six arguments', () => search.length.should.equal(6));

    describe('when called', () => {
      let result;

      before(() => {
        daoSearchStub.returns(Promise.resolve([
          { id: 0, date_time: '2000-01-01 00:00', username: 'one' },
          { id: 1, date_time: '2000-01-01 01:00', username: 'two' },
          { id: 2, date_time: '2000-01-01 02:00', username: 'two' },
          { id: 3, date_time: '2000-01-02 00:00', username: 'one' }
        ]));
        result = search(1, 2, 3, 4, 5, 6);
      });

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
