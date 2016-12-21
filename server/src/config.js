const mongoHost = process.env.DAY_BY_DAY_DB;
const fromEmail = process.env.DAY_BY_DAY_EMAIL;
const emailPassword = process.env.DAY_BY_DAY_EMAIL_PASSWORD;
const emailHost = process.env.DAY_BY_DAY_EMAIL_HOST;
const secret = process.env.DAY_BY_DAY_SECRET;

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
