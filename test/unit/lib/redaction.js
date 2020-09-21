'use strict';

const {redactDeath} = require('../../../src/middleware/v1/registration/death');

describe('lib/redaction.js', () => {
  const deathData = {
    date: 'date',
    forenames: 'forenames',
    surname: 'surname',
    dataToBeRedacted1: 'extraData',
    dataToBeRedacted2: 'moreData'
  }

  describe('redactDeath function', () => {
    it('should be a function', () => {
      expect(redactDeath).to.be.a('function')
    })
    it('should return the death data if role has full access', () => {
      expect(redactDeath(deathData, { fullDetails: true } )).to.equal(deathData);
    })
    it('should return redacted death data if role has not got full access', () => {
      expect(redactDeath(deathData, { fullDetails: false })).to.deep.equal(
        { date: 'date', forenames: 'forenames', surname: 'surname' }
        );
    })
  })
})
