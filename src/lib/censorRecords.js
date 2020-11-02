const censor = (blocked, roles) => (redact, value) => (
  blocked !== false || (redact && !roles.includes('full-details'))
    ? null
    : value
);

const censorDeath = (death, roles) => {
  const censorField = censor(death.status.blocked, roles);
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
      dateOfDeath: censorField(false, death.deceased.dateOfDeath),
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
    previousRegistration: death.previousRegistration && censorDeath(death.previousRegistration, roles),
    nextRegistration: death.nextRegistration && censorDeath(death.nextRegistration, roles)
  };
};

const censorMarriage = (marriage, roles) => {
  const censorField = censor(marriage.status.blocked, roles);
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
      marginalNote: censorField(false, marriage.status.marginalNote)
    },
    previousRegistration: marriage.previousRegistration && censorMarriage(marriage.previousRegistration, roles),
    nextRegistration: marriage.nextRegistration && censorMarriage(marriage.nextRegistration, roles)
  };
};

const censorPartnership = (partnership, roles) => {
  const censorField = censor(partnership.status.blocked, roles);
  return {
    id: partnership.id,
    dateOfPartnership: censorField(false, partnership.dateOfPartnership),
    placeOfPartnership: {
      address: censorField(false, partnership.placeOfPartnership.address),
      short: censorField(false, partnership.placeOfPartnership.short)
    },
    registrar: {
      signature: censorField(true, partnership.registrar.signature)
    },
    partner1: {
      prefix: censorField(true, partnership.partner1.prefix),
      forenames: censorField(false, partnership.partner1.forenames),
      surname: censorField(false, partnership.partner1.surname),
      suffix: censorField(true, partnership.partner1.suffix),
      address: censorField(false, partnership.partner1.address),
      dob: censorField(true, partnership.partner1.dob),
      sex: censorField(true, partnership.partner1.sex),
      aliases: censorField(true, partnership.partner1.aliases) || [],
      occupation: censorField(true, partnership.partner1.occupation),
      retired: censorField(true, partnership.partner1.retired),
      condition: censorField(true, partnership.partner1.condition),
      signature: censorField(true, partnership.partner1.signature)
    },
    partner2: {
      prefix: censorField(true, partnership.partner2.prefix),
      forenames: censorField(false, partnership.partner2.forenames),
      surname: censorField(false, partnership.partner2.surname),
      suffix: censorField(true, partnership.partner2.suffix),
      address: censorField(false, partnership.partner2.address),
      dob: censorField(true, partnership.partner2.dob),
      sex: censorField(true, partnership.partner2.sex),
      aliases: censorField(true, partnership.partner2.aliases) || [],
      occupation: censorField(true, partnership.partner2.occupation),
      retired: censorField(true, partnership.partner2.retired),
      condition: censorField(true, partnership.partner2.condition),
      signature: censorField(true, partnership.partner2.signature)
    },
    fatherOfPartner1: {
      surname: censorField(true, partnership.fatherOfPartner1.surname),
      forenames: censorField(true, partnership.fatherOfPartner1.forenames),
      occupation: censorField(true, partnership.fatherOfPartner1.occupation),
      retired: censorField(true, partnership.fatherOfPartner1.retired),
      designation: censorField(true, partnership.fatherOfPartner1.designation),
      deceased: censorField(true, partnership.fatherOfPartner1.deceased)
    },
    motherOfPartner1: {
      surname: censorField(true, partnership.motherOfPartner1.surname),
      forenames: censorField(true, partnership.motherOfPartner1.forenames),
      occupation: censorField(true, partnership.motherOfPartner1.occupation),
      retired: censorField(true, partnership.motherOfPartner1.retired),
      designation: censorField(true, partnership.motherOfPartner1.designation),
      deceased: censorField(true, partnership.motherOfPartner1.deceased)
    },
    fatherOfPartner2: {
      surname: censorField(true, partnership.fatherOfPartner2.surname),
      forenames: censorField(true, partnership.fatherOfPartner2.forenames),
      occupation: censorField(true, partnership.fatherOfPartner2.occupation),
      retired: censorField(true, partnership.fatherOfPartner2.retired),
      designation: censorField(true, partnership.fatherOfPartner2.designation),
      deceased: censorField(true, partnership.fatherOfPartner2.deceased)
    },
    motherOfPartner2: {
      surname: censorField(true, partnership.motherOfPartner2.surname),
      forenames: censorField(true, partnership.motherOfPartner2.forenames),
      occupation: censorField(true, partnership.motherOfPartner2.occupation),
      retired: censorField(true, partnership.motherOfPartner2.retired),
      designation: censorField(true, partnership.motherOfPartner2.designation),
      deceased: censorField(true, partnership.motherOfPartner2.deceased)
    },
    witness1: {
      forename: censorField(true, partnership.witness1.forename),
      surname: censorField(true, partnership.witness1.surname)
    },
    witness2: {
      forename: censorField(true, partnership.witness2.forename),
      surname: censorField(true, partnership.witness2.surname)
    },
    status: {
      blocked: partnership.status.blocked,
      marginalNote: censorField(false, partnership.status.marginalNote)
    },
    previousRegistration: partnership.previousRegistration && censorPartnership(partnership.previousRegistration, roles),
    nextRegistration: partnership.nextRegistration && censorPartnership(partnership.nextRegistration, roles)
  };
};

