const config = require('../../config');
const { Signer } = require('@aws-sdk/rds-signer');
const { fromNodeProviderChain } = require('@aws-sdk/credential-providers');

const credentials = fromNodeProviderChain();

const getToken = async () => {
  const signer = new Signer({
    hostname: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.name,
    region: config.postgres.region,
    credentials: credentials
  });
  return await signer.getAuthToken();
}

module.exports = getToken

