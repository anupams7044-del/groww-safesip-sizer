"use client";

import React, { useState } from "react";
import { CashflowMonth } from "@/lib/types";
import { AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";

interface CashflowTableProps {
  historicalData: CashflowMonth[];
  lowestSurplusMonthName?: string;
}

export const CashflowTable: React.FC<CashflowTableProps> = ({
  historicalData,
  lowestSurplusMonthName,
}) => {
  const [showItemized, setShowItemized] = useState(true);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">
            6-Month Cashflow Breakdown (Via RBI AA)
          </h3>
          <p className="text-xs text-gray-500">
            Transparent view of fixed bills vs. irregular lifestyle spikes
          </p>
        </div>
        <button
          onClick={() => setShowItemized(!showItemized)}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg"
        >
          <span>{showItemized ? "Compact View" : "Itemized View"}</span>
          {showItemized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-left text-xs border-collapse min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-2.5 font-bold">Month</th>
              <th className="py-2.5 px-2 font-bold text-right">Salary Inflow</th>
              <th className="py-2.5 px-2 font-bold text-right">Fixed Bills</th>
              <th className="py-2.5 px-2 font-bold text-right">Varied / Spikes</th>
              <th className="py-2.5 px-2.5 font-bold text-right">Net Surplus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historicalData.map((m, idx) => {
              const isLowest = m.isLowestSurplusMonth || m.month === lowestSurplusMonthName;
              return (
                <React.Fragment key={idx}>
                  <tr
                    className={`transition-colors ${
                      isLowest
                        ? "bg-red-50/50 hover:bg-red-50 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-2.5 px-2.5 font-semibold text-gray-900 flex items-center gap-1.5">
                      {m.month}
                      {isLowest && (
                        <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">
                          Stress Month
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium text-gray-700">
                      ₹{m.salary.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium text-gray-600">
                      ₹{m.fixedCommitments.totalFixed.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium text-gray-600">
                      ₹{m.variedLifestyle.totalVaried.toLocaleString("en-IN")}
                    </td>
                    <td
                      className={`py-2.5 px-2.5 text-right font-bold ${
                        m.netSurplus < 2000 ? "text-red-600" : "text-emerald-700"
                      }`}
                    >
                      {m.netSurplus < 0 ? "-" : ""}₹
                      {Math.abs(m.netSurplus).toLocaleString("en-IN")}
                    </td>
                  </tr>

                  {/* Itemized Sub-rows when toggled */}
                  {showItemized && (
                    <tr className="bg-gray-50/40 text-[11px] text-gray-500">
                      <td colSpan={5} className="py-2.5 px-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-1">
                          <div>
                            <span className="font-semibold text-gray-700 block text-[10px] uppercase">
                              Fixed Itemization:
                            </span>
                            <span>
                              Rent: ₹{m.fixedCommitments.rent.toLocaleString("en-IN")} | EMI: ₹
                              {m.fixedCommitments.emis.toLocaleString("en-IN")} | Family: ₹
                              {m.fixedCommitments.familySupport.toLocaleString("en-IN")} | Utilities: ₹
                              {m.fixedCommitments.insuranceAndUtilities.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700 block text-[10px] uppercase">
                              Varied &amp; Spike Details:
                            </span>
                            <span>
                              Living: ₹
                              {(
                                m.variedLifestyle.groceriesAndDineOut +
                                m.variedLifestyle.shoppingAndLeisure
                              ).toLocaleString("en-IN")}{" "}
                              | Spike:{" "}
                              <strong className={isLowest ? "text-red-700" : "text-gray-800"}>
                                ₹{m.variedLifestyle.adhocSpikes.toLocaleString("en-IN")}
                              </strong>{" "}
                              ({m.variedLifestyle.spikeReason})
                            </span>
                          </div>
                        </div>

                        {/* Explicit Contextual Explainer for Negative / Deficit Stress Months */}
                        {isLowest && (
                          <div className="mt-2.5 pt-2 border-t border-red-200 text-[11px] text-red-950 bg-red-100/60 p-2.5 rounded-xl space-y-1">
                            <span className="font-bold flex items-center gap-1.5 text-red-900 text-xs">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                              What does the investor do in this negative (deficit) month?
                            </span>
                            <div className="text-[11px] text-red-900/90 space-y-1 leading-relaxed pl-1">
                              <p>
                                <strong>1. Prior Month Balance Buffer:</strong> In real life, she absorbed this -₹1,000 spike from May&apos;s +₹9,000 accumulated surplus (+₹9,000 - ₹1,000 = ₹8,000 cash remaining).
                              </p>
                              <p>
                                <strong>2. Why SafeSIP (₹2,000) Survives:</strong> A ₹2,000 SIP easily clears without overdraft (leaving ₹6,000 buffer). If she had picked a naive ₹8,000 payday SIP, the account would drop below zero and trigger a ₹450 bank bounce penalty!
                              </p>
                              <p>
                                <strong>3. Emergency In-App Control:</strong> If cash is ever tight, Groww allows a <strong>1-Tap temporary step-down (to ₹500) or 1-month pause for ₹0 fee</strong> without cancelling the SIP.
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-2.5 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
        <span>
          <strong>Why this matters:</strong> Notice the sudden spikes in net surplus due to unplanned events (e.g., dental emergencies, wedding trips, or peer loans). Sizing your SIP against your worst month ensures your bank account never drops below zero.
        </span>
      </div>
    </div>
  );
};
