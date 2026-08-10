"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   ladouz.digital – Beratungsplattform
   Next.js (App Router) · TypeScript · Tailwind CSS

   TYPOGRAFIE
   Jost trägt Headlines, UI und Zahlen – geometrisch, wie das Logo.
   Source Serif 4 trägt die Lesetexte – Leads, Fließtext, Zitate.
   Die Paarung ist die klassische Beratungs-Kombination: geometrische
   Auszeichnung über ruhiger Serifenschrift. Beide sind variable Fonts,
   frei lizenziert und werden selbst gehostet.

   BILDER
   <Visual/> rendert ohne `src` eine CI-Grafik, mit `src` ein Foto –
   beides mit Ken-Burns-Zoom. Motive: 2400 × 1600 px, ruhige Bildmitte.

   BARRIEREFREIHEIT
   Karussell mit Pause-Steuerung (WCAG 2.2.2), Mega-Menü per Tastatur,
   statische H1, Live-Regionen für Formularmeldungen, Skip-Link,
   vollständige prefers-reduced-motion-Abdeckung.
   ═══════════════════════════════════════════════════════════════════════════ */

import {
  useCallback, useEffect, useId, useRef, useState,
  type FormEvent, type ReactNode,
} from "react";
import Image from "next/image";

const BOOKING_URL = "https://zeeg.me/management75/erstberatung";
const MAIL = "management@ladouz.digital";
const TEL = "01577 0206552";

/* ══════════════════════════ Inhalte ══════════════════════════ */

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

/* Bildflächen: `bild` leer lassen → CI-Grafik.
   Sobald ein Motiv vorliegt: bild: "/hero-ki.jpg" */
const insights = [
  {
    kicker: "Analyse",
    titel: "KI im Mittelstand: warum Pilotprojekte selten produktiv werden",
    text: "Die Mehrheit der KI-Initiativen scheitert nicht an der Technologie, sondern an fehlender Prozessverankerung.",
    variant: "wave" as const,
    bild: undefined as string | undefined,
  },
  {
    kicker: "Framework",
    titel: "Digitale Strategie als Architektur – nicht als Maßnahmenliste",
    text: "Einzelmaßnahmen verpuffen, Strukturen bleiben. Wie ein dokumentiertes Framework ein steuerbares System schafft.",
    variant: "grid" as const,
    bild: undefined as string | undefined,
  },
  {
    kicker: "Standpunkt",
    titel: "Produktivität durch Qualität. Qualität durch System.",
    text: "Warum methodisches Vorgehen Fehler und Reibungsverluste reduziert – und die Leistungsfähigkeit ganzer Organisationen erhöht.",
    variant: "orbit" as const,
    bild: undefined as string | undefined,
  },
];

const heroChips = ["Systemisch statt isoliert", "Qualität als Standard", "Messbar & skalierbar"];

const branchen = [
  "Maschinen- und Anlagenbau", "Handel & E-Commerce", "Logistik & Transport",
  "Handwerk & Bau", "Beratung & Kanzleien", "Gesundheitswesen",
  "Finanzdienstleistung", "Immobilienwirtschaft", "Energie & Versorgung",
  "Bildung & Weiterbildung", "Industriegüter", "Öffentlicher Sektor",
];

const themen = [
  "Digitalstrategie", "KI-Implementierung", "Prozessautomatisierung",
  "Datenanalyse", "Performance-Marketing", "Change Management",
  "Kostensenkung", "Skalierung", "Qualitätsmanagement", "Organisation",
];

const referenzen = [
  {
    kicker: "Anwendungsszenario · Industrie",
    titel: "Vom Werkzeugkasten zur Systemlandschaft",
    text: "Ein Fertigungsbetrieb betreibt sieben Insellösungen ohne gemeinsame Datenbasis. Das Framework verbindet sie zu einer Architektur mit einheitlichen Kennzahlen.",
    methode: "Ladouz-Framework, Ebene 01–02",
    variant: "grid" as const,
    bild: undefined as string | undefined,
  },
  {
    kicker: "Anwendungsszenario · Handel",
    titel: "KI dort, wo sie messbar wirkt",
    text: "Statt eines Chatbots ohne Anbindung: Automatisierung der Angebotserstellung, eingebettet in bestehende Prozesse und klare Verantwortlichkeiten.",
    methode: "Ladouz-Framework, Ebene 02",
    variant: "orbit" as const,
    bild: undefined as string | undefined,
  },
  {
    kicker: "Anwendungsszenario · Dienstleistung",
    titel: "Marketing mit Steuerungslogik",
    text: "Kampagnen ohne Tracking-Architektur liefern Zahlen, aber keine Erkenntnis. Erst die durchgängige Messung macht Budget zu einer Entscheidung.",
    methode: "Ladouz-Framework, Ebene 03–04",
    variant: "wave" as const,
    bild: undefined as string | undefined,
  },
];

const leistungen = [
  { nr: "01", titel: "Digitale Unternehmensstrategie", text: "Wir entwickeln die strategische Architektur Ihres digitalen Geschäfts: Zielbild, Roadmap und Steuerungslogik – als belastbares Framework statt loser Maßnahmen.", punkte: ["Zielbild & Roadmap", "Steuerungslogik", "Kennzahlen-Modell"] },
  { nr: "02", titel: "KI-Implementierung", text: "Von der Potenzialanalyse bis zum produktiven System: Wir integrieren KI dort, wo sie messbaren Nutzen stiftet – eingebettet in klare Prozesse und Verantwortlichkeiten.", punkte: ["Potenzialanalyse", "Prozess-Automatisierung", "Betrieb & Governance"] },
  { nr: "03", titel: "Online-Marketing", text: "Performance-Marketing mit Systemanspruch: transparente Kennzahlen, kontinuierliche Optimierung und Kampagnen, die auf Ihre Gesamtstrategie einzahlen.", punkte: ["Paid & Organic", "Tracking-Architektur", "Laufende Optimierung"] },
];

const framework = [
  { nr: "01", titel: "Analyse", text: "Wir erfassen Ihre Wertschöpfungskette als Ganzes: Status quo, Potenziale, Engpässe und die relevanten Kennzahlen.", label: "Verstehen" },
  { nr: "02", titel: "Architektur", text: "Wir entwerfen das Framework: Strategie, Systeme und Prozesse werden zu einer klaren, dokumentierten Struktur verbunden.", label: "Strukturieren" },
  { nr: "03", titel: "Implementierung", text: "Wir setzen präzise um – KI-Systeme, Automatisierungen und Marketing-Motoren gehen kontrolliert in den Betrieb.", label: "Umsetzen" },
  { nr: "04", titel: "Skalierung", text: "Wir messen, lernen und optimieren kontinuierlich. Stillstand ist Rückschritt – Ihr System entwickelt sich permanent weiter.", label: "Wachsen" },
];

