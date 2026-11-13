# Groww Safe SIP Sizer MVP 🚀
### Cashflow-Aware Smart SIP Sizing & NACH Bounce Prevention Engine

> **Graduation Project — Product Manager Fellowship (October 2026)**  
> **Target Product:** Groww (Mutual Funds Growth Team)  
> **Core Objective:** Increase 12-month active SIP continuation for first-time investors by eliminating Day-1 overcommitment and bank NACH bounce fees (₹295–₹590).

---

## 🌟 Key Product Features & Highlights

1. **Lightweight & Mobile-First:** Designed authentic to Groww's mobile web & app design system, weighing just ~102 kB First Load JS for instant rendering on 4G/5G mobile networks.
2. **Unified Frontend & Backend for Instant Vercel Deployment:** Built with Next.js 14 App Router, featuring an active serverless endpoint at `/api/analyze-cashflow` alongside the interactive client UI.
3. **Interactive Tester Flyer Pop-up (No Screen Clutter):**
   - Available via a floating pill (*"Switch Persona"*).
   - Allows evaluators and mentors to switch between 3 real-world salaried personas:
     - **Priya Nair** (Age 24, QA Engineer, ₹45,000/mo, Day 0 New Investor)
     - **Rohan Das** (Age 28, Marketing Specialist, ₹55,000/mo, Month 5 At-Risk User · Variable Expenses)
     - **Arjun Mehta** (Age 29, Data Lead, ₹95,000/mo, Month 13 Retained User)
   - Displays each user's **Profession, Age, Monthly Salary**, and contextual cashflow history.
4. **4-Stage Seamless User Flow:**
   - **Screen 1 (Landing Page / Normal SIP Flow):** Standard Groww mutual fund investment card with the prominent entry banner:  
     *“Need help deciding your safe SIP amount, so that you never miss out on an installment? Try Safe SIP Sizer →”*
   - **Screen 2 (RBI Account Aggregator Consent):** Simulation of RBI-AA framework (Anumati/Sahamati) requesting 6-month read-only bank statement solely for cashflow sizing.
   - **Screen 3 (Dedicated Safe SIP Sizer Page):**
     - **Top Section:** 3 Affordability Tiers (*Comfortable / SafeSIP*, *Stretch*, *Risky / Payday Guess*) + Payday-aligned auto-debit date recommender (4th–5th of month).
     - **Mandatory User Autonomy Notice:** Explicit disclaimer that tiers are data-driven suggestions—not a mandatory instruction or forceful recommendation—and users retain 100% freedom to customize or pick their preferred amount.
     - **Point-of-Decision ₹0 Fee Reassurance:** Reassures users that modifying, pausing, or stepping down future installments on Groww costs **₹0 with no exit loads**, debunking the 95.7% user myth.
     - **Middle Section:** Transparent Calculation Details demonstrating the live formula: `Salary Inflow - Fixed Commitments - Varied Lifestyle Spikes = Safe SIP`.
     - **Bottom Section:** 6-Month itemized cashflow table categorizing non-negotiable fixed bills (rent, EMIs, parental support) vs. irregular lifestyle spikes (medical emergencies, friend loans, trips, vehicle downpayments).
   - **Screen 4 (Confirmation & NAV Ledger):** Active SIP schedule confirmation with a Month-Wise NAV Allotment Ledger showing how uninterrupted investing during market dips (e.g., Oct 2026 dip at NAV ₹96) maximizes units.

---

## 🛠️ Deploying to Vercel

This repository is optimized for zero-configuration deployment to Vercel.

### Option A: Via GitHub (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Groww Safe SIP Sizer MVP"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel automatically detects Next.js. Click **"Deploy"**.

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## ⚖️ Regulatory & Safety Compliance
- **SEBI EOP (Execution-Only Platform):** Operates under non-advisory safe harbor; does not recommend specific funds or stocks.
- **RBI Account Aggregator (AA):** Uses read-only 6-month cashflow statement for capacity assessment with explicit consent.
