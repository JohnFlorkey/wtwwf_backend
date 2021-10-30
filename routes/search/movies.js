const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../../expressError");
const IMAGE_URL = require("../../config");

router.get("/", async (req, res, next) => {
  try {
    const searchTerm = req.query.title;
    const requestedPage = req.query.page;
    const response = await axios.get("http://localhost:3001/searchmovies", {
      params: { page: requestedPage },
    });
    const data = response.data[0];
    let page = "";
    let totalPages = "";
    let totalResults = "";
    let results = [];
    if (data.results.length > 0) {
      page = data.page;
      totalPages = data.total_pages;
      totalResults = data.total_results;
      results = data.results.map((m) => ({
        id: m.id,
        genres: m.genre_ids,
        overview: m.overview,
        popularity: m.popularity,
        posterPath: m.poster_path ? IMAGE_URL + m.poster_path : undefined,
        releaseDate: m.release_date,
        title: m.title,
        voteAverage: m.vote_average,
      }));
    }

    return res.json({ page, searchTerm, totalPages, totalResults, results });
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
