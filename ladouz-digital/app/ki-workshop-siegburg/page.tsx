import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

/* /ki-workshop-siegburg – Vor-Ort KI-Workshop im Büro Siegburg.
   Aufbau (Problem → Wendepunkt → Weg → Ergebnis → Angebot → Einwände → Aufruf):
   Hero · Ausgangslage · Wendepunkt · Vorher/Nachher · Ablauf (mit Bildern) · Für wen · Fragen · Anfrage.
   Bonn-Variante später: /ki-workshop-bonn mit eigenem Text (Anfahrt Bonn → Siegburg, 20 Min.), nicht kopieren. */

const SITE = "https://www.ladouz.digital";
const MAIL = "management@ladouz.digital";
const TEL = "01577 0206552";
const TEL_LINK = "+4915770206552";
const BOOKING_URL = "https://zeeg.me/management75/erstberatung";
const ANFRAGE = `mailto:${MAIL}?subject=${encodeURIComponent("Anfrage KI-Workshop Siegburg")}&body=${encodeURIComponent("Guten Tag Herr Ladouz,\n\nwir interessieren uns für den KI-Workshop vor Ort in Siegburg.\n\nName:\nUnternehmen:\nBranche / Mitarbeiterzahl:\nTeilnehmer (Anzahl):\nWunschtermin (Samstag):\nTelefon:\n\n")}`;

export const metadata: Metadata = {
  title: "KI-Workshop Siegburg – vor Ort für den Mittelstand im Rhein-Sieg-Kreis",
  description:
    "KI-Workshop in Siegburg: Jeden zweiten Samstag vor Ort, für mittelständische Unternehmen aus dem Rhein-Sieg-Kreis. Keine Spielereien – nur KI, die Zeit, Nerven und Geld spart. Mit Umsetzungsplan für Montag.",
  alternates: { canonical: "/ki-workshop-siegburg" },
  openGraph: { url: "/ki-workshop-siegburg", title: "KI-Workshop Siegburg | ladouz.digital", images: ["/standort/buero-1.webp"] },
};

const serif = "font-[family-name:var(--font-source-serif)]";
const label = "font-[family-name:var(--font-dm-sans)] text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#8dc63f]";
const h2 = "font-[family-name:var(--font-jost)] text-[clamp(1.8rem,3.6vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.02em]";

function Cta({ hell = false, children = "Platz anfragen" }: { hell?: boolean; children?: string }) {
  return (
    <a href={ANFRAGE} className={`inline-flex items-center gap-3 rounded-full px-7 py-[15px] text-[15px] font-medium transition hover:-translate-y-0.5 ${hell ? "bg-white text-[#0b1233] hover:bg-[#eef6e2]" : "bg-[#0b1233] text-white hover:bg-[#131f5c]"}`}>
      <span className="h-2 w-2 rounded-full bg-[#8dc63f]" aria-hidden />{children}<span aria-hidden>→</span>
    </a>
  );
}

