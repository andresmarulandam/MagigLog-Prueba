import jwt from 'jsonwebtoken';
import { configuration } from '../config/config.js';

const { tokenSecret } = configuration.tokenSecret;

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, tokenSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
