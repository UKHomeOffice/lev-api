const redactData = require('../../../src/lib/redactData');
const { marriageData, redactedMarriageData, deathData, redactedDeathData } = require('./test_data/redactTestData')
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];

describe('lib/redactData.js', () => {
  describe('redactData function', () => {
    it('should be a function', () => {
      expect(redactData).to.be.a('function')
    })
    describe('death dataset', () => {
      it('should return the death data if role has full access', () => {
        expect(redactData(Object.assign({}, deathData), roleWithFullAccess, 'death')).to.deep.equal(deathData);
      })
      it('should return redacted death data if role has not got full access', () => {
        expect(redactData(Object.assign({}, deathData), roleWithoutFullAccess, 'death')).to.deep.equal(redactedDeathData);
      })
      it('should not have a coroner property', () => {
        expect(redactData(Object.assign({}, deathData), roleWithoutFullAccess, 'death'))
          .not.to.have.property('coroner');
      })
      it('should only have the following keys', () => {
        expect(redactData(Object.assign({}, deathData), roleWithoutFullAccess, 'death'))
          .to.have.keys('date', 'deceased', 'id', 'registrar', 'status')
      })
    })
    describe('marriage dataset', () => {
      it('should return the marriage data if role has full access', () => {
        expect(redactData(Object.assign({}, marriageData), roleWithFullAccess, 'marriage'))
          .to.deep.equal(marriageData);
      })
      it('should return redacted marriage data if role has not got full access', () => {
        expect(redactData(Object.assign({}, marriageData), roleWithoutFullAccess, 'marriage'))
          .to.deep.equal(redactedMarriageData);
      })
      it('should not have a fatherOfBride property', () => {
        expect(redactData(Object.assign({}, marriageData), roleWithoutFullAccess, 'marriage'))
          .not.to.have.property('fatherOfBride');
      })
      it('should only have the following keys', () => {
        expect(redactData(Object.assign({}, marriageData), roleWithoutFullAccess, 'marriage'))
          .to.have.keys('id', 'dateOfMarriage', 'bride', 'groom', 'placeOfMarriage', 'registrar', 'status')
      })
    })
    describe('dataset not available', () => {
      it('should throw error when dataset is not available', () =>{
        expect(() => redactData(Object.assign({}, marriageData), roleWithoutFullAccess, 'non-existent-dataset'))
          .to.throw(Error,'Dataset not found');
      })
    })
  })
})
