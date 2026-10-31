"use client";
import type { Client } from "../lib/types";
import type { Action } from "../lib/store";

const PRESETS = ["#8dc63f", "#0b1233", "#2563eb", "#0f766e", "#7c3aed", "#e11d48", "#ea580c", "#111827"];

export function Settings({ client, dispatch, canDelete }: { client: Client; dispatch: (a: Action) => void; canDelete: boolean }) {
  const up = (patch: Partial<Client>) => dispatch({ type: "updateClient", id: client.id, patch });
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ width: 40, height: 3, background: client.primaryColor, marginBottom: 14 }} />
      <h1 className="os-h" style={{ fontSize: "clamp(26px,3vw,36px)" }}>CI-Einstellungen</h1>
      <p style={{ color: "#7a8199", margin: "6px 0 28px" }}>Corporate Identity des Mandanten – steuert Logo und Akzentfarbe im gesamten System.</p>
      <div className="os-card" style={{ padding: 24, display: "grid", gap: 20 }}>
        <label style={{ display: "grid", gap: 6 }}><span className="os-eyebrow">Mandantenname</span>
          <input className="os-in" value={client.name} onChange={(e) => up({ name: e.target.value })} /></label>
        <label style={{ display: "grid", gap: 6 }}><span className="os-eyebrow">Logo-URL</span>
          <input className="os-in" placeholder="https://…/logo.svg" value={client.logoUrl} onChange={(e) => up({ logoUrl: e.target.value })} /></label>
        <div style={{ display: "grid", gap: 8 }}><span className="os-eyebrow">Primärfarbe</span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {PRESETS.map((p) => <button key={p} onClick={() => up({ primaryColor: p })} title={p} style={{ width: 32, height: 32, borderRadius: 10, background: p, cursor: "pointer", border: client.primaryColor === p ? "3px solid #fff" : "0", boxShadow: client.primaryColor === p ? `0 0 0 2px ${p}` : "none" }} />)}
            <input type="color" value={client.primaryColor} onChange={(e) => up({ primaryColor: e.target.value })} style={{ width: 40, height: 34, border: 0, background: "none", cursor: "pointer" }} />
            <code style={{ color: "#7a8199" }}>{client.primaryColor}</code>
          </div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 12, background: "#fafbfc" }}>
          <Logo client={client} size={44} />
          <div><div className="os-h" style={{ fontSize: 17 }}>{client.name || "Mandant"}</div><div style={{ color: "#7a8199", fontSize: 12 }}>Vorschau</div></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
        <button className="os-btn" onClick={() => confirm("Alle Frameworks auf Standardvorlagen zurücksetzen? Bisheriger Fortschritt geht verloren.") && dispatch({ type: "resetTemplates", id: client.id })}>Standard-Frameworks wiederherstellen</button>
        {canDelete && <button className="os-btn" style={{ color: "#c0262d" }} onClick={() => confirm(`Mandant „${client.name}“ endgültig löschen?`) && dispatch({ type: "deleteClient", id: client.id })}>Mandant löschen</button>}
      </div>
    </div>
  );
}

export function Logo({ client, size = 32 }: { client: Client; size?: number }) {
  if (client.logoUrl) return <img src={client.logoUrl} alt="" style={{ width: size, height: size, objectFit: "contain", borderRadius: 8 }} />; // eslint-disable-line @next/next/no-img-element
  return <span style={{ width: size, height: size, borderRadius: size / 3.5, background: client.primaryColor, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: size * 0.42, flex: "none" }}>{(client.name || "?").trim().charAt(0).toUpperCase()}</span>;
}
