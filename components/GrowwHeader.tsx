"use client";

import React from "react";
import { ArrowLeft, Bell, Search, ShieldCheck } from "lucide-react";

interface GrowwHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  activePersonaName?: string;
  onOpenPersonaModal?: () => void;
  tourTipsOn?: boolean;
  onToggleTourTips?: () => void;
}

export const GrowwHeader: React.FC<GrowwHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  activePersonaName,
  onOpenPersonaModal,
  tourTipsOn = true,
  onToggleTourTips,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-xs w-full">
      {/* 🌟 Evaluator Notice Banner linking to final strategy deck 🌟 */}
      <div className="bg-slate-900 text-white text-[11px] px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-slate-300 font-medium truncate">
            <strong className="text-white font-bold">Note for Evaluator:</strong> Product Strategy &amp; Deck
          </span>
        </div>
        <a
          href="https://docs.google.com/presentation/d/1Mwr0W3VeC5wQV_NkiswejEsDuy8X_yzP0LnPlMgytL0/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 shrink-0 ml-2 hover:underline transition-colors"
          title="Open Final Strategy Presentation"
        >
          <span>Open Strategy Presentation ↗</span>
        </a>
      </div>

      <div className="max-w-xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Groww Brand Logo Marks */}
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm tracking-tighter">G</span>
              </div>
              <span className="font-bold text-base tracking-tight text-gray-900">Groww</span>
            </div>
          )}
          {title && (
            <h1 className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activePersonaName && (
            <div
              onClick={onOpenPersonaModal}
              className={`flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800 transition-all ${
                onOpenPersonaModal ? "hover:bg-emerald-100 cursor-pointer active:scale-95" : "cursor-default"
              }`}
              title={onOpenPersonaModal ? "Click to switch user persona" : `Logged in as ${activePersonaName}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[85px]">{activePersonaName}</span>
            </div>
          )}

          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 relative">
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1.5 right-1.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
