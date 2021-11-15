const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.post(`/signup`, async (req, res, next) => {
  const { country, email, password, username } = req.body;
  const user = await User.register({ country, email, password, username });

  return res.json(user);
});

module.exports = router;
