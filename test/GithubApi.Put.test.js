const axios = require('axios');
const { expect, assert } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('PUT methods testing', async () => {
  let followResponse;
  const username = 'aperdomob';
  const authuser = 'cardel';
  const url = 'https://api.github.com';
  const authHeader = {
    headers: { Authorization: `token ${process.env.ACCESS_TOKEN}` }
  };
  describe('I follow a user in Github', async () => {
    before(async () => {
      followResponse = await axios.put(`${url}/user/following/${username}`, { username: authuser }, authHeader);
    });
    it('Verify the response', async () => {
      expect(followResponse.status).to.eql(StatusCodes.NO_CONTENT);
      expect(followResponse.data).to.eql('');
    });

    describe(`Verify if I follow ${username}`, async () => {
      let user;
      before(async () => {
        const response = await axios.get(`${url}/users/${username}/followers`, { authHeader });
        user = response.data.find((l) => l.login === authuser);
      });
      it(`Validation if I follow ${username}`, () => {
        assert.exists(user);
      });
    });
    describe('I follow a user in Github again', async () => {
      let followResponseAgain;
      before(async () => {
        followResponseAgain = await axios.put(`${url}/user/following/${username}`, { username: authuser }, authHeader);
      });
      it('Verify if the response is idempotent', async () => {
        expect(followResponseAgain.status).to.eql(StatusCodes.NO_CONTENT);
        expect(followResponseAgain.data).to.eql('');
      });
      describe(`Verify if I follow ${username} again`, async () => {
        let user;
        before(async () => {
          const response = await axios.get(`${url}/users/${username}/followers`, { authHeader });
          user = response.data.find((l) => l.login === authuser);
        });
        it(`Validation if I follow ${username} again`, () => {
          assert.exists(user);
        });
      });
    });
  });
});
