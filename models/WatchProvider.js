const axios = require("axios");
const { PROVIDER_IMAGE_BASE_URL, TMDB_API_BASE_URL } = require("../config");
const token = process.env.TMDB_API_BEARER_TOKEN;

class WatchProvider {
  constructor({ display_priority, logo_path, provider_id, provider_name }) {
    this.displayPriority = display_priority;
    this.logoPath = logo_path ? PROVIDER_IMAGE_BASE_URL + logo_path : undefined;
    this.providerID = provider_id;
    this.providerName = provider_name;
  }

  static buildWatchProviderList(watchProviderData) {
    const { buy, rent, flatrate } = watchProviderData;
    const buyWatchProviders = buy ? buy.map((b) => new WatchProvider(b)) : [];
    const rentWatchProviders = rent
      ? rent.map((r) => new WatchProvider(r))
      : [];
    const flatrateWatchProviders = flatrate
      ? flatrate.map((f) => new WatchProvider(f))
      : [];

    const watchProviderList = {
      buyWatchProviders,
      rentWatchProviders,
      flatrateWatchProviders,
    };
    return watchProviderList;
  }

  static async getByMovieID(movieID) {
    const country = "US"; // get this from the logged in user later
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/movie/${movieID}/watch/providers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const watchProviderData = response.data.results[country];
    const watchProviderList =
      WatchProvider.buildWatchProviderList(watchProviderData);

    return watchProviderList;
  }

  static async getByTVID(tvID) {
    const country = "US"; // get this from the logged in user later
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/3/tv/${tvID}/watch/providers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const watchProviderData = response.data.results[country];
    const watchProviderList =
      WatchProvider.buildWatchProviderList(watchProviderData);

    return watchProviderList;
  }
}

module.exports = WatchProvider;