const ebenen = [
  { stufe: "Ebene 01", titel: "Strategie-Framework", sub: "Zielbild, Roadmap, Steuerung" },
  { stufe: "Ebene 02", titel: "Prozess- & KI-Systeme", sub: "Automatisierung, Integration" },
  { stufe: "Ebene 03", titel: "Marketing-Execution", sub: "Kampagnen, Content, Performance" },
  { stufe: "Ebene 04", titel: "Messung & Optimierung", sub: "Kennzahlen, Reporting, Iteration" },
];

const kennzahlen: { wert: number | null; suffix: string; label: string; sub: string }[] = [
  { wert: 100, suffix: "%", label: "Systemischer Ansatz", sub: "Jedes Projekt folgt dem Framework" },
  { wert: 4, suffix: "", label: "Framework-Ebenen", sub: "Von Strategie bis Optimierung" },
  { wert: 24, suffix: "/7", label: "Laufende Systeme", sub: "Automatisierung arbeitet durchgehend" },
  { wert: null, suffix: "∞", label: "Skalierbarkeit", sub: "Strukturen, die mitwachsen" },
];

const werte = [
  { nr: "01", titel: "Systemisch denken", text: "Wir optimieren nicht isolierte Aufgaben, sondern ganze Wertschöpfungsketten. Jede Lösung wird als Teil eines größeren Systems entworfen." },
  { nr: "02", titel: "Kundenorientiert handeln", text: "Die Anforderungen unserer Kunden sind unser Maßstab. Qualität bedeutet für uns die konsequente Erfüllung – und Übererfüllung – dieser Anforderungen." },
  { nr: "03", titel: "Kontinuierlich verbessern", text: "Stillstand ist Rückschritt. Wir lernen, messen und entwickeln uns permanent weiter – und mit uns die Systeme unserer Kunden." },
  { nr: "04", titel: "Verantwortung übernehmen", text: "Für Ergebnisse, für Qualität und für partnerschaftliche Zusammenarbeit. Wir stehen zu dem, was wir bauen – langfristig." },
];

const publikationen = [
  { kat: "Strategie", format: "Analyse", titel: "Digitale Strategie als Architektur", text: "Warum erfolgreiche Digitalisierung mit einem Framework beginnt – und nicht mit Tools. Über die Reihenfolge, die den Unterschied macht.", variant: "orbit" as const },
  { kat: "Künstliche Intelligenz", format: "Leitfaden", titel: "KI im Mittelstand richtig einführen", text: "Vom Pilotprojekt zum produktiven System: die vier Phasen einer tragfähigen KI-Implementierung und die typischen Abbruchstellen.", variant: "grid" as const },
  { kat: "Marketing", format: "Framework", titel: "Marketing mit Systemanspruch", text: "Wie transparente Kennzahlen und eine saubere Tracking-Architektur aus Kampagnen planbares Wachstum machen.", variant: "wave" as const },
];

const socials: [string, string][] = [
  ["LinkedIn", "https://www.linkedin.com/"],
  ["Instagram", "https://www.instagram.com/"],
  ["YouTube", "https://www.youtube.com/"],
];

/* ══════════════════════════ Hooks ══════════════════════════ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.16, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && once) obs.unobserve(e.target);
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return { progress, scrolled };
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
    <span className="flex items-center gap-3">
      <span className="block h-[2px] w-7 flex-none bg-[#8dc63f]" />
      <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.3em] ${tone === "light" ? "text-[#9fc65f]" : "text-[#2f5bd7]"}`}>
        {children}
      </span>
    </span>
  );
}

function SectionTitle({ children, tone = "dark", className = "", as: Tag = "h2" }: { children: ReactNode; tone?: "dark" | "light"; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag className={`mt-5 text-[clamp(2.05rem,3.9vw,3.15rem)] font-bold leading-[1.08] tracking-[-0.03em] ${tone === "light" ? "text-white" : "text-[#0b1233]"} ${className}`}>
      {children}
    </Tag>
  );
}

function Lead({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`ld-serif mt-6 max-w-[58ch] text-[1.12rem] leading-[1.72] ${tone === "light" ? "text-[#a7b4d6]" : "text-[#43507a]"} ${className}`}>
      {children}
    </p>
  );
}

function CtaButton({
  href, children, variant = "primary", className = "", onClick, submit = false, disabled,
}: {
  href?: string; children: ReactNode; variant?: "primary" | "ghost" | "dark";
  className?: string; onClick?: () => void; submit?: boolean; disabled?: boolean;
}) {
  const base = "ld-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[11px] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0";
  const styles = {
    primary: "bg-[#8dc63f] text-[#0b1233] shadow-[0_10px_26px_rgba(141,198,63,0.38)] hover:shadow-[0_14px_32px_rgba(141,198,63,0.5)]",
    ghost: "border-[1.5px] border-white/55 text-white hover:border-white hover:bg-white/10",
    dark: "border-[1.5px] border-[#131f5c] text-[#131f5c] hover:bg-[#131f5c] hover:text-white",
  }[variant];

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
      {variant === "primary" && !disabled && <span aria-hidden className="ld-sweep" />}
    </>
  );

  if (submit || !href) {
    return <button type={submit ? "submit" : "button"} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>{inner}</button>;
  }
  const ext = href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {inner}
    </a>
  );
}

/* ══════════════════════════ Visual ══════════════════════════ */

