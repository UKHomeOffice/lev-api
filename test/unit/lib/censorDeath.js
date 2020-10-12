'use strict';
const censorDeath = require('../../../src/lib/censorDeath');
const roleWithFullAccess = ['full-details'];
const roleWithoutFullAccess = ['births'];

const deathData = {
  id: 1000,
  date: "2020-09-23",
  entryNumber: 0,
  inquestDate: "2020-09-23",
  deceased: {
    prefix: "Mr",
    forenames: "Forename1 Forname2",
    surname: "SURNAME",
    suffix: 'Esquire',
    dateOfBirth: "2020-09-23",
    dateOfDeath: "2020-09-23",
    dateOfDeathQualifier: "On or about",
    ageAtDeath: 20,
    birthplace: "Birth Address",
    deathplace: "Death Address",
    sex: "Indeterminate",
    address: "Current Address",
    occupation: "Rock God",
    retired: false,
    maidenSurname: null,
    causeOfDeath: "Natural causes",
    certifiedBy: "Certification",
    relationshipToPartner: "Bit on side",
    aliases: [{
      type: 'Stage Name',
      prefix: "The Artist Formally Known As...",
      forenames: "Prince Rogers",
      surname: "Prince Rogers Nelson",
      suffix: "Unpronounceable Symbol"
    }, {
      type: 'Undercover',
      prefix: "Agent",
      forenames: "Alec",
      surname: "Trevelyan",
      suffix: "006"
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
    blocked: false,
    correction: "None",
    marginalNote: "None",
    onAuthorityOfRegistrarGeneral: false
  },
  previousRegistration: null,
  nextRegistration: null
}

const deathDataWithPreviousRegistration = {
  ...deathData,
  previousRegistration: {
    ...deathData,
    nextRegistration: null
  }
}

const deathDataWithNextRegistration = {
  ...deathData,
  nextRegistration: {
    ...deathData,
    previousRegistration: null
  }
}

const deathDataBlockedRecord = {
  ...deathData,
  status: {
    ...deathData.status,
    blocked: true
  }
}

const blockedDeathData = {
  id: 1000,
  date: null,
  entryNumber: null,
  inquestDate: null,
  deceased: {
    prefix: null,
    forenames: null,
    surname: null,
    suffix: null,
    dateOfBirth: null,
    dateOfDeath: null,
    dateOfDeathQualifier: null,
    ageAtDeath: null,
    birthplace: null,
    deathplace: null,
    sex: null,
    address: null,
    occupation: null,
    retired: null,
    maidenSurname: null,
    causeOfDeath: null,
    certifiedBy: null,
    relationshipToPartner: null,
    aliases: []
  },
  informant: {
    forenames: null,
    surname: null,
    address: null,
    qualification: null,
    signature: null
  },
  registrar: {
    signature: null,
    designation: null,
    subdistrict: null,
    district: null,
    administrativeArea: null
  },
  coroner: {
    name: null,
    designation: null,
    area: null
  },
  partner: {
    name: null,
    occupation: null,
    retired: null
  },
  father: {
    name: null,
    occupation: null
  },
  mother: {
    name: null,
    occupation: null
  },
  status: {
    blocked: true,
    correction: null,
    marginalNote: null,
    onAuthorityOfRegistrarGeneral: null
  },
  previousRegistration: null,
  nextRegistration: null
}

const redactedDataNotBlocked = {
  id: 1000,
  date: "2020-09-23",
  entryNumber: null,
  inquestDate: null,
  deceased: {
    prefix: null,
    forenames: "Forename1 Forname2",
    surname: "SURNAME",
    suffix: null,
    ageAtDeath: null,
    birthplace: null,
    deathplace: null,
    dateOfBirth: "2020-09-23",
    dateOfDeath: "2020-09-23",
    dateOfDeathQualifier: "On or about",
    sex: "Indeterminate",
    occupation: null,
    retired: null,
    maidenSurname: null,
    causeOfDeath: null,
    certifiedBy: null,
    relationshipToPartner: null,
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
  informant: {
    forenames: null,
    surname: null,
    address: null,
    qualification: null,
    signature: null
  },
  registrar: {
    signature: null,
    designation: null,
    subdistrict: "Subdistrict town",
    district: "District city",
    administrativeArea: "Adminshire"
  },
  coroner: {
    name: null,
    designation: null,
    area: null
  },
  partner: {
    name: null,
    occupation: null,
    retired: null
  },
  father: {
    name: null,
    occupation: null
  },
  mother: {
    name: null,
    occupation: null
  },
  status: {
    blocked: false,
    correction: "None",
    marginalNote: "None",
    onAuthorityOfRegistrarGeneral: null
  },
  previousRegistration: null,
  nextRegistration: null
}

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
          .to.deep.equal(redactedDataNotBlocked);
      })
      it('if there is a previous registration, this previous registration should not have the property nextRegistration', () => {
        expect(censorDeath(Object.assign({}, deathDataWithPreviousRegistration), roleWithFullAccess))
          .to.not.have.deep.property('nextRegistration');
      })
      it('if there is a previous registration, the next registration field should not be null or undefined', () => {
        expect(censorDeath(Object.assign({}, deathDataWithPreviousRegistration), roleWithFullAccess))
          .to.have.deep.property('previousRegistration');
      })
      it('if there is a next registration, this registration should not have the property previousRegistration', () => {
        expect(censorDeath(Object.assign({}, deathDataWithNextRegistration), roleWithFullAccess))
          .to.not.have.deep.property('previousRegistration');
      })
      it('if there is a next registration, the next registration field should not be null or undefined', () => {
        expect(censorDeath(Object.assign({}, deathDataWithNextRegistration), roleWithFullAccess))
          .to.have.deep.property('nextRegistration');
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
