"use client";
// Persistence adapter. Today: localStorage per user (tenant). Later: swap for API without touching UI.
import type { Client, ModuleDef, Phase, Task, TaskStatus, Workspace } from "./types";
import { FRAMEWORK_TEMPLATES } from "./templates";

export const uid = (p = "id") => `${p}_${crypto.randomUUID().slice(0, 8)}`;
const key = (tenant: string) => `ldhub_os_v1:${tenant}`;
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

export function freshModules(): ModuleDef[] {
  return clone(FRAMEWORK_TEMPLATES).map((m) => ({ ...m, phases: m.phases.map((p) => ({ ...p, id: uid("ph"), tasks: p.tasks.map((t) => ({ ...t, id: uid("t") })) })) }));
}
export function newClient(name: string, primaryColor = "#8dc63f", logoUrl = ""): Client {
  return { id: uid("c"), name, primaryColor, logoUrl, modules: freshModules() };
}
export function load(tenant: string): Workspace {
  try {
    const raw = localStorage.getItem(key(tenant));
    if (raw) { const w = JSON.parse(raw) as Workspace; if (w.version === 1) return w; }
  } catch {}
  const c = newClient("Ladouz Digital");
  return { version: 1, tenantId: tenant, clients: [c], activeClientId: c.id };
}
export function save(w: Workspace) { localStorage.setItem(key(w.tenantId), JSON.stringify(w)); }

// Pure reducers
type Path = { c: string; m?: string; p?: string; t?: string };
const mapC = (w: Workspace, id: string, f: (c: Client) => Client): Workspace => ({ ...w, clients: w.clients.map((c) => (c.id === id ? f(c) : c)) });
const mapM = (w: Workspace, a: Path, f: (m: ModuleDef) => ModuleDef) => mapC(w, a.c, (c) => ({ ...c, modules: c.modules.map((m) => (m.id === a.m ? f(m) : m)) }));
const mapP = (w: Workspace, a: Path, f: (p: Phase) => Phase) => mapM(w, a, (m) => ({ ...m, phases: m.phases.map((p) => (p.id === a.p ? f(p) : p)) }));

export type Action =
  | { type: "selectClient"; id: string }
  | { type: "addClient"; name: string; color?: string; logo?: string }
  | { type: "deleteClient"; id: string }
  | { type: "updateClient"; id: string; patch: Partial<Pick<Client, "name" | "primaryColor" | "logoUrl">> }
  | { type: "resetTemplates"; id: string }
  | { type: "addModule"; c: string; title: string }
  | { type: "deleteModule"; c: string; m: string }
  | { type: "addLink"; c: string; m: string; title: string; url: string }
  | { type: "deleteLink"; c: string; m: string; id: string }
  | { type: "addPhase"; c: string; m: string; title: string }
  | { type: "renamePhase"; c: string; m: string; p: string; title: string }
  | { type: "deletePhase"; c: string; m: string; p: string }
  | { type: "addTask"; c: string; m: string; p: string; title: string; description: string }
  | { type: "updateTask"; c: string; m: string; p: string; t: string; patch: Partial<Task> }
  | { type: "deleteTask"; c: string; m: string; p: string; t: string };

export const nextStatus = (s: TaskStatus): TaskStatus => (s === "pending" ? "in-progress" : s === "in-progress" ? "completed" : "pending");

export function reduce(w: Workspace, a: Action): Workspace {
  switch (a.type) {
    case "selectClient": return { ...w, activeClientId: a.id };
    case "addClient": { const c = newClient(a.name, a.color, a.logo); return { ...w, clients: [...w.clients, c], activeClientId: c.id }; }
    case "deleteClient": { const clients = w.clients.filter((c) => c.id !== a.id); return { ...w, clients, activeClientId: clients[0]?.id ?? null }; }
    case "updateClient": return mapC(w, a.id, (c) => ({ ...c, ...a.patch }));
    case "resetTemplates": return mapC(w, a.id, (c) => ({ ...c, modules: freshModules() }));
    case "addModule": return mapC(w, a.c, (c) => ({ ...c, modules: [...c.modules, { id: uid("m"), title: a.title, iconName: "Layers", phases: [] }] }));
    case "deleteModule": return mapC(w, a.c, (c) => ({ ...c, modules: c.modules.filter((m) => m.id !== a.m) }));
    case "addLink": return mapM(w, a, (m) => ({ ...m, links: [...(m.links ?? []), { id: uid("l"), title: a.title, url: a.url }] }));
    case "deleteLink": return mapM(w, a, (m) => ({ ...m, links: (m.links ?? []).filter((l) => l.id !== a.id) }));
    case "addPhase": return mapM(w, a, (m) => ({ ...m, phases: [...m.phases, { id: uid("ph"), title: a.title, tasks: [] }] }));
    case "renamePhase": return mapP(w, a, (p) => ({ ...p, title: a.title }));
    case "deletePhase": return mapM(w, a, (m) => ({ ...m, phases: m.phases.filter((p) => p.id !== a.p) }));
    case "addTask": return mapP(w, a, (p) => ({ ...p, tasks: [...p.tasks, { id: uid("t"), title: a.title, description: a.description, status: "pending" }] }));
    case "updateTask": return mapP(w, a, (p) => ({ ...p, tasks: p.tasks.map((t) => (t.id === a.t ? { ...t, ...a.patch } : t)) }));
    case "deleteTask": return mapP(w, a, (p) => ({ ...p, tasks: p.tasks.filter((t) => t.id !== a.t) }));
  }
}

export function progress(phases: Phase[]) {
  const all = phases.flatMap((p) => p.tasks);
  const done = all.filter((t) => t.status === "completed").length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
}
