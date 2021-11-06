const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");
const TV = require("../models/TV");

router.get("/", async (req, res, next) => {
  try {
    const response = await TV.getAll(1);
    const responseData = {};
    response.map((r) => (responseData[r.id] = MediaItem.factory(r)));

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
