/* Kontaktanfragen → E-Mail an management@ladouz.digital über Resend (HTTP-API, keine Abhängigkeit).
   Benötigte Vercel-Umgebungsvariablen:
     RESEND_API_KEY   – API-Key von resend.com
     LEAD_FROM        – optional, Absender, z. B. "Ladouz Digital <anfrage@ladouz.digital>"
                        (Domain muss in Resend verifiziert sein; Standard: onboarding@resend.dev)
     LEAD_TO          – optional, Empfänger (Standard: management@ladouz.digital) */
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; hp?: unknown };
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (typeof body.hp === "string" && body.hp) return Response.json({ ok: true }); // Honeypot: still verwerfen
  if (name.length < 2 || !EMAIL_RE.test(email)) return Response.json({ ok: false }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("lead: RESEND_API_KEY fehlt – Anfrage nicht versendet");
    return Response.json({ ok: false, error: "mail_not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM || "Ladouz Digital <onboarding@resend.dev>",
      to: [process.env.LEAD_TO || "management@ladouz.digital"],
      reply_to: email,
      subject: `Neue Anfrage Erstberatung: ${name}`,
      text: `Neue Anfrage über ladouz.digital\n\nName: ${name}\nE-Mail: ${email}\n`,
      html: `<p>Neue Anfrage über ladouz.digital</p><p><b>Name:</b> ${esc(name)}<br><b>E-Mail:</b> ${esc(email)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("lead: Resend-Fehler", res.status, await res.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
