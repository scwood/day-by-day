import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

class UsersController {

  createUser(req, res) {
    const { token } = req.body;
    jwt.verify(token, config.secret, (error, user) => {
      if (error) {
        res.status(400).send({ error: 'Invalid token' });
        return;
      }
      User.find({ email: user.email })
        .then((docs) => {
          if (docs.length) {
            res.status(400).send({ error: 'A user with that email address already exists' });
            return;
          }
          User.create(user)
            .then(() => {
              res.send({ success: true });
            });
        });
    });
  }

  getMe(req, res) {
    User.find({ email: req.user.email })
      .then((user) => {
        res.send({ user });
      });
  }

  updateMe(req, res) {
    res.sendStatus(501);
  }
}

export default UsersController;
