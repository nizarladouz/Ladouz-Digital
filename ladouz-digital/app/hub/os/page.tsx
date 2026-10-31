"use client";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currentUser } from "../auth";
import { load, reduce, save, type Action } from "./lib/store";
import type { Workspace } from "./lib/types";
import { CSS } from "./components/styles";
import { Sidebar } from "./components/Sidebar";
import { Framework } from "./components/Framework";
import { Settings, Logo } from "./components/Settings";

const EMPTY: Workspace = { version: 1, tenantId: "", clients: [], activeClientId: null };
function root(w: Workspace, a: Action | { type: "_init"; w: Workspace }): Workspace {
  if (a.type === "_init") return a.w;
  const n = reduce(w, a); save(n); return n;
}

export default function OS() {
  const r = useRouter();
  const [w, dispatch] = useReducer(root, EMPTY);
  const [view, setView] = useState<string | null>("");
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const u = currentUser();
    if (!u) { r.replace("/hub"); return; }
    dispatch({ type: "_init", w: load(u.email) });
  }, [r]);
  if (!w.tenantId) return null;

  const client = w.clients.find((c) => c.id === w.activeClientId) ?? w.clients[0];
  const mod = client?.modules.find((m) => m.id === view) ?? (view === null ? undefined : client?.modules[0]);
  const act = (a: Action) => dispatch(a);
  const addClient = () => { const n = prompt("Name des neuen Mandanten:"); if (n?.trim()) { act({ type: "addClient", name: n.trim() }); setView(""); } };

  return (
    <div className="os">
      <style>{CSS}</style>
      <header className="os-top">
        <button className="os-btn ghost os-menu" onClick={() => setMenu(!menu)}>☰</button>
        <Link href="/hub" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#0b1233" }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: "#0b1233", color: "#8dc63f", display: "grid", placeItems: "center", fontWeight: 700 }}>L</span>
          <span className="os-hide-m"><b className="os-h" style={{ fontSize: 15 }}>Brand Controlling Center</b><span style={{ color: "#9aa0b4", marginLeft: 8, fontSize: 12 }}>L Digital Hub · OS</span></span>
        </Link>
        <div style={{ flex: 1 }} />
        {client && <Logo client={client} size={28} />}
        <select className="os-sel" value={client?.id} onChange={(e) => e.target.value === "__new" ? addClient() : (act({ type: "selectClient", id: e.target.value }), setView(""))} aria-label="Mandant wählen">
          {w.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          <option value="__new">＋ Neuer Mandant …</option>
        </select>
        <Link href="/hub" className="os-btn ghost os-hide-m" style={{ textDecoration: "none" }}>← Hub</Link>
      </header>
      {client ? (<>
        <Sidebar client={client} active={view === null ? null : mod?.id ?? null} open={menu}
          onSelect={(id) => { setView(id); setMenu(false); }} onSettings={() => { setView(null); setMenu(false); }}
          onAddModule={() => { const t = prompt("Titel des neuen Frameworks:"); if (t?.trim()) act({ type: "addModule", c: client.id, title: t.trim() }); }} />
        <main className="os-main">
          {view === null || !mod
            ? <Settings client={client} dispatch={act} canDelete={w.clients.length > 1} />
            : <Framework key={mod.id} m={mod} c={client.id} color={client.primaryColor} dispatch={act} />}
        </main>
      </>) : (
        <main className="os-main" style={{ gridColumn: "1/-1" }}>
          <h1 className="os-h">Noch kein Mandant angelegt.</h1>
          <button className="os-btn pri" style={{ marginTop: 16 }} onClick={addClient}>Ersten Mandanten anlegen</button>
        </main>
      )}
    </div>
  );
}
