const db = require("../db");

class Genre {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async create(newID, newName) {
    const result = await db.query(
      `INSERT INTO genre (
				id,
				name
			) VALUES (
				$1,
				$2
			) RETURNING id, name`,
      [newID, newName]
    );

    return new Genre(result.rows[0]);
  }
  static async getByID(genreID) {
    const result = await db.query(
      `SELECT
				id, name
			FROM genre
			WHERE id = $1`,
      [genreID]
    );

    const genre = result.rows[0];

    return genre ? new Genre(genre) : undefined;
  }

  static async getByMovieID(movieID) {
    const result = await db.query(
      `SELECT
        g.id,
        g.name
      FROM genre AS g
      INNER JOIN movie_genre AS mg ON mg.genre_id = g.id
      WHERE mg.movie_id = $1`,
      [movieID]
    );

    return result.rows;
  }

  static async getByTVID(tvID) {
    const result = await db.query(
      `SELECT
        g.id,
        g.name
      FROM genre AS g
      INNER JOIN tv_genre AS tg ON tg.genre_id = g.id
      WHERE tg.tv_id = $1`,
      [tvID]
    );

    return result.rows;
  }

  async save() {
    const result = await db.query(
      `UPDATE genre
			SET name = $1
			WHERE id = $2`,
      [this.name, this.id]
    );
  }

  static async upsert(id, name) {
    const genre = await Genre.getByID(id);
    if (genre) {
      if (genre.name !== name) {
        genre.name = name;
        genre.save();
      }
    } else {
      Genre.create(id, name);
    }
  }
}

module.exports = Genre;
