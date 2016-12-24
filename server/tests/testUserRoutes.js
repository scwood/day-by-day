import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import './fixtures/setUpMockedDb';
import app from '../src';
import config from '../src/config';

const usersUri = '/api/users';
const meUri = `${usersUri}/me`;

const signUpToken = jwt.sign({
  email: 'someuser@somemail.com',
  password: 'somepassword',
  tokenType: 'signUp',
}, config.secret);

const authorizationToken = jwt.sign({
  email: 'someuser@somemail.com',
  tokenType: 'authorization',
}, config.secret);

const invalidToken = jwt.sign({ invalid: 'stuff' }, config.secret);
const authorizationHeader = { authorization: `bearer ${authorizationToken}` };

describe('User routes', () => {
  describe(`POST ${usersUri}`, testPostUser);
  describe(`GET ${meUri}`, testGetMe);
});

function testPostUser() {
  it('should 400 on missing token', done => {
    supertest(app)
      .post(usersUri)
      .expect(400, done);
  });

  it('should 400 on invalid token', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: invalidToken })
      .expect(400, done);
  });

  it('should 201 on valid token', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .expect(201, done);
  });

  it('should 403 on valid token but existing user', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .end(() => {
        supertest(app)
          .post(usersUri)
          .send({ token: signUpToken })
          .expect(403, done);
      });
  });
}

function testGetMe() {
  it('should 401 on missing authorization header', done => {
    supertest(app)
      .get(meUri)
      .expect(401, done);
  });

  it('should 200 with valid token', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .end(() => {
        supertest(app)
          .get(meUri)
          .set(authorizationHeader)
          .expect(200, done);
      });
  });
}
