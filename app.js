const express = require("express");
const cors = require("cors");
const ExpressError = require("./expressError");
require("dotenv").config();
const { authenticateToken } = require("./middleware/auth");
const syncGenres = require("./startup/genres");

const app = express();

app.use(express.json());
app.use(cors());
app.use(authenticateToken);

syncGenres();

const authRoutes = require("./routes/auth");
const discoverRoutes = require("./routes/discover");
const friendGroupsRoutes = require("./routes/friendGroups");
const invitationRoutes = require("./routes/invitations");
const movieRoutes = require("./routes/movies");
const searchRoutes = require("./routes/search");
const tvRoutes = require("./routes/tv");
const usersRoutes = require("./routes/users");

app.use("/auth", authRoutes);
app.use("/discover", discoverRoutes);
app.use("/friendGroups", friendGroupsRoutes);
app.use("/invitations", invitationRoutes);
app.use("/movies", movieRoutes);
app.use("/search", searchRoutes);
app.use("/tv", tvRoutes);
app.use("/users", usersRoutes);

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
