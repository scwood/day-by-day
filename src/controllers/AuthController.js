import emailjs from 'emailjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import User from '../models/user';
import config from '../config';

class AuthController {

  createToken(req, res) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user || !user.comparePassword(password)) {
          res.status(401).send({ error: 'Incorrect email/password combination' });
          return;
        }
        const token = jwt.sign({ email }, config.secret);
        res.send({ token });
      });
  }

  sendSignUpEmail(req, res, next) {
    const { email, name, password } = req.body;
    User.find({ email })
      .then((docs) => {
        if (docs.length) {
          res.status(403).send({
            error: 'User with that email address already exists',
          });
          return;
        }
        const expiresAt = moment().add(1, 'day');
        const token = jwt.sign({ email, name, password, expiresAt }, config.secret);
        const link = `${req.protocol}://${req.get('host')}/emailConfirmed?token=${token}`;
        const from = config.emailjs.username;
        const to = email;
        const subject = 'Day by Day email confirmation';
        const text = `Click the link below to confirm your email:\n${link}`;
        const server = emailjs.server.connect(config.emailjs);
        server.send({ from, to, subject, text }, (error) => {
          if (error) {
            next(error);
            return;
          }
          res.send({ success: true });
        });
      });
  }
}

export default AuthController;
