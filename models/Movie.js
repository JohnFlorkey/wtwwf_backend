const db = require("../db");
const ExpressError = require("../expressError");

class Movie {
  constructor({
    id,
    genres,
    keywords,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
  }) {
    this.id = id;
    this.genres = genres;
    this.keywords = keywords;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = poster_path;
    this.releaseDate = release_date;
    this.runtime = runtime;
    this.title = title;
    this.voteAverage = vote_average;
  }

  async addGenre(genreID) {
    const result = await db.query(
      `INSERT INTO movie_genre (
        movie_id,
        genre_id
      ) VALUES (
        $1,
        $2
      )
      `,
      [this.id, genreID]
    );
  }

  static async create({
    id,
    genres,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
  }) {
    const movieResult = await db.query(
      `INSERT INTO movie (
        id,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        id,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average,
      ]
    );

    const newMovie = new Movie({
      id,
      overview,
      popularity,
      poster_path,
      release_date,
      runtime,
      title,
      vote_average,
    });

    // create movie-genre relationships
    const movieGenreResult = await Promise.all(
      genres.map((g) => {
        newMovie.addGenre(g.id);
        return g.name;
      })
    );
    console.log(movieGenreResult);

    newMovie.genres = movieGenreResult;
    console.log(newMovie);

    return newMovie;
  }

  static async getById(id) {
    const result = await db.query(
      `SELECT
        id,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average
      FROM movie
      WHERE id = $1`,
      [id]
    );

    const movie = result.rows[0];

    return movie ? new Movie(movie) : undefined;
  }
}

module.exports = Movie;
