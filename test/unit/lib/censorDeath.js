'use strict';
const censorDeath = require('../../../src/lib/censorDeath');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];
const { deathData, deathDataBlockedRecord, blockedDeathData, redactedDeathDataNotBlocked } = require('./test_data/censor-record-test-data')

describe('lib/censorDeath.js', () => {
  describe('censorDeath function', () => {
    it('should be a function', () => {
      expect(censorDeath).to.be.a('function')
    })
    describe('when the record is NOT blocked', () => {
      it('should return the full death data if role has full access', () => {
        expect(censorDeath(Object.assign({}, deathData), roleWithFullAccess))
          .to.deep.equal(deathData);
      })
      it('should return redacted death data if role has not got full access', () => {
        expect(censorDeath(Object.assign({}, deathData), roleWithoutFullAccess))
          .to.deep.equal(redactedDeathDataNotBlocked);
      })
    })
    describe('when the record is blocked', () => {
      it('should return null on relevant blocked record fields, with a role that has full access', () => {
        expect(censorDeath(Object.assign({}, deathDataBlockedRecord), roleWithFullAccess))
          .to.deep.equal(blockedDeathData);
      })
      it('should return null on relevant blocked record fields, with a role that does not have full access', () => {
        expect(censorDeath(Object.assign({}, deathDataBlockedRecord), roleWithoutFullAccess))
          .to.deep.equal(blockedDeathData);
      })
    })
  })
})
