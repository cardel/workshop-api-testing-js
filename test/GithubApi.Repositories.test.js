const axios = require('axios');
const { expect, assert } = require('chai');
const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');

describe('GitHub Repository test', () => {
  describe('Get data from repository', () => {
    let user;
    before(async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      expect(response.status).to.equal(StatusCodes.OK);
      user = response.data;
    });

    it('Verify user data', async () => {
      expect(user.name).to.equal('Alejandro Perdomo');
      expect(user.company).to.equal('Perficient Latam');
      expect(user.location).to.equal('Colombia');
    });

    describe('Get repository', async () => {
      let repos;
      let repo;
      const expectedRepo = 'jasmine-json-report';
      before(async () => {
        const response = await axios.get(user.repos_url);
        repos = response.data;
        repo = repos.find((r) => r.name === expectedRepo);
      });

      it('Verify repository', async () => {
        assert.exists(repo);
        expect(repo.full_name).to.equal('aperdomob/jasmine-json-report');
        expect(repo.private).to.equal(false);
        expect(repo.description).to.equal('A Simple Jasmine JSON Report');
      });

      describe('Download repository', async () => {
        const md5hashZip = '3876dfb1a98166adfcd5829cc4b3d156';
        let fileZip;
        before(async () => {
          const response = await axios.get(`${repo.svn_url}/archive/${repo.default_branch}.zip`);
          fileZip = response.data;
        });
        it('Verify Zip file', async () => {
          assert.exists(fileZip);
        });
        it('Verify content zip file md5', async () => {
          expect(md5(fileZip)).to.equal(md5hashZip);
        });

        let files;
        let readmeFile;
        const md5hashReadMe = '3449c9e5e332f1dbb81505cd739fbf3f';
        before(async () => {
          const response = await axios.get(`${repo.url}/contents`);
          files = response.data;
          readmeFile = files.find((f) => f.name === 'README.md');
        });
        it('Verify existence README.md file', async () => {
          assert.exists(readmeFile);
        });
        it('Verify content README.md file', async () => {
          expect(md5(readmeFile)).to.equal(md5hashReadMe);
        });
      });
    });
  });
});