const censorBirthV0 = (birth, roles) => {
  const censorField = censor(birth.status.blockedRegistration, roles);
  return {
    location: {
      name: censorField(false, birth.location.name),
      administrativeArea: censorField(false, birth.location.administrativeArea),
      subDistrict: censorField(false, birth.location.subDistrict),
      nameQualifier: censorField(false, birth.location.nameQualifier),
      registrationDistrict: censorField(false, birth.location.registrationDistrict)
    },
    subjects: {
      child: {
        originalName: {
          givenName: censorField(true, birth.subjects.child.originalName.givenName),
          surname: censorField(true, birth.subjects.child.originalName.surname),
          fullName: censorField(true, birth.subjects.child.originalName.fullName),
          qualifier: censorField(true, birth.subjects.child.originalName.qualifier)
        },
        name: {
          givenName: censorField(false, birth.subjects.child.name.givenName),
          surname: censorField(false, birth.subjects.child.name.surname),
          fullName: censorField(false, birth.subjects.child.name.fullName),
          qualifier: censorField(false, birth.subjects.child.name.qualifier)
        },
        dateOfBirth: censorField(false, birth.subjects.child.dateOfBirth),
        sex: censorField(false, birth.subjects.child.sex),
        birthplace: censorField(false, birth.subjects.child.birthplace)
      },
      father: {
        name: {
          givenName: censorField(false, birth.subjects.father.name.givenName),
          surname: censorField(false, birth.subjects.father.name.surname),
          fullName: censorField(false, birth.subjects.father.name.fullName),
          qualifier: censorField(false, birth.subjects.father.name.qualifier)
        },
        birthplace: censorField(false, birth.subjects.father.birthplace),
        occupation: censorField(true, birth.subjects.father.occupation)
      },
      mother: {
        name: {
          givenName: censorField(false, birth.subjects.mother.name.givenName),
          surname: censorField(false, birth.subjects.mother.name.surname),
          fullName: censorField(false, birth.subjects.mother.name.fullName),
          qualifier: censorField(false, birth.subjects.mother.name.qualifier)
        },
        birthplace: censorField(false, birth.subjects.mother.birthplace),
        occupation: censorField(true, birth.subjects.mother.occupation),
        maidenSurname: censorField(false, birth.subjects.mother.maidenSurname),
        marriageSurname: censorField(false, birth.subjects.mother.marriageSurname),
        usualAddress: censorField(true, birth.subjects.mother.usualAddress)
      },
      informant: {
        name: {
          givenName: censorField(true, birth.subjects.informant.name.givenName),
          surname: censorField(true, birth.subjects.informant.name.surname),
          fullName: censorField(true, birth.subjects.informant.name.fullName),
          qualifier: censorField(true, birth.subjects.informant.name.qualifier)
        },
        usualAddress: censorField(true, birth.subjects.informant.usualAddress),
        qualification: censorField(false, birth.subjects.informant.qualification),
        signature: censorField(true, birth.subjects.informant.signature)
      }
    },
    systemNumber: birth.systemNumber,
    id: birth.id,
    date: censorField(false, birth.date),
    registrarSignature: censorField(true, birth.registrarSignature),
    status: {
      potentiallyFictitiousBirth: censorField(false, birth.status.potentiallyFictitiousBirth),
      correction: censorField(false, birth.status.correction),
      cancelled: censorField(false, birth.status.cancelled),
      blockedRegistration: birth.status.blockedRegistration,
      marginalNote: censorField(false, birth.status.marginalNote),
      reRegistered: censorField(false, birth.status.reRegistered)
    },
    previousRegistration: {
      date: censorField(false, birth.previousRegistration.date),
      systemNumber: censorField(false, birth.previousRegistration.systemNumber)
    }
  }
}

