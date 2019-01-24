'use strict';

const moment = require('moment');
const log = require('./logger');
const HotShots = require('hot-shots');
const promClient = require('prom-client');
const statsdClient = new HotShots();

const prometheusMetrics = {};
const validDataSets = [
  'birth',
  'death',
  'marriage'
];

const validateCommon = (dataSet, username, client, groups, roles, startTime, finishTime) => {
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

  if (roles === undefined) {
    throw ReferenceError('Fifth argument, roles, was not defined');
  } else if (!(roles instanceof Array)) {
    throw TypeError('Fifth argument, roles, was not an array');
  }

  if (startTime === undefined) {
    throw ReferenceError('Sixth argument, startTime, was not defined');
  } else if (!(startTime instanceof moment)) {
    throw TypeError('Sixth argument, startTime, was not a moment object');
  }

  if (finishTime === undefined) {
    throw ReferenceError('Seventh argument, finishTime, was not defined');
  } else if (!(finishTime instanceof moment)) {
    throw TypeError('Seventh argument, finishTime, was not a moment object');
  }
};

const statsd = (reqType, dataSet, username, client, groups, duration) => {
  const statsdPrefix = 'lev.api';

  statsdClient.increment(`${statsdPrefix}.req`);
  statsdClient.increment(`${statsdPrefix}.req.${reqType}`);
  statsdClient.increment(`${statsdPrefix}.req.${dataSet}`);
  statsdClient.increment(`${statsdPrefix}.req.${client}`);
  statsdClient.increment(`${statsdPrefix}.req.${dataSet}.${reqType}`);
  groups.forEach(g => statsdClient.increment(`${statsdPrefix}.req.${g}`));

  statsdClient.timing(`${statsdPrefix}.req.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${reqType}.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${dataSet}.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${client}.time`, duration);
  statsdClient.timing(`${statsdPrefix}.req.${dataSet}.${reqType}.time`, duration);
  groups.forEach(g => statsdClient.timing(`${statsdPrefix}.req.${g}.time`, duration));

  statsdClient.set(`${statsdPrefix}.req.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${reqType}.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${dataSet}.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${client}.users`, username);
  statsdClient.set(`${statsdPrefix}.req.${dataSet}.${reqType}.users`, username);
  groups.forEach(g => statsdClient.set(`${statsdPrefix}.req.${g}.users`, username));
};

