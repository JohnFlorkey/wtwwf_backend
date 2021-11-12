const db = require("../db");
const axios = require("axios");
const { TMDB_API_BASE_URL } = require("../config");
const token = process.env.TMDB_API_BEARER_TOKEN;

class Keyword {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async create(newID, newName) {
    const keyword = await Keyword.getByID(newID);
    if (!keyword) {
      const result = await db.query(
        `INSERT INTO keyword (
					id,
					name
				) VALUES (
					$1,
					$2
				) RETURNING id, name`,
        [newID, newName]
      );

      return new Keyword(result.rows[0]);
    }

    return keyword;
  }
  static async getByID(keywordID) {
    const result = await db.query(
      `SELECT
				id, name
			FROM keyword
			WHERE id = $1`,
      [keywordID]
    );

    const keyword = result.rows[0];

    return keyword ? new Keyword(keyword) : undefined;
  }

  static async getByMovieID(movieID) {
    const result = await db.query(
      `SELECT
        k.id,
        k.name
      FROM keyword AS k
      INNER JOIN movie_keyword AS mk ON mk.keyword_id = k.id
      WHERE mk.movie_id = $1`,
      [movieID]
    );

    return result.rows;
  }

  static async getByTVID(tvID) {
    const result = await db.query(
      `SELECT
        k.id,
        k.name
      FROM keyword AS k
      INNER JOIN tv_keyword AS tk ON tk.keyword_id = k.id
      WHERE tk.tv_id = $1`,
      [tvID]
    );

    return result.rows;
  }

  static async getFromExtAPIByMovieID(movieID) {
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/movie/${movieID}/keywords`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const keywords = await Promise.all(
      response.data.keywords.map((k) => Keyword.create(k.id, k.name))
    );

    return keywords;
  }

  static async getFromExtAPIByTVID(tvID) {
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/tv/${tvID}/keywords`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let keywords = [];
    if (response.data.results.length > 0) {
      keywords = await Promise.all(
        response.data.results.map((k) => Keyword.create(k.id, k.name))
      );
    }

    return keywords;
  }

  // static async getByTVID(tvID) {
  //   const result = await db.query(
  //     `SELECT
  //       k.id,
  //       k.name
  //     FROM keyword AS k
  //     INNER JOIN tv_keyword AS tk ON tk.keyword_id = k.id
  //     WHERE tk.tv_id = $1`,
  //     [tvID]
  //   );

  //   return result.rows;
  // }

  // async save() {
  //   const result = await db.query(
  //     `UPDATE genre
  // 		SET name = $1
  // 		WHERE id = $2`,
  //     [this.name, this.id]
  //   );
  // }

  // static async upsert(id, name) {
  //   const genre = await Genre.getByID(id);
  //   if (genre) {
  //     if (genre.name !== name) {
  //       genre.name = name;
  //       genre.save();
  //     }
  //   } else {
  //     Genre.create(id, name);
  //   }
  // }
}

module.exports = Keyword;
