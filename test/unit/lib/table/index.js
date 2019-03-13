'use strict';

const proxyquire = require('proxyquire');
const postgresMethodStub = sinon.stub();
const table = proxyquire('../../../../src/lib/table', {
  './postgres': () => ({
    read: postgresMethodStub,
    search: postgresMethodStub
  })
});

describe('lib/table/index.js', () => {
  it('is a function', () => (typeof table).should.equal('function'));
  it('takes three arguments', () => table.length.should.equal(3));

  describe('when called with no arguments', () => {
    it('throws an error', () => expect(table).to.throw());
    it('throws a ReferenceError', () => expect(table).to.throw(ReferenceError));
  });

  describe('when called with one argument', () => {
    it('throws an error', () => expect(() => table('tbl')).to.throw());
    it('throws a TypeError', () => expect(() => table('tbl')).to.throw(ReferenceError));
  });

  describe('when called with two arguments', () => {
    describe('and the first IS NOT a string', () => {
      it('throws an error', () => expect(() => table({}, ['id'])).to.throw());
      it('throws a TypeError', () => expect(() => table({}, ['id'])).to.throw(TypeError));
    });

    describe('and the first is an empty string', () => {
      it('throws an error', () => expect(() => table('', ['id'])).to.throw());
      it('throws a TypeError', () => expect(() => table('', ['id'])).to.throw(RangeError));
    });

    describe('and the second IS NOT an array', () => {
      it('throws an error', () => expect(() => table('tbl', {})).to.throw());
      it('throws a TypeError', () => expect(() => table('tbl', {})).to.throw(TypeError));
    });

    describe('and the second is an empty array', () => {
      it('throws an error', () => expect(() => table('tbl', [])).to.throw());
      it('throws a TypeError', () => expect(() => table('tbl', [])).to.throw(RangeError));
    });

    describe('and the second is an array with an empty string', () => {
      it('throws an error', () => expect(() => table('tbl', [''])).to.throw());
      it('throws a TypeError', () => expect(() => table('tbl', [''])).to.throw(RangeError));
    });

    describe('and they are valid', () => {
      let result;

      before(() => {
        result = table('tbl', ['id', 'data']);
      });

      it('returns an object', () => (typeof result).should.equal('object'));

      describe('the object', () => {
        it('has a read() method', () => (typeof result.read).should.equal('function'));
        it('has a search() method', () => (typeof result.search).should.equal('function'));

        describe('.read()', () => {
          it('takes one argument', () => result.read.length.should.equal(1));

          describe('when called with no arguments', () => {
            it('throws an error', () => expect(result.read).to.throw());
            it('throws a ReferenceError', () => expect(result.read).to.throw(ReferenceError));
          });

          describe('when called with one argument', () => {
            describe('that IS NOT an integer', () => {
              it('throws an error', () => expect(() => result.read(3.14)).to.throw());
              it('throws a TypeError', () => expect(() => result.read(3.14)).to.throw(TypeError));
            });

            describe('that IS an integer', () => {
              let result2;

              describe('and the database fails', () => {
                const err = new Error('foo');

                before(() => {
                  postgresMethodStub.returns(new Promise((resolve, reject) => reject(err)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that rejects', () => result2.should.eventually.be.rejected);
                it('returns a promise that rejects with the error from db', () => result2.should.eventually.be.rejectedWith(err));
              });

              describe('and the database returns nothing', () => {
                before(() => {
                  postgresMethodStub.returns(new Promise(resolve => resolve(null)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with a null', () => result2.should.eventually.deep.equal(null));
              });

              describe('and the database returns a record', () => {
                const record = { foo: 'bar', baz: null };

                before(() => {
                  postgresMethodStub.returns(new Promise(resolve => resolve(record)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with the record with nulls removed', () => result2.should.eventually.deep.equal({ foo: 'bar' }));
              });
            });
          });
        });

        describe('.search()', () => {
          it('takes one argument', () => result.search.length.should.equal(1));

          describe('when called with no arguments', () => {
            it('throws an error', () => expect(result.search).to.throw());
            it('throws a ReferenceError', () => expect(result.search).to.throw(ReferenceError));
          });

          describe('when called with one argument', () => {
            describe('that IS NOT an object', () => {
              it('throws an error', () => expect(() => result.search(3)).to.throw());
              it('throws a TypeError', () => expect(() => result.search(3)).to.throw(TypeError));
            });

            describe('that IS an object', () => {
              let result2;

              describe('and the database fails', () => {
                const err = new Error('foo');

                before(() => {
                  postgresMethodStub.returns(new Promise((resolve, reject) => reject(err)));
                  result2 = result.search({});
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that rejects', () => result2.should.eventually.be.rejected);
                it('returns a promise that rejects with the error from db', () => result2.should.eventually.be.rejectedWith(err));
              });

              describe('and the database returns a set of records', () => {
                const records = [
                  { foo: 'bar' },
                  { foo: 'baz' }
                ];

                before(() => {
                  postgresMethodStub.returns(new Promise(resolve => resolve(records)));
                  result2 = result.search({});
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

  describe('when called with three arguments', () => {
    describe('and the third IS NOT a string', () => {
      it('throws an error', () => expect(() => table('tbl', ['id'], {})).to.throw());
      it('throws a TypeError', () => expect(() => table('tbl', ['id'], {})).to.throw(TypeError));
    });

    describe('and the third is an empty string', () => {
      it('throws an error', () => expect(() => table('tbl', ['id'], '')).to.throw());
      it('throws a RangeError', () => expect(() => table('tbl', ['id'], '')).to.throw(RangeError));
    });
  });
});
