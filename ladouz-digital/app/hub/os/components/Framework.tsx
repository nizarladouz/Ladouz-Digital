"use client";
import { useState } from "react";
import type { ModuleDef, TaskStatus } from "../lib/types";
import { type Action, nextStatus, progress } from "../lib/store";

const LABEL: Record<TaskStatus, [string, string, string]> = {
  pending: ["Offen", "rgba(255,255,255,.08)", "rgba(255,255,255,.7)"],
  "in-progress": ["In Arbeit", "rgba(240,160,32,.16)", "#f6b94a"],
  completed: ["Erledigt", "rgba(141,198,63,.16)", "#a8d86a"],
};

export function Framework({ m, c, color, dispatch }: { m: ModuleDef; c: string; color: string; dispatch: (a: Action) => void }) {
  const [newPhase, setNewPhase] = useState("");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [link, setLink] = useState({ title: "", url: "" });
  const p = progress(m.phases);
  const ask = (q: string) => typeof window !== "undefined" && window.confirm(q);

  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ width: 40, height: 3, background: color, marginBottom: 14 }} />
          <h1 className="os-h" style={{ fontSize: "clamp(26px,3vw,36px)" }}>{m.title}</h1>
          <p style={{ color: "rgba(255,255,255,.6)", margin: "6px 0 0" }}>{m.phases.length} Phasen · {p.done} von {p.total} Aufgaben erledigt</p>
        </div>
        <div style={{ minWidth: 220 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 6 }}><span>Fortschritt</span><b style={{ color: "#fff" }}>{p.pct}%</b></div>
          <div className="os-bar"><i style={{ width: `${p.pct}%`, background: color }} /></div>
        </div>
      </div>

      {/* Ressourcen */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "24px 0 8px" }}>
        <span className="os-eyebrow" style={{ marginRight: 4 }}>Ressourcen</span>
        {(m.links ?? []).map((l) => (
          <span key={l.id} className="os-pill" style={{ background: "rgba(255,255,255,.08)", display: "inline-flex", gap: 6 }}>
            <a href={l.url} target="_blank" rel="noreferrer" style={{ color: "#fff" }}>{l.title}</a>
            <button className="os-btn ghost" style={{ padding: 0, fontSize: 11 }} onClick={() => dispatch({ type: "deleteLink", c, m: m.id, id: l.id })}>✕</button>
          </span>
        ))}
        <form style={{ display: "flex", gap: 6 }} onSubmit={(e) => { e.preventDefault(); if (!link.url) return; const url = /^https?:\/\//.test(link.url) ? link.url : `https://${link.url}`; dispatch({ type: "addLink", c, m: m.id, title: link.title || url, url }); setLink({ title: "", url: "" }); }}>
          <input className="os-in" style={{ width: 130, padding: "6px 10px" }} placeholder="Titel" value={link.title} onChange={(e) => setLink({ ...link, title: e.target.value })} />
          <input className="os-in" style={{ width: 180, padding: "6px 10px" }} placeholder="Link (Drive, Doc …)" value={link.url} onChange={(e) => setLink({ ...link, url: e.target.value })} />
          <button className="os-btn" style={{ padding: "6px 10px" }}>＋</button>
        </form>
      </div>

      <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
        {m.phases.map((ph, i) => {
          const pp = progress([ph]);
          return (
            <section key={ph.id} className="os-card">
              <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", color: "#fff", fontWeight: 600, fontSize: 13, flex: "none" }}>{i + 1}</span>
                <input className="os-h" defaultValue={ph.title} onBlur={(e) => e.target.value.trim() && e.target.value !== ph.title && dispatch({ type: "renamePhase", c, m: m.id, p: ph.id, title: e.target.value.trim() })}
                  style={{ flex: 1, fontSize: 18, border: 0, outline: "none", background: "none", color: "#fff", minWidth: 0 }} />
                <div className="os-hide-m" style={{ width: 120 }}><div className="os-bar"><i style={{ width: `${pp.pct}%`, background: color }} /></div></div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", width: 44, textAlign: "right" }}>{pp.done}/{pp.total}</span>
                <button className="os-btn ghost" title="Phase löschen" onClick={() => ask(`Phase „${ph.title}“ löschen?`) && dispatch({ type: "deletePhase", c, m: m.id, p: ph.id })}>✕</button>
              </header>
              {ph.tasks.map((t) => {
                const [lab, bg, fg] = LABEL[t.status];
                return (
                  <div key={t.id} className="os-task">
                    <button className={`os-chk${t.status === "completed" ? " ok" : t.status === "in-progress" ? " ip" : ""}`} title="Status wechseln"
                      style={t.status === "completed" ? { background: color, borderColor: color } : undefined}
                      onClick={() => dispatch({ type: "updateTask", c, m: m.id, p: ph.id, t: t.id, patch: { status: nextStatus(t.status) } })}>
                      {t.status === "completed" ? "✓" : t.status === "in-progress" ? <i style={{ width: 8, height: 8, borderRadius: 8, background: "#f0a020" }} /> : null}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, textDecoration: t.status === "completed" ? "line-through" : "none", color: t.status === "completed" ? "rgba(255,255,255,.42)" : "#0b1233" }}>{t.title}</div>
                      {t.description && <div style={{ color: "rgba(255,255,255,.6)", marginTop: 3, lineHeight: 1.5 }}>{t.description}</div>}
                    </div>
                    <span className="os-pill" style={{ background: bg, color: fg }}>{lab}</span>
                    <button className="os-btn ghost os-del" title="Aufgabe löschen" onClick={() => dispatch({ type: "deleteTask", c, m: m.id, p: ph.id, t: t.id })}>✕</button>
                  </div>
                );
              })}
              <form className="os-task" onSubmit={(e) => { e.preventDefault(); const v = (draft[ph.id] || "").trim(); if (!v) return; const [title, ...d] = v.split(" — "); dispatch({ type: "addTask", c, m: m.id, p: ph.id, title, description: d.join(" — ") }); setDraft({ ...draft, [ph.id]: "" }); }}>
                <span style={{ width: 22, textAlign: "center", color: "rgba(255,255,255,.42)" }}>＋</span>
                <input className="os-in" style={{ border: 0, padding: 0, boxShadow: "none" }} placeholder="Aufgabe hinzufügen …  (optional: Titel — Beschreibung)" value={draft[ph.id] || ""} onChange={(e) => setDraft({ ...draft, [ph.id]: e.target.value })} />
              </form>
            </section>
          );
        })}
        <form className="os-card" style={{ display: "flex", gap: 10, padding: 14, borderStyle: "dashed" }} onSubmit={(e) => { e.preventDefault(); if (!newPhase.trim()) return; dispatch({ type: "addPhase", c, m: m.id, title: newPhase.trim() }); setNewPhase(""); }}>
          <input className="os-in" placeholder="Neue Phase, z. B. „Skalierung“" value={newPhase} onChange={(e) => setNewPhase(e.target.value)} />
          <button className="hub-pill hub-pill-d" style={{ padding: "10px 20px", whiteSpace: "nowrap" }}><span className="hub-sweep" /><span>Phase hinzufügen</span></button>
        </form>
        <div><button className="os-btn ghost" onClick={() => ask(`Framework „${m.title}“ entfernen?`) && dispatch({ type: "deleteModule", c, m: m.id })}>Framework entfernen</button></div>
      </div>
    </div>
  );
}
