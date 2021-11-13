const axios = require("axios");
const express = require("express");
const router = new express.Router();
const { TMDB_API_BASE_URL } = require("../config");
const WatchProvider = require("../models/WatchProvider");
const token = process.env.TMDB_API_BEARER_TOKEN;

router.get(`/:id/watchProviders`, async (req, res, next) => {
  try {
    const movieID = req.params.id;
    const country = req.query.country ? req.query.country : "US";
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/movie/${movieID}/watch/providers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const watchProviderData = response.data.results[country];
    const watchProviderList =
      WatchProvider.buildWatchProviderList(watchProviderData);

    return res.json(watchProviderList);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
