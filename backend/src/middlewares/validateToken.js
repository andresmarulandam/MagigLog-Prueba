import jwt from 'jsonwebtoken';
import { configuration } from '../config/config.js';

const { tokenSecret } = configuration.tokenSecret;

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'No token' });

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.decoded = decoded;

    next();
  });
};
