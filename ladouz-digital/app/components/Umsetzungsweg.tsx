import Image from "next/image";

/* Startseite: Umsetzungsweg in vier Schritten (Collage + animierte Karten).
   Visuals aus /ki-workshop-siegburg übernommen; Texte auf Umsetzungspartner/Infrastruktur umgeschrieben. */

const serif = "font-[family-name:var(--font-source-serif)]";
const label = "font-[family-name:var(--font-dm-sans)] text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#8dc63f]";
const h2 = "font-[family-name:var(--font-jost)] text-[clamp(1.8rem,3.6vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.02em]";

const ablauf: { t: string; d: string; img: "stapel" | "platzhalter" | null; punkte?: string[] }[] = [
  { t: "Bestandsaufnahme & Potenzialanalyse", d: "Wir starten bei Ihrem Betrieb, nicht bei Folien – gemeinsam vor Ort in Siegburg oder bei Ihnen:", img: "stapel", punkte: [
    "Wo steht KI heute – und wo steht sie in Ihrem Unternehmen?",
    "Welche Geschäftsprozesse laufen bereits digital?",
    "Welche Systeme sind vorhanden: ERP, E-Mail, Branchensoftware?",
    "Wo gehen heute die meisten Stunden und Kosten verloren?",
    "Wo sitzt der größte Hebel für KI und Automation?",
  ] },
  { t: "Was heute noch Menschen machen – und nicht mehr müssen", d: "Wir identifizieren die Aufgaben, die eine KI schneller und oft präziser erledigt – und bauen dafür die passenden Agenten und Automationen:", img: "platzhalter", punkte: [
    "Buchhaltung weitgehend automatisiert: Belege erfassen, kontieren, abgleichen",
    "Angebotserstellung in Minuten: vom Anfrage-Eingang zum fertigen Angebot",
    "Management und Steuerung: Kennzahlen, Berichte, Entscheidungsvorlagen",
    "Kundenkommunikation: E-Mails vorsortieren, beantworten, nachfassen",
    "Agentische Workflows: KI-Agenten, die mehrstufige Aufgaben selbstständig erledigen",
  ] },
  { t: "Framework & Infrastruktur", d: "Wir übersetzen die Potenziale in eine belastbare Infrastruktur – AI-first und Automation-first dort, wo Aufgaben heute Zeit und Kosten fressen:", img: "platzhalter", punkte: [
    "Prozesse priorisiert nach Zeit- und Kostenhebel",
    "Die Reihenfolge: erst Prozess klären, dann automatisieren, dann KI einsetzen",
    "Klare Zuständigkeiten und saubere Schnittstellen zu Ihren Systemen",
    "Regeln für Datenschutz und sicheren KI-Einsatz im Team",
    "Kennzahlen, an denen Sie den Erfolg messen",
  ] },
  { t: "Umsetzung & Betrieb", d: "Wir setzen den Plan mit Ihnen um – in den ersten 30 Tagen sichtbar, danach messbar im laufenden Betrieb.", img: null },
];

