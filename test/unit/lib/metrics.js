'use strict';

const proxyquire = require('proxyquire');
const moment = require('moment');
const hsIncrementStub = sinon.stub();
const hsSetStub = sinon.stub();
const hsTimingStub = sinon.stub();
const logInfoStub = sinon.stub();
const metrics = proxyquire('../../../src/lib/metrics', {
  'hot-shots': function () {
    this.increment = hsIncrementStub;
    this.set = hsSetStub;
    this.timing = hsTimingStub;
    this.unique = hsSetStub;
  },
  './logger': {
    info: logInfoStub
  }
});

const resetStubs = () => {
  hsIncrementStub.reset();
  hsSetStub.reset();
  hsTimingStub.reset();
};

const startTime = moment('1970-01-01 00:00:00.000Z');
const finishTime = moment('1970-01-01 00:00:00.100Z');
const responseTime = 100;

const requestValidationTest = (subject) => {
  describe('when called with no arguments', () => {
    it('throws an error', () => expect(subject).to.throw());
    it('throws a ReferenceError', () => expect(subject).to.throw(ReferenceError));
  });

  describe('when called with one argument', () => {
    describe('that IS NOT a string', () => {
      it('throws an error', () => expect(() => subject({})).to.throw());
      it('throws a TypeError', () => expect(() => subject({})).to.throw(TypeError));
    });

    describe('that IS a string', () => {
      describe('that IS NOT valid', () => {
        it('throws an error', () => expect(() => subject('foo')).to.throw());
        it('throws a RangeError', () => expect(() => subject('foo')).to.throw(RangeError));
      });

      describe('that IS valid', () => {
        it('throws an error', () => expect(() => subject('birth')).to.throw());
        it('throws a ReferenceError', () => expect(() => subject('birth')).to.throw(ReferenceError));
      });
    });
  });

  describe('when called with two arguments', () => {
    describe('that IS NOT a string', () => {
      it('throws an error', () => expect(() => subject('birth', {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', {})).to.throw(TypeError));
    });

    describe('that IS a string', () => {
      it('throws an error', () => expect(() => subject('birth', 'user')).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user')).to.throw(ReferenceError));
    });
  });

  describe('when called with three arguments', () => {
    describe('that IS NOT a string', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', {})).to.throw(TypeError));
    });

    describe('that IS a string', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client')).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'client')).to.throw(ReferenceError));
    });
  });

  describe('when called with four arguments', () => {
    describe('that IS NOT an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', {})).to.throw(TypeError));
    });

    describe('that IS an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'])).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'client', ['group'])).to.throw(ReferenceError));
    });
  });

  describe('when called with five arguments', () => {
    describe('that IS NOT a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', ['group'], {})).to.throw(TypeError));
    });

    describe('that IS a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime)).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime)).to.throw(ReferenceError));
    });
  });

  describe('when called with six arguments', () => {
    describe('that IS NOT a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, {})).to.throw(TypeError));
    });

    describe('that IS a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime)).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime)).to.throw(ReferenceError));
    });
  });
};

