"use client";

/* ═══════════════════════════════════════════════════════════════
   ladouz.digital – Landingpage
   Next.js (App Router) · TypeScript · Tailwind CSS

   Design-System "Ladouz Blueprint":
   Navy #131f5c · Blau #2f5bd7 · Silber #a9bcd3 · Grün #8dc63f (nur Aktion)
   Headlines Raleway 700/800 · Fließtext DM Sans · UI/Zahlen Jost

   Assets nach /public legen:
     /logo-white.png   /logo-navy.png   /nizar-portrait.webp
   ═══════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";

const BOOKING_URL = "https://zeeg.me/management75/erstberatung";

/* ─────────────────────────── Inhalte ─────────────────────────── */

const navLinks = [
  ["Leistungen", "#leistungen"],
  ["Framework", "#framework"],
  ["System", "#system"],
  ["Leitbild", "#leitbild"],
  ["Insights", "#insights"],
] as const;

const heroChips = ["Systemisch statt isoliert", "Qualität als Standard", "Messbar & skalierbar"];

const tools = [
  "Google Ads", "Google Analytics", "Meta", "Instagram", "YouTube", "TikTok", "LinkedIn",
  "Shopify", "WordPress", "HubSpot", "Klaviyo", "OpenAI", "Anthropic", "Gemini",
  "Perplexity", "n8n", "Zapier", "Make", "Notion", "Slack", "Stripe", "Semrush",
];

const leistungen = [
  {
    titel: "Digitale Unternehmensstrategie",
    text: "Wir entwickeln die strategische Architektur Ihres digitalen Geschäfts: Zielbild, Roadmap und Steuerungslogik – als belastbares Framework statt loser Maßnahmen.",
    punkte: ["Zielbild & Roadmap", "Steuerungslogik", "Kennzahlen-Modell"],
  },
  {
    titel: "KI-Implementierung",
    text: "Von der Potenzialanalyse bis zum produktiven System: Wir integrieren KI dort, wo sie messbaren Nutzen stiftet – eingebettet in klare Prozesse und Verantwortlichkeiten.",
    punkte: ["Potenzialanalyse", "Prozess-Automatisierung", "Betrieb & Governance"],
  },
  {
    titel: "Online-Marketing",
    text: "Performance-Marketing mit Systemanspruch: transparente Kennzahlen, kontinuierliche Optimierung und Kampagnen, die auf Ihre Gesamtstrategie einzahlen.",
    punkte: ["Paid & Organic", "Tracking-Architektur", "Laufende Optimierung"],
  },
];

const framework = [
  { nr: "01", titel: "Analyse", text: "Wir erfassen Ihre Wertschöpfungskette als Ganzes: Status quo, Potenziale, Engpässe und die relevanten Kennzahlen.", label: "Verstehen" },
  { nr: "02", titel: "Architektur", text: "Wir entwerfen das Framework: Strategie, Systeme und Prozesse werden zu einer klaren, dokumentierten Struktur verbunden.", label: "Strukturieren" },
  { nr: "03", titel: "Implementierung", text: "Wir setzen präzise um – KI-Systeme, Automatisierungen und Marketing-Motoren gehen kontrolliert in den Betrieb.", label: "Umsetzen" },
  { nr: "04", titel: "Skalierung", text: "Wir messen, lernen und optimieren kontinuierlich. Stillstand ist Rückschritt – Ihr System entwickelt sich permanent weiter.", label: "Wachsen" },
];

const ebenen = [
  { titel: "Strategie-Framework", sub: "Zielbild, Roadmap, Steuerung", stufe: "Ebene 01" },
  { titel: "Prozess- & KI-Systeme", sub: "Automatisierung, Integration", stufe: "Ebene 02" },
  { titel: "Marketing-Execution", sub: "Kampagnen, Content, Performance", stufe: "Ebene 03" },
  { titel: "Messung & Optimierung", sub: "Kennzahlen, Reporting, Iteration", stufe: "Ebene 04" },
];

