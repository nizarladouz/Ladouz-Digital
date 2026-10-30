import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: { canonical: "/datenschutz" },
  openGraph: { url: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <LegalLayout titel="Datenschutzerklärung" stand="30.10.2026">
      <p>
        Mit dieser Erklärung informieren wir Sie nach Art. 13 und 14 DSGVO darüber, welche personenbezogenen Daten wir
        beim Besuch dieser Website verarbeiten, zu welchen Zwecken, auf welcher Rechtsgrundlage und welche Rechte Sie haben.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Ladouz Digital, Inhaber Nizar Ladouz<br />
        Markt 40, 53721 Siegburg, Deutschland<br />
        Telefon: <a href="tel:+4915770206552">01577 0206552</a><br />
        E-Mail: <a href="mailto:management@ladouz.digital">management@ladouz.digital</a>
      </p>
      <p>
        Ein Datenschutzbeauftragter ist nicht benannt, da hierzu keine gesetzliche Pflicht besteht. Bei Fragen zum
        Datenschutz erreichen Sie uns unter den oben genannten Kontaktdaten.
      </p>

      <h2>2. Überblick: Zwecke und Rechtsgrundlagen</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist, insbesondere
      </p>
      <p>
        – zur sicheren und stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse),<br />
        – zur Bearbeitung Ihrer Anfragen und zur Anbahnung oder Durchführung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO),<br />
        – zur Erfüllung gesetzlicher Pflichten, etwa handels- und steuerrechtlicher Aufbewahrungspflichten (Art. 6 Abs. 1 lit. c DSGVO),<br />
        – sowie auf Grundlage Ihrer Einwilligung, sofern wir sie gesondert einholen (Art. 6 Abs. 1 lit. a DSGVO).
      </p>

      <h2>3. Hosting und Server-Logs</h2>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet und ausgeliefert.
        Bei jedem Aufruf verarbeitet Vercel technisch notwendige Daten (Server-Logfiles), insbesondere IP-Adresse, Datum
        und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browser-Typ und -Version sowie Betriebssystem.
      </p>
      <p>
        Zweck ist die Auslieferung der Website sowie die Gewährleistung von Stabilität und Sicherheit, z. B. die Abwehr von
        Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einem sicheren und
        funktionsfähigen Internetauftritt. Die Logdaten werden nur so lange gespeichert, wie es für diese Zwecke
        erforderlich ist, und anschließend automatisch gelöscht. Eine Zusammenführung mit anderen Datenquellen findet nicht statt.
      </p>
      <p>
        Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO (Data Processing Addendum von Vercel).
        Vercel kann Daten auch in den USA verarbeiten. Die Übermittlung stützt sich auf den Angemessenheitsbeschluss der
        EU-Kommission zum EU-US Data Privacy Framework, unter dem Vercel zertifiziert ist, sowie ergänzend auf
        EU-Standardvertragsklauseln (Art. 45, 46 DSGVO).
      </p>

      <h2>4. Cookies, Tracking und Schriftarten</h2>
      <p>
        Wir setzen keine Analyse-, Marketing- oder Werbe-Cookies und keine Tracking- oder Profiling-Dienste ein. Es werden
        keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen, die nicht für die Darstellung der Website
        unbedingt erforderlich sind (§ 25 Abs. 2 TDDDG). Eine Einwilligung ist daher nicht erforderlich.
      </p>
      <p>
        Die Schriftarten dieser Website werden lokal von unserem Server ausgeliefert. Es findet keine Verbindung zu Servern
        von Google statt. Sollten wir künftig einwilligungspflichtige Dienste nutzen, holen wir vorher Ihre Einwilligung
        ein und passen diese Erklärung an.
      </p>

      <h2>5. Kontaktaufnahme per E-Mail oder Telefon</h2>
      <p>
        Wenn Sie uns per E-Mail oder Telefon kontaktierst, verarbeiten wir die von Ihnen
        mitgeteilten Daten (z. B. Name, E-Mail-Adresse, Telefonnummer und Inhalt Ihrer Anfrage), um Ihre Anfrage zu
        bearbeiten und zu beantworten.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit einem Vertrag oder dessen Anbahnung
        zusammenhängt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
        Wir löschen Ihre Daten, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </p>
      <h2>6. Terminbuchung über zeeg</h2>
      <p>
        Für die Buchung einer Erstberatung verlinken wir auf das externe Buchungstool zeeg (zeeg.me). Erst wenn Sie den Link
        anklickst, werden Sie zum Anbieter weitergeleitet; vorher werden keine Daten an zeeg übertragen. Für die Verarbeitung
        auf der Buchungsseite gelten die Datenschutzhinweise von zeeg. Die bei der Buchung angegebenen Daten nutzen wir zur
        Vorbereitung und Durchführung des Termins (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>7. Empfänger</h2>
      <p>
        Ihre Daten erhalten nur wir sowie Dienstleister, die uns beim Betrieb der Website unterstützen (Hosting, siehe
        Abschnitt 3), und – im Rahmen einer Terminbuchung – der Anbieter des Buchungstools. Eine Weitergabe an sonstige
        Dritte erfolgt nur, wenn wir gesetzlich dazu verpflichtet sind. Wir verkaufen keine Daten.
      </p>

      <h2>8. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Bestehen
        gesetzliche Aufbewahrungspflichten (z. B. bis zu sechs bzw. zehn Jahre nach HGB und AO für Geschäftsbriefe und
        Buchungsbelege), werden die Daten bis zum Ablauf dieser Fristen gesperrt und danach gelöscht.
      </p>

      <h2>9. Pflicht zur Bereitstellung</h2>
      <p>
        Sie sind weder gesetzlich noch vertraglich verpflichtet, uns personenbezogene Daten bereitzustellen. Ohne die
        technisch notwendigen Verbindungsdaten kann die Website jedoch nicht angezeigt werden, und ohne Kontaktdaten können
        wir Ihre Anfrage nicht beantworten.
      </p>

      <h2>10. Keine automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.
      </p>

      <h2>11. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung
        (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20 DSGVO).
        Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).
      </p>
      <p>
        <strong>Widerspruchsrecht:</strong> Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten,
        können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen (Art. 21 DSGVO).
        Eine formlose Nachricht an <a href="mailto:management@ladouz.digital">management@ladouz.digital</a> genügt.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns
        zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen,
        Kavalleriestraße 2–4, 40213 Düsseldorf, <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener">www.ldi.nrw.de</a>.
      </p>

      <h2>12. Änderungen</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Anforderungen ändern. Es gilt
        die jeweils hier veröffentlichte Fassung.
      </p>
    </LegalLayout>
  );
}