const censorBirthV1 = (birth, roles) => {
  const censorField = censor(birth.status.blocked, roles);
  return {
    id: birth.id,
    date: censorField(false, birth.date),
    entryNumber: censorField(true, birth.entryNumber),
    registrar: {
      signature: censorField(true, birth.registrar.signature),
      designation: censorField(true, birth.registrar.designation),
      superintendentSignature: censorField(true, birth.registrar.superintendentSignature),
      superintendentDesignation: censorField(true, birth.registrar.superintendentDesignation),
      subdistrict: censorField(false, birth.registrar.subdistrict),
      district: censorField(false, birth.registrar.district),
      administrativeArea: censorField(false, birth.registrar.administrativeArea)
    },
    informant1: {
      forenames: censorField(true, birth.informant1.forenames),
      surname: censorField(true, birth.informant1.surname),
      address: censorField(true, birth.informant1.address),
      qualification: censorField(false, birth.informant1.qualification),
      signature: censorField(true, birth.informant1.signature),
      signatureIsMark: censorField(true, birth.informant1.signatureIsMark)
    },
    informant2: {
      forenames: censorField(true, birth.informant2.forenames),
      surname: censorField(true, birth.informant2.surname),
      address: censorField(true, birth.informant2.address),
      qualification: censorField(false, birth.informant2.qualification),
      signature: censorField(true, birth.informant2.signature),
      signatureIsMark: censorField(true, birth.informant2.signatureIsMark)
    },
    child: {
      originalPrefix: censorField(true, birth.child.originalPrefix),
      prefix: censorField(false, birth.child.prefix),
      forenames: censorField(false, birth.child.forenames),
      originalForenames: censorField(true, birth.child.originalForenames),
      surname: censorField(false, birth.child.surname),
      originalSuffix: censorField(true, birth.child.originalSuffix),
      suffix: censorField(false, birth.child.suffix),
      dateOfBirth: censorField(false, birth.child.dateOfBirth),
      sex: censorField(false, birth.child.sex),
      birthplace: censorField(false, birth.child.birthplace)
    },
    mother: {
      prefix: censorField(false, birth.mother.prefix),
      forenames: censorField(false, birth.mother.forenames),
      surname: censorField(false, birth.mother.surname),
      suffix: censorField(false, birth.mother.suffix),
      birthplace: censorField(false, birth.mother.birthplace),
      occupation: censorField(true, birth.mother.occupation),
      aliases: censorField(true, birth.mother.aliases) || [],
      address: censorField(true, birth.mother.address),
      maidenSurname: censorField(false, birth.mother.maidenSurname),
      marriageSurname: censorField(false, birth.mother.marriageSurname)
    },
    father: {
      prefix: censorField(false, birth.father.prefix),
      forenames: censorField(false, birth.father.forenames),
      surname: censorField(false, birth.father.surname),
      suffix: censorField(false, birth.father.suffix),
      birthplace: censorField(false, birth.father.birthplace),
      occupation: censorField(true, birth.father.occupation),
      aliases: censorField(true, birth.father.aliases) || [],
      deceased: censorField(true, birth.father.deceased)
    },
    dateOfDeclaration: censorField(true, birth.dateOfDeclaration),
    dateOfStatutoryDeclarationOfParentage: censorField(true, birth.dateOfStatutoryDeclarationOfParentage),
    statutoryDeclarationOfParentage: censorField(true, birth.statutoryDeclarationOfParentage),
    dateOfNameUpdate: censorField(true, birth.dateOfNameUpdate),
    status: {
      blocked: birth.status.blocked,
      marginalNote: censorField(false, birth.status.marginalNote),
      cancelled: censorField(false, birth.status.cancelled),
      correction: censorField(false, birth.status.correction),
      nameUpdate: censorField(true, birth.status.nameUpdate),
      onAuthorityOfRegistrarGeneral: censorField(true, birth.status.onAuthorityOfRegistrarGeneral),
      potentiallyFictitious: censorField(false, birth.status.potentiallyFictitious),
      praOrCourtOrder: censorField(true, birth.status.praOrCourtOrder),
      reregistration: censorField(false, birth.status.reregistration)
    },
    previousRegistration: birth.previousRegistration && censorBirthV1(birth.previousRegistration, roles),
    nextRegistration: birth.nextRegistration && censorBirthV1(birth.nextRegistration, roles)
  }
}


module.exports = {censorDeath, censorMarriage, censorPartnership, censorBirthV0, censorBirthV1};
