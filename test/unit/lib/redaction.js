'use strict';

const redactDeath = require('../../../src/lib/redaction');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];

const deathData = {
  id: 1000,
  date: "2020-09-23",
  entryNumber: 0,
  inquestDate: "2020-09-23",
  deceased: {
    forenames: "Forename1 Forname2",
    surname: "SURNAME",
    dateOfBirth: "2020-09-23",
    dateOfDeath: "2020-09-23",
    dateOfDeathQualifier: "On or about",
    ageAtDeath: 20,
    birthplace: "Birth Address",
    deathplace: "Death Address",
    sex: "Indeterminate",
    address: "Current Address",
    occupation: "",
    retired: false,
    maidenSurname: null,
    causeOfDeath: "Natural causes",
    certifiedBy: "Certification",
    relationshipToPartner: "Bit on side",
    aliases: [{
      type: 'Stage Name',
      "prefix": "The Artist Formally Known As...",
      "forenames": "Prince Rogers",
      "surname": "Prince Rogers Nelson",
      "suffix": "Unpronounceable Symbol"
    }, {
      type: 'Undercover',
      "prefix": "Agent",
      "forenames": "Alec",
      "surname": "Trevelyan",
      "suffix": "006"
    }]
  },
  informant: {
    forenames: "Informant Forename1 Informant Forename2",
    surname: "Informant Surname",
    address: "Informant Address",
    qualification: "Confidential Informant",
    signature: "Here is a signature"
  },
  registrar: {
    signature: "Registrar signature",
    designation: "Registrar",
    subdistrict: "Subdistrict town",
    district: "District city",
    administrativeArea: "Adminshire"
  },
  coroner: {
    name: "Informy McInformface",
    designation: "Coroner",
    area: "Adminshire"
  },
  partner: {
    name: "Partner name",
    occupation: "Partner occupation",
    retired: true
  },
  father: {
    name: "Father name",
    occupation: "Father Occupation"
  },
  mother: {
    name: "Mother name",
    occupation: "Mother occupation"
  },
  status: {
    refer: false,
    fatherAdded: 'Father added',
    subsequentlyMarried: 'Subsequently married',
    fatherModified: 'Father modified',
    replaced: 'Replacement registration',
    corrected: 'None',
    courtOrderInPlace: 'Court order in place',
    courtOrderRevoked: 'Court order revoked'
  },
  previousRegistration: {
    date: null,
    systemNumber: null
  },
  nextRegistration: {
    date: null,
    systemNumber: null
  }
}

const redactedData = {
  id: 1000,
  date: "2020-09-23",
  deceased: {
    forenames: "Forename1 Forname2",
    surname: "SURNAME",
    dateOfBirth: "2020-09-23",
    dateOfDeath: "2020-09-23",
    dateOfDeathQualifier: "On or about",
    sex: "Indeterminate",
    address: "Current Address",
    aliases: [{
      type: 'Stage Name',
      "prefix": "The Artist Formally Known As...",
      "forenames": "Prince Rogers",
      "surname": "Prince Rogers Nelson",
      "suffix": "Unpronounceable Symbol"
    }, {
      type: 'Undercover',
      "prefix": "Agent",
      "forenames": "Alec",
      "surname": "Trevelyan",
      "suffix": "006"
    }]
  },
  registrar: {
    subdistrict: "Subdistrict town",
    district: "District city",
    administrativeArea: "Adminshire"
  },
  status: {
    refer: false,
    fatherAdded: 'Father added',
    subsequentlyMarried: 'Subsequently married',
    fatherModified: 'Father modified',
    replaced: 'Replacement registration',
    corrected: 'None',
    courtOrderInPlace: 'Court order in place',
    courtOrderRevoked: 'Court order revoked'
  },
}

describe('lib/redaction.js', () => {
  describe('redactDeath function', () => {
    it('should be a function', () => {
      expect(redactDeath).to.be.a('function')
    })
    it('should return the death data if role has full access', () => {
      expect(redactDeath(Object.assign({}, deathData), roleWithFullAccess)).to.deep.equal(deathData);
    })
    it('should return redacted death data if role has not got full access', () => {
      expect(redactDeath(Object.assign({}, deathData), roleWithoutFullAccess)).to.deep.equal(redactedData);
    })
    it('should not have a coroner property', () => {
      expect(redactDeath(Object.assign({}, deathData), roleWithoutFullAccess))
        .not.to.have.property('coroner');
    })
    it('should only have the following keys', () => {
      expect(redactDeath(Object.assign({}, deathData), roleWithoutFullAccess))
        .to.have.keys('date', 'deceased', 'id', 'registrar', 'status')
    })
  })
})
