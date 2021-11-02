const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(`http://localhost:3001/friendgroups/`);

    return res.json(response.data);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

router.get("/:id/movies", async (req, res, next) => {
  try {
    const friendGroupID = req.params.id;
    const response = await axios.get(
      `http://localhost:3001/movierecommendations/${friendGroupID}`
    );

    return res.json(response.data);
  } catch (err) {
    throw new ExpressError("Bad Request", 404);
  }
});

module.exports = router;
