import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <LegalLayout titel="Datenschutzerklärung" stand="30.10.2026">
      <h2>1. Verantwortlicher</h2>
      <p>
        Ladouz Digital, Inhaber Nizar Ladouz, Markt 40, 53721 Siegburg<br />
        Telefon: <a href="tel:+4915770206552">01577 0206552</a><br />
        E-Mail: <a href="mailto:management@ladouz.digital">management@ladouz.digital</a>
      </p>

      <h2>2. Hosting und Server-Logs</h2>
      <p>
        Diese Website wird über Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet und ausgeliefert.
        Beim Aufruf werden technisch notwendige Daten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene
        Seite, Referrer und Browser-Informationen. Zweck ist die sichere und stabile Bereitstellung der Website;
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Vercel kann Daten auch in den USA
        verarbeiten; die Übermittlung stützt sich auf das EU-US Data Privacy Framework bzw. Standardvertragsklauseln.
        Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung.
      </p>

      <h2>3. Cookies und Tracking</h2>
      <p>
        Wir setzen derzeit keine Analyse- oder Werbe-Cookies und kein Tracking ein. Schriftarten werden lokal von unserem
        Server geladen, nicht von Google. Sollten wir künftig Analyse- oder Werbedienste nutzen, holen wir vorher deine
        Einwilligung ein und passen diese Erklärung an.
      </p>

      <h2>4. Kontakt per E-Mail, Telefon oder Formular</h2>
      <p>
        Wenn du uns per E-Mail, Telefon oder über ein Formular auf dieser Website kontaktierst, verarbeiten wir deine
        Angaben (z. B. Name und E-Mail-Adresse) zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO) und löschen
        sie, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>5. Terminbuchung</h2>
      <p>
        Für die Buchung einer Erstberatung verlinken wir auf das Buchungstool zeeg (zeeg.me). Erst wenn du den Link
        anklickst, wirst du zum Anbieter weitergeleitet; dort gelten dessen Datenschutzhinweise. Die bei der Buchung
        angegebenen Daten nutzen wir zur Vorbereitung und Durchführung des Termins (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>6. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch (Art. 15–21 DSGVO). Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, z. B.
        bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
      </p>
    </LegalLayout>
  );
}
