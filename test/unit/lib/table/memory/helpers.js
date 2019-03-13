'use strict';

const moment = require('moment');
const { applyTest } = require('../../../../../src/lib/table/memory/helpers');

describe('lib/table/memory/helpers.js', () => {
  describe('applyTest()', () => {
    it('is a function', () => (typeof applyTest).should.equal('function'));
    it('takes two arguments', () => applyTest.length.should.equal(2));

    describe('When called with two arguments', () => {
      describe('When the first is a string and the second is a Date', () => {
        describe('And they are the same time', () => {
          let result;

          before(() => {
            result = applyTest('2001-09-28T00:00:00.000Z', new Date('2001-09-28 00:00:00Z'));
          });

          it('Returns true', () => result.should.equal(true));
        });

        describe('And they are NOT the same time', () => {
          let result;

          before(() => {
            result = applyTest('2001-09-28T00:00:01.000Z', new Date('2001-09-28 00:00:02Z'));
          });

          it('Returns false', () => result.should.equal(false));
        });
      });

      describe('When the first is a string and the second is a moment', () => {
        describe('And they are the same time', () => {
          let result;

          before(() => {
            result = applyTest('2001-09-28T00:00:00.000Z', new moment('2001-09-28 00:00:00Z'));
          });

          it('Returns true', () => result.should.equal(true));
        });

        describe('And they are NOT the same time', () => {
          let result;

          before(() => {
            result = applyTest('2001-09-28T00:00:01.000Z', new moment('2001-09-28 00:00:02Z'));
          });

          it('Returns false', () => result.should.equal(false));
        });
      });

      describe('When the first is a number and the second is a number', () => {
        describe('And they are the same number', () => {
          let result;

          before(() => {
            result = applyTest(3.14, 3.14);
          });

          it('Returns true', () => result.should.equal(true));
        });

        describe('And they are NOT the same number', () => {
          let result;

          before(() => {
            result = applyTest(1, 2);
          });

          it('Returns false', () => result.should.equal(false));
        });
      });

      describe('When the first is a number and the second is an object', () => {
        describe('And the object contains a inequality properties', () => {
          describe('And the number satisfies all properties', () => {
            let result;

            before(() => {
              result = applyTest(3.14, {
                '>': 3,
                '<': 4,
                '>=': 3.14,
                '<=': 3.14
              });
            });

            it('Returns true', () => result.should.equal(true));
          });

          describe('And the number does NOT satisfy all properties', () => {
            let result;

            before(() => {
              result = applyTest(3.14, {
                '>': 3,
                '<': 3.14,
                '>=': 3.14,
                '<=': 3.14
              });
            });

            it('Returns false', () => result.should.equal(false));
          });
        });
      });

      describe('When the first is an array and the second is an object', () => {
        describe('And the object contains an includes properties', () => {
          describe('And the array includes the property', () => {
            let result;

            before(() => {
              result = applyTest([1, 2, 3], {
                'includes': 3
              });
            });

            it('Returns true', () => result.should.equal(true));
          });

          describe('And the array does NOT include the property', () => {
            let result;

            before(() => {
              result = applyTest([1, 2, 3], {
                'includes': 4
              });
            });

            it('Returns false', () => result.should.equal(false));
          });
        });
      });

      describe('When the first is a string and the second is a RegExp', () => {
        describe('And string matches', () => {
          let result;

          before(() => {
            result = applyTest('foo bar baz', /bar/);
          });

          it('Returns true', () => result.should.equal(true));
        });

        describe('And string does NOT match', () => {
          let result;

          before(() => {
            result = applyTest('foo bar baz', /qux/);
          });

          it('Returns false', () => result.should.equal(false));
        });
      });

      describe('When the first is a string and the second is a string', () => {
        describe('And strings are the same', () => {
          let result;

          before(() => {
            result = applyTest('foo', 'foo');
          });

          it('Returns true', () => result.should.equal(true));
        });

        describe('And strings are NOT the same', () => {
          let result;

          before(() => {
            result = applyTest('foo', 'bar');
          });

          it('Returns false', () => result.should.equal(false));
        });
      });

      describe('When they are different types', () => {
        let result;

        before(() => {
          result = applyTest(1, '1');
        });

        it('Returns false', () => result.should.equal(false));
      });
    });
  });
});
