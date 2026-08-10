import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════════
   TYPOGRAFIE

   Jost trägt die gesamte Seite – Headlines, Fließtext, UI, Zahlen.
   Die geometrische Anatomie entspricht der Konstruktion deines Logos.

   Alle Schnitte von 300 bis 800: 300 für großzügige Lead-Absätze,
   400 für Fließtext, 500/600 für UI und Labels, 700/800 für Headlines.

   next/font lädt die Schrift zur Buildzeit herunter und hostet sie
   selbst – zur Laufzeit geht keine Anfrage an Google (DSGVO).
   ═══════════════════════════════════════════════════════════════ */

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jost",
  display: "swap",
});

/* ───────────────────────────────────────────────────────────────
   GARET (optional)

   Garet ist kein freier Webfont, sondern eine kommerzielle Schrift
   von Mint Type. Sobald du eine Weblizenz hast, legst du die Dateien
   unter /public/fonts ab und tauschst oben Jost gegen:

     import localFont from "next/font/local";

     const garet = localFont({
       src: [
         { path: "../public/fonts/Garet-Book.woff2",   weight: "400", style: "normal" },
         { path: "../public/fonts/Garet-Medium.woff2", weight: "500", style: "normal" },
         { path: "../public/fonts/Garet-Bold.woff2",   weight: "700", style: "normal" },
         { path: "../public/fonts/Garet-Heavy.woff2",  weight: "800", style: "normal" },
       ],
       variable: "--font-jost",   // Variablenname bleibt, nichts weiter zu ändern
       display: "swap",
     });

   Der Variablenname bleibt bewusst --font-jost. Dadurch übernimmt
   Garet die Seite, ohne dass eine einzige Zeile in page.tsx angefasst
   werden muss. Jost bleibt der Fallback.
   ─────────────────────────────────────────────────────────────── */

export const viewport: Viewport = {
  themeColor: "#131f5c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ladouz.digital"),
  title: {
    default: "ladouz.digital – Frameworks für digitale & KI-Strategien",
    template: "%s | ladouz.digital",
  },
  description:
    "ladouz.digital entwickelt Frameworks für digitale Unternehmensstrategien, KI-Implementierung und Online-Marketing. Systemisch gedacht, präzise gebaut, messbar skaliert.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "ladouz.digital",
    title: "ladouz.digital – Frameworks für digitale & KI-Strategien",
    description:
      "Die Infrastruktur hinter Ihrer digitalen Unternehmensstrategie, KI-Implementierung und Ihrem Online-Marketing.",
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ladouz.digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ladouz.digital – Frameworks für digitale & KI-Strategien",
    description:
      "Die Infrastruktur hinter Ihrer digitalen Unternehmensstrategie, KI-Implementierung und Ihrem Online-Marketing.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ladouz.digital",
  url: "https://ladouz.digital",
  email: "management@ladouz.digital",
  telephone: "+4915770206552",
  founder: { "@type": "Person", name: "Nizar Ladouz", jobTitle: "Inhaber" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Markt 40",
    postalCode: "53721",
    addressLocality: "Siegburg",
    addressCountry: "DE",
  },
  areaServed: "DE",
  description:
    "Frameworks für digitale Unternehmensstrategien, KI-Implementierung und Online-Marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={jost.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
