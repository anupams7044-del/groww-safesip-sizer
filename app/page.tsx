"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PERSONAS } from "@/lib/personas";
import { UserPersona, SizerResult } from "@/lib/types";
import { calculateSafeSIP } from "@/lib/calculations";
import { GrowwHeader } from "@/components/GrowwHeader";
import { NormalSIPFlow } from "@/components/NormalSIPFlow";
import { AAConsentScreen } from "@/components/AAConsentScreen";
import { SafeSIPSizerView } from "@/components/SafeSIPSizerView";
import { ConfirmationLedger } from "@/components/ConfirmationLedger";
import { PersonaFlyerModal } from "@/components/PersonaFlyerModal";
import { ComplianceFooter } from "@/components/ComplianceFooter";
import { ContextualTip } from "@/components/ContextualTip";
import { Users } from "lucide-react";

type AppStep = "normal" | "consent" | "sizer" | "confirmation";

export default function Home({
  searchParams,
}: {
  searchParams?: { step?: string; hidePill?: string; persona?: string; hideTour?: string };
}) {
  // Determine initial step and tester pill visibility from SSR query parameters
  const initialStep: AppStep =
    searchParams?.step === "consent" ||
    searchParams?.step === "sizer" ||
    searchParams?.step === "confirmation"
      ? (searchParams.step as AppStep)
      : "normal";

  const initialPersona =
    PERSONAS.find((p) => p.id === searchParams?.persona) || PERSONAS[0];

  const initialHidePill = searchParams?.hidePill === "true";
  const initialHideTour = searchParams?.hideTour === "true";

  // Active Persona State
  const [selectedPersona, setSelectedPersona] = useState<UserPersona>(initialPersona);
  const [isPersonaFlyerOpen, setIsPersonaFlyerOpen] = useState(false);

  // App Navigation Flow: 'normal' | 'consent' | 'sizer' | 'confirmation'
  const [currentStep, setCurrentStep] = useState<AppStep>(initialStep);
  // Navigation history stack to ensure Back button always returns to the exact previous step
  const [stepHistory, setStepHistory] = useState<AppStep[]>([initialStep]);
  const [hideTesterPill] = useState(initialHidePill);

  // Tour Tips visibility state (defaults to On, matching Gemini screenshot)
  const [tourTipsOn, setTourTipsOn] = useState(!initialHideTour);

  // Confirmed SIP Plan State
  const [confirmedPlan, setConfirmedPlan] = useState<{
    amount: number;
    debitDate: number;
    tier: string;
  }>({
    amount: 2000,
    debitDate: 5,
    tier: "Comfortable (SafeSIP)",
  });

  // Dynamically compute sizer analysis for the current persona
  const sizerResult: SizerResult = useMemo(() => {
    return calculateSafeSIP(selectedPersona);
  }, [selectedPersona]);

  // Navigate forward to a step while tracking history
  const navigateToStep = (nextStep: AppStep) => {
    setStepHistory((prev) => [...prev, nextStep]);
    setCurrentStep(nextStep);
    if (typeof window !== "undefined") {
      window.history.pushState(
        { step: nextStep },
        "",
        `?step=${nextStep}${hideTesterPill ? "&hidePill=true" : ""}${!tourTipsOn ? "&hideTour=true" : ""}`
      );
    }
  };

  // Back button handler: Navigates back strictly to the previous screen
  const handleBack = () => {
    if (stepHistory.length > 1) {
      const nextHistory = [...stepHistory];
      nextHistory.pop(); // Remove current screen
      const previousStep = nextHistory[nextHistory.length - 1];
      setStepHistory(nextHistory);
      setCurrentStep(previousStep);
      if (typeof window !== "undefined") {
        window.history.replaceState(
          { step: previousStep },
          "",
          `?step=${previousStep}${hideTesterPill ? "&hidePill=true" : ""}${!tourTipsOn ? "&hideTour=true" : ""}`
        );
      }
    } else {
      // Deterministic fallback hierarchy if direct link was accessed
      if (currentStep === "confirmation") setCurrentStep("sizer");
      else if (currentStep === "sizer") setCurrentStep("consent");
      else if (currentStep === "consent") setCurrentStep("normal");
      else setCurrentStep("normal");
    }
  };

  // Listen to browser / phone hardware back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.step) {
        setCurrentStep(event.state.step as AppStep);
      } else {
        handleBack();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [stepHistory, currentStep]);

  // Handler for switching personas from the flyer pop-up
  const handleSelectPersona = (persona: UserPersona) => {
    setSelectedPersona(persona);
  };

  // Handler for user clicking "Switch to Safe SIP Sizer" banner on Screen 1
  const handleInitiateSizerFlow = () => {
    navigateToStep("consent");
  };

  // Handler for approving RBI AA consent
  const handleApproveAAConsent = () => {
    navigateToStep("sizer");
  };

  // Handler for confirming and applying safe SIP plan
  const handleConfirmPlan = (amount: number, debitDate: number, tier: string) => {
    setConfirmedPlan({
      amount,
      debitDate,
      tier,
    });
    navigateToStep("confirmation");
  };

  // Handler for proceeding with normal SIP without sizing
  const handleProceedDirectSIP = (amount: number, debitDate: number) => {
    setConfirmedPlan({
      amount,
      debitDate,
      tier: "Direct Unbuffered SIP",
    });
    navigateToStep("confirmation");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100 items-center justify-between">
      {/* Mobile-First Shell Container */}
      <div className="w-full max-w-xl bg-white min-h-screen flex flex-col mobile-frame-shadow relative">
        {/* Groww App Header */}
        <GrowwHeader
          title={
            currentStep === "normal"
              ? "Start SIP"
              : currentStep === "consent"
              ? "Bank Verification (AA)"
              : currentStep === "sizer"
              ? "Safe SIP Sizer"
              : "SIP Confirmation"
          }
          showBack={currentStep !== "normal"}
          onBack={handleBack}
          activePersonaName={selectedPersona.name}
          onOpenPersonaModal={() => setIsPersonaFlyerOpen(true)}
          tourTipsOn={tourTipsOn}
          onToggleTourTips={() => setTourTipsOn(!tourTipsOn)}
        />

        {/* 💡 Contextual Dark Tooltip Popover (Matching Gemini Screenshot) 💡 */}
        <ContextualTip
          step={currentStep}
          isOpen={tourTipsOn}
          onClose={() => setTourTipsOn(false)}
        />

        {/* Screen 1: Normal Groww SIP Flow */}
        {currentStep === "normal" && (
          <main className="flex-1 animate-fade-in">
            <NormalSIPFlow
              persona={selectedPersona}
              onOpenSizerFlow={handleInitiateSizerFlow}
              onProceedDirectSIP={handleProceedDirectSIP}
            />
          </main>
        )}

        {/* Screen 2: Dedicated RBI AA Consent Screen */}
        {currentStep === "consent" && (
          <main className="flex-1 animate-fade-in">
            <AAConsentScreen
              persona={selectedPersona}
              onApproveConsent={handleApproveAAConsent}
              onBackToNormal={handleBack}
            />
          </main>
        )}

        {/* Screen 3: Dedicated Safe SIP Sizer Page */}
        {currentStep === "sizer" && (
          <main className="flex-1 animate-fade-in">
            <SafeSIPSizerView
              persona={selectedPersona}
              sizerResult={sizerResult}
              onConfirmPlan={handleConfirmPlan}
            />
          </main>
        )}

        {/* Screen 4: Confirmation & Month-Wise Ledger */}
        {currentStep === "confirmation" && (
          <main className="flex-1 animate-fade-in">
            <ConfirmationLedger
              persona={selectedPersona}
              confirmedAmount={confirmedPlan.amount}
              confirmedDate={confirmedPlan.debitDate}
              tierName={confirmedPlan.tier}
              onResetFlow={() => navigateToStep("normal")}
              onOpenPersonaModal={() => setIsPersonaFlyerOpen(true)}
            />
          </main>
        )}

        {/* Compliance Footer */}
        <ComplianceFooter />

        {/* ✈️ Interactive Tester Flyer Pop-up (Accessible anytime) ✈️ */}
        <PersonaFlyerModal
          isOpen={isPersonaFlyerOpen}
          onClose={() => setIsPersonaFlyerOpen(false)}
          personas={PERSONAS}
          selectedPersona={selectedPersona}
          onSelectPersona={handleSelectPersona}
        />
      </div>
    </div>
  );
}
