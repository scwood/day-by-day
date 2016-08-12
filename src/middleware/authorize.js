import jwt from 'jsonwebtoken';

import config from '../config';

function authorize(req, res, next) {
  if (!req.headers || !('authorization' in req.headers)) {
    res.status(400).send({ error: 'Missing authorization header' });
    return;
  }
  const authHeader = req.headers.authorization;
  const parts = authHeader.split(' ');
  if (parts.length < 2 || parts.length > 2 || parts.shift().toLowerCase() !== 'bearer') {
    res.status(400).send({ error: 'Invalid authorization header format' });
    return;
  }
  const token = parts[0];
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      res.status(400).send({ error: 'Invalid token' });
      return;
    }
    req.email = decoded.email; // eslint-disable-line no-param-reassign
    next();
  });
}

export default authorize;
