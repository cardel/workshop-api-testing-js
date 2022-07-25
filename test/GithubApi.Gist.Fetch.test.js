const isomorphic = require('isomorphic-fetch');
const chai = require('chai');
const { StatusCodes } = require('http-status-codes');

chai.use(require('chai-subset'));

const { expect } = chai;

describe('Consuming a DELETE and a nonexistent resource with isomorphic', async () => {
  const urlGitApi = 'https://api.github.com/gists';
  const authHeaders = {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  };
  let createdGist;
  describe('1. Creation of a new gist', async () => {
    const newGist = {
      description: 'Example',
      public: true,
      files: {
        'promise.js': {
          content: 'alert(1);'
        }
      }
    };
    let gistResponse;
    before(async () => {
      gistResponse = await isomorphic(
        urlGitApi,
        {
          method: 'POST',
          body: JSON.stringify(newGist),
          headers: authHeaders
        }
      );
      createdGist = await gistResponse.json();
    });
    it('Validation if a new gist has been created', async () => {
      expect(gistResponse.status).to.equal(StatusCodes.CREATED);
      expect(createdGist).to.containSubset(newGist);
    });
  });
  describe('2. Delete a created gist with ismorphic', async () => {
    it('2.1 Action delete', async () => {
      const deleteResponse = await isomorphic(
        createdGist.url,
        {
          method: 'DELETE',
          headers: authHeaders
        }
      );
      expect(deleteResponse.status).to.equal(StatusCodes.NO_CONTENT);
    });
    it('2.2 Verity if the gist has been deleted', async () => {
      let requestDeleted;
      before(async () => {
        try {
          const response = await isomorphic(
            createdGist.url,
            {
              method: 'GET',
              headers: authHeaders
            }
          );
          requestDeleted = response.status;
        } catch (e) {
          requestDeleted = e.response.status;
        }
      });

      it('2.2.1 The gist should not be accessibled', async () => {
        expect(requestDeleted).to.equal(StatusCodes.NOT_FOUND);
      });
    });
  });
});