const kennzahlen = [
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

const insights = [
  { kat: "Strategie", titel: "Digitale Strategie als Architektur", text: "Warum erfolgreiche Digitalisierung mit einem Framework beginnt – und nicht mit Tools." },
  { kat: "Künstliche Intelligenz", titel: "KI im Mittelstand richtig einführen", text: "Vom Pilotprojekt zum produktiven System: die Phasen einer tragfähigen KI-Implementierung." },
  { kat: "Marketing", titel: "Marketing mit Systemanspruch", text: "Wie transparente Kennzahlen und Frameworks aus Kampagnen planbares Wachstum machen." },
];

/* ═════════════════════════ Hooks ═════════════════════════ */

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

/** Reveal-on-Scroll: gibt ref + sichtbar zurück. Ohne JS bleibt alles sichtbar. */
function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, scrolled };
}

/* ═════════════════════════ Bausteine ═════════════════════════ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`ld-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-3">
      <span className="block h-[2px] w-7 flex-none bg-[#8dc63f]" />
      <span
        className={`font-head text-[0.7rem] font-bold uppercase tracking-[0.26em] ${
          tone === "light" ? "text-[#9fc65f]" : "text-[#2f5bd7]"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

function SectionTitle({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <h2
      className={`font-head mt-4 text-[clamp(1.95rem,3.7vw,2.95rem)] font-extrabold leading-[1.1] tracking-[-0.015em] ${
        tone === "light" ? "text-white" : "text-[#0b1233]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

function Lead({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={`mt-5 max-w-[62ch] text-[1.03rem] leading-[1.72] ${tone === "light" ? "text-[#a7b4d6]" : "text-[#43507a]"}`}>
      {children}
    </p>
  );
}

function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "ld-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-[11px] px-7 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-[#8dc63f] text-[#0b1233] shadow-[0_10px_26px_rgba(141,198,63,0.38)] hover:shadow-[0_14px_32px_rgba(141,198,63,0.5)]"
      : "border-[1.5px] border-white/55 text-white hover:border-white hover:bg-white/10";

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
      {variant === "primary" && <span aria-hidden className="ld-sweep" />}
    </a>
  );
}

/* ═════════════════════════ Hero-Canvas ═════════════════════════ */

function DotWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number; ph: number }[] = [];
    let raf = 0;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      dots = [];
      const gap = 34 * dpr;
      for (let x = 0; x < width + gap; x += gap) {
        for (let y = 0; y < height + gap; y += gap) {
          dots.push({ x, y, ph: x * 0.006 + y * 0.004 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.016;
      const cx = width * 0.78;
      const cy = height * 0.25;

      for (const d of dots) {
        const w = Math.sin(t * 1.1 + d.ph) * 0.5 + 0.5;
        const r = (0.6 + w * 1.7) * dpr;
        const dist = Math.hypot(d.x - cx, d.y - cy) / (width * 0.7);
        const a = Math.max(0, 1 - dist) * (0.08 + w * 0.22);
        if (a < 0.015) continue;
        ctx.beginPath();
        ctx.arc(d.x, d.y + Math.sin(t + d.ph) * 3 * dpr, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/* ═════════════════════════ Counter ═════════════════════════ */

function Counter({ ziel, suffix }: { ziel: number | null; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  const [wert, setWert] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || ziel === null) return;
    if (reduced) {
      setWert(ziel);
      return;
    }
    const dauer = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dauer, 1);
      setWert(Math.round(ziel * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, ziel, reduced]);

  return (
    <span ref={ref} className="font-display bg-[linear-gradient(92deg,#b6e57a,#7ea3f0)] bg-clip-text text-[2.5rem] font-extrabold leading-none text-transparent">
      {ziel === null ? suffix : `${wert}${suffix}`}
    </span>
  );
}

/* ═════════════════════════ Seite ═════════════════════════ */

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#f7f9fc] font-body text-[#0b1233] antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]">
        <Navigation />
        <main>
          <Hero />
          <ToolsMarquee />
          <Leistungen />
          <SystemSektion />
          <FrameworkSektion />
          <Leitbild />
          <Insights />
          <KontaktSektion />
        </main>
        <Footer />
      </div>
    </>
  );
}

/* ═════════════════════════ Navigation ═════════════════════════ */

function Navigation() {
  const { progress, scrolled } = useScrollState();
  const [offen, setOffen] = useState(false);

  const close = useCallback(() => setOffen(false), []);

  return (
    <>
      {/* Scroll-Fortschritt */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
        <div
          className="h-full bg-[linear-gradient(90deg,#8dc63f,#2f5bd7)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled || offen
            ? "border-b border-[#e7ecf5] bg-white/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-6 px-6">
          <a href="#top" aria-label="ladouz.digital Startseite" className="relative block h-[34px] w-[68px] flex-none">
            <Image
              src="/logo-white.png"
              alt="ladouz.digital"
              fill
              priority
              sizes="68px"
              className={`object-contain object-left transition-opacity duration-300 ${scrolled || offen ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/logo-navy.png"
              alt=""
              aria-hidden
              fill
              sizes="68px"
              className={`object-contain object-left transition-opacity duration-300 ${scrolled || offen ? "opacity-100" : "opacity-0"}`}
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`ld-navlink font-display text-[14.5px] font-medium transition-colors ${
                  scrolled ? "text-[#43507a] hover:text-[#0b1233]" : "text-[#dfe7f8] hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="ld-btn group relative hidden overflow-hidden rounded-[11px] bg-[#8dc63f] px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0b1233] shadow-[0_8px_20px_rgba(141,198,63,0.35)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              <span className="relative z-10">Erstberatung</span>
              <span aria-hidden className="ld-sweep" />
            </a>

            <button
              type="button"
              onClick={() => setOffen((o) => !o)}
              aria-expanded={offen}
              aria-label={offen ? "Menü schließen" : "Menü öffnen"}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[11px] border transition-colors lg:hidden ${
                scrolled || offen ? "border-[#e7ecf5] text-[#0b1233]" : "border-white/40 text-white"
              }`}
            >
              <span className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${offen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-current transition-opacity duration-300 ${offen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${offen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile-Menü */}
        <div className={`overflow-hidden border-t border-[#e7ecf5] bg-white transition-[max-height] duration-300 lg:hidden ${offen ? "max-h-[420px]" : "max-h-0 border-transparent"}`}>
          <nav className="mx-auto flex max-w-[1180px] flex-col px-6 py-2">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="border-b border-[#edf1f7] py-3.5 font-display text-[15px] font-semibold text-[#0b1233] last:border-0"
              >
                {label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              onClick={close}
              className="my-4 rounded-[11px] bg-[#8dc63f] px-5 py-3.5 text-center font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#0b1233]"
            >
              Erstberatung buchen
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ═════════════════════════ Hero ═════════════════════════ */

function Hero() {
  const [balken, setBalken] = useState(0);
  const [prozent, setProzent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBalken(92), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (balken === 0) return;
    let v = 0;
    const iv = setInterval(() => {
      v += 2;
      setProzent(Math.min(v, 92));
      if (v >= 92) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, [balken]);

  return (
    <section id="top" className="relative overflow-hidden bg-[linear-gradient(118deg,#131f5c_0%,#2f5bd7_100%)] px-6 pb-[120px] pt-[168px] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <DotWave />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 45% at 84% 16%, rgba(141,198,63,.18), transparent 66%)" }}
      />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Eyebrow tone="light">Agentur für digitale Systemarchitektur</Eyebrow>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-head mt-5 text-[clamp(2.5rem,5.4vw,4.1rem)] font-extrabold leading-[1.04] tracking-[-0.022em]">
              Frameworks für{" "}
              <span className="bg-[linear-gradient(96deg,#b6e57a_0%,#ffffff_60%)] bg-clip-text text-transparent">
                digitale &amp;&nbsp;KI-Strategien
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-[54ch] text-[1.07rem] leading-[1.72] text-[#c7d6f5]">
              Die Infrastruktur hinter Ihrer digitalen Unternehmensstrategie, KI-Implementierung
              und Ihrem Online-Marketing. Systemisch gedacht, präzise gebaut, messbar skaliert.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaButton href={BOOKING_URL}>Erstberatung</CtaButton>
              <CtaButton href="#framework" variant="ghost">Unser Framework</CtaButton>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
              {heroChips.map((c) => (
                <li key={c} className="font-head flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#a7b4d6]">
                  <span className="ld-pulse block h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Glassmorphism-Panel */}
        <Reveal delay={200}>
          <div className="ld-float rounded-[26px] border border-white/15 bg-white/[0.07] p-8 shadow-[0_30px_70px_rgba(6,12,40,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-head text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#a7b4d6]">
                Strategie-Stack
              </span>
              <span className="font-head flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#b6e57a]">
                <span className="ld-pulse block h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                Framework aktiv
              </span>
            </div>

            <div className="mt-7 space-y-3">
              {[
                ["Digitale Strategie", "Architektur & Roadmap"],
                ["KI-Implementierung", "Systeme & Automatisierung"],
                ["Online-Marketing", "Performance & Wachstum"],
              ].map(([titel, sub], i) => (
                <div
                  key={titel}
                  className="group flex items-center gap-4 rounded-[13px] border border-white/10 bg-white/[0.05] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8dc63f]/45 hover:bg-white/[0.09]"
                >
                  <span className="font-display flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-[#8dc63f]/15 text-[12px] font-bold text-[#b6e57a] ring-1 ring-inset ring-[#8dc63f]/30">
                    {`0${i + 1}`}
                  </span>
                  <span>
                    <span className="font-display block text-[14.5px] font-semibold text-white">{titel}</span>
                    <span className="block text-[12.5px] text-[#96a3c8]">{sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-head flex justify-between text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#a7b4d6]">
                <span>Systemreife</span>
                <span className="font-display tabular-nums text-[#b6e57a]">{prozent}%</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/12">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#8dc63f,#4b7ce8)] transition-[width] duration-[1600ms] ease-out"
                  style={{ width: `${balken}%` }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════════ Tools-Marquee ═════════════════════════ */

function ToolsMarquee() {
  return (
    <section className="border-b border-[#e7ecf5] bg-white py-10">
      <p className="font-head mb-7 text-center text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#a9bcd3]">
        Wir arbeiten u. a. mit diesen Plattformen &amp; Tools
      </p>
      <div className="ld-marquee-mask relative overflow-hidden">
        <div className="ld-marquee flex w-max gap-12">
          {[...tools, ...tools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display whitespace-nowrap text-[15px] font-medium text-[#43507a]/70 transition-colors hover:text-[#2f5bd7]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Leistungen ═════════════════════════ */

function Leistungen() {
  return (
    <section id="leistungen" className="bg-white px-6 py-[118px]">
      <div className="mx-auto max-w-[1180px]">
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
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#2f5bd7,#8dc63f)] transition-transform duration-[380ms] group-hover:scale-x-100" />
                <span className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-[#a9bcd3]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-head mt-4 text-[1.18rem] font-bold leading-snug text-[#131f5c]">{l.titel}</h3>
                <p className="mt-3.5 flex-1 text-[0.94rem] leading-[1.74] text-[#43507a]">{l.text}</p>
                <ul className="mt-6 space-y-2 border-t border-[#edf1f7] pt-5">
                  {l.punkte.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[0.86rem] text-[#43507a]">
                      <span className="block h-1.5 w-1.5 flex-none rounded-full bg-[#8dc63f]" />
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

/* ═════════════════════════ System (dunkel) ═════════════════════════ */

function SystemSektion() {
  return (
    <section id="system" className="relative overflow-hidden bg-[#0b1233] px-6 py-[118px] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(47,91,215,.38), transparent 65%), radial-gradient(ellipse 50% 45% at 8% 90%, rgba(141,198,63,.13), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Eyebrow tone="light">Digitale Systemservices</Eyebrow>
            <SectionTitle tone="light" className="max-w-[18ch]">
              Die Infrastruktur hinter Ihrem Erfolg.
            </SectionTitle>
            <Lead tone="light">
              Wir verbinden Technologie, Prozesse und Menschen zu leistungsfähigen digitalen
              Systemlandschaften. Unser Qualitätsmanagement stellt sicher, dass auch bei hoher
              Ausbringung konstante Standards eingehalten werden.
            </Lead>
          </Reveal>

          <div className="mt-10 space-y-3">
            {ebenen.map((e, i) => (
              <Reveal key={e.titel} delay={i * 90}>
                <div className="group flex items-center gap-5 rounded-[13px] border border-white/10 bg-white/[0.05] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8dc63f]/40 hover:bg-white/[0.08]">
                  <span className="font-head w-[68px] flex-none text-[10px] font-bold uppercase tracking-[0.18em] text-[#8dc63f]">
                    {e.stufe}
                  </span>
                  <span className="h-8 w-px flex-none bg-white/12" />
                  <span>
                    <span className="font-display block text-[15px] font-semibold text-white">{e.titel}</span>
                    <span className="block text-[12.5px] text-[#96a3c8]">{e.sub}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {kennzahlen.map((k, i) => (
            <Reveal key={k.label} delay={i * 100}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.05] p-7 transition-all duration-[380ms] hover:-translate-y-2 hover:border-[#8dc63f]/45 hover:bg-white/[0.08]">
                <Counter ziel={k.wert} suffix={k.suffix} />
                <div className="font-display mt-3.5 text-[0.9rem] font-semibold text-[#dfe7f8]">{k.label}</div>
                <div className="mt-1 text-[0.78rem] leading-relaxed text-[#8695bd]">{k.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Framework ═════════════════════════ */

function FrameworkSektion() {
  return (
    <section id="framework" className="bg-[#f7f9fc] px-6 py-[118px]">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <Eyebrow>Das Ladouz-Framework</Eyebrow>
          <SectionTitle className="max-w-[20ch]">Vom Zielbild zur skalierenden Maschine.</SectionTitle>
          <Lead>
            Jedes Projekt durchläuft dieselbe bewährte Architektur. Das macht unsere Arbeit
            planbar, unsere Qualität konstant – und Ihre Ergebnisse reproduzierbar.
          </Lead>
        </Reveal>

        <div className="relative mt-16">
          {/* gestrichelte Verbindungslinie */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[26px] hidden border-t-2 border-dashed border-[#d9e2f0] lg:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {framework.map((s, i) => (
              <Reveal key={s.nr} delay={i * 110}>
                <li className="flex h-full flex-col rounded-[20px] border border-[#e7ecf5] bg-white p-7 shadow-[0_16px_42px_rgba(11,18,51,0.05)] transition-all duration-[380ms] hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(11,18,51,0.1)]">
                  <span className="font-display flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#2f5bd7,#4b7ce8)] text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(47,91,215,0.38)]">
                    {s.nr}
                  </span>
                  <h3 className="font-head mt-5 text-[1.07rem] font-bold text-[#131f5c]">{s.titel}</h3>
                  <p className="mt-2.5 flex-1 text-[0.89rem] leading-[1.72] text-[#43507a]">{s.text}</p>
                  <span className="font-head mt-5 inline-block text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#6da62f]">
                    {s.label}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Leitbild ═════════════════════════ */

function Leitbild() {
  return (
    <section id="leitbild" className="bg-white px-6 py-[118px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
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
            <blockquote className="relative mt-9 overflow-hidden rounded-[20px] bg-[linear-gradient(118deg,#131f5c,#2f5bd7)] p-9 text-white shadow-[0_28px_66px_rgba(16,26,78,0.38)]">
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-10 h-[210px] w-[210px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(141,198,63,.38), transparent 70%)" }}
              />
              <p className="font-head relative text-[1.27rem] font-bold leading-[1.5]">
                »Konsequent methodisches Vorgehen reduziert Fehler, Nacharbeit und
                Reibungsverluste – und steigert so die{" "}
                <span className="text-[#b6e57a]">Produktivität</span> unserer Kunden und unserer
                eigenen Organisation.«
              </p>
              <footer className="relative mt-7 flex items-center gap-4">
                <Image
                  src="/nizar-portrait.webp"
                  alt="Nizar Ladouz, Inhaber von ladouz.digital"
                  width={216}
                  height={216}
                  className="h-[72px] w-[72px] flex-none rounded-full border-[1.5px] border-white/40 object-cover"
                />
                <span>
                  <span className="font-display block text-[0.95rem] font-semibold text-white">Nizar Ladouz</span>
                  <span className="font-head block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#b9c9ee]">
                    Inhaber
                  </span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>

        <div className="space-y-5">
          {werte.map((w, i) => (
            <Reveal key={w.nr} delay={i * 100}>
              <div className="group flex gap-6 rounded-[20px] border border-[#e7ecf5] bg-white p-7 shadow-[0_14px_36px_rgba(11,18,51,0.05)] transition-all duration-[380ms] hover:-translate-y-1.5 hover:border-[#d6dfee] hover:shadow-[0_26px_58px_rgba(11,18,51,0.1)]">
                <span className="font-display flex h-11 w-11 flex-none items-center justify-center rounded-[13px] bg-[#e8eef5] text-[13px] font-bold text-[#2f5bd7] transition-colors duration-300 group-hover:bg-[#2f5bd7] group-hover:text-white">
                  {w.nr}
                </span>
                <div>
                  <h3 className="font-head text-[1.05rem] font-bold text-[#131f5c]">{w.titel}</h3>
                  <p className="mt-2 text-[0.9rem] leading-[1.72] text-[#43507a]">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Insights ═════════════════════════ */

function Insights() {
  return (
    <section id="insights" className="bg-[#f7f9fc] px-6 py-[118px]">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>Wissensbereich</Eyebrow>
              <SectionTitle className="max-w-[18ch]">Frameworks, Methoden, Einblicke.</SectionTitle>
            </div>
            <Lead>
              Hier entsteht unser Wissensbereich: dokumentierte Frameworks und Methoden aus der
              Praxis – für Unternehmen, die Digitalisierung strukturiert angehen wollen.
            </Lead>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {insights.map((a, i) => (
            <Reveal key={a.titel} delay={i * 110}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e7ecf5] bg-white p-8 shadow-[0_16px_42px_rgba(11,18,51,0.05)] transition-all duration-[380ms] hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(11,18,51,0.1)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-[170px] w-[170px] rounded-full transition-transform duration-500 group-hover:scale-110"
                  style={{ background: "radial-gradient(circle, rgba(47,91,215,.14), transparent 70%)" }}
                />
                <span className="font-head relative text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#2f5bd7]">
                  {a.kat}
                </span>
                <h3 className="font-head relative mt-4 text-[1.1rem] font-bold leading-snug text-[#131f5c]">
                  {a.titel}
                </h3>
                <p className="relative mt-3 flex-1 text-[0.9rem] leading-[1.72] text-[#43507a]">{a.text}</p>
                <span className="font-head relative mt-6 inline-block w-fit rounded-full border border-dashed border-[#a9bcd3] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#43507a]">
                  Bald verfügbar
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Kontakt + Lead-Formular ═════════════════════════ */

type Status = "idle" | "sending" | "success" | "error";

function KontaktSektion() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fehler, setFehler] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const bereit = name.trim().length >= 2 && emailOk;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bereit || status === "sending") return;
    setStatus("sending");
    setFehler("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("Serverfehler");
      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setFehler("Das hat nicht geklappt. Schreiben Sie uns gerne direkt an management@ladouz.digital.");
    }
  }

  return (
    <section id="kontakt" className="bg-white px-6 py-[118px]">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(118deg,#131f5c_0%,#2f5bd7_100%)] px-8 py-14 text-white shadow-[0_34px_80px_rgba(16,26,78,0.4)] sm:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-16 h-[320px] w-[320px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(141,198,63,.3), transparent 70%)" }}
            />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <Eyebrow tone="light">Erstberatung</Eyebrow>
                <h2 className="font-head mt-4 max-w-[15ch] text-[clamp(1.95rem,3.7vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.015em]">
                  Bereit für Ihr Framework?
                </h2>
                <p className="mt-5 max-w-[52ch] text-[1.03rem] leading-[1.72] text-[#c7d6f5]">
                  In einer unverbindlichen Erstberatung analysieren wir Ihre Ausgangslage und
                  zeigen, wie eine systematische digitale Architektur für Ihr Unternehmen aussieht.
                </p>
                <div className="mt-9">
                  <CtaButton href={BOOKING_URL}>Termin direkt wählen</CtaButton>
                </div>
                <p className="font-head mt-6 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9db3de]">
                  Unverbindlich · Persönlich · Antwort binnen 48 Stunden
                </p>
              </div>

              <div className="rounded-[22px] border border-white/15 bg-white/[0.08] p-8 backdrop-blur-xl">
                {status === "success" ? (
                  <div className="py-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8dc63f]/20 text-2xl text-[#b6e57a] ring-1 ring-inset ring-[#8dc63f]/40">
                      ✓
                    </div>
                    <h3 className="font-head mt-5 text-[1.2rem] font-bold text-white">Vielen Dank.</h3>
                    <p className="mt-2.5 text-[0.92rem] leading-[1.7] text-[#c7d6f5]">
                      Ihre Anfrage ist angekommen. Sie hören innerhalb von 48 Stunden von uns.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-[0.84rem] font-medium text-[#b6e57a] underline underline-offset-4"
                    >
                      Weitere Anfrage senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <h3 className="font-head text-[1.12rem] font-bold text-white">Oder kurz schreiben</h3>
                    <p className="mt-1.5 text-[0.86rem] text-[#a7b4d6]">
                      Zwei Angaben genügen. Wir melden uns persönlich.
                    </p>

                    <div className="mt-7 space-y-5">
                      <Feld id="name" label="Name" type="text" value={name} placeholder="Vor- und Nachname" autoComplete="name" onChange={setName} />
                      <Feld id="email" label="E-Mail" type="email" value={email} placeholder="name@unternehmen.de" autoComplete="email" onChange={setEmail} />
                    </div>

                    <button
                      type="submit"
                      disabled={!bereit || status === "sending"}
                      className="ld-btn group relative mt-8 w-full overflow-hidden rounded-[11px] bg-[#8dc63f] px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#0b1233] shadow-[0_10px_26px_rgba(141,198,63,0.35)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                      <span className="relative z-10">
                        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
                      </span>
                      {bereit && status !== "sending" && <span aria-hidden className="ld-sweep" />}
                    </button>

                    {status === "error" && (
                      <p className="mt-4 text-[0.84rem] leading-relaxed text-[#ffb3a3]">{fehler}</p>
                    )}

                    <p className="mt-5 text-[0.76rem] leading-[1.6] text-[#8695bd]">
                      Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung
                      der Anfrage zu. Details in der{" "}
                      <a href="/datenschutz" className="underline underline-offset-2 hover:text-white">
                        Datenschutzerklärung
                      </a>
                      .
                    </p>
                  </form>
                )}
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
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  placeholder: string;
  autoComplete: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-head mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#a7b4d6]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[13px] border border-white/15 bg-white/[0.07] px-4 py-3.5 text-[0.97rem] text-white outline-none transition-all duration-300 placeholder:text-[#7a86ab] focus:border-[#8dc63f] focus:bg-white/[0.11] focus:ring-4 focus:ring-[#8dc63f]/15"
      />
    </div>
  );
}

/* ═════════════════════════ Footer ═════════════════════════ */

function Footer() {
  return (
    <footer className="bg-[#0b1233] px-6 pt-[82px] text-[#8fa0c6]">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo-white.png" alt="ladouz.digital" width={560} height={280} className="h-[38px] w-auto" />
            <p className="mt-6 max-w-[300px] text-[0.88rem] leading-[1.74]">
              Frameworks für digitale &amp; KI-Strategien. Produktivität durch Qualität.
              Qualität durch System. Erfolg durch Menschen und Strategien.
            </p>
          </div>

          {[
            { titel: "Leistungen", links: [["Digitale Strategie", "#leistungen"], ["KI-Implementierung", "#leistungen"], ["Online-Marketing", "#leistungen"], ["Systemservices", "#system"]] },
            { titel: "Agentur", links: [["Unser Framework", "#framework"], ["Leitbild & Werte", "#leitbild"], ["Wissensbereich", "#insights"], ["Kontakt", "#kontakt"]] },
            { titel: "Rechtliches", links: [["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"], ["management@ladouz.digital", "mailto:management@ladouz.digital"]] },
          ].map((col) => (
            <nav key={col.titel} aria-label={col.titel}>
              <h2 className="font-head text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">{col.titel}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[0.88rem] transition-colors hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-8">
          <span className="max-w-[62ch] text-[0.74rem] leading-relaxed text-[#6b7896]">
            © {new Date().getFullYear()} ladouz.digital – Alle Rechte vorbehalten. Genannte Marken
            und Logos sind Eigentum ihrer jeweiligen Inhaber; die Nennung dient ausschließlich der
            Beschreibung unserer Leistungen.
          </span>
          <span className="font-head text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#a9bcd3]">
            we create digital value
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════ Globale Styles ═════════════════════════ */

function GlobalStyles() {
  const css = `
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }

    .font-head    { font-family: var(--font-head, 'Raleway'), system-ui, sans-serif; }
    .font-body    { font-family: var(--font-body, 'DM Sans'), system-ui, sans-serif; }
    .font-display { font-family: var(--font-display, 'Jost'), system-ui, sans-serif; }

    /* Reveal-on-Scroll – ohne JS bleibt der Inhalt sichtbar */
    .ld-reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity .85s cubic-bezier(.16,.84,.28,1), transform .85s cubic-bezier(.16,.84,.28,1);
      will-change: opacity, transform;
    }
    .ld-reveal.is-visible { opacity: 1; transform: none; }

    /* Licht-Sweep über Primaer-Buttons */
    .ld-btn .ld-sweep {
      position: absolute; inset: 0; z-index: 0;
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%);
      transform: translateX(-120%);
      transition: transform .75s cubic-bezier(.16,.84,.28,1);
      pointer-events: none;
    }
    .ld-btn:hover .ld-sweep { transform: translateX(120%); }

    .ld-pulse { animation: ldPulse 2.2s ease-in-out infinite; }
    @keyframes ldPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .4; transform: scale(.75); }
    }

    .ld-float { animation: ldFloat 9s ease-in-out infinite alternate; }
    @keyframes ldFloat { to { transform: translateY(-12px); } }

    .ld-marquee { animation: ldMarquee 46s linear infinite; }
    .ld-marquee:hover { animation-play-state: paused; }
    @keyframes ldMarquee { to { transform: translateX(-50%); } }

    .ld-marquee-mask {
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
              mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
    }

    /* Nav-Unterstrich */
    .ld-navlink { position: relative; padding-block: 6px; }
    .ld-navlink::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
      background: #8dc63f; transform: scaleX(0); transform-origin: 0 50%;
      transition: transform .28s cubic-bezier(.16,.84,.28,1);
    }
    .ld-navlink:hover::after { transform: scaleX(1); }

    :focus-visible { outline: 2px solid #8dc63f; outline-offset: 3px; }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .ld-reveal { opacity: 1; transform: none; transition: none; }
      .ld-pulse, .ld-float, .ld-marquee { animation: none; }
      .ld-btn .ld-sweep { display: none; }
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/* ══════════════════════════════════════════════════════════════
   SCHRIFTEN – in app/layout.tsx ergänzen:

   import { Raleway, DM_Sans, Jost } from "next/font/google";

   const raleway = Raleway({ subsets: ["latin"], weight: ["700","800"], variable: "--font-head" });
   const dmSans  = DM_Sans({ subsets: ["latin"], weight: ["400","500"], variable: "--font-body" });
   const jost    = Jost({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-display" });

   <body className={`${raleway.variable} ${dmSans.variable} ${jost.variable}`}>

   next/font lädt die Schriften zur Buildzeit und hostet sie selbst –
   es geht keine Anfrage an Google, das bleibt DSGVO-konform.
   ══════════════════════════════════════════════════════════════ */