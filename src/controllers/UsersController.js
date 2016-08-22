import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

class UsersController {

  createUser(req, res, next) {
    const { token } = req.body;
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        res.status(400).send({ error: 'Invalid token' });
        return;
      }
      const requiredKeys = ['email', 'password'];
      const hasRequired = requiredKeys.every(key => key in decoded);
      if (!hasRequired) {
        res.status(400).send({ error: 'Invalid token' });
        return;
      }
      User.find({ email: decoded.email })
        .then(docs => {
          if (docs.length) {
            res.status(400).send({ error: 'Invalid token' });
            return;
          }
          User.create({
            email: decoded.email,
            name: decoded.name,
            password: decoded.password,
          })
          .then(() => {
            res.send({ data: { success: true } });
          })
          .catch(next);
        })
        .catch(next);
    });
  }

  getMe(req, res, next) {
    User.find({ email: req.email })
      .then(docs => {
        if (docs.length === 0) {
          res.status(400).send({ error: 'User not found' });
          return;
        }
        const user = docs[0];
        res.send({
          data: {
            me: user.email,
          },
        });
      })
      .catch(next);
  }

  updateMe(req, res) {
    res.sendStatus(501);
  }
}

export default UsersController;
