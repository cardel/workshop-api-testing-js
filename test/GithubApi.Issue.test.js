const axios = require('axios');
const { expect } = require('chai');

describe('Get an authenticated user', async () => {
  let user;
  const url = 'https://api.github.com';
  const repoObj = 'Cursos';
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
    let repo;
    before(async () => {
      const response = await axios.get(user.repos_url, authHeaders);
      repo = response.data.find((r) => r.name === repoObj);
    });

    it('We have de repository', async () => {
      expect(repo).to.not.equal(undefined);
    });

    describe('Create a new issue', async () => {
      const issue = { title: 'A beautiful issue' };
      const updatedIssue = { body: 'A nice body' };
      let iss;

      before(async () => {
        const response = await axios.post(
          `${url}/repos/${user.login}/${repo.name}/issues`,
          issue,
          authHeaders
        );
        iss = response.data;
      });
      it('I Verify if the issue has been created', async () => {
        expect(iss.id).to.not.equal(undefined);
        expect(iss.title).to.equal(issue.title);
        expect(iss.body).to.equal(null);
      });

      describe('I modify an issue', async () => {
        let modifiedIssue;

        before(async () => {
          const response = await axios.patch(
            `${url}/repos/${user.login}/${repo.name}/issues/${iss.number}`,
            updatedIssue,
            authHeaders
          );
          modifiedIssue = response.data;
        });
        it('Verify the modifcation', async () => {
          expect(modifiedIssue.title).to.equal(issue.title);
          expect(modifiedIssue.body).to.equal(updatedIssue.body);
        });
      });
    });
  });
});
