'use strict';

const moment = require('moment');
const HotShots = require('hot-shots');
const statsdClient = new HotShots();

const validDataSets = [
  'birth',
  'death',
  'marriage'
];

const validateCommon = (dataSet, username, client, groups, startTime, finishTime) => {
  if (dataSet === undefined) {
    throw ReferenceError('First argument, dataSet, was not defined');
  } else if (typeof dataSet !== 'string') {
    throw TypeError('First argument, dataSet, was not a string');
  } else if (!validDataSets.includes(dataSet)) {
    throw RangeError('First argument, dataSet, was not recognised');
  }

  if (username === undefined) {
    throw ReferenceError('Second argument, username, was not defined');
  } else if (typeof username !== 'string') {
    throw TypeError('Second argument, username, was not a string');
  }

  if (client === undefined) {
    throw ReferenceError('Third argument, client, was not defined');
  } else if (typeof client !== 'string') {
    throw TypeError('Third argument, client, was not a string');
  }

  if (groups === undefined) {
    throw ReferenceError('Forth argument, groups, was not defined');
  } else if (!(groups instanceof Array)) {
    throw TypeError('Forth argument, groups, was not an array');
  }

  if (startTime === undefined) {
    throw ReferenceError('Fifth argument, startTime, was not defined');
  } else if (!(startTime instanceof moment)) {
    throw TypeError('Fifth argument, startTime, was not a moment object');
  }

  if (finishTime === undefined) {
    throw ReferenceError('Sixth argument, finishTime, was not defined');
  } else if (!(finishTime instanceof moment)) {
    throw TypeError('Sixth argument, finishTime, was not a moment object');
  }
};

const statsd = (reqType, dataSet, username, client, groups, duration) => {
  const statsdPrefix = 'lev.api';

  statsdClient.increment(`${statsdPrefix}.req`);
  statsdClient.increment(`${statsdPrefix}.req.${reqType}`);
  statsdClient.increment(`${statsdPrefix}.req.${dataSet}`);
  statsdClient.increment(`${statsdPrefix}.req.${client}`);
  groups.forEach(g => statsdClient.increment(`${statsdPrefix}.req.${g}`));

  statsdClient.timing(`${statsdPrefix}.req.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${reqType}.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${dataSet}.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${client}.time`, duration);
  groups.forEach(g => statsdClient.timing(`${statsdPrefix}.req.${g}.time`, duration));

  statsdClient.set(`${statsdPrefix}.req.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${reqType}.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${dataSet}.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${client}.users`, username);
  groups.forEach(g => statsdClient.set(`${statsdPrefix}.req.${g}.users`, username));
};

const lookup = (dataSet, username, client, groups, startTime, finishTime, id) => {
  validateCommon(dataSet, username, client, groups, startTime, finishTime);

  if (id === undefined) {
    throw ReferenceError('Seventh argument, id, was not defined');
  } else if (!Number.isInteger(id)) {
    throw TypeError('Seventh argument, id, was not an integer');
  } else if (id < 0) {
    throw RangeError('Seventh argument, id, was not a positive integer');
  }

  const duration = finishTime.diff(startTime);

  statsd('lookup', dataSet, username, client, groups, duration);
};

const search = (dataSet, username, client, groups, startTime, finishTime, query) => {
  validateCommon(dataSet, username, client, groups, startTime, finishTime);

  if (query === undefined) {
    throw ReferenceError('Seventh argument, query, was not defined');
  } else if (!(query instanceof Object)) {
    throw TypeError('Seventh argument, query, was not an object');
  }

  const duration = finishTime.diff(startTime);

  statsd('search', dataSet, username, client, groups, duration);
};

module.exports = {
  lookup: lookup,
  search: search
};
