const express = require("express");
const router = new express.Router();
const axios = require("axios");
const ExpressError = require("../expressError");
const MediaItem = require("../models/MediaItem");
const Movie = require("../models/Movie");
const TV = require("../models/TV");
const User = require("../models/User");
const { TMDB_API_BASE_URL } = require("../config");
const FriendGroup = require("../models/FriendGroup");
const token = process.env.TMDB_API_BEARER_TOKEN;

router.get("/:userID", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const response = await axios.get(`http://localhost:3001/users/${userID}`);

    return res.json(response.data);
  } catch (e) {
    throw new ExpressError("Bad request", 400);
  }
});

router.get("/:userID/friendGroups", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await User.getById(userID);

    const response = await FriendGroup.getByUserID(userID);

    return res.json(response);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:userID/movies", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await User.getById(userID);

    const response = await user.getMovies();

    const responseData = {};
    response.map((r) => (responseData[r.id] = MediaItem.factory(r)));

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad Request", 400);
  }
});

router.get("/:userID/tv", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await User.getById(userID);

    const response = await user.getTV();

    const responseData = {};
    response.map((r) => (responseData[r.id] = MediaItem.factory(r)));

    return res.json(responseData);
  } catch (e) {
    throw new ExpressError("Bad Request", 400);
  }
});

router.post("/:userID/movies", async (req, res, next) => {
  try {
    const { movieID } = req.body;
    const { userID } = req.params;

    // if this movie is already in our db we can skip some steps
    let movie = await Movie.getById(movieID);
    if (!movie) {
      // get the movie details from TMDB
      const movieDetailResponse = await axios.get(
        `${TMDB_API_BASE_URL}/3/movie/${movieID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const {
        id,
        genres,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average,
      } = movieDetailResponse.data;

      // get the keywords
      // const movieKeywordResponse = await axios.get(
      //   `${TMDB_API_BASE_URL}/3/movie/${movieID}/keywords`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // const keywords = movieKeywordResponse.data.keywords;
      // console.log(movieKeywordResponse);

      movie = await Movie.create({
        id,
        genres,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average,
      });
    }

    // add movie to user's list
    const user = await User.getById(userID);
    const addedMovie = await user.addMovie(movie.id);

    // get the watch providers
    // const movieWatchProvidersResponse = await axios.get(
    //   `${TMDB_API_BASE_URL}/3/movie/${movieID}/watch/providers`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // const watchProviders = movieWatchProvidersResponse.data.results["US"];
    // console.log(movieWatchProvidersResponse);
    // assemble all the data
    // write it to the db
    // return a MediaItem
    return res.json(MediaItem.factory(movie));
  } catch (e) {
    console.log(e);
  }
});

router.post("/:userID/tv", async (req, res, next) => {
  try {
    const { tvID } = req.body;
    const { userID } = req.params;

    // if this tv is already in our db we can skip some steps
    let tv = await TV.getById(tvID);
    if (!tv) {
      // get the tv details from TMDB
      const tvDetailResponse = await axios.get(
        `${TMDB_API_BASE_URL}/3/tv/${tvID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const {
        id,
        episode_runtime,
        first_air_date,
        genres,
        name,
        overview,
        popularity,
        poster_path,
        vote_average,
      } = tvDetailResponse.data;

      tv = await TV.create({
        id,
        episode_runtime,
        first_air_date,
        genres,
        name,
        overview,
        popularity,
        poster_path,
        vote_average,
      });
    }

    // add movie to user's list
    const user = await User.getById(userID);
    const addedTV = await user.addTV(tv.id);

    // get the watch providers
    // const movieWatchProvidersResponse = await axios.get(
    //   `${TMDB_API_BASE_URL}/3/movie/${movieID}/watch/providers`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // const watchProviders = movieWatchProvidersResponse.data.results["US"];
    // console.log(movieWatchProvidersResponse);
    // assemble all the data
    // write it to the db
    // return a MediaItem
    return res.json(MediaItem.factory(tv));
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:userID/movies/:movieID", async (req, res, next) => {
  try {
    const { movieID, userID } = req.params;

    const user = await User.getById(userID);

    const result = await user.deleteMovie(movieID);

    return res.json(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
