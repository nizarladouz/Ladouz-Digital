import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L Digital Hub",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  icons: { icon: [{ url: "/hub/favicon.ico", sizes: "any" }, { url: "/hub/icon-512.png", type: "image/png", sizes: "512x512" }], apple: "/hub/apple-touch-icon.png" },
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", background: "#0b1233", color: "#fff" }}>{children}</div>;
}
