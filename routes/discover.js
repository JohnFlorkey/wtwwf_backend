const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");
const Movie = require("../models/Movie");
const TV = require("../models/TV");
const { TMDB_API_BASE_URL } = require("../config");
const token = process.env.TMDB_BEARER_TOKEN;

router.get("/:type", async (req, res, next) => {
  try {
    const type = req.params.type;
    const requestedPage = req.query.page;
    const resource = type === "movies" ? "movie" : type;
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/discover/${resource}`,
      {
        params: { page: requestedPage },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = response.data;
    if (type === "movies") {
      responseData.results = responseData.results.map((r) =>
        MediaItem.factory(new Movie(r))
      );
    } else if (type === "tv") {
      responseData.results = responseData.results.map((r) =>
        MediaItem.factory(new TV(r))
      );
    }
    return res.json(responseData);
  } catch (e) {
    console.log(e);
    // throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
