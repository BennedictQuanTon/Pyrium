import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

/*
 * Typography follows the brand kit (PYRIUM_Brand_Identity_Kit/04-brand-guidelines): Inter Display
 * for headings, Inter for body. One variable Inter with the optical-size axis covers both; opsz 32
 * is the Display cut. SIL OFL, bundled at build time by next/font, so no font files live in the
 * repo. Headings stay Light 300 as in Landing_DESIGN.md. No monospace face: JetBrains Mono is
 * banned by the brief.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pyrium — Private AI. Built to act.",
    template: "%s · Pyrium",
  },
  description:
    "We engineer private, efficient AI systems that automate real workflows, optimize inference, and adapt to how your business operates.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-buttons focus:bg-snow focus:px-6 focus:py-3 focus:shadow-subtle"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
