import Image from "next/image";

const MAIL = "management@ladouz.digital";

export default function Footer({ basis = "" }: { basis?: string }) {
  const spalten: { titel: string; links: [string, string][] }[] = [
    { titel: "Leistung", links: [["Leistungsfelder", `${basis}#leistungen`], ["Das Vorgehen", `${basis}#framework`], ["Messbarkeit", `${basis}#messbarkeit`], ["Ausgangslage & Ergebnis", `${basis}#system`]] },
    { titel: "Unternehmen", links: [["Unsere Haltung", `${basis}#leitbild`], ["Für wen", `${basis}#branchen`], ["Perspektiven", `${basis}#publikationen`], ["Häufige Fragen", `${basis}#fragen`], ["Erstberatung", `${basis}#kontakt`]] },
    { titel: "Rechtliches", links: [["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"]] },
  ];

  return (
    <footer className="bg-[#0b1233] px-6 pt-[86px] text-[#9aa8cc]">
      <div className="mx-auto max-w-[1192px]">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo-white.png" alt="ladouz.digital" width={560} height={280} className="h-[38px] w-auto" />
            <p className="ld-serif mt-6 max-w-[320px] text-[0.94rem] leading-[1.7]">
              Performance-getriebene digitale Dienstleistungen und Consulting für den Mittelstand.
              Präzise gedacht, präzise umgesetzt.
            </p>
            <address className="mt-6 text-[0.88rem] not-italic leading-[1.7]">
              Markt 40 · 53721 Siegburg<br />
              <a href={`mailto:${MAIL}`} className="transition-colors hover:text-white">{MAIL}</a>
            </address>
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
