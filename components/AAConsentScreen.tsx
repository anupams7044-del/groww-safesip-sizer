"use client";

import React, { useState } from "react";
import { UserPersona } from "@/lib/types";
import {
  ShieldCheck,
  Lock,
  FileText,
  ArrowRight,
  Building2,
  ChevronLeft,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { FloatingGuideTooltip } from "./FloatingGuideTooltip";

interface AAConsentScreenProps {
  persona: UserPersona;
  personas?: UserPersona[];
  onSelectPersona?: (persona: UserPersona) => void;
  onApproveConsent: () => void;
  onBackToNormal: () => void;
}

export const AAConsentScreen: React.FC<AAConsentScreenProps> = ({
  persona,
  personas = [],
  onSelectPersona,
  onApproveConsent,
  onBackToNormal,
}) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Real bank consent simulation (takes 700ms to mimic secure RBI AA handshake)
  const handleRealConsent = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("groww_guide_consent", "true");
      }
    } catch {}
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onApproveConsent();
    }, 700);
  };

  // Instant demo selection: skips bank fetch and continues directly with synthetic 6M statement
  const handleSampleProfileSelect = (p: UserPersona) => {
    if (onSelectPersona) {
      onSelectPersona(p);
    }
    // Instantly continue to results with synthetic data
    onApproveConsent();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-5 pb-24 animate-fade-in">
      {/* Top Breadcrumb / Back link */}
      <button
        onClick={onBackToNormal}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Normal SIP Setup</span>
      </button>

      {/* 🌟 1. REAL CONSENT OPTION: RBI Account Aggregator Card 🌟 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-4">
        {/* AA Official Framework Header Banner */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Official RBI Account Aggregator
            </span>
            <h2 className="font-extrabold text-gray-900 text-base sm:text-lg mt-1.5">
              Verify Cashflow to Prevent Bounces
            </h2>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            AA
          </div>
        </div>

        {/* Target Bank to be Linked (Pending Consent) */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-gray-700 font-medium">
              Target Salary Bank: <strong className="text-gray-900">{persona.bankName || "HDFC Bank"} (A/c **4928)</strong>
            </span>
          </div>
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
            Pending Consent
          </span>
        </div>

        {/* 3 Clear Bullet Points */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-800 block">
                6 Months Bank Statement (Read-Only)
              </span>
              <span className="text-gray-500 text-[11px] block mt-0.5 leading-normal">
                Verifies salary credits, EMIs, and living costs to calculate safe surplus.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-800 block">
                Strictly for SIP Sizing
              </span>
              <span className="text-gray-500 text-[11px] block mt-0.5 leading-normal">
                Never shared with third parties, advertisers, or used for credit offers.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-800 block">
                100% Encrypted &amp; Revocable Anytime
              </span>
              <span className="text-gray-500 text-[11px] block mt-0.5 leading-normal">
                Complies with RBI AA master directions. Revoke anytime in account settings.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Real Flow */}
        <div className="pt-2 space-y-2 relative">
          <FloatingGuideTooltip
            storageKey="groww_guide_consent"
            type="consent"
            position="top"
          />

          <button
            id="tour-step2-cta"
            onClick={handleRealConsent}
            disabled={isAuthorizing}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAuthorizing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Fetching &amp; Analyzing 6-Month Cashflow...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Grant Consent &amp; Calculate Safe SIP</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 🌟 2. CLEAR SEPARATOR: DEMO MODE FOR EVALUATORS 🌟 */}
      <div className="relative my-2 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-slate-100 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
          OR EXPLORE WITH SAMPLE DATA
        </span>
      </div>

      {/* 🌟 3. SAMPLE PROFILE SECTION: "Just exploring? Try with a sample profile" 🌟 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Just exploring? Try with a sample profile
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap any persona below to skip bank fetch and test with realistic 6-month synthetic statements.
            </p>
          </div>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {personas.map((p) => {
            const isSelected = p.id === persona.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSampleProfileSelect(p)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-xs group ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {/* Header with Name & Sample Data Tag */}
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider shrink-0">
                    Sample data
                  </span>
                </div>

                {/* Age, Profession, City */}
                <div className="text-[11px] text-slate-600 font-medium mt-1">
                  {p.age} yrs · {p.profession}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {p.city}
                </div>

                {/* One-line Income Pattern */}
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Income Pattern
                  </span>
                  <span className="text-[11px] font-bold text-slate-800 block mt-0.5">
                    "{p.incomePattern}"
                  </span>
                </div>

                {/* CTA Link on Card */}
                <div className="mt-2.5 flex items-center justify-between text-[10.5px] font-bold text-emerald-700 group-hover:underline">
                  <span>Try this profile</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
