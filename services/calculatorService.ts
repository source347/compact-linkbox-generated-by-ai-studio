import { CalculatorState } from "../types";

export const calculatePotential = (state: CalculatorState): number => {
  const { dailyEarnings, days, compoundingRate } = state;
  
  // If no compounding, it's just linear earnings
  if (compoundingRate <= 0) {
    return dailyEarnings * days;
  }

  // Future Value of a Series formula (Annuity)
  // FV = P * ((1 + r)^n - 1) / r
  // where P = daily payment, r = daily interest rate (decimal), n = number of days
  
  const r = compoundingRate / 100;
  const potential = dailyEarnings * ((Math.pow(1 + r, days) - 1) / r);

  return potential;
};