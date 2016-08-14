const fromEmail = '';
const emailPassword = '';
const emailHost = '';

const config = {
  mailNotifier: {
    username: fromEmail,
    password: emailPassword,
    host: emailHost,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  emailjs: {
    user: fromEmail,
    password: emailPassword,
    host: emailHost,
  },
  mongo: '',
  secret: '',
};

export default config;
