"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, day, habits, streak, type Habit } from "../store";

export default function Habits() {
  const r = useRouter(); const [me, setMe] = useState<string | null>(null);
  const [list, setList] = useState<Habit[]>([]); const [name, setName] = useState("");
  useEffect(() => { const u = auth.current(); if (!u) r.replace("/portal"); else { setMe(u); setList(habits.list(u)); } }, [r]);
  if (!me) return null;
  const today = day();
  const save = (h: Habit[]) => { setList(h); habits.save(me, h); };
  const add = (e: React.FormEvent) => { e.preventDefault(); const n = name.trim(); if (!n) return; save([...list, { id: crypto.randomUUID(), name: n, created: today, done: [] }]); setName(""); };
  const toggle = (id: string) => save(list.map((h) => h.id !== id ? h : { ...h, done: h.done.includes(today) ? h.done.filter((d) => d !== today) : [...h.done, today] }));
  const remove = (id: string) => { if (confirm("Diesen Habit löschen?")) save(list.filter((h) => h.id !== id)); };
  const doneCount = list.filter((h) => h.done.includes(today)).length;
  return (
    <div className="mx-auto max-w-[640px]">
      <a href="/portal/apps" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white">← Ihre Apps</a>
      <h1 className="mt-6 text-[clamp(2rem,4.5vw,2.8rem)] font-semibold tracking-[-0.02em]">Heute.</h1>
      <p className="mt-3 text-white/60">{list.length ? `${doneCount} von ${list.length} erledigt. Jeden Tag ein Prozent besser.` : "Legen Sie Ihren ersten Habit an."}</p>
      <form onSubmit={add} className="mt-10 flex gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. 10 Minuten Wochenziele prüfen" maxLength={80} className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#8dc63f]" />
        <button className="rounded-xl bg-[#8dc63f] px-5 py-3 font-semibold text-[#0b1233] hover:brightness-110">Hinzufügen</button>
      </form>
      <ul className="mt-8 space-y-3">
        {list.map((h) => { const on = h.done.includes(today); const s = streak(h.done); return (
          <li key={h.id} className={`flex items-center gap-4 rounded-2xl border p-5 transition ${on ? "border-[#8dc63f]/60 bg-[#8dc63f]/10" : "border-white/10 bg-white/[0.04]"}`}>
            <button onClick={() => toggle(h.id)} aria-label={on ? "Als offen markieren" : "Heute erledigt"} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition ${on ? "border-[#8dc63f] bg-[#8dc63f] text-[#0b1233]" : "border-white/30 hover:border-[#8dc63f]"}`}>{on ? "✓" : ""}</button>
            <span className="flex-1 font-medium">{h.name}</span>
            <span className="text-sm text-white/60">{s} {s === 1 ? "Tag" : "Tage"} Serie</span>
            <button onClick={() => remove(h.id)} aria-label="Löschen" className="text-white/30 hover:text-red-300">×</button>
          </li>); })}
      </ul>
      <p className="mt-12 text-xs text-white/40">Beta: Daten werden nur lokal in diesem Browser gespeichert.</p>
    </div>
  );
}
