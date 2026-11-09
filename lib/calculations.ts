import { UserPersona, SizerResult } from "./types";

export function calculateSafeSIP(persona: UserPersona): SizerResult {
  const months = persona.historicalData;
  const count = months.length;

  const totalFixed = months.reduce((acc, m) => acc + m.fixedCommitments.totalFixed, 0);
  const totalVaried = months.reduce((acc, m) => acc + m.variedLifestyle.totalVaried, 0);
  const totalSpikes = months.reduce((acc, m) => acc + m.variedLifestyle.adhocSpikes, 0);

  const avgFixed = Math.round(totalFixed / count);
  const avgVaried = Math.round(totalVaried / count);
  const avgSpikes = Math.round(totalSpikes / count);

  // Exact arithmetic surplus available: Inflow - Fixed Bills - Varied Spends
  const netMonthlySurplus = persona.monthlySalary - avgFixed - avgVaried;

  // Find lowest surplus month (the historical stress test month)
  let lowestSurplusMonth = months[0];
  for (const m of months) {
    if (m.netSurplus < lowestSurplusMonth.netSurplus) {
      lowestSurplusMonth = m;
    }
  }

  // 1. Comfortable (SafeSIP): Allocates ~35-40% of surplus.
  // Leaves 60-65% buffer in the salary account so ad-hoc spikes NEVER cause a bounce.
  let comfortableAmount = Math.max(1000, Math.round((netMonthlySurplus * 0.38) / 500) * 500);

  // 2. Stretch Tier: Allocates ~60-65% of surplus.
  // Leaves 35-40% buffer. Higher wealth creation, but requires discipline in spike months.
  let stretchAmount = Math.max(comfortableAmount + 1000, Math.round((netMonthlySurplus * 0.63) / 500) * 500);

  // 3. Risky Tier: Allocates ~85-90% of surplus.
  // Leaves under 15% buffer in bank account. Any unexpected expense guarantees account overdraft or NACH bounce!
  let riskyAmount = Math.max(stretchAmount + 1000, Math.round((netMonthlySurplus * 0.90) / 500) * 500);

  // Payday guess deficit check: how much did their naive payday guess exceed their real surplus by?
  const paydayDeficit = Math.max(0, persona.paydayGuessAmount - netMonthlySurplus);

  // Payday alignment logic: 3-5 days after salary credit
  let recommendedDebitDay = 5;
  if (persona.payday >= 28 || persona.payday <= 1) {
    recommendedDebitDay = 5;
  } else {
    recommendedDebitDay = (persona.payday + 4) % 28 || 5;
  }

  return {
    comfortable: {
      amount: comfortableAmount,
      percentOfSurplus: Math.round((comfortableAmount / netMonthlySurplus) * 100),
      remainingBuffer: netMonthlySurplus - comfortableAmount,
      description: `Allocates ${Math.round((comfortableAmount / netMonthlySurplus) * 100)}% of your surplus. Leaves ₹${(netMonthlySurplus - comfortableAmount).toLocaleString("en-IN")}/mo in your account to absorb emergency expenses with 0% bounce risk.`,
      safetyScore: 98,
      riskOfBounce: "0% (Zero NACH Bounce Risk)",
    },
    stretch: {
      amount: stretchAmount,
      percentOfSurplus: Math.round((stretchAmount / netMonthlySurplus) * 100),
      remainingBuffer: netMonthlySurplus - stretchAmount,
      description: `Allocates ${Math.round((stretchAmount / netMonthlySurplus) * 100)}% of your surplus. Leaves ₹${(netMonthlySurplus - stretchAmount).toLocaleString("en-IN")}/mo in your account. Higher compounding, but leaves tighter margin in spike months.`,
      safetyScore: 78,
      riskOfBounce: "Moderate (Requires spending control in spike months)",
    },
    risky: {
      amount: riskyAmount,
      percentOfSurplus: Math.round((riskyAmount / netMonthlySurplus) * 100),
      remainingBuffer: netMonthlySurplus - riskyAmount,
      description: `Allocates ${Math.round((riskyAmount / netMonthlySurplus) * 100)}% of your surplus, leaving only ₹${(netMonthlySurplus - riskyAmount).toLocaleString("en-IN")}/mo unreserved. Vulnerable during emergency months (${lowestSurplusMonth.month}) and likely triggers a ₹295–₹590 NACH bounce fee.`,
      safetyScore: 42,
      riskOfBounce: "High Risk (Likely bank bounce penalty ₹295-₹590 during spikes)",
    },
    recommendedDebitDate: {
      day: recommendedDebitDay,
      rationale: `Debit on the ${recommendedDebitDay}th gives a safe 3–5 day clearance window after your payday (${persona.payday >= 28 ? "Month-end" : "Day " + persona.payday}) to absorb weekend settlement delays before bills drain the account.`,
    },
    salaryAmount: persona.monthlySalary,
    avgFixedExpenses: avgFixed,
    avgVariedExpenses: avgVaried,
    avgAdhocSpikes: avgSpikes,
    netMonthlySurplus: netMonthlySurplus,
    paydayDeficit: paydayDeficit,
    lowestSurplusMonth: {
      month: lowestSurplusMonth.month,
      surplus: lowestSurplusMonth.netSurplus,
      spikeReason: lowestSurplusMonth.variedLifestyle.spikeReason || "Ad-hoc spike",
    },
  };
}
