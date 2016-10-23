import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import './fixtures/setUpMockedDb';
import app from '../';
import config from '../config';

const usersUri = '/api/users';
const meUri = `${usersUri}/me`;

const testUser = {
  email: 'someuser@somemail.com',
  password: 'somepassword',
};

const validToken = jwt.sign(testUser, config.secret);
const invalidToken = jwt.sign({ invalid: 'stuff' }, config.secret);
const authorizationHeader = { authorization: `bearer ${validToken}` };

describe('User routes', () => {
  describe(`POST ${usersUri}`, () => {
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

    it('should 200 on valid token', done => {
      supertest(app)
        .post(usersUri)
        .send({ token: validToken })
        .expect(200, done);
    });

    it('should 403 on valid token but existing user', done => {
      supertest(app)
        .post(usersUri)
        .send({ token: validToken })
        .end(() => {
          supertest(app)
            .post(usersUri)
            .send({ token: validToken })
            .expect(403, done);
        });
    });
  });

  describe(`GET ${meUri}`, () => {
    it('should 401 on missing authorization header', done => {
      supertest(app)
        .get(meUri)
        .expect(401, done);
    });

    it('should 200 with valid token', done => {
      supertest(app)
        .post(usersUri)
        .send({ token: validToken })
        .end(() => {
          supertest(app)
            .get(meUri)
            .set(authorizationHeader)
            .expect(200, done);
        });
    });
  });
});
