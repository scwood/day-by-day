import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import './fixtures/setUpMockedDb';
import app from '../src';
import config from '../src/config';

const usersUri = '/api/users';
const entriesUri = '/api/entries';

const testUser = {
  email: 'someuser@somemail.com',
  password: 'somepassword',
};

const testEntry = {
  date: '2016-01-01',
  text: 'Sample journal entry',
};

const signUpToken = jwt.sign({
  tokenType: 'signUp',
  ...testUser,
}, config.secret);

const authorizationToken = jwt.sign({
  tokenType: 'authorization',
  email: testUser.email,
}, config.secret);

const authorizationHeader = { authorization: `bearer ${authorizationToken}` };

describe('Entry routes', () => {
  beforeEach(done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .end(done);
  });

  describe(`POST ${entriesUri}`, testPostEntry);
  describe(`GET ${entriesUri}`, testGetEntries);
});

function testPostEntry() {
  it('should 400 on missing body', done => {
    supertest(app)
      .post(entriesUri)
      .set(authorizationHeader)
      .expect(400, done);
  });

  it('Should 201 on correct body', done => {
    supertest(app)
      .post(entriesUri)
      .set(authorizationHeader)
      .send(testEntry)
      .expect(201, done);
  });

  it('should 403 on entry that already exists', done => {
    supertest(app)
      .post(entriesUri)
      .set(authorizationHeader)
      .send(testEntry)
      .end(() => {
        supertest(app)
          .post(entriesUri)
          .set(authorizationHeader)
          .send(testEntry)
          .expect(403, done);
      });
  });
}

function testGetEntries() {
  it('should 200', done => {
    supertest(app)
      .get(entriesUri)
      .set(authorizationHeader)
      .expect(200, done);
  });
}
