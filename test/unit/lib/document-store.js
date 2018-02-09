'use strict';

const proxyquire = require('proxyquire');
const dbMethodStub = sinon.stub();
const documentStore = proxyquire('../../../src/lib/document-store.js', {
  './db': {
    any: dbMethodStub,
    one: dbMethodStub,
    oneOrNone: dbMethodStub,
    many: dbMethodStub
  }
});

describe('lib/document-store.js', () => {
  it('is a function', () => (typeof documentStore).should.equal('function'));
  it('takes four arguments', () => documentStore.length.should.equal(4));

  describe('when called with no arguments', () => {
    it('throws an error', () => expect(documentStore).to.throw());
    it('throws a ReferenceError', () => expect(documentStore).to.throw(ReferenceError));
  });

  describe('when called with one argument', () => {
    describe('that IS NOT a string', () => {
      it('throws an error', () => expect(() => documentStore({})).to.throw());
      it('throws a TypeError', () => expect(() => documentStore({})).to.throw(TypeError));
    });

    describe('that IS a string', () => {
      let result;

      before(() => {
        result = documentStore('tbl');
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
                  dbMethodStub.returns(new Promise((resolve, reject) => reject(err)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that rejects', () => result2.should.eventually.be.rejected);
                it('returns a promise that rejects with the error from db', () => result2.should.eventually.be.rejectedWith(err));
              });

              describe('and the database returns a record', () => {
                const doc = { foo: 'bar' };
                const record = { data: doc };

                before(() => {
                  dbMethodStub.returns(new Promise(resolve => resolve(record)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with the data from the record', () => result2.should.eventually.deep.equal(doc));
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
                  dbMethodStub.returns(new Promise((resolve, reject) => reject(err)));
                  result2 = result.search({});
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that rejects', () => result2.should.eventually.be.rejected);
                it('returns a promise that rejects with the error from db', () => result2.should.eventually.be.rejectedWith(err));
              });

              describe('and the database returns a set of records', () => {
                const docs = [
                  { foo: 'bar' },
                  { foo: 'baz' }
                ];

                before(() => {
                  dbMethodStub.returns(new Promise(resolve => resolve(docs.map(e => ({
                    data: e
                  })))));
                  result2 = result.search({});
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with the records from db', () => result2.should.eventually.deep.equal(docs));
              });
            });
          });
        });
      });
    });
  });

  describe('when called with two arguments', () => {
    describe('and the second IS NOT an array', () => {
      it('throws an error', () => expect(() => documentStore('tbl', {})).to.throw());
      it('throws a TypeError', () => expect(() => documentStore('tbl', {})).to.throw(TypeError));
    });
  });

  describe('when called with three arguments', () => {
    describe('and the third IS NOT a string', () => {
      it('throws an error', () => expect(() => documentStore('tbl', [], {})).to.throw());
      it('throws a TypeError', () => expect(() => documentStore('tbl', [], {})).to.throw(TypeError));
    });
  });

  describe('when called with four arguments', () => {
    describe('and the forth IS NOT a string', () => {
      it('throws an error', () => expect(() => documentStore('tbl', [], '', {})).to.throw());
      it('throws a TypeError', () => expect(() => documentStore('tbl', [], '', {})).to.throw(TypeError));
    });
  });
});
