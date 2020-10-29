'use strict';
const { censorBirthV1 } = require('../../../src/lib/censorRecords');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['death'];

const birthData = {
  id: 12345,
  date: "2020-09-23",
  entryNumber: 0,
  registrar: {
    signature: "Registrar signature",
    designation: "Registrar",
    superintendentSignature: "Superintendent Signature",
    superintendentDesignation: "Superintendent Designation",
    subdistrict: "Subdistrict town",
    district: "District city",
    administrativeArea: "Adminshire"
  },
  informant1: {
    forenames: "Informant Forename1",
    surname: "Informant1 Surname",
    address: "Informant1 Address",
    qualification: "Confidential Informant",
    signature: "Here is a signature",
    signatureIsMark: false
  },
  informant2: {
    forenames: "Informant Forename2",
    surname: "Informant2 Surname",
    address: "Informant2 Address",
    qualification: "Not a Confidential Informant",
    signature: "Here is a signature",
    signatureIsMark: false
  },
  child: {
    originalPrefix: "Master",
    prefix: "Mr",
    forenames: "Expensive",
    originalForenames: "Inconvenient",
    surname: "Mistake",
    originalSuffix: "SUFFIX 1",
    suffix: "SUFFIX 2",
    dateOfBirth: "2020-09-23",
    sex: "Male",
    birthplace: "Bath"
  },
  mother: {
    prefix: "Ms",
    forenames: "MOTHER FORENAME",
    surname: "MOTHER SURNAME",
    suffix: "N/A",
    birthplace: "Exeter",
    occupation: "Teacher",
    aliases: [],
    address: "ADDRESS 1",
    maidenSurname: "MAIDEN SURNAME",
    marriageSurname: "MARRIAGE SURNAME"
  },
  father: {
    prefix: "MR",
    forenames: "FATHER FORENAME",
    surname: "FATHER SURNAME",
    suffix: "ESQ",
    birthplace: "BRISTOL",
    occupation: "Cleaner",
    aliases: [],
    deceased: false
  },
  dateOfDeclaration: "2020-10-23",
  dateOfStatutoryDeclarationOfParentage: "2020-10-23",
  statutoryDeclarationOfParentage: "",
  dateOfNameUpdate: "2020-10-24",
  status: {
    blocked: false,
    marginalNote: "MARGINAL NOTE",
    cancelled: false,
    correction: "None",
    nameUpdate: "None",
    onAuthorityOfRegistrarGeneral: false,
    potentiallyFictitious: false,
    praOrCourtOrder: "None",
    reregistration: "None"
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

const redactedBirthDataNotBlocked = {
  id: 12345,
  date: "2020-09-23",
  entryNumber: null,
  registrar: {
    signature: null,
    designation: null,
    superintendentSignature: null,
    superintendentDesignation: null,
    subdistrict: "Subdistrict town",
    district: "District city",
    administrativeArea: "Adminshire"
  },
  informant1: {
    forenames: null,
    surname: null,
    address: null,
    qualification: "Confidential Informant",
    signature: null,
    signatureIsMark: null
  },
  informant2: {
    forenames: null,
    surname: null,
    address: null,
    qualification: "Not a Confidential Informant",
    signature: null,
    signatureIsMark: null
  },
  child: {
    originalPrefix: null,
    prefix: null,
    forenames: "Expensive",
    originalForenames: null,
    surname: "Mistake",
    originalSuffix: null,
    suffix: null,
    dateOfBirth: "2020-09-23",
    sex: "Male",
    birthplace: "Bath"
  },
  mother: {
    prefix: null,
    forenames: "MOTHER FORENAME",
    surname: "MOTHER SURNAME",
    suffix: null,
    birthplace: "Exeter",
    occupation: null,
    aliases: [],
    address: null,
    maidenSurname: "MAIDEN SURNAME",
    marriageSurname: "MARRIAGE SURNAME"
  },
  father: {
    prefix: null,
    forenames: "FATHER FORENAME",
    surname: "FATHER SURNAME",
    suffix: null,
    birthplace: "BRISTOL",
    occupation: null,
    aliases: [],
    deceased: null
  },
  dateOfDeclaration: null,
  dateOfStatutoryDeclarationOfParentage: null,
  statutoryDeclarationOfParentage: null,
  dateOfNameUpdate: null,
  status: {
    blocked: false,
    marginalNote: "MARGINAL NOTE",
    cancelled: false,
    correction: "None",
    nameUpdate: "None",
    onAuthorityOfRegistrarGeneral: false,
    potentiallyFictitious: false,
    praOrCourtOrder: "None",
    reregistration: "None"
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

const birthDataBlockedRecord = {
  ...birthData,
  status: {
    ...birthData.status,
    blocked: true
  }
}

const blockedRecordBirthData = {
  id: 12345,
  date: null,
  entryNumber: null,
  registrar: {
    signature: null,
    designation: null,
    superintendentSignature: null,
    superintendentDesignation: null,
    subdistrict: null,
    district: null,
    administrativeArea: null
  },
  informant1: {
    forenames: null,
    surname: null,
    address: null,
    qualification: null,
    signature: null,
    signatureIsMark: null
  },
  informant2: {
    forenames: null,
    surname: null,
    address: null,
    qualification: null,
    signature: null,
    signatureIsMark: null
  },
  child: {
    originalPrefix: null,
    prefix: null,
    forenames: null,
    originalForenames: null,
    surname: null,
    originalSuffix: null,
    suffix: null,
    dateOfBirth: null,
    sex: null,
    birthplace: null
  },
  mother: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    birthplace: null,
    occupation: null,
    aliases: [],
    address: null,
    maidenSurname: null,
    marriageSurname: null
  },
  father: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    birthplace: null,
    occupation: null,
    aliases: [],
    deceased: null
  },
  dateOfDeclaration: null,
  dateOfStatutoryDeclarationOfParentage: null,
  statutoryDeclarationOfParentage: null,
  dateOfNameUpdate: null,
  status: {
    blocked: true,
    marginalNote: null,
    cancelled: null,
    correction: null,
    nameUpdate: null,
    onAuthorityOfRegistrarGeneral: null,
    potentiallyFictitious: null,
    praOrCourtOrder: null,
    reregistration: null
  },
  previousRegistration: undefined,
  nextRegistration: undefined
}

describe('censor birth function', () => {
  it('should be a function', () => {
    expect(censorBirthV1).to.be.a('function')
  })
  describe('when the record is NOT blocked', () => {
    it('should return the full birth data if role has full access', () => {
      expect(censorBirthV1(Object.assign({}, birthData), roleWithFullAccess))
        .to.deep.equal(birthData)
      })
    it('should return redacted birth data if the user does NOT have full access', () => {
      expect(censorBirthV1(Object.assign({}, birthData), roleWithoutFullAccess))
        .to.deep.equal(redactedBirthDataNotBlocked)
    })
    describe('when the record IS blocked', () => {
      it('should return null on relevant blocked record fields, with a role that has full access', () => {
        expect(censorBirthV1(Object.assign({},birthDataBlockedRecord), roleWithFullAccess))
          .to.deep.equal(blockedRecordBirthData)
      })
      it('should return null on relevant blocked record fields, with a role that has NOT got full access', () => {
        expect(censorBirthV1(Object.assign({},birthDataBlockedRecord), roleWithoutFullAccess))
          .to.deep.equal(blockedRecordBirthData)
      })
    })
  })
})
