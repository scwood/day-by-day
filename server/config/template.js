// environment specific variables

let mongoHost = '';
const fromEmail = '';
const emailPassword = '';
const emailHost = '';
const secret = '';

if (process.env.NODE_ENV === 'production') {
  mongoHost = '';
}

const config = {
  secret,
  mongoHost,
  mailNotifier: {
    username: fromEmail,
    password: emailPassword,
    host: emailHost,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  nodemailer: `smtps://${fromEmail}:${emailPassword}@${emailHost}`,
};

export default config;
