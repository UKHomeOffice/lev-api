'use strict';
const { censorMarriage } = require('../../../src/lib/censorRecords');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];
const marriageData = {
  id: 5000,
  entryNumber: 12345,
  dateOfMarriage: "2020-09-23",
  placeOfMarriage: {
    address: "3 Road to Hell St",
    parish: "Some Parish",
    short: "3 Road to Hell"
  },
  registrar: {
    signature: "Registrar Signature",
    designation: "Registrar Designation",
    superintendentSignature: "Superintendent Signature",
    superintendentDesignation: "Superintendent Designation",
    district: "District City",
    administrativeArea: "Adminshire"
  },
  groom: {
    prefix: "Dr",
    forenames: "Victor",
    surname: "Von Doom",
    suffix: "Ph.D",
    age: 31,
    occupation: "Supervillain",
    retired: false,
    address: "Somewhere in Latveria",
    aliases: [{
      prefix: "Mr",
      forenames: "Secret",
      surname: "Identity",
      suffix: "Esq"
    }],
    condition: "Single",
    signature: "Groom Signature",
    signatureIsMark: false
  },
  bride: {
    prefix: "Dr",
    forenames: "Lilith",
    surname: "Sternin",
    suffix: null,
    age: 29,
    occupation: "Psychiatrist",
    retired: false,
    address: "Somewhere in Boston",
    aliases: [],
    condition: "Divorced",
    signature: "Bride Signature",
    signatureIsMark: false
  },
  fatherOfGroom: {
    forenames: "FATHER",
    surname: "GROOM",
    occupation: "Former Teacher",
    retired: true,
    designation: "Married",
    deceased: false
  },
  fatherOfBride: {
    forenames: "FATHER",
    surname: "BRIDE",
    occupation: "Shop Owner",
    retired: true,
    designation: "Partner of widow",
    deceased: true
  },
  witness1: {
    signature: "Witness 1 Signature",
    signatureIsMark: false
  },
  witness2: {
    signature: "Witness 2 Signature",
    signatureIsMark: false
  },
  witness3: {
    signature: "Witness 3 Signature",
    signatureIsMark: true
  },
  witness4: {
    signature: "Witness 4 Signature",
    signatureIsMark: false
  },
  witness5: {
    signature: "Witness 5 Signature",
    signatureIsMark: false
  },
  witness6: {
    signature: "Witness 6 Signature",
    signatureIsMark: true
  },
  witness7: {
    signature: "Witness 7 Signature",
    signatureIsMark: false
  },
  witness8: {
    signature: "Witness 8 Signature",
    signatureIsMark: true
  },
  witness9: {
    signature: "Witness 9 Signature",
    signatureIsMark: false
  },
  witness10: {
    signature: "Witness 10 Signature",
    signatureIsMark: true
  },
  witness11: {
    signature: "Witness 11 Signature",
    signatureIsMark: false
  },
  witness12: {
    signature: "Witness 12 Signature",
    signatureIsMark: true
  },

  minister1: {
    signature: "Minister 1 Signature",
    designation: "Minister 1 Designation"
  },
  minister2: {
    signature: "Minister 1 Signature",
    designation: "Minister 1 Designation"
  },
  status: {
    blocked: false,
    marginalNote: "Marginal Correction",
  },
  previousRegistration: undefined,
  nextRegistration: undefined,
}

