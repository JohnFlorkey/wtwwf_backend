const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");
const Movie = require("../models/Movie");
const TV = require("../models/TV");

router.get("/:userID", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const response = await axios.get(`http://localhost:3001/users/${userID}`);

    return res.json(response.data);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

router.get("/:userID/movies", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const response = await Movie.getAll(userID);

    const responseData = {};
    response.map((r) => (responseData[r.id] = MediaItem.factory(r)));

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad Request", 400);
  }
});

router.get("/:userID/tv", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    if (!userID) throw new ExpressError("Bad Request: No user", 400);
    const response = await TV.getAll(userID);

    const responseData = {};
    response.map((r) => (responseData[r.id] = MediaItem.factory(r)));

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad Request", 400);
  }
});

module.exports = router;
