const redactDeath = (death, roles) => {
  return roles.includes('full-details') ? death :
    {
      id: death.id,
      date: death.date,
      deceased: {
        forenames: death.deceased.forenames,
        surname: death.deceased.surname,
        dateOfBirth: death.deceased.dateOfBirth,
        dateOfDeath: death.deceased.dateOfDeath,
        dateOfDeathQualifier: death.deceased.dateOfDeathQualifier,
        sex: death.deceased.sex,
        address: death.deceased.address,
        aliases: death.deceased.aliases
      },
      registrar: {
        subdistrict: death.registrar.subdistrict,
        district: death.registrar.district,
        administrativeArea: death.registrar.administrativeArea
      },
      status: death.status
    }
}

module.exports = redactDeath;
