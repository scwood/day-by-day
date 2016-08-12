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
    dbUrl: 'mongodb://daybyday:Mongopass1$@ds031845.mlab.com:31845/day-by-day',
  },
  secret: 'some secret here',
};
