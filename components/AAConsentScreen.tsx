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
} from "lucide-react";

interface AAConsentScreenProps {
  persona: UserPersona;
  onApproveConsent: () => void;
  onBackToNormal: () => void;
}

export const AAConsentScreen: React.FC<AAConsentScreenProps> = ({
  persona,
  onApproveConsent,
  onBackToNormal,
}) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleSimulateConsent = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onApproveConsent();
    }, 700);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-24 animate-fade-in">
      {/* Top Breadcrumb/Back link */}
      <button
        onClick={onBackToNormal}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Normal SIP Setup</span>
      </button>

      {/* Main Consent Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
        {/* AA Official Framework Header Banner */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              RBI Account Aggregator
            </span>
            <h2 className="font-extrabold text-gray-900 text-base sm:text-lg mt-1.5">
              Verify Cashflow to Prevent Bounces
            </h2>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
            AA
          </div>
        </div>

        {/* Persona Bank Link Card */}
        <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-xs">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 block">
                HDFC Bank Salary Account
              </span>
              <span className="text-[11px] text-gray-500">
                A/c **4928 · {persona.name}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Auto-Detected
          </span>
        </div>

        {/* 3 Clear Bullet Points */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-800 block">
                6 Months Bank Statement (Read-Only)
              </span>
              <span className="text-gray-500 text-[11px] block mt-0.5 leading-normal">
                Checks your fixed commitments vs. irregular lifestyle spikes.
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
                Never shared with third parties or used for credit offers.
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
                Complies with RBI AA standards. Revoke anytime in settings.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleSimulateConsent}
            disabled={isAuthorizing}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAuthorizing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing 6-Month Cashflow...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Grant Consent &amp; Calculate Safe SIP</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          <div className="text-center pt-1">
            <button
              onClick={onApproveConsent}
              className="text-xs text-gray-500 hover:text-emerald-700 font-semibold transition-colors underline cursor-pointer"
            >
              Skip and view calculation directly →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
