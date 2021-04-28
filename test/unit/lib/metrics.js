'use strict';

const proxyquire = require('proxyquire');
const moment = require('moment');
const restify = require('lev-restify');
const register = restify.metrics.promClient.register;
const hsIncrementStub = sinon.stub();
const hsSetStub = sinon.stub();
const hsTimingStub = sinon.stub();
const logInfoStub = sinon.stub();
const metrics = proxyquire('../../../src/lib/metrics', {
  'lev-restify': Object.assign({}, restify, {
    metrics: Object.assign({}, restify.metrics, {
      statsdClient: {
        increment: hsIncrementStub,
        set: hsSetStub,
        timing: hsTimingStub,
        unique: hsSetStub
      }
    })
  }),
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
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client')).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'my-client')).to.throw(ReferenceError));
    });
  });

  describe('when called with four arguments', () => {
    describe('that IS NOT an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', {})).to.throw(TypeError));
    });

    describe('that IS an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'])).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'my-client', ['group'])).to.throw(ReferenceError));
    });
  });

  describe('when called with five arguments', () => {
    describe('that IS NOT an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], {})).to.throw(TypeError));
    });

    describe('that IS an array', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'])).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'])).to.throw(ReferenceError));
    });
  });

  describe('when called with six arguments', () => {
    describe('that IS NOT a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], {})).to.throw(TypeError));
    });

    describe('that IS a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime)).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime)).to.throw(ReferenceError));
    });
  });

  describe('when called with seven arguments', () => {
    describe('that IS NOT a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, {})).to.throw());
      it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, {})).to.throw(TypeError));
    });

    describe('that IS a time', () => {
      it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime)).to.throw());
      it('throws a ReferenceError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime)).to.throw(ReferenceError));
    });
  });
};

