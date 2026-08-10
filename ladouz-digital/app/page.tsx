"use client";

/**
 * ladouz.digital – Landingpage
 * Next.js (App Router) + TypeScript + Tailwind CSS
 *
 * Alle Farben stammen aus dem Design-System "Ladouz Blueprint" und sind als
 * Tailwind-Arbitrary-Values notiert. Dadurch laeuft die Datei ohne Anpassung
 * an tailwind.config – egal ob Tailwind v3 oder v4.
 *
 * Optional (Marken-Schriften): siehe Hinweis am Ende der Datei.
 */

import { useState, type FormEvent } from "react";

/* ─────────────────────────── Daten ─────────────────────────── */

const BOOKING_URL = "https://zeeg.me/management75/erstberatung";

const leistungen = [
  {
    titel: "Digitale Unternehmensstrategie",
    text: "Die strategische Architektur Ihres digitalen Geschaefts: Zielbild, Roadmap und Steuerungslogik – als belastbares Framework statt loser Massnahmen.",
  },
  {
    titel: "KI-Implementierung",
    text: "Von der Potenzialanalyse bis zum produktiven System: KI dort integriert, wo sie messbaren Nutzen stiftet – eingebettet in klare Prozesse und Verantwortlichkeiten.",
  },
  {
    titel: "Online-Marketing",
    text: "Performance-Marketing mit Systemanspruch: transparente Kennzahlen, kontinuierliche Optimierung und Kampagnen, die auf die Gesamtstrategie einzahlen.",
  },
];

const framework = [
  { nr: "01", titel: "Analyse", text: "Die Wertschoepfungskette als Ganzes erfassen: Status quo, Potenziale, Engpaesse, Kennzahlen.", label: "Verstehen" },
  { nr: "02", titel: "Architektur", text: "Strategie, Systeme und Prozesse werden zu einer klaren, dokumentierten Struktur verbunden.", label: "Strukturieren" },
  { nr: "03", titel: "Implementierung", text: "KI-Systeme, Automatisierungen und Marketing-Motoren gehen kontrolliert in den Betrieb.", label: "Umsetzen" },
  { nr: "04", titel: "Skalierung", text: "Messen, lernen, optimieren. Stillstand ist Rueckschritt – das System entwickelt sich weiter.", label: "Wachsen" },
];

const merkmale = [
  "Systemisch statt isoliert",
  "Qualitaet als Standard",
  "Messbar und skalierbar",
];

