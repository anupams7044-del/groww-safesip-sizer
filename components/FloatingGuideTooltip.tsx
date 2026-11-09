"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface FloatingGuideTooltipProps {
  storageKey: string;
  position?: "top" | "bottom" | "left" | "right";
  type: "home" | "consent" | "sizer";
  onCTAClick?: () => void;
}

export const FloatingGuideTooltip: React.FC<FloatingGuideTooltipProps> = ({
  storageKey,
  position = "top",
  type,
  onCTAClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("resetGuide") === "true") {
          localStorage.removeItem(storageKey);
          setIsVisible(true);
          return;
        }
        const dismissed = localStorage.getItem(storageKey);
        if (dismissed === "true") {
          setIsVisible(false);
        }
      }
    } catch {
      // In case of restricted localStorage (incognito/iframe)
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isVisible) return;
    // Auto-dismiss after 10 seconds if not closed manually
    const timer = setTimeout(() => {
      handleDismiss();
    }, 10000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDismiss = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, "true");
      }
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="tooltip"
      className={`absolute z-30 pointer-events-auto transition-all duration-300 animate-fade-in ${
        position === "top"
          ? "bottom-full mb-3 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
          : "top-full mt-3 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
      } w-72 sm:w-80`}
    >
      {/* Groww-Inspired Floating Card */}
      <div className="bg-white rounded-2xl p-3.5 shadow-xl border-2 border-emerald-400 text-gray-800 relative">
        {/* Pointer Arrow */}
        <div
          className={`absolute w-3.5 h-3.5 bg-white border-emerald-400 transform rotate-45 ${
            position === "top"
              ? "-bottom-2 right-8 sm:left-1/2 sm:-translate-x-1/2 border-r-2 border-b-2"
              : "-top-2 right-8 sm:left-1/2 sm:-translate-x-1/2 border-l-2 border-t-2"
          }`}
        />

        {/* Header row with accent and Close Button */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              {type === "home" ? (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Safe SIP Sizer</span>
                </>
              ) : type === "consent" ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Safe Verification</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Sizing Recommendation</span>
                </>
              )}
            </span>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content based on screen */}
        {type === "home" ? (
          <div
            onClick={() => {
              handleDismiss();
              onCTAClick?.();
            }}
            className="pt-0.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <p className="text-xs font-semibold text-gray-900 leading-snug">
              Need help calculating your safe SIP amount? Tap here
            </p>
          </div>
        ) : type === "consent" ? (
          <div className="pt-0.5 space-y-1 text-[11px] text-gray-700 font-medium">
            <p className="font-bold text-xs text-gray-900 flex items-center gap-1">
              <span>Click here to give consent *</span>
            </p>
            <div className="space-y-0.5 text-[10.5px] text-gray-600 pt-0.5">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>* 100% safe · RBI-approved AA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0 ml-1" />
                <span>Zero personal details fetched</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0 ml-1" />
                <span>Read-only cashflow analysis only</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-0.5 text-[11px] text-gray-700 font-medium leading-relaxed">
            <p className="font-bold text-xs text-gray-900">
              Safe buffer included *
            </p>
            <p className="text-[10.5px] text-slate-600 mt-0.5">
              Leaves a 60% cash buffer in your bank so emergency spikes never trigger ₹250–₹590 bounce fees.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
