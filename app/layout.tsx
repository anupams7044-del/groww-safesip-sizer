import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groww Safe SIP Sizer | Cashflow-Aware Smart SIP Planning",
  description: "Prevent Day-1 SIP overcommitment and bank NACH bounce fees with RBI Account Aggregator cashflow intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 flex flex-col items-center justify-start antialiased text-slate-800">
        {children}
      </body>
    </html>
  );
}
