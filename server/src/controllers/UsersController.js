import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

class UsersController {

  async createUser(req, res, next) {

    function notifyInvalidToken() {
      res.status(400).send({ error: 'Invalid token' });
    }

    const { token } = req.body;
    let decoded;
    try {
      decoded = jwt.verify(token, config.secret);
    } catch (error) {
      notifyInvalidToken();
      return;
    }
    const requiredKeys = ['email', 'password'];
    const hasRequired = requiredKeys.every(key => key in decoded);
    if (!hasRequired) {
      notifyInvalidToken();
      return;
    }
    try {
      const docs = await User.find({ email: decoded.email });
      if (docs.length) {
        res.status(403).send({
          error: 'User with that email address already exists'
        });
        return;
      }
      await User.create({
        email: decoded.email,
        name: decoded.name,
        password: decoded.password,
      });
      res.send({ data: { success: true } });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const docs = await User.find({ email: req.email });
      if (docs.length === 0) {
        res.status(400).send({ error: 'User not found' });
        return;
      }
      const user = docs[0];
      res.send({
        data: { me: user.email },
      });
    } catch (error) {
      next(error);
    }
  }

  updateMe(req, res) {
    res.sendStatus(501);
  }
}

export default UsersController;
