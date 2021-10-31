const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(`http://localhost:3001/tv`);
    const responseData = {};
    response.data.map((r) => (responseData[r.id] = MediaItem.factory(r, "tv")));
    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
