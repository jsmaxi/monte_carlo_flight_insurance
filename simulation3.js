function monteCarloSimulation() {
  const simulations = 100_000; // Number of Monte Carlo simulations
  const daysInYear = 365; // Simulate for one year
  const flightsPerYear = 100; // Traveler buys insurance for all flights per year

  let totalTravelerRevenue = 0;
  let totalInsuranceRevenue = 0;
  let totalIntermediaryRevenue = 0;

  const insuranceCost = 25; // Cost of insurance per flight
  const intermediaryCut = 0.05; // Intermediary cut
  const delayProbability = 0.1; // Chance of delay
  const delayPayout = 200; // Average payout if delayed

  for (let i = 0; i < simulations; i++) {
    let yearlyTravelerRevenue = 0;
    let yearlyInsuranceRevenue = 0;
    let yearlyIntermediaryRevenue = 0;

    for (let day = 1; day <= daysInYear; day++) {
      if (day <= flightsPerYear) {
        yearlyTravelerRevenue -= insuranceCost;

        // Intermediary takes % of the insurance cost
        const intermediaryShare = insuranceCost * intermediaryCut;
        yearlyIntermediaryRevenue += intermediaryShare;

        // Insurance company receives the remaining %
        yearlyInsuranceRevenue += insuranceCost - intermediaryShare;

        // Simulate whether the flight is delayed
        const isDelayed = Math.random() <= delayProbability;

        if (isDelayed) {
          // Intermediary takes % of the payout
          yearlyIntermediaryRevenue += delayPayout * intermediaryCut;
          // Traveler receives payout
          yearlyTravelerRevenue += delayPayout - delayPayout * intermediaryCut;
          // Insurance company pays out
          yearlyInsuranceRevenue -= delayPayout;
        }
      }
    }

    // Accumulate results over all simulations
    totalTravelerRevenue += yearlyTravelerRevenue;
    totalInsuranceRevenue += yearlyInsuranceRevenue;
    totalIntermediaryRevenue += yearlyIntermediaryRevenue;
  }

  // Calculate averages
  const avgTravelerRevenue = totalTravelerRevenue / simulations;
  const avgInsuranceRevenue = totalInsuranceRevenue / simulations;
  const avgIntermediaryRevenue = totalIntermediaryRevenue / simulations;

  // Print results
  console.log("Revenue for Traveler: ", avgTravelerRevenue);
  console.log("Revenue for Intermediary: ", avgIntermediaryRevenue);
  console.log("Revenue for Insurance Company: ", avgInsuranceRevenue);
}

// Run the simulation
monteCarloSimulation();
