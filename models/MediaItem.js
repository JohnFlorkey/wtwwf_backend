const { IMAGE_BASE_URL } = require("../config");

class MediaItem {
  constructor(
    id,
    genres = [],
    keywords = [],
    overview,
    popularity,
    posterURL,
    releaseDate,
    runtime,
    title,
    type,
    voteAverage,
    watchProviders = []
  ) {
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
   * Takes a Movie or TV object as an input parameter and returns a MediaItem object.
   * @param {object} obj
   */
  static factory(obj) {
    if (Object.getPrototypeOf(obj).constructor.name === "Movie") {
      const posterURL = obj.posterPath
        ? `${IMAGE_BASE_URL}${obj.posterPath}`
        : null;

      return new MediaItem(
        obj.id,
        obj.genres,
        obj.keywords,
        obj.overview,
        obj.popularity,
        posterURL,
        obj.releaseDate,
        obj.runtime,
        obj.title,
        "movies",
        obj.voteAverage,
        obj.watchProviders
      );
    } else if (Object.getPrototypeOf(obj).constructor.name === "TV") {
      const posterURL = obj.posterPath
        ? `${IMAGE_BASE_URL}${obj.posterPath}`
        : null;
      const episodeRuntime =
        obj.episodeRuntime && obj.episodeRuntime.length > 0
          ? obj.episodeRuntime[0]
          : undefined;

      return new MediaItem(
        obj.id,
        obj.genres,
        obj.keywords,
        obj.overview,
        obj.popularity,
        posterURL,
        obj.firstAirDate,
        episodeRuntime,
        obj.name,
        "tv",
        obj.voteAverage,
        obj.watchProviders
      );
    }
  }
}

module.exports = MediaItem;
