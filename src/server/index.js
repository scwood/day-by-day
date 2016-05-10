import bodyParser from 'body-parser';
import express from 'express';
import mailNotifier from 'mail-notifier';
import mailstrip from 'mailstrip';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).send({ error: 'There was an application error. Try again later' });
});

if (!module.parent) {
  mongoose.connect(config.mongo.dbUrl);
  mailNotifier(config.imap).on('mail', mail => mailstrip.body(mail)).start();
  const port = process.env.PORT || 3000;
  app.listen(port);
}

export default app;