/* ─────────────────────────── Seite ─────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0b1233] antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]">
      <Header />
      <main>
        <Hero />
        <Leistungen />
        <Framework />
        <Leitbild />
        <LeadFormular />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────── Header ─────────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7ecf5] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-6 px-6">
        <a href="/" className="text-[19px] font-extrabold tracking-[-0.03em] text-[#131f5c]">
          ladouz<span className="text-[#2f5bd7]">.digital</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Leistungen", "#leistungen"],
            ["Framework", "#framework"],
            ["Leitbild", "#leitbild"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[15px] font-medium text-[#43507a] transition-colors hover:text-[#0b1233]"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          className="rounded-[11px] bg-[#8dc63f] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b1233] shadow-[0_8px_20px_rgba(141,198,63,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Erstberatung
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(118deg,#131f5c_0%,#2f5bd7_100%)] px-6 py-[110px] text-white">
      {/* Gridlines-Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radialer Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 82% 18%, rgba(141,198,63,.20), transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow tone="light">Agentur fuer digitale Systemarchitektur</Eyebrow>

          <h1 className="mt-4 text-[clamp(2.4rem,5.2vw,3.9rem)] font-extrabold leading-[1.06] tracking-[-0.015em]">
            Frameworks fuer{" "}
            <span className="bg-[linear-gradient(95deg,#b6e57a,#ffffff)] bg-clip-text text-transparent">
              digitale &amp;&nbsp;KI-Strategien
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.06rem] leading-[1.7] text-[#c7d6f5]">
            Die Infrastruktur hinter Ihrer digitalen Unternehmensstrategie, KI-Implementierung
            und Ihrem Online-Marketing. Systemisch gedacht, praezise gebaut, messbar skaliert.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="rounded-[11px] bg-[#8dc63f] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b1233] shadow-[0_10px_26px_rgba(141,198,63,0.4)] transition-transform hover:-translate-y-0.5"
            >
              Erstberatung buchen →
            </a>
            <a
              href="#framework"
              className="rounded-[11px] border-[1.5px] border-white/55 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
            >
              Unser Framework
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
            {merkmale.map((m) => (
              <li key={m} className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[#a7b4d6]">
                <span className="block h-1.5 w-1.5 rounded-full bg-[#8dc63f]" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Glassmorphism-Panel */}
        <div className="rounded-[26px] border border-white/15 bg-white/[0.07] p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#a7b4d6]">Strategie-Stack</span>
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#b6e57a]">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[#8dc63f]" />
              Framework aktiv
            </span>
          </div>

          <div className="mt-7 space-y-3">
            {[
              ["Digitale Strategie", "Architektur & Roadmap"],
              ["KI-Implementierung", "Systeme & Automatisierung"],
              ["Online-Marketing", "Performance & Wachstum"],
            ].map(([titel, sub]) => (
              <div
                key={titel}
                className="rounded-[13px] border border-white/10 bg-white/[0.05] px-5 py-4 transition-colors hover:border-[#8dc63f]/45"
              >
                <div className="text-[15px] font-semibold text-white">{titel}</div>
                <div className="mt-0.5 text-[13px] text-[#96a3c8]">{sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.16em] text-[#a7b4d6]">
              <span>Systemreife</span>
              <span>92%</span>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[92%] rounded-full bg-[linear-gradient(90deg,#8dc63f,#4b7ce8)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Leistungen ─────────────────────────── */

function Leistungen() {
  return (
    <section id="leistungen" className="bg-white px-6 py-[110px]">
      <div className="mx-auto max-w-[1180px]">
        <Eyebrow>Leistungen</Eyebrow>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.12] tracking-[-0.015em] text-[#0b1233]">
          Drei Disziplinen. Ein System.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-[1.7] text-[#43507a]">
          Wir verbinden Strategie, KI und Marketing nicht als Einzelleistungen, sondern als
          integrierte Architektur – damit jede Massnahme auf dasselbe Ziel einzahlt.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {leistungen.map((l, i) => (
            <article
              key={l.titel}
              className="group relative overflow-hidden rounded-[20px] border border-[#e7ecf5] bg-white p-8 shadow-[0_16px_40px_rgba(11,18,51,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_60px_rgba(11,18,51,0.11)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#2f5bd7,#8dc63f)] transition-transform duration-300 group-hover:scale-x-100" />
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#a9bcd3]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-[1.15rem] font-bold leading-snug text-[#131f5c]">{l.titel}</h3>
              <p className="mt-3 text-[0.94rem] leading-[1.72] text-[#43507a]">{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Framework ─────────────────────────── */

function Framework() {
  return (
    <section id="framework" className="bg-[#f7f9fc] px-6 py-[110px]">
      <div className="mx-auto max-w-[1180px]">
        <Eyebrow>Das Ladouz-Framework</Eyebrow>
        <h2 className="mt-4 max-w-[20ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.12] tracking-[-0.015em]">
          Vom Zielbild zur skalierenden Maschine.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-[1.7] text-[#43507a]">
          Jedes Projekt durchlaeuft dieselbe Architektur. Das macht die Arbeit planbar, die
          Qualitaet konstant – und Ihre Ergebnisse reproduzierbar.
        </p>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {framework.map((s) => (
            <li
              key={s.nr}
              className="flex flex-col rounded-[20px] border border-[#e7ecf5] bg-white p-7 shadow-[0_16px_40px_rgba(11,18,51,0.05)] transition-transform duration-300 hover:-translate-y-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#2f5bd7,#4b7ce8)] text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(47,91,215,0.32)]">
                {s.nr}
              </span>
              <h3 className="mt-5 text-[1.05rem] font-bold text-[#131f5c]">{s.titel}</h3>
              <p className="mt-2.5 flex-1 text-[0.9rem] leading-[1.7] text-[#43507a]">{s.text}</p>
              <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6da62f]">
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── Leitbild ─────────────────────────── */

function Leitbild() {
  return (
    <section id="leitbild" className="bg-white px-6 py-[110px]">
      <div className="mx-auto max-w-[900px]">
        <blockquote className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(118deg,#131f5c,#2f5bd7)] p-10 text-white shadow-[0_28px_66px_rgba(16,26,78,0.38)] sm:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(141,198,63,.38), transparent 70%)" }}
          />
          <p className="relative text-[clamp(1.15rem,2.2vw,1.5rem)] font-bold leading-[1.5]">
            »Konsequent methodisches Vorgehen reduziert Fehler, Nacharbeit und Reibungsverluste –
            und steigert so die <span className="text-[#b6e57a]">Produktivitaet</span> unserer Kunden
            und unserer eigenen Organisation.«
          </p>
          <footer className="relative mt-8 flex items-center gap-4">
            <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border-[1.5px] border-white/40 bg-white/10 text-[15px] font-bold">
              NL
            </span>
            <span>
              <span className="block text-[0.95rem] font-semibold">Nizar Ladouz</span>
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#b9c9ee]">
                Inhaber
              </span>
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────── Lead-Formular ─────────────────────────── */

type Status = "idle" | "sending" | "success" | "error";

function LeadFormular() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fehler, setFehler] = useState("");

  const emailGueltig = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const bereit = name.trim().length >= 2 && emailGueltig;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    <section id="kontakt" className="bg-[#0b1233] px-6 py-[110px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow tone="light">Erstberatung</Eyebrow>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.12] tracking-[-0.015em] text-white">
            Bereit fuer Ihr Framework?
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.02rem] leading-[1.7] text-[#a7b4d6]">
            Wir analysieren Ihre Ausgangslage und zeigen, wie eine systematische digitale
            Architektur fuer Ihr Unternehmen aussieht. Unverbindlich und persoenlich.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block text-[0.92rem] font-medium text-[#b6e57a] underline underline-offset-4 transition-colors hover:text-white"
          >
            Lieber direkt einen Termin waehlen →
          </a>
        </div>

        <div className="rounded-[26px] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8dc63f]/20 text-2xl text-[#b6e57a]">
                ✓
              </div>
              <h3 className="mt-5 text-[1.2rem] font-bold text-white">Vielen Dank.</h3>
              <p className="mt-2.5 text-[0.94rem] leading-[1.7] text-[#a7b4d6]">
                Ihre Anfrage ist angekommen. Sie hoeren innerhalb von 48 Stunden von uns.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[0.85rem] font-medium text-[#b6e57a] underline underline-offset-4"
              >
                Weitere Anfrage senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-[1.15rem] font-bold text-white">Kontakt aufnehmen</h3>
              <p className="mt-1.5 text-[0.88rem] text-[#96a3c8]">
                Zwei Angaben genuegen. Wir melden uns persoenlich.
              </p>

              <div className="mt-7 space-y-5">
                <Feld
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  placeholder="Vor- und Nachname"
                  autoComplete="name"
                  onChange={setName}
                />
                <Feld
                  id="email"
                  label="E-Mail"
                  type="email"
                  value={email}
                  placeholder="name@unternehmen.de"
                  autoComplete="email"
                  onChange={setEmail}
                />
              </div>

              <button
                type="submit"
                disabled={!bereit || status === "sending"}
                className="mt-8 w-full rounded-[11px] bg-[#8dc63f] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b1233] shadow-[0_10px_26px_rgba(141,198,63,0.35)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
              </button>

              {status === "error" && (
                <p className="mt-4 text-[0.85rem] leading-relaxed text-[#ff9d8a]">{fehler}</p>
              )}

              <p className="mt-5 text-[0.78rem] leading-[1.6] text-[#7a86ab]">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der
                Anfrage zu. Details in der{" "}
                <a href="/datenschutz" className="underline underline-offset-2 hover:text-white">
                  Datenschutzerklaerung
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Feld({
  id,
  label,
  type,
  value,
  placeholder,
  autoComplete,
  onChange,
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
      <label
        htmlFor={id}
        className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#a7b4d6]"
      >
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
        className="w-full rounded-[13px] border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[0.98rem] text-white placeholder:text-[#6b779e] outline-none transition-colors focus:border-[#8dc63f] focus:bg-white/[0.09]"
      />
    </div>
  );
}

/* ─────────────────────────── Footer ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-[#e7ecf5] bg-white px-6 py-12">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5">
        <span className="text-[0.85rem] text-[#43507a]">
          © {new Date().getFullYear()} ladouz.digital – we create digital value
        </span>
        <nav className="flex gap-7 text-[0.85rem] text-[#43507a]">
          <a href="/impressum" className="transition-colors hover:text-[#0b1233]">Impressum</a>
          <a href="/datenschutz" className="transition-colors hover:text-[#0b1233]">Datenschutz</a>
          <a href="mailto:management@ladouz.digital" className="transition-colors hover:text-[#0b1233]">
            E-Mail
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Hilfskomponente ─────────────────────────── */

function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-3">
      <span className="block h-[2px] w-7 bg-[#8dc63f]" />
      <span
        className={`text-[0.7rem] font-bold uppercase tracking-[0.26em] ${
          tone === "light" ? "text-[#b6e57a]" : "text-[#2f5bd7]"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
 * OPTIONAL – Marken-Schriften (Raleway / DM Sans / Jost)
 *
 * In app/layout.tsx ergaenzen:
 *
 *   import { Raleway, DM_Sans } from "next/font/google";
 *   const raleway = Raleway({ subsets: ["latin"], weight: ["700","800"], variable: "--font-head" });
 *   const dmSans  = DM_Sans({ subsets: ["latin"], weight: ["400","500"], variable: "--font-body" });
 *   // <body className={`${raleway.variable} ${dmSans.variable} font-[var(--font-body)]`}>
 *
 * next/font laedt die Schriften zur Buildzeit herunter und hostet sie selbst –
 * es geht also keine Anfrage an Google, das bleibt DSGVO-konform.
 * ────────────────────────────────────────────────────────────── */