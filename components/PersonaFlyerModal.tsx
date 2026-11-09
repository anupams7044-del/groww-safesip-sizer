"use client";

import React from "react";
import { UserPersona } from "@/lib/types";
import { CheckCircle2, UserCheck, X, Sparkles, AlertCircle } from "lucide-react";

interface PersonaFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  personas: UserPersona[];
  selectedPersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
}

export const PersonaFlyerModal: React.FC<PersonaFlyerModalProps> = ({
  isOpen,
  onClose,
  personas,
  selectedPersona,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      {/* Flyer Pop-Up Container */}
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flyer Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/20 rounded-lg text-emerald-100">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-base leading-tight">Interactive Testing Flyer</h3>
                <p className="text-xs text-emerald-100 font-normal">
                  Select a test investor profile to evaluate cashflow realities
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Subtext */}
        <div className="px-4 py-2.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
          <AlertCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>
            Each persona brings real 6-month bank statements with fixed commitments & ad-hoc spikes.
          </span>
        </div>

        {/* Persona Cards List */}
        <div className="p-4 overflow-y-auto space-y-3.5 divide-y divide-gray-100">
          {personas.map((persona) => {
            const isSelected = persona.id === selectedPersona.id;
            return (
              <div
                key={persona.id}
                onClick={() => {
                  onSelectPersona(persona);
                  onClose();
                }}
                className={`pt-3 first:pt-0 cursor-pointer rounded-xl p-3 border transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/70"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{persona.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${persona.badgeColor}`}
                      >
                        {persona.lifecycleStage}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium">
                      {persona.profession}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Active
                    </span>
                  )}
                </div>

                {/* Demographics & Salary Chips */}
                <div className="grid grid-cols-2 gap-2 my-2 py-2 px-2.5 bg-white rounded-lg border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Age</span>
                    <span className="font-semibold text-gray-800">{persona.age} years old</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Monthly Salary</span>
                    <span className="font-bold text-emerald-600">
                      ₹{persona.monthlySalary.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Contextual Story */}
                <p className="text-[11px] text-gray-500 leading-relaxed italic">
                  &ldquo;{persona.story}&rdquo;
                </p>

                <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                  <span className="text-gray-400 text-[11px]">
                    Payday Guess: <span className="font-medium text-gray-700">₹{persona.paydayGuessAmount.toLocaleString("en-IN")}</span>
                  </span>
                  <button
                    className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {isSelected ? "Currently Selected" : "Select & Test Flow →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Click anywhere outside to dismiss</span>
          <button
            onClick={onClose}
            className="text-xs text-emerald-700 font-semibold hover:underline"
          >
            Close Flyer
          </button>
        </div>
      </div>
    </div>
  );
};
