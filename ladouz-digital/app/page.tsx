"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   ladouz.digital – Landingpage
   Next.js (App Router) · TypeScript · Tailwind CSS

   AUFBAU – jede Sektion beantwortet genau eine Frage:
     Hero          Was bieten Sie an?
     Wandel        Wo stehe ich heute, wo stehe ich danach?   (#system)
     Bausteine     Was genau steht am Ende in meinem Haus?    (#leistungen)
     Programm      Wie läuft das ab?                           (#framework)
     Haltung       Warum Sie?                                  (#leitbild)
     Branchen      Passt das zu mir?                           (#branchen)
     Perspektiven  Wie denken Sie?                             (#publikationen, #newsletter)
     Kontakt       Wie fange ich an?                           (#kontakt)

   Alle Anker aus dem Menü existieren. Das Menü selbst ist unverändert.

   BILDER
   Jede Bildfläche steht genau einmal im Objekt BILDER weiter unten.
   Solange `src` fehlt, rendert automatisch eine CI-Grafik.

   LEISTUNG
   · Genau ein Bild mit priority: das Hero-Motiv (LCP).
   · Die H1 wird ohne Einblendung ausgeliefert – sie ist das LCP-Element.
   · Scroll-Effekte schreiben direkt ans DOM, nicht in den React-State.
     Die Phasen-Sektion rendert viermal neu, nicht sechzigmal pro Sekunde.
   · prefers-reduced-motion ist vollständig abgedeckt.
   ═══════════════════════════════════════════════════════════════════════════ */

import {
  useCallback, useEffect, useId, useRef, useState, useSyncExternalStore,
  type FormEvent, type ReactNode,
} from "react";
import Image from "next/image";

const BOOKING_URL = "https://zeeg.me/management75/erstberatung";
const MAIL = "management@ladouz.digital";
const TEL = "01577 0206552";

/* ═══════════════════════════════════════════════════════════════════════════
   BILDER – die einzige Stelle, die du für Motive anfassen musst.

   So setzt du ein Bild ein:
     1. Datei nach /public/motive/ legen, z. B. /public/motive/hero.jpg
     2. hier bei src eintragen:  src: "/motive/hero.jpg"
     3. fertig. Größe, Zuschnitt und Ladeverhalten sind bereits gesetzt.

   Format: JPEG oder PNG, lange Kante mindestens 2400 px. Keine vorkomprimierten
   WebP-Dateien – Next.js erzeugt AVIF und WebP selbst, in jeder benötigten Breite.

   fokus: welcher Bildpunkt beim Beschnitt erhalten bleibt (wie object-position).
          "50% 40%" = mittig, leicht oben. Wichtig, weil Mobilgeräte schmaler
          beschneiden als der Desktop.

   variante: welche CI-Grafik erscheint, solange kein Foto hinterlegt ist.
   ═══════════════════════════════════════════════════════════════════════════ */

type Variante = "wave" | "grid" | "orbit" | "stack";
type Motiv = { src?: string; fokus: string; variante: Variante };

const BILDER = {
  /* Moderne Architektur: Glasfassade, Atrium oder Hochhausperspektive,
     kühles Licht, gern Abend oder Dämmerung. Linke Bildhälfte ruhig –
     dort liegt die Überschrift. Querformat 16:9. */
  hero: { src: undefined, fokus: "60% 45%", variante: "wave" },

  /* Zwei bis vier Personen im Gespräch am Besprechungstisch,
     Unterlagen, natürliches Licht. Querformat 16:10. */
  bausteinMarketing: { src: undefined, fokus: "50% 45%", variante: "wave" },

  /* Moderner Arbeitsraum, Menschen an Bildschirmen, Blick über die
     Schulter. Kein Stockfoto-Hologramm. Querformat 16:10. */
  bausteinDigital: { src: undefined, fokus: "50% 50%", variante: "orbit" },

  /* Konzentrierte Arbeit am Rechner, Hände und Tastatur oder zwei
     Entwickler im Gespräch vor einem Monitor. Querformat 16:10. */
  bausteinSoftware: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Architekturdetail mit Rasterstruktur: Fassade, Deckenraster,
     Treppenhaus von oben. Steht für Ordnung. Querformat 16:10. */
  bausteinDaten: { src: undefined, fokus: "50% 50%", variante: "stack" },

  /* Phase 1 – Workshop: Menschen am Tisch, Notizen, konzentrierte
     Gesprächssituation. Hochformat 4:5 funktioniert am besten. */
  phaseAnalyse: { src: undefined, fokus: "50% 40%", variante: "orbit" },

  /* Phase 2 – Planung: Grundrisse, Skizzen auf dem Tisch, Tragwerk
     oder Rohbau eines modernen Gebäudes. Hochformat 4:5. */
  phaseArchitektur: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Phase 3 – Umsetzung: Team in Bewegung, Besprechung im Stehen,
     Arbeit an Bildschirmen. Hochformat 4:5. */
  phaseUmsetzung: { src: undefined, fokus: "50% 45%", variante: "wave" },

  /* Phase 4 – Übergabe: Mitarbeiterin oder Mitarbeiter präsentiert
     im Besprechungsraum, Führung hört zu. Ihr Team, nicht wir. Hochformat 4:5. */
  phaseUebergabe: { src: undefined, fokus: "50% 40%", variante: "stack" },

  /* Architektonische Präzision: klare Linien, Symmetrie, reduzierte
     Farbigkeit. Treppen, Fluchten, Betonkanten. Hochformat 4:5. */
  haltung: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Perspektiven – drei ruhige, thematische Motive. Querformat 16:10. */
  perspektiveKi: { src: undefined, fokus: "50% 50%", variante: "orbit" },
  perspektiveArchitektur: { src: undefined, fokus: "50% 50%", variante: "grid" },
  perspektiveQualitaet: { src: undefined, fokus: "50% 50%", variante: "wave" },

  /* Heller, moderner Besprechungsraum, gern leer – bereit für das
     Gespräch. Hochformat oder quadratisch. */
  kontakt: { src: undefined, fokus: "50% 50%", variante: "orbit" },
} satisfies Record<string, Motiv>;

/* ══════════════════════════ Menü (unverändert) ══════════════════════════ */

const utilityLinks = [
  ["Standort Siegburg", "#kontakt"],
  ["Publikationen", "#publikationen"],
  ["Newsletter", "#newsletter"],
  ["Kontakt", "#kontakt"],
] as const;

type MenuSpalte = { titel: string; links: [string, string][] };
type MenuEintrag = { label: string; href: string; spalten?: MenuSpalte[] };

const hauptmenue: MenuEintrag[] = [
  {
    label: "Kompetenzen",
    href: "#leistungen",
    spalten: [
      { titel: "Strategie", links: [["Digitale Unternehmensstrategie", "#leistungen"], ["Zielbild & Roadmap", "#framework"], ["Steuerungslogik", "#system"], ["Kennzahlen-Architektur", "#system"]] },
      { titel: "Künstliche Intelligenz", links: [["Potenzialanalyse", "#leistungen"], ["Prozess-Automatisierung", "#system"], ["KI-Governance", "#leitbild"], ["Betrieb & Skalierung", "#framework"]] },
      { titel: "Marketing", links: [["Performance-Marketing", "#leistungen"], ["Tracking-Architektur", "#system"], ["Content-Systeme", "#publikationen"], ["Laufende Optimierung", "#framework"]] },
    ],
  },
  {
    label: "Branchen",
    href: "#branchen",
    spalten: [
      { titel: "Industrie & Handel", links: [["Maschinen- und Anlagenbau", "#branchen"], ["Handel & E-Commerce", "#branchen"], ["Logistik", "#branchen"], ["Handwerk & Bau", "#branchen"]] },
      { titel: "Dienstleistung", links: [["Beratung & Kanzleien", "#branchen"], ["Gesundheitswesen", "#branchen"], ["Finanzdienstleistung", "#branchen"], ["Bildung", "#branchen"]] },
      { titel: "Weitere", links: [["Immobilienwirtschaft", "#branchen"], ["Energie", "#branchen"], ["Öffentlicher Sektor", "#branchen"], ["Alle Branchen", "#branchen"]] },
    ],
  },
  { label: "Framework", href: "#framework" },
  {
    label: "Publikationen",
    href: "#publikationen",
    spalten: [
      { titel: "Themen", links: [["Digitale Strategie", "#publikationen"], ["KI im Mittelstand", "#publikationen"], ["Marketing-Systeme", "#publikationen"], ["Prozessqualität", "#publikationen"]] },
      { titel: "Formate", links: [["Analysen", "#publikationen"], ["Frameworks", "#framework"], ["Leitfäden", "#publikationen"], ["Newsletter", "#newsletter"]] },
    ],
  },
  { label: "Über uns", href: "#leitbild" },
];

/* ══════════════════════════ Inhalte ══════════════════════════ */

const heroFakten = [
  { wert: "12", einheit: "Monate", text: "Ein Programm mit klarem Anfang und klarem Ende." },
  { wert: "4", einheit: "Bausteine", text: "Marketing, Digital & KI, Software und Daten." },
  { wert: "1", einheit: "Ziel", text: "Eine Abteilung, die ohne uns weiterarbeitet." },
];

/* Jede Zeile ist ein Paar: derselbe Bereich vorher und nachher. */
const wandel = [
  {
    bereich: "Organisation",
    heute: "Digitale Themen laufen projektweise, verteilt auf Agenturen und einzelne Personen.",
    danach: "Eine eigene Abteilung steuert Marketing, Digitales und KI – mit klaren Rollen.",
  },
  {
    bereich: "Software",
    heute: "Standardsoftware bildet die eigenen Abläufe nur teilweise ab. Der Rest läuft über Tabellen.",
    danach: "Eigene Softwarelösungen tragen die Kernabläufe – gebaut entlang Ihrer Prozesse.",
  },
  {
    bereich: "Daten",
    heute: "Daten liegen verteilt in Systemen. Entscheidungen beruhen vor allem auf Erfahrung.",
    danach: "Eine Datenstruktur, auf der Entscheidungen, Automatisierung und KI verlässlich aufbauen.",
  },
  {
    bereich: "Technologie",
    heute: "Neue Technologien sind etwas, das man beobachtet – und oft zu spät einsetzt.",
    danach: "Jede neue Technologie wird zu Produktivität, Wirksamkeit, Umsatz und Einsparung.",
  },
];

const bausteine: { nr: string; titel: string; text: string; punkte: string[]; bild: Motiv }[] = [
  {
    nr: "01",
    titel: "Interne Marketing-Abteilung",
    text: "Ein Marketing, das Ihr Unternehmen selbst steuert: Kanäle, Inhalte und Kennzahlen in einer durchgängigen Logik.",
    punkte: ["Steuerung und Kennzahlen", "Kanal- und Content-Systeme", "Eigene Betriebsfähigkeit"],
    bild: BILDER.bausteinMarketing,
  },
  {
    nr: "02",
    titel: "Digital- und KI-Abteilung",
    text: "Menschen und Rollen, die neue Technologien bewerten, einführen und betreiben – statt sie jedes Mal einzukaufen.",
    punkte: ["Rollen und Verantwortung", "KI-Anwendungen im Betrieb", "Governance und Bewertung"],
    bild: BILDER.bausteinDigital,
  },
  {
    nr: "03",
    titel: "Interne Softwarelösungen",
    text: "Software für die Abläufe, für die es keine passende Standardlösung gibt. Nicht abgebildet, sondern ausgeführt.",
    punkte: ["Angebot, Disposition, Planung", "Anbindung an Bestandssysteme", "Wartbar und dokumentiert"],
    bild: BILDER.bausteinSoftware,
  },
  {
    nr: "04",
    titel: "Datenstrukturen",
    text: "Eine Datenbasis, auf der Entscheidungen, Automatisierung und KI überhaupt erst zuverlässig funktionieren.",
    punkte: ["Einheitliches Datenmodell", "Kennzahlen-Architektur", "Grundlage für jede KI"],
    bild: BILDER.bausteinDaten,
  },
];

type Phase = {
  nr: string;
  titel: string;
  monate: string;
  startMonat: number;
  endMonat: number;
  text: string;
  ergebnis: string;
  bild: Motiv;
};

const phasen: Phase[] = [
  {
    nr: "01",
    titel: "Analyse & Zielbild",
    monate: "Monat 1–2",
    startMonat: 1,
    endMonat: 2,
    text: "Wir erfassen Ihre Wertschöpfung als Ganzes: Abläufe, Systeme, Daten und Teams. Daraus entsteht ein Zielbild mit klaren Prioritäten.",
    ergebnis: "Zielbild und Roadmap für die kommenden zehn Monate.",
    bild: BILDER.phaseAnalyse,
  },
  {
    nr: "02",
    titel: "Architektur",
    monate: "Monat 3–5",
    startMonat: 3,
    endMonat: 5,
    text: "Wir entwerfen die Struktur: Rollen der internen Abteilung, Datenmodell, Systemlandschaft und Verantwortlichkeiten.",
    ergebnis: "Eine dokumentierte Architektur, auf der alles Weitere aufbaut.",
    bild: BILDER.phaseArchitektur,
  },
  {
    nr: "03",
    titel: "Aufbau & Umsetzung",
    monate: "Monat 6–9",
    startMonat: 6,
    endMonat: 9,
    text: "Software, KI-Anwendungen und Marketing-Systeme gehen kontrolliert in Betrieb – eingebettet in Ihre Prozesse, nicht daneben.",
    ergebnis: "Produktive Systeme statt Pilotprojekte.",
    bild: BILDER.phaseUmsetzung,
  },
  {
    nr: "04",
    titel: "Übergabe & Verankerung",
    monate: "Monat 10–12",
    startMonat: 10,
    endMonat: 12,
    text: "Ihr Team übernimmt. Wir befähigen, dokumentieren und ziehen uns schrittweise zurück, bis alles ohne uns läuft.",
    ergebnis: "Eine Abteilung, die selbstständig weiterarbeitet.",
    bild: BILDER.phaseUebergabe,
  },
];

function phaseFuerMonat(monat: number) {
  const i = phasen.findIndex((p) => monat >= p.startMonat && monat <= p.endMonat);
  return i < 0 ? 0 : i;
}

const prinzipien = [
  { titel: "Ein Programm, kein Projekt.", text: "Zwölf Monate mit klarem Anfang, klarem Ende und einem vereinbarten Ergebnis." },
  { titel: "Umsetzung, nicht Empfehlung.", text: "Wir bauen, was wir planen. Strategie ohne Umsetzung bleibt eine Präsentation." },
  { titel: "Übergabe als Ziel.", text: "Erfolgreich ist das Programm, wenn Ihr Team ohne uns weiterarbeitet." },
];

const branchen = [
  "Maschinen- und Anlagenbau", "Handel & E-Commerce", "Logistik & Transport",
  "Handwerk & Bau", "Beratung & Kanzleien", "Gesundheitswesen",
  "Finanzdienstleistung", "Immobilienwirtschaft", "Energie & Versorgung",
  "Bildung & Weiterbildung", "Industriegüter", "Öffentlicher Sektor",
];

const perspektiven: { kicker: string; titel: string; text: string; bild: Motiv }[] = [
  {
    kicker: "Analyse",
    titel: "Warum KI-Pilotprojekte im Mittelstand selten produktiv werden",
    text: "Die meisten Initiativen scheitern nicht an der Technologie, sondern an fehlender Verankerung in den Abläufen.",
    bild: BILDER.perspektiveKi,
  },
  {
    kicker: "Framework",
    titel: "Digitale Strategie als Architektur, nicht als Maßnahmenliste",
    text: "Einzelmaßnahmen verpuffen, Strukturen bleiben. Warum die Reihenfolge den Unterschied macht.",
    bild: BILDER.perspektiveArchitektur,
  },
  {
    kicker: "Standpunkt",
    titel: "Die eigene Abteilung schlägt die bessere Agentur",
    text: "Wer Fähigkeiten dauerhaft einkauft, bleibt abhängig. Wer sie aufbaut, wird schneller mit jeder Innovation.",
    bild: BILDER.perspektiveQualitaet,
  },
];

/* ══════════════════════════ Hooks ══════════════════════════ */

const MQ_REDUCED = "(prefers-reduced-motion: reduce)";

/* useSyncExternalStore statt useState + useEffect: der Media-Query ist
   eine externe Datenquelle, kein zusätzlicher Renderdurchlauf. */
function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MQ_REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MQ_REDUCED).matches,
    () => false,
  );
}

function useInView<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(e.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* Fortschrittsbalken direkt am DOM-Knoten statt über State: die Vorfassung
   hat den kompletten Kopfbereich bei jedem Scroll-Frame neu gerendert.
   scaleX statt width läuft im Compositor, ohne Layout und Paint. */
function useScrollState() {
  const balken = useRef<HTMLSpanElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let letzter = false;

    const messen = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const anteil = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      if (balken.current) balken.current.style.transform = `scaleX(${anteil})`;
      const jetzt = window.scrollY > 40;
      if (jetzt !== letzter) {
        letzter = jetzt;
        setScrolled(jetzt);
      }
      ticking = false;
    };
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(messen);
    };

    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return { balken, scrolled };
}

/* ══════════════════════════ Bausteine ══════════════════════════ */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`ld-reveal ${inView ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-3.5">
      <span aria-hidden className="block h-px w-8 flex-none bg-[#8dc63f]" />
      <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.3em] ${tone === "light" ? "text-[#9fc65f]" : "text-[#2f5bd7]"}`}>
        {children}
      </span>
    </span>
  );
}

