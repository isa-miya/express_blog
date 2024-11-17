const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const TOKEN_EXPIRATION = '1h';

exports.getJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.locals.isAuthenticated = false;
        return next();
      }
      req.user = decoded;
      res.locals.isAuthenticated = true;
      next();
    });
  } else {
    res.locals.isAuthenticated = false;
    next();
  }
};

exports.protectRoute = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  };
  next();
};