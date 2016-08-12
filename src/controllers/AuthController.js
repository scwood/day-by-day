import emailjs from 'emailjs';
import jwt from 'jsonwebtoken';

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

  sendSignUpEmail(req, res) {
    const { email, name, password } = req.body;
    User.find({ email })
      .then((docs) => {
        if (docs.length) {
          res.status(403).send({
            error: 'User with that email address already exists',
          });
          return;
        }
        const token = jwt.sign({ email, name, password }, config.secret);
        const link = `${req.protocol}://${req.get('host')}/emailConfirmed?token=${token}`;
        const from = config.imap.username;
        const to = email;
        const subject = 'Day by Day email confirmation';
        const text = `Click the link below to confirm your email:\n${link}`;
        const server = emailjs.server.connect({
          user: config.imap.username,
          password: config.imap.password,
          host: config.imap.host,
          ssl: true,
        });
        server.send({ from, to, subject, text }, (error) => {
          if (error) {
            res.send({ error });
            return;
          }
          res.send({ success: true });
        });
      });
  }
}

export default AuthController;
