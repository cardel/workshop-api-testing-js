const axios = require('axios');
const chai = require('chai');

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');

describe('Get list of users from Github', () => {
  const urlUsers = 'https://api.github.com/users';
  describe('Get 10 users from Github ', async () => {
    const params = {
      per_page: 10
    };
    it('Verify request of 10 users', async () => {
      const response = await axios.get(urlUsers, { params });
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.length).to.equal(10);
    });
  });
  describe('Get 100 users from Github ', async () => {
    const params = {
      per_page: 100
    };
    it('Verify request of 100 users', async () => {
      const response = await axios.get(urlUsers, { params });
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.length).to.equal(100);
    });
  });
});
