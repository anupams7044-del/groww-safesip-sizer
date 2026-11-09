import { NextResponse } from "next/server";
import { PERSONAS } from "@/lib/personas";
import { calculateSafeSIP } from "@/lib/calculations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personaId = "priya" } = body;

    const persona = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0];
    const analysis = calculateSafeSIP(persona);

    return NextResponse.json({
      success: true,
      persona: {
        id: persona.id,
        name: persona.name,
        profession: persona.profession,
        age: persona.age,
        monthlySalary: persona.monthlySalary,
        lifecycleStage: persona.lifecycleStage,
        story: persona.story,
      },
      analysis,
      meta: {
        engine: "Groww Cashflow-Aware SafeSIP Intelligence v2.4",
        compliance: "SEBI Execution-Only Platform (EOP) Non-Advisory Safe Harbor",
        accountAggregatorStatus: "RBI-AA Certified Data Stream (Anumati/Sahamati)",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process cashflow calculation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    personas: PERSONAS.map((p) => ({
      id: p.id,
      name: p.name,
      profession: p.profession,
      age: p.age,
      salary: p.monthlySalary,
      lifecycleStage: p.lifecycleStage,
    })),
    notice: "Safe SIP Sizer Cashflow Analysis API is active.",
  });
}
