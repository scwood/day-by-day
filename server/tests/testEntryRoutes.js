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
  text: 'Sample text entry',
};

const validToken = jwt.sign(testUser, config.secret);
const authorizationHeader = { authorization: `bearer ${validToken}` };

describe('Entry routes', () => {
  beforeEach(done => {
    supertest(app)
      .post(usersUri)
      .send({ token: validToken })
      .end(done);
  });

  describe(`POST ${entriesUri}`, () => {
    it('should 400 on missing body', done => {
      supertest(app)
        .post(entriesUri)
        .set(authorizationHeader)
        .expect(400, done);
    });

    it('Should 201 on correct body', done => {
      supertest(app)
        .post(entriesUri)
        .send(testEntry)
        .expect(201, done);
    });
  });
});
