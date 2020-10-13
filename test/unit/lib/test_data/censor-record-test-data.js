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
  previousRegistration: undefined,
  nextRegistration: undefined
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
  previousRegistration: undefined,
  nextRegistration: undefined
}

const redactedDeathDataNotBlocked = {
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
  previousRegistration: undefined,
  nextRegistration: undefined
}

const marriageData = {
  id: 5000,
  entryNumber: 12345,
  dateOfMarriage: "2020-09-23",
  placeOfMarriage: {
    address: "3 Road to Hell St",
    parish: "Some Parish",
    short: false
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
    correction: false,
    onAuthorityOfRegistrarGeneral: "Err..."
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
    short: null
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
    correction: false,
    onAuthorityOfRegistrarGeneral: null

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
    marginalNote: null,
    correction: null,
    onAuthorityOfRegistrarGeneral: null

  },
  previousRegistration: undefined,
  nextRegistration: undefined,
}

module.exports = {
  deathData, 
  deathDataBlockedRecord, 
  blockedDeathData, 
  redactedDeathDataNotBlocked, 
  marriageData,
  redactedMarriageDataNotBlocked,
  redactedMarriageDataBlockedRecord,
  marriageDataBlockedRecord
}
