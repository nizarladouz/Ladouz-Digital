import type { ModuleDef } from './types';

export const FRAMEWORK_TEMPLATES: ModuleDef[] = [
  {
    id: 'strategie',
    title: 'Strategie',
    iconName: 'Compass',
    phases: [
      {
        id: 'strat-p1',
        title: 'Kickoff & Discovery',
        tasks: [
          { id: 't1', title: 'Onboarding Fragebogen senden', description: 'Kunde füllt detaillierten Fragebogen zu Zielen und Ist-Zustand aus.', status: 'pending' },
          { id: 't2', title: 'Kickoff Workshop durchführen', description: 'Gemeinsamer 2-stündiger Workshop zur Definition der Zielgruppe und Positionierung.', status: 'pending' },
          { id: 't3', title: 'Wettbewerbsanalyse', description: 'Analyse der 3 wichtigsten Mitbewerber im Markt.', status: 'pending' }
        ]
      },
      {
        id: 'strat-p2',
        title: 'Roadmap & Freigabe',
        tasks: [
          { id: 't4', title: 'Strategie-Papier erstellen', description: 'Zusammenfassung der Erkenntnisse und Handlungsempfehlungen.', status: 'pending' },
          { id: 't5', title: 'Kundenfreigabe einholen', description: 'Präsentation und Sign-off der Strategie durch den Kunden.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'medienproduktion',
    title: 'Content Medienproduktion',
    iconName: 'Camera',
    phases: [
      {
        id: 'prod-p1',
        title: 'Pre-Production',
        tasks: [
          { id: 't1', title: 'Moodboard & Shotlist', description: 'Visuelle Richtung festlegen und benötigte Aufnahmen planen.', status: 'pending' },
          { id: 't2', title: 'Location & Requisiten', description: 'Drehort sichern und alle benötigten Materialien organisieren.', status: 'pending' }
        ]
      },
      {
        id: 'prod-p2',
        title: 'Production & Post',
        tasks: [
          { id: 't3', title: 'Shooting Tag', description: 'Durchführung des Foto-/Videodrehs nach Shotlist.', status: 'pending' },
          { id: 't4', title: 'Schnitt & Color Grading', description: 'Postproduktion der erstellten Medien.', status: 'pending' },
          { id: 't5', title: 'Assets exportieren', description: 'Bereitstellung in den finalen Formaten (16:9, 9:16, 1:1).', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'medienredaktion',
    title: 'Content Medienredaktion',
    iconName: 'PenTool',
    phases: [
      {
        id: 'red-p1',
        title: 'Planung',
        tasks: [
          { id: 't1', title: 'Redaktionsplan erstellen', description: 'Themen für den kommenden Monat festlegen.', status: 'pending' },
          { id: 't2', title: 'Copywriting', description: 'Texte für alle Postings verfassen.', status: 'pending' }
        ]
      },
      {
        id: 'red-p2',
        title: 'Distribution',
        tasks: [
          { id: 't3', title: 'Freigabeschleife', description: 'Kunde gibt Plan und Texte frei.', status: 'pending' },
          { id: 't4', title: 'Scheduling', description: 'Einplanung in Social Media Management Tool.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'google-ads',
    title: 'Google Ads & Sichtbarkeit',
    iconName: 'MousePointerClick',
    phases: [
      {
        id: 'ads-p1',
        title: 'Setup',
        tasks: [
          { id: 't1', title: 'Keyword-Analyse', description: 'Recherche relevanter Suchbegriffe und Suchvolumina.', status: 'pending' },
          { id: 't2', title: 'Tracking Implementierung', description: 'Google Tag Manager und Conversion Tracking einrichten.', status: 'pending' },
          { id: 't3', title: 'Anzeigentexte (Copy)', description: 'Erstellung der Search-Anzeigen mit relevanten USPs.', status: 'pending' }
        ]
      },
      {
        id: 'ads-p2',
        title: 'Launch & Optimierung',
        tasks: [
          { id: 't4', title: 'Kampagnenstart', description: 'Aktivierung der Google Ads Kampagnen.', status: 'pending' },
          { id: 't5', title: 'Erste Optimierung (7 Tage)', description: 'Ausschluss negativer Keywords, Anpassung der Gebotsstrategie.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'website',
    title: 'Website',
    iconName: 'Layout',
    phases: [
      {
        id: 'web-p1',
        title: 'Konzept & Design',
        tasks: [
          { id: 't1', title: 'Sitemap & Wireframes', description: 'Grobstruktur der neuen Website definieren.', status: 'pending' },
          { id: 't2', title: 'UI Design & Prototyp', description: 'Visuelles Design erstellen und abstimmen.', status: 'pending' }
        ]
      },
      {
        id: 'web-p2',
        title: 'Entwicklung & Launch',
        tasks: [
          { id: 't3', title: 'Frontend Entwicklung', description: 'Umsetzung in Code oder Pagebuilder.', status: 'pending' },
          { id: 't4', title: 'SEO Onpage Setup', description: 'Meta-Daten, H-Tags und Alt-Texte pflegen.', status: 'pending' },
          { id: 't5', title: 'Go-Live', description: 'Domain-Aufschaltung und finale QA.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'gmb',
    title: 'Google My Business',
    iconName: 'MapPin',
    phases: [
      {
        id: 'gmb-p1',
        title: 'Profil Setup',
        tasks: [
          { id: 't1', title: 'Profil beanspruchen', description: 'Eigentümerschaft des Eintrags verifizieren.', status: 'pending' },
          { id: 't2', title: 'Unternehmensinfos optimieren', description: 'Öffnungszeiten, Kategorien und Beschreibung aktualisieren.', status: 'pending' },
          { id: 't3', title: 'Bilder Upload', description: 'Hochwertige Fotos von außen und innen hochladen.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'kundenzufriedenheit',
    title: 'Kundenzufriedenheit',
    iconName: 'HeartHandshake',
    phases: [
      {
        id: 'kzf-p1',
        title: 'Systematik',
        tasks: [
          { id: 't1', title: 'NPS Umfrage einrichten', description: 'Automatisierte E-Mail-Umfrage nach Projektabschluss konfigurieren.', status: 'pending' },
          { id: 't2', title: 'Bewertungs-Funnel', description: 'System zur Generierung von 5-Sterne Bewertungen etablieren.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'reaktivierung',
    title: 'Kundenreaktivierung',
    iconName: 'RefreshCcw',
    phases: [
      {
        id: 'reak-p1',
        title: 'Kampagne',
        tasks: [
          { id: 't1', title: 'Datenbank Segmentierung', description: 'Inaktive Kunden der letzten 12 Monate filtern.', status: 'pending' },
          { id: 't2', title: 'E-Mail Kampagne', description: 'Spezifisches Reaktivierungs-Angebot versenden.', status: 'pending' },
          { id: 't3', title: 'Follow-up Calls', description: 'Telefonisches Nachfassen bei Öffnern der Mail.', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'digital',
    title: 'Digital & Prozesse',
    iconName: 'Cpu',
    phases: [
      {
        id: 'digi-p1',
        title: 'Infrastruktur',
        tasks: [
          { id: 't1', title: 'Tool-Stack Audit', description: 'Analyse der bestehenden Software-Landschaft.', status: 'pending' },
          { id: 't2', title: 'CRM Setup', description: 'Einrichtung einer zentralen Kundendatenbank.', status: 'pending' },
          { id: 't3', title: 'Automatisierung', description: 'Zapier/Make Workflows für Lead-Übergabe erstellen.', status: 'pending' }
        ]
      }
    ]
  }
];