function Lead({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`ld-serif mt-6 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.66] ${tone === "light" ? "text-[#c7d6f5]" : "text-[#43507a]"} ${className}`}>
      {children}
    </p>
  );
}

function CtaButton({
  href, children, variant = "primary", className = "", submit = false, disabled,
}: {
  href?: string; children: ReactNode; variant?: "primary" | "ghost" | "dark";
  className?: string; submit?: boolean; disabled?: boolean;
}) {
  const base = "ld-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[11px] px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.16em] transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0";
  const styles = {
    primary: "bg-[#8dc63f] text-[#0b1233] hover:bg-[#b6e57a]",
    ghost: "border border-white/45 text-white hover:border-white hover:bg-white/10",
    dark: "border border-[#131f5c] text-[#131f5c] hover:bg-[#131f5c] hover:text-white",
  }[variant];

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
      {variant === "primary" && !disabled && <span aria-hidden className="ld-sweep" />}
    </>
  );

  if (submit || !href) {
    return <button type={submit ? "submit" : "button"} disabled={disabled} className={`${base} ${styles} ${className}`}>{inner}</button>;
  }
  const ext = href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} className={`${base} ${styles} ${className}`}>
      {inner}
    </a>
  );
}

/* ══════════════════════════ Visual ══════════════════════════
   Mit src ein Foto, ohne src die CI-Grafik – beide mit ruhigem Zoom.
   sizes ist Pflicht: ohne passenden Wert lädt der Browser auf dem
   Handy die Desktop-Variante.
   ═══════════════════════════════════════════════════════════ */

