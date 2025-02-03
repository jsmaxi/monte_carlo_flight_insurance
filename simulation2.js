class FlightInsuranceSimulation {
  static ITERATIONS = 100_000;
  static FLIGHTS_PER_YEAR = 100; // Assume number of flights per year
  static INSURANCE_COST = 25; // Cost of insurance per flight
  static PAYOUT = 200; // Payout if flight is late
  static INTERMEDIARY_FEE = 0.05; // Intermediary fee
  static PROBABILITY_LATE = 0.15; // Probability of a flight being late

  // Simulate one year of flight insurance
  simulateYear() {
    let travelerRevenue = 0;
    let intermediaryRevenue = 0;
    let insuranceCompanyRevenue = 0;

    for (let i = 0; i < FlightInsuranceSimulation.FLIGHTS_PER_YEAR; i++) {
      // Traveler buys insurance
      const insuranceCost = FlightInsuranceSimulation.INSURANCE_COST;
      travelerRevenue -= insuranceCost;

      // Intermediary takes a fee
      const intermediaryFee =
        insuranceCost * FlightInsuranceSimulation.INTERMEDIARY_FEE;
      intermediaryRevenue += intermediaryFee;

      // Insurance company receives the remaining amount
      insuranceCompanyRevenue += insuranceCost - intermediaryFee;

      // Check if the flight is late
      const isLate =
        Math.random() <= FlightInsuranceSimulation.PROBABILITY_LATE;

      if (isLate) {
        // Intermediary takes a fee from the payout
        const payoutFee =
          FlightInsuranceSimulation.PAYOUT *
          FlightInsuranceSimulation.INTERMEDIARY_FEE;
        intermediaryRevenue += payoutFee;

        // Traveler receives payout
        travelerRevenue += FlightInsuranceSimulation.PAYOUT - payoutFee;

        // Insurance company pays the amount
        insuranceCompanyRevenue -= FlightInsuranceSimulation.PAYOUT;
      }
    }

    return {
      travelerRevenue,
      intermediaryRevenue,
      insuranceCompanyRevenue,
    };
  }

  // Run Monte Carlo simulation
  runSimulation(iterations = FlightInsuranceSimulation.ITERATIONS) {
    let totalTravelerRevenue = 0;
    let totalIntermediaryRevenue = 0;
    let totalInsuranceCompanyRevenue = 0;

    for (let i = 0; i < iterations; i++) {
      const result = this.simulateYear();
      totalTravelerRevenue += result.travelerRevenue;
      totalIntermediaryRevenue += result.intermediaryRevenue;
      totalInsuranceCompanyRevenue += result.insuranceCompanyRevenue;
    }

    return {
      avgTravelerRevenue: totalTravelerRevenue / iterations,
      avgIntermediaryRevenue: totalIntermediaryRevenue / iterations,
      avgInsuranceCompanyRevenue: totalInsuranceCompanyRevenue / iterations,
    };
  }
}

// Run the simulation
const simulation = new FlightInsuranceSimulation();
const results = simulation.runSimulation();

// Print the results
console.log("Average Traveler Revenue:", results.avgTravelerRevenue);
console.log("Average Intermediary Revenue:", results.avgIntermediaryRevenue);
console.log(
  "Average Insurance Company Revenue:",
  results.avgInsuranceCompanyRevenue
);
