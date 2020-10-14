'use strict';
const {censorPartnership} = require('../../../src/lib/censorRecords');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];

const partnershipData = {
  id: 3000,
  dateOfPartnership: "2020-09-23",
  placeOfPartnership: {
    address: "Address of Place of Partnership",
    short: "Place of Partnership"
  },
  registrar: {
    signature: "Regsitrar Signature"
  },
  partner1: {
    prefix: "Mr",
    forenames: "PARTNER",
    surname: "ONE",
    suffix: "ESQ",
    address: "PARTNER ONE ADDRESS",
    dob: "1987-09-13",
    sex: "Male",
    aliases: [],
    occupation: "Hotelier",
    retired: false,
    condition: "Single",
    signature: "Partner 1 Signature"
  },
  partner2: {
    prefix: "Dr",
    forenames: "PARTNER",
    surname: "TWO",
    suffix: "MD",
    address: "PARTNER TWO ADDRESS",
    dob: "1989-02-10",
    sex: "Male",
    aliases: [],
    occupation: "Doctor",
    retired: false,
    condition: "Single",
    signature: "Partner 2 Signature"
  },
  fatherOfPartner1: {
    surname: "ONE",
    forenames: "FATHER",
    occupation: "International Man of Mystery",
    retired: true,
    designation: "Unknown",
    deceased: false
  },
  motherOfPartner1: {
    surname: "ONE",
    forenames: "MOTHER",
    occupation: "Shop Manager",
    retired: false,
    designation: "Unknown",
    deceased: false
  },
  fatherOfPartner2: {
    surname: "TWO",
    forenames: "FATHER",
    occupation: "Butcher",
    retired: true,
    designation: "N/A",
    deceased: true
  },
  motherOfPartner2: {
    surname: "TWO",
    forenames: "MOTHER",
    occupation: "Market Trader",
    retired: true,
    designation: "N/A",
    deceased: false
  },
  witness1: {
    signature: "WITNESS 1 SIGNATURE",
    signatureIsMark: false
  },
  witness2: {
    signature: "WITNESS 2 SIGNATURE",
    signatureIsMark: true
  },
  status: {
    blocked: false,
    marginalNote: "MARGINAL NOTE",
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

const redactedPartnershipDataNotBlocked = {
  id: 3000,
  dateOfPartnership: "2020-09-23",
  placeOfPartnership: {
    address: "Address of Place of Partnership",
    short: "Place of Partnership"
  },
  registrar: {
    signature: null
  },
  partner1: {
    prefix: null,
    forenames: "PARTNER",
    surname: "ONE",
    suffix: null,
    address: "PARTNER ONE ADDRESS",
    dob: null,
    sex: null,
    aliases: [],
    occupation: null,
    retired: null,
    condition: null,
    signature: null
  },
  partner2: {
    prefix: null,
    forenames: "PARTNER",
    surname: "TWO",
    suffix: null,
    address: "PARTNER TWO ADDRESS",
    dob: null,
    sex: null,
    aliases: [],
    occupation: null,
    retired: null,
    condition: null,
    signature: null
  },
  fatherOfPartner1: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  motherOfPartner1: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  fatherOfPartner2: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  motherOfPartner2: {
    surname: null,
    forenames: null,
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
  status: {
    blocked: false,
    marginalNote: "MARGINAL NOTE",
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

const partnershipDataBlockedRecord = {
  ...partnershipData,
  status: {
    ...partnershipData.status,
    blocked: true
  }
}

const blockedPartnerShipData = {
  id: 3000,
  dateOfPartnership: null,
  placeOfPartnership: {
    address: null,
    short: null
  },
  registrar: {
    signature: null
  },
  partner1: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    address: null,
    dob: null,
    sex: null,
    aliases: [],
    occupation: null,
    retired: null,
    condition: null,
    signature: null
  },
  partner2: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    address: null,
    dob: null,
    sex: null,
    aliases: [],
    occupation: null,
    retired: null,
    condition: null,
    signature: null
  },
  fatherOfPartner1: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  motherOfPartner1: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  fatherOfPartner2: {
    surname: null,
    forenames: null,
    occupation: null,
    retired: null,
    designation: null,
    deceased: null
  },
  motherOfPartner2: {
    surname: null,
    forenames: null,
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
  status: {
    blocked: true,
    marginalNote: null,
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

describe('lib/censorPartnership.js', () => {
  describe('censorPartnership function', () => {
    it('should be a function', () => {
      expect(censorPartnership).to.be.a('function')
    })
    describe('when record is NOT blocked', () => {
      it('a full record should be returned with the full-details role', () => {
        expect(censorPartnership(partnershipData, roleWithFullAccess))
          .to.deep.equal(partnershipData)
      })
      it('should show a redacted record if the user does not have full-details role', () => {
        expect(censorPartnership(partnershipData, roleWithoutFullAccess))
          .to.deep.equal(redactedPartnershipDataNotBlocked)
      })
    })
    describe('when the record is blocked', () => {
      it('should return null on relevant blocked record fields, with a role that has full access', () => {
        expect(censorPartnership(Object.assign({}, partnershipDataBlockedRecord), roleWithFullAccess))
          .to.deep.equal(blockedPartnerShipData);
      })
      it('should return null on relevant blocked record fields, with a role that does not have full access', () => {
        expect(censorPartnership(Object.assign({}, partnershipDataBlockedRecord), roleWithoutFullAccess))
          .to.deep.equal(blockedPartnerShipData);
      })
    })
  })
})
