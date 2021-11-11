const db = require("../db");
const add = require("date-fns/add");
const isBefore = require("date-fns/isBefore");
const axios = require("axios");
const { TMDB_API_BASE_URL } = require("../config");
const Genre = require("../models/Genre");
const genreSyncPeriodHours = process.env.GENRE_SYNC_PERIOD_HOURS;
const token = process.env.TMDB_API_BEARER_TOKEN;

/**
 * Get all genres from TMDB and update db
 */
async function syncGenres() {
  try {
    const lastSyncResult = await db.query(
      `SELECT value
			FROM app_data
			WHERE app_data_key = 'lastGenreSync'`
    );

    const lastSync = new Date(lastSyncResult.rows[0].value);
    const duration = { hours: genreSyncPeriodHours };
    const nextSync = add(lastSync, duration);

    if (isBefore(nextSync, Date.now())) {
      // get the movie genres from tmdb
      const movieGenreResult = await axios.get(
        `${TMDB_API_BASE_URL}/3/genre/movie/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // get the tv genres from tmdb
      const tvGenreResult = await axios.get(
        `${TMDB_API_BASE_URL}/3/genre/tv/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // merge the lists
      genres = {};
      movieGenreResult.data.genres.map((r) => (genres[r.id] = r));
      tvGenreResult.data.genres.map((r) => (genres[r.id] = r));

      // update genres in our db
      for (let g of Object.values(genres)) {
        Genre.upsert(g.id, g.name);
      }

      // update the lastGenreSync in app_data
      const result = await db.query(
        `UPDATE app_data
				SET value = now()
				WHERE app_data_key = 'lastGenreSync'`
      );
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = syncGenres;