function Visual({
  variant, className = "", src, alt = "", priority = false,
}: {
  variant: "wave" | "grid" | "orbit" | "stack";
  className?: string; src?: string; alt?: string; priority?: boolean;
}) {
  /* useId verhindert doppelte SVG-IDs, wenn dieselbe Variante
     mehrfach auf der Seite vorkommt. Doppelpunkte raus – die sind
     in url(#…)-Referenzen nicht zuverlässig. */
  const uid = useId().replace(/:/g, "");
  const g = `g-${uid}`, r = `r-${uid}`, p = `p-${uid}`;

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-[#0b1233] ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width:1024px) 100vw, 50vw" className="ld-kenburns object-cover" />
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,18,51,.55)_0%,rgba(11,18,51,.10)_60%)]" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(126deg,#0b1233_0%,#131f5c_45%,#2f5bd7_100%)] ${className}`} role="img" aria-label={alt || "Grafik im Ladouz-Design"}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="ld-kenburns absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4b7ce8" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id={r}>
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8dc63f" stopOpacity="0" />
          </radialGradient>
          <pattern id={p} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="600" fill={`url(#${p})`} />
        <circle cx="640" cy="140" r="240" fill={`url(#${r})`} />

        {variant === "wave" && [0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M-40 ${200 + i * 62} Q 200 ${140 + i * 62} 400 ${210 + i * 62} T 840 ${190 + i * 62}`} fill="none" stroke={`url(#${g})`} strokeWidth={1.6} opacity={1 - i * 0.14} />
        ))}

        {variant === "grid" && Array.from({ length: 5 }).map((_, row) =>
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
            {[[400, 190], [575, 300], [400, 540], [160, 300]].map(([x, y], i) => (
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

/* ══════════════════════════ Dot-Wave ══════════════════════════ */

function DotWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>(0, false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Rechnet nur, solange der Hero sichtbar ist – spart Akku.
    if (reduced || !inView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0, h = 0, raf = 0, t = 0;
    let dots: { x: number; y: number; ph: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      dots = [];
      const gap = 34 * dpr;
      for (let x = 0; x < w + gap; x += gap)
        for (let y = 0; y < h + gap; y += gap)
          dots.push({ x, y, ph: x * 0.006 + y * 0.004 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      const cx = w * 0.76, cy = h * 0.3;
      for (const d of dots) {
        const wv = Math.sin(t * 1.1 + d.ph) * 0.5 + 0.5;
        const dist = Math.hypot(d.x - cx, d.y - cy) / (w * 0.7);
        const a = Math.max(0, 1 - dist) * (0.08 + wv * 0.22);
        if (a < 0.015) continue;
        ctx.beginPath();
        ctx.arc(d.x, d.y + Math.sin(t + d.ph) * 3 * dpr, (0.6 + wv * 1.7) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function Counter({ ziel, suffix }: { ziel: number | null; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  const [wert, setWert] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || ziel === null) return;
    if (reduced) { setWert(ziel); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setWert(Math.round(ziel * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, ziel, reduced]);

  return (
    <span ref={ref} className="ld-num bg-[linear-gradient(92deg,#b6e57a,#7ea3f0)] bg-clip-text text-[2.5rem] font-bold leading-none text-transparent">
      {ziel === null ? suffix : `${wert}${suffix}`}
    </span>
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
          <KompetenzMatrix />
          <BedarfsDialog />
          <Referenzen />
          <Leistungen />
          <FrameworkSektion />
          <SystemSektion />
          <Leitbild />
          <Publikationen />
          <SplitCta />
          <Newsletter />
          <Kontakt />
        </main>
        <Footer />
      </div>
    </>
  );
}

/* ══════════════════════════ Kopfbereich ══════════════════════════ */

function Kopfbereich() {
  const { progress, scrolled } = useScrollState();
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

  /* Schliesst das Menü, sobald der Fokus den Kopfbereich verlässt –
     dadurch ist es auch per Tastatur benutzbar, nicht nur per Maus. */
  const onBlurCapture = (e: React.FocusEvent<HTMLElement>) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node)) setOffen(null);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-[3px]">
        <div className="h-full bg-[linear-gradient(90deg,#8dc63f,#2f5bd7)] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header
        ref={headerRef}
        onMouseLeave={() => setOffen(null)}
        onBlurCapture={onBlurCapture}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${dunkel ? "bg-transparent" : "border-b border-[#e7ecf5] bg-white/92 backdrop-blur-xl"}`}
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

            <a href={BOOKING_URL} target="_blank" rel="noopener" className="ld-btn group relative hidden overflow-hidden rounded-[11px] bg-[#8dc63f] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0b1233] shadow-[0_8px_20px_rgba(141,198,63,0.35)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex">
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

        {/* Mega-Menü – grid-template-rows statt max-height, damit nichts abgeschnitten wird */}
        {hauptmenue.filter((m) => m.spalten).map((m) => (
          <div key={m.label} id={`mega-${m.label}`} className={`ld-mega hidden border-t border-[#edf1f7] bg-white lg:grid ${offen === m.label ? "is-open" : ""}`}>
            <div className="overflow-hidden">
              <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-10 md:grid-cols-3">
                {m.spalten!.map((s) => (
                  <div key={s.titel}>
                    <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">{s.titel}</h2>
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
              <input id="suche" type="search" placeholder="Wonach suchen Sie?" className="mt-4 w-full border-b-2 border-[#e7ecf5] bg-transparent pb-3 text-[clamp(1.2rem,2.6vw,1.9rem)] font-bold tracking-[-0.02em] text-[#0b1233] outline-none transition-colors placeholder:text-[#a9bcd3] focus:border-[#8dc63f]" />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#a9bcd3]">Häufig gesucht</span>
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
   Eine feste H1 als Marken-Anker (SEO), darunter das rotierende
   Insight-Modul mit Pause-Steuerung (WCAG 2.2.2).
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  const [i, setI] = useState(0);
  const [laeuft, setLaeuft] = useState(true);
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const anzahl = insights.length;

  const aktivesAutoplay = laeuft && !hover && !reduced;

  useEffect(() => {
    if (!aktivesAutoplay) return;
    const iv = setInterval(() => setI((v) => (v + 1) % anzahl), 7000);
    return () => clearInterval(iv);
  }, [aktivesAutoplay, anzahl]);

  const slide = insights[i];

  return (
    <section id="top" className="relative overflow-hidden bg-[#0b1233] pt-[110px] text-white">
      <div className="relative mx-auto grid max-w-[1240px] items-stretch lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative z-10 px-6 py-[76px] lg:py-[104px]">
          <DotWave />

          <div className="relative">
            <Reveal>
              <Eyebrow tone="light">Agentur für digitale Systemarchitektur</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 max-w-[15ch] text-[clamp(2.4rem,4.9vw,3.9rem)] font-bold leading-[1.03] tracking-[-0.038em]">
                Frameworks für{" "}
                <span className="bg-[linear-gradient(96deg,#b6e57a_0%,#ffffff_62%)] bg-clip-text text-transparent">
                  digitale &amp;&nbsp;KI-Strategien
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="ld-serif mt-6 max-w-[48ch] text-[1.15rem] leading-[1.7] text-[#c7d6f5]">
                Die Infrastruktur hinter Ihrer digitalen Unternehmensstrategie, KI-Implementierung
                und Ihrem Online-Marketing. Systemisch gedacht, präzise gebaut, messbar skaliert.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaButton href={BOOKING_URL}>Erstberatung</CtaButton>
                <CtaButton href="#framework" variant="ghost">Unser Framework</CtaButton>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
                {heroChips.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#a7b4d6]">
                    <span aria-hidden className="ld-pulse block h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Insight-Modul */}
            <div
              className="mt-12 border-t border-white/15 pt-8"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocusCapture={() => setHover(true)}
              onBlurCapture={() => setHover(false)}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#7b88ad]">
                  Aktuelle Perspektiven
                </span>
                <button
                  type="button"
                  onClick={() => setLaeuft((l) => !l)}
                  aria-label={laeuft ? "Automatischen Wechsel pausieren" : "Automatischen Wechsel fortsetzen"}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#8dc63f] hover:bg-white/10"
                >
                  <span aria-hidden className="text-[10px] leading-none">{laeuft ? "❙❙" : "▶"}</span>
                </button>
              </div>

              <div aria-live="polite" aria-atomic="true" className="mt-5 min-h-[104px]">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#9fc65f]">{slide.kicker}</p>
                <h2 className="mt-2 max-w-[34ch] text-[1.22rem] font-semibold leading-[1.3] tracking-[-0.018em] text-white">
                  <a href="#publikationen" className="transition-colors hover:text-[#b6e57a]">{slide.titel}</a>
                </h2>
                <p className="ld-serif mt-2 max-w-[46ch] text-[0.98rem] leading-[1.62] text-[#96a3c8]">{slide.text}</p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                {insights.map((s, idx) => (
                  <button
                    key={s.titel}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Perspektive ${idx + 1} von ${anzahl}: ${s.titel}`}
                    aria-current={idx === i ? "true" : undefined}
                    className="group flex items-center gap-3"
                  >
                    <span className={`ld-num text-[11px] font-semibold transition-colors ${idx === i ? "text-[#b6e57a]" : "text-[#5d6a94] group-hover:text-[#a7b4d6]"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="relative block h-[2px] w-14 overflow-hidden bg-white/15">
                      <span className={`absolute inset-y-0 left-0 bg-[#8dc63f] transition-all duration-500 ${idx === i ? "w-full" : "w-0"}`} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[300px] lg:min-h-[720px]">
          {insights.map((s, idx) => (
            <Visual key={s.titel} variant={s.variant} src={s.bild} priority={idx === 0} alt={s.titel} className={`absolute inset-0 transition-opacity duration-[900ms] ${idx === i ? "opacity-100" : "opacity-0"}`} />
          ))}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0b1233_0%,transparent_38%)]" />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Kompetenz-Matrix ══════════════════════════ */

function KompetenzMatrix() {
  return (
    <section id="branchen" className="border-b border-[#e7ecf5] bg-white px-6 py-[86px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Eyebrow>Kompetenzfelder</Eyebrow>
          <SectionTitle className="max-w-[22ch]">Branchen und Themen, in denen wir arbeiten.</SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">Branchen</h3>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {branchen.map((b) => (
                <li key={b} className="border-b border-[#edf1f7]">
                  <a href="#kontakt" className="group flex items-center justify-between py-3 text-[0.96rem] text-[#43507a] transition-colors hover:text-[#0b1233]">
                    {b}
                    <span aria-hidden className="text-[#a9bcd3] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">Themen</h3>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {themen.map((t) => (
                <li key={t}>
                  <a href="#leistungen" className="inline-block rounded-full border border-[#e7ecf5] bg-[#f7f9fc] px-4 py-2 text-[0.88rem] text-[#43507a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8dc63f] hover:bg-white hover:text-[#0b1233]">
                    {t}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[20px] border border-[#e7ecf5] bg-[#f7f9fc] p-7">
              <p className="ld-serif text-[1rem] leading-[1.72] text-[#43507a]">
                Sie finden Ihre Branche nicht? Das Framework ist bewusst branchenunabhängig
                aufgebaut – entscheidend ist die Struktur Ihrer Wertschöpfungskette, nicht das
                Etikett darüber.
              </p>
              <a href="#kontakt" className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#2f5bd7] transition-colors hover:text-[#0b1233]">
                Sprechen Sie uns an <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Bedarfs-Dialog ══════════════════════════ */

function BedarfsDialog() {
  const [schritt, setSchritt] = useState(0);
  const [branche, setBranche] = useState<string | null>(null);
  const [thema, setThema] = useState<string | null>(null);
  const fertig = schritt === 2;

  return (
    <section className="bg-[#f7f9fc] px-6 py-[110px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-stretch overflow-hidden rounded-[26px] border border-[#e7ecf5] bg-white shadow-[0_24px_60px_rgba(11,18,51,0.07)] lg:grid-cols-[0.85fr_1.15fr]">
          <Visual variant="stack" alt="Die vier Ebenen des Ladouz-Frameworks" className="min-h-[280px]" />

          <div className="p-9 sm:p-12">
            <Reveal>
              <Eyebrow>Orientierung in zwei Schritten</Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(1.65rem,2.9vw,2.3rem)] font-bold leading-[1.12] tracking-[-0.028em]">
                Wir zeigen Ihnen, wo Ihr System Leistung verliert.
              </h2>
            </Reveal>

            <div className="mt-8 flex items-center gap-3" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={Math.min(schritt + 1, 2)} aria-label="Fortschritt">
              {[0, 1, 2].map((s) => (
                <span key={s} aria-hidden className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${s <= schritt ? "bg-[#8dc63f]" : "bg-[#e8eef5]"}`} />
              ))}
            </div>

            <div aria-live="polite">
              {!fertig ? (
                <div className="mt-8">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#a9bcd3]">Frage {schritt + 1} von 2</p>
                  <h3 className="mt-2 text-[1.2rem] font-semibold tracking-[-0.018em] text-[#131f5c]">
                    {schritt === 0 ? "In welcher Branche sind Sie tätig?" : "Welches Thema beschäftigt Sie aktuell?"}
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {(schritt === 0 ? branchen.slice(0, 8) : themen.slice(0, 8)).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { if (schritt === 0) { setBranche(opt); setSchritt(1); } else { setThema(opt); setSchritt(2); } }}
                        className="rounded-full border border-[#e7ecf5] bg-[#f7f9fc] px-4 py-2 text-[0.89rem] text-[#43507a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2f5bd7] hover:text-[#0b1233]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {schritt === 1 && (
                    <button type="button" onClick={() => setSchritt(0)} className="mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#43507a] transition-colors hover:text-[#0b1233]">
                      ← Zurück
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-8">
                  <div className="rounded-[20px] border border-[#e7ecf5] bg-[#f7f9fc] p-7">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#2f5bd7]">Ihre Auswahl</p>
                    <p className="mt-3 text-[1.15rem] font-semibold leading-snug tracking-[-0.018em] text-[#131f5c]">{branche} · {thema}</p>
                    <p className="ld-serif mt-4 text-[1rem] leading-[1.72] text-[#43507a]">
                      In der Erstberatung analysieren wir genau diese Kombination: wo in Ihrer
                      Wertschöpfungskette das Thema entsteht, welche Ebene des Frameworks es
                      betrifft und was der erste belastbare Schritt ist.
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <CtaButton href={BOOKING_URL}>Termin vereinbaren</CtaButton>
                    <button type="button" onClick={() => { setSchritt(0); setBranche(null); setThema(null); }} className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#43507a] transition-colors hover:text-[#0b1233]">
                      Auswahl ändern
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Referenzen ══════════════════════════ */

function Referenzen() {
  const [aktiv, setAktiv] = useState(0);
  const r = referenzen[aktiv];

  return (
    <section id="referenzen" className="bg-white px-6 py-[118px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Eyebrow>Anwendungsszenarien</Eyebrow>
          <SectionTitle className="max-w-[18ch]">Wie das Framework in der Praxis greift.</SectionTitle>
          <Lead>
            Drei typische Ausgangslagen und der Weg, den wir mit ihnen gehen. Sobald die ersten
            Mandate abgeschlossen sind, treten hier dokumentierte Ergebnisse an ihre Stelle.
          </Lead>
        </Reveal>

        <div className="mt-14 grid items-stretch overflow-hidden rounded-[26px] border border-[#e7ecf5] shadow-[0_24px_60px_rgba(11,18,51,0.07)] lg:grid-cols-2">
          <div className="relative min-h-[320px]">
            {referenzen.map((x, i) => (
              <Visual key={x.titel} variant={x.variant} src={x.bild} alt={x.titel} className={`absolute inset-0 transition-opacity duration-700 ${i === aktiv ? "opacity-100" : "opacity-0"}`} />
            ))}
          </div>

          <div className="bg-white p-9 sm:p-12" aria-live="polite">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#2f5bd7]">{r.kicker}</p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.5vw,2.05rem)] font-bold leading-[1.14] tracking-[-0.028em] text-[#131f5c]">{r.titel}</h3>
            <p className="ld-serif mt-5 text-[1.06rem] leading-[1.72] text-[#43507a]">{r.text}</p>

            <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#e7ecf5] bg-[#f7f9fc] px-4 py-2">
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#43507a]">{r.methode}</span>
            </p>

            <div className="mt-10 flex items-center gap-3">
              {referenzen.map((x, i) => (
                <button
                  key={x.titel}
                  type="button"
                  onClick={() => setAktiv(i)}
                  aria-label={`Szenario ${i + 1}: ${x.titel}`}
                  aria-current={i === aktiv ? "true" : undefined}
                  className={`h-[3px] w-12 transition-colors duration-300 ${i === aktiv ? "bg-[#8dc63f]" : "bg-[#e8eef5] hover:bg-[#a9bcd3]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Leistungen ══════════════════════════ */

function Leistungen() {
  return (
    <section id="leistungen" className="bg-[#f7f9fc] px-6 py-[118px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Eyebrow>Leistungen</Eyebrow>
          <SectionTitle className="max-w-[16ch]">Drei Disziplinen. Ein System.</SectionTitle>
          <Lead>
            Wir verbinden Strategie, KI und Marketing nicht als Einzelleistungen, sondern als
            integrierte Architektur – damit jede Maßnahme auf dasselbe Ziel einzahlt.
          </Lead>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {leistungen.map((l, i) => (
            <Reveal key={l.titel} delay={i * 110}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e7ecf5] bg-white p-8 shadow-[0_16px_42px_rgba(11,18,51,0.06)] transition-all duration-[380ms] hover:-translate-y-2 hover:border-[#d6dfee] hover:shadow-[0_28px_64px_rgba(11,18,51,0.12)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#2f5bd7,#8dc63f)] transition-transform duration-[380ms] group-hover:scale-x-100" />
                <span className="ld-num text-[12px] font-semibold uppercase tracking-[0.22em] text-[#a9bcd3]">{l.nr}</span>
                <h3 className="mt-4 text-[1.22rem] font-bold leading-snug tracking-[-0.022em] text-[#131f5c]">{l.titel}</h3>
                <p className="ld-serif mt-3.5 flex-1 text-[1rem] leading-[1.7] text-[#43507a]">{l.text}</p>
                <ul className="mt-6 space-y-2 border-t border-[#edf1f7] pt-5">
                  {l.punkte.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[0.88rem] text-[#43507a]">
                      <span aria-hidden className="block h-1.5 w-1.5 flex-none rounded-full bg-[#8dc63f]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Framework ══════════════════════════ */

function FrameworkSektion() {
  return (
    <section id="framework" className="bg-white px-6 py-[118px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <Eyebrow>Das Ladouz-Framework</Eyebrow>
          <SectionTitle className="max-w-[20ch]">Vom Zielbild zur skalierenden Maschine.</SectionTitle>
          <Lead>
            Jedes Projekt durchläuft dieselbe bewährte Architektur. Das macht unsere Arbeit
            planbar, unsere Qualität konstant – und Ihre Ergebnisse reproduzierbar.
          </Lead>
        </Reveal>

        <div className="relative mt-16">
          <span aria-hidden className="absolute left-0 right-0 top-[26px] hidden border-t-2 border-dashed border-[#d9e2f0] lg:block" />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {framework.map((s, i) => (
              <Reveal key={s.nr} delay={i * 110}>
                <li className="flex h-full flex-col rounded-[20px] border border-[#e7ecf5] bg-white p-7 shadow-[0_16px_42px_rgba(11,18,51,0.05)] transition-all duration-[380ms] hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(11,18,51,0.1)]">
                  <span aria-hidden className="ld-num flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#2f5bd7,#4b7ce8)] text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(47,91,215,0.38)]">
                    {s.nr}
                  </span>
                  <h3 className="mt-5 text-[1.1rem] font-bold tracking-[-0.022em] text-[#131f5c]">{s.titel}</h3>
                  <p className="ld-serif mt-2.5 flex-1 text-[0.95rem] leading-[1.68] text-[#43507a]">{s.text}</p>
                  <span className="mt-5 inline-block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#6da62f]">{s.label}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ System ══════════════════════════ */

function SystemSektion() {
  return (
    <section id="system" className="relative overflow-hidden bg-[#0b1233] px-6 py-[118px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(47,91,215,.38), transparent 65%), radial-gradient(ellipse 50% 45% at 8% 90%, rgba(141,198,63,.13), transparent 60%)" }} />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Eyebrow tone="light">Digitale Systemservices</Eyebrow>
            <SectionTitle tone="light" className="max-w-[18ch]">Die Infrastruktur hinter Ihrem Erfolg.</SectionTitle>
            <Lead tone="light">
              Wir verbinden Technologie, Prozesse und Menschen zu leistungsfähigen digitalen
              Systemlandschaften. Unser Qualitätsmanagement stellt sicher, dass auch bei hoher
              Ausbringung konstante Standards eingehalten werden.
            </Lead>
          </Reveal>

          <ol className="mt-10 space-y-3">
            {ebenen.map((e, i) => (
              <Reveal key={e.titel} delay={i * 90}>
                <li className="flex items-center gap-5 rounded-[13px] border border-white/10 bg-white/[0.05] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8dc63f]/40 hover:bg-white/[0.08]">
                  <span className="w-[68px] flex-none text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8dc63f]">{e.stufe}</span>
                  <span aria-hidden className="h-8 w-px flex-none bg-white/12" />
                  <span>
                    <span className="block text-[15px] font-semibold tracking-[-0.012em] text-white">{e.titel}</span>
                    <span className="block text-[12.5px] text-[#96a3c8]">{e.sub}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {kennzahlen.map((k, i) => (
            <Reveal key={k.label} delay={i * 100}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.05] p-7 transition-all duration-[380ms] hover:-translate-y-2 hover:border-[#8dc63f]/45 hover:bg-white/[0.08]">
                <Counter ziel={k.wert} suffix={k.suffix} />
                <div className="mt-3.5 text-[0.92rem] font-semibold tracking-[-0.012em] text-[#dfe7f8]">{k.label}</div>
                <div className="mt-1 text-[0.8rem] leading-relaxed text-[#8695bd]">{k.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Leitbild ══════════════════════════ */

function Leitbild() {
  return (
    <section id="leitbild" className="bg-white px-6 py-[118px]">
      <div className="mx-auto grid max-w-[1240px] items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-[120px]">
          <Reveal>
            <Eyebrow>Unser Leitbild</Eyebrow>
            <SectionTitle className="max-w-[14ch]">Grundsätze, nach denen wir handeln.</SectionTitle>
            <Lead>
              Produktivität und Qualität sind für uns keine Gegensätze, sondern zwei Seiten
              derselben Medaille. Erst im Zusammenspiel beider Faktoren entsteht echter Mehrwert.
            </Lead>
          </Reveal>

          <Reveal delay={150}>
            <figure className="relative mt-9 overflow-hidden rounded-[20px] bg-[linear-gradient(118deg,#131f5c,#2f5bd7)] p-9 text-white shadow-[0_28px_66px_rgba(16,26,78,0.38)]">
              <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-[210px] w-[210px] rounded-full" style={{ background: "radial-gradient(circle, rgba(141,198,63,.38), transparent 70%)" }} />
              <blockquote className="ld-serif relative text-[1.32rem] font-normal leading-[1.52]">
                »Konsequent methodisches Vorgehen reduziert Fehler, Nacharbeit und
                Reibungsverluste – und steigert so die <em className="not-italic text-[#b6e57a]">Produktivität</em> unserer
                Kunden und unserer eigenen Organisation.«
              </blockquote>
              <figcaption className="relative mt-7 flex items-center gap-4">
                <Image src="/nizar-portrait.webp" alt="" aria-hidden width={216} height={216} className="h-[72px] w-[72px] flex-none rounded-full border-[1.5px] border-white/40 object-cover" />
                <span>
                  <span className="block text-[0.97rem] font-semibold tracking-[-0.012em] text-white">Nizar Ladouz</span>
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#b9c9ee]">Inhaber</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="space-y-5">
          {werte.map((w, i) => (
            <Reveal key={w.nr} delay={i * 100}>
              <li className="group flex gap-6 rounded-[20px] border border-[#e7ecf5] bg-white p-7 shadow-[0_14px_36px_rgba(11,18,51,0.05)] transition-all duration-[380ms] hover:-translate-y-1.5 hover:border-[#d6dfee] hover:shadow-[0_26px_58px_rgba(11,18,51,0.1)]">
                <span aria-hidden className="ld-num flex h-11 w-11 flex-none items-center justify-center rounded-[13px] bg-[#e8eef5] text-[13px] font-bold text-[#2f5bd7] transition-colors duration-300 group-hover:bg-[#2f5bd7] group-hover:text-white">
                  {w.nr}
                </span>
                <div>
                  <h3 className="text-[1.08rem] font-bold tracking-[-0.022em] text-[#131f5c]">{w.titel}</h3>
                  <p className="ld-serif mt-2 text-[0.98rem] leading-[1.7] text-[#43507a]">{w.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ══════════════════════════ Publikationen ══════════════════════════ */

function Publikationen() {
  return (
    <section id="publikationen" className="bg-[#f7f9fc] px-6 py-[118px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>Publikationen</Eyebrow>
              <SectionTitle className="max-w-[18ch]">Unsere Perspektive auf Digitalisierung.</SectionTitle>
            </div>
            <a href="#newsletter" className="inline-flex items-center gap-2 border-b-2 border-[#8dc63f] pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#131f5c] transition-colors hover:text-[#2f5bd7]">
              Bei Erscheinen benachrichtigen <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>

        <ol className="mt-14 divide-y divide-[#e2e8f3] border-y border-[#e2e8f3]">
          {publikationen.map((p, i) => (
            <Reveal key={p.titel} delay={i * 90}>
              <li>
                <article className="grid items-center gap-8 py-9 md:grid-cols-[0.42fr_1fr]">
                  <Visual variant={p.variant} alt={p.titel} className="aspect-[16/10] rounded-[16px]" />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#2f5bd7]">{p.kat}</span>
                      <span className="rounded-full bg-[#e8eef5] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#43507a]">{p.format}</span>
                    </div>
                    <h3 className="mt-3 text-[clamp(1.25rem,2.2vw,1.7rem)] font-bold leading-[1.2] tracking-[-0.028em] text-[#131f5c]">{p.titel}</h3>
                    <p className="ld-serif mt-3 max-w-[66ch] text-[1.02rem] leading-[1.7] text-[#43507a]">{p.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-[#a9bcd3] px-3.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#43507a]">
                      In Vorbereitung
                    </span>
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ══════════════════════════ Split-CTA ══════════════════════════ */

function SplitCta() {
  const felder = [
    { titel: "Was können Sie mit uns erreichen?", cta: "Gehen wir an die Arbeit", href: BOOKING_URL, variant: "orbit" as const },
    { titel: "Wohin entwickelt sich Ihr System?", cta: "Framework ansehen", href: "#framework", variant: "stack" as const },
  ];

  return (
    <section aria-label="Weiterführende Wege" className="grid md:grid-cols-2">
      {felder.map((f) => (
        <a key={f.titel} href={f.href} {...(f.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="group relative flex min-h-[340px] items-end overflow-hidden p-10 sm:p-14">
          <Visual variant={f.variant} alt="" className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-105" />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,18,51,.88)_0%,rgba(11,18,51,.35)_70%)]" />
          <span className="relative">
            <span className="block max-w-[16ch] text-[clamp(1.55rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">{f.titel}</span>
            <span className="mt-6 inline-flex items-center gap-2.5 border-b-2 border-[#8dc63f] pb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white">
              {f.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </span>
        </a>
      ))}
    </section>
  );
}

/* ══════════════════════════ Newsletter ══════════════════════════ */

function Newsletter() {
  const [mail, setMail] = useState("");
  const [ok, setOk] = useState(false);
  const [gesendet, setGesendet] = useState(false);
  const gueltig = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail);

  return (
    <section id="newsletter" className="bg-white px-6 py-[100px]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 rounded-[26px] border border-[#e7ecf5] bg-[#f7f9fc] p-9 sm:p-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow>Ladouz Insights</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.55rem,2.7vw,2.2rem)] font-bold leading-[1.14] tracking-[-0.03em]">
            Unsere Perspektive auf digitale Systeme – einmal im Monat in Ihrem Postfach.
          </h2>
        </div>

        <div aria-live="polite">
          {gesendet ? (
            <p className="ld-serif rounded-[20px] border border-[#8dc63f]/40 bg-white p-7 text-[1rem] leading-[1.72] text-[#43507a]">
              Vielen Dank. Bitte bestätigen Sie die Anmeldung über den Link, den wir Ihnen soeben
              geschickt haben.
            </p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (gueltig && ok) setGesendet(true); }} className="rounded-[20px] border border-[#e7ecf5] bg-white p-7">
              <label htmlFor="nl-mail" className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#43507a]">Ihre E-Mail-Adresse</label>
              <input id="nl-mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="name@unternehmen.de" className="mt-3 w-full rounded-[13px] border border-[#e7ecf5] bg-[#f7f9fc] px-4 py-3.5 text-[1rem] outline-none transition-all duration-300 placeholder:text-[#a9bcd3] focus:border-[#8dc63f] focus:bg-white focus:ring-4 focus:ring-[#8dc63f]/12" />

              <label className="ld-serif mt-5 flex cursor-pointer items-start gap-3 text-[0.88rem] leading-[1.6] text-[#43507a]">
                <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-[#8dc63f]" />
                <span>Ich habe die <a href="/datenschutz" className="underline underline-offset-2 hover:text-[#0b1233]">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Angaben zu.</span>
              </label>

              <CtaButton submit disabled={!gueltig || !ok} className="mt-6 w-full">Anmelden</CtaButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Kontakt ══════════════════════════ */

type Status = "idle" | "sending" | "success" | "error";

function Kontakt() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firma, setFirma] = useState(""); // Honeypot – für Menschen unsichtbar
  const [status, setStatus] = useState<Status>("idle");
  const [fehler, setFehler] = useState("");

  const bereit = name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bereit || status === "sending") return;
    setStatus("sending"); setFehler("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), firma }),
      });
      if (!res.ok) throw new Error();
      setStatus("success"); setName(""); setEmail("");
    } catch {
      setStatus("error");
      setFehler(`Das hat nicht geklappt. Schreiben Sie uns gerne direkt an ${MAIL}.`);
    }
  }

  return (
    <section id="kontakt" className="bg-[#f7f9fc] px-6 py-[118px]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(118deg,#131f5c_0%,#2f5bd7_100%)] px-8 py-14 text-white shadow-[0_34px_80px_rgba(16,26,78,0.4)] sm:px-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
            <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-[320px] w-[320px] rounded-full" style={{ background: "radial-gradient(circle, rgba(141,198,63,.3), transparent 70%)" }} />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <Eyebrow tone="light">Erstberatung</Eyebrow>
                <h2 className="mt-5 max-w-[15ch] text-[clamp(2.05rem,3.9vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                  Bereit für Ihr Framework?
                </h2>
                <p className="ld-serif mt-6 max-w-[50ch] text-[1.12rem] leading-[1.7] text-[#c7d6f5]">
                  In einer unverbindlichen Erstberatung analysieren wir Ihre Ausgangslage und
                  zeigen, wie eine systematische digitale Architektur für Ihr Unternehmen aussieht.
                </p>
                <div className="mt-9"><CtaButton href={BOOKING_URL}>Termin direkt wählen</CtaButton></div>

                <dl className="mt-10 grid gap-5 border-t border-white/15 pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#9db3de]">Anschrift</dt>
                    <dd className="mt-1.5 text-[0.95rem] text-[#dfe7f8]">Markt 40<br />53721 Siegburg</dd>
                  </div>
                  <div>
                    <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#9db3de]">Kontakt</dt>
                    <dd className="mt-1.5 text-[0.95rem] text-[#dfe7f8]">
                      <a href="tel:+4915770206552" className="hover:text-white">{TEL}</a><br />
                      <a href={`mailto:${MAIL}`} className="hover:text-white">{MAIL}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[22px] border border-white/15 bg-white/[0.08] p-8 backdrop-blur-xl">
                <div aria-live="polite">
                  {status === "success" ? (
                    <div className="py-4 text-center">
                      <div aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8dc63f]/20 text-2xl text-[#b6e57a] ring-1 ring-inset ring-[#8dc63f]/40">✓</div>
                      <h3 className="mt-5 text-[1.22rem] font-bold tracking-[-0.022em] text-white">Vielen Dank.</h3>
                      <p className="ld-serif mt-2.5 text-[0.98rem] leading-[1.66] text-[#c7d6f5]">
                        Ihre Anfrage ist angekommen. Sie hören innerhalb von 48 Stunden von uns.
                      </p>
                      <button onClick={() => setStatus("idle")} className="mt-6 text-[0.86rem] font-medium text-[#b6e57a] underline underline-offset-4">
                        Weitere Anfrage senden
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} noValidate>
                      <h3 className="text-[1.15rem] font-bold tracking-[-0.022em] text-white">Oder kurz schreiben</h3>
                      <p className="ld-serif mt-1.5 text-[0.92rem] text-[#a7b4d6]">Zwei Angaben genügen. Wir melden uns persönlich.</p>

                      <div className="mt-7 space-y-5">
                        <Feld id="name" label="Name" type="text" value={name} placeholder="Vor- und Nachname" autoComplete="name" onChange={setName} />
                        <Feld id="email" label="E-Mail" type="email" value={email} placeholder="name@unternehmen.de" autoComplete="email" onChange={setEmail} />
                      </div>

                      {/* Honeypot: Bots füllen das Feld aus, Menschen sehen es nie */}
                      <div aria-hidden className="ld-hp">
                        <label htmlFor="firma">Firma (bitte frei lassen)</label>
                        <input id="firma" name="firma" type="text" tabIndex={-1} autoComplete="off" value={firma} onChange={(e) => setFirma(e.target.value)} />
                      </div>

                      <CtaButton submit disabled={!bereit || status === "sending"} className="mt-8 w-full">
                        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
                      </CtaButton>

                      {status === "error" && <p role="alert" className="mt-4 text-[0.88rem] leading-relaxed text-[#ffb3a3]">{fehler}</p>}

                      <p className="ld-serif mt-5 text-[0.8rem] leading-[1.6] text-[#8695bd]">
                        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung
                        der Anfrage zu. Details in der{" "}
                        <a href="/datenschutz" className="underline underline-offset-2 hover:text-white">Datenschutzerklärung</a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>
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
      <label htmlFor={id} className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#a7b4d6]">{label}</label>
      <input
        id={id} name={id} type={type} required value={value} placeholder={placeholder} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[13px] border border-white/15 bg-white/[0.07] px-4 py-3.5 text-[1rem] text-white outline-none transition-all duration-300 placeholder:text-[#7a86ab] focus:border-[#8dc63f] focus:bg-white/[0.11] focus:ring-4 focus:ring-[#8dc63f]/15"
      />
    </div>
  );
}

/* ══════════════════════════ Footer ══════════════════════════ */

function Footer() {
  const spalten: { titel: string; links: [string, string][] }[] = [
    { titel: "Leistungen", links: [["Digitale Strategie", "#leistungen"], ["KI-Implementierung", "#leistungen"], ["Online-Marketing", "#leistungen"], ["Systemservices", "#system"]] },
    { titel: "Unternehmen", links: [["Unser Framework", "#framework"], ["Leitbild & Werte", "#leitbild"], ["Anwendungsszenarien", "#referenzen"], ["Publikationen", "#publikationen"]] },
    { titel: "Rechtliches", links: [["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"], ["Kontakt", "#kontakt"]] },
  ];

  return (
    <footer className="bg-[#0b1233] px-6 pt-[86px] text-[#8fa0c6]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo-white.png" alt="ladouz.digital" width={560} height={280} className="h-[38px] w-auto" />
            <p className="ld-serif mt-6 max-w-[300px] text-[0.92rem] leading-[1.7]">
              Frameworks für digitale &amp; KI-Strategien. Produktivität durch Qualität.
              Qualität durch System. Erfolg durch Menschen und Strategien.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener" className="flex h-9 items-center rounded-full border border-white/15 px-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#8dc63f] hover:text-white">
                  {name}
                </a>
              ))}
            </div>
          </div>

          {spalten.map((col) => (
            <nav key={col.titel} aria-label={col.titel}>
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white">{col.titel}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-[0.92rem] transition-colors hover:text-white">{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-8">
          <span className="text-[0.78rem] leading-relaxed text-[#6b7896]">
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

    /* Anker-Ziele unter den fixierten Kopfbereich schieben */
    [id] { scroll-margin-top: 118px; }

    /* ── Typografie ───────────────────────────────────────────
       Jost: Headlines, UI, Zahlen. Source Serif 4: Lesetexte.
       Jost hat eine kleine x-Höhe – daher grössere Grundgrösse,
       offene Zeilen, eng getrackte Headlines.
       ─────────────────────────────────────────────────────── */
    body, input, textarea, select, button {
      font-family: var(--font-jost, 'Jost'), system-ui, -apple-system, sans-serif;
      font-feature-settings: "kern" 1, "liga" 1;
    }
    body { font-size: 17px; letter-spacing: .004em; }

    .ld-serif {
      font-family: var(--font-serif, 'Source Serif 4'), Georgia, 'Times New Roman', serif;
      letter-spacing: 0;
    }
    .ld-num { font-variant-numeric: tabular-nums lining-nums; }

    h1, h2, h3 { text-wrap: balance; }
    p { text-wrap: pretty; }

    /* Honeypot – unsichtbar, aber nicht display:none (Bots prüfen das) */
    .ld-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

    .ld-skip {
      position: absolute; left: -9999px; top: 0; z-index: 999;
      background: #8dc63f; color: #0b1233; padding: 12px 20px;
      font-weight: 600; border-radius: 0 0 11px 0;
    }
    .ld-skip:focus { left: 0; }

    .ld-reveal {
      opacity: 0; transform: translateY(36px);
      transition: opacity .85s cubic-bezier(.16,.84,.28,1), transform .85s cubic-bezier(.16,.84,.28,1);
      will-change: opacity, transform;
    }
    .ld-reveal.is-visible { opacity: 1; transform: none; }

    /* Mega-Menü über grid-template-rows: kein Abschneiden bei langen Spalten */
    .ld-mega {
      grid-template-rows: 0fr; opacity: 0; pointer-events: none;
      transition: grid-template-rows .42s cubic-bezier(.16,.84,.28,1), opacity .3s;
    }
    .ld-mega.is-open { grid-template-rows: 1fr; opacity: 1; pointer-events: auto; }

    .ld-btn .ld-sweep {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%);
      transform: translateX(-120%);
      transition: transform .75s cubic-bezier(.16,.84,.28,1);
    }
    .ld-btn:hover .ld-sweep { transform: translateX(120%); }

    .ld-pulse { animation: ldPulse 2.2s ease-in-out infinite; }
    @keyframes ldPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.75); } }

    .ld-navlink { position: relative; padding-block: 6px; background: none; border: 0; cursor: pointer; }
    .ld-navlink::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
      background: #8dc63f; transform: scaleX(0); transform-origin: 0 50%;
      transition: transform .28s cubic-bezier(.16,.84,.28,1);
    }
    .ld-navlink:hover::after, .ld-navlink:focus-visible::after { transform: scaleX(1); }

    .ld-kenburns {
      animation: ldZoom 26s ease-in-out infinite alternate;
      transform-origin: 58% 42%; will-change: transform;
    }
    @keyframes ldZoom { from { transform: scale(1); } to { transform: scale(1.13); } }

    :focus-visible { outline: 2px solid #8dc63f; outline-offset: 3px; border-radius: 2px; }

    @media (prefers-contrast: more) {
      .ld-reveal { opacity: 1; transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .ld-reveal { opacity: 1; transform: none; transition: none; }
      .ld-btn .ld-sweep { display: none; }
      .ld-pulse, .ld-kenburns { animation: none; }
      .ld-mega { transition: none; }
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
