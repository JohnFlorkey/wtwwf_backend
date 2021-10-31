const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");

router.get("/:type", async (req, res, next) => {
  try {
    const type = req.params.type;
    const requestedPage = req.query.page;
    const resource = `discover${type}`;
    const response = await axios.get(`http://localhost:3001/${resource}`, {
      params: { page: requestedPage },
    });
    const responseData = response.data[0];
    responseData.results = responseData.results.map((r) =>
      MediaItem.factory(r, type)
    );
    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

module.exports = router;
