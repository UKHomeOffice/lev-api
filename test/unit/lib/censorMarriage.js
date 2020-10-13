'use strict';
const censorMarriage = require('../../../src/lib/censorMarriage');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];
const { marriageData, redactedMarriageDataNotBlocked, redactedMarriageDataBlockedRecord,
  marriageDataBlockedRecord } = require('./test_data/censor-record-test-data');

describe('lib/censorMarriage.js', () => {
  describe('censorMarriage function', () => {
    it('should be a function', () => {
      expect(censorMarriage).to.be.a('function')
    })
    describe('when the record is NOT blocked', () => {
      it('should return the full marriage data if role has full access', () => {
        expect(censorMarriage(marriageData, roleWithFullAccess))
          .to.deep.equal(marriageData);
      })
      it('should return censored record when user does not have full-details role', () => {
        expect(censorMarriage(marriageData, roleWithoutFullAccess))
          .to.deep.equal(redactedMarriageDataNotBlocked);
      })
    })
    describe('when the record is blocked', () => {
      it('should return null on elevant blocked record fields, with a role that has full access', () => {
        expect(censorMarriage(Object.assign({}, redactedMarriageDataBlockedRecord), roleWithFullAccess))
          .to.deep.equal(marriageDataBlockedRecord);
      })
      it('should return null on rlevant blocked record fields, with a role that does not have full access', () => {
        expect(censorMarriage(Object.assign({}, redactedMarriageDataBlockedRecord), roleWithoutFullAccess))
          .to.deep.equal(marriageDataBlockedRecord);
      })
    })
  })
})