const vorher = [
  "KI wird mal ausprobiert und ab und zu genutzt – aber nicht als festes System",
  "Angebotserstellung, Onboardings, Analysen, Dokumentation und E-Mails fressen weiter Stunden",
  "Keine festen, dokumentierten Abläufe: Wissen steckt in Köpfen, nicht im System",
  "Unsicherheit, was beim Einsatz von KI erlaubt ist und was nicht",
  "Bei der Vielzahl an Tools ist unklar, was sich wofür eignet",
];
const nachher = [
  "Ein klarer 30-Tage-Plan: KI wird ab Montag fester Teil Ihrer Abläufe – wer macht was",
  "Fertige Vorlagen und Arbeitsanweisungen für Ihre zeitintensiven, wiederkehrenden Aufgaben",
  "Erste Abläufe dokumentiert: Wissen wandert aus den Köpfen ins System",
  "Klare Regeln für Datenschutz und Einsatz im Team",
  "Sie wissen, welche Tools und welche Cases sich für Ihren Betrieb lohnen – messbar an Zeit, Kosten und Fehlern",
];
const ablauf = [
  { t: "Ankommen & Bestandsaufnahme", d: "Wir schauen auf Ihren Betrieb, nicht auf Folien: Wo gehen heute Zeit, Geld und Nerven verloren?", img: "/standort/buero-1.webp", hoch: false },
  { t: "Was KI heute faktisch leistet", d: "Live an echten Beispielen aus dem Mittelstand: Angebote, Kommunikation, Auswertung, Dokumentation. Ohne Hype.", img: "/standort/rollup.webp", hoch: true },
  { t: "Organisieren statt ausprobieren", d: "Wie Sie KI in Abläufe, Rollen und Regeln einbauen – damit es im Alltag hält, nicht nur im Workshop.", img: "/standort/buero-2.webp", hoch: false },
  { t: "Ihr Umsetzungsplan", d: "Sie gehen mit einem konkreten Plan für die nächsten 30 Tage nach Hause. Montag kann es losgehen.", img: null, hoch: false },
];
const fragen = [
  ["Wann findet der Workshop statt?", "Jeden zweiten Samstag in unserem Büro, Markt 40, 53721 Siegburg. Den nächsten freien Termin nennen wir Ihnen nach Ihrer Anfrage."],
  ["Für wen ist der Workshop?", "Für Inhaber, Geschäftsführer und Führungskräfte mittelständischer Unternehmen aus Siegburg und dem Rhein-Sieg-Kreis – Handwerk, Dienstleistung, Handel, Industrie."],
  ["Brauche ich Vorkenntnisse?", "Nein. Wir starten bei Ihrem Betrieb, nicht bei der Technik. Ein Laptop ist hilfreich, aber kein Muss."],
  ["Kommen auch Teilnehmer aus Bonn?", "Ja. Siegburg ist von Bonn in rund 20 Minuten erreichbar – mit Auto oder Stadtbahn 66."],
  ["Wie groß ist die Gruppe?", "Bewusst klein, damit jeder Betrieb konkret besprochen wird. Die Plätze sind daher begrenzt."],
] as const;

