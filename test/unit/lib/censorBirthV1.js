'use strict';
const { censorBirth } = require('../../../src/lib/censorRecords');
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

const redactedBirthData = {
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

describe('censor birth function', () => {
  it('should be a function', () => {
    expect(censorBirth).to.be.a('function')
  })
  describe('when the record is NOT blocked', () => {
    it('should return the full birth data if role has full access', () => {
      expect(censorBirth(Object.assign({}, birthData), roleWithFullAccess))
        .to.deep.equal(birthData)
      })
    it('should return redacted birth data if the user does NOT have full access', () => {
      expect(censorBirth(Object.assign({}, birthData), roleWithoutFullAccess))
        .to.deep.equal(redactedBirthData)
    })
  })
})
