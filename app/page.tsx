"use client";

import React, { useState, useMemo } from "react";
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

type AppStep = "normal" | "consent" | "sizer" | "confirmation";

export default function Home({
  searchParams,
}: {
  searchParams?: { step?: string; persona?: string };
}) {
  const initialStep: AppStep =
    searchParams?.step === "consent" ||
    searchParams?.step === "sizer" ||
    searchParams?.step === "confirmation"
      ? (searchParams.step as AppStep)
      : "normal";

  const initialPersona =
    PERSONAS.find((p) => p.id === searchParams?.persona) || PERSONAS[0];

  // Active Persona State
  const [selectedPersona, setSelectedPersona] = useState<UserPersona>(initialPersona);
  const [isPersonaFlyerOpen, setIsPersonaFlyerOpen] = useState<boolean>(false);

  // App Navigation Flow: 'normal' -> 'consent' -> 'sizer' -> 'confirmation'
  const [currentStep, setCurrentStep] = useState<AppStep>(initialStep);

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

  // Back button handler: Navigates back strictly to previous screen
  const handleBack = () => {
    if (currentStep === "confirmation") setCurrentStep("sizer");
    else if (currentStep === "sizer") setCurrentStep("consent");
    else if (currentStep === "consent") setCurrentStep("normal");
    else setCurrentStep("normal");
  };

  // Handler for user clicking "Switch to Safe SIP Sizer" banner on Screen 1
  const handleInitiateSizerFlow = () => {
    setCurrentStep("consent");
  };

  // Handler for approving RBI AA consent on Screen 2
  const handleApproveAAConsent = () => {
    setCurrentStep("sizer");
  };

  // Handler for confirming and applying safe SIP plan on Screen 3
  const handleConfirmPlan = (amount: number, debitDate: number, tier: string) => {
    setConfirmedPlan({
      amount,
      debitDate,
      tier,
    });
    setCurrentStep("confirmation");
  };

  // Handler for proceeding with normal SIP without sizing
  const handleProceedDirectSIP = (amount: number, debitDate: number) => {
    setConfirmedPlan({
      amount,
      debitDate,
      tier: "Direct Unbuffered SIP",
    });
    setCurrentStep("confirmation");
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
          onOpenPersonaModal={currentStep !== "normal" ? () => setIsPersonaFlyerOpen(true) : undefined}
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

        {/* Screen 2: Dedicated RBI AA Consent Screen (With 3-Persona Choice before consent) */}
        {currentStep === "consent" && (
          <main className="flex-1 animate-fade-in">
            <AAConsentScreen
              persona={selectedPersona}
              personas={PERSONAS}
              onSelectPersona={(p) => setSelectedPersona(p)}
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
              onResetFlow={() => setCurrentStep("normal")}
              onOpenPersonaModal={() => setIsPersonaFlyerOpen(true)}
            />
          </main>
        )}

        {/* Compliance Footer */}
        <ComplianceFooter />

        {/* ✈️ Persona Flyer Pop-up (Accessible from Screen 4 Switch Persona) ✈️ */}
        <PersonaFlyerModal
          isOpen={isPersonaFlyerOpen}
          onClose={() => setIsPersonaFlyerOpen(false)}
          personas={PERSONAS}
          selectedPersona={selectedPersona}
          onSelectPersona={(p) => {
            setSelectedPersona(p);
            setIsPersonaFlyerOpen(false);
          }}
        />
      </div>
    </div>
  );
}
