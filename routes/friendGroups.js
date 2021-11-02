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
    const responseData = { ...response.data };
    delete responseData.recommendations;
    responseData.recommendations = {};
    response.data.recommendations.map(
      (r) =>
        (responseData.recommendations[r.id] = MediaItem.factory(r, "movies"))
    );

    return res.json(responseData);
  } catch (err) {
    throw new ExpressError("Bad Request", 404);
  }
});

module.exports = router;
