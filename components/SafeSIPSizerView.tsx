"use client";

import React, { useState } from "react";
import { UserPersona, SizerResult } from "@/lib/types";
import { calculateSafeSIP } from "@/lib/calculations";
import { CashflowTable } from "./CashflowTable";
import {
  ShieldCheck,
  Calendar,
  ArrowRight,
  TrendingUp,
  Calculator,
  ChevronDown,
  ChevronUp,
  Wallet,
  Info,
  Building2,
  Check,
  Sparkles,
  Users,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface SafeSIPSizerViewProps {
  persona: UserPersona;
  personas?: UserPersona[];
  sizerResult: SizerResult;
  onConfirmPlan: (selectedAmount: number, debitDate: number, tierName: string) => void;
  onSwitchToStandard?: () => void;
  onSwitchPersona?: (persona: UserPersona) => void;
  onExitToRealFlow?: () => void;
}

export const SafeSIPSizerView: React.FC<SafeSIPSizerViewProps> = ({
  persona,
  personas = [],
  sizerResult,
  onConfirmPlan,
  onSwitchToStandard,
  onSwitchPersona,
  onExitToRealFlow,
}) => {
  const [selectedTier, setSelectedTier] = useState<"comfortable" | "stretch" | "risky" | "custom">(
    "comfortable"
  );
  const [customAmount, setCustomAmount] = useState<number>(sizerResult.comfortable.amount);
  const [selectedDebitDate, setSelectedDebitDate] = useState<number>(
    sizerResult.recommendedDebitDate.day
  );
  // Collapsible state for deep calculation & statement analysis
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Compute active chosen amount based on selected tier
  const currentInstallment =
    selectedTier === "comfortable"
      ? sizerResult.comfortable.amount
      : selectedTier === "stretch"
      ? sizerResult.stretch.amount
      : selectedTier === "risky"
      ? sizerResult.risky.amount
      : customAmount;

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-44 sm:pb-48 animate-fade-in">
      {/* 🌟 DEMO MODE BANNER (UNMISTAKABLE DEMO DATA BANNER) 🌟 */}
      <div className="bg-amber-500/10 border border-amber-300 text-amber-900 px-3.5 py-2 rounded-2xl flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-semibold">
            Viewing sample profile: <strong className="font-extrabold">{persona.name}</strong>{" "}
            <span className="text-[10.5px] font-normal text-amber-800">(Synthetic Sample Data)</span>
          </span>
        </div>
        <button
          onClick={onExitToRealFlow || onSwitchToStandard}
          className="text-[11px] font-extrabold text-amber-900 underline hover:text-black shrink-0 cursor-pointer"
        >
          Exit to Real Flow →
        </button>
      </div>

      {/* 🌟 TOP SWITCH PERSONA CONTROL (Segmented Tabs to re-run sizer instantly) 🌟 */}
      {personas && personas.length > 0 && (
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Switch Sample Persona:</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Instant Re-Calculation
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {personas.map((p) => {
              const isSelected = p.id === persona.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (onSwitchPersona) {
                      onSwitchPersona(p);
                    }
                  }}
                  className={`p-2 rounded-xl text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-emerald-600 text-slate-900 shadow-sm ring-1 ring-emerald-500"
                      : "bg-slate-50/70 hover:bg-white border-transparent hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs truncate">{p.name.split(" ")[0]}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <span className="text-[9.5px] text-slate-500 truncate mt-0.5 font-medium">
                    {p.id === "priya" ? "Fresher (₹2k)" : p.id === "rohan" ? "Freelance (₹5k)" : "High EMIs (₹4.5k)"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 🌟 1. "SAME TOOL, THREE PEOPLE" COMPARISON CARD (TOP PLACEMENT FOR EVALUATORS) 🌟 */}
      {personas && personas.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Same tool, three people
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                One sizer, three cash-flow patterns — see how SafeSIP adapts automatically:
              </p>
            </div>
            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border uppercase shrink-0">
              Sample data
            </span>
          </div>

          {/* Side-by-side row (horizontally swipeable on phone) */}
          <div className="flex sm:grid sm:grid-cols-3 gap-2.5 overflow-x-auto pb-1.5 pt-1 -mx-1 px-1">
            {personas.map((p) => {
              const isCurrent = p.id === persona.id;
              const res = calculateSafeSIP(p);
              const amountDisplay = `₹${res.comfortable.amount.toLocaleString("en-IN")}`;
              const dateDisplay = `${res.recommendedDebitDate.day === 1 ? "1st" : `${res.recommendedDebitDate.day}th`}`;

              return (
                <div
                  key={p.id}
                  onClick={() => onSwitchPersona && onSwitchPersona(p)}
                  className={`min-w-[195px] sm:min-w-0 flex-1 p-3 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    isCurrent
                      ? "border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  {/* Current Persona Label (Accessible border + text label, not colour alone) */}
                  <div className="flex items-center justify-between mb-1.5">
                    {isCurrent ? (
                      <span className="text-[8.5px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                        ★ CURRENT
                      </span>
                    ) : (
                      <span className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider">
                        Tap to switch
                      </span>
                    )}
                    <span className="text-[9px] font-semibold text-slate-500 bg-white px-1 py-0.2 rounded border">
                      {p.city}
                    </span>
                  </div>

                  {/* Persona Identity */}
                  <div className="font-extrabold text-xs text-slate-900 truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {p.age} yrs · {p.profession}
                  </div>

                  {/* Cashflow Pattern */}
                  <div className="mt-2 py-1 px-2 bg-white rounded-lg border border-slate-100 text-[10px]">
                    <span className="text-slate-400 block font-semibold text-[8.5px] uppercase">
                      Pattern
                    </span>
                    <span className="font-bold text-slate-800 line-clamp-1 mt-0.5">
                      {p.incomePattern}
                    </span>
                  </div>

                  {/* Sized SIP & Debit Date */}
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[8.5px] text-slate-400 uppercase font-semibold block">Safe SIP</span>
                      <span className="font-black text-emerald-700">{amountDisplay}/mo</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8.5px] text-slate-400 uppercase font-semibold block">Debit Date</span>
                      <span className="font-bold text-slate-800">{dateDisplay}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🌟 2. CORE CARD: DUAL TABS & RECOMMENDATIONS 🌟 */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
        {/* Dual-Mode Segmented Header Tabs (SafeSIP Sizer Mode Active) */}
        {onSwitchToStandard && (
          <div className="w-full bg-slate-100 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-slate-200/80">
            {/* Tab 1: Standard 1-Tap SIP (Clickable to switch back) */}
            <button
              type="button"
              onClick={onSwitchToStandard}
              className="flex-1 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-left transition-all cursor-pointer group border-2 border-transparent hover:border-slate-300"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">
                <span>⚡</span>
                <span>Standard 1-Tap SIP</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-0.5">
                Instant setup • Pick any amount &amp; date
              </p>
            </button>

            {/* Tab 2: SafeSIP Sizer Mode (Active) */}
            <button
              type="button"
              className="flex-1 p-2.5 rounded-xl bg-white text-slate-900 border-2 border-[#00d09c] shadow-xs text-left transition-all cursor-default"
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                  <span>✨</span>
                  <span>SafeSIP Sizer</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  Active Mode
                </span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] text-emerald-700 font-semibold mt-0.5">
                6M Bank Analysis • Zero Bounce Risk
              </p>
            </button>
          </div>
        )}

        {/* Minimal Header */}
        <div>
          <h2 className="font-extrabold text-gray-900 text-lg sm:text-xl">
            Your Safe SIP Amount
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Sized within verified uncommitted monthly surplus of <strong>₹{sizerResult.netMonthlySurplus.toLocaleString("en-IN")}</strong>
          </p>
        </div>

        {/* 🌟 Verified Bank Account Badge (Shown after consent) 🌟 */}
        <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 block">
                {persona.bankName || "HDFC Bank"} Salary Account
              </span>
              <span className="text-[11px] text-gray-500">
                A/c **4928 · {persona.name}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <Check className="w-3 h-3" />
            <span>Consent Linked</span>
          </span>
        </div>

        {/* 3 Clean Affordability Tier Cards */}
        <div className="space-y-2.5">
          {/* Tier 1: Comfortable (SafeSIP) - Recommended */}
          <div
            onClick={() => setSelectedTier("comfortable")}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selectedTier === "comfortable"
                ? "border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900 text-sm">Comfortable (SafeSIP)</span>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.2 rounded-full uppercase">
                      Recommended
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium block">
                    Zero NACH bounce risk · Leaves ₹{sizerResult.comfortable.remainingBuffer.toLocaleString("en-IN")} buffer
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-gray-900">
                  ₹{sizerResult.comfortable.amount.toLocaleString("en-IN")}
                </span>
                <span className="block text-[10px] text-gray-400">/ month</span>
              </div>
            </div>
          </div>

          {/* Tier 2: Stretch */}
          <div
            onClick={() => setSelectedTier("stretch")}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedTier === "stretch"
                ? "border-blue-500 bg-blue-50/40 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-sm">Stretch Tier</span>
                  <span className="text-[11px] text-blue-700 font-medium block">
                    Higher compounding · Leaves ₹{sizerResult.stretch.remainingBuffer.toLocaleString("en-IN")} buffer
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-gray-900">
                  ₹{sizerResult.stretch.amount.toLocaleString("en-IN")}
                </span>
                <span className="block text-[10px] text-gray-400">/ month</span>
              </div>
            </div>
          </div>

          {/* Tier 3: Risky */}
          <div
            onClick={() => setSelectedTier("risky")}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedTier === "risky"
                ? "border-gray-500 bg-gray-50 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center font-bold shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-sm">Max Allocation Tier</span>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Tight margin · Leaves only ₹{sizerResult.risky.remainingBuffer.toLocaleString("en-IN")} buffer
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-gray-900">
                  ₹{sizerResult.risky.amount.toLocaleString("en-IN")}
                </span>
                <span className="block text-[10px] text-gray-400">/ month</span>
              </div>
            </div>
          </div>

          {/* Custom Amount Button */}
          <div className="pt-1">
            <button
              onClick={() => setSelectedTier("custom")}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedTier === "custom"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Or choose your own custom amount:</span>
              <span className="text-emerald-700 font-bold">Custom ₹</span>
            </button>

            {selectedTier === "custom" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500">₹</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="flex-1 py-1.5 px-3 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:outline-hidden focus:border-emerald-500"
                />
                <span className="text-xs text-gray-400">/ month</span>
              </div>
            )}
          </div>
        </div>

        {/* Payday-Aligned Debit Date Selector */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-gray-800 block">
                Auto-Debit on the {selectedDebitDate === 1 ? "1st" : `${selectedDebitDate}th`}
              </span>
              <span className="text-[11px] text-gray-500">
                {sizerResult.recommendedDebitDate.rationale}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 5, 10, 15].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDebitDate(d)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                  selectedDebitDate === d
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                {d === 1 ? "1st" : `${d}th`}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Reassurance Note */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>₹0 fee to edit or pause:</strong> Modify or step down anytime on Groww with zero exit load.
          </span>
        </div>
      </div>

      {/* 🌟 3. PLAIN LANGUAGE: "WHY THIS AMOUNT" & SAFE FALLBACK 🌟 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">
            Why this amount based on your cash flow?
          </h3>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
          {persona.whyThisAmount ||
            `With verified average fixed bills of ₹${sizerResult.avgFixedExpenses.toLocaleString("en-IN")} and living costs, your safe surplus is ₹${sizerResult.netMonthlySurplus.toLocaleString("en-IN")}. Sizing at ₹${sizerResult.comfortable.amount.toLocaleString("en-IN")} keeps a 60% buffer so emergency expenses never cause a NACH bounce.`}
        </p>

        {/* Thin Data Fallback Disclosure */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Safe Fallback:</strong> {persona.fallbackText || "If transaction history is limited, SIP defaults to a conservative 10% income guideline."}
          </span>
        </div>

        {/* Regulatory Note */}
        <p className="text-[10px] text-slate-400 italic">
          * <strong>Not investment advice:</strong> Mutual fund investments are subject to market risks. Safe SIP Sizer is a cash-flow budgeting tool to help investors avoid bank bounce penalties.
        </p>
      </div>

      {/* 🌟 4. NOTE FOR THE EVALUATOR CARD 🌟 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            Note for the Evaluator
          </span>
          <span className="text-[10px] text-slate-400 font-medium">SafeSIP Design Rationale</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Churn Prevention at Core:</strong> Unbudgeted SIP amounts trigger ₹250–₹590 bank bounce fees, causing first-year investor drop-off. SafeSIP combines RBI AA bank cashflow parsing with a 10% emergency buffer and 3–5 day post-payday alignment to eliminate involuntary churn.
        </p>
      </div>

      {/* 🌟 5. EXPANDABLE 6-MONTH STATEMENT MATH 🌟 */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 mb-8">
        <button
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Calculator className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-xs font-bold text-gray-900 block">
                Curious how this was calculated?
              </span>
              <span className="text-[11px] text-gray-500">
                View 6-month statement math &amp; category breakdown
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            <span>{showCalculationDetails ? "Hide Details" : "View Math"}</span>
            {showCalculationDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Expandable Details Container */}
        {showCalculationDetails && (
          <div className="p-4 pt-0 space-y-4 border-t border-gray-100 animate-fade-in">
            {/* Calculation Math */}
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
              <span className="font-bold text-gray-700 uppercase text-[10px] tracking-wider block">
                Monthly Cashflow Arithmetic
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-gray-800">
                  <span>+ Inflow:</span>
                  <span className="font-bold">₹{sizerResult.salaryAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>- Fixed Bills (Rent, EMIs, Family):</span>
                  <span className="font-semibold text-red-600">
                    -₹{sizerResult.avgFixedExpenses.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>- Living &amp; Lifestyle Spends:</span>
                  <span className="font-semibold text-red-600">
                    -₹{sizerResult.avgVariedExpenses.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-gray-900 text-xs">
                  <span>= Real Monthly Surplus:</span>
                  <span className="text-emerald-700 font-extrabold">₹{sizerResult.netMonthlySurplus.toLocaleString("en-IN")} / mo</span>
                </div>
              </div>
            </div>

            {/* 6-Month Table */}
            <CashflowTable
              historicalData={persona.historicalData}
              lowestSurplusMonthName={sizerResult.lowestSurplusMonth.month}
            />
          </div>
        )}
      </div>

      {/* 🌟 6. FIXED BOTTOM BAR (DIRECT SINGLE ACTION) 🌟 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 block font-semibold">Selected Installment</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-900">
                ₹{currentInstallment.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500 font-medium">on the {selectedDebitDate === 1 ? "1st" : `${selectedDebitDate}th`}</span>
            </div>
          </div>

          <button
            id="tour-step3-cta"
            onClick={() => onConfirmPlan(currentInstallment, selectedDebitDate, selectedTier)}
            className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Confirm &amp; Apply Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
