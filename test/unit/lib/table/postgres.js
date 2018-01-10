'use strict';

const proxyquire = require('proxyquire');
const dbMethodStub = sinon.stub();
const postgres = proxyquire('../../../../src/lib/table/postgres', {
  '../postgres': {
    any: dbMethodStub,
    one: dbMethodStub,
    oneOrNone: dbMethodStub,
    many: dbMethodStub
  }
});

describe('lib/table/postgres.js', () => {
  it('is a function', () => (typeof postgres).should.equal('function'));
  it('takes three arguments', () => postgres.length.should.equal(3));

  describe('when called with one argument', () => {
    describe('that IS a string', () => {
      let result;

      before(() => {
        result = postgres('tbl');
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

              describe('and the database returns nothing', () => {
                before(() => {
                  dbMethodStub.returns(new Promise(resolve => resolve(null)));
                  result2 = result.read(0);
                });

                it('returns a promise', () => (result2 instanceof Promise).should.equal(true));
                it('returns a promise that resolves', () => result2.should.be.fulfilled);
                it('returns a promise that resolves with a null', () => result2.should.eventually.deep.equal(null));
              });

              describe('and the database returns a record', () => {
                const record = { foo: 'bar' };

                before(() => {
                  dbMethodStub.returns(new Promise(resolve => resolve(record)));
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
                const records = [
                  { foo: 'bar' },
                  { foo: 'baz' }
                ];

                before(() => {
                  dbMethodStub.returns(new Promise(resolve => resolve(records)));
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

  /*
  describe('processTerms()', () => {
    it('is a function', () => (typeof postgres.processTerms).should.equal('function'));
    it('takes one argument', () => postgres.processTerms.length.should.equal(1));

    describe('When called with no arguments', () => {
      it('Throws an error', () => expect(postgres.processTerms).to.throw());
      it('Throws a ReferenceError', () => expect(postgres.processTerms).to.throw(ReferenceError));
    });

    describe('When called with a non-object argument', () => {
      it('Throws an error', () => expect(() => postgres.processTerms(true)).to.throw());
      it('Throws a TypeError', () => expect(() => postgres.processTerms(true)).to.throw(TypeError));
    });

    describe('When called with an object argument', () => {
      let result;

      before(() => {
        result = postgres.processTerms({
          date: new Date('2001-09-28 00:00:00Z'),
          moment: moment('2001-09-28 00:00:00Z'),
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
  */
});
