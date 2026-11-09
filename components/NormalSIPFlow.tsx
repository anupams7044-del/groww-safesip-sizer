"use client";

import React, { useState } from "react";
import { UserPersona } from "@/lib/types";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { FloatingGuideTooltip } from "./FloatingGuideTooltip";

interface NormalSIPFlowProps {
  persona: UserPersona;
  onOpenSizerFlow: () => void;
  onProceedDirectSIP: (amount: number, date: number) => void;
}

export const NormalSIPFlow: React.FC<NormalSIPFlowProps> = ({
  persona,
  onOpenSizerFlow,
  onProceedDirectSIP,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [amount, setAmount] = useState<number>(persona.paydayGuessAmount || 15000);
  const [debitDate, setDebitDate] = useState<number>(5);

  const categories = [
    {
      name: "Direct Large-Cap Index",
      subtext: "TER ~0.2% · 0% after 15 days",
      expenseRatioNote: "~₹60/yr (0.2% TER)",
      exitLoad: "0% after 15 days",
    },
    {
      name: "Direct Flexi-Cap Core",
      subtext: "TER ~0.65% · 1% if redeemed < 12M",
      expenseRatioNote: "~₹195/yr (0.65% TER)",
      exitLoad: "1% if redeemed < 12M",
    },
    {
      name: "Direct Liquid Reserve",
      subtext: "TER ~0.15% · 0% after 7 days",
      expenseRatioNote: "~₹45/yr (0.15% TER)",
      exitLoad: "0% after 7 days",
    },
  ];

  const amountPresets = [2000, 5000, 10000, 15000, 25000];
  const dateOptions = [1, 5, 10, 15, 25];

  const handleSizerClick = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("groww_guide_home", "true");
      }
    } catch {}
    onOpenSizerFlow();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-24 transition-all duration-300">
      {/* 🌟 1. TOP BANNER (Groww Native Card with Non-Blocking Floating Pop-up) 🌟 */}
      <div className="bg-white rounded-2xl p-4 border border-blue-200/90 shadow-xs flex flex-col gap-3 transition-all hover:shadow-sm relative">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug">
              Missed a SIP installment or unsure how much you can safely invest?
            </h3>
            <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-normal mt-0.5">
              Use SIP Sizer to right-size your monthly SIP from your last 6 months bank statement and avoid ₹250–₹590 bank NACH bounce fees.
            </p>
          </div>
        </div>

        {/* CTA Container with Floating Guide Tooltip */}
        <div className="relative self-stretch sm:self-end flex flex-col items-end">
          {/* 🌟 Floating One-Time Pop-up aimed at CTA (Non-Blocking) 🌟 */}
          <FloatingGuideTooltip
            storageKey="groww_guide_home"
            type="home"
            position="bottom"
          />

          <button
            id="tour-step1-cta"
            onClick={handleSizerClick}
            className="w-full sm:w-auto py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Switch to SIP Sizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 🌟 2. MAIN NORMAL SIP CARD (Exact Match to Screenshot) 🌟 */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-5">
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">
              Start a Monthly Mutual Fund SIP
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Direct Plan · 0% Commission · Instant 1-Tap Setup
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Normal SIP Flow
          </span>
        </div>

        {/* Section 1: Select Category */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            1. Select Direct Mutual Fund Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCategory(idx)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500 shadow-xs"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <span className="font-bold text-xs text-gray-900 block leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-1 leading-tight">
                    {cat.subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Monthly SIP Amount */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            2. Monthly SIP Amount (₹)
          </label>

          {/* Large Clean Input Box */}
          <div className="relative rounded-xl border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all bg-white">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base sm:text-lg">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="15000"
              className="w-full pl-8 pr-4 py-3 rounded-xl text-base sm:text-lg font-bold text-gray-900 focus:outline-hidden"
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {amountPresets.map((preset) => {
              const isSelected = amount === preset;
              return (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Monthly SIP Debit Date */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
              3. Monthly SIP Debit Date
            </label>
            <span className="text-[11px] text-gray-400 font-medium">
              Choose a date right after payday
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {dateOptions.map((d) => {
              const isSelected = debitDate === d;
              return (
                <button
                  key={d}
                  onClick={() => setDebitDate(d)}
                  className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-1 ring-emerald-500 shadow-xs"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {d}th
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Policy Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
          <div className="p-2.5 bg-gray-50/70 rounded-xl">
            <span className="text-[10px] text-gray-400 block font-semibold uppercase">
              Expense Ratio in ₹
            </span>
            <span className="text-xs font-bold text-gray-800 mt-0.5 block">
              {categories[selectedCategory].expenseRatioNote}
            </span>
          </div>
          <div className="p-2.5 bg-gray-50/70 rounded-xl">
            <span className="text-[10px] text-gray-400 block font-semibold uppercase">
              Exit Load Rule
            </span>
            <span className="text-xs font-bold text-gray-800 mt-0.5 block">
              {categories[selectedCategory].exitLoad}
            </span>
          </div>
          <div className="p-2.5 bg-gray-50/70 rounded-xl">
            <span className="text-[10px] text-gray-400 block font-semibold uppercase">
              0% Direct Plan
            </span>
            <span className="text-xs font-bold text-emerald-700 mt-0.5 block">
              ₹0 distributor commission
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => onProceedDirectSIP(amount, debitDate)}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-98 font-bold text-white rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start SIP of ₹{amount.toLocaleString("en-IN")}/mo →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