describe('lib/metrics.js', () => {
  describe('lookup()', () => {
    const subject = metrics.lookup;

    it('is a function', () => (typeof subject).should.equal('function'));
    it('takes nine arguments', () => subject.length.should.equal(9));

    requestValidationTest(subject);

    describe('when called with nine arguments', () => {
      describe('that IS NOT a number', () => {
        it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, {})).to.throw());
        it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, {})).to.throw(TypeError));
      });

      describe('that IS a number', () => {
        describe('that IS NOT an integer', () => {
          it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, 3.14)).to.throw());
          it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, 3.14)).to.throw(TypeError));
        });

        describe('that IS an integer', () => {
          describe('that IS negative', () => {
            it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, -1)).to.throw());
            it('throws a RangeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, -1)).to.throw(RangeError));
          });

          describe('that IS NOT negative', () => {
            before(() => {
              resetStubs();
              register.resetMetrics();
              subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, 1, true);
            });

            it('calls increment from the hot-shots library', () => hsIncrementStub.should.have.been.called);
            it('calls increment on lev.api.req', () => hsIncrementStub.should.have.been.calledWith('lev.api.req'));
            it('calls increment on lev.api.req.lookup', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.lookup'));
            it('calls increment on lev.api.req.${dataSet}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth'));
            it('calls increment on lev.api.req.${client}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.my-client'));
            it('calls increment on lev.api.req.${dataSet}.lookup', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth.lookup'));
            it('calls increment on lev.api.req.${group}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.group'));
            it('calls increment on lev.api.req.${dataSet}.blocked', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth.blocked'));


            it('calls timing from the hot-shots library', () => hsTimingStub.should.have.been.called);
            it('calls timing on lev.api.req', () => hsTimingStub.should.have.been.calledWith('lev.api.req.time', responseTime));
            it('calls timing on lev.api.req.lookup', () => hsTimingStub.should.have.been.calledWith('lev.api.req.lookup.time', responseTime));
            it('calls timing on lev.api.req.${dataSet}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.time', responseTime));
            it('calls timing on lev.api.req.${client}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.my-client.time', responseTime));
            it('calls timing on lev.api.req.${dataSet}.lookup', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.lookup.time', responseTime));
            it('calls timing on lev.api.req.${group}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.group.time', responseTime));

            it('calls set from the hot-shots library', () => hsSetStub.should.have.been.called);
            it('calls set on lev.api.req', () => hsSetStub.should.have.been.calledWith('lev.api.req.users', 'user'));
            it('calls set on lev.api.req.lookup', () => hsSetStub.should.have.been.calledWith('lev.api.req.lookup.users', 'user'));
            it('calls set on lev.api.req.${dataSet}', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.users', 'user'));
            it('calls set on lev.api.req.${client}', () => hsSetStub.should.have.been.calledWith('lev.api.req.my-client.users', 'user'));
            it('calls set on lev.api.req.${dataSet}.lookup', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.lookup.users', 'user'));
            it('calls set on lev.api.req.${group}', () => hsSetStub.should.have.been.calledWith('lev.api.req.group.users', 'user'));

            it('increments the Prometheus counter lev_api_req', () => register.getSingleMetricAsString('lev_api_req').should.match(/[^0-9]1$/));
            it('increments the Prometheus counter lev_api_req_birth', () => register.getSingleMetricAsString('lev_api_req_birth').should.match(/[^0-9]1$/));
            it('increments the Prometheus counter lev_api_req_client', () => register.getSingleMetricAsString('lev_api_req_myclient').should.match(/[^0-9]1$/));
            it('increments the Prometheus counter lev_api_req_group', () => register.getSingleMetricAsString('lev_api_req_group').should.match(/[^0-9]1$/));
            it('increments the Prometheus counter lev_api_req_lookup', () => register.getSingleMetricAsString('lev_api_req_lookup').should.match(/[^0-9]1$/));
            it('increments the Prometheus counter lev_api_req_birth_lookup', () => register.getSingleMetricAsString('lev_api_req_birth_lookup').should.match(/\D1$/));
            it('increments the Prometheus counter lev_api_req_birth_blocked', () => register.getSingleMetricAsString('lev_api_req_birth_blocked').should.match(/ 1$/));


            it('calls log.info', () => logInfoStub.should.have.been.called);
            it('calls log.info with request information', () => logInfoStub.should.have.been.calledWith({
              dataSet: 'birth',
              client: 'my-client',
              groups: ['group'],
              id: 1,
              reqType: 'lookup',
              responseTime: responseTime + 'ms',
              username: 'user'
            }));
          });
          describe('non-blocked record', () => {
            before(() => {
              resetStubs();
              register.resetMetrics();
              subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, 1, false);
            });
            it('does not increment on lev.api.req.${dataSet}.blocked', () => hsIncrementStub.should.not.have.been.calledWith('lev.api.req.birth.blocked'));
            it('does not increment the Prometheus counter lev_api_req_birth_blocked', () => register.getSingleMetricAsString('lev_api_req_birth_blocked').should.match(/ 0$/));
          })
        });
      });
    });
  });

  describe('search()', () => {
    const subject = metrics.search;

    it('is a function', () => (typeof subject).should.equal('function'));
    it('takes eight arguments', () => subject.length.should.equal(8));

    requestValidationTest(subject);

    describe('when called with eight arguments', () => {
      describe('that IS NOT an object', () => {
        it('throws an error', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, '')).to.throw());
        it('throws a TypeError', () => expect(() => subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, '')).to.throw(TypeError));
      });

      describe('that IS an object', () => {
        before(() => {
          resetStubs();
          register.resetMetrics();
          subject('birth', 'user', 'my-client', ['group'], ['role'], startTime, finishTime, { surname: 'smith', forenames: 'joan' });
        });

        it('calls increment from the hot-shots library', () => hsIncrementStub.should.have.been.called);
        it('calls increment on lev.api.req', () => hsIncrementStub.should.have.been.calledWith('lev.api.req'));
        it('calls increment on lev.api.req.search', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.search'));
        it('calls increment on lev.api.req.${dataSet}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth'));
        it('calls increment on lev.api.req.${client}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.my-client'));
        it('calls increment on lev.api.req.${dataSet}.search', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.birth.search'));
        it('calls increment on lev.api.req.${group}', () => hsIncrementStub.should.have.been.calledWith('lev.api.req.group'));

        it('calls timing from the hot-shots library', () => hsTimingStub.should.have.been.called);
        it('calls timing on lev.api.req', () => hsTimingStub.should.have.been.calledWith('lev.api.req.time', responseTime));
        it('calls timing on lev.api.req.search', () => hsTimingStub.should.have.been.calledWith('lev.api.req.search.time', responseTime));
        it('calls timing on lev.api.req.${dataSet}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.time', responseTime));
        it('calls timing on lev.api.req.${client}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.my-client.time', responseTime));
        it('calls timing on lev.api.req.${dataSet}.search', () => hsTimingStub.should.have.been.calledWith('lev.api.req.birth.search.time', responseTime));
        it('calls timing on lev.api.req.${group}', () => hsTimingStub.should.have.been.calledWith('lev.api.req.group.time', responseTime));

        it('calls set from the hot-shots library', () => hsSetStub.should.have.been.called);
        it('calls set on lev.api.req', () => hsSetStub.should.have.been.calledWith('lev.api.req.users', 'user'));
        it('calls set on lev.api.req.search', () => hsSetStub.should.have.been.calledWith('lev.api.req.search.users', 'user'));
        it('calls set on lev.api.req.${dataSet}', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.users', 'user'));
        it('calls set on lev.api.req.${client}', () => hsSetStub.should.have.been.calledWith('lev.api.req.my-client.users', 'user'));
        it('calls set on lev.api.req.${dataSet}.search', () => hsSetStub.should.have.been.calledWith('lev.api.req.birth.search.users', 'user'));
        it('calls set on lev.api.req.${group}', () => hsSetStub.should.have.been.calledWith('lev.api.req.group.users', 'user'));

        it('increments the Prometheus counter lev_api_req', () => register.getSingleMetricAsString('lev_api_req').should.match(/[^0-9]1$/));
        it('increments the Prometheus counter lev_api_req_birth', () => register.getSingleMetricAsString('lev_api_req_birth').should.match(/[^0-9]1$/));
        it('increments the Prometheus counter lev_api_req_client', () => register.getSingleMetricAsString('lev_api_req_myclient').should.match(/[^0-9]1$/));
        it('increments the Prometheus counter lev_api_req_group', () => register.getSingleMetricAsString('lev_api_req_group').should.match(/[^0-9]1$/));
        it('increments the Prometheus counter lev_api_req_search', () => register.getSingleMetricAsString('lev_api_req_search').should.match(/[^0-9]1$/));
        it('increments the Prometheus counter lev_api_req_birth_search', () => register.getSingleMetricAsString('lev_api_req_birth_search').should.match(/[^0-9]1$/));

        it('calls log.info', () => logInfoStub.should.have.been.called);
        it('calls log.info with request information', () => logInfoStub.should.have.been.calledWith({
          dataSet: 'birth',
          client: 'my-client',
          groups: ['group'],
          query: {
            surname: 'smith',
            forenames: 'joan'
          },
          reqType: 'search',
          responseTime: responseTime + 'ms',
          roles: ['role'],
          username: 'user'
        }));
      });
    });
  });
});
