const db = require("../db");
const ExpressError = require("../expressError");

class TV {
  constructor(
    id,
    added_date,
    episode_runtime = [],
    first_air_date,
    name,
    overview,
    popularity,
    poster_path,
    vote_average
  ) {
    this.id = id;
    this.addedDate = added_date;
    this.episodeRuntime = episode_runtime;
    this.firstAirDate = first_air_date;
    this.name = name;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = poster_path;
    this.voteAverage = vote_average;
  }

  static async getAll(userID) {
    const result = await db.query(
      `SELECT
				t.id,
				ut.added_date,
				t.episode_runtime,
				t.first_air_date,
				t.name,
				t.overview,
				t.popularity,
				t.poster_path,
				t.vote_average
			FROM tv AS t
			INNER JOIN user_tv AS ut ON ut.tv_id = t.id
			WHERE ut.user_id = $1`,
      [userID]
    );

    const tv = result.rows.map(
      (r) =>
        new TV(
          r.id,
          r.added_date,
          r.episode_runtime,
          r.first_air_date,
          r.name,
          r.overview,
          r.popularity,
          r.poster_path,
          r.vote_average
        )
    );

    return tv;
  }
}

module.exports = TV;