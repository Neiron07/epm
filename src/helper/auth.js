//middleware
import pkg from 'jsonwebtoken';
import config from '../../config/config.js';
const { sign, decode, verify } = pkg;

export function hasAccess(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({ 'error': true, 'message': 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  }
  else {
    return res.status(403).send({
      'error': true,
      'message': 'No token provided.'
    });
  }
}