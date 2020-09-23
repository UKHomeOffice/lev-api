const redactDeath = (death, roles) => {
  return roles.includes('full-details') ? death :
    {
      date: death.date,
      deceased: {
        forenames: death.deceased.forenames,
        surname: death.deceased.surname
      }
    }
}

module.exports = redactDeath;