export default function KiWorkshopSiegburg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event", name: "KI-Workshop Siegburg für den Mittelstand", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled", description: metadata.description,
        location: { "@type": "Place", name: "Ladouz Digital – Büro Siegburg", address: { "@type": "PostalAddress", streetAddress: "Markt 40", postalCode: "53721", addressLocality: "Siegburg", addressRegion: "NRW", addressCountry: "DE" } },
        organizer: { "@type": "Organization", name: "Ladouz Digital", url: SITE }, url: `${SITE}/ki-workshop-siegburg`,
        eventSchedule: { "@type": "Schedule", repeatFrequency: "P2W", byDay: "https://schema.org/Saturday" },
      },
      { "@type": "FAQPage", mainEntity: fragen.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  return (
    <main className="bg-white text-[#0b1233]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1233] px-6 pb-24 pt-8 text-white">
        <Image src="/motive/hero-berg.jpg" alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1233]/40 to-[#0b1233]" aria-hidden />
        <div className="relative mx-auto max-w-[1192px]">
          <Link href="/"><Image src="/logo-white.png" alt="ladouz.digital" width={560} height={280} className="h-[34px] w-auto" /></Link>
          <div className="mt-20 max-w-[780px]">
            <p className={label}>Vor Ort in Siegburg · jeden zweiten Samstag</p>
            <h1 className="mt-5 font-[family-name:var(--font-jost)] text-[clamp(2.3rem,5.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.025em]">
              KI-Workshop Siegburg: Ihr Betrieb, zehnmal effizienter – ohne Spielereien.
            </h1>
            <p className={`${serif} mt-7 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.65] text-[#c7d6f5]`}>
              Für mittelständische Unternehmen aus dem Rhein-Sieg-Kreis. Ein Samstag in unserem Büro – und Sie wissen genau,
              wo KI in Ihrem Betrieb Zeit, Nerven, Ressourcen und Geld spart. Und wie Sie es ab Montag organisieren.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Cta hell />
              <a href={`tel:${TEL_LINK}`} className="text-[15px] text-[#c7d6f5] underline-offset-4 hover:underline">oder anrufen: {TEL}</a>
            </div>
            <p className="mt-6 text-[0.85rem] text-[#9aa8cc]">Kleine Gruppe · begrenzte Plätze · Markt 40, 53721 Siegburg</p>
          </div>
        </div>
      </section>

      {/* Ausgangslage */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1192px] gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div><p className={label}>Die Ausgangslage</p><h2 className={`${h2} mt-4`}>Jeder redet über KI. Überall sieht man KI. Doch wie sehr profitieren Sie wirklich davon?</h2></div>
          <div className={`${serif} space-y-5 text-[1.08rem] leading-[1.7] text-[#43507a]`}>
            <p>Sie haben ChatGPT, Claude und weitere KI-Modelle ausprobiert – vielleicht sogar schon erste Workflows. Ein Mitarbeiter hat ein paar Texte geschrieben, ein paar Bilder erzeugt. Und dann ging der Alltag weiter wie vorher.</p>
            <p>Das liegt nicht am Potenzial der Technologie. Es fehlt die Übersetzung in tatsächliche Produktivität – in erledigte Aufgaben, die sich für Ihren Betrieb wirklich lohnen.</p>
            <ul className="space-y-3 border-l-2 border-[#8dc63f] pl-5 text-[#0b1233]">
              <li>Welche Aufgaben in Ihrem Betrieb lohnen sich wirklich?</li>
              <li>Wie wird daraus ein fester Ablauf der Implementierung?</li>
              <li>Wie entwickelt man systematisch KI-Agenten, die Wertvolles erledigen statt Spielereien – für mehr Produktivität, mehr Genauigkeit und mehr Zeit für das Wesentliche?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Wendepunkt */}
      <section className="bg-[#f7f9fc] px-6 py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <p className={label}>Der Unterschied</p>
          <h2 className={`${h2} mt-4`}>KI bringt nichts, solange sie nicht richtig organisiert und orchestriert ist.</h2>
          <p className={`${serif} mx-auto mt-6 max-w-[60ch] text-[1.1rem] leading-[1.7] text-[#43507a]`}>
            Deshalb zeigen wir keine Tool-Parade. Wir arbeiten an Ihren Abläufen – und zeigen nur, was faktisch Mehrwert hat:
            welcher Case sich für KI und Automation wirklich lohnt.
          </p>
        </div>
      </section>

      {/* Vorher / Nachher */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1192px]">
          <p className={label}>Vorher und nachher</p>
          <h2 className={`${h2} mt-4 max-w-[22ch]`}>Mit welchem Stand Sie reinkommen. Mit welchem Sie rausgehen.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-[#e7ecf5] p-8">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#9aa8cc]">Morgens, 9 Uhr</p>
              <ul className="mt-6 space-y-4">{vorher.map((v) => <li key={v} className="flex gap-3 text-[#43507a]"><span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-[#c5cde0]" />{v}</li>)}</ul>
            </div>
            <div className="rounded-[28px] bg-[#0b1233] p-8 text-white shadow-[0_30px_60px_-30px_rgba(11,18,51,.5)]">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#8dc63f]">Nachmittags, nach dem Workshop</p>
              <ul className="mt-6 space-y-4">{nachher.map((v) => <li key={v} className="flex gap-3 text-[#dfe6f7]"><span className="mt-[2px] flex-none text-[#8dc63f]">✓</span>{v}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf – Bilder Schritt für Schritt */}
      <section className="bg-[#f7f9fc] px-6 py-24">
        <div className="mx-auto max-w-[1192px]">
          <p className={label}>Der Tag</p>
          <h2 className={`${h2} mt-4`}>So läuft der Workshop ab.</h2>
          <div className="mt-14 space-y-16">
            {ablauf.map((s, i) => (
              <div key={s.t} className={`grid items-center gap-10 ${s.img ? "md:grid-cols-2" : ""}`}>
                {s.img && (
                  <div className={`relative overflow-hidden rounded-[28px] ${s.hoch ? "mx-auto aspect-[3/4] w-full max-w-[380px]" : "aspect-[4/3]"} shadow-[0_30px_60px_-34px_rgba(11,18,51,.45)] ${i % 2 ? "md:order-2" : ""}`}>
                    <Image src={s.img} alt={s.hoch ? "Ladouz Digital Roll-up im Büro Siegburg" : `Ladouz Digital Büro Siegburg – ${s.t}`} fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />
                  </div>
                )}
                <div className={s.img ? "" : "max-w-[640px]"}>
                  <p className="font-[family-name:var(--font-jost)] text-[3rem] font-light leading-none text-[#8dc63f]">0{i + 1}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-jost)] text-[1.6rem] font-medium">{s.t}</h3>
                  <p className={`${serif} mt-3 text-[1.06rem] leading-[1.7] text-[#43507a]`}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1192px] gap-12 md:grid-cols-2">
          <div>
            <p className={label}>Für wen</p>
            <h2 className={`${h2} mt-4`}>Für Betriebe, die Ergebnisse wollen – nicht Inspiration.</h2>
            <p className={`${serif} mt-6 text-[1.06rem] leading-[1.7] text-[#43507a]`}>Inhaber, Geschäftsführer und Führungskräfte aus Siegburg, Sankt Augustin, Troisdorf, Hennef, Lohmar, Bonn und dem gesamten Rhein-Sieg-Kreis.</p>
          </div>
          <ul className="space-y-4 self-center">
            {["Sie führen einen mittelständischen Betrieb oder ein Team", "Sie wollen weniger Zeit in Routinearbeit stecken", "Sie suchen einen klaren Plan statt weiterer Tools", "Sie möchten vor Ort lernen – persönlich, mit echten Fragen"].map((x) => (
              <li key={x} className="flex gap-3 rounded-2xl border border-[#e7ecf5] px-5 py-4"><span className="text-[#8dc63f]">✓</span>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fragen */}
      <section className="bg-[#f7f9fc] px-6 py-24">
        <div className="mx-auto max-w-[860px]">
          <p className={label}>Häufige Fragen</p>
          <h2 className={`${h2} mt-4`}>Was Sie vorher wissen sollten.</h2>
          <div className="mt-10 divide-y divide-[#e7ecf5] border-y border-[#e7ecf5]">
            {fragen.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.08rem] font-medium">{q}<span className="text-[#8dc63f] transition group-open:rotate-45">+</span></summary>
                <p className={`${serif} mt-3 leading-[1.7] text-[#43507a]`}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Gründer */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-[300px_1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-34px_rgba(11,18,51,.45)]">
            <Image src="/nizar-portrait.webp" alt="Nizar Ladouz, Inhaber Ladouz Digital" fill className="object-cover" sizes="300px" />
          </div>
          <div>
            <p className={label}>Wer den Workshop leitet</p>
            <h2 className={`${h2} mt-4`}>Nizar Ladouz</h2>
            <p className={`${serif} mt-6 text-[1.08rem] leading-[1.7] text-[#43507a]`}>
              „Als Agenturinhaber kenne ich die digitale Tool-Landschaft sehr genau. Seit ich selbst KI-Agenten einsetze, die Aufgaben für mich erledigen
              und meinen Arbeitsalltag spürbar vereinfachen, weiß ich: Das ist in jeder Branche genauso möglich – gerade dort, wo die fachliche KI-Expertise fehlt.
              Wir onboarden KI-Agenten und passen sie an Ihren Case an, damit Sie wirklich davon profitieren.“
            </p>
            <p className="mt-4 text-[0.9rem] text-[#9aa8cc]">Inhaber, Ladouz Digital · Siegburg</p>
          </div>
        </div>
      </section>

      {/* Anfrage */}
      <section id="anfrage" className="bg-[#0b1233] px-6 py-24 text-white">
        <div className="mx-auto max-w-[860px] text-center">
          <p className={label}>Platz sichern</p>
          <h2 className={`${h2} mt-4`}>Der nächste Samstag in Siegburg ist schneller voll, als man denkt.</h2>
          <p className={`${serif} mx-auto mt-6 max-w-[56ch] text-[1.1rem] leading-[1.7] text-[#c7d6f5]`}>
            Schreiben Sie uns kurz, wer Sie sind und wie viele Personen teilnehmen. Wir melden uns mit dem nächsten freien Termin.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Cta hell>Workshop-Platz anfragen</Cta>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-[15px] text-[15px] hover:bg-white/10">Erst kurz sprechen →</a>
          </div>
          <p className="mt-8 text-[0.9rem] text-[#9aa8cc]">{MAIL} · {TEL} · Markt 40, 53721 Siegburg</p>
        </div>
      </section>
      <Footer basis="/" />
    </main>
  );
}
