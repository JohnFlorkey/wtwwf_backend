const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(`http://localhost:3001/friendgroups/`);
    const responseData = {};
    response.data.map((g) => {
      responseData[g.id] = { ...g };
      delete responseData[g.id].movierecommendations;
      delete responseData[g.id].tvrecommendations;
      responseData[g.id].movieRecommendations = {};
      responseData[g.id].tvRecommendations = {};
      g.movierecommendations.map(
        (r) =>
          (responseData[g.id].movieRecommendations[r.id] = MediaItem.factory(
            r,
            "movies"
          ))
      );
      g.tvrecommendations.map(
        (r) =>
          (responseData[g.id].tvRecommendations[r.id] = MediaItem.factory(
            r,
            "tv"
          ))
      );
    });

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
