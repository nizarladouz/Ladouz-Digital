import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <LegalLayout titel="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>Ladouz Digital<br />Inhaber: Nizar Ladouz (Einzelunternehmen)<br />Markt 40<br />53721 Siegburg<br />Deutschland</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:+4915770206552">01577 0206552</a><br />
        E-Mail: <a href="mailto:management@ladouz.digital">management@ladouz.digital</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Nizar Ladouz, Markt 40, 53721 Siegburg</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Die Inhalte dieser Website werden mit Sorgfalt erstellt. Sie dienen der allgemeinen Information und ersetzen
        keine individuelle Beratung. Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen
        verantwortlich, jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
        Für Inhalte externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich; zum
        Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen
        wir betroffene Inhalte oder Links umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und
        Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung.
      </p>
    </LegalLayout>
  );
}
