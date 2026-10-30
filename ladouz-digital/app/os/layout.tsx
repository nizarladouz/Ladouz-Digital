import type { Metadata } from "next";
export const metadata: Metadata = { title: "Ladouz OS", robots: { index: false, follow: false } };
export default function L({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f8fc] text-[#0b1233]" style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}>{children}</div>;
}
