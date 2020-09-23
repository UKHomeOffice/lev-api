const redactDeath = (death, roles) => {
  return roles.includes('full-details') ? death :
    {
      id: death.id,
      date: death.date,
      entryNumber: death.entryNumber,
      inquestDate: death.inquestDate,
      deceased: {
        forenames: death.deceased.forenames,
        surname: death.deceased.surname,
        dateOfBirth: death.deceased.dateOfBirth,
        dateOfDeath: death.deceased.dateOfDeath,
        dateOfDeathQualifier: death.deceased.dateOfDeathQualifier,
        ageAtDeath: death.deceased.ageAtDeath,
        birthplace: death.deceased.birthplace,
        deathplace: death.deceased.deathplace,
        causeOfDeath: death.deceased.causeOfDeath,
        certifiedBy: death.deceased.certifiedBy,
        sex: death.deceased.sex,
        address: death.deceased.address,
        occupation: death.deceased.occupation,
        relationshipToPartner: death.deceased.relationshipToPartner,
        retired: death.deceased.retired,
        maidenSurname: death.deceased.maidenSurname,
        aliases: death.deceased.aliases.map((e) => {
          return {
            type: e.type,
            prefix: e.prefix,
            forenames: e.forenames,
            surname: e.surname,
            suffix: e.suffix
          }
        })
      },
      partner: {
        name: death.partner.name,
        occupation: death.partner.occupation,
        retired: death.partner.retired
      },
      father: {
        name: death.father.name,
        occupation: death.father.occupation
      },
      mother: {
        name: death.mother.name,
        occupation: death.mother.occupation
      },
      informant: {
        forenames: death.informant.forenames,
        surname: death.informant.surname,
        address: death.informant.address,
        qualification: death.informant.qualification,
        signature: death.informant.signature
      },
      registrar: {
        signature: death.registrar.signature,
        designation: death.registrar.designation,
        subdistrict: death.registrar.subdistrict,
        district: death.registrar.district,
        administrativeArea: death.registrar.administrativeArea
      },
      coroner: {
        name: death.coroner.name,
        designation: death.coroner.designation,
        area: death.coroner.area
      }
    }
}

module.exports = redactDeath;
