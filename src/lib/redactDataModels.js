const redactedDeathData = (data) => {
  return     {
    id: data.id,
    date: data.date,
    deceased: {
      forenames: data.deceased.forenames,
      surname: data.deceased.surname,
      dateOfBirth: data.deceased.dateOfBirth,
      dateOfDeath: data.deceased.dateOfDeath,
      dateOfDeathQualifier: data.deceased.dateOfDeathQualifier,
      sex: data.deceased.sex,
      address: data.deceased.address,
      aliases: data.deceased.aliases
    },
    registrar: {
      subdistrict: data.registrar.subdistrict,
      district: data.registrar.district,
      administrativeArea: data.registrar.administrativeArea
    },
    status: data.status
  }
}

const redactedMarriageData = (data) => {
  return {
    id: data.id,
      dateOfMarriage: data.dateOfMarriage,
      bride: {
      forenames: data.bride.forenames,
        surname: data.bride.surname,
        address: data.bride.address
    },
    groom: {
      forenames: data.groom.forenames,
        surname: data.groom.surname,
        address: data.groom.address
    },
    placeOfMarriage: {
      address: data.placeOfMarriage.address,
        parish: data.placeOfMarriage.parish
    },
    registrar: {
      district: data.registrar.district,
        administrativeArea: data.registrar.administrativeArea,
    },
    status: data.status
  }
}

module.exports = { redactedDeathData, redactedMarriageData }; 
