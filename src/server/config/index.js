export default {
  imap: {
    username: 'noreply.daybyday@gmail.com',
    password: 'Daybydaypass1$',
    host: 'smtp.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  mongo: {
    dbUrl: 'mongodb://localhost/DayByDay',
  },
  secret: 'some secret here',
};
