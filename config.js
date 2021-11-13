const TMDB_API_BASE_URL = "https://api.themoviedb.org";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const POSTER_SIZE_PATH = "/w154";
const IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL + POSTER_SIZE_PATH;
const PROVIDER_SIZE_PATH = "/w45";
const PROVIDER_IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL + PROVIDER_SIZE_PATH;

const DB_URI = "wtwwf";

module.exports = {
  DB_URI,
  IMAGE_BASE_URL,
  TMDB_API_BASE_URL,
  PROVIDER_IMAGE_BASE_URL,
};
