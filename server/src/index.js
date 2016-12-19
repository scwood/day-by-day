import bodyParser from 'body-parser';
import express from 'express';
// import mailNotifier from 'mail-notifier';
// import mailstrip from 'mailstrip';
import mongoose from 'mongoose';
import path from 'path';

import config from './config';
import routes from './routes';

const app = express();
const publicPath = path.resolve(__dirname, '..', '..', 'client', 'build');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({
    error: 'Internal server error. Please try again later.'
  });
  next();
});

mongoose.Promise = global.Promise;

if (!module.parent) {
  const port = process.env.PORT || 3001;
  mongoose.connect(config.mongoHost);
  // mailNotifier(config.mailNotifier).on('mail', mail => {
  //   mailstrip.body(mail);
  // }).start();
  app.listen(port);
}

export default app;
