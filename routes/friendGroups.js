const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");
const FriendGroup = require("../models/FriendGroup");

router.get("/:id/movies", async (req, res, next) => {
  try {
    const friendGroupID = req.params.id;
    const friendGroup = await FriendGroup.getByID(friendGroupID);
    const moviesArray = await friendGroup.getMovieRecommendations();
    const responseData = {
      id: friendGroup.id,
      name: friendGroup.name,
      recommendations: moviesArray.map((r) => MediaItem.factory(r)),
    };

    return res.json(responseData);
  } catch (err) {
    throw new ExpressError("Bad Request", 404);
  }
});

router.get("/:id/tv", async (req, res, next) => {
  try {
    const friendGroupID = req.params.id;
    const friendGroup = await FriendGroup.getByID(friendGroupID);
    const tvArray = await friendGroup.getTVRecommendations();
    const responseData = {
      id: friendGroup.id,
      name: friendGroup.name,
      recommendations: tvArray.map((r) => MediaItem.factory(r)),
    };

    return res.json(responseData);
  } catch (err) {
    throw new ExpressError("Bad Request", 404);
  }
});

module.exports = router;
