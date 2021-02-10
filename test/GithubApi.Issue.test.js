const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('Consuming POST and PATCH Methods', () => {
  describe('When checking the user', () => {
    it('Then an user should be logged in', async () => {
      const response = await agent.post('https://api.github.com/user')
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('login');
      expect(response.body).to.have.property('id');
    });
  });

  describe('When checking if the user has at least a public repository', () => {
    it('Then the user should have a public repository', async () => {
      const response = await agent.post('https://api.github.com/user')
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
      const repos = await agent.get(response.body.repos_url)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
      expect(repos.body).not.to.eql({});
    });
  });
});
