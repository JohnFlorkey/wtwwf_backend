const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");
const { JWT_SECRET_KEY } = require("../config");

router.post(`/signup`, async (req, res, next) => {
  try {
    const { country, email, password, username } = req.body;
    const result = await User.register({ country, email, password, username });
    if (result) {
      res.status(200);
    } else {
      throw new ExpressError("Signup Problem");
    }
    return next();
  } catch (e) {
    return next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login({ email, password });
    if (user) {
      authToken = jwt.sign({ ...user }, JWT_SECRET_KEY);

      res.json({ authToken, user });
    } else {
      throw new ExpressError(
        "Bad Request; Email and password to not match",
        400
      );
    }
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
