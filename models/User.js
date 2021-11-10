const db = require("../db");
const ExpressError = require("../expressError");
const Movie = require("./Movie");
const TV = require("./TV");

class User {
  constructor({ id, country, email, password, username }) {
    this.id = id;
    this.country = country;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  async addMovie(id) {
    const result = await db.query(
      `INSERT INTO user_movie (
        movie_id,
        user_id
      ) VALUES ($1, $2)
      RETURNING id`,
      [id, this.id]
    );
    return id;
  }

  async addTV(id) {
    const result = await db.query(
      `INSERT INTO user_tv (
        tv_id,
        user_id
      ) VALUES ($1, $2)
      RETURNING id`,
      [id, this.id]
    );
    return id;
  }

  async deleteMovie(movieID) {
    try {
      const result = await db.query(
        `DELETE FROM user_movie
        WHERE movie_id = $1
          AND user_id = $2
        RETURNING movie_id`,
        [movieID, this.id]
      );
      const deleteResult = result.rows[0];
      const deleteID = deleteResult.movie_id;

      return deleteID;
    } catch (e) {
      console.log(e);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query(
        `SELECT
          id,
          country,
          email,
          password,
          username
        FROM user_profile
        WHERE id = $1
        `,
        [id]
      );

      const user = result.rows[0];

      return new User(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getMovies() {
    try {
      const result = await db.query(
        `SELECT
          m.id,
          m.overview,
          m.popularity,
          m.poster_path,
          m.release_date,
          m.runtime,
          m.title,
          m.vote_average
        FROM user_movie AS um
        INNER JOIN movie AS m ON m.id = um.movie_id
        WHERE um.user_id = $1
        `,
        [this.id]
      );

      const movies = result.rows.map((m) => new Movie(m));

      return movies;
    } catch (e) {
      console.log(e);
    }
  }

  async getTV() {
    try {
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
        [this.id]
      );

      const tv = result.rows.map((t) => new TV(t));

      return tv;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = User;
