const redactDeath = (death, roles) => {
  return roles.includes('full-details') ? death :
    {
      date: death[0].date,
      deceased: {
        forenames: death[0].deceased.forenames,
        surname: death[0].deceased.surname
      }
    }
}

module.exports = redactDeath;
