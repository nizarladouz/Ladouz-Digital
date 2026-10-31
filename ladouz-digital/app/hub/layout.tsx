import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L Digital Hub",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", background: "#0b1233", color: "#fff" }}>{children}</div>;
}
