"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2, Compass } from "lucide-react";

interface TourGuideOverlayProps {
  currentStep: "normal" | "consent" | "sizer" | "confirmation";
  onProceedStep: (step: "normal" | "consent" | "sizer" | "confirmation") => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const TourGuideOverlay: React.FC<TourGuideOverlayProps> = ({
  currentStep,
  onProceedStep,
  isOpen,
  onClose,
  onOpen,
}) => {
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const stepMeta = {
    normal: {
      stepNum: 1,
      targetId: "tour-step1-cta",
      title: "1. Click here to calculate your SIP amount",
      description:
        "Instead of guessing an arbitrary monthly amount that leads to bounce penalties, tap 'Switch to SIP Sizer' to calculate a safe installment based on your bank statements.",
      buttonLabel: "Go to Step 2 (Bank Consent) →",
      nextStep: "consent" as const,
    },
    consent: {
      stepNum: 2,
      targetId: "tour-step2-cta",
      title: "2. Click here to grant bank consent",
      description:
        "Tap 'Grant Consent & Calculate' to simulate the RBI Account Aggregator flow. It checks 6 months of salary credits and living costs without needing netbanking passwords.",
      buttonLabel: "Go to Step 3 (Safe Sizer) →",
      nextStep: "sizer" as const,
    },
    sizer: {
      stepNum: 3,
      targetId: "tour-step3-cta",
      title: "3. Click here to confirm safe amount & date",
      description:
        "The Comfortable tier (₹2,000) is pre-selected within your real ₹5,550 monthly surplus. Tap 'Confirm & Apply Plan' to lock in your payday-aligned debit date (5th of the month).",
      buttonLabel: "Go to Step 4 (Confirmation) →",
      nextStep: "confirmation" as const,
    },
    confirmation: {
      stepNum: 4,
      targetId: "tour-step4-cta",
      title: "4. Click here to share details",
      description:
        "Your bounce-free SIP is active! Tap 'Share SIP Details' to share your mandate or copy it to clipboard. Groww charges ₹0 for modifying or pausing anytime.",
      buttonLabel: "Finish Walkthrough ✓",
      nextStep: "normal" as const,
    },
  }[currentStep];

  // Dynamically calculate bounding rectangle of the target CTA button
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const el = document.getElementById(stepMeta.targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setHighlightStyle({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    const timer = setTimeout(updatePosition, 300);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      clearTimeout(timer);
    };
  }, [currentStep, isOpen, stepMeta.targetId]);

  // When overlay is dismissed, show a persistent floating guide pill
  if (!isOpen) {
    return (
      <div className="fixed top-14 right-4 z-40">
        <button
          onClick={onOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white rounded-full shadow-lg border border-white/40 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer animate-bounce"
          title="Open interactive step-by-step tour"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Tour Guide (Step {stepMeta.stepNum}/4)</span>
        </button>
      </div>
    );
  }

  const handleNextAction = () => {
    if (currentStep === "confirmation") {
      onClose();
    } else {
      onProceedStep(stepMeta.nextStep);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Semi-transparent backdrop with subtle blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] transition-opacity"
      />

      {/* Target CTA Spotlight cutout ring */}
      {highlightStyle && (
        <div
          style={{
            top: highlightStyle.top - 6,
            left: highlightStyle.left - 6,
            width: highlightStyle.width + 12,
            height: highlightStyle.height + 12,
          }}
          className="fixed rounded-2xl border-4 border-amber-400 bg-transparent shadow-[0_0_35px_rgba(251,191,36,0.85)] pointer-events-none transition-all duration-300 z-50 animate-pulse"
        >
          {/* Animated beacon badge */}
          <span className="absolute -top-3.5 -right-3.5 flex h-7 w-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-7 w-7 bg-amber-500 text-white text-[11px] font-black items-center justify-center shadow-md">
              {stepMeta.stepNum}
            </span>
          </span>
        </div>
      )}

      {/* Floating Tour Guide Popup Card */}
      <div className="fixed inset-x-4 bottom-24 sm:bottom-auto sm:top-24 max-w-md mx-auto z-50 animate-fade-in">
        <div className="bg-white rounded-3xl p-5 shadow-2xl border-2 border-emerald-400/80 text-gray-900 space-y-3.5 relative">
          {/* Header & Step Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-black uppercase tracking-wide flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                Step {stepMeta.stepNum} of 4
              </span>
              <span className="text-xs text-gray-400 font-medium">Interactive Guide</span>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer"
              title="Close tour"
              aria-label="Close tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Guidance */}
          <div className="space-y-1">
            <h3 className="font-black text-gray-950 text-base leading-snug">
              {stepMeta.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {stepMeta.description}
            </p>
          </div>

          {/* What to do & what not to do quick pills */}
          <div className="p-2.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Tap the highlighted button or use the action below to proceed.</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-800 font-bold px-3 py-2 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              Skip Tour
            </button>

            <button
              onClick={handleNextAction}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{stepMeta.buttonLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
