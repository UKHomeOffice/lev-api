const marriageData = {
  id: 97427491,
  dateOfMarriage: "2020-05-01",
  entryNumber: 1,
  bride: {
    forenames: "MacGregor",
    surname: "Willow",
    address: "3 Scotland Road",
    age: 37,
    occupation: 'Police Officer',
    retired: 'false',
    condition: 'single',
    signature: 'Groom Signature'
  },
  groom: {
    forenames: "Neil",
    surname: "Howie",
    address: "5 England Gardens",
    age: 28,
    occupation: 'Barmaid',
    retired: 'false',
    condition: 'single',
    signature: 'Bride Signature'
  },
  placeOfMarriage: {
    address: "15 Wicker Place",
    parish: "Summerisle"
  },
  registrar: {
    signature: "Registrar Signature",
    designation: "Registrar",
    superintendentSignature: "Superintendent Signature",
    superintendentDesignation: "Superintendent",
    district: "District Town",
    administrativeArea: "Some City",
  },
  fatherOfGroom: {
    surname: "Howie",
    forenames: "Stephen",
    occupation: "Estate Agent",
    retired: true,
    designation: "Father of Groom",
    deceased: false
  },
  fatherOfBride: {
    surname: "MacGregor",
    forenames: "MacGregor",
    occupation: "Publican",
    retired: false,
    designation: "Father of Bride",
    deceased: false
  },
  witness1: {
    signature: "Witness 1 Signature"
  },
  witness2: {
    signature: "Witness 2 Signature"
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
  }
}
const redactedMarriageData = {
  id: 97427491,
  dateOfMarriage: "2020-05-01",
  bride: {
    forenames: "MacGregor",
    surname: "Willow",
    address: "3 Scotland Road"
  },
  groom: {
    forenames: "Neil",
    surname: "Howie",
    address: "5 England Gardens"
  },
  placeOfMarriage: {
    address: "15 Wicker Place",
    parish: "Summerisle"
  },
  registrar: {
    district: "District Town",
    administrativeArea: "Some City",
  },
  status: {
    refer: false,
    corrected: 'None',
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
  }
}

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

const redactedDeathData = {
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
  }
}

module.exports = { marriageData, redactedMarriageData, deathData, redactedDeathData }
