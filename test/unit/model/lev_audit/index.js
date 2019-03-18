'use strict';

const proxyquire = require('proxyquire');
const memoryCreateStub = sinon.stub();
const memorySearchStub = sinon.stub();
const postgresCreateStub = sinon.stub();
const postgresSearchStub = sinon.stub();
const { create, search } = proxyquire('../../../../src/model/lev_audit', {
  '../../../config': {
    mock: false
  },
  './postgres': {
    create: postgresCreateStub,
    search: postgresSearchStub
  }
});
const mock = proxyquire('../../../../src/model/lev_audit', {
  '../../../config': {
    mock: true
  },
  './memory': {
    create: memoryCreateStub,
    search: memorySearchStub
  },
  './postgres': {}
});

describe('model/lev_audit/index.js', () => {
  describe('create()', () => {
    it('is a function', () => (typeof create).should.equal('function'));
    it('takes six arguments', () => create.length.should.equal(6));

    describe('when called', () => {
      let result;

      before(() => {
        postgresCreateStub.returns('postgresCreate');
        result = create(1, 2, 3, 4, 5, 6);
      });

      it('calls postgres.create', () => postgresCreateStub.should.have.been.called);
      it('calls postgres.create with its arguments', () => postgresCreateStub.should.have.been.calledWith(1, 2, 3, 4, 5, 6));
      it('returns the result', () => result.should.equal('postgresCreate'));
    });

    describe('when called in mock mode', () => {
      let result;

      before(() => {
        memoryCreateStub.returns('memoryCreate');
        result = mock.create(1, 2, 3, 4, 5, 6);
      });

      it('calls memory.create', () => memoryCreateStub.should.have.been.called);
      it('calls memory.create with its arguments', () => memoryCreateStub.should.have.been.calledWith(1, 2, 3, 4, 5, 6));
      it('returns the result', () => result.should.equal('memoryCreate'));
    });
  });

  describe('search()', () => {
    it('is a function', () => (typeof search).should.equal('function'));
    it('takes six arguments', () => search.length.should.equal(6));

    describe('when called', () => {
      let result;

      before(() => {
        postgresSearchStub.returns('postgresSearch');
        result = search(1, 2, 3, 4, 5, 6);
      });

      it('calls postgres.search', () => postgresSearchStub.should.have.been.called);
      it('calls postgres.search with its arguments', () => postgresSearchStub.should.have.been.calledWith(1, 2, 3, 4, 5, 6));
      it('returns the result', () => result.should.equal('postgresSearch'));
    });

    describe('when called in mock mode', () => {
      let result;

      before(() => {
        memorySearchStub.returns('memorySearch');
        result = mock.search(1, 2, 3, 4, 5, 6);
      });

      it('calls memory.search', () => memorySearchStub.should.have.been.called);
      it('calls memory.search with its arguments', () => memorySearchStub.should.have.been.calledWith(1, 2, 3, 4, 5, 6));
      it('returns the result', () => result.should.equal('memorySearch'));
    });
  });
});
