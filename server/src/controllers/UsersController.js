import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

class UsersController {

  async postUser(req, res, next) {
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
    if (decoded.tokenType !== 'signUp' || !hasRequired) {
      notifyInvalidToken();
      return;
    }
    const { email, name, password } = decoded;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(403).send({
          error: 'User with that email address already exists',
        });
        return;
      }
      const user = await User.create({ email, name, password });
      res.status(201).send({ user });
    } catch (error) {
      next(error);
    }

    function notifyInvalidToken() {
      res.status(400).send({ error: 'Invalid token' });
    }
  }

  getMe(req, res) {
    res.send({ me: req.user.email });
  }

  patchMe(req, res) {
    res.sendStatus(501);
  }
}

export default UsersController;
