const secret = process.env.SECRET;
const mongoHost = process.env.MONGO_HOST;
const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailHost = process.env.EMAIL_HOST;

const config = {
  secret,
  mongoHost,
  mailNotifier: {
    username: emailAddress,
    password: emailPassword,
    host: emailHost,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  nodemailer: `smtps://${emailAddress}:${emailPassword}@${emailHost}`,
};

export default config;