const prometheus = (reqType, dataSet, username, client, groups, duration) => {
  const prometheusPrefix = 'lev_api';
  const escape = t => t.replace(/[ -/]/g, '');

  duration /= 1000;

  // Initialise metrics if required
  prometheusMetrics.req = prometheusMetrics.req || new promClient.Counter({
    name: `${prometheusPrefix}_req`,
    help: 'Number of requests'
  });
  prometheusMetrics.req[reqType] = prometheusMetrics.req[reqType] || new promClient.Counter({
    name: `${prometheusPrefix}_req_${escape(reqType)}`,
    help: `Number of ${reqType} requests`
  });
  prometheusMetrics.req[dataSet] = prometheusMetrics.req[dataSet] || new promClient.Counter({
    name: `${prometheusPrefix}_req_${escape(dataSet)}`,
    help: `Number of ${dataSet} requests`
  });
  prometheusMetrics.req[client] = prometheusMetrics.req[client] || new promClient.Counter({
    name: `${prometheusPrefix}_req_${escape(client)}`,
    help: `Number of requests from the ${client} client`
  });
  prometheusMetrics.req[dataSet][reqType] = prometheusMetrics.req[dataSet][reqType] || new promClient.Counter({
    name: `${prometheusPrefix}_req_${escape(dataSet)}_${escape(reqType)}`,
    help: `Number of ${dataSet} ${reqType} requests`
  });
  groups.forEach(g => prometheusMetrics.req[g] = prometheusMetrics.req[g] || new promClient.Counter({
    name: `${prometheusPrefix}_req_${escape(g)}`,
    help: `Number of requests from members of the ${g} group`
  }));

  prometheusMetrics.req.time = prometheusMetrics.req.time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_time`,
    help: 'Request time'
  });
  prometheusMetrics.req[reqType].time = prometheusMetrics.req[reqType].time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_${escape(reqType)}_time`,
    help: `Request time of ${reqType} requests`
  });
  prometheusMetrics.req[dataSet].time = prometheusMetrics.req[dataSet].time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_${escape(dataSet)}_time`,
    help: `Request time of ${dataSet} requests`
  });
  prometheusMetrics.req[client].time = prometheusMetrics.req[client].time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_${escape(client)}_time`,
    help: `Request time of requests from the ${client} client`
  });
  prometheusMetrics.req[dataSet][reqType].time = prometheusMetrics.req[dataSet][reqType].time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_${escape(dataSet)}_${escape(reqType)}_time`,
    help: `Request time of ${dataSet} ${reqType} requests`
  });
  groups.forEach(g => prometheusMetrics.req[g].time = prometheusMetrics.req[g].time || new promClient.Histogram({
    name: `${prometheusPrefix}_req_${escape(g)}_time`,
    help: `Request time of requests from members of the ${g} group`
  }));

  // Update metrics
  prometheusMetrics.req.inc();
  prometheusMetrics.req[reqType].inc();
  prometheusMetrics.req[dataSet].inc();
  prometheusMetrics.req[client].inc();
  prometheusMetrics.req[dataSet][reqType].inc();
  groups.forEach(g => prometheusMetrics.req[g].inc());

  prometheusMetrics.req.time.observe(duration);
  prometheusMetrics.req[reqType].time.observe(duration);
  prometheusMetrics.req[dataSet].time.observe(duration);
  prometheusMetrics.req[client].time.observe(duration);
  prometheusMetrics.req[dataSet][reqType].time.observe(duration);
  groups.forEach(g => prometheusMetrics.req[g].time.observe(duration));
};

const lookup = (dataSet, username, client, groups, roles, startTime, finishTime, id) => {
  validateCommon(dataSet, username, client, groups, roles, startTime, finishTime);

  if (id === undefined) {
    throw ReferenceError('Eighth argument, id, was not defined');
  } else if (!Number.isInteger(id)) {
    throw TypeError('Eighth argument, id, was not an integer');
  } else if (id < 0) {
    throw RangeError('Eighth argument, id, was not a positive integer');
  }

  const reqType = 'lookup';
  const duration = finishTime.diff(startTime);

  statsd(reqType, dataSet, username, client, groups, duration);
  prometheus(reqType, dataSet, username, client, groups, duration);

  const msg = `${username}(${groups.join(',')}) accessed ${dataSet} record ${id} using ${client} in ${duration} ms`;

  log.info({
    dataSet: dataSet,
    client: client,
    groups: groups,
    id: id,
    reqType: reqType,
    responseTime: duration + 'ms',
    username: username
  }, msg);
};

const search = (dataSet, username, client, groups, roles, startTime, finishTime, query) => {
  validateCommon(dataSet, username, client, groups, roles, startTime, finishTime);

  if (query === undefined) {
    throw ReferenceError('Eighth argument, query, was not defined');
  } else if (!(query instanceof Object)) {
    throw TypeError('Eighth argument, query, was not an object');
  }

  const reqType = 'search';
  const duration = finishTime.diff(startTime);

  statsd(reqType, dataSet, username, client, groups, duration);
  prometheus(reqType, dataSet, username, client, groups, duration);

  const surname = query.surname && query.surname.toUpperCase();
  const forenames = query.forenames && (query.forenames[0].toUpperCase() + query.forenames.substring(1));
  const msg = `${username}(${groups.join(',')}) searched ${dataSet} records matching '${forenames} ${surname} ${query.dateOfBirth}' using ${client} in ${duration} ms`;

  log.info({
    dataSet: dataSet,
    client: client,
    groups: groups,
    query: query,
    reqType: reqType,
    responseTime: duration + 'ms',
    roles: roles,
    username: username
  }, msg);
};

module.exports = {
  lookup: lookup,
  search: search,
  prometheus: {
    register: promClient.register
  }
};
