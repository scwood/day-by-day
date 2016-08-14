const fromEmail = 'noreply.daybyday@gmail.com';
const emailPassword = 'Daybydaypass1$';
const emailHost = 'smtp.gmail.com';

const config = {
  fromEmail,
  mailNotifier: {
    username: fromEmail,
    password: emailPassword,
    host: emailHost,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  mongo: 'mongodb://localhost',
  nodemailer: `smtps:${fromEmail}:${emailPassword}@smtp.gmail.com`,
  secret: 'some secret here',
};

export default config;
