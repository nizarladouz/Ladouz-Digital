import type { Metadata } from "next";
import { Jost, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/* Die Schriften, die das Design tatsächlich vorsieht.
   Bisher wurden hier Geist und Geist Mono geladen – im gesamten Projekt
   ungenutzt – und die Seite lief auf Systemschriften.
   display: swap verhindert unsichtbaren Text während des Ladens. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const SITE = "https://ladouz.digital";
const TITEL = "Ladouz Digital – Ihre eigene Digital- und KI-Abteilung";
const BESCHREIBUNG =
  "Digitale & KI-Strategien, Softwareentwicklung und Consulting für den Mittelstand. Wir bauen Ihre interne Marketing-, Digital- und KI-Abteilung mit eigener Software und Datenstruktur auf – und bleiben dauerhaft Teil davon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITEL, template: "%s · Ladouz Digital" },
  description: BESCHREIBUNG,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE,
    siteName: "Ladouz Digital",
    title: TITEL,
    description: BESCHREIBUNG,
  },
  twitter: { card: "summary_large_image", title: TITEL, description: BESCHREIBUNG },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${jost.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
