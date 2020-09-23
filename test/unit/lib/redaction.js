'use strict';

const redactDeath = require('../../../src/lib/redaction');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];
const deathData = {
  date: 'date',
  dataToBeRedacted1: 'extraData',
  deceased: {
    forenames: 'forenames',
    surname: 'surname',
    dataToBeRedacted2: 'moreData'
  }
}

describe('lib/redaction.js', () => {
  describe('redactDeath function', () => {
    it('should be a function', () => {
      expect(redactDeath).to.be.a('function')
    })
    it('should return the death data if role has full access', () => {
      expect(redactDeath(deathData, roleWithFullAccess )).to.deep.equal(deathData);
    })
    it('should return redacted death data if role has not got full access', () => {
      expect(redactDeath(deathData, roleWithoutFullAccess)).to.deep.equal(
        { date: 'date', deceased: { forenames: 'forenames', surname: 'surname' } }
        );
    })
  })
})
