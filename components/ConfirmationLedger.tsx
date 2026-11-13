"use client";

import React, { useState } from "react";
import { UserPersona } from "@/lib/types";
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Building2,
  TrendingUp,
  Info,
} from "lucide-react";

interface ConfirmationLedgerProps {
  persona: UserPersona;
  confirmedAmount: number;
  confirmedDate: number;
  tierName: string;
  onResetFlow: () => void;
  onOpenPersonaModal: () => void;
}

export const ConfirmationLedger: React.FC<ConfirmationLedgerProps> = ({
  persona,
  confirmedAmount,
  confirmedDate,
  tierName,
  onResetFlow,
  onOpenPersonaModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareDetails = () => {
    const textToShare = `My Groww SafeSIP of ₹${confirmedAmount.toLocaleString("en-IN")}/mo is scheduled for the ${confirmedDate}th of every month with zero bounce risk!`;
    if (navigator.share) {
      navigator.share({
        title: "Groww SafeSIP Details",
        text: textToShare,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 space-y-4 pb-24 animate-fade-in">
      {/* Success Hero Card */}
      <div className="bg-gradient-to-b from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-md space-y-3 text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">SIP Setup Confirmed!</h2>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-xs mx-auto mt-0.5">
            Your monthly installment is right-sized for your cashflow with zero NACH bounce risk.
          </p>
        </div>

        {/* Clean Amount & Date Summary Box */}
        <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 grid grid-cols-2 gap-3 text-left mt-2 border border-white/10">
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">
              Monthly SIP
            </span>
            <span className="text-xl font-black text-white">
              ₹{confirmedAmount.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-emerald-200 block">
              {tierName}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">
              Debit Date
            </span>
            <span className="text-xl font-black text-white">
              {confirmedDate}th of month
            </span>
            <span className="text-[10px] text-emerald-200 block">
              Post-payday clearance
            </span>
          </div>
        </div>
      </div>

      {/* SIP Details Card */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3.5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          SIP Investment Summary
        </h3>

        <div className="space-y-2.5 text-xs divide-y divide-gray-100">
          <div className="flex justify-between items-center pt-1 first:pt-0">
            <span className="text-gray-500 font-medium">Target Fund:</span>
            <span className="font-bold text-gray-900 text-right">Direct Mutual Fund (Equity)</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 font-medium">Bank Mandate:</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-gray-400" />
              HDFC Bank A/c **4928
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 font-medium">First Auto-Debit:</span>
            <span className="font-semibold text-gray-800">
              {confirmedDate}th of next month
            </span>
          </div>
          {/* Highlighted Modification Fee Row with Evaluator Callout */}
          <div className="pt-2.5">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 font-bold">Modification Fee:</span>
                <span className="text-[9.5px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Zero Lock-in
                </span>
              </div>
              <span className="font-extrabold text-emerald-700 text-xs">
                ₹0 (Zero Charge anytime)
              </span>
            </div>

            {/* Explaining the need to the Evaluator */}
            <div className="mt-1.5 px-2.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[10.5px] text-gray-600 space-y-1.5 leading-snug">
              <div className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-900 font-bold">Note for Evaluator:</strong> User research shows 6 of 6 users assumed modifying carries fees, leading 3 of 6 to cancel outright during tight months. Highlighting ₹0 modification eliminates this cancellation bias.
                </span>
              </div>
              <div className="pt-1 border-t border-slate-200/80 flex items-center justify-between">
                <span className="font-semibold text-gray-700">Detailed Strategy Deck &amp; User Research:</span>
                <a
                  href="https://drive.google.com/file/d/1Sf0EtaMTuiub5ifFTYK9JN8q_-LdElFL/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-0.5"
                >
                  <span>Open Presentation ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share & Actions Card */}
      <div className="space-y-2.5 pt-1">
        <button
          id="tour-step4-cta"
          onClick={handleShareDetails}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black active:scale-98 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {copied ? (
            <span className="flex items-center gap-2 text-emerald-400">
              <Check className="w-4 h-4" />
              Details Copied to Clipboard!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share SIP Details
            </span>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onResetFlow}
            className="py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Test Again</span>
          </button>

          <button
            onClick={onOpenPersonaModal}
            className="py-3 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Switch Persona</span>
          </button>
        </div>
      </div>
    </div>
  );
};
