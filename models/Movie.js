const db = require("../db");
const ExpressError = require("../expressError");

class Movie {
  constructor({
    id,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
  }) {
    this.id = id;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = poster_path;
    this.releaseDate = release_date;
    this.runtime = runtime;
    this.title = title;
    this.voteAverage = vote_average;
  }

  static async getAll(userID) {
    try {
      const result = await db.query(
        `SELECT
          m.id,
          um.added_date,
          m.overview,
          m.popularity,
          m.poster_path,
          m.release_date,
          m.runtime,
          m.title,
          m.vote_average
        FROM movie AS m
        INNER JOIN user_movie AS um ON um.movie_id = m.id
        WHERE um.user_id = $1`,
        [userID]
      );

      const movies = result.rows.map(
        (r) =>
          new Movie({
            id: r.id,
            overview: r.overview,
            popularity: r.popularity,
            poster_path: r.poster_path,
            release_date: r.release_date,
            runtime: r.runtime,
            title: r.title,
            vote_average: r.vote_average,
          })
      );

      return movies;
    } catch (e) {
      console.log(e);
      throw new ExpressError("Error retirieving movies from db", 404);
    }
  }
}

module.exports = Movie;
