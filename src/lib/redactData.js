const { redactedDeathData, redactedMarriageData } = require('./redactDataModels');

const redactData = (data, roles, dataset) => {
  switch (dataset) {
    case 'death':
      return roles.includes("full-details") ? data : redactedDeathData(data);
    case 'marriage':
      return roles.includes("full-details") ? data : redactedMarriageData(data);
    default: throw Error('Dataset not found');
  }
}

module.exports = redactData;
