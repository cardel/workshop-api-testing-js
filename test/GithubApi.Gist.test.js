const axios = require('axios');
const chai = require('chai');

chai.use(require('chai-subset'));

const { expect } = chai;
const { StatusCodes } = require('http-status-codes');

describe('DELETE and inexistent resources', async () => {
  let gist;
  let gistResponse;
  const url = 'https://api.github.com';
  const authHeaders = {
    headers: {
      Authorization: `token ${process.env.ACCESS_TOKEN}`
    }
  };
  const newGist = {
    description: 'Example',
    public: true,
    files: {
      'promise.js': {
        content: 'alert(1);'
      }
    }
  };
  before(async () => {
    gistResponse = await axios.post(
      `${url}/gists`,
      newGist,
      authHeaders
    );
    gist = gistResponse.data;
  });
  it('Validation if a new gist has been created', async () => {
    expect(gistResponse.status).to.equal(StatusCodes.CREATED);
    expect(gist).to.containSubset(newGist);
  });
  describe('Delete a gist', async () => {
    let delGist;

    before(async () => {
      delGist = await axios.delete(
        gist.url,
        authHeaders
      );
    });

    it('Verify the DELETE request', async () => {
      expect(delGist.status).to.equal(StatusCodes.NO_CONTENT);
    });

    describe('Verify if the gist has been deleted', async () => {
      let requestDeleted;
      before(async () => {
        try {
          const response = await axios.get(
            gist.url,
            authHeaders
          );
          requestDeleted = response.status;
        } catch (e) {
          requestDeleted = e.response.status;
        }
      });
      it('The gist should not be accessibled', async () => {
        expect(requestDeleted).to.equal(StatusCodes.NOT_FOUND);
      });
    });
  });
});
