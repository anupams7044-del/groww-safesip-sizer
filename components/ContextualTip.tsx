"use client";

import React from "react";
import { Sparkles, X, CheckCircle2 } from "lucide-react";

interface ContextualTipProps {
  step: "normal" | "consent" | "sizer" | "confirmation";
  isOpen: boolean;
  onClose: () => void;
}

export const ContextualTip: React.FC<ContextualTipProps> = ({
  step,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const tipData = {
    normal: {
      badge: "TIP 1 OF 4 · AI SIP SIZER",
      title: "Click here for SafeSIP Sizer",
      description:
        "Tap the blue 'Switch to SIP Sizer' button above to right-size your monthly SIP from your bank cashflow and avoid ₹295–₹590 NACH bounce penalties.",
    },
    consent: {
      badge: "TIP 2 OF 4 · BANK CONSENT",
      title: "Grant 100% Read-Only Consent",
      description:
        "Tap 'Grant Consent & Calculate' below. It simulates RBI Account Aggregator fetching 6-month salary and expenses without needing passwords.",
    },
    sizer: {
      badge: "TIP 3 OF 4 · CHOOSE SAFE TIER",
      title: "Confirm Your Recommended Tier",
      description:
        "We've pre-selected Comfortable (₹2,000) within your real ₹5,550 monthly surplus. Tap 'Confirm & Apply Plan' at the bottom to lock your debit date.",
    },
    confirmation: {
      badge: "TIP 4 OF 4 · COMPLETE",
      title: "Share Your Zero-Bounce Mandate",
      description:
        "Your SIP is safely scheduled 4 days after payday! Tap 'Share SIP Details' to showcase to your evaluator or copy details to clipboard.",
    },
  }[step];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 pointer-events-auto">
      <div className="bg-slate-900/95 text-white rounded-2xl p-4 shadow-xl border border-emerald-500/40 relative animate-fade-in backdrop-blur-sm">
        {/* Pointer indicator */}
        <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-900 border-t border-l border-emerald-500/40 transform rotate-45" />

        {/* Header: Badge + Close */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              {tipData.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            title="Close this tip"
            aria-label="Close this tip"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-white text-xs sm:text-sm tracking-tight">
          {tipData.title}
        </h4>

        {/* Description */}
        <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
          {tipData.description}
        </p>

        {/* Footer actions */}
        <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-[11px] underline cursor-pointer"
          >
            Hide all tips
          </button>

          <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready for your action</span>
          </span>
        </div>
      </div>
    </div>
  );
};
