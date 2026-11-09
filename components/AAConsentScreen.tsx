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
  Users,
  CheckCircle2,
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

  const handleGrantConsent = () => {
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

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-24 animate-fade-in">
      {/* Top Breadcrumb / Back link */}
      <button
        onClick={onBackToNormal}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Normal SIP Setup</span>
      </button>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-5">
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

        {/* 🌟 STEP 1: CHOOSE USER PERSONA FIRST 🌟 */}
        {personas && personas.length > 0 && (
          <div className="space-y-2.5 relative">
            {/* Temporary On-The-Fly Nudge near the 3 options */}
            <FloatingGuideTooltip
              storageKey="groww_guide_persona"
              type="persona"
              position="top"
            />

            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Choose Investor Persona to Test</span>
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active: {persona.name.split(" ")[0]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {personas.map((p) => {
                const isSelected = p.id === persona.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectPersona?.(p)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-900">{p.name}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>

                    <div className="text-[11px] font-extrabold text-gray-900 mt-1">
                      ₹{p.monthlySalary.toLocaleString("en-IN")}<span className="text-[10px] font-normal text-gray-500">/mo</span>
                    </div>

                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {p.age} yrs · {p.city}
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-gray-100 text-[10px] font-medium text-emerald-800 line-clamp-1">
                      {p.incomePattern}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 🌟 STEP 2: TARGET BANK LINKAGE & PENDING CONSENT 🌟 */}
        <div className="space-y-3 pt-1 border-t border-gray-100">
          <label className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider block">
            2. Bank Account &amp; Consent Terms
          </label>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-gray-700 font-medium">
                Target Salary Bank: <strong className="text-gray-900">{persona.bankName || "HDFC Bank"} (A/c **4928 · {persona.name})</strong>
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
                  Verifies salary credits, EMIs, and living costs to calculate safe surplus for {persona.name}.
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
        </div>

        {/* Action Button: Grant Consent */}
        <div className="pt-2 space-y-2 relative">
          <FloatingGuideTooltip
            storageKey="groww_guide_consent"
            type="consent"
            position="top"
          />

          <button
            id="tour-step2-cta"
            onClick={handleGrantConsent}
            disabled={isAuthorizing}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAuthorizing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authorizing &amp; Parsing 6M Cashflow for {persona.name}...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Grant Consent &amp; Calculate Safe SIP for {persona.name}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
