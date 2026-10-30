"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./store";

export default function PortalLogin() {
  const r = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState(""), [pw, setPw] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  useEffect(() => { if (auth.current()) r.replace("/portal/apps"); }, [r]);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    try { await (mode === "login" ? auth.login(email, pw) : auth.register(email, pw)); r.push("/portal/apps"); }
    catch (x) { setErr((x as Error).message); } finally { setBusy(false); }
  }
  const input = "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#8dc63f]";
  return (
    <div className="mx-auto max-w-[440px]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8dc63f]">Kundenportal</p>
      <h1 className="mt-4 text-[clamp(2rem,4.5vw,2.8rem)] font-semibold tracking-[-0.02em]">{mode === "login" ? "Willkommen zurück." : "Konto anlegen."}</h1>
      <p className="mt-3 text-white/60">Ihr zentraler Ort, an dem digitaler und KI-Erfolg koordiniert und gesteuert wird – Schritt für Schritt.</p>
      <form onSubmit={submit} className="mt-10 space-y-5">
        <label className="block text-sm text-white/70">E-Mail<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></label>
        <label className="block text-sm text-white/70">Passwort<input type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} value={pw} onChange={(e) => setPw(e.target.value)} className={input} /></label>
        {err && <p className="text-sm text-red-300">{err}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#8dc63f] px-4 py-3 font-semibold text-[#0b1233] transition hover:brightness-110 disabled:opacity-60">{busy ? "Einen Moment …" : mode === "login" ? "Anmelden" : "Registrieren"}</button>
      </form>
      <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setErr(""); }} className="mt-6 text-sm text-white/60 underline decoration-[#8dc63f] underline-offset-4 hover:text-white">
        {mode === "login" ? "Noch kein Konto? Jetzt registrieren" : "Bereits registriert? Anmelden"}
      </button>
      <p className="mt-10 text-xs leading-relaxed text-white/40">Beta: Konto und Daten werden ausschließlich lokal in diesem Browser gespeichert, nicht auf unseren Servern. Keine Synchronisation zwischen Geräten.</p>
    </div>
  );
}
