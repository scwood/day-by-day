import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import validator from 'validator';

import User from '../models/user';
import config from '../config';

class AuthController {

  async postToken(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !user.comparePassword(password)) {
        res.status(401).send({ error: 'Incorrect email/password combination' });
        return;
      }
      const token = jwt.sign({
        tokenType: 'authorization',
        email
      }, config.secret);
      res.status(201).send({ data: { token } });
    } catch (error) {
      next(error);
    }
  }

  async postSignUpEmail(req, res, next) {
    const { email, name, password } = req.body;
    try {
      const docs = await User.find({ email });
      if (docs.length) {
        res.status(403).send({
          error: 'User with that email address already exists'
        });
        return;
      }
      if (!validator.isEmail(email)) {
        res.status(400).send({ error: 'Email address is invalid' });
        return;
      }
      const token = jwt.sign({
        type: 'signUp',
        email,
        name,
        password
      }, config.secret);
      const link = `${req.protocol}://${req.get('host')}/emailConfirmed` +
        `?token=${token}`;
      const transporter = nodemailer.createTransport(config.nodemailer);
      await transporter.sendMail({
        from: config.nodemailer.user,
        to: email,
        subject: 'Day by Day email confirmation',
        text: `Click the link below to confirm your email:\n${link}`,
      });
      res.status(201).send({ data: { success: true } });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
