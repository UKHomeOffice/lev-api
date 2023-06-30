const generateToken = require('../../../src/lib/generateToken');

describe('Generate Token', () => {
  it('is a function ', () => {
    (typeof generateToken).should.equal('function')
  });
  it('should return a promise', () => {
    expect(generateToken())
      .to.be.an.instanceOf(Promise)
  });
})
