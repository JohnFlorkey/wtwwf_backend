const db = require("../db");
const ExpressError = require("../expressError");
const Genre = require("./Genre");
const Keyword = require("./Keyword");
const WatchProvider = require("./WatchProvider");

class TV {
  constructor({
    id,
    episode_runtime = [],
    first_air_date,
    genres = [],
    keywords = [],
    name,
    overview,
    popularity,
    poster_path,
    vote_average,
    watchProviders = {},
  }) {
    this.id = id;
    this.episodeRuntime = episode_runtime;
    this.firstAirDate = first_air_date;
    this.genres = genres;
    this.keywords = keywords;
    this.name = name;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = poster_path;
    this.voteAverage = vote_average;
    this.watchProviders = watchProviders;
  }

  static async addGenre(tvID, genreID) {
    const result = await db.query(
      `INSERT INTO tv_genre (
        tv_id,
        genre_id
      ) VALUES (
        $1,
        $2
      )
      `,
      [tvID, genreID]
    );
  }

  static async addKeyword(tvID, keywordID) {
    const result = await db.query(
      `INSERT INTO tv_keyword (
        tv_id,
        keyword_id
      ) VALUES (
        $1,
        $2
      )
      `,
      [tvID, keywordID]
    );
  }

  static async build({
    id,
    episode_runtime = [],
    first_air_date,
    name,
    overview,
    popularity,
    poster_path,
    vote_average,
  }) {
    // get genres
    const genreResult = await Genre.getByTVID(id);
    const genres = genreResult.map((g) => g.name);
    // get keywords
    const keywordResult = await Keyword.getByTVID(id);
    const keywords = keywordResult.map((k) => k.name);
    // get watchProviders
    const watchProviders = await WatchProvider.getByTVID(id);

    return new TV({
      id,
      episode_runtime,
      first_air_date,
      genres,
      keywords,
      name,
      overview,
      popularity,
      poster_path,
      vote_average,
      watchProviders,
    });
  }

  static async create({
    id,
    episode_runtime,
    first_air_date,
    genres,
    name,
    overview,
    popularity,
    poster_path,
    vote_average,
  }) {
    const episode_runtimeObj = {};
    episode_runtime.map((r) => episode_runtimeObj[r]);

    const result = await db.query(
      `INSERT INTO tv (
        id,
        episode_runtime,
        first_air_date,
        name,
        overview,
        popularity,
        poster_path,
        vote_average
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        id,
        episode_runtimeObj,
        first_air_date,
        name,
        overview,
        popularity,
        poster_path,
        vote_average,
      ]
    );

    // create tv-genre relationships
    const tvGenreResult = await Promise.all(
      genres.map((g) => {
        TV.addGenre(id, g.id);
        return g.name;
      })
    );

    // get keywords for the tv show from the external API
    const keywordResult = await Keyword.getFromExtAPIByTVID(id);
    // associate to movie
    const movieKeywordResult = await Promise.all(
      keywordResult.map((k) => TV.addKeyword(id, k.id))
    );

    const newTV = await TV.build({
      id,
      episode_runtime,
      first_air_date,
      name,
      overview,
      popularity,
      poster_path,
      vote_average,
    });

    return newTV;
  }

  static async getById(id) {
    const result = await db.query(
      `SELECT
				t.id,
				t.episode_runtime,
				t.first_air_date,
				t.name,
				t.overview,
				t.popularity,
				t.poster_path,
				t.vote_average
			FROM tv AS t
			WHERE t.id = $1`,
      [id]
    );

    const tv = result.rows[0];

    return tv ? TV.build(tv) : undefined;
  }
}

module.exports = TV;
