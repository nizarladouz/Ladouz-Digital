"use client";
import { useEffect, useState } from "react";

type Habit = { id: string; titel: string; identitaet: string; team: string; ausloeser: string; done: string[] };
const KEY = "ld-os-habits-v1";
const START: Habit[] = [
  { id: "1", titel: "5-Minuten-Stand-up", identitaet: "Wir sind ein Team, das täglich abgestimmt ist.", team: "Gesamtes Team", ausloeser: "Nach dem ersten Kaffee, 9:00", done: [] },
  { id: "2", titel: "Eine Kennzahl prüfen", identitaet: "Wir entscheiden auf Basis von Daten.", team: "Vertrieb", ausloeser: "Nach dem Stand-up", done: [] },
  { id: "3", titel: "Eine Kleinigkeit verbessern", identitaet: "Wir verbessern jeden Tag ein Detail.", team: "Operations", ausloeser: "Vor Feierabend", done: [] },
];
const tag = (d: Date) => d.toISOString().slice(0, 10);
const woche = () => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d; });
const serie = (h: Habit) => { let n = 0; const d = new Date(); while (h.done.includes(tag(d))) { n++; d.setDate(d.getDate() - 1); } return n; };

export default function Board() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [neu, setNeu] = useState({ titel: "", identitaet: "", team: "", ausloeser: "" });
  useEffect(() => { const s = localStorage.getItem(KEY); setHabits(s ? JSON.parse(s) : START); }, []);
  const save = (h: Habit[]) => { setHabits(h); localStorage.setItem(KEY, JSON.stringify(h)); };
  const toggle = (id: string, t: string) => save(habits.map(h => h.id !== id ? h : { ...h, done: h.done.includes(t) ? h.done.filter(x => x !== t) : [...h.done, t] }));
  const tage = woche();
  const heute = tag(new Date());
  const quote = habits.length ? Math.round(100 * habits.filter(h => h.done.includes(heute)).length / habits.length) : 0;

  return (
    <section className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Gewohnheiten", habits.length], ["Heute erledigt", quote + " %"], ["Längste Serie", Math.max(0, ...habits.map(serie)) + " Tage"]].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-[#e7ecf5] bg-white p-5"><p className="text-xs uppercase tracking-[0.2em] text-[#5b6b8a]">{k}</p><p className="mt-2 text-2xl font-semibold">{v}</p></div>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e7ecf5] bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="border-b border-[#e7ecf5] text-left text-xs uppercase tracking-[0.15em] text-[#5b6b8a]">
            <th className="p-4">Gewohnheit & Identität</th><th className="p-4">Team · Auslöser</th>
            {tage.map(d => <th key={tag(d)} className="p-2 text-center">{d.toLocaleDateString("de-DE", { weekday: "short" })}</th>)}
            <th className="p-4 text-center">Serie</th><th />
          </tr></thead>
          <tbody>{habits.map(h => (
            <tr key={h.id} className="border-b border-[#f0f3f9] last:border-0">
              <td className="p-4"><p className="font-medium">{h.titel}</p><p className="text-[#5b6b8a]">{h.identitaet}</p></td>
              <td className="p-4 text-[#43507a]">{h.team}<br /><span className="text-[#5b6b8a]">{h.ausloeser}</span></td>
              {tage.map(d => { const t = tag(d); const on = h.done.includes(t); return (
                <td key={t} className="p-2 text-center"><button aria-label={t} onClick={() => toggle(h.id, t)} className={`h-8 w-8 rounded-lg border transition ${on ? "border-[#8dc63f] bg-[#8dc63f] text-white" : "border-[#d9e0ee] hover:border-[#2f5bd7]"}`}>{on ? "✓" : ""}</button></td>); })}
              <td className="p-4 text-center font-semibold">{serie(h)}</td>
              <td className="p-4"><button onClick={() => save(habits.filter(x => x.id !== h.id))} className="text-[#9aa6c2] hover:text-red-600">✕</button></td>
            </tr>))}</tbody>
        </table>
      </div>
      <form onSubmit={e => { e.preventDefault(); if (!neu.titel) return; save([...habits, { ...neu, id: String(Date.now()), done: [] }]); setNeu({ titel: "", identitaet: "", team: "", ausloeser: "" }); }}
        className="mt-6 grid gap-3 rounded-2xl border border-[#e7ecf5] bg-white p-5 sm:grid-cols-5">
        {([["titel", "Neue Gewohnheit"], ["identitaet", "Wir sind ein Team, das …"], ["team", "Team"], ["ausloeser", "Auslöser (nach …)"]] as const).map(([k, p]) => (
          <input key={k} value={neu[k]} onChange={e => setNeu({ ...neu, [k]: e.target.value })} placeholder={p} className="rounded-lg border border-[#d9e0ee] px-3 py-2 outline-none focus:border-[#2f5bd7]" />))}
        <button className="rounded-lg bg-[#0b1233] px-4 py-2 font-medium text-white hover:bg-[#1a2558]">Hinzufügen</button>
      </form>
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[["Offensichtlich", "Klarer Auslöser im Arbeitsalltag."], ["Attraktiv", "An die Identität des Teams gekoppelt."], ["Einfach", "Unter zwei Minuten starten."], ["Befriedigend", "Sichtbarer Fortschritt – nie zweimal aussetzen."]].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-[#e7ecf5] bg-white p-5"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-[#5b6b8a]">{d}</p></div>))}
      </div>
      <p className="mt-6 text-xs text-[#9aa6c2]">Prototyp: Daten werden lokal in diesem Browser gespeichert.</p>
    </section>
  );
}
