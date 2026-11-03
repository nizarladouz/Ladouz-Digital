"use client";
import { useEffect, useState } from "react";
import { naechsterTermin } from "./termin";

type T = ReturnType<typeof naechsterTermin>;

export default function Countdown({ start }: { start: T }) {
  const [termin, setTermin] = useState<T>(start);
  const [rest, setRest] = useState<number | null>(null);

  useEffect(() => {
    let aktuell = start;
    const tick = () => {
      const jetzt = Date.now();
      if (aktuell.ts <= jetzt) { aktuell = naechsterTermin(jetzt); setTermin(aktuell); } // nur nach echtem Ablauf
      setRest(aktuell.ts - jetzt);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start]);

  const s = rest === null ? null : Math.max(0, Math.floor(rest / 1000));
  const teile: [string, number | null][] = [
    ["Tage", s === null ? null : Math.floor(s / 86400)],
    ["Std", s === null ? null : Math.floor((s % 86400) / 3600)],
    ["Min", s === null ? null : Math.floor((s % 3600) / 60)],
    ["Sek", s === null ? null : s % 60],
  ];

  return (
    <div className="border-b border-white/10 bg-[#070c24] px-6 py-3 text-white">
      <div className="mx-auto flex max-w-[1192px] flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-center text-[0.82rem] text-[#c7d6f5] sm:text-left">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#8dc63f] align-middle" aria-hidden />
          Nächster Workshop: <span className="font-medium text-white">{termin.lang}</span> · Siegburg
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2" role="timer" aria-label="Zeit bis zum nächsten Workshop">
          {teile.map(([l, v], i) => (
            <div key={l} className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex min-w-[46px] flex-col items-center rounded-[10px] bg-white/[0.06] px-2 py-1 ring-1 ring-inset ring-white/10">
                <span className="font-[family-name:var(--font-jost)] text-[1.05rem] font-medium tabular-nums leading-tight">{v === null ? "––" : String(v).padStart(2, "0")}</span>
                <span className="text-[0.58rem] uppercase tracking-[0.16em] text-white/50">{l}</span>
              </span>
              {i < 3 && <span className="text-white/30" aria-hidden>:</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
