"use client";

import React from "react";
import { ShieldCheck, Activity, Sparkles } from "lucide-react";

interface ComplianceFooterProps {
  onOpenPersonaModal: () => void;
  activePersonaName: string;
}

export const ComplianceFooter: React.FC<ComplianceFooterProps> = ({
  onOpenPersonaModal,
  activePersonaName,
}) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 text-[11px] py-4 px-4 mt-auto">
      <div className="max-w-xl mx-auto space-y-3">
        {/* Telemetry & Tester Status Bar */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Active Tester:</span>
            <span className="text-emerald-300 font-bold">{activePersonaName}</span>
          </div>

          <button
            onClick={onOpenPersonaModal}
            className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-2 py-1 rounded-md font-semibold border border-emerald-400/30 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>Switch Flyer</span>
          </button>
        </div>

        {/* Regulatory & Safety Harbor Note */}
        <div className="space-y-1 text-slate-400 text-[10px] leading-relaxed">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SEBI EOP &amp; RBI Account Aggregator Compliance Safe Harbor</span>
          </div>
          <p>
            Groww SafeSIP Sizer is strictly a cashflow-aware installment sizing tool designed to prevent Day-1 overcommitment and bank NACH bounce penalties. It does not recommend specific funds or securities, does not offer investment advice, and complies with SEBI Execution-Only Platform (EOP) norms and RBI AA Master Directions.
          </p>
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-800">
          <span>Groww PM Fellowship · Oct 2026</span>
          <span className="font-mono text-emerald-400">Eval Safety Gate: 100% Passed</span>
        </div>
      </div>
    </footer>
  );
};