function Visual({
  motiv, sizes, className = "", alt = "", priority = false, flat = false,
}: {
  motiv: Motiv; sizes: string; className?: string; alt?: string; priority?: boolean;
  /* flat: ohne eingebaute Abdunklung – wenn darüber ein eigener Verlauf liegt. */
  flat?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const g = `g-${uid}`, r = `r-${uid}`, p = `p-${uid}`;

  /* Positionierung kommt vom Aufrufer. Früher stand hier fest `relative` –
     wurde zusätzlich `absolute inset-0` übergeben, gewann je nach
     CSS-Reihenfolge `relative`, und die Fläche fiel auf null Höhe zusammen.
     Genau das war die leere rechte Hälfte im alten Hero. */
  const pos = /(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative";

  if (motiv.src) {
    return (
      <div className={`${pos} overflow-hidden bg-[#0b1233] ${className}`}>
        <Image
          src={motiv.src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: motiv.fokus }}
          className="ld-kenburns object-cover"
        />
        {!flat && <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,18,51,.5)_0%,rgba(11,18,51,.06)_60%)]" />}
      </div>
    );
  }

  const variant = motiv.variante;
  return (
    <div
      className={`${pos} overflow-hidden bg-[linear-gradient(126deg,#0b1233_0%,#131f5c_45%,#2f5bd7_100%)] ${className}`}
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
    >
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="ld-kenburns absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4b7ce8" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id={r}>
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#8dc63f" stopOpacity="0" />
          </radialGradient>
          <pattern id={p} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="600" fill={`url(#${p})`} />
        <circle cx="640" cy="140" r="240" fill={`url(#${r})`} />

        {variant === "wave" && [0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M-40 ${200 + i * 62} Q 200 ${140 + i * 62} 400 ${210 + i * 62} T 840 ${190 + i * 62}`} fill="none" stroke={`url(#${g})`} strokeWidth={1.6} opacity={1 - i * 0.14} />
        ))}

        {variant === "grid" && Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 7 }).map((_, col) => (
            <rect key={`${row}-${col}`} x={90 + col * 92} y={130 + row * 76} width={62} height={48} rx={9} fill="#ffffff" fillOpacity={0.05 + ((row + col) % 4) * 0.035} stroke="#ffffff" strokeOpacity="0.12" />
          ))
        )}

        {variant === "orbit" && (
          <>
            {[110, 175, 240, 305].map((rad, i) => (
              <circle key={rad} cx="400" cy="300" r={rad} fill="none" stroke="#ffffff" strokeOpacity={0.15 - i * 0.02} strokeWidth="1" strokeDasharray={i % 2 ? "5 9" : undefined} />
            ))}
            <circle cx="400" cy="300" r="52" fill={`url(#${g})`} />
            {([[400, 190], [575, 300], [400, 540], [160, 300]] as const).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 0 ? 11 : 8} fill="#8dc63f" fillOpacity={i === 0 ? 1 : 0.55} />
            ))}
          </>
        )}

        {variant === "stack" && [0, 1, 2, 3].map((i) => (
          <rect key={i} x={140 + i * 26} y={140 + i * 88} width={520 - i * 52} height={64} rx={13} fill="#ffffff" fillOpacity={0.07 + i * 0.03} stroke="#8dc63f" strokeOpacity={0.22 + i * 0.12} />
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════ Seite ══════════════════════════ */

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#f7f9fc] text-[#0b1233] antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]">
        <a href="#main" className="ld-skip">Zum Inhalt springen</a>
        <Kopfbereich />
        <main id="main">
          <Hero />
          <Wandel />
          <Bausteine />
          <Programm />
          <Haltung />
          <Branchen />
          <Perspektiven />
          <Kontakt />
        </main>
        <Footer />
      </div>
    </>
  );
}

/* ══════════════════════════ Kopfbereich (unverändert) ══════════════════════════ */

function Kopfbereich() {
  const { balken, scrolled } = useScrollState();
  const [offen, setOffen] = useState<string | null>(null);
  const [mobil, setMobil] = useState(false);
  const [suche, setSuche] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const dunkel = !scrolled && !offen && !mobil && !suche;
  const close = useCallback(() => { setOffen(null); setMobil(false); setSuche(false); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const onBlurCapture = (e: React.FocusEvent<HTMLElement>) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node)) setOffen(null);
  };

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[80] h-[3px]">
        <span ref={balken} className="block h-full origin-left scale-x-0 bg-[linear-gradient(90deg,#8dc63f,#2f5bd7)]" />
      </div>

      <header
        ref={headerRef}
        onMouseLeave={() => setOffen(null)}
        onBlurCapture={onBlurCapture}
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color] duration-300 ${dunkel ? "bg-transparent" : "border-b border-[#e7ecf5] bg-white/[0.94] backdrop-blur-md"}`}
      >
        <div className={`hidden border-b transition-colors duration-300 lg:block ${dunkel ? "border-white/12" : "border-[#edf1f7]"}`}>
          <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-end gap-7 px-6">
            {utilityLinks.map(([label, href]) => (
              <a key={label} href={href} className={`text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-colors ${dunkel ? "text-[#a7b4d6] hover:text-white" : "text-[#43507a] hover:text-[#0b1233]"}`}>
                {label}
              </a>
            ))}
            <span aria-hidden className={`h-3 w-px ${dunkel ? "bg-white/20" : "bg-[#e7ecf5]"}`} />
            <span className={`text-[10.5px] font-semibold uppercase tracking-[0.2em] ${dunkel ? "text-[#a7b4d6]" : "text-[#43507a]"}`}>Deutschland · Deutsch</span>
          </div>
        </div>

        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-6 px-6">
          <a href="#top" aria-label="ladouz.digital – zum Seitenanfang" className="relative block h-[34px] w-[70px] flex-none">
            <Image src="/logo-white.png" alt="ladouz.digital" fill priority sizes="70px" className={`object-contain object-left transition-opacity duration-300 ${dunkel ? "opacity-100" : "opacity-0"}`} />
            <Image src="/logo-navy.png" alt="" aria-hidden fill sizes="70px" className={`object-contain object-left transition-opacity duration-300 ${dunkel ? "opacity-0" : "opacity-100"}`} />
          </a>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
            {hauptmenue.map((m) => (
              <div key={m.label} onMouseEnter={() => setOffen(m.spalten ? m.label : null)}>
                {m.spalten ? (
                  <button
                    type="button"
                    aria-expanded={offen === m.label}
                    aria-controls={`mega-${m.label}`}
                    onFocus={() => setOffen(m.label)}
                    onClick={() => setOffen(offen === m.label ? null : m.label)}
                    className={`ld-navlink flex items-center gap-1.5 text-[14.5px] font-medium transition-colors ${dunkel ? "text-[#dfe7f8] hover:text-white" : "text-[#43507a] hover:text-[#0b1233]"}`}
                  >
                    {m.label}
                    <span aria-hidden className={`text-[9px] transition-transform duration-300 ${offen === m.label ? "rotate-180" : ""}`}>▼</span>
                  </button>
                ) : (
                  <a
                    href={m.href}
                    onFocus={() => setOffen(null)}
                    className={`ld-navlink flex items-center text-[14.5px] font-medium transition-colors ${dunkel ? "text-[#dfe7f8] hover:text-white" : "text-[#43507a] hover:text-[#0b1233]"}`}
                  >
                    {m.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setSuche((s) => !s); setOffen(null); }}
              aria-expanded={suche}
              aria-controls="suchfeld"
              aria-label="Suche"
              className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-colors sm:flex ${dunkel ? "border-white/30 text-white hover:bg-white/10" : "border-[#e7ecf5] text-[#43507a] hover:bg-[#f7f9fc]"}`}
            >
              <SucheIcon />
            </button>

            <a href={BOOKING_URL} target="_blank" rel="noopener" className="ld-btn group relative hidden overflow-hidden rounded-[11px] bg-[#8dc63f] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0b1233] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex">
              <span className="relative z-10">Erstberatung</span>
              <span aria-hidden className="ld-sweep" />
            </a>

            <button
              type="button"
              onClick={() => setMobil((o) => !o)}
              aria-expanded={mobil}
              aria-controls="mobilmenue"
              aria-label={mobil ? "Menü schließen" : "Menü öffnen"}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[11px] border transition-colors lg:hidden ${dunkel ? "border-white/40 text-white" : "border-[#e7ecf5] text-[#0b1233]"}`}
            >
              <span aria-hidden className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${mobil ? "translate-y-[7px] rotate-45" : ""}`} />
              <span aria-hidden className={`block h-[2px] w-5 bg-current transition-opacity duration-300 ${mobil ? "opacity-0" : ""}`} />
              <span aria-hidden className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${mobil ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {hauptmenue.filter((m) => m.spalten).map((m) => (
          <div key={m.label} id={`mega-${m.label}`} className={`ld-mega hidden border-t border-[#edf1f7] bg-white lg:grid ${offen === m.label ? "is-open" : ""}`}>
            <div className="overflow-hidden">
              <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-10 md:grid-cols-3">
                {m.spalten!.map((s) => (
                  <div key={s.titel}>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">{s.titel}</p>
                    <ul className="mt-4 space-y-2.5">
                      {s.links.map(([label, href]) => (
                        <li key={label}>
                          <a href={href} onClick={close} className="group flex items-center gap-2 text-[0.94rem] text-[#43507a] transition-colors hover:text-[#0b1233]">
                            <span aria-hidden className="h-px w-0 bg-[#8dc63f] transition-all duration-300 group-hover:w-4" />
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div id="suchfeld" className={`ld-mega hidden border-t border-[#edf1f7] bg-white lg:grid ${suche ? "is-open" : ""}`}>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-[1240px] px-6 py-9">
              <label htmlFor="suche" className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">
                Publikationen, Leistungen und Themen durchsuchen
              </label>
              <input id="suche" type="search" placeholder="Wonach suchen Sie?" className="mt-4 w-full border-b-2 border-[#e7ecf5] bg-transparent pb-3 text-[clamp(1.2rem,2.6vw,1.9rem)] font-bold tracking-[-0.02em] text-[#0b1233] outline-none transition-colors placeholder:text-[#7d8ba6] focus:border-[#8dc63f]" />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#5b6b8a]">Häufig gesucht</span>
                {["KI-Implementierung", "Digitalstrategie", "Framework", "Automatisierung"].map((t) => (
                  <span key={t} className="rounded-full border border-[#e7ecf5] px-3.5 py-1.5 text-[0.8rem] text-[#43507a]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="mobilmenue" className={`overflow-y-auto border-t border-[#e7ecf5] bg-white transition-[max-height] duration-300 lg:hidden ${mobil ? "max-h-[70vh]" : "max-h-0 border-transparent"}`}>
          <nav aria-label="Mobile Navigation" className="mx-auto flex max-w-[1240px] flex-col px-6 py-2">
            {hauptmenue.map((m) => (
              <a key={m.label} href={m.href} onClick={close} className="border-b border-[#edf1f7] py-3.5 text-[15px] font-semibold text-[#0b1233]">{m.label}</a>
            ))}
            {utilityLinks.map(([label, href]) => (
              <a key={label} href={href} onClick={close} className="border-b border-[#edf1f7] py-3 text-[0.9rem] text-[#43507a] last:border-0">{label}</a>
            ))}
            <a href={BOOKING_URL} target="_blank" rel="noopener" onClick={close} className="my-4 rounded-[11px] bg-[#8dc63f] px-5 py-3.5 text-center text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0b1233]">
              Erstberatung buchen
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function SucheIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

/* ══════════════════════════ Hero ══════════════════════════
   Drei Schichten: Motiv → Farbschleier → Inhalt.
   Die H1 trägt keine Animation: sie ist das LCP-Element.
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section id="top" className="relative isolate bg-[#0b1233] text-white">
      <div className="absolute inset-0 -z-20">
        <Visual motiv={BILDER.hero} sizes="100vw" priority flat className="h-full w-full" />
      </div>
      <span aria-hidden className="ld-hero-veil absolute inset-0 -z-10" />
      <span aria-hidden className="ld-hero-fuss absolute inset-x-0 bottom-0 -z-10 h-2/5" />

      <div className="mx-auto flex min-h-[clamp(640px,92svh,980px)] max-w-[1240px] flex-col justify-end px-6 pt-[clamp(150px,22vh,230px)]">
        <div className="max-w-[60rem] pb-[clamp(56px,8vh,96px)]">
          <p className="flex items-start gap-4">
            <span aria-hidden className="ld-rule mt-[0.55em] block h-px w-10 flex-none bg-[#8dc63f]" />
            <span className="ld-enter ld-d1 flex flex-wrap gap-x-[0.9em] gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#9fc65f] sm:text-[0.72rem] sm:tracking-[0.3em]">
              <span className="whitespace-nowrap">Digitale &amp; KI-Strategien&nbsp;·</span>
              <span className="whitespace-nowrap">Software&nbsp;·</span>
              <span className="whitespace-nowrap">Consulting</span>
            </span>
          </p>

          <h1 className="mt-8 text-[clamp(2.4rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            Ihre eigene{" "}
            <span className="md:whitespace-nowrap">Digital&#8209; und KI&#8209;Abteilung.</span>
            <br className="hidden md:block" />{" "}
            <span className="ld-silber">Aufgebaut in zwölf Monaten.</span>
          </h1>

          <p className="ld-serif ld-enter ld-d2 mt-8 max-w-[48ch] text-[clamp(1.08rem,2vw,1.32rem)] leading-[1.6] text-[#c7d6f5]">
            Wir bauen mit Ihnen die interne Marketing-, Digital- und KI-Abteilung,
            eigene Softwarelösungen und Datenstrukturen, die für die Zukunft gebaut sind.
            Damit wird jede neue Technologie zu mehr Produktivität, Umsatz und Einsparung.
          </p>

          <div className="ld-enter ld-d3 mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <CtaButton href={BOOKING_URL}>Erstberatung vereinbaren</CtaButton>
            <CtaButton href="#framework" variant="ghost">Das Programm ansehen</CtaButton>
          </div>
        </div>

        <ul className="ld-enter ld-d4 grid gap-px border-t border-white/15 bg-white/10 md:grid-cols-3">
          {heroFakten.map((f) => (
            <li key={f.einheit} className="flex items-baseline gap-5 bg-[#0b1233]/55 py-7 md:px-7">
              <span className="ld-num text-[2.6rem] font-bold leading-none tracking-[-0.04em] text-white">{f.wert}</span>
              <span>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9fc65f]">{f.einheit}</span>
                <span className="ld-serif mt-1.5 block max-w-[30ch] text-[0.94rem] leading-[1.5] text-[#9aa8cc]">{f.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ══════════════════════════ Wandel ══════════════════════════
   Die A-nach-B-Logik als Tabelle: jede Zeile ist derselbe Bereich
   vorher und nachher. Dadurch ist der Wert ohne Erklärung lesbar.
   ═══════════════════════════════════════════════════════════ */

function Wandel() {
  return (
    <section id="system" aria-labelledby="wandel-titel" className="bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Eyebrow>Ausgangslage und Ergebnis</Eyebrow>
          <h2 id="wandel-titel" className="mt-6 max-w-[24ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
            Wo Sie heute stehen. Wo Sie nach zwölf Monaten stehen.
          </h2>
        </Reveal>

        <div className="mt-16">
          <div aria-hidden className="hidden grid-cols-[12rem_1fr_3.5rem_1fr] gap-x-8 border-b border-[#0b1233] pb-4 lg:grid">
            <span />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#5b6b8a]">Heute</span>
            <span />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#2f5bd7]">Nach zwölf Monaten</span>
          </div>

          <ol>
            {wandel.map((w, i) => (
              <Reveal key={w.bereich} delay={i * 70}>
                <li className="grid gap-x-8 gap-y-4 border-b border-[#e7ecf5] py-8 lg:grid-cols-[12rem_1fr_3.5rem_1fr] lg:items-center lg:py-9">
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#0b1233]">{w.bereich}</span>

                  <p className="ld-serif text-[1.02rem] leading-[1.6] text-[#5b6b8a]">
                    <span className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#5b6b8a] not-italic lg:hidden" style={{ fontFamily: "inherit" }}>Heute</span>
                    {w.heute}
                  </p>

                  <span aria-hidden className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#0b1233] text-[15px] text-[#8dc63f] lg:flex">→</span>

                  <p className="text-[1.12rem] font-medium leading-[1.45] tracking-[-0.012em] text-[#0b1233]">
                    <span className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7] lg:hidden">Nach zwölf Monaten</span>
                    {w.danach}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Bausteine ══════════════════════════ */

function Bausteine() {
  return (
    <section id="leistungen" aria-labelledby="bausteine-titel" className="bg-[#f7f9fc] px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <Reveal>
            <Eyebrow>Was am Ende steht</Eyebrow>
            <h2 id="bausteine-titel" className="mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
              Vier Bausteine.<br />Ein digitales Setup.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="ld-serif max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.66] text-[#43507a]">
              Sie funktionieren nur zusammen – deshalb bauen wir sie zusammen auf.
              Und übergeben sie am Ende an Ihr eigenes Team.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {bausteine.map((b, i) => (
            <Reveal key={b.nr} delay={(i % 2) * 110}>
              <li className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#e7ecf5] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#d6dfee] hover:shadow-[0_28px_64px_rgba(11,18,51,0.10)]">
                <div className="overflow-hidden">
                  <Visual motiv={b.bild} sizes="(max-width: 768px) 100vw, 600px" className="aspect-[16/10] w-full transition-transform duration-[900ms] group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-9">
                  <span className="ld-num text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">Baustein {b.nr}</span>
                  <h3 className="mt-3 text-[1.45rem] font-bold leading-[1.2] tracking-[-0.024em] text-[#0b1233]">{b.titel}</h3>
                  <p className="ld-serif mt-3.5 flex-1 text-[1.02rem] leading-[1.64] text-[#43507a]">{b.text}</p>
                  <ul className="mt-7 grid gap-2.5 border-t border-[#edf1f7] pt-6">
                    {b.punkte.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.92rem] text-[#43507a]">
                        <span aria-hidden className="block h-1.5 w-1.5 flex-none rounded-full bg-[#8dc63f]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ══════════════════════════ Programm ══════════════════════════
   Desktop: die Sektion wird beim Scrollen angeheftet. Ein Zifferblatt
   läuft von Monat 1 bis 12 und dreht sich mit, Bild und Text wechseln
   mit der Phase. Der Scroll schreibt eine CSS-Variable (--p) direkt ans
   DOM; React rendert nur bei einem Phasenwechsel neu – viermal insgesamt.

   Mobil: dieselben Phasen als ruhige Liste. Angeheftete Scroll-Szenen
   sind auf kleinen Bildschirmen eher Hindernis als Erlebnis.
   ═══════════════════════════════════════════════════════════ */

function Programm() {
  return (
    <section id="framework" aria-labelledby="programm-titel" className="relative bg-[#0b1233] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 88% 4%, rgba(47,91,215,.30), transparent 65%)" }} />

      <div className="relative mx-auto max-w-[1240px] px-6 pt-[clamp(88px,11vw,140px)]">
        <Reveal>
          <Eyebrow tone="light">Das Programm</Eyebrow>
          <h2 id="programm-titel" className="mt-6 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.034em]">
            Zwölf Monate. Vier Phasen. Ein Ergebnis.
          </h2>
          <Lead tone="light">
            Jede Phase baut auf der vorherigen auf. Am Ende steht keine Präsentation,
            sondern eine Abteilung, die arbeitet.
          </Lead>
        </Reveal>
      </div>

      <ProgrammSzene />
      <ProgrammListe />
    </section>
  );
}

function ProgrammSzene() {
  const buehne = useRef<HTMLDivElement | null>(null);
  const monatRef = useRef<HTMLSpanElement | null>(null);
  const [aktiv, setAktiv] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    let letztePhase = -1;
    let letzterMonat = -1;

    const messen = () => {
      ticking = false;
      const el = buehne.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return; // mobil ausgeblendet
      const weg = r.height - window.innerHeight;
      const p = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : 0;
      el.style.setProperty("--p", p.toFixed(4));

      const monat = Math.min(12, Math.floor(p * 12) + 1);
      if (monat !== letzterMonat) {
        letzterMonat = monat;
        if (monatRef.current) monatRef.current.textContent = String(monat).padStart(2, "0");
      }
      const phase = phaseFuerMonat(monat);
      if (phase !== letztePhase) {
        letztePhase = phase;
        setAktiv(phase);
      }
    };
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(messen);
    };

    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  /* Klick auf eine Phase: an den Anfang ihres Monatsbereichs scrollen. */
  const springen = (i: number) => {
    const el = buehne.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const weg = el.offsetHeight - window.innerHeight;
    const anteil = (phasen[i].startMonat - 1) / 12 + 0.012;
    window.scrollTo({ top: top + weg * anteil, behavior: reduced ? "auto" : "smooth" });
  };

  const ph = phasen[aktiv];
  const RADIUS = 104;
  const UMFANG = 2 * Math.PI * RADIUS;

  return (
    <div ref={buehne} className="ld-buehne relative hidden lg:block" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center pt-[112px] pb-10">
        <div className="mx-auto grid h-full max-h-[680px] w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] gap-16 px-6">

          {/* Links: Zifferblatt und Phasenliste */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-10">
              <div className="relative h-[240px] w-[240px] flex-none">
                <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
                  <circle cx="120" cy="120" r={RADIUS} fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="2" />
                  <circle
                    cx="120" cy="120" r={RADIUS}
                    fill="none" stroke="#8dc63f" strokeWidth="2.5" strokeLinecap="round"
                    className="ld-ring"
                    style={{ ["--u" as string]: UMFANG.toFixed(2) }}
                    transform="rotate(-90 120 120)"
                  />
                  {Array.from({ length: 12 }).map((_, m) => {
                    const grenze = phasen.some((x) => x.startMonat === m + 1);
                    const winkel = (m / 12) * Math.PI * 2 - Math.PI / 2;
                    const innen = grenze ? 84 : 90;
                    return (
                      <line
                        key={m}
                        x1={120 + Math.cos(winkel) * innen} y1={120 + Math.sin(winkel) * innen}
                        x2={120 + Math.cos(winkel) * 96} y2={120 + Math.sin(winkel) * 96}
                        stroke={grenze ? "#8dc63f" : "rgba(255,255,255,.28)"} strokeWidth={grenze ? 2 : 1}
                      />
                    );
                  })}
                  <g className="ld-dial">
                    <circle cx="120" cy={120 - RADIUS} r="7" fill="#8dc63f" />
                    <circle cx="120" cy={120 - RADIUS} r="13" fill="#8dc63f" fillOpacity=".18" />
                  </g>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9aa8cc]">Monat</span>
                  <span ref={monatRef} className="ld-num mt-1 text-[3.6rem] font-bold leading-none tracking-[-0.05em]">01</span>
                  <span className="mt-1.5 text-[0.72rem] text-[#8695bd]">von 12</span>
                </div>
              </div>

              <dl className="min-w-0 space-y-6">
                <div>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9aa8cc]">Start</dt>
                  <dd className="mt-1.5 text-[1.08rem] font-medium leading-[1.35] text-[#c7d6f5]">Analyse Ihrer Ausgangslage</dd>
                </div>
                <div>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9fc65f]">Ziel</dt>
                  <dd className="mt-1.5 text-[1.08rem] font-semibold leading-[1.35] text-white">Eine Abteilung, die ohne uns arbeitet</dd>
                </div>
              </dl>
            </div>

            <ol className="mt-12 border-t border-white/12">
              {phasen.map((x, i) => (
                <li key={x.nr} className="border-b border-white/12">
                  <button
                    type="button"
                    onClick={() => springen(i)}
                    aria-current={i === aktiv ? "step" : undefined}
                    className="group flex w-full items-center gap-5 py-4 text-left"
                  >
                    <span className={`ld-num w-7 text-[0.78rem] font-semibold transition-colors ${i === aktiv ? "text-[#8dc63f]" : "text-[#8695bd]"}`}>{x.nr}</span>
                    <span className={`flex-1 text-[1.02rem] font-medium transition-colors ${i === aktiv ? "text-white" : "text-[#9aa8cc] group-hover:text-white"}`}>{x.titel}</span>
                    <span className={`text-[0.8rem] transition-colors ${i === aktiv ? "text-[#c7d6f5]" : "text-[#8695bd]"}`}>{x.monate}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Rechts: Bild der Phase mit Inhalt */}
          <div className="relative overflow-hidden rounded-[26px] ring-1 ring-white/10">
            {phasen.map((x, i) => (
              <Visual
                key={x.nr}
                motiv={x.bild}
                sizes="(min-width: 1240px) 680px, 55vw"
                flat
                className={`absolute inset-0 transition-opacity duration-700 ${i === aktiv ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,13,36,.94)_0%,rgba(7,13,36,.55)_42%,rgba(7,13,36,.05)_75%)]" />

            <div key={`d-${aktiv}`} aria-live="polite" className="ld-swap absolute inset-x-0 bottom-0 p-10 xl:p-12">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9fc65f]">
                Phase {ph.nr} · {ph.monate}
              </p>
              <h3 className="mt-3 text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.1] tracking-[-0.03em]">{ph.titel}</h3>
              <p className="ld-serif mt-4 max-w-[46ch] text-[1.06rem] leading-[1.62] text-[#c7d6f5]">{ph.text}</p>
              <p className="mt-7 flex items-start gap-3 border-t border-white/15 pt-5">
                <span className="mt-[3px] text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#9fc65f]">Ergebnis</span>
                <span className="text-[1rem] font-medium text-white">{ph.ergebnis}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgrammListe() {
  return (
    <ol className="relative mx-auto max-w-[1240px] space-y-6 px-6 pt-14 pb-[clamp(72px,10vw,120px)] lg:hidden">
      {phasen.map((x) => (
        <li key={x.nr}>
          <Reveal>
            <article className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04]">
              <Visual motiv={x.bild} sizes="100vw" className="aspect-[4/3] w-full" />
              <div className="p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9fc65f]">Phase {x.nr} · {x.monate}</p>
                <h3 className="mt-3 text-[1.5rem] font-bold leading-[1.15] tracking-[-0.026em]">{x.titel}</h3>
                <p className="ld-serif mt-3 text-[1rem] leading-[1.62] text-[#c7d6f5]">{x.text}</p>
                <p className="mt-6 border-t border-white/15 pt-4 text-[0.95rem] font-medium">
                  <span className="mr-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#9fc65f]">Ergebnis</span>
                  {x.ergebnis}
                </p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ══════════════════════════ Haltung ══════════════════════════ */

function Haltung() {
  return (
    <section id="leitbild" aria-labelledby="haltung-titel" className="bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto grid max-w-[1240px] items-stretch gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <Visual motiv={BILDER.haltung} sizes="(max-width: 1024px) 100vw, 580px" className="aspect-[4/5] h-full w-full rounded-[26px]" />
        </Reveal>

        <div className="order-1 flex flex-col justify-center lg:order-2">
          <Reveal>
            <Eyebrow>Unsere Haltung</Eyebrow>
            <h2 id="haltung-titel" className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.0] tracking-[-0.04em] text-[#0b1233]">
              Präzise denken.<br />Präzise handeln.
            </h2>
            <Lead>
              Wir sind Umsetzungspartner, nicht Folienlieferant. Was wir mit Ihnen planen,
              bauen wir mit Ihnen auf – bis es in Ihrem Unternehmen selbstständig läuft.
            </Lead>
          </Reveal>

          <ol className="mt-12 border-t border-[#e7ecf5]">
            {prinzipien.map((p, i) => (
              <Reveal key={p.titel} delay={i * 90}>
                <li className="grid gap-2 border-b border-[#e7ecf5] py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-5">
                  <span className="ld-num text-[0.78rem] font-semibold text-[#2f5bd7]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[1.14rem] font-bold tracking-[-0.018em] text-[#0b1233]">{p.titel}</h3>
                    <p className="ld-serif mt-1.5 text-[1rem] leading-[1.6] text-[#43507a]">{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-10 flex items-center gap-4">
              <Image src="/nizar-portrait.webp" alt="" aria-hidden width={216} height={216} className="h-14 w-14 flex-none rounded-full object-cover" />
              <span>
                <span className="block text-[0.98rem] font-semibold tracking-[-0.012em] text-[#0b1233]">Nizar Ladouz</span>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#5b6b8a]">Gründer, Ladouz Digital</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Branchen ══════════════════════════ */

function Branchen() {
  return (
    <section id="branchen" aria-labelledby="branchen-titel" className="border-t border-[#e7ecf5] bg-[#f7f9fc] px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Für wen</Eyebrow>
          <h2 id="branchen-titel" className="mt-6 max-w-[14ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
            Mittelstand. Branchenübergreifend.
          </h2>
          <Lead>
            Für mittelständische Unternehmen, die Digitales nicht länger einkaufen,
            sondern als eigene Fähigkeit aufbauen wollen. Entscheidend ist die Struktur
            Ihrer Wertschöpfung, nicht das Etikett Ihrer Branche.
          </Lead>
          <div className="mt-9">
            <CtaButton href="#kontakt" variant="dark">Passt das zu uns?</CtaButton>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid border-t border-[#dfe6f1] sm:grid-cols-2">
            {branchen.map((b) => (
              <li key={b} className="flex items-center gap-3.5 border-b border-[#dfe6f1] py-4 sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(even)]:border-l">
                <span aria-hidden className="block h-1.5 w-1.5 flex-none rounded-full bg-[#2f5bd7]" />
                <span className="text-[1rem] text-[#0b1233]">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════ Perspektiven ══════════════════════════ */

function Perspektiven() {
  return (
    <section id="publikationen" aria-labelledby="perspektiven-titel" className="bg-white py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>Perspektiven</Eyebrow>
              <h2 id="perspektiven-titel" className="mt-6 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
                Wie wir über Digitalisierung denken.
              </h2>
            </div>
            <a href="#newsletter" className="inline-flex items-center gap-2 border-b-2 border-[#8dc63f] pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1233] transition-colors hover:text-[#2f5bd7]">
              Per E-Mail erhalten <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <ul className="ld-rail ld-rail-inset mt-14 flex gap-6 overflow-x-auto pb-4">
        {perspektiven.map((x, i) => (
          <li key={x.titel} className="ld-rail-item w-[min(82vw,400px)] flex-none">
            <article className="flex h-full flex-col">
              <Visual motiv={x.bild} sizes="(max-width: 640px) 82vw, 400px" className="aspect-[16/10] w-full rounded-[18px]" />
              <p className="ld-num mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">
                {String(i + 1).padStart(2, "0")} · {x.kicker}
              </p>
              <h3 className="mt-3 text-[1.26rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#0b1233]">{x.titel}</h3>
              <p className="ld-serif mt-3 text-[1rem] leading-[1.6] text-[#43507a]">{x.text}</p>
            </article>
          </li>
        ))}
      </ul>

      {/* Newsletter – bewusst ohne vorgetäuschte Bestätigung. Solange kein
          Versanddienst angebunden ist, läuft die Aufnahme per E-Mail. */}
      <div id="newsletter" className="mx-auto mt-20 max-w-[1240px] px-6">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[22px] bg-[#0b1233] p-9 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9fc65f]">Ladouz Insights</p>
              <p className="mt-3 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.8rem)] font-bold leading-[1.2] tracking-[-0.024em]">
                Neue Perspektiven, wenn sie erscheinen.
              </p>
            </div>
            <a
              href={`mailto:${MAIL}?subject=${encodeURIComponent("Aufnahme in den Verteiler")}`}
              className="ld-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[11px] bg-[#8dc63f] px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0b1233] transition-colors hover:bg-[#b6e57a]"
            >
              <span className="relative z-10">Aufnahme anfragen</span>
              <span aria-hidden className="relative z-10">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════ Kontakt ══════════════════════════ */

type Status = "idle" | "sending" | "success" | "error";

function Kontakt() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  /* Honeypot mit semantisch leerem Namen: ein Feld "firma" wird von
     Browsern und Passwort-Managern mitunter befüllt – echte Anfragen
     würden dann still als Spam verworfen. */
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const bereit = name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  /* Fällt die API aus, geht die Anfrage nicht verloren: der Mail-Link
     enthält Name und Adresse bereits vorausgefüllt. */
  const mailFallback = `mailto:${MAIL}?subject=${encodeURIComponent("Anfrage Erstberatung")}&body=${encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n`)}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bereit || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), hp }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="bg-[#f7f9fc] px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="grid overflow-hidden rounded-[28px] bg-[#0b1233] text-white lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[280px]">
              <Visual motiv={BILDER.kontakt} sizes="(max-width: 1024px) 100vw, 520px" flat className="absolute inset-0 h-full w-full" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,#0b1233_100%)] max-lg:bg-[linear-gradient(0deg,#0b1233_0%,transparent_50%)]" />
            </div>

            <div className="relative p-9 sm:p-14">
              <Eyebrow tone="light">Erstberatung</Eyebrow>
              <h2 id="kontakt-titel" className="mt-6 max-w-[16ch] text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.06] tracking-[-0.032em]">
                Sprechen wir über Ihre Ausgangslage.
              </h2>
              <p className="ld-serif mt-6 max-w-[46ch] text-[1.1rem] leading-[1.64] text-[#c7d6f5]">
                In der Erstberatung klären wir, wo Ihr Unternehmen heute steht – und ob das
                Programm zu Ihnen passt. Unverbindlich und konkret.
              </p>
              <div className="mt-9"><CtaButton href={BOOKING_URL}>Termin direkt wählen</CtaButton></div>

              <div className="mt-12 border-t border-white/15 pt-9" aria-live="polite">
                {status === "success" ? (
                  <div>
                    <p className="text-[1.15rem] font-bold tracking-[-0.018em]">Vielen Dank.</p>
                    <p className="ld-serif mt-2 text-[1rem] leading-[1.6] text-[#c7d6f5]">Ihre Anfrage ist angekommen. Wir melden uns persönlich.</p>
                    <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-[0.88rem] font-medium text-[#b6e57a] underline underline-offset-4">
                      Weitere Anfrage senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <p className="text-[1.05rem] font-bold tracking-[-0.018em]">Oder kurz schreiben</p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Feld id="name" label="Name" type="text" value={name} placeholder="Vor- und Nachname" autoComplete="name" onChange={setName} />
                      <Feld id="email" label="E-Mail" type="email" value={email} placeholder="name@unternehmen.de" autoComplete="email" onChange={setEmail} />
                    </div>

                    <div aria-hidden className="ld-hp">
                      <label htmlFor="ld-kennung">Bitte frei lassen</label>
                      <input id="ld-kennung" name="ld-kennung" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    <CtaButton submit disabled={!bereit || status === "sending"} className="mt-7 w-full sm:w-auto">
                      {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
                    </CtaButton>

                    {status === "error" && (
                      <p role="alert" className="mt-5 text-[0.92rem] leading-relaxed text-[#ffc2b3]">
                        Die Übermittlung hat nicht geklappt.{" "}
                        <a href={mailFallback} className="font-semibold text-white underline underline-offset-4">Anfrage per E-Mail senden</a>
                        {" "}– Ihre Angaben sind bereits eingetragen.
                      </p>
                    )}

                    <p className="ld-serif mt-5 text-[0.82rem] leading-[1.6] text-[#8695bd]">
                      Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu.
                      Details in der <a href="/datenschutz" className="underline underline-offset-2 hover:text-white">Datenschutzerklärung</a>.
                    </p>
                  </form>
                )}
              </div>

              <dl className="mt-10 grid gap-5 border-t border-white/15 pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#9aa8cc]">Anschrift</dt>
                  <dd className="mt-1.5 text-[0.95rem] text-[#dfe7f8]">Markt 40<br />53721 Siegburg</dd>
                </div>
                <div>
                  <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#9aa8cc]">Kontakt</dt>
                  <dd className="mt-1.5 text-[0.95rem] text-[#dfe7f8]">
                    <a href="tel:+4915770206552" className="hover:text-white">{TEL}</a><br />
                    <a href={`mailto:${MAIL}`} className="hover:text-white">{MAIL}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Feld({
  id, label, type, value, placeholder, autoComplete, onChange,
}: {
  id: string; label: string; type: "text" | "email"; value: string;
  placeholder: string; autoComplete: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9aa8cc]">{label}</label>
      <input
        id={id} name={id} type={type} required value={value} placeholder={placeholder} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[12px] border border-white/15 bg-white/[0.07] px-4 py-3.5 text-[1rem] text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-[#8695bd] focus:border-[#8dc63f] focus:bg-white/[0.11] focus:ring-4 focus:ring-[#8dc63f]/15"
      />
    </div>
  );
}

/* ══════════════════════════ Footer ══════════════════════════ */

function Footer() {
  const spalten: { titel: string; links: [string, string][] }[] = [
    { titel: "Programm", links: [["Ausgangslage & Ergebnis", "#system"], ["Die vier Bausteine", "#leistungen"], ["Die vier Phasen", "#framework"], ["Für wen", "#branchen"]] },
    { titel: "Unternehmen", links: [["Unsere Haltung", "#leitbild"], ["Perspektiven", "#publikationen"], ["Erstberatung", "#kontakt"]] },
    { titel: "Rechtliches", links: [["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"]] },
  ];

  return (
    <footer className="bg-[#0b1233] px-6 pt-[86px] text-[#9aa8cc]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo-white.png" alt="ladouz.digital" width={560} height={280} className="h-[38px] w-auto" />
            <p className="ld-serif mt-6 max-w-[320px] text-[0.94rem] leading-[1.7]">
              Digitale &amp; KI-Strategien, Softwareentwicklung und Consulting für den Mittelstand.
              Präzise gedacht, präzise umgesetzt.
            </p>
          </div>

          {spalten.map((col) => (
            <nav key={col.titel} aria-label={col.titel}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white">{col.titel}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-[0.92rem] transition-colors hover:text-white">{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-8">
          <span className="text-[0.8rem] leading-relaxed text-[#8695bd]">
            © {new Date().getFullYear()} ladouz.digital – Alle Rechte vorbehalten.
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#a9bcd3]">we create digital value</span>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════ Globale Styles ══════════════════════════ */

function GlobalStyles() {
  const css = `
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }
    [id] { scroll-margin-top: 118px; }

    /* Jost: Headlines, UI, Zahlen. Source Serif 4: Lesetexte.
       Die Variablen setzt layout.tsx über next/font. */
    body, input, textarea, select, button {
      font-family: var(--font-jost, 'Jost'), system-ui, -apple-system, sans-serif;
      font-feature-settings: "kern" 1, "liga" 1;
    }
    body { font-size: 17px; letter-spacing: .004em; }
    .ld-serif { font-family: var(--font-source-serif, 'Source Serif 4'), Georgia, 'Times New Roman', serif; letter-spacing: 0; }
    .ld-num { font-variant-numeric: tabular-nums lining-nums; }
    h1, h2, h3 { text-wrap: balance; }
    p { text-wrap: pretty; }

    .ld-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
    .ld-skip { position: absolute; left: -9999px; top: 0; z-index: 999; background: #8dc63f; color: #0b1233; padding: 12px 20px; font-weight: 600; border-radius: 0 0 11px 0; }
    .ld-skip:focus { left: 0; }

    /* Kein will-change: bei vielen Elementen hält es dauerhaft je eine
       Compositing-Ebene vor. Der Browser promotet während der Transition selbst. */
    .ld-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.16,.84,.28,1), transform .8s cubic-bezier(.16,.84,.28,1); }
    .ld-reveal.is-visible { opacity: 1; transform: none; }

    .ld-mega { grid-template-rows: 0fr; opacity: 0; pointer-events: none; transition: grid-template-rows .42s cubic-bezier(.16,.84,.28,1), opacity .3s; }
    .ld-mega.is-open { grid-template-rows: 1fr; opacity: 1; pointer-events: auto; }

    .ld-btn .ld-sweep { position: absolute; inset: 0; z-index: 0; pointer-events: none; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.5) 50%, transparent 65%); transform: translateX(-120%); transition: transform .75s cubic-bezier(.16,.84,.28,1); }
    .ld-btn:hover .ld-sweep { transform: translateX(120%); }

    .ld-navlink { position: relative; padding-block: 6px; background: none; border: 0; cursor: pointer; }
    .ld-navlink::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: #8dc63f; transform: scaleX(0); transform-origin: 0 50%; transition: transform .28s cubic-bezier(.16,.84,.28,1); }
    .ld-navlink:hover::after, .ld-navlink:focus-visible::after { transform: scaleX(1); }

    .ld-kenburns { animation: ldZoom 28s ease-in-out infinite alternate; transform-origin: 55% 45%; }
    @keyframes ldZoom { from { transform: scale(1); } to { transform: scale(1.08); } }

    .ld-silber {
      background-image: linear-gradient(96deg, #8fa3bd 0%, #ffffff 22%, #cdd9e8 40%, #ffffff 58%, #a9bcd3 76%, #eef3f9 100%);
      background-size: 220% 100%; background-position: 0% 50%;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: ldGlanz 14s ease-in-out infinite alternate;
    }
    @keyframes ldGlanz { to { background-position: 100% 50%; } }

    /* Hero-Farbschleier – hier werden die Farbwerte über dem Motiv gepflegt.
       Liegt unabhängig vom Bild darüber. Unter etwa .70 links wird weisser
       Text auf hellen Motiven unlesbar. */
    .ld-hero-veil {
      background:
        radial-gradient(78% 62% at 84% 10%, rgba(47,91,215,.30), transparent 62%),
        radial-gradient(60% 55% at 4% 96%, rgba(141,198,63,.08), transparent 60%),
        linear-gradient(100deg, rgba(7,13,36,.95) 0%, rgba(8,14,40,.88) 30%, rgba(11,18,51,.62) 60%, rgba(11,18,51,.28) 84%, rgba(11,18,51,.14) 100%);
    }
    .ld-hero-fuss { background: linear-gradient(to top, #0b1233 0%, rgba(11,18,51,0) 100%); }

    /* Ladechoreografie – nur CSS. Die H1 ist bewusst nicht dabei. */
    @keyframes ldRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    @keyframes ldRule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    .ld-enter { animation: ldRise .8s cubic-bezier(.16,.84,.28,1) both; }
    .ld-d1 { animation-delay: .10s; } .ld-d2 { animation-delay: .22s; }
    .ld-d3 { animation-delay: .32s; } .ld-d4 { animation-delay: .44s; }
    .ld-rule { transform-origin: left center; animation: ldRule .9s cubic-bezier(.16,.84,.28,1) both; }

    /* Programm-Szene: --p (0 bis 1) wird beim Scrollen direkt gesetzt. */
    .ld-ring { stroke-dasharray: var(--u); stroke-dashoffset: calc(var(--u) * (1 - var(--p, 0))); }
    .ld-dial { transform-box: view-box; transform-origin: 50% 50%; transform: rotate(calc(var(--p, 0) * 360deg)); }
    .ld-swap { animation: ldRise .55s cubic-bezier(.16,.84,.28,1) both; }

    /* Perspektiven-Rail: native Snap-Punkte, kein Karussell-Skript. */
    .ld-rail { scroll-snap-type: x mandatory; scrollbar-width: none; }
    .ld-rail::-webkit-scrollbar { display: none; }
    .ld-rail-item { scroll-snap-align: start; }
    .ld-rail-inset { padding-inline: 1.5rem; scroll-padding-inline: 1.5rem; }
    @media (min-width: 1024px) {
      .ld-rail-inset { padding-inline: max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem)); scroll-padding-inline: max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem)); }
    }

    :focus-visible { outline: 2px solid #8dc63f; outline-offset: 3px; border-radius: 2px; }

    @media (scripting: none) { .ld-reveal { opacity: 1; transform: none; } }
    @media (prefers-contrast: more) {
      .ld-reveal { opacity: 1; transform: none; }
      .ld-hero-veil { background: linear-gradient(100deg, rgba(7,13,36,.97) 0%, rgba(11,18,51,.86) 70%, rgba(11,18,51,.74) 100%); }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .ld-reveal { opacity: 1; transform: none; transition: none; }
      .ld-btn .ld-sweep { display: none; }
      .ld-kenburns, .ld-enter, .ld-rule, .ld-swap { animation: none; opacity: 1; transform: none; }
      .ld-silber { animation: none; background-position: 30% 50%; }
      .ld-mega { transition: none; }
      .ld-dial { transform: none; }
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
