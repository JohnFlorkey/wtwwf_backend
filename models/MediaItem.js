const IMAGE_BASE_URL = require("../config");

class MediaItem {
  constructor({
    id,
    genres,
    overview,
    popularity,
    posterURL,
    releaseDate,
    title,
    type,
    voteAverage,
  }) {
    this.id = id;
    this.genres = genres;
    this.overview = overview;
    this.popularity = popularity;
    this.posterURL = posterURL;
    this.releaseDate = releaseDate;
    this.title = title;
    this.type = type;
    this.voteAverage = voteAverage;
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
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        vote_average,
      } = obj;
      const genres = genre_ids;
      const posterURL = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : null;
      const releaseDate = release_date;
      const voteAverage = vote_average;
      return new MediaItem({
        id,
        genres,
        overview,
        popularity,
        posterURL,
        releaseDate,
        title,
        type,
        voteAverage,
      });
    } else if (type === "tv") {
      const {
        id,
        genre_ids,
        overview,
        popularity,
        poster_path,
        first_air_date,
        name,
        vote_average,
      } = obj;
      const genres = genre_ids;
      const title = name;
      const posterURL = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : null;
      const releaseDate = first_air_date;
      const voteAverage = vote_average;
      return new MediaItem({
        id,
        genres,
        overview,
        popularity,
        posterURL,
        releaseDate,
        title,
        type,
        voteAverage,
      });
    }
  }
}

module.exports = MediaItem;
