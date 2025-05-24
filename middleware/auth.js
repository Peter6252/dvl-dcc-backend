
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.sendStatus(403);
  }
}

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') return next();
  res.sendStatus(403);
}

module.exports = { verifyToken, isAdmin };
