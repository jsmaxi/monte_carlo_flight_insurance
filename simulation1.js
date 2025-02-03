// Simulation Parameters
const INSURANCE_COST = 25; // Cost of insurance per flight
const LATE_COMPENSATION = 200; // Compensation for late flights
const INTERMEDIARY_FEE_PERCENT = 0.02; // Commission fee for insurance intermediary
const NUM_SIMULATIONS = 100_000; // Number of Monte Carlo simulations
const FLIGHTS_PER_YEAR = 100; // Average number of flights per year for a traveler
const LATE_PROBABILITY = 0.15; // Probability of a flight being late

function monteCarloFlightInsurance() {
  let travelerTotalRevenue = 0;
  let intermediaryTotalRevenue = 0;
  let insuranceCompanyTotalRevenue = 0;

  for (let i = 0; i < NUM_SIMULATIONS; i++) {
    for (let j = 0; j < FLIGHTS_PER_YEAR; j++) {
      // Simulate if flight is late
      const flightLateProbability = Math.random();
      const isLate = flightLateProbability <= LATE_PROBABILITY;

      // Traveler Revenue Calculation
      const travelerCompensation = isLate
        ? LATE_COMPENSATION * (1 - INTERMEDIARY_FEE_PERCENT)
        : 0;
      const travelerRevenue = travelerCompensation - INSURANCE_COST;
      travelerTotalRevenue += travelerRevenue;

      // Intermediary Revenue Calculation
      const intermediaryCompensationFee = isLate
        ? LATE_COMPENSATION * INTERMEDIARY_FEE_PERCENT
        : INSURANCE_COST * INTERMEDIARY_FEE_PERCENT;
      intermediaryTotalRevenue += intermediaryCompensationFee;

      // Insurance Company Revenue Calculation
      const insuranceCompanyRevenue = isLate
        ? -LATE_COMPENSATION + INSURANCE_COST * (1 - INTERMEDIARY_FEE_PERCENT)
        : INSURANCE_COST * (1 - INTERMEDIARY_FEE_PERCENT);
      insuranceCompanyTotalRevenue += insuranceCompanyRevenue;
    }
  }

  console.log("Traveler", travelerTotalRevenue / NUM_SIMULATIONS);
  console.log("Intermediary", intermediaryTotalRevenue / NUM_SIMULATIONS);
  console.log("Insurance", insuranceCompanyTotalRevenue / NUM_SIMULATIONS);
}

// Run the simulation
monteCarloFlightInsurance();
