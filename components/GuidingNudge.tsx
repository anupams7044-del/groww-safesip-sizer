"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, AlertTriangle, Eye, EyeOff, X } from "lucide-react";

interface GuidingNudgeProps {
  step: "normal" | "consent" | "sizer" | "confirmation";
  onDismiss?: () => void;
}

export const GuidingNudge: React.FC<GuidingNudgeProps> = ({ step }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isVisible) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 pt-2">
        <button
          onClick={() => setIsVisible(true)}
          className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded-full transition-all cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
          <span>Show First-Time Guide Nudge</span>
        </button>
      </div>
    );
  }

  const guideContent = {
    normal: {
      tag: "Step 1 of 4 · Discovery",
      title: "How to use this screen:",
      doText: "Tap 'Use SIP Sizer →' on the top blue card to auto-size an installment based on actual cashflow.",
      dontText: "Don't guess a large monthly amount (e.g. ₹15,000) that risks bank NACH bounce fees (₹295–₹590).",
    },
    consent: {
      tag: "Step 2 of 4 · Verification",
      title: "Bank cashflow check:",
      doText: "Tap 'Approve & Calculate Safe SIP' to analyze 6-month salary credits & expense patterns via RBI AA.",
      dontText: "Don't worry — this is 100% read-only, end-to-end encrypted, and requires zero netbanking passwords.",
    },
    sizer: {
      tag: "Step 3 of 4 · Safe Sizing",
      title: "Choosing your tier:",
      doText: "Keep 'Comfortable (SafeSIP)' selected and tap 'Confirm Safe SIP' to lock in a zero-bounce schedule.",
      dontText: "Don't pick the 'Risky' tier if you have irregular medical or family obligations. (Expand 'View Math' below if curious).",
    },
    confirmation: {
      tag: "Step 4 of 4 · Active Schedule",
      title: "You're all set!",
      doText: "Tap 'Share SIP Details' to copy or share the verified mandate with your team or evaluator.",
      dontText: "No locked commitments — Groww allows pausing or modifying anytime for ₹0 fees.",
    },
  }[step];

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-3 pb-1">
      <div className="bg-gradient-to-r from-amber-50/90 via-emerald-50/70 to-teal-50/80 border border-emerald-200/90 rounded-2xl p-3 shadow-xs transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
              {guideContent.tag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-gray-600 text-xs p-1"
              title={isCollapsed ? "Expand guide" : "Collapse guide"}
              aria-label="Toggle guide details"
            >
              {isCollapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 text-xs p-1"
              title="Dismiss guide"
              aria-label="Dismiss guide"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="mt-2 space-y-2 text-xs">
            {/* What to do */}
            <div className="flex items-start gap-2 text-emerald-950 bg-white/70 p-2 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-800 font-bold">What to do: </strong>
                <span className="text-gray-800">{guideContent.doText}</span>
              </div>
            </div>

            {/* What NOT to do */}
            <div className="flex items-start gap-2 text-amber-950 bg-white/70 p-2 rounded-xl border border-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-800 font-bold">What not to do: </strong>
                <span className="text-gray-800">{guideContent.dontText}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