describe('lib/metrics.js', () => {
  describe('lookup()', () => {
    const subject = metrics.lookup;

    it('is a function', () => (typeof subject).should.equal('function'));
    it('takes seven arguments', () => subject.length.should.equal(7));

    requestValidationTest(subject);

    describe('when called with seven arguments', () => {
      describe('that IS NOT a number', () => {
        it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, {})).to.throw());
        it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, {})).to.throw(TypeError));
      });

      describe('that IS a number', () => {
        describe('that IS NOT an integer', () => {
          it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, 3.14)).to.throw());
          it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, 3.14)).to.throw(TypeError));
        });

        describe('that IS an integer', () => {
          describe('that IS negative', () => {
            it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, -1)).to.throw());
            it('throws a RangeError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, -1)).to.throw(RangeError));
          });

          describe('that IS NOT negative', () => {
            before(() => {
              resetStubs();
              subject('birth', 'user', 'client', ['group'], startTime, finishTime, 1);
            });

            it('calls increment from the hot-shots library', () => hsIncrementStub.should.have.been.called);
            it('calls increment on lev.api.req', () => hsIncrementStub.should.have.been.calledWith('lev.api.req'));
            it('calls increment on lev.api.req.lookup', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.lookup'));
            it('calls increment on lev.api.req.${dataSet}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth'));
            it('calls increment on lev.api.req.${client}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.client'));
            it('calls increment on lev.api.req.${group}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.group'));

            it('calls timing from the hot-shots library', () => hsTimingStub.should.have.been.called);
            it('calls timing on lev.api.req', () => hsTimingStub.should.have.been.calledWith('lev.api.req.time', responseTime));
            it('calls timing on lev.api.req.lookup', () => hsTimingStub.should.have.been.calledWith('lev.api.req.lookup.time', responseTime));
            it('calls timing on lev.api.req.${dataSet}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.time', responseTime));
            it('calls timing on lev.api.req.${client}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.client.time', responseTime));
            it('calls timing on lev.api.req.${group}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.group.time', responseTime));

            it('calls set from the hot-shots library', () => hsSetStub.should.have.been.called);
            it('calls set on lev.api.req', () => hsSetStub.should.have.been.calledWith('lev.api.req.users', 'user'));
            it('calls set on lev.api.req.lookup', () => hsSetStub.should.have.been.calledWith('lev.api.req.lookup.users', 'user'));
            it('calls set on lev.api.req.${dataSet}', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.users', 'user'));
            it('calls set on lev.api.req.${client}', () => hsSetStub.should.have.been.calledWith('lev.api.req.client.users', 'user'));
            it('calls set on lev.api.req.${group}', () => hsSetStub.should.have.been.calledWith('lev.api.req.group.users', 'user'));

            it('calls log.info', () => logInfoStub.should.have.been.called);
            it('calls log.info with request information', () => logInfoStub.should.have.been.calledWith({
              dataSet: 'birth',
              client: 'client',
              groups: ['group'],
              id: 1,
              reqType: 'lookup',
              responseTime: responseTime + 'ms',
              username: 'user'
            }));
          });
        });
      });
    });
  });

  describe('search()', () => {
    const subject = metrics.search;

    it('is a function', () => (typeof subject).should.equal('function'));
    it('takes seven arguments', () => subject.length.should.equal(7));

    requestValidationTest(subject);

    describe('when called with seven arguments', () => {
      describe('that IS NOT an object', () => {
        it('throws an error', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, '')).to.throw());
        it('throws a TypeError', () => expect(() => subject('birth', 'user', 'client', ['group'], startTime, finishTime, '')).to.throw(TypeError));
      });

      describe('that IS an object', () => {
        before(() => {
          resetStubs();
          subject('birth', 'user', 'client', ['group'], startTime, finishTime, {});
        });

        it('calls increment from the hot-shots library', () => hsIncrementStub.should.have.been.called);
        it('calls increment on lev.api.req', () => hsIncrementStub.should.have.been.calledWith('lev.api.req'));
        it('calls increment on lev.api.req.search', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.search'));
        it('calls increment on lev.api.req.${dataSet}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth'));
        it('calls increment on lev.api.req.${client}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.client'));
        it('calls increment on lev.api.req.${group}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.group'));

        it('calls timing from the hot-shots library', () => hsTimingStub.should.have.been.called);
        it('calls timing on lev.api.req', () => hsTimingStub.should.have.been.calledWith('lev.api.req.time', responseTime));
        it('calls timing on lev.api.req.search', () => hsTimingStub.should.have.been.calledWith('lev.api.req.search.time', responseTime));
        it('calls timing on lev.api.req.${dataSet}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.time', responseTime));
        it('calls timing on lev.api.req.${client}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.client.time', responseTime));
        it('calls timing on lev.api.req.${group}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.group.time', responseTime));

        it('calls set from the hot-shots library', () => hsSetStub.should.have.been.called);
        it('calls set on lev.api.req', () => hsSetStub.should.have.been.calledWith('lev.api.req.users', 'user'));
        it('calls set on lev.api.req.search', () => hsSetStub.should.have.been.calledWith('lev.api.req.search.users', 'user'));
        it('calls set on lev.api.req.${dataSet}', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.users', 'user'));
        it('calls set on lev.api.req.${client}', () => hsSetStub.should.have.been.calledWith('lev.api.req.client.users', 'user'));
        it('calls set on lev.api.req.${group}', () => hsSetStub.should.have.been.calledWith('lev.api.req.group.users', 'user'));

        it('calls log.info', () => logInfoStub.should.have.been.called);
        it('calls log.info with request information', () => logInfoStub.should.have.been.calledWith({
          dataSet: 'birth',
          client: 'client',
          groups: ['group'],
          query: {},
          reqType: 'search',
          responseTime: responseTime + 'ms',
          username: 'user'
        }));
      });
    });
  });
});
