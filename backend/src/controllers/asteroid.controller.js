const nasaService = require("../services/nasa.service");
const riskService = require("../services/risk.service");

const formatAsteroidData = (asteroid) => {
  const approach = asteroid.close_approach_data[0];

  return {
    name: asteroid.name,
    neo_reference_id: asteroid.neo_reference_id,
    estimated_diameter: {
      min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
      max: asteroid.estimated_diameter.kilometers.estimated_diameter_max
    },
    close_approach_date: approach.close_approach_date,
    miss_distance_km: approach.miss_distance.kilometers,
    relative_velocity_kmph: approach.relative_velocity.kilometers_per_hour,
    is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
    risk_score: riskService.calculateRiskScore(asteroid)
  };
};

const getAsteroidFeed = async (req, res) => {
  try {
    const data = await nasaService.fetchAsteroidFeed();

    const asteroids = Object.values(data.near_earth_objects)
      .flat()
      .map(formatAsteroidData);

    res.json({
      count: asteroids.length,
      data: asteroids
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asteroid feed" });
  }
};

const getAsteroidById = async (req, res) => {
  try {
    const asteroid = await nasaService.fetchAsteroidById(req.params.id);
    res.json(formatAsteroidData(asteroid));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asteroid details" });
  }
};

module.exports = {
  getAsteroidFeed,
  getAsteroidById
};
