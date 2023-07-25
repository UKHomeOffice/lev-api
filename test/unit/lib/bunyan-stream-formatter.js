const streamFormatter = require('../../../src/lib/bunyan-stream-formatter');
require('chai').use(require('chai-json-pattern').default);

const mockStream = {
  "name":"lev-api",
  "hostname":"8206f104a65f",
  "pid":1,
  "level":30,
  "msg":"lev-api listening at http://0.0.0.0:8080",
  "time":"2023-07-14T11:36:57.396Z",
  "v":0
};

const bunyanElasticPattern = `
  {
    "name": String,
    "msg": String,
    "log.level": String,
    "@timestamp": String,
    ...
  }
`;

describe('bunyanStreamFormatter', () => {
  it('is a function ', () => {
    (typeof streamFormatter).should.equal('function')
  });

  const formattedStream = streamFormatter(mockStream);

  it('should return an Object', () => {
    expect(formattedStream)
      .to.be.an.instanceOf(Object)
  });
  
  it('should return a compliant elasticsearch log pattern', () => {
    expect(formattedStream)
      .to.matchPattern(bunyanElasticPattern);
  });
  
  it('should generate a valid UTC @timestamp field', () => {
    expect(new Date(formattedStream['@timestamp']).getTime())
      .to.be.greaterThan(0);
  });

  it('should match the "time" field from the incoming stream', () => {
    expect(formattedStream['@timestamp'])
      .to.equal(mockStream['time']);
  });
});
