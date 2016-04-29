import express from 'express';
import notifier from 'mail-notifier';
import config from './config';
import mailstrip from 'mailstrip';

const app = express();

const imap = {
  user: config.email.address,
  password: config.email.password,
  host: 'smtp.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

if (!module.parent) {
  const port = process.env.PORT || 3000;
  notifier(imap).on('mail', mail => console.log(mailstrip(mail.text))).start();
  app.listen(port);
}

export default app;
