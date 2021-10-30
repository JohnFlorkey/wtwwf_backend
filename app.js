const express = require("express");
const cors = require("cors");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());
app.use(cors());

const searchMovieRoutes = require("./routes/search/movies");

app.use("/search/movies", searchMovieRoutes);

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
