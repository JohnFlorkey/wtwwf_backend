const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`http://localhost:3001/users/${id}`);

    return res.json(response.data);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
