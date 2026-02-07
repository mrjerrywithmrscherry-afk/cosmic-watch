const calculateRiskScore = (asteroid) => {
  const closeData = asteroid.close_approach_data[0];

  const velocity = parseFloat(
    closeData.relative_velocity.kilometers_per_hour
  );

  const missDistance = parseFloat(
    closeData.miss_distance.kilometers
  );

  const hazardous = asteroid.is_potentially_hazardous_asteroid ? 1 : 0;

  let riskScore = 0;
  riskScore += velocity / 10000;
  riskScore += (1 / missDistance) * 100000;
  riskScore += hazardous * 2;

  return Number(riskScore.toFixed(2));
};

module.exports = {
  calculateRiskScore
};
