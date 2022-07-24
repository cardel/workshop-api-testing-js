const axios = require('axios');
const chai = require('chai');
const {
  StatusCodes
} = require('http-status-codes');

const {
  expect
} = chai;

describe('Consuming HEAD and redirect requests', async () => {
  describe('1. Consulting HEAD and verify if there is a redirection', async () => {
    const oldRepository = 'https://github.com/aperdomob/redirect-test';
    const newRepository = 'https://github.com/aperdomob/new-redirect-test';

    it('1.1 Get the old repository', async () => {
      const queryOldRepository = await axios.head(oldRepository);
      expect(queryOldRepository.request.res.responseUrl).to.equal(newRepository);
    });

    describe('2. Review the redirect', async () => {
      it('2.1 Review the redirection', async () => {
        const oldRequestResponse = await axios.get(oldRepository);
        expect(oldRequestResponse.status).to.equal(StatusCodes.OK);
        expect(oldRequestResponse.request.res.responseUrl).to.equal(newRepository);
      });
    });
  });
});
