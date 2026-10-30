import Image from "next/image";
import type { ReactNode } from "react";
import Footer from "./Footer";

/* Ruhiges Layout für Impressum und Datenschutz – gleiche Schriften und Farben
   wie die Startseite, ohne Animationen. */
export default function LegalLayout({ titel, stand, children }: { titel: string; stand?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0b1233] antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]" style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}>
      <header className="border-b border-[#e7ecf5] px-6">
        <div className="mx-auto flex h-[78px] max-w-[1192px] items-center justify-between">
          <a href="/" aria-label="ladouz.digital – zur Startseite" className="relative block h-[34px] w-[70px]">
            <Image src="/logo-navy.png" alt="ladouz.digital" fill sizes="70px" className="object-contain object-left" />
          </a>
          <a href="/" className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#43507a] transition-colors hover:text-[#0b1233]">← Zur Startseite</a>
        </div>
      </header>
      <main id="main" className="px-6 py-[clamp(64px,9vw,112px)]">
        <article className="ld-legal mx-auto max-w-[760px]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#2f5bd7]">Rechtliches</p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.02em]">{titel}</h1>
          {stand && <p className="mt-3 text-[0.88rem] text-[#5b6b8a]">Stand: {stand}</p>}
          <div className="mt-10" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>{children}</div>
        </article>
      </main>
      <Footer basis="/" />
      <style>{`
        .ld-legal h2 { font-family: var(--font-jost), system-ui, sans-serif; margin-top: 2.6rem; font-size: .74rem; font-weight: 600; text-transform: uppercase; letter-spacing: .22em; color: #0b1233; }
        .ld-legal p { margin-top: .9rem; font-size: 1.02rem; line-height: 1.75; color: #43507a; }
        .ld-legal a { color: #0b1233; text-decoration: underline; text-decoration-color: #8dc63f; text-underline-offset: 3px; }
        .ld-legal a:hover { color: #2f5bd7; }
      `}</style>
    </div>
  );
}
