const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../../expressError");

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("http://localhost:3001/searchmovies");

    if (response.data.results.length > 0) {
      page = response.data.page;
      totalPages = response.data.total_pages;
      totalResults = response.data.total_results;
      results = response.data.results.map((m) => ({
        id: m.id,
        genres: m.genre_ids,
        overview: m.overview,
        popularity: m.popularity,
        posterPath: m.poster_path,
        releaseDate: m.release_date,
        title: m.title,
        voteAverage: m.vote_average,
      }));
    }

    return res.json({ page, totalPages, totalResults, results });
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
