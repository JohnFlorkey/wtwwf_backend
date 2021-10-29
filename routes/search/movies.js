const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../../expressError");

router.get("/", async (req, res, next) => {
  try {
    const searchResults = await axios.get("http://localhost:3001/searchmovies");
    const movies = [];
    if (searchResults.data.results.length > 0) {
      searchResults.data.results.map((m) =>
        movies.push({
          id: m.id,
          genres: m.genre_ids,
          overview: m.overview,
          popularity: m.popularity,
          posterPath: m.poster_path,
          releaseDate: m.release_date,
          title: m.title,
          voteAverage: m.vote_average,
        })
      );
    }
    return res.json({ movies });
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