export default function Umsetzungsweg() {
  return (
        <div className="mx-auto max-w-[1192px]">
          <p className={label}>So setzen wir um</p>
          <h2 id="umsetzung-titel" className={`${h2} mt-4 text-[#0b1233]`}>Vom Ist-Zustand zur KI-Infrastruktur – in vier Schritten.</h2>
          <p className={`${serif} mt-4 max-w-[680px] text-[1.06rem] leading-[1.7] text-[#43507a]`}>Wir beraten nicht nur, wir setzen um: als Umsetzungspartner für den Mittelstand bauen wir die Prozesse, Automationen und KI-Agenten, die in Ihrem Betrieb täglich Stunden sparen.</p>
          <div className="mt-14 space-y-16">
            {ablauf.map((s, i) => (
              <div key={s.t} className={`grid items-center gap-10 ${s.img ? "md:grid-cols-2" : ""}`}>
                {s.img === "stapel" && (
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
                    <div className="absolute left-0 top-[27%] aspect-[2400/1351] w-[62%] overflow-hidden rounded-[6px] shadow-[0_18px_40px_-24px_rgba(11,18,51,.28)]">
                      <Image src="/standort/buero-2.webp" alt="Ladouz Digital Office Siegburg – Arbeitsraum" fill className="object-cover" sizes="(min-width:768px) 32vw, 62vw" />
                    </div>
                    <div className="absolute right-[3%] top-0 h-[66%] w-[27%] overflow-hidden rounded-[6px] shadow-[0_18px_40px_-24px_rgba(11,18,51,.28)]">
                      <Image src="/standort/rollup.webp" alt="Ladouz Digital Roll-up im Office Siegburg" fill className="object-cover object-top" sizes="(min-width:768px) 15vw, 27vw" />
                    </div>
                    <div className="absolute bottom-0 right-0 h-[40%] w-[46%] overflow-hidden rounded-[6px] shadow-[0_18px_40px_-24px_rgba(11,18,51,.28)]">
                      <Image src="/standort/buero-1.webp" alt="Ladouz Digital Office Siegburg – Arbeitsplätze" fill className="object-cover" sizes="(min-width:768px) 24vw, 46vw" />
                    </div>
                  </div>
                )}
                {s.img === "platzhalter" && (
                  <div className={i % 2 ? "md:order-2" : ""}>{i === 1 ? <GrafikAgenten /> : <GrafikFramework />}</div>
                )}
                <div className={s.img ? "" : "max-w-[640px]"}>
                  <p className="font-[family-name:var(--font-jost)] text-[3rem] font-light leading-none text-[#8dc63f]">0{i + 1}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-jost)] text-[1.6rem] font-medium">{s.t}</h3>
                  <p className={`${serif} mt-3 text-[1.06rem] leading-[1.7] text-[#43507a]`}>{s.d}</p>
                  {s.punkte && <ul className="mt-5 space-y-2.5">{s.punkte.map((x) => <li key={x} className="flex gap-3 text-[0.98rem] text-[#0b1233]"><span className="flex-none text-[#8dc63f]">✓</span>{x}</li>)}</ul>}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}

const kfStyles = `@keyframes ldflow{0%{transform:translateX(0);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translateX(var(--w));opacity:0}}
@keyframes ldpop{0%,55%{opacity:.35}70%,100%{opacity:1}}
@keyframes ldglow{0%,100%{opacity:.55}50%{opacity:.9}}
@media (prefers-reduced-motion:reduce){.ld-anim{animation:none!important;opacity:1!important}}`;

const karte = "relative overflow-hidden rounded-[14px] sm:aspect-[4/3] sm:flex sm:flex-col sm:justify-center";
const schatten = "shadow-[0_1px_2px_rgba(11,18,51,.06),0_12px_32px_-12px_rgba(11,18,51,.18),0_40px_80px_-40px_rgba(11,18,51,.22)]";

function GrafikAgenten() {
  const zeilen = [
    ["Eingangsrechnung", "kontiert & abgeglichen"],
    ["Kundenanfrage", "Angebot erstellt"],
    ["E-Mail-Postfach", "sortiert & beantwortet"],
    ["Monatszahlen", "Bericht bereit"],
  ];
  return (
    <div className={`${karte} ${schatten} bg-[#0b1233] p-6 sm:p-8`} aria-hidden>
      <style>{kfStyles}</style>
      {/* weiche Lichtflächen */}
      <div className="ld-anim pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#2f5bd7]/30 blur-3xl" style={{ animation: "ldglow 18s ease-in-out infinite" }} />
      <div className="ld-anim pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#8dc63f]/15 blur-3xl" style={{ animation: "ldglow 22s 4s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-white/10" />
      <div className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/45 sm:gap-3">
          <span>Von Hand</span>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[#b7dd85] ring-1 ring-inset ring-[#8dc63f]/30 backdrop-blur">KI-Agent</span>
          <span className="text-right">Erledigt</span>
        </div>
        <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
          {zeilen.map(([a, b], k) => (
            <div key={a} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
              <span className="rounded-[10px] bg-white/[0.05] px-3 py-2.5 text-[0.74rem] leading-tight text-white/75 ring-1 ring-inset ring-white/[0.08] backdrop-blur sm:text-[0.82rem]">{a}</span>
              <span className="relative block h-px w-8 bg-gradient-to-r from-white/5 via-white/20 to-white/5 sm:w-14" style={{ ["--w" as string]: "28px" }}>
                <span className="ld-anim absolute -top-[2.5px] left-0 h-[6px] w-[6px] rounded-full bg-[#8dc63f] shadow-[0_0_10px_2px_rgba(141,198,63,.45)]" style={{ animation: `ldflow 7.2s ${k * 1.8}s cubic-bezier(.4,0,.2,1) infinite` }} />
              </span>
              <span className="ld-anim flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-[#8dc63f]/[0.16] to-[#8dc63f]/[0.04] px-3 py-2.5 text-[0.74rem] leading-tight text-white ring-1 ring-inset ring-[#8dc63f]/25 sm:text-[0.82rem]" style={{ animation: `ldpop 7.2s ${k * 1.8}s ease-in-out infinite` }}>
                <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-[#8dc63f] text-[0.6rem] font-bold text-[#0b1233]">✓</span>{b}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-7 flex items-center gap-2 text-[0.7rem] text-white/45 sm:mt-8">
          <span className="ld-anim h-1.5 w-1.5 rounded-full bg-[#8dc63f]" style={{ animation: "ldglow 4.8s ease-in-out infinite" }} />
          Läuft im Hintergrund – Stunde für Stunde.
        </p>
      </div>
    </div>
  );
}

function GrafikFramework() {
  const stufen = [["01", "Prozess klären"], ["02", "Automatisieren"], ["03", "KI einsetzen"]];
  return (
    <div className={`${karte} ${schatten} bg-gradient-to-b from-white to-[#f7f9fc] p-6 sm:p-8`} aria-hidden>
      <style>{kfStyles}</style>
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#8dc63f]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-[#0b1233]/[0.06]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[0.64rem] font-medium uppercase tracking-[0.18em] text-[#0b1233]/50">Umsetzungsprotokoll</span>
          <span className="rounded-full bg-[#8dc63f]/10 px-2.5 py-1 text-[0.66rem] font-medium text-[#5d8f1f] ring-1 ring-inset ring-[#8dc63f]/25">30 Tage</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
          {stufen.map(([n, t], k) => (
            <div key={n} className="ld-anim rounded-[10px] bg-white p-3 ring-1 ring-inset ring-[#0b1233]/[0.07] shadow-[0_1px_2px_rgba(11,18,51,.04),0_6px_16px_-8px_rgba(11,18,51,.12)] sm:p-3.5" style={{ animation: `ldpop 9s ${k * 2.2}s ease-in-out infinite` }}>
              <p className="font-[family-name:var(--font-jost)] text-[0.72rem] font-medium tracking-[0.08em] text-[#8dc63f]">{n}</p>
              <p className="mt-1.5 text-[0.76rem] font-medium leading-tight text-[#0b1233] sm:text-[0.84rem]">{t}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3.5 sm:mt-7">
          {[["Prozesse nach Hebel priorisiert", 92], ["Zuständigkeiten festgelegt", 74], ["Kennzahlen definiert", 58]].map(([t, w]) => (
            <div key={t as string}>
              <div className="flex items-center justify-between text-[0.74rem] text-[#0b1233]/70">
                <span>{t}</span>
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#8dc63f]/15 text-[0.58rem] font-bold text-[#5d8f1f]">✓</span>
              </div>
              <div className="mt-1.5 h-[4px] overflow-hidden rounded-full bg-[#0b1233]/[0.06]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#0b1233] via-[#2f5bd7] to-[#8dc63f]" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