const redactedMarriageDataNotBlocked = {
  id: 5000,
  entryNumber: null,
  dateOfMarriage: "2020-09-23",
  placeOfMarriage: {
    address: "3 Road to Hell St",
    parish: "Some Parish",
    short: "3 Road to Hell"
  },
  registrar: {
    signature: null,
    designation: null,
    superintendentSignature: null,
    superintendentDesignation: null,
    district: "District City",
    administrativeArea: "Adminshire"
  },
  groom: {
    prefix: null,
    forenames: "Victor",
    surname: "Von Doom",
    suffix: null,
    age: null,
    occupation: null,
    retired: null,
    address: "Somewhere in Latveria",
    aliases: [],
    condition: null,
    signature: null,
    signatureIsMark: null
  },
  bride: {
    prefix: null,
    forenames: "Lilith",
    surname: "Sternin",
    suffix: null,
    age: null,
    occupation: null,
    retired: null,
    address: "Somewhere in Boston",
    aliases: [],
    condition: null,
    signature: null,
    signatureIsMark: null
  },
  fatherOfGroom: {
    forenames: null,
    surname: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  fatherOfBride: {
    forenames: null,
    surname: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  witness1: {
    signature: null,
    signatureIsMark: null
  },
  witness2: {
    signature: null,
    signatureIsMark: null
  },
  witness3: {
    signature: null,
    signatureIsMark: null
  },
  witness4: {
    signature: null,
    signatureIsMark: null
  },
  witness5: {
    signature: null,
    signatureIsMark: null
  },
  witness6: {
    signature: null,
    signatureIsMark: null
  },
  witness7: {
    signature: null,
    signatureIsMark: null
  },
  witness8: {
    signature: null,
    signatureIsMark: null
  },
  witness9: {
    signature: null,
    signatureIsMark: null
  },
  witness10: {
    signature: null,
    signatureIsMark: null
  },
  witness11: {
    signature: null,
    signatureIsMark: null
  },
  witness12: {
    signature: null,
    signatureIsMark: null
  },

  minister1: {
    signature: null,
    designation: null
  },
  minister2: {
    signature: null,
    designation: null
  },
  status: {
    blocked: false,
    marginalNote: "Marginal Correction",
  },
  previousRegistration: undefined,
  nextRegistration: undefined,
}

const redactedMarriageDataBlockedRecord = {
  ...marriageData,
  status: {
    ...marriageData.status,
    blocked: true
  }
}

const marriageDataBlockedRecord = {
  id: 5000,
  entryNumber: null,
  dateOfMarriage: null,
  placeOfMarriage: {
    address: null,
    parish: null,
    short: null
  },
  registrar: {
    signature: null,
    designation: null,
    superintendentSignature: null,
    superintendentDesignation: null,
    district: null,
    administrativeArea: null
  },
  groom: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    age: null,
    occupation: null,
    retired: null,
    address: null,
    aliases: [],
    condition: null,
    signature: null,
    signatureIsMark: null
  },
  bride: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    age: null,
    occupation: null,
    retired: null,
    address: null,
    aliases: [],
    condition: null,
    signature: null,
    signatureIsMark: null
  },
  fatherOfGroom: {
    forenames: null,
    surname: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  fatherOfBride: {
    forenames: null,
    surname: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  witness1: {
    signature: null,
    signatureIsMark: null
  },
  witness2: {
    signature: null,
    signatureIsMark: null
  },
  witness3: {
    signature: null,
    signatureIsMark: null
  },
  witness4: {
    signature: null,
    signatureIsMark: null
  },
  witness5: {
    signature: null,
    signatureIsMark: null
  },
  witness6: {
    signature: null,
    signatureIsMark: null
  },
  witness7: {
    signature: null,
    signatureIsMark: null
  },
  witness8: {
    signature: null,
    signatureIsMark: null
  },
  witness9: {
    signature: null,
    signatureIsMark: null
  },
  witness10: {
    signature: null,
    signatureIsMark: null
  },
  witness11: {
    signature: null,
    signatureIsMark: null
  },
  witness12: {
    signature: null,
    signatureIsMark: null
  },

  minister1: {
    signature: null,
    designation: null
  },
  minister2: {
    signature: null,
    designation: null
  },
  status: {
    blocked: true,
    marginalNote: null
  },
  previousRegistration: undefined,
  nextRegistration: undefined,
}

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
      it('should return null on relevant blocked record fields, with a role that has full access', () => {
        expect(censorMarriage(Object.assign({}, redactedMarriageDataBlockedRecord), roleWithFullAccess))
          .to.deep.equal(marriageDataBlockedRecord);
      })
      it('should return null on relevant blocked record fields, with a role that does not have full access', () => {
        expect(censorMarriage(Object.assign({}, redactedMarriageDataBlockedRecord), roleWithoutFullAccess))
          .to.deep.equal(marriageDataBlockedRecord);
      })
    })
  })
})

