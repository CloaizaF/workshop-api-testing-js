const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('Consuming GET Methods', () => {
  describe('When checking the user', () => {
    it('Then the user should be checked', () => agent.get('https://api.github.com/users/aperdomob')
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.equal('Alejandro Perdomo');
        expect(response.body).to.have.property('company');
        expect(response.body.company).to.equal('PSL');
        expect(response.body).to.have.property('location');
        expect(response.body.location).to.equal('Colombia');
      }));
  });

  describe('When checking the repository', () => {
    it('Then the jasmine-awesome-report repository should be checked', () => agent.get('https://api.github.com/users/aperdomob/repos')
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        const repository = response.body.find((repo) => repo.name === 'jasmine-awesome-report');
        expect(repository).to.have.property('name');
        expect(repository.name).to.equal('jasmine-awesome-report');
        expect(repository).to.have.property('private');
        expect(repository.private).to.equal(false);
        expect(repository).to.have.property('description');
        expect(repository.description).to.equal('An awesome html report for Jasmine');
      }));
  });

  describe('When downloading the repository', () => {
    it('Then the repository should be downloaded', () => agent.get('https://github.com/aperdomob/jasmine-awesome-report/archive/master.zip')
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
      }));
  });
});
