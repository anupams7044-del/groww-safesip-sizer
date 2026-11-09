export interface CashflowMonth {
  month: string;
  salary: number;
  fixedCommitments: {
    rent: number;
    emis: number;
    insuranceAndUtilities: number;
    familySupport: number;
    totalFixed: number;
  };
  variedLifestyle: {
    groceriesAndDineOut: number;
    shoppingAndLeisure: number;
    adhocSpikes: number; // e.g., medical, bike savings, trips, friend loans
    spikeReason?: string;
    totalVaried: number;
  };
  netSurplus: number;
  isLowestSurplusMonth?: boolean;
}

export interface UserPersona {
  id: string;
  name: string;
  tagline: string;
  lifecycleStage: "Day 0 New Investor" | "Month 5 At-Risk User" | "Month 13 Retained User";
  badgeColor: string;
  age: number;
  profession: string;
  monthlySalary: number;
  payday: number; // day of month salary arrives (e.g. 1 or 31)
  story: string;
  paydayGuessAmount: number; // what they blindly pick on payday
  historicalData: CashflowMonth[];
}

export interface SizerResult {
  comfortable: {
    amount: number;
    percentOfSurplus: number;
    remainingBuffer: number;
    description: string;
    safetyScore: number;
    riskOfBounce: "0% (Zero NACH Bounce Risk)" | "< 2% Low Risk";
  };
  stretch: {
    amount: number;
    percentOfSurplus: number;
    remainingBuffer: number;
    description: string;
    safetyScore: number;
    riskOfBounce: "Moderate (Requires spending control in spike months)";
  };
  risky: {
    amount: number;
    percentOfSurplus: number;
    remainingBuffer: number;
    description: string;
    safetyScore: number;
    riskOfBounce: "High Risk (Likely bank bounce penalty ₹295-₹590 during spikes)";
  };
  recommendedDebitDate: {
    day: number;
    rationale: string;
  };
  salaryAmount: number;
  avgFixedExpenses: number;
  avgVariedExpenses: number;
  avgAdhocSpikes: number;
  netMonthlySurplus: number;
  paydayDeficit: number;
  lowestSurplusMonth: {
    month: string;
    surplus: number;
    spikeReason: string;
  };
}
