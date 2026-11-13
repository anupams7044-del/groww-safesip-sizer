"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  Compass,
} from "lucide-react";

interface GuidedWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStep?: (step: "normal" | "consent" | "sizer" | "confirmation") => void;
}

export const GuidedWalkthroughModal: React.FC<GuidedWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigateToStep,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      step: 1,
      badge: "Feature 1 · Frictionless Onboarding",
      title: "Dual-Mode Segmented Tabs (Option C)",
      targetScreen: "normal" as const,
      description:
        "Standard investment apps suffer from top-of-page banner blindness. We embedded segmented dual tabs right inside the primary SIP setup card: '⚡ Standard 1-Tap SIP' vs '✨ SafeSIP Sizer'. A micro-nudge at Step 2 captures users at their moment of amount hesitation.",
      highlights: [
        "Eliminates banner blindness entirely",
        "Point-of-friction trigger at amount entry",
        "Instant one-click sample persona jumping",
      ],
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
    },
    {
      step: 2,
      badge: "Feature 2 · Evaluator Demo Mode",
      title: "3 Cross-Segment Synthetic Personas",
      targetScreen: "sizer" as const,
      description:
        "Evaluators can test three distinct cashflow realities without connecting personal bank accounts: Priya Nair (salaried fresher), Rohan Das (salaried with mid-month expense spikes), and Arjun Mehta (teacher with ₹58k EMIs).",
      highlights: [
        "Priya (₹2,000/mo, 5th): Steady salary buffer",
        "Rohan (₹2,500/mo, 10th): Post-payday expense buffer",
        "Arjun (₹4,500/mo, 5th): Heavy debt-to-income protection",
      ],
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      step: 3,
      badge: "Feature 3 · Safe & Encrypted Data",
      title: "RBI Account Aggregator Consent",
      targetScreen: "consent" as const,
      description:
        "Leverages India's official digital public infrastructure (RBI AA). Read-only 6-month statement verification captures real recurring expenses and ad-hoc spikes without passwords or data scraping.",
      highlights: [
        "Read-only financial information provider (FIP)",
        "Zero data resale or credit-scoring cross-sell",
        "Revocable at any moment in account settings",
      ],
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      step: 4,
      badge: "Feature 4 · Churn Prevention Core",
      title: "3-Tier Sizing & Payday Date Alignment",
      targetScreen: "sizer" as const,
      description:
        "Bank bounce penalties (₹250–₹590 per failure) are the #1 cause of first-year SIP cancellations. SafeSIP sizes installments to 35-40% of net surplus and sets debit dates 3–5 days post-payday.",
      highlights: [
        "Leaves 60% cash buffer for unexpected emergencies",
        "Avoids weekend bank settlement delays",
        "Side-by-side 'Same tool, three people' view",
      ],
      icon: <Calendar className="w-5 h-5 text-amber-600" />,
    },
    {
      step: 5,
      badge: "Feature 5 · Zero Lock-In Anxiety",
      title: "₹0 Modification & Pause Guarantee",
      targetScreen: "confirmation" as const,
      description:
        "Users hesitate to commit when they fear locked-in mandates. SafeSIP reinforces Groww's zero-penalty policy: pause, modify, or step down anytime with ₹0 charge.",
      highlights: [
        "No lock-in or modification penalties",
        "1-tap shareable verified ledger",
        "Protects user credit score and bank standing",
      ],
      icon: <CheckCircle2 className="w-5 h-5 text-purple-600" />,
    },
  ];

  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleJumpToScreen = () => {
    if (onNavigateToStep) {
      onNavigateToStep(slide.targetScreen);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-up space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              {slide.icon}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {slide.badge}
              </span>
              <span className="text-[11px] text-slate-400 block font-semibold mt-0.5">
                Step {currentSlide + 1} of {slides.length}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Title */}
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
            {slide.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Why Evaluators Love This:
          </span>
          {slide.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Jump Directly to Screen Link */}
        <button
          onClick={handleJumpToScreen}
          className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 py-1 hover:underline cursor-pointer flex items-center justify-center gap-1"
        >
          <span>View this feature on the app →</span>
        </button>

        {/* Progress Bar & Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide
                    ? "w-6 bg-emerald-600"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentSlide === slides.length - 1 ? "Finish Tour" : "Next"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
