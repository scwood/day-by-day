import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

async function authorize(req, res, next) {
  if (!req.headers || !('authorization' in req.headers)) {
    res.status(401).send({ error: 'Missing authorization header' });
    return;
  }
  const authHeader = req.headers.authorization;
  const parts = authHeader.split(' ');
  if (parts.length < 2 ||
      parts.length > 2 ||
      parts.shift().toLowerCase() !== 'bearer') {
    res.status(401).send({ error: 'Invalid authorization header format' });
    return;
  }
  const token = parts[0];
  let decoded;
  try {
    decoded = jwt.verify(token, config.secret);
  } catch (error) {
    notifyInvalidToken();
    return;
  }
  if (decoded.tokenType !== 'authorization' || !('email' in decoded)) {
    notifyInvalidToken();
    return;
  }
  req.user = await User.findOne({ email: decoded.email });
  next();

  function notifyInvalidToken() {
    res.status(401).send({ error: 'Invalid authorization token' });
  }
}

export default authorize ;
