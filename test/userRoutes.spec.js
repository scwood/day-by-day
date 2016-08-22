// router.route('/')
//   .post(checkForParams(['token']), controller.createUser);
// router.route('/me')
//   .get(authenticate, controller.getMe)
//   .patch(authenticate, controller.updateMe);

import supertest from 'supertest';

import app from '../src';

const usersUri = '/api/users';

describe('User routes', () => {
  describe(`POST ${usersUri}`, () => {
    it('should 400 on missing token', (done) => {
      supertest(app)
        .post(usersUri)
        .expect(400, done);
    });
  });
});
