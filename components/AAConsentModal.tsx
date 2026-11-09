"use client";

import React, { useState } from "react";
import { UserPersona } from "@/lib/types";
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Smartphone,
  ChevronLeft,
} from "lucide-react";

interface AAConsentModalProps {
  isOpen: boolean;
  persona: UserPersona;
  onApproveConsent: () => void;
  onCancel: () => void;
}

export const AAConsentModal: React.FC<AAConsentModalProps> = ({
  isOpen,
  persona,
  onApproveConsent,
  onCancel,
}) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [otp, setOtp] = useState("4921");

  if (!isOpen) return null;

  const handleSimulateConsent = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onApproveConsent();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* AA Official Framework Header */}
        <div className="bg-slate-900 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5 text-white">
                  RBI Account Aggregator Consent
                </h3>
                <span className="text-[10px] text-emerald-300 font-medium">
                  Regulated by Reserve Bank of India
                </span>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white p-1 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Persona Bank Link Card */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
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
              Detected
            </span>
          </div>

          {/* Explicit Transparency Highlights */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Data Fetch Scope & Purpose
            </h4>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">
                    6 Months Bank Statement (Read-Only)
                  </span>
                  <span className="text-gray-500 text-[11px] leading-tight block mt-0.5">
                    Analyzes regular salary deposits vs. fixed commitments and ad-hoc lifestyle spikes.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">
                    Strictly Cashflow Sizing (No Sales or Lending)
                  </span>
                  <span className="text-gray-500 text-[11px] leading-tight block mt-0.5">
                    Used exclusively to calculate a bounce-proof Safe SIP amount. Never used for credit underwriting or shared with third parties.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">
                    End-to-End Encrypted & Revocable
                  </span>
                  <span className="text-gray-500 text-[11px] leading-tight block mt-0.5">
                    Complies with RBI AA Master Directions. Consent can be revoked with a single tap in Groww settings.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick OTP verification simulator */}
          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-950 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" /> Simulation Auto-OTP:
              </span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                {otp}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              In real production, an encrypted OTP is dispatched to the phone registered with the bank by the RBI AA gateway.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 px-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSimulateConsent}
              disabled={isAuthorizing}
              className="flex-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isAuthorizing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Fetching Statement via AA...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>Approve &amp; Analyze Cashflow</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>

          {/* Slide 10 Risk Mitigation: Manual Entry Fallback */}
          <div className="pt-1 text-center">
            <button
              onClick={onApproveConsent}
              className="text-[11px] text-gray-500 hover:text-emerald-700 font-semibold transition-colors underline"
            >
              Prefer not to link bank? Skip to manual estimate →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
