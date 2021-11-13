const db = require("../db");
const ExpressError = require("../expressError");
const Genre = require("./Genre");
const Keyword = require("./Keyword");
const WatchProvider = require("./WatchProvider");

class Movie {
  constructor({
    id,
    genres = [],
    keywords = [],
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
    watchProviders = {},
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
    this.watchProviders = watchProviders;
  }

  static async addGenre(movieID, genreID) {
    const result = await db.query(
      `INSERT INTO movie_genre (
        movie_id,
        genre_id
      ) VALUES (
        $1,
        $2
      )
      `,
      [movieID, genreID]
    );
  }

  static async addKeyword(movieID, keywordID) {
    const result = await db.query(
      `INSERT INTO movie_keyword (
        movie_id,
        keyword_id
      ) VALUES (
        $1,
        $2
      )
      `,
      [movieID, keywordID]
    );
  }

  static async build({
    id,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
  }) {
    //get genres
    const genreResult = await Genre.getByMovieID(id);
    const genres = genreResult.map((g) => g.name);
    // get keywords
    const keywordResult = await Keyword.getByMovieID(id);
    const keywords = keywordResult.map((k) => k.name);
    // get watchProviders
    const watchProviders = await WatchProvider.getByMovieID(id);

    return new Movie({
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
      watchProviders,
    });
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

    // create movie-genre relationships
    const movieGenreResult = await Promise.all(
      genres.map((g) => {
        Movie.addGenre(id, g.id);
        return g.name;
      })
    );

    // get keywords for the movie from the external API
    const keywordResult = await Keyword.getFromExtAPIByMovieID(id);
    // associate to movie
    const movieKeywordResult = await Promise.all(
      keywordResult.map((k) => Movie.addKeyword(id, k.id))
    );

    const newMovie = Movie.build({
      id,
      overview,
      popularity,
      poster_path,
      release_date,
      runtime,
      title,
      vote_average,
    });

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

    return movie ? Movie.build(movie) : undefined;
  }
}

module.exports = Movie;
