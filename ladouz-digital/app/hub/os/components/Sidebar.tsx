"use client";
import type { Client } from "../lib/types";
import { progress } from "../lib/store";

export function Sidebar({ client, active, onSelect, onSettings, onAddModule, open }: {
  client: Client; active: string | null; open: boolean;
  onSelect: (id: string) => void; onSettings: () => void; onAddModule: () => void;
}) {
  const total = progress(client.modules.flatMap((m) => m.phases));
  return (
    <aside className={`os-side${open ? " open" : ""}`}>
      <div style={{ padding: "4px 12px 18px" }}>
        <div className="os-eyebrow">Gesamtfortschritt</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0" }}>
          <span className="os-h" style={{ fontSize: 28 }}>{total.pct}%</span>
          <span style={{ color: "#7a8199", fontSize: 12 }}>{total.done}/{total.total} Aufgaben</span>
        </div>
        <div className="os-bar"><i style={{ width: `${total.pct}%`, background: client.primaryColor }} /></div>
      </div>
      <div className="os-eyebrow" style={{ padding: "8px 12px" }}>Frameworks</div>
      {client.modules.map((m) => {
        const p = progress(m.phases);
        return (
          <button key={m.id} className={`os-nav${active === m.id ? " on" : ""}`} onClick={() => onSelect(m.id)}>
            <span style={{ width: 8, height: 8, borderRadius: 8, flex: "none", background: p.pct === 100 ? client.primaryColor : p.done ? "#f0a020" : "#d3d7e1" }} />
            <span style={{ flex: 1 }}>{m.title}</span>
            <span style={{ fontSize: 11, color: "#9aa0b4" }}>{p.pct}%</span>
          </button>
        );
      })}
      <button className="os-nav" style={{ color: "#7a8199" }} onClick={onAddModule}>＋ Framework hinzufügen</button>
      <div style={{ borderTop: "1px solid #eceef3", margin: "16px 0 8px" }} />
      <button className={`os-nav${active === null ? " on" : ""}`} onClick={onSettings}>⚙︎ CI-Einstellungen</button>
    </aside>
  );
}
