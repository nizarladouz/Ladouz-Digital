/* Nächster Workshop-Termin: letzter Samstag des Monats, Zeitzone Europe/Berlin.
   TODO: Uhrzeit von Nizar – solange unbekannt, zählt der Countdown bis 00:00 Uhr Berlin-Zeit. */
export const WORKSHOP_START_STUNDE = 0;
export const WORKSHOP_START_MINUTE = 0;

function berlinStunde(ms: number) {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", hourCycle: "h23" }).format(ms));
}

/* UTC-Zeitpunkt für y-m-d hh:mm in Berlin (MEZ oder MESZ). */
function berlinZeitpunkt(y: number, m: number, d: number, h: number, min: number) {
  const naiv = Date.UTC(y, m, d, h, min);
  for (const offset of [1, 2]) {
    const t = naiv - offset * 3600_000;
    if (berlinStunde(t) === h) return t;
  }
  return naiv - 3600_000;
}

function letzterSamstag(y: number, m: number) {
  const letzter = new Date(Date.UTC(y, m + 1, 0));
  return letzter.getUTCDate() - ((letzter.getUTCDay() + 1) % 7);
}

export function naechsterTermin(jetzt = Date.now()) {
  const heute = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit" }).format(jetzt).split("-").map(Number);
  let y = heute[0], m = heute[1] - 1;
  for (let i = 0; i < 3; i++) {
    const d = letzterSamstag(y, m);
    const ts = berlinZeitpunkt(y, m, d, WORKSHOP_START_STUNDE, WORKSHOP_START_MINUTE);
    if (ts > jetzt) {
      const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      return { ts, iso, kurz: `${String(d).padStart(2, "0")}.${String(m + 1).padStart(2, "0")}.${y}`,
        lang: new Intl.DateTimeFormat("de-DE", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(Date.UTC(y, m, d)) };
    }
    m++; if (m > 11) { m = 0; y++; }
  }
  throw new Error("kein Termin");
}
