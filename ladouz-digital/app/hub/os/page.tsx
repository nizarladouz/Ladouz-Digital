"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currentUser } from "../auth";
import { Brand, G } from "../ui";

export default function OS() {
  const r = useRouter(); const [ok, setOk] = useState(false);
  useEffect(() => { if (!currentUser()) r.replace("/hub"); else setOk(true); }, [r]);
  if (!ok) return null;
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px 80px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Brand sub="Operating System" />
        <Link href="/hub" style={{ color: "rgba(255,255,255,.7)", fontSize: 14, textDecoration: "none" }}>← Übersicht</Link>
      </header>
      <div style={{ width: 40, height: 3, background: G, margin: "64px 0 18px" }} />
      <h1 style={{ fontFamily: "var(--font-jost)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, margin: 0 }}>Operating System</h1>
      <p style={{ opacity: .65, fontFamily: "var(--font-source-serif)", fontSize: 18, maxWidth: 620, marginTop: 10 }}>Hier steuern Sie bald Ihre Digital- und KI-Strategie: Kernbereiche wie Google Ads, Meta Ads und Website, dazu SOPs und Arbeitsbereiche. Die Beta folgt in Kürze.</p>
    </main>
  );
}
