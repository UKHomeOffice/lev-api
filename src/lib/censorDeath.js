const censorDeath = (death, roles) => {
  const censorField = (redact, value) => {
    return death.status.blocked !== false || (redact && !roles.includes('full-details')) ?
      null : value
  }
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
    ...!death.nextRegistration && { previousRegistration: death.previousRegistration && censorDeath(death.previousRegistration, roles) },
    ...!death.previousRegistration && { nextRegistration: death.nextRegistration && censorDeath(death.nextRegistration, roles) },
  }
}

module.exports = censorDeath;
