'use strict';

const proxyquire = require('proxyquire').noCallThru();
const data = [
  { id: 0, foo: 'bar' },
  { id: 1, foo: 'baz' }
];
const memory = proxyquire('../../../../../src/lib/table/memory', {
  '../../../../mock/lev_audit.json': data
});

describe('lib/table/memory.js', () => {
  it('is a function', () => (typeof memory).should.equal('function'));
  it('takes three arguments', () => memory.length.should.equal(3));

  describe('when called with one argument', () => {
    describe('that IS a string', () => {
      let result;

      before(() => {
        result = memory('lev_audit', ['id', 'foo'], 'id');
      });

      it('returns an object', () => (typeof result).should.equal('object'));

      describe('the object', () => {
        it('has a read() method', () => (typeof result.read).should.equal('function'));
        it('has a search() method', () => (typeof result.search).should.equal('function'));

        describe('.read()', () => {
          it('takes one argument', () => result.read.length.should.equal(1));

          describe('when called with one argument', () => {
            describe('that IS an integer', () => {
              let result2;

              describe('and the database returns nothing', () => {
                before(() => {
                  result2 = result.read(100);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with an undefined', () => result2.should.eventually.deep.equal(undefined));
              });

              describe('and the database returns a record', () => {
                const record = { id: 0, foo: 'bar' };

                before(() => {
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with the record', () => result2.should.eventually.deep.equal(record));
              });
            });
          });
        });

        describe('.search()', () => {
          it('takes one argument', () => result.search.length.should.equal(1));

          describe('when called with one argument', () => {
            describe('that IS an object', () => {
              let result2;

              describe('and the database returns a set of records', () => {
                const records = [
                  { id: 0, foo: 'bar' },
                  { id: 1, foo: 'baz' }
                ];

                before(() => {
                  result2 = result.search({
                    id: {
                      '>=': 0
                    }
                  });
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with the records from db', () => result2.should.eventually.deep.equal(records));
              });
            });
          });
        });
      });
    });
  });
});
