const censor = (blocked, roles) => (redact, value) => {
  return blocked !== false || (redact && !roles.includes('full-details')) ?
    null : value
}

const censorDeath = (death, roles) => {
  const censorField = censor(death.status.blocked, roles)
  return {
    id: death.id,
    date: censorField(false, death.date),
    entryNumber: censorField(true, death.entryNumber),
    deceased: {
      prefix: censorField(true, death.deceased.prefix),
      forenames: censorField(false, death.deceased.forenames),
      surname: censorField(false, death.deceased.surname),
      suffix: censorField(true, death.deceased.suffix),
      maidenSurname: censorField(true, death.deceased.maidenSurname),
      dateOfBirth: censorField(false, death.deceased.dateOfBirth),
      dateOfDeath: censorField(false,death.deceased.dateOfDeath),
      dateOfDeathQualifier: censorField(false, death.deceased.dateOfDeathQualifier),
      birthplace: censorField(true, death.deceased.birthplace),
      deathplace: censorField(true, death.deceased.deathplace),
      ageAtDeath: censorField(true, death.deceased.ageAtDeath),
      sex: censorField(false, death.deceased.sex),
      address: censorField(false, death.deceased.address),
      occupation: censorField(true, death.deceased.occupation),
      retired: censorField(true, death.deceased.retired),
      causeOfDeath: censorField(true, death.deceased.causeOfDeath),
      certifiedBy: censorField(true, death.deceased.certifiedBy),
      relationshipToPartner: censorField(true, death.deceased.relationshipToPartner),
      aliases: censorField(false, death.deceased.aliases) || []
    },
    registrar: {
      signature: censorField(true, death.registrar.signature),
      designation: censorField(true, death.registrar.designation),
      subdistrict: censorField(false, death.registrar.subdistrict),
      district: censorField(false, death.registrar.district),
      administrativeArea: censorField(false, death.registrar.administrativeArea)
    },
    informant: {
      forenames: censorField(true, death.informant.forenames),
      surname: censorField(true, death.informant.surname),
      address: censorField(true, death.informant.address),
      qualification: censorField(true, death.informant.qualification),
      signature: censorField(true, death.informant.signature)
    },
    partner: {
      name: censorField(true, death.partner.name),
      occupation: censorField(true, death.partner.occupation),
      retired: censorField(true, death.partner.retired)
    },
    mother: {
      name: censorField(true, death.mother.name),
      occupation: censorField(true, death.mother.occupation)
    },
    father: {
      name: censorField(true, death.father.name),
      occupation: censorField(true, death.father.occupation)
    },
    coroner: {
      name: censorField(true, death.coroner.name),
      designation: censorField(true, death.coroner.designation),
      area: censorField(true, death.coroner.area)
    },
    inquestDate: censorField(true, death.inquestDate),
    status: {
      blocked: death.status.blocked,
      correction: censorField(false, death.status.correction),
      marginalNote: censorField(false, death.status.marginalNote),
      onAuthorityOfRegistrarGeneral: censorField(true, death.status.onAuthorityOfRegistrarGeneral)
    },
    previousRegistration: death.previousRegistration && censorRecords(death.previousRegistration, roles),
    nextRegistration: death.nextRegistration && censorRecords(death.nextRegistration, roles),
  }
}

