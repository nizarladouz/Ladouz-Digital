"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   ladouz.digital – Startseite
   Next.js (App Router) · TypeScript · Tailwind CSS

   POSITIONIERUNG
   Performance-getriebene digitale Dienstleistungen und Consulting für den
   Mittelstand. Gemessen an Anfragen, Aufträgen und Umsatz. Dauerhaft Teil
   des Unternehmens. Präzise gedacht. Präzise umgesetzt.

   AUFBAU – jede Sektion beantwortet genau eine Frage:
     Hero            Was bieten Sie an?
     Laufband        Was gehört alles dazu?
     Leitgedanke     Was heißt bei Ihnen Performance?
     Wandel          Wo verliere ich heute Wachstum?        (#system)
     Leistungsfelder Was genau machen Sie?                   (#leistungen)
     Vorgehen        Wie läuft das ab?                        (#framework)
     Messbarkeit     Woran erkenne ich, dass es wirkt?        (#messbarkeit)
     Haltung         Warum Sie?                               (#leitbild)
     Branchen        Passt das zu mir?                        (#branchen)
     Perspektiven    Wie denken Sie?                          (#publikationen, #newsletter)
     Fragen          Was will ich vorher noch wissen?         (#fragen)
     Kontakt         Wie fange ich an?                        (#kontakt)

   Alle Anker aus dem Menü existieren. Das Menü selbst ist unverändert.

   SKALIERUNG
   Leistungsfelder und Perspektiven haben ein Feld `pfad`. Sobald eine
   Unterseite existiert (z. B. /leistungen/performance-marketing), dort den
   Pfad eintragen – die Karte verlinkt dann automatisch. Vorher bleibt das
   Feld leer, damit kein Link ins Leere führt.

   BILDER
   Jede Bildfläche steht genau einmal im Objekt BILDER weiter unten.
   Solange `src` fehlt, rendert automatisch eine CI-Grafik.

   LEISTUNG
   · Genau ein Bild mit fetchPriority="high": das Hero-Motiv (LCP).
     (Next.js 16 hat die frühere Eigenschaft "priority" abgelöst.)
   · Die H1 wird ohne Einblendung ausgeliefert – sie ist das LCP-Element.
   · Alle Scroll- und Zeigereffekte schreiben CSS-Variablen direkt ans DOM,
     nicht in den React-State. Animationen laufen über transform und opacity.
   · Das Hero-Instrument ist reines SVG + CSS: kein Canvas, keine Bibliothek.
   · prefers-reduced-motion ist vollständig abgedeckt.

   STRUKTURIERTE DATEN
   Unternehmen und häufige Fragen werden als JSON-LD ausgeliefert
   (Google, Bing und KI-Suchsysteme lesen das maschinell).
   ═══════════════════════════════════════════════════════════════════════════ */

import {
  useCallback, useEffect, useId, useRef, useState, useSyncExternalStore,
  type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode,
} from "react";
import Image from "next/image";

const SITE = "https://ladouz.digital";
const BOOKING_URL = "https://zeeg.me/management75/erstberatung";
const MAIL = "management@ladouz.digital";
const TEL = "01577 0206552";
const TEL_LINK = "+4915770206552";

/* ═══════════════════════════════════════════════════════════════════════════
   BILDER – die einzige Stelle, die du für Motive anfassen musst.

   Jede Bildfläche hat einen festen Dateinamen. So setzt du ein Foto ein:

     1. Foto unter genau diesem Namen nach /public/motive/ legen
        (z. B. ladouz-digital/public/motive/hero.jpg)
     2. Bei der passenden Zeile "undefined" durch den Pfad ersetzen:
          hero: { src: "/motive/hero.jpg", ...
     3. Fertig. Größe, Zuschnitt, Abdunklung und Ladeverhalten sind gesetzt.

   Wichtig: Erst den Pfad eintragen, wenn die Datei wirklich im Repo liegt.
   Ein Pfad ohne Datei zeigt ein leeres Bild.

   Format: JPEG, lange Kante mindestens 2400 px, unter 3 MB. Keine
   vorkomprimierten WebP-Dateien – Next.js erzeugt AVIF und WebP selbst
   und liefert jedem Gerät nur die Breite, die es braucht.

   fokus: welcher Bildpunkt beim Beschnitt sichtbar bleibt (wie object-position).
          Handys beschneiden deutlich schmaler als der Desktop.
          "50% 50%" = Mitte, "30% 50%" = links, "50% 25%" = oben.

   variante: CI-Grafik, die erscheint, solange kein Foto hinterlegt ist.

   Die vier Baustein-Motive der Vorfassung entfallen: die Leistungsfelder
   arbeiten mit eigenen Symbolen statt mit Fotos.
   ═══════════════════════════════════════════════════════════════════════════ */

type Variante = "wave" | "grid" | "orbit" | "stack";
type Motiv = { src?: string; fokus: string; variante: Variante };

const BILDER = {
  /* Datei: motive/hero.jpg · Querformat 16:9
     Moderne Architektur: Glasfassade, Atrium, Hochhausperspektive, kühles
     Licht oder Dämmerung. Linke Bildhälfte ruhig – dort liegt die Überschrift.
     Der dunkelblaue Farbschleier liegt immer darüber. */
  hero: { src: "/motive/hero.jpg", fokus: "55% 55%", variante: "wave" },

  /* Datei: motive/phase-analyse.jpg · Hochformat 4:5
     Workshop: Menschen am Tisch, Notizen, konzentrierte Gesprächssituation. */
  phaseAnalyse: { src: undefined, fokus: "50% 40%", variante: "orbit" },

  /* Datei: motive/phase-architektur.jpg · Hochformat 4:5
     Planung: Skizzen, Whiteboard, Struktur auf dem Tisch. */
  phaseArchitektur: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Datei: motive/phase-umsetzung.jpg · Hochformat 4:5
     Team in Bewegung, Arbeit an Bildschirmen, Besprechung im Stehen. */
  phaseUmsetzung: { src: undefined, fokus: "50% 45%", variante: "wave" },

  /* Datei: motive/phase-betrieb.jpg · Hochformat 4:5
     Jemand präsentiert Ergebnisse auf einem Bildschirm, ruhige Selbstverständlichkeit.
     Zusammenarbeit, kein Abschied. */
  phaseBetrieb: { src: undefined, fokus: "50% 40%", variante: "stack" },

  /* Datei: motive/haltung.jpg · Hochformat 4:5
     Architektonische Präzision: klare Linien, Symmetrie, Betonkanten, Fluchten. */
  haltung: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Dateien: motive/perspektive-kennzahlen.jpg, perspektive-suche.jpg,
     perspektive-umsetzung.jpg · Querformat 16:10 · ruhige, thematische Motive. */
  perspektiveKennzahlen: { src: undefined, fokus: "50% 50%", variante: "stack" },
  perspektiveSuche: { src: undefined, fokus: "50% 50%", variante: "orbit" },
  perspektiveUmsetzung: { src: undefined, fokus: "50% 50%", variante: "grid" },

  /* Datei: motive/kontakt.jpg · Hochformat oder quadratisch
     Heller, moderner Besprechungsraum, gern leer – bereit für das Gespräch. */
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
  { wert: "7", einheit: "Leistungsfelder", text: "Strategie, Marketing, Sichtbarkeit, Conversion, Plattformen, KI und Daten." },
  { wert: "4", einheit: "Phasen", text: "Von der Analyse bis zur fortlaufenden Optimierung." },
  { wert: "1", einheit: "Partner", text: "Dauerhaft Teil Ihres Unternehmens." },
];

/* Die sieben Knoten des Hero-Instruments – in der Reihenfolge im Uhrzeigersinn ab 12 Uhr. */
const instrumentKnoten = ["Strategie", "Marketing", "Sichtbarkeit", "Conversion", "Plattformen", "KI", "Daten"];

const laufband = [
  "Digitale Strategie", "Performance-Marketing", "Google Ads", "Sichtbarkeit in Google",
  "Sichtbarkeit in KI-Suche", "Conversion-Optimierung", "Websites & Plattformen", "Softwareentwicklung", "KI-Agenten",
  "Prozess-Automatisierung", "Tracking-Architektur", "Dashboards & Reporting", "Consulting",
];

/* Der Leitgedanke wird beim Scrollen Wort für Wort aufgehellt.
   Hervorgehobene Wörter stehen in *Sternchen*. */
const leitgedanke =
  "Performance ist kein Kanal und keine Kampagne. Sie entsteht, wenn *Strategie,* *Sichtbarkeit,* *Website,* *Software,* *KI* und *Daten* als ein System arbeiten – und jede Maßnahme sich an dem messen lässt, was am Ende zählt: *Umsatz.*";

/* Jede Zeile ist ein Paar: derselbe Bereich vorher und nachher. */
const wandel = [
  {
    bereich: "Sichtbarkeit",
    heute: "Gefunden wird, wer zufällig gut rankt. Neue Suchwege wie KI-Antworten bleiben unbeachtet.",
    danach: "Eine Inhaltsarchitektur, die Sie dort sichtbar macht, wo Ihre Kunden suchen – in Google und in KI-Antworten.",
  },
  {
    bereich: "Marketing",
    heute: "Budgets folgen Bauchgefühl oder Klickzahlen. Was davon zu Aufträgen wird, weiß niemand genau.",
    danach: "Jeder Euro wird nach Anfragen, Aufträgen und Umsatz gesteuert.",
  },
  {
    bereich: "Website",
    heute: "Die Website informiert, aber sie verkauft nicht. Besucher kommen – und gehen wieder.",
    danach: "Eine Website, die Besucher systematisch zu qualifizierten Anfragen führt.",
  },
  {
    bereich: "Abläufe",
    heute: "Wiederkehrende Arbeit bindet Ihr Team. Standardsoftware bildet die eigenen Abläufe nur teilweise ab.",
    danach: "Software und KI-Agenten übernehmen, was sich wiederholt. Ihr Team gewinnt Zeit für das Wesentliche.",
  },
  {
    bereich: "Steuerung",
    heute: "Daten liegen verteilt in Systemen. Entscheidungen beruhen vor allem auf Erfahrung.",
    danach: "Ein gemeinsames Kennzahlensystem – vom ersten Kontakt bis zum Umsatz.",
  },
];

type SymbolArt = "kompass" | "ziel" | "lupe" | "trichter" | "fenster" | "knoten" | "kurve";

type Leistungsfeld = {
  nr: string;
  titel: string;
  wirkung: string;
  text: string;
  punkte: string[];
  symbol: SymbolArt;
  /* Unterseite, sobald sie existiert – z. B. "/leistungen/performance-marketing". */
  pfad?: string;
};

const leistungsfelder: Leistungsfeld[] = [
  {
    nr: "01",
    titel: "Strategie & Consulting",
    wirkung: "Richtung",
    text: "Ein Zielbild mit klaren Prioritäten und Kennzahlen – die Grundlage, auf der jede Maßnahme ihren Beitrag zum Umsatz nachweisen muss.",
    punkte: ["Zielbild & Roadmap", "Kennzahlen-Architektur", "Steuerung & Governance"],
    symbol: "kompass",
  },
  {
    nr: "02",
    titel: "Performance-Marketing",
    wirkung: "Nachfrage",
    text: "Bezahlte Reichweite in Suchmaschinen und sozialen Netzwerken – gesteuert nach Anfragen und Aufträgen, nicht nach Klicks.",
    punkte: ["Google Ads & Suchmaschinenwerbung", "Paid Social & B2B-Kampagnen", "Budget- und Gebotssteuerung"],
    symbol: "ziel",
  },
  {
    nr: "03",
    titel: "Organische Sichtbarkeit",
    wirkung: "Sichtbarkeit",
    text: "Gefunden werden, wenn Kunden suchen – in Google und zunehmend in KI-Antworten. Als Inhaltsarchitektur, die mit jeder Seite stärker wird.",
    punkte: ["Technische Grundlagen & Seitenarchitektur", "Content-Systeme", "Sichtbarkeit in KI-Suche"],
    symbol: "lupe",
  },
  {
    nr: "04",
    titel: "Conversion-Optimierung",
    wirkung: "Anfragen",
    text: "Mehr Anfragen aus denselben Besuchern: Seiten, Formulare und Nutzerführung werden gemessen, getestet und laufend verbessert.",
    punkte: ["Landingpages & Nutzerführung", "A/B-Tests", "Formular- und Funnel-Optimierung"],
    symbol: "trichter",
  },
  {
    nr: "05",
    titel: "Websites, Plattformen & Software",
    wirkung: "Plattformen",
    text: "Websites, die verkaufen. Und Software für die Abläufe, für die es keine passende Standardlösung gibt.",
    punkte: ["Conversion-orientierte Websites", "Plattformen & Apps", "Interne Softwarelösungen"],
    symbol: "fenster",
  },
  {
    nr: "06",
    titel: "KI & Automatisierung",
    wirkung: "Effizienz",
    text: "KI-Agenten und automatisierte Abläufe, die wiederkehrende Arbeit übernehmen – eingebettet in Ihre Prozesse, nicht daneben.",
    punkte: ["KI-Agenten im Betrieb", "Prozess-Automatisierung", "KI-Governance"],
    symbol: "knoten",
  },
  {
    nr: "07",
    titel: "Daten, Tracking & Steuerung",
    wirkung: "Steuerung",
    text: "Eine saubere Datenbasis vom ersten Kontakt bis zum Auftrag. Damit Entscheidungen auf Zahlen beruhen statt auf Vermutungen.",
    punkte: ["Tracking-Architektur", "Dashboards & Reporting", "CRM-Anbindung"],
    symbol: "kurve",
  },
];

type Phase = {
  nr: string;
  titel: string;
  stufe: string;
  text: string;
  ergebnis: string;
  bild: Motiv;
};

const phasen: Phase[] = [
  {
    nr: "01",
    titel: "Analyse & Potenzial",
    stufe: "Verstehen",
    text: "Wir erfassen, wo Ihr Unternehmen heute Umsatz gewinnt – und wo es ihn verliert: Sichtbarkeit, Marketing, Website, Abläufe und Daten.",
    ergebnis: "Ein Zielbild mit Prioritäten, geordnet nach Wirkung.",
    bild: BILDER.phaseAnalyse,
  },
  {
    nr: "02",
    titel: "Architektur & Plan",
    stufe: "Strukturieren",
    text: "Wir legen die Struktur fest: welche Kanäle, welche Systeme, welches Kennzahlensystem – und wer wofür verantwortlich ist.",
    ergebnis: "Ein dokumentierter Plan, auf dem jede Maßnahme aufbaut.",
    bild: BILDER.phaseArchitektur,
  },
  {
    nr: "03",
    titel: "Umsetzung",
    stufe: "Umsetzen",
    text: "Kampagnen, Website, Software und KI-Anwendungen gehen kontrolliert live – eingebettet in Ihre Prozesse und vom ersten Tag an gemessen.",
    ergebnis: "Produktive Systeme statt Pilotprojekte.",
    bild: BILDER.phaseUmsetzung,
  },
  {
    nr: "04",
    titel: "Messen, Optimieren, Skalieren",
    stufe: "Fortlaufend",
    text: "Was wirkt, wird ausgebaut. Was nicht wirkt, wird ersetzt. Wir messen, lernen und verbessern – und bleiben dauerhaft Teil Ihres Unternehmens.",
    ergebnis: "Ein System, das mit jeder Optimierung stärker wird.",
    bild: BILDER.phaseBetrieb,
  },
];

/* Der Scroll-Fortschritt (0 bis 1) wird gleichmäßig auf die Phasen verteilt. */
function phaseFuerAnteil(p: number) {
  return Math.min(phasen.length - 1, Math.floor(p * phasen.length));
}

/* Kennzahlenkette: von der Sichtbarkeit bis zum Umsatz.
   breite ist rein grafisch (Trichterform) und stellt keine Messwerte dar. */
const kennzahlen = [
  { stufe: "Sichtbarkeit", misst: "Rankings, Impressionen, Präsenz in KI-Antworten", breite: 1 },
  { stufe: "Besuche", misst: "Qualifizierte Besucher je Kanal", breite: 0.8 },
  { stufe: "Anfragen", misst: "Formulare, Anrufe, Terminbuchungen", breite: 0.6 },
  { stufe: "Aufträge", misst: "Abschlüsse und Auftragswert", breite: 0.42 },
  { stufe: "Umsatz", misst: "Umsatz, Deckungsbeitrag, Kosten je Auftrag", breite: 0.28 },
];

const messprinzipien = [
  { titel: "Ziele vor Maßnahmen.", text: "Erst steht fest, welche Kennzahl sich bewegen soll. Dann wird entschieden, womit." },
  { titel: "Ein Cockpit statt vieler Reports.", text: "Alle Kanäle in einer Logik – damit sichtbar wird, welche Maßnahme welchen Beitrag leistet." },
  { titel: "Einwilligung zuerst.", text: "Gemessen wird im Einklang mit der DSGVO. Vertrauen ist selbst eine Kennzahl." },
];

const prinzipien = [
  { titel: "Wirkung vor Aktivität.", text: "Wir messen uns an Anfragen, Aufträgen und Umsatz – nicht an Stunden, Reichweite oder Klicks." },
  { titel: "Umsetzung, nicht Empfehlung.", text: "Wir bauen, was wir planen. Strategie ohne Umsetzung bleibt eine Präsentation." },
  { titel: "Partnerschaft, kein Projekt.", text: "Projekte enden. Wachstum nicht – deshalb bleiben wir dauerhaft Teil Ihres Unternehmens." },
];

const branchen = [
  "Maschinen- und Anlagenbau", "Handel & E-Commerce", "Logistik & Transport",
  "Handwerk & Bau", "Beratung & Kanzleien", "Gesundheitswesen",
  "Finanzdienstleistung", "Immobilienwirtschaft", "Energie & Versorgung",
  "Bildung & Weiterbildung", "Industriegüter", "Öffentlicher Sektor",
];

const perspektiven: { kicker: string; titel: string; text: string; bild: Motiv; pfad?: string }[] = [
  {
    kicker: "Analyse",
    titel: "Warum Klicks keine Kennzahl sind",
    text: "Performance beginnt dort, wo Marketing an Anfragen und Umsatz gemessen wird – nicht an Reichweite.",
    bild: BILDER.perspektiveKennzahlen,
  },
  {
    kicker: "Leitfaden",
    titel: "Sichtbar in Google und in KI-Antworten",
    text: "Wie sich die Suche verändert – und was das für die Inhaltsarchitektur mittelständischer Unternehmen bedeutet.",
    bild: BILDER.perspektiveSuche,
  },
  {
    kicker: "Standpunkt",
    titel: "Strategie ohne Umsetzung bleibt eine Präsentation",
    text: "Warum digitale Wirkung erst entsteht, wenn Planung, Umsetzung und Messung in einer Hand liegen.",
    bild: BILDER.perspektiveUmsetzung,
  },
];

/* Häufige Fragen – erscheinen sichtbar auf der Seite und als JSON-LD.
   Antworten so formulieren, dass sie auch ohne die Frage verständlich sind:
   KI-Suchsysteme zitieren gern einzelne Absätze. */
const fragen = [
  {
    frage: "Was bedeutet performance-getrieben bei Ladouz Digital?",
    antwort: "Jede Maßnahme – ob Kampagne, Website, Software oder KI-Anwendung – wird an ihrer Wirkung gemessen: an Sichtbarkeit, Anfragen, Aufträgen und Umsatz. Was nicht wirkt, wird verbessert oder ersetzt.",
  },
  {
    frage: "Für welche Unternehmen arbeitet Ladouz Digital?",
    antwort: "Für mittelständische Unternehmen, die digitales Wachstum als dauerhafte Aufgabe verstehen – branchenübergreifend. Entscheidend ist die Struktur der Wertschöpfung, nicht das Etikett der Branche.",
  },
  {
    frage: "Arbeiten Sie projektweise oder dauerhaft?",
    antwort: "Dauerhaft. Wir bauen die Grundlage gemeinsam mit Ihnen auf und bleiben danach Teil Ihres Unternehmens: Wir steuern mit, messen und entwickeln weiter.",
  },
  {
    frage: "Übernehmen Sie auch die Umsetzung?",
    antwort: "Ja. Wir planen nicht nur, wir setzen um – Kampagnen, Websites, Software, KI-Anwendungen und Tracking aus einer Hand.",
  },
  {
    frage: "Wie wird der Erfolg gemessen?",
    antwort: "Über ein gemeinsames Kennzahlensystem, das alle Kanäle verbindet – vom ersten Kontakt bis zum Auftrag. So wird sichtbar, welche Maßnahme welchen Beitrag zum Umsatz leistet.",
  },
  {
    frage: "Wie beginnt eine Zusammenarbeit?",
    antwort: "Mit einer Erstberatung. Darin klären wir, wo Ihr Unternehmen heute steht und ob eine Zusammenarbeit zu Ihnen passt – unverbindlich und konkret.",
  },
];

/* ══════════════════════════ Strukturierte Daten ══════════════════════════ */

const strukturDaten = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#unternehmen`,
      name: "Ladouz Digital",
      url: SITE,
      logo: `${SITE}/logo-navy.png`,
      email: MAIL,
      telephone: TEL_LINK,
      description: "Performance-getriebene digitale Dienstleistungen und Consulting für den Mittelstand.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Markt 40",
        postalCode: "53721",
        addressLocality: "Siegburg",
        addressCountry: "DE",
      },
      areaServed: { "@type": "Country", name: "Deutschland" },
      founder: { "@type": "Person", name: "Nizar Ladouz" },
      knowsAbout: leistungsfelder.map((l) => l.titel),
      slogan: "Präzise gedacht. Präzise umgesetzt.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#fragen`,
      mainEntity: fragen.map((f) => ({
        "@type": "Question",
        name: f.frage,
        acceptedAnswer: { "@type": "Answer", text: f.antwort },
      })),
    },
  ],
};

/* "<" maskieren, damit kein Inhalt das Script-Tag vorzeitig schließen kann. */
const strukturDatenJson = JSON.stringify(strukturDaten).replace(/</g, "\\u003c");

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

/* Fortschrittsbalken direkt am DOM-Knoten statt über State.
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

/* Scroll-Fortschritt eines Bereichs als CSS-Variable --p (0 bis 1).
   Kein React-State: es wird nichts neu gerendert, nur eine Variable gesetzt. */
function useScrollVariable<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    let ticking = false;
    const messen = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const weg = r.height - vh;
      const p = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : r.top < vh * 0.5 ? 1 : 0;
      el.style.setProperty("--p", p.toFixed(4));
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
  return ref;
}

/* Zeigerposition als CSS-Variablen am Element (für Licht- und Tiefeneffekte).
   Nur bei Maus/Trackpad – auf Touch-Geräten gibt es keinen Hover. */
function setzeZeiger(e: ReactPointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
  el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
  el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
}

/* ══════════════════════════ Bausteine ══════════════════════════ */

/* as="li": direkt als Listeneintrag rendern. Ein <div> zwischen <ul> und
   <li> ist ungültiges HTML – Screenreader zählen die Liste dann falsch. */
function Reveal({
  children, delay = 0, className = "", as: Tag = "div",
}: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={(el: HTMLElement | null) => { ref.current = el; }}
      className={`ld-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
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

/* Die Bildmarke „l." aus dem Logo – als SVG, damit sie in jeder Größe scharf ist.
   Maße aus der Originalgrafik: Strich 7 × 34, Punkt Ø 11.
   hell = für helle Flächen (Strich navy, Punkt blau),
   sonst für dunkle Flächen (Strich weiß, Punkt Logo-Silber). */
function Marke({ hell = false, className = "" }: { hell?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 23 34" className={className} aria-hidden>
      <rect width="7" height="34" fill={hell ? "#0b1233" : "#ffffff"} />
      <circle cx="17" cy="28.5" r="5.5" fill={hell ? "#2f5bd7" : "#adbbd1"} />
    </svg>
  );
}

/* Buttons als Pille.
   primary: Signatur-Button mit Bildmarke, Verlauf und feinem Außenring.
            auf="hell"   → dunkle Pille (Navy → Blau) für helle Flächen
            auf="dunkel" → helle Pille für dunkle Flächen (Hero, Kontakt, Newsletter)
   ghost:   Kontur-Pille für dunkle Flächen, dark: Kontur-Pille für helle Flächen. */
function CtaButton({
  href, children, variant = "primary", auf = "hell", className = "", submit = false, disabled,
}: {
  href?: string; children: ReactNode; variant?: "primary" | "ghost" | "dark"; auf?: "hell" | "dunkel";
  className?: string; submit?: boolean; disabled?: boolean;
}) {
  const base = "ld-btn group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-[15px] text-[15px] font-medium tracking-[-0.005em] transition-[background-color,background-position,border-color,color,transform,box-shadow] duration-500 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0";
  const styles = {
    primary: `ld-pill ${auf === "dunkel" ? "ld-pill-dunkel" : "ld-pill-hell"}`,
    ghost: "border border-white/40 text-white hover:border-white hover:bg-white/10",
    dark: "border border-[#131f5c]/70 text-[#131f5c] hover:border-[#131f5c] hover:bg-[#131f5c] hover:text-white",
  }[variant];

  const inner = variant === "primary" ? (
    <>
      <Marke hell={auf === "dunkel"} className="relative z-10 h-[19px] w-auto flex-none" />
      <span className="relative z-10">{children}</span>
      {!disabled && <span aria-hidden className="ld-sweep" />}
    </>
  ) : (
    <>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
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

  /* Positionierung kommt vom Aufrufer. Ein fest gesetztes `relative`
     würde ein übergebenes `absolute inset-0` je nach CSS-Reihenfolge
     überstimmen – die Fläche fiele auf null Höhe zusammen. */
  const pos = /(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative";

  if (motiv.src) {
    return (
      <div className={`${pos} overflow-hidden bg-[#0b1233] ${className}`}>
        <Image
          src={motiv.src}
          alt={alt}
          fill
          /* Next.js 16: "priority" ist veraltet. Laut Doku für das LCP-Bild
             fetchPriority="high" und loading="eager" verwenden. */
          {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: strukturDatenJson }} />
      <div className="min-h-screen bg-[#f7f9fc] text-[#0b1233] antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]">
        <a href="#main" className="ld-skip">Zum Inhalt springen</a>
        <Kopfbereich />
        <main id="main">
          <Hero />
          <Laufband />
          <Leitgedanke />
          <Wandel />
          <Leistungsfelder />
          <Programm />
          <Messbarkeit />
          <Haltung />
          <Branchen />
          <Perspektiven />
          <Fragen />
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
            <Image src="/logo-white.png" alt="ladouz.digital" fill loading="eager" sizes="70px" className={`object-contain object-left transition-opacity duration-300 ${dunkel ? "opacity-100" : "opacity-0"}`} />
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

            <a href={BOOKING_URL} target="_blank" rel="noopener" className={`ld-btn ld-pill group relative hidden items-center gap-2.5 overflow-hidden rounded-full px-5 py-[9px] text-[14px] font-medium tracking-[-0.005em] transition-[background-position,transform,color] duration-500 hover:-translate-y-0.5 sm:inline-flex ${dunkel ? "ld-pill-dunkel" : "ld-pill-hell"}`}>
              <Marke hell={dunkel} className="relative z-10 h-[15px] w-auto flex-none" />
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
            <a href={BOOKING_URL} target="_blank" rel="noopener" onClick={close} className="ld-pill ld-pill-hell my-5 inline-flex items-center justify-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-medium">
              <Marke className="h-[17px] w-auto flex-none" />
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
   Rechts das Performance-Instrument: sieben Leistungsfelder, die in ein
   gemeinsames Ziel laufen. Reines SVG, bewegt nur über CSS.
   Die H1 trägt keine Animation: sie ist das LCP-Element.
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  const heroFoto: string | undefined = BILDER.hero.src;
  return (
    <section id="top" onPointerMove={setzeZeiger} className="relative isolate overflow-hidden bg-[#0b1233] text-white">
      <div className="absolute inset-0 -z-20">
        {/* Der bisherige Hintergrund bleibt immer bestehen (CI-Grafik + Farbschleier).
            Ist ein Foto hinterlegt, scheint es nur leicht durch und zoomt sehr langsam. */}
        <Visual motiv={{ ...BILDER.hero, src: undefined }} sizes="100vw" flat className="h-full w-full" />
        {heroFoto && (
          <div aria-hidden className="ld-hero-foto absolute inset-0 overflow-hidden">
            <Image
              src={heroFoto}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              style={{ objectPosition: BILDER.hero.fokus }}
              className="ld-hero-zoom object-cover"
            />
          </div>
        )}
      </div>
      <span aria-hidden className="ld-hero-veil absolute inset-0 -z-10" />
      <span aria-hidden className="ld-hero-fuss absolute inset-x-0 bottom-0 -z-10 h-2/5" />

      <div className="mx-auto flex max-w-[1240px] flex-col justify-end px-6 pt-[108px] sm:min-h-[clamp(680px,94svh,1000px)] sm:pt-[clamp(150px,20vh,220px)]">
        <div className="grid items-center gap-10 pb-12 sm:pb-[clamp(56px,8vh,96px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-6">
          <div>
            <p className="flex items-start gap-4">
              <span aria-hidden className="ld-rule mt-[0.55em] block h-px w-10 flex-none bg-[#8dc63f]" />
              <span className="ld-enter ld-d1 flex flex-wrap gap-x-[0.9em] gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#9fc65f] sm:text-[0.72rem] sm:tracking-[0.3em]">
                <span>Für inhabergeführte Unternehmen</span>
              </span>
            </p>

            <h1 className="mt-6 text-[clamp(1.9rem,10vw,2.15rem)] sm:text-[clamp(2.15rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.044em] sm:mt-8">
              {/* Ab Tablet in einer Zeile; auf dem Handy darf das lange Wort am Bindestrich umbrechen. */}
              <span className="sm:whitespace-nowrap">Performance-Agenturdienste</span> für den Mittelstand{" "}
              <span className="ld-silber mt-3 block text-[0.62em] leading-[1.12] tracking-[-0.03em] sm:mt-4">Präzise gedacht. Präzise umgesetzt.</span>
            </h1>

            <p className="ld-serif ld-enter ld-d2 mt-5 max-w-[52ch] text-[1.02rem] leading-[1.58] text-[#c7d6f5] sm:mt-8 sm:text-[clamp(1.08rem,1.9vw,1.26rem)] sm:leading-[1.6]">
              Performance-getriebene digitale Dienstleistungen und Consulting für den Mittelstand –
              von Strategie und Marketing über Website, Software und KI bis zur Steuerung über Daten.
              Gemessen an dem, was zählt: Anfragen, Aufträge, Umsatz, Verbesserung und Kundenzufriedenheit.
              <span className="hidden sm:inline"> Und wir streben eine dauerhafte Partnerschaft mit Ihrem Unternehmen an.</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <CtaButton href={BOOKING_URL} auf="dunkel">Erstberatung vereinbaren</CtaButton>
              <CtaButton href="#leistungen" variant="ghost">Leistungsfelder ansehen</CtaButton>
            </div>
          </div>

          <HeroInstrument />
        </div>

        {/* Kacheln im Stil des Signatur-Buttons: Glasfläche mit Verlauf,
            feiner Außenring mit Abstand, Lichtkante oben. */}
        <ul className="ld-enter ld-d4 grid gap-5 pb-10 md:grid-cols-3 md:gap-6 sm:pb-14">
          {heroFakten.map((f) => (
            <li key={f.einheit} className="ld-kachel group relative flex items-start gap-5 rounded-[22px] p-6 sm:p-7">
              <span className="ld-num ld-kachel-zahl text-[2.9rem] font-semibold leading-[0.9] tracking-[-0.04em]">{f.wert}</span>
              <span className="min-w-0 pt-1">
                <span className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9fc65f]">
                  {f.einheit}
                </span>
                <span className="ld-serif mt-2 block text-[0.94rem] leading-[1.5] text-[#aebbdc]">{f.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Das Instrument liest --mx/--my vom Hero (Zeigerposition) und
   verschiebt sich leicht gegenläufig – ein ruhiger Tiefeneffekt. */
function HeroInstrument() {
  const C = 280;
  const R = 214;
  const KERN = 80;
  /* Ein Takt pro Feld: Der Lichtpunkt erreicht alle TAKT Sekunden das nächste
     Feld, das Feld leuchtet auf und schickt einen Impuls ins Ziel.
     Sieben Felder × TAKT = eine volle Umdrehung. Immer nur ein Impuls zugleich. */
  const TAKT = 3;
  const UMLAUF = TAKT * instrumentKnoten.length;
  /* Schweif des Lichtpunkts: 60° Bogen hinter dem Kopf (Kopf steht bei 12 Uhr). */
  const sx = C - R * Math.cos(Math.PI / 6);
  const sy = C - R * Math.sin(Math.PI / 6);
  const knoten = instrumentKnoten.map((label, i) => {
    const w = (i / instrumentKnoten.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      x: C + Math.cos(w) * R, y: C + Math.sin(w) * R,
      ix: C + Math.cos(w) * (KERN + 4), iy: C + Math.sin(w) * (KERN + 4),
    };
  });

  return (
    <div aria-hidden className="ld-instrument ld-enter ld-d3 relative hidden aspect-square w-full max-w-[500px] justify-self-end lg:block">
      <svg viewBox="0 0 560 560" className="h-full w-full overflow-visible" style={{ "--umlauf": `${UMLAUF}s`, "--takt": `${TAKT}s` } as CSSProperties}>
        <defs>
          <radialGradient id="ld-hof">
            <stop offset="0%" stopColor="#2f5bd7" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#131f5c" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#070d24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ld-kernglanz">
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#8dc63f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ld-schweif" gradientUnits="userSpaceOnUse" x1={sx} y1={sy} x2={C} y2={C - R}>
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0" />
            <stop offset="100%" stopColor="#8dc63f" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Hof: trennt das Instrument ruhig vom Hintergrundmotiv. */}
        <circle cx={C} cy={C} r="290" fill="url(#ld-hof)" />

        {/* Skala: 72 Teilstriche, jeder sechste länger. */}
        {Array.from({ length: 72 }).map((_, t) => {
          const w = (t / 72) * Math.PI * 2;
          const lang = t % 6 === 0;
          const a = lang ? 240 : 246;
          return (
            <line
              key={t}
              x1={C + Math.cos(w) * a} y1={C + Math.sin(w) * a}
              x2={C + Math.cos(w) * 254} y2={C + Math.sin(w) * 254}
              stroke={lang ? "rgba(255,255,255,.42)" : "rgba(255,255,255,.16)"} strokeWidth="1"
            />
          );
        })}

        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1" />

        {/* Ruhende Innenringe – bewegt ist nur noch das Rad. */}
        <circle cx={C} cy={C} r="160" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx={C} cy={C} r="122" fill="none" stroke="#4b7ce8" strokeOpacity=".45" strokeWidth="1" strokeDasharray="1 6" />

        {/* Verbindungen und Impulse: Ein Impuls startet, wenn der Lichtpunkt sein Feld erreicht. */}
        {knoten.map((k, i) => (
          <g key={k.label}>
            <line x1={k.x} y1={k.y} x2={k.ix} y2={k.iy} stroke="rgba(255,255,255,.14)" strokeWidth="1" />
            <line
              x1={k.x} y1={k.y} x2={k.ix} y2={k.iy}
              className="ld-puls" stroke="#8dc63f" strokeWidth="2.2" strokeLinecap="round"
              style={{ animationDelay: `${i * TAKT}s` }}
            />
          </g>
        ))}

        {/* Das Rad: ein Lichtpunkt mit Schweif umrundet die sieben Felder im Uhrzeigersinn. */}
        <g className="ld-rot ld-rad">
          <path d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${C} ${C - R}`} fill="none" stroke="url(#ld-schweif)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={C} cy={C - R} r="12" fill="#8dc63f" fillOpacity=".18" />
          <circle cx={C} cy={C - R} r="5" fill="#b6e57a" />
        </g>

        {/* Kern */}
        <circle cx={C} cy={C} r="118" fill="url(#ld-kernglanz)" className="ld-kern" />
        <circle cx={C} cy={C} r={KERN} fill="#0b1233" stroke="#8dc63f" strokeOpacity=".6" strokeWidth="1.5" />
        <circle cx={C} cy={C} r={KERN - 10} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
        <text x={C} y={C - 12} textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="3.5" fill="#9fc65f">ZIEL</text>
        <text x={C} y={C + 18} textAnchor="middle" fontSize="26" fontWeight="500" letterSpacing="-0.5" fill="#ffffff">Wachstum</text>

        {/* Knoten */}
        {knoten.map((k, i) => (
          <g key={`n-${k.label}`} transform={`translate(${k.x} ${k.y})`}>
            <rect x="-68" y="-20" width="136" height="40" rx="20" fill="rgba(11,18,51,.86)" stroke="rgba(255,255,255,.22)" strokeWidth="1" />
            <rect
              x="-68" y="-20" width="136" height="40" rx="20"
              className="ld-knoten-an" fill="rgba(141,198,63,.14)" stroke="#8dc63f" strokeWidth="1.5"
              style={{ animationDelay: `${i * TAKT}s` }}
            />
            <circle cx="-47" cy="0" r="4" fill="#8dc63f" />
            <text x="8" y="5.5" textAnchor="middle" fontSize="16" fontWeight="500" fill="#dfe7f8">{k.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════ Laufband ══════════════════════════
   Zwei identische Listen nebeneinander, um -50 % verschoben: eine nahtlose
   Endlosschleife ohne Skript. Die zweite Liste ist für Screenreader verborgen.
   ═══════════════════════════════════════════════════════════ */

function Laufband() {
  return (
    <section aria-label="Leistungsspektrum" className="relative overflow-hidden border-y border-white/10 bg-[#0b1233] py-5">
      <div className="ld-band flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1 ? true : undefined} className="flex flex-none items-center">
            {laufband.map((t) => (
              <li key={t} className="flex items-center whitespace-nowrap pr-9 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#9aa8cc]">
                <span aria-hidden className="mr-9 block h-1.5 w-1.5 flex-none rounded-full bg-[#8dc63f]" />
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,#0b1233,transparent)]" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,#0b1233,transparent)]" />
    </section>
  );
}

/* ══════════════════════════ Leitgedanke ══════════════════════════
   Der Satz bleibt stehen, während man scrollt – Wort für Wort wird er
   aufgehellt. Gesteuert allein über --p und --i im CSS.
   Der vollständige Text steht immer im DOM (lesbar für Suchmaschinen).
   ═══════════════════════════════════════════════════════════ */

function Leitgedanke() {
  const ref = useScrollVariable<HTMLElement>();
  const woerter = leitgedanke.split(" ");
  const n = woerter.length;

  return (
    <section ref={ref} aria-label="Was Performance heißt" className="relative bg-white" style={{ height: "190vh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center px-6 pt-[74px]">
        <div className="mx-auto w-full max-w-[1192px]">
          <Eyebrow>Was Performance heißt</Eyebrow>
          <p className="mt-8 max-w-[30ch] text-[clamp(1.85rem,4.3vw,3.5rem)] font-medium leading-[1.13] tracking-[-0.032em] text-[#0b1233]">
            {woerter.map((w, i) => {
              const hervor = w.startsWith("*");
              return (
                <span key={i} className={`ld-wort ${hervor ? "text-[#2f5bd7]" : ""}`} style={{ "--i": (i / n).toFixed(4) } as CSSProperties}>
                  {w.replace(/\*/g, "")}{i < n - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
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
    <section id="system" aria-labelledby="wandel-titel" className="bg-[#f7f9fc] px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1192px]">
        <Reveal>
          <Eyebrow>Ausgangslage und Ergebnis</Eyebrow>
          <h2 id="wandel-titel" className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
            Wo Wachstum heute verloren geht.
          </h2>
          <Lead>
            In den meisten Unternehmen fehlt nicht der Einsatz, sondern die Verbindung:
            Kanäle, Website, Systeme und Daten arbeiten nebeneinander statt miteinander.
          </Lead>
        </Reveal>

        <div className="mt-16">
          <div aria-hidden className="hidden grid-cols-[12rem_1fr_3.5rem_1fr] gap-x-8 border-b border-[#0b1233] pb-4 lg:grid">
            <span />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#5b6b8a]">Heute</span>
            <span />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#2f5bd7]">Mit einem Performance-System</span>
          </div>

          <ol>
            {wandel.map((w, i) => (
              <Reveal as="li" key={w.bereich} delay={i * 70} className="grid gap-x-8 gap-y-4 border-b border-[#e2e8f2] py-8 lg:grid-cols-[12rem_1fr_3.5rem_1fr] lg:items-center lg:py-9">
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#0b1233]">{w.bereich}</span>

                <p className="ld-serif text-[1.02rem] leading-[1.6] text-[#5b6b8a]">
                  <span className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#5b6b8a] lg:hidden" style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}>Heute</span>
                  {w.heute}
                </p>

                <span aria-hidden className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#0b1233] text-[15px] text-[#8dc63f] lg:flex">→</span>

                <p className="text-[1.12rem] font-medium leading-[1.45] tracking-[-0.012em] text-[#0b1233]">
                  <span className="mb-1 block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7] lg:hidden">Mit einem Performance-System</span>
                  {w.danach}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ Leistungsfelder ══════════════════════════
   Sieben Karten mit Lichtkegel, der dem Mauszeiger folgt (--x/--y). Strategie überspannt die volle Breite.
   Hat eine Karte einen `pfad`, wird sie vollflächig klickbar.
   ═══════════════════════════════════════════════════════════ */

function Leistungsfelder() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-titel" className="bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1192px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <Reveal>
            <Eyebrow>Leistungsfelder</Eyebrow>
            <h2 id="leistungen-titel" className="mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
              Sieben Leistungsfelder.<br />Ein Ziel: Wachstum.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="ld-serif max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.66] text-[#43507a]">
              Einzeln stark, zusammen ein System. Jedes Feld zahlt auf dieselbe Kennzahlenkette
              ein – und wird gemeinsam mit Ihrem Team dauerhaft weiterentwickelt.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {leistungsfelder.map((l, i) => (
            <Reveal as="li" key={l.nr} delay={i === 0 ? 0 : ((i - 1) % 3) * 90} className={`h-full ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}>
              <article
                onPointerMove={setzeZeiger}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#e7ecf5] bg-[#f7f9fc] p-8 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#d3ddef] hover:bg-white hover:shadow-[0_28px_64px_rgba(11,18,51,0.10)] sm:p-9"
              >
                <span aria-hidden className="ld-licht pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,#8dc63f,#2f5bd7)] transition-transform duration-500 group-hover:scale-x-100" />

                <div className={`relative flex flex-1 flex-col ${i === 0 ? "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-x-16" : ""}`}>
                <div className="flex flex-1 flex-col">
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 flex-none items-center justify-center rounded-[16px] bg-[#0b1233] text-[#8dc63f] transition-transform duration-500 group-hover:rotate-[-4deg]">
                    <Symbol art={l.symbol} />
                  </span>
                  <span className="mt-1 rounded-full border border-[#dfe6f1] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#43507a]">
                    Hebel: {l.wirkung}
                  </span>
                </div>

                <span className="ld-num relative mt-9 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">Feld {l.nr}</span>
                <h3 className="relative mt-2.5 text-[1.4rem] font-medium leading-[1.2] tracking-[-0.024em] text-[#0b1233]">
                  {l.pfad ? <a href={l.pfad} className="after:absolute after:inset-0 after:content-['']">{l.titel}</a> : l.titel}
                </h3>
                <p className="ld-serif relative mt-3.5 flex-1 text-[1rem] leading-[1.64] text-[#43507a]">{l.text}</p>
                </div>
                <div>
                <ul className={`relative mt-7 grid gap-2.5 border-t border-[#e2e8f2] pt-6 ${i === 0 ? "lg:mt-0" : ""}`}>
                  {l.punkte.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[0.92rem] text-[#43507a]">
                      <span aria-hidden className="block h-1.5 w-1.5 flex-none rounded-full bg-[#8dc63f]" />
                      {p}
                    </li>
                  ))}
                </ul>
                {l.pfad && (
                  <span aria-hidden className="relative mt-7 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1233]">
                    Mehr erfahren <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                )}
                </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Linien-Symbole für die Leistungsfelder, 24er-Raster, Strichstärke 1.6. */
function Symbol({ art }: { art: SymbolArt }) {
  const pfade: Record<SymbolArt, ReactNode> = {
    kompass: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5 13.6 13.6 8.5 15.5 10.4 10.4Z" /></>),
    ziel: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /><path d="M21 3l-7.6 7.6M21 3h-3.5M21 3v3.5" /></>),
    lupe: (<><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5M8 10.5h5M10.5 8v5" /></>),
    trichter: (<><path d="M3.5 4.5h17l-6.5 8v6.5l-4 1.5v-8z" /></>),
    fenster: (<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 13.5h4M8 16.5h7" /></>),
    knoten: (<><circle cx="12" cy="12" r="2.6" /><circle cx="5" cy="5.5" r="1.8" /><circle cx="19" cy="5.5" r="1.8" /><circle cx="12" cy="20.2" r="1.8" /><path d="M6.4 6.8 10 10M17.6 6.8 14 10M12 14.6v3.8" /></>),
    kurve: (<><path d="M3 20.5h18" /><path d="M4 16l5-5 4 3 7-8" /><path d="M16 6h4v4" /></>),
  };
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {pfade[art]}
    </svg>
  );
}

/* ══════════════════════════ Vorgehen ══════════════════════════
   Desktop: die Sektion wird beim Scrollen angeheftet. Das Zifferblatt
   füllt sich über vier Phasen, Bild und Text wechseln mit. In der
   letzten Phase – fortlaufend – zeigt es ∞.

   Smartphone: ein kompaktes Zifferblatt bleibt oben angeheftet,
   während die Phasen darunter durchlaufen.

   Beide schreiben den Fortschritt als CSS-Variable (--p) direkt ans DOM.
   React rendert nur beim Phasenwechsel neu.
   ═══════════════════════════════════════════════════════════ */

function Programm() {
  return (
    <section id="framework" aria-labelledby="programm-titel" className="relative bg-[#0b1233] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 88% 4%, rgba(47,91,215,.30), transparent 65%)" }} />

      <div className="relative mx-auto max-w-[1240px] px-6 pt-[clamp(88px,11vw,140px)]">
        <Reveal>
          <Eyebrow tone="light">Das Vorgehen</Eyebrow>
          <h2 id="programm-titel" className="mt-6 max-w-[20ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em]">
            Vier Phasen. Ein Kreislauf, der Ergebnisse erzeugt.
          </h2>
          <Lead tone="light">
            Jede Phase baut auf der vorherigen auf. Die letzte endet nicht: Messen, Optimieren
            und Skalieren laufen fortlaufend – so wird jede Maßnahme mit der Zeit wirksamer.
          </Lead>
        </Reveal>
      </div>

      <ProgrammSzene />
      <ProgrammMobil />
    </section>
  );
}

/* Gemeinsames Zifferblatt. Liest --p vom nächsten Vorfahren.
   Feinteilung in 40 Schritten, vier kräftige Marken an den Phasengrenzen. */
function Zifferblatt({ aktiv, klein = false }: { aktiv: number; klein?: boolean }) {
  const R = 104;
  const U = 2 * Math.PI * R;
  const letzte = aktiv === phasen.length - 1;

  return (
    <div className={`relative flex-none ${klein ? "h-[64px] w-[64px]" : "h-[240px] w-[240px]"}`}>
      <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
        <circle cx="120" cy="120" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={klein ? 9 : 2} />
        <circle
          cx="120" cy="120" r={R}
          fill="none" stroke="#8dc63f" strokeWidth={klein ? 10 : 2.5} strokeLinecap="round"
          className="ld-ring"
          style={{ ["--u" as string]: U.toFixed(2) }}
          transform="rotate(-90 120 120)"
        />
        {!klein && Array.from({ length: 40 }).map((_, t) => {
          const grenze = t % 10 === 0;
          const w = (t / 40) * Math.PI * 2 - Math.PI / 2;
          const innen = grenze ? 84 : 92;
          return (
            <line
              key={t}
              x1={120 + Math.cos(w) * innen} y1={120 + Math.sin(w) * innen}
              x2={120 + Math.cos(w) * 96} y2={120 + Math.sin(w) * 96}
              stroke={grenze ? "#8dc63f" : "rgba(255,255,255,.22)"} strokeWidth={grenze ? 2 : 1}
            />
          );
        })}
        <g className="ld-dial">
          <circle cx="120" cy={120 - R} r={klein ? 17 : 7} fill="#8dc63f" />
          {!klein && <circle cx="120" cy={120 - R} r="13" fill="#8dc63f" fillOpacity=".18" />}
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {!klein && (
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9aa8cc]">
            Phase {phasen[aktiv].nr}
          </span>
        )}
        <span
          key={aktiv}
          className={`ld-num ld-swap font-bold leading-none tracking-[-0.05em] ${klein ? "text-[1.05rem]" : "mt-1 text-[3.6rem]"}`}
        >
          {letzte ? "∞" : phasen[aktiv].nr}
        </span>
        {!klein && (
          <span className="mt-1.5 text-[0.72rem] text-[#8695bd]">{letzte ? "fortlaufend" : `von ${phasen[phasen.length - 1].nr}`}</span>
        )}
      </div>
    </div>
  );
}

/* Scroll-Fortschritt eines Containers messen, ohne jeden Frame neu zu rendern.
   bestimmePhase erhält den Anteil (0 bis 1) und liefert den Phasenindex. */
function useScrollPhase(bestimmePhase: (p: number, vh: number) => number) {
  const bereich = useRef<HTMLDivElement | null>(null);
  const [aktiv, setAktiv] = useState(0);
  const bestimme = useRef(bestimmePhase);

  useEffect(() => {
    bestimme.current = bestimmePhase;
  });

  useEffect(() => {
    let ticking = false;
    let letzte = -1;

    const messen = () => {
      ticking = false;
      const el = bereich.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return; // auf diesem Gerät ausgeblendet
      const vh = window.innerHeight;
      const weg = r.height - vh;
      const p = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      const phase = bestimme.current(p, vh);
      if (phase !== letzte) {
        letzte = phase;
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

  return { bereich, aktiv };
}

function ProgrammSzene() {
  const { bereich, aktiv } = useScrollPhase((p) => phaseFuerAnteil(p));
  const reduced = useReducedMotion();

  /* Klick auf eine Phase: an ihren Anfang scrollen. */
  const springen = (i: number) => {
    const el = bereich.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const weg = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + weg * (i / phasen.length + 0.02), behavior: reduced ? "auto" : "smooth" });
  };

  const ph = phasen[aktiv];

  return (
    <div ref={bereich} className="ld-buehne relative hidden lg:block" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center pt-[112px] pb-10">
        <div className="mx-auto grid h-full max-h-[680px] w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] gap-16 px-6">

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-10">
              <Zifferblatt aktiv={aktiv} />
              <dl className="min-w-0 space-y-6">
                <div>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9aa8cc]">Start</dt>
                  <dd className="mt-1.5 text-[1.08rem] font-medium leading-[1.35] text-[#c7d6f5]">Analyse Ihrer Ausgangslage</dd>
                </div>
                <div>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#9fc65f]">Ergebnis</dt>
                  <dd className="mt-1.5 text-[1.08rem] font-semibold leading-[1.35] text-white">Wachstum, das sich messen lässt</dd>
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
                    <span className={`text-[0.8rem] transition-colors ${i === aktiv ? "text-[#c7d6f5]" : "text-[#8695bd]"}`}>{x.stufe}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

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
                Phase {ph.nr} · {ph.stufe}
              </p>
              <h3 className="mt-3 text-[clamp(1.7rem,2.6vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.03em]">{ph.titel}</h3>
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

/* Smartphone: angeheftetes Mini-Zifferblatt über den Phasenkarten.
   Aktiv ist jeweils die Karte, deren Oberkante die Bildschirmmitte passiert hat.
   Die Leiste hat einen deckenden Hintergrund statt Unschärfe-Effekt –
   backdrop-filter kostet beim Scrollen auf Mobilgeräten spürbar Leistung. */
function ProgrammMobil() {
  const karten = useRef<(HTMLLIElement | null)[]>([]);
  const { bereich, aktiv } = useScrollPhase((_, vh) => {
    let idx = 0;
    karten.current.forEach((k, i) => {
      if (k && k.getBoundingClientRect().top < vh * 0.55) idx = i;
    });
    return idx;
  });
  const ph = phasen[aktiv];

  return (
    <div ref={bereich} className="relative lg:hidden">
      <div className="sticky top-[74px] z-20 mt-10 border-y border-white/10 bg-[#0b1233]">
        <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-6 py-3">
          <Zifferblatt aktiv={aktiv} klein />
          <div className="min-w-0" aria-live="polite">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#9fc65f]">Phase {ph.nr} · {ph.stufe}</p>
            <p key={aktiv} className="ld-swap mt-1 truncate text-[1.02rem] font-semibold tracking-[-0.012em]">{ph.titel}</p>
          </div>
        </div>
      </div>

      <ol className="mx-auto max-w-[1240px] space-y-6 px-6 pt-8 pb-[clamp(72px,10vw,120px)]">
        {phasen.map((x, i) => (
          <li key={x.nr} ref={(el) => { karten.current[i] = el; }}>
            <article className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04]">
              <Visual motiv={x.bild} sizes="100vw" className="aspect-[4/3] w-full" />
              <div className="p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9fc65f]">Phase {x.nr} · {x.stufe}</p>
                <h3 className="mt-3 text-[1.5rem] font-medium leading-[1.15] tracking-[-0.026em]">{x.titel}</h3>
                <p className="ld-serif mt-3 text-[1rem] leading-[1.62] text-[#c7d6f5]">{x.text}</p>
                <p className="mt-6 border-t border-white/15 pt-4 text-[0.95rem] font-medium">
                  <span className="mr-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#9fc65f]">Ergebnis</span>
                  {x.ergebnis}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ══════════════════════════ Messbarkeit ══════════════════════════
   Die Kennzahlenkette als Trichter. Die Balken füllen sich beim
   Erscheinen; ihre Länge ist Gestaltung, keine Messung – das steht
   deshalb ausdrücklich daneben ("Schematisch").
   ═══════════════════════════════════════════════════════════ */

function Messbarkeit() {
  const letzte = kennzahlen.length - 1;
  return (
    <section id="messbarkeit" aria-labelledby="mess-titel" className="bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1192px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Messbarkeit</Eyebrow>
            <h2 id="mess-titel" className="mt-6 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
              Jede Maßnahme hat eine Kennzahl.
            </h2>
            <Lead>
              Wir berichten nicht über Aktivität, sondern über Wirkung. Dafür verbinden wir alle
              Kanäle in einem durchgängigen Kennzahlensystem – vom ersten Kontakt bis zum Auftrag.
            </Lead>

            <ol className="mt-12 border-t border-[#e7ecf5]">
              {messprinzipien.map((m, i) => (
                <li key={m.titel} className="grid gap-2 border-b border-[#e7ecf5] py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-5">
                  <span className="ld-num text-[0.78rem] font-semibold text-[#2f5bd7]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[1.12rem] font-medium tracking-[-0.018em] text-[#0b1233]">{m.titel}</h3>
                    <p className="ld-serif mt-1.5 text-[1rem] leading-[1.6] text-[#43507a]">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <figure className="relative overflow-hidden rounded-[26px] bg-[#0b1233] p-8 text-white sm:p-11">
              <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(47,91,215,.34), transparent 65%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(141,198,63,.10), transparent 70%)" }} />
              <figcaption className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9fc65f]">Kennzahlenkette</span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#9aa8cc]">Schematisch</span>
              </figcaption>

              <ol className="relative mt-9 space-y-6">
                {kennzahlen.map((k, i) => (
                  <li key={k.stufe}>
                    <p className="flex items-baseline gap-3">
                      <span className="ld-num text-[0.74rem] font-semibold text-[#8695bd]">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-[1.1rem] font-medium tracking-[-0.014em] ${i === letzte ? "text-white" : "text-[#dfe7f8]"}`}>{k.stufe}</span>
                    </p>
                    <div className="mt-2.5 h-[10px] overflow-hidden rounded-full bg-white/[0.07]">
                      <span
                        className={`ld-bar block h-full rounded-full ${i === letzte ? "bg-[#8dc63f]" : "bg-[linear-gradient(90deg,#2f5bd7,#4b7ce8)]"}`}
                        style={{ "--w": k.breite, transitionDelay: `${250 + i * 130}ms` } as CSSProperties}
                      />
                    </div>
                    <p className="ld-serif mt-2 text-[0.92rem] leading-[1.5] text-[#9aa8cc]">{k.misst}</p>
                  </li>
                ))}
              </ol>

              <p className="relative mt-10 border-t border-white/15 pt-6 text-[1.02rem] font-medium leading-[1.45]">
                Eine Logik für alle Kanäle. <span className="text-[#9aa8cc]">Damit klar ist, was wirkt – und was nicht.</span>
              </p>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-20 flex flex-col gap-7 rounded-[22px] border border-[#e7ecf5] bg-[#f7f9fc] p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="max-w-[26ch] text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.026em] text-[#0b1233]">
                Wo verliert Ihr Unternehmen heute Wachstum?
              </p>
              <p className="ld-serif mt-3 max-w-[50ch] text-[1.02rem] leading-[1.6] text-[#43507a]">
                In der Erstberatung finden wir es gemeinsam heraus – unverbindlich und konkret.
              </p>
            </div>
            <CtaButton href={BOOKING_URL} className="flex-none">Erstberatung vereinbaren</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════ Haltung ══════════════════════════ */

function Haltung() {
  return (
    <section id="leitbild" aria-labelledby="haltung-titel" className="bg-[#f7f9fc] px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto grid max-w-[1192px] grid-cols-1 items-stretch gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <Visual motiv={BILDER.haltung} sizes="(max-width: 1024px) 100vw, 580px" className="aspect-[4/5] h-full w-full rounded-[26px]" />
        </Reveal>

        <div className="order-1 flex flex-col justify-center lg:order-2">
          <Reveal>
            <Eyebrow>Unsere Haltung</Eyebrow>
            <h2 id="haltung-titel" className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0] tracking-[-0.04em] text-[#0b1233]">
              Präzise denken.<br />Präzise handeln.
            </h2>
            <Lead>
              Unser Anspruch: die performancestärksten digitalen Services für den Mittelstand.
              Wir sind Umsetzungspartner, nicht Folienlieferant – was wir mit Ihnen planen,
              bauen wir mit Ihnen auf und bleiben Teil davon.
            </Lead>
          </Reveal>

          <ol className="mt-12 border-t border-[#e2e8f2]">
            {prinzipien.map((p, i) => (
              <Reveal as="li" key={p.titel} delay={i * 90} className="grid gap-2 border-b border-[#e2e8f2] py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-5">
                <span className="ld-num text-[0.78rem] font-semibold text-[#2f5bd7]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.14rem] font-medium tracking-[-0.018em] text-[#0b1233]">{p.titel}</h3>
                  <p className="ld-serif mt-1.5 text-[1rem] leading-[1.6] text-[#43507a]">{p.text}</p>
                </div>
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
    <section id="branchen" aria-labelledby="branchen-titel" className="border-t border-[#e7ecf5] bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto grid max-w-[1192px] grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Für wen</Eyebrow>
          <h2 id="branchen-titel" className="mt-6 max-w-[14ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
            Mittelstand. Branchenübergreifend.
          </h2>
          <Lead>
            Für mittelständische Unternehmen, die digitales Wachstum nicht dem Zufall
            überlassen wollen. Entscheidend ist die Struktur Ihrer Wertschöpfung,
            nicht das Etikett Ihrer Branche.
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
    <section id="publikationen" aria-labelledby="perspektiven-titel" className="bg-[#f7f9fc] py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Eyebrow>Perspektiven</Eyebrow>
              <h2 id="perspektiven-titel" className="mt-6 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
                Wie wir über Performance denken.
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
            <article className="group relative flex h-full flex-col">
              <div className="overflow-hidden rounded-[18px]">
                <Visual motiv={x.bild} sizes="(max-width: 640px) 82vw, 400px" className="aspect-[16/10] w-full transition-transform duration-[900ms] group-hover:scale-[1.03]" />
              </div>
              <p className="ld-num mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#2f5bd7]">
                {String(i + 1).padStart(2, "0")} · {x.kicker}
              </p>
              <h3 className="mt-3 text-[1.26rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#0b1233]">
                {x.pfad ? <a href={x.pfad} className="after:absolute after:inset-0 after:content-['']">{x.titel}</a> : x.titel}
              </h3>
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
              <p className="mt-3 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.8rem)] font-medium leading-[1.2] tracking-[-0.024em]">
                Neue Perspektiven, wenn sie erscheinen.
              </p>
            </div>
            <CtaButton href={`mailto:${MAIL}?subject=${encodeURIComponent("Aufnahme in den Verteiler")}`} auf="dunkel" className="flex-none">
              Aufnahme anfragen
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════ Fragen ══════════════════════════
   Natives <details>: funktioniert ohne JavaScript, ist per Tastatur
   bedienbar, und der Text steht vollständig im HTML.
   ═══════════════════════════════════════════════════════════ */

function Fragen() {
  return (
    <section id="fragen" aria-labelledby="fragen-titel" className="border-t border-[#e7ecf5] bg-white px-6 py-[clamp(88px,11vw,140px)]">
      <div className="mx-auto grid max-w-[1192px] grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Häufige Fragen</Eyebrow>
          <h2 id="fragen-titel" className="mt-6 max-w-[16ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#0b1233]">
            Was Sie vorab wissen sollten.
          </h2>
          <Lead>Und wenn Ihre Frage fehlt: In der Erstberatung ist Raum für alles Weitere.</Lead>
          <div className="mt-9">
            <CtaButton href="#kontakt" variant="dark">Frage stellen</CtaButton>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border-t border-[#dfe6f1]">
            {fragen.map((f, i) => (
              <details key={f.frage} className="ld-frage group border-b border-[#dfe6f1]" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.1rem] font-medium leading-[1.35] tracking-[-0.012em] text-[#0b1233] transition-colors hover:text-[#2f5bd7]">
                  {f.frage}
                  <span aria-hidden className="relative h-9 w-9 flex-none rounded-full border border-[#dfe6f1] transition-colors duration-300 group-open:border-[#0b1233] group-open:bg-[#0b1233]">
                    <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-[#0b1233] transition-colors duration-300 group-open:bg-[#8dc63f]" />
                    <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-[#0b1233] transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="ld-serif max-w-[60ch] pb-7 pr-14 text-[1.02rem] leading-[1.66] text-[#43507a]">{f.antwort}</p>
              </details>
            ))}
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
      <div className="mx-auto max-w-[1192px]">
        <Reveal>
          <div className="grid overflow-hidden rounded-[28px] bg-[#0b1233] text-white lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[280px]">
              <Visual motiv={BILDER.kontakt} sizes="(max-width: 1024px) 100vw, 520px" flat className="absolute inset-0 h-full w-full" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,#0b1233_100%)] max-lg:bg-[linear-gradient(0deg,#0b1233_0%,transparent_50%)]" />
            </div>

            <div className="relative p-9 sm:p-14">
              <Eyebrow tone="light">Erstberatung</Eyebrow>
              <h2 id="kontakt-titel" className="mt-6 max-w-[16ch] text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.06] tracking-[-0.032em]">
                Sprechen wir über Ihr Wachstum.
              </h2>
              <p className="ld-serif mt-6 max-w-[46ch] text-[1.1rem] leading-[1.64] text-[#c7d6f5]">
                In der Erstberatung klären wir, wo Ihr Unternehmen heute Umsatz gewinnt und wo es
                ihn verliert – und ob eine Zusammenarbeit zu Ihnen passt. Unverbindlich und konkret.
              </p>
              <div className="mt-9"><CtaButton href={BOOKING_URL} auf="dunkel">Termin direkt wählen</CtaButton></div>

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

                    <CtaButton submit auf="dunkel" disabled={!bereit || status === "sending"} className="mt-7 w-full sm:w-auto">
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
                    <a href={`tel:${TEL_LINK}`} className="hover:text-white">{TEL}</a><br />
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
    { titel: "Leistung", links: [["Leistungsfelder", "#leistungen"], ["Das Vorgehen", "#framework"], ["Messbarkeit", "#messbarkeit"], ["Ausgangslage & Ergebnis", "#system"]] },
    { titel: "Unternehmen", links: [["Unsere Haltung", "#leitbild"], ["Für wen", "#branchen"], ["Perspektiven", "#publikationen"], ["Häufige Fragen", "#fragen"], ["Erstberatung", "#kontakt"]] },
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

    /* Signatur-Button: Pille mit Verlauf, feinem Außenring (outline mit Abstand)
       und Lichtkante oben. Beim Überfahren wandert der Verlauf Richtung Blau. */
    .ld-pill {
      background-image: var(--pill); background-size: 170% 100%; background-position: 0% 50%;
      outline: 1px solid var(--ring); outline-offset: 3px;
      box-shadow: inset 0 1px 0 var(--kante), 0 14px 30px -14px var(--schatten);
    }
    .ld-pill:hover { background-position: 100% 50%; }
    .ld-pill:focus-visible { outline: 2px solid #8dc63f; outline-offset: 3px; }
    .ld-pill-hell {
      --pill: linear-gradient(100deg, #070d24 0%, #0b1233 30%, #1b2a6b 70%, #2f5bd7 100%);
      --ring: #d3dbe8; --kante: rgba(255,255,255,.16); --schatten: rgba(11,18,51,.6);
      color: #ffffff;
    }
    .ld-pill-dunkel {
      --pill: linear-gradient(100deg, #ffffff 0%, #f1f5fc 45%, #d6e1f4 80%, #b9cbec 100%);
      --ring: rgba(255,255,255,.32); --kante: rgba(255,255,255,.9); --schatten: rgba(0,0,0,.55);
      color: #0b1233;
    }
    .ld-pill .ld-sweep { background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.28) 50%, transparent 65%); }

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
       Liegt unabhängig vom Bild darüber, getestet mit einem fast weißen Motiv.
       Oben: Abdunklung für die Navigation. Links: kräftig für die Überschrift.
       Unter etwa .70 links wird weißer Text auf hellen Motiven unlesbar. */
    .ld-hero-veil {
      background:
        linear-gradient(180deg, rgba(7,13,36,.62) 0%, rgba(7,13,36,0) 24%),
        radial-gradient(78% 62% at 84% 10%, rgba(47,91,215,.30), transparent 62%),
        radial-gradient(60% 55% at 4% 96%, rgba(141,198,63,.08), transparent 60%),
        linear-gradient(100deg, rgba(7,13,36,.95) 0%, rgba(8,14,40,.88) 30%, rgba(11,18,51,.62) 60%, rgba(11,18,51,.28) 84%, rgba(11,18,51,.14) 100%);
    }
    /* Hero-Foto: liegt ganz hinten, unter dem Farbschleier. Links (hinter dem Text)
       bleibt es dadurch dezent, rechts ist es deutlicher zu sehen.
       opacity regelt, wie stark es sichtbar ist. luminosity übernimmt nur die
       Helligkeit des Fotos – die Farben bleiben die der CI. Zoom minimal (4 %). */
    .ld-hero-foto { opacity: .32; mix-blend-mode: luminosity; }
    .ld-hero-zoom { animation: ldHeroZoom 40s ease-in-out infinite alternate; transform-origin: 55% 45%; }
    @keyframes ldHeroZoom { from { transform: scale(1); } to { transform: scale(1.04); } }
    /* Kacheln unter dem Hero – gleiche Formensprache wie der Signatur-Button. */
    .ld-kachel {
      background:
        radial-gradient(120% 90% at 100% 0%, rgba(75,124,232,.22), transparent 55%),
        linear-gradient(150deg, rgba(255,255,255,.085) 0%, rgba(255,255,255,.025) 55%, rgba(255,255,255,.04) 100%),
        rgba(9,15,42,.62);
      border: 1px solid rgba(255,255,255,.12);
      outline: 1px solid rgba(255,255,255,.09); outline-offset: 4px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 24px 48px -28px rgba(0,0,0,.8);
      transition: border-color .4s, outline-color .4s, transform .4s cubic-bezier(.16,.84,.28,1);
    }
    .ld-kachel:hover { border-color: rgba(255,255,255,.22); outline-color: rgba(141,198,63,.35); transform: translateY(-2px); }
    .ld-kachel-zahl {
      background-image: linear-gradient(180deg, #ffffff 0%, #ffffff 45%, #adbbd1 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ld-hero-fuss { background: linear-gradient(to top, #0b1233 0%, rgba(11,18,51,0) 100%); }

    /* Ladechoreografie – nur CSS. Die H1 ist bewusst nicht dabei. */
    @keyframes ldRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    @keyframes ldRule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    .ld-enter { animation: ldRise .8s cubic-bezier(.16,.84,.28,1) both; }
    .ld-d1 { animation-delay: .10s; } .ld-d2 { animation-delay: .22s; }
    .ld-d3 { animation-delay: .32s; } .ld-d4 { animation-delay: .44s; }
    .ld-rule { transform-origin: left center; animation: ldRule .9s cubic-bezier(.16,.84,.28,1) both; }

    /* Hero-Instrument. Die Verschiebung folgt dem Zeiger (--mx/--my vom Hero).
       Bewegung als ein Kreislauf: Ein Lichtpunkt umrundet das Rad (--umlauf),
       erreicht alle --takt Sekunden ein Feld, das Feld leuchtet auf, ein Impuls
       läuft ins Ziel, und das Ziel leuchtet bei seiner Ankunft kurz nach.
       Immer nur ein Impuls gleichzeitig. Alle Animationen starten gemeinsam
       beim Laden und bleiben dadurch synchron. */
    .ld-instrument { translate: calc(var(--mx, 0) * -22px) calc(var(--my, 0) * -16px); transition: translate 1s cubic-bezier(.16,.84,.28,1); }
    .ld-rot { transform-box: view-box; transform-origin: 50% 50%; }
    .ld-rad { animation: ldDreh var(--umlauf, 21s) linear infinite; }
    @keyframes ldDreh { to { transform: rotate(360deg); } }
    .ld-puls { stroke-dasharray: 42 400; stroke-dashoffset: 42; opacity: 0; animation: ldPuls var(--umlauf, 21s) cubic-bezier(.4,0,.3,1) infinite; }
    @keyframes ldPuls {
      0% { stroke-dashoffset: 42; opacity: 0; }
      1.2% { opacity: 1; }
      12.5% { stroke-dashoffset: -136; opacity: 1; }
      13%, 100% { stroke-dashoffset: -136; opacity: 0; }
    }
    .ld-knoten-an { opacity: 0; animation: ldKnoten var(--umlauf, 21s) ease-out infinite; }
    @keyframes ldKnoten { 0% { opacity: 0; } 1.7% { opacity: 1; } 17%, 100% { opacity: 0; } }
    .ld-kern { transform-box: fill-box; transform-origin: center; opacity: .5; animation: ldAnkunft var(--takt, 3s) ease-out 2.35s infinite; }
    @keyframes ldAnkunft { 0% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: .5; } }

    /* Laufband: zwei identische Listen, um die Hälfte verschoben. */
    .ld-band { animation: ldBand 70s linear infinite; }
    .ld-band:hover { animation-play-state: paused; }
    @keyframes ldBand { to { transform: translateX(-50%); } }

    /* Leitgedanke: jedes Wort hat --i (0 bis 1), der Abschnitt setzt --p.
       Ein Wort hellt auf, sobald der Fortschritt seine Position erreicht. */
    .ld-wort { opacity: calc(.14 + .86 * clamp(0, (var(--p, 0) * 1.3 - var(--i, 0)) * 10, 1)); transition: opacity .25s linear; }

    /* Leistungsfelder: Lichtkegel am Zeiger. */
    .ld-licht { background: radial-gradient(440px circle at var(--x, 50%) var(--y, 0%), rgba(47,91,215,.10), transparent 46%); }

    /* Kennzahlenkette: Balken füllen sich, sobald der Block erscheint. */
    .ld-bar { transform: scaleX(0); transform-origin: left center; transition: transform 1.4s cubic-bezier(.16,.84,.28,1); }
    .ld-reveal.is-visible .ld-bar { transform: scaleX(var(--w, 1)); }

    /* Fragen: Standard-Dreieck des Browsers ausblenden. */
    .ld-frage summary::-webkit-details-marker { display: none; }

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

    @media (scripting: none) {
      .ld-reveal { opacity: 1; transform: none; }
      .ld-wort { opacity: 1; }
      .ld-bar { transform: scaleX(var(--w, 1)); }
    }
    @media (prefers-contrast: more) {
      .ld-reveal, .ld-wort { opacity: 1; transform: none; }
      .ld-hero-veil { background: linear-gradient(100deg, rgba(7,13,36,.97) 0%, rgba(11,18,51,.86) 70%, rgba(11,18,51,.74) 100%); }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .ld-reveal { opacity: 1; transform: none; transition: none; }
      .ld-btn .ld-sweep { display: none; }
      .ld-kenburns, .ld-hero-zoom, .ld-enter, .ld-rule, .ld-swap { animation: none; opacity: 1; transform: none; }
      .ld-silber { animation: none; background-position: 30% 50%; }
      .ld-mega { transition: none; }
      .ld-dial { transform: none; }
      .ld-rad, .ld-puls, .ld-knoten-an, .ld-kern, .ld-band { animation: none; }
      .ld-puls, .ld-knoten-an { opacity: 0; }
      .ld-instrument { translate: none; transition: none; }
      .ld-wort { opacity: 1; transition: none; }
      .ld-bar { transform: scaleX(var(--w, 1)); transition: none; }
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
