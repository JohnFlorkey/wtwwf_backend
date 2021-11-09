const db = require("../db");
const ExpressError = require("../expressError");

class TV {
  constructor({
    id,
    episode_runtime = [],
    first_air_date,
    name,
    overview,
    popularity,
    poster_path,
    vote_average,
  }) {
    this.id = id;
    this.episodeRuntime = episode_runtime;
    this.firstAirDate = first_air_date;
    this.name = name;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = poster_path;
    this.voteAverage = vote_average;
  }

  static async create({
    id,
    episode_runtime,
    first_air_date,
    name,
    overview,
    popularity,
    poster_path,
    vote_average,
  }) {
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
        episode_runtime,
        first_air_date,
        name,
        overview,
        popularity,
        poster_path,
        vote_average,
      ]
    );

    return new TV({
      id,
      episode_runtime,
      first_air_date,
      name,
      overview,
      popularity,
      poster_path,
      vote_average,
    });
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

    return tv ? new TV(tv) : undefined;
  }
}

module.exports = TV;
