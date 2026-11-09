"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface ComplianceFooterProps {
  onOpenPersonaModal?: () => void;
  activePersonaName?: string;
}

export const ComplianceFooter: React.FC<ComplianceFooterProps> = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/80 text-[10px] py-2.5 px-4 mt-auto">
      <div className="max-w-xl mx-auto flex items-start sm:items-center gap-1.5 text-slate-500 leading-tight">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
        <span>
          <strong className="text-slate-700 font-semibold">SEBI &amp; RBI Safe Harbor:</strong> Execution-only cashflow sizing tool. No investment advice or fund recommendations. Complies with SEBI EOP &amp; RBI AA norms.
        </span>
      </div>
    </footer>
  );
};
