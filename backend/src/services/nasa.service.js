const axios = require("axios");

const NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1";

const fetchAsteroidFeed = async () => {
  const response = await axios.get(`${NASA_BASE_URL}/feed`, {
    params: {
      api_key: process.env.NASA_API_KEY
    }
  });
  return response.data;
};

const fetchAsteroidById = async (id) => {
  const response = await axios.get(`${NASA_BASE_URL}/neo/${id}`, {
    params: {
      api_key: process.env.NASA_API_KEY
    }
  });
  return response.data;
};

module.exports = {
  fetchAsteroidFeed,
  fetchAsteroidById
};
