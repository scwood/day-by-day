import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import sinon from 'sinon';
import supertest from 'supertest';

import './fixtures/setUpMockedDb';
import app from '../src';
import config from '../src/config';

const usersUri = '/api/users';
const authUri = '/api/auth';
const tokensUri = `${authUri}/tokens`;
const signUpEmailUri = `${authUri}/signUpEmail`;

const testUser = {
  email: 'someuser@somemail.com',
  password: 'somepassword',
};

const signUpToken = jwt.sign({
  tokenType: 'signUp',
  ...testUser
}, config.secret);

describe('Auth routes', () => {
  describe(`POST ${tokensUri}`, testPostToken);
  describe(`POST ${signUpEmailUri}`, testPostSignUpEmail);
});

function testPostToken() {
  it('should 400 with missing body', done => {
    supertest(app)
      .post(tokensUri)
      .expect(400, done);
  });

  it('should 401 with correct body but incorrect credentials', done => {
    supertest(app)
      .post(tokensUri)
      .send(testUser)
      .expect(401, done);
  });

  it('should 200 with correct credentials', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .end(() => {
        supertest(app)
          .post(tokensUri)
          .send(testUser)
          .expect(201, done);
      });
  });
}

function testPostSignUpEmail() {
  before(() => {
    sinon.stub(nodemailer, 'createTransport', () => {
      const transporter = { sendMail: () => Promise.resolve() };
      return transporter;
    });
  });

  after(() => {
    nodemailer.createTransport.restore();
  });

  it('should 400 with missing body', done => {
    supertest(app)
      .post(signUpEmailUri)
      .expect(400, done);
  });

  it('should 200 with correct body', done => {
    supertest(app)
      .post(signUpEmailUri)
      .send(testUser)
      .expect(201, done);
  });

  it('should 403 with correct body but existing user', done => {
    supertest(app)
      .post(usersUri)
      .send({ token: signUpToken })
      .end(() => {
        supertest(app)
          .post(signUpEmailUri)
          .send(testUser)
          .expect(403, done);
      });
  });
}
