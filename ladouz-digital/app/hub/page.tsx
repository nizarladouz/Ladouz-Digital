"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { currentUser, login, logout, register } from "./auth";
import { Brand, G } from "./ui";

const TILES = [
  { t: "Operating System", d: "Kernbereiche Ihrer Digital- und KI-Strategie, SOPs und Arbeitsbereiche – zentral gesteuert.", href: "/hub/os", live: true },
  { t: "Performance Dashboard", d: "Ads, Analytics und Social in einer Übersicht.", live: false },
  { t: "Brand Controlling", d: "Sichtbarkeit und Markenwirkung systematisch messen.", live: false },
  { t: "AI Controlling", d: "KI-Agenten, Automationen und ihre Wirkung im Blick.", live: false },
];

const input: React.CSSProperties = { width: "100%", padding: "13px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.04)", color: "#fff", fontSize: 15, outline: "none" };

export default function Hub() {
  const [user, setUser] = useState<ReturnType<typeof currentUser>>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { setUser(currentUser()); setReady(true); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      if (mode === "register") await register(String(f.get("name")), String(f.get("email")), String(f.get("pw")));
      else await login(String(f.get("email")), String(f.get("pw")));
      setUser(currentUser());
    } catch (x) { setErr((x as Error).message); } finally { setBusy(false); }
  }
  if (!ready) return null;

  if (!user) return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "radial-gradient(1200px 600px at 80% -10%, rgba(141,198,63,.14), transparent), #0b1233" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Brand />
        <h1 style={{ fontFamily: "var(--font-jost)", fontSize: 32, fontWeight: 600, margin: "40px 0 8px" }}>{mode === "login" ? "Willkommen zurück." : "Zugang anlegen."}</h1>
        <p style={{ opacity: .65, margin: "0 0 28px", fontFamily: "var(--font-source-serif)" }}>Ihr internes Steuerungssystem für Digital- und KI-Strategie.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          {mode === "register" && <input name="name" required placeholder="Name" style={input} autoComplete="name" />}
          <input name="email" type="email" required placeholder="E-Mail" style={input} autoComplete="email" />
          <input name="pw" type="password" required minLength={8} placeholder="Passwort" style={input} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          {err && <div style={{ color: "#ff9b9b", fontSize: 14 }}>{err}</div>}
          <button disabled={busy} style={{ marginTop: 6, padding: 14, borderRadius: 10, border: 0, background: G, color: "#0b1233", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>{busy ? "Bitte warten …" : mode === "login" ? "Anmelden" : "Zugang erstellen"}</button>
        </form>
        <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setErr(""); }} style={{ marginTop: 18, background: "none", border: 0, color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: 14 }}>
          {mode === "login" ? "Noch kein Zugang? Jetzt anlegen" : "Bereits registriert? Anmelden"}
        </button>
        <p style={{ marginTop: 40, fontSize: 12, opacity: .35 }}>Beta – Zugangsdaten werden ausschließlich lokal in Ihrem Browser gespeichert.</p>
      </div>
    </main>
  );

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px 80px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Brand />
        <button onClick={() => { logout(); setUser(null); }} style={{ background: "none", border: "1px solid rgba(255,255,255,.18)", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Abmelden</button>
      </header>
      <div style={{ width: 40, height: 3, background: G, margin: "64px 0 18px" }} />
      <h1 style={{ fontFamily: "var(--font-jost)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, margin: 0 }}>Guten Tag, {user.name.split(" ")[0]}.</h1>
      <p style={{ opacity: .65, fontFamily: "var(--font-source-serif)", fontSize: 18, marginTop: 10 }}>Wählen Sie eine Anwendung.</p>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18, marginTop: 36 }}>
        {TILES.map((x) => {
          const inner = (
            <div className="hubtile" style={{ height: "100%", padding: 24, borderRadius: 16, border: `1px solid ${x.live ? "rgba(141,198,63,.45)" : "rgba(255,255,255,.1)"}`, background: x.live ? "linear-gradient(160deg,rgba(141,198,63,.12),rgba(255,255,255,.03))" : "rgba(255,255,255,.03)", opacity: x.live ? 1 : .55, transition: "transform .2s, border-color .2s" }}>
              <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: x.live ? G : "rgba(255,255,255,.5)" }}>{x.live ? "Verfügbar" : "Demnächst"}</div>
              <h2 style={{ fontFamily: "var(--font-jost)", fontSize: 21, fontWeight: 600, margin: "14px 0 8px" }}>{x.t}</h2>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, opacity: .7 }}>{x.d}</p>
              {x.live && <div style={{ marginTop: 22, color: G, fontSize: 14, fontWeight: 600 }}>Öffnen →</div>}
            </div>
          );
          return x.live ? <Link key={x.t} href={x.href!} style={{ color: "inherit", textDecoration: "none" }}>{inner}</Link> : <div key={x.t}>{inner}</div>;
        })}
      </section>
      <style>{`a .hubtile:hover{transform:translateY(-3px);border-color:${G}!important}`}</style>
    </main>
  );
}
