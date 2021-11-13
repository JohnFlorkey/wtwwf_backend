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

  static async getByFriendGroupID(friendGroupID) {
    try {
      const result = await db.query(
        `SELECT
          up.id,
          up.country,
          up.email,
          up.password,
          up.username
        FROM user_profile AS up
        INNER JOIN user_friend_group AS ufg ON ufg.user_id = up.id
        WHERE ufg.friend_group_id = $1`,
        [friendGroupID]
      );

      let users = [];
      if (result.rows.length > 0) users = result.rows.map((u) => new User(u));

      return users;
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

      const movies = await Promise.all(result.rows.map((m) => Movie.build(m)));

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
				WHERE ut.user_id = $1
          AND ut.watched = false`,
        [this.id]
      );

      const tv = await Promise.all(result.rows.map((t) => TV.build(t)));

      return tv;
    } catch (e) {
      console.log(e);
    }
  }

  async watchedTV(tvID) {
    try {
      const result = await db.query(
        `UPDATE user_tv
        SET watched = true
        WHERE tv_id = $1
          AND user_id = $2`,
        [tvID, this.id]
      );

      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = User;
