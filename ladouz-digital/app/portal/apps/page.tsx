"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../store";

export default function Apps() {
  const r = useRouter(); const [me, setMe] = useState<string | null>(null);
  useEffect(() => { const u = auth.current(); if (!u) r.replace("/portal"); else setMe(u); }, [r]);
  if (!me) return null;
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8dc63f]">Ihre Apps</p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,2.8rem)] font-semibold tracking-[-0.02em]">Steuerung Ihres digitalen Erfolgs.</h1>
          <p className="mt-3 text-white/60">Angemeldet als {me}</p>
        </div>
        <button onClick={() => { auth.logout(); r.replace("/portal"); }} className="text-sm text-white/60 underline decoration-[#8dc63f] underline-offset-4 hover:text-white">Abmelden</button>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <a href="/portal/habits" className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-0.5 hover:border-[#8dc63f]/60">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#8dc63f]">App 01</p>
          <h2 className="mt-3 text-2xl font-semibold">Habits</h2>
          <p className="mt-2 text-white/60">Habits for Organizations: kleine, tägliche Routinen, die Ihr Team konsequent besser machen – kontinuierliche Verbesserung im Sinne von Kaizen.</p>
          <span className="mt-6 inline-block text-sm font-semibold text-white group-hover:text-[#8dc63f]">App öffnen →</span>
        </a>
        <div className="rounded-2xl border border-dashed border-white/10 p-7 text-white/40">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em]">Demnächst</p>
          <h2 className="mt-3 text-2xl font-semibold">Weitere Apps</h2>
          <p className="mt-2">Ziele, Kennzahlen und KI-Initiativen – zentral an einem Ort.</p>
        </div>
      </div>
    </div>
  );
}
