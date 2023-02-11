const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config");
const User = require("../models/User");

async function authenticateToken(req, res, next) {
  try {
    const tokenFromBody = req.body.authToken;
    if (tokenFromBody) {
      const payload = jwt.verify(tokenFromBody, JWT_SECRET_KEY);
      if (payload) {
        req.user = await User.getByEmail(payload.email);
      }
    }
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  authenticateToken,
};
