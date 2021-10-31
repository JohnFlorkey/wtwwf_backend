const IMAGE_BASE_URL = require("../config");

class MediaItem {
  constructor({
    id,
    genres,
    keywords = [],
    overview,
    popularity,
    posterURL,
    releaseDate,
    runtime,
    title,
    type,
    voteAverage,
    watchProviders = [],
  }) {
    this.id = id;
    this.genres = genres;
    this.keywords = keywords;
    this.overview = overview;
    this.popularity = popularity;
    this.posterURL = posterURL;
    this.releaseDate = releaseDate;
    this.runtime = runtime;
    this.title = title;
    this.type = type;
    this.voteAverage = voteAverage;
    this.watchProviders = watchProviders;
  }

  /**
   * Takes an object as an input parameter and returns a MediaItem object.
   * @param {object} obj
   */
  static factory(obj, type) {
    if (type === "movies") {
      const {
        id,
        genre_ids,
        keywords,
        overview,
        popularity,
        poster_path,
        release_date,
        runtime,
        title,
        vote_average,
        watchProviders,
      } = obj;
      const genres = genre_ids;
      const posterURL = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : null;
      const releaseDate = release_date;
      const voteAverage = vote_average;
      return new MediaItem({
        id,
        genres,
        keywords,
        overview,
        popularity,
        posterURL,
        releaseDate,
        runtime,
        title,
        type,
        voteAverage,
        watchProviders,
      });
    } else if (type === "tv") {
      const {
        id,
        episode_run_time,
        genre_ids,
        keywords,
        overview,
        popularity,
        poster_path,
        first_air_date,
        name,
        vote_average,
        watchProviders,
      } = obj;
      const genres = genre_ids;
      const title = name;
      const posterURL = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : null;
      const releaseDate = first_air_date;
      const runtime = episode_run_time;
      const voteAverage = vote_average;
      return new MediaItem({
        id,
        genres,
        keywords,
        overview,
        popularity,
        posterURL,
        releaseDate,
        runtime,
        title,
        type,
        voteAverage,
        watchProviders,
      });
    }
  }
}

module.exports = MediaItem;
