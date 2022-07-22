const axios = require('axios');
const { expect } = require('chai');

describe('Get an authenticated user', async () => {
  let user;
  const url = 'https://api.github.com';
  const repoObjName = 'Cursos';
  const authHeaders = {
    headers: {
      Authorization: `token ${process.env.ACCESS_TOKEN}`
    }
  };
  before(async () => {
    const response = await axios.get(`${url}/user`, authHeaders);
    user = response.data;
  });
  it('The user has public repositories ', async () => {
    expect(user.public_repos).to.be.above(0);
  });
  describe('Get all repos', async () => {
    let cursosRepoData;
    before(async () => {
      const response = await axios.get(user.repos_url, authHeaders);
      cursosRepoData = response.data.find((r) => r.name === repoObjName);
    });

    it('We have de repository', async () => {
      expect(cursosRepoData).to.not.equal(undefined);
    });

    describe('Create a new issue', async () => {
      const issueCreationBody = { title: 'A beautiful issue' };
      const issueUpdateBody = { body: 'A nice body' };
      let createdIssueData;

      before(async () => {
        const response = await axios.post(
          `${url}/repos/${user.login}/${cursosRepoData.name}/issues`,
          issueCreationBody,
          authHeaders
        );
        createdIssueData = response.data;
      });
      it('I Verify if the issue has been created', async () => {
        expect(createdIssueData.id).to.not.equal(undefined);
        expect(createdIssueData.title).to.equal(issueCreationBody.title);
        expect(createdIssueData.body).to.equal(null);
      });

      describe('I modify an issue', async () => {
        let modifiedIssue;

        before(async () => {
          const response = await axios.patch(
            `${url}/repos/${user.login}/${cursosRepoData.name}/issues/${createdIssueData.number}`,
            issueUpdateBody,
            authHeaders
          );
          modifiedIssue = response.data;
        });
        it('Verify the modifcation', async () => {
          expect(modifiedIssue.title).to.equal(issueCreationBody.title);
          expect(modifiedIssue.body).to.equal(issueUpdateBody.body);
        });
      });
    });
  });
});
