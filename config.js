const TMDB_API_BASE_URL = "https://api.themoviedb.org";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const POSTER_SIZE_PATH = "/w154";
const IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL + POSTER_SIZE_PATH;
const PROVIDER_SIZE_PATH = "/w45";
const PROVIDER_IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL + PROVIDER_SIZE_PATH;
const BCRYPT_WORK_FACTOR = 12;

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///wtwwf_test"
    : "postgresql:///wtwwf";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  BCRYPT_WORK_FACTOR,
  DB_URI,
  IMAGE_BASE_URL,
  JWT_SECRET_KEY,
  TMDB_API_BASE_URL,
  PROVIDER_IMAGE_BASE_URL,
};