const censorMarriage = (marriage, roles) => {
  const censorField = censor(marriage.status.blocked, roles)
  return {
    id: marriage.id,
    entryNumber: censorField(true, marriage.entryNumber),
    dateOfMarriage: censorField(false, marriage.dateOfMarriage),
    placeOfMarriage: {
      address: censorField(false, marriage.placeOfMarriage.address),
      parish: censorField(false, marriage.placeOfMarriage.parish),
      short: censorField(false, marriage.placeOfMarriage.short)
    },
    registrar: {
      signature: censorField(true, marriage.registrar.signature),
      designation: censorField(true, marriage.registrar.designation),
      superintendentSignature: censorField(true, marriage.registrar.superintendentSignature),
      superintendentDesignation: censorField(true, marriage.registrar.superintendentDesignation),
      district: censorField(false, marriage.registrar.district),
      administrativeArea: censorField(false, marriage.registrar.administrativeArea)
    },
    groom: {
      prefix: censorField(true, marriage.groom.prefix),
      forenames: censorField(false, marriage.groom.forenames),
      surname: censorField(false, marriage.groom.surname),
      suffix: censorField(true, marriage.groom.suffix),
      age: censorField(true, marriage.groom.age),
      occupation: censorField(true, marriage.groom.occupation),
      retired: censorField(true, marriage.groom.retired),
      address: censorField(false, marriage.groom.address),
      aliases: censorField(true, marriage.groom.aliases) || [],
      condition: censorField(true, marriage.groom.condition),
      signature: censorField(true, marriage.groom.signature),
      signatureIsMark: censorField(true, marriage.groom.signatureIsMark)
    },
    bride: {
      prefix: censorField(true, marriage.bride.prefix),
      forenames: censorField(false, marriage.bride.forenames),
      surname: censorField(false, marriage.bride.surname),
      suffix: censorField(true, marriage.bride.suffix),
      age: censorField(true, marriage.bride.age),
      occupation: censorField(true, marriage.bride.occupation),
      retired: censorField(true, marriage.bride.retired),
      address: censorField(false, marriage.bride.address),
      aliases: censorField(true, marriage.bride.aliases) || [],
      condition: censorField(true, marriage.bride.condition),
      signature: censorField(true, marriage.bride.signature),
      signatureIsMark: censorField(true, marriage.bride.signatureIsMark)
    },
    fatherOfGroom: {
      forenames: censorField(true, marriage.fatherOfGroom.forenames),
      surname: censorField(true, marriage.fatherOfGroom.surname),
      occupation: censorField(true, marriage.fatherOfGroom.occupation),
      retired: censorField(true, marriage.fatherOfGroom.retired),
      designation: censorField(true, marriage.fatherOfGroom.designation),
      deceased: censorField(true, marriage.fatherOfGroom.deceased)
    },
    fatherOfBride: {
      forenames: censorField(true, marriage.fatherOfBride.forenames),
      surname: censorField(true, marriage.fatherOfBride.surname),
      occupation: censorField(true, marriage.fatherOfBride.occupation),
      retired: censorField(true, marriage.fatherOfBride.retired),
      designation: censorField(true, marriage.fatherOfBride.designation),
      deceased: censorField(true, marriage.fatherOfBride.deceased)
    },
    witness1: {
      signature: censorField(true, marriage.witness1.signature),
      signatureIsMark: censorField(true, marriage.witness1.signatureIsMark)
    },
    witness2: {
      signature: censorField(true, marriage.witness2.signature),
      signatureIsMark: censorField(true, marriage.witness2.signatureIsMark)
    },
    witness3: {
      signature: censorField(true, marriage.witness3.signature),
      signatureIsMark: censorField(true, marriage.witness3.signatureIsMark)
    },
    witness4: {
      signature: censorField(true, marriage.witness4.signature),
      signatureIsMark: censorField(true, marriage.witness4.signatureIsMark)
    },
    witness5: {
      signature: censorField(true, marriage.witness5.signature),
      signatureIsMark: censorField(true, marriage.witness5.signatureIsMark)
    },
    witness6: {
      signature: censorField(true, marriage.witness6.signature),
      signatureIsMark: censorField(true, marriage.witness6.signatureIsMark)
    },
    witness7: {
      signature: censorField(true, marriage.witness7.signature),
      signatureIsMark: censorField(true, marriage.witness7.signatureIsMark)
    },
    witness8: {
      signature: censorField(true, marriage.witness8.signature),
      signatureIsMark: censorField(true, marriage.witness8.signatureIsMark)
    },
    witness9: {
      signature: censorField(true, marriage.witness9.signature),
      signatureIsMark: censorField(true, marriage.witness9.signatureIsMark)
    },
    witness10: {
      signature: censorField(true, marriage.witness10.signature),
      signatureIsMark: censorField(true, marriage.witness10.signatureIsMark)
    },
    witness11: {
      signature: censorField(true, marriage.witness11.signature),
      signatureIsMark: censorField(true, marriage.witness11.signatureIsMark)
    },
    witness12: {
      signature: censorField(true, marriage.witness12.signature),
      signatureIsMark: censorField(true, marriage.witness12.signatureIsMark)
    },

    minister1: {
      signature: censorField(true, marriage.minister1.signature),
      designation: censorField(true, marriage.minister1.designation)
    },
    minister2: {
      signature: censorField(true, marriage.minister2.signature),
      designation: censorField(true, marriage.minister2.designation)
    },
    status: {
      blocked: marriage.status.blocked,
      correction: censorField(false, marriage.status.correction),
      marginalNote: censorField(false, marriage.status.marginalNote),
      onAuthorityOfRegistrarGeneral: censorField(true, marriage.status.onAuthorityOfRegistrarGeneral)
    },
    previousRegistration: marriage.previousRegistration && censorMarriage(marriage.previousRegistration, roles),
    nextRegistration: marriage.nextRegistration && censorMarriage(marriage.nextRegistration, roles),
  }
}

module.exports = { censorDeath, censorMarriage };
