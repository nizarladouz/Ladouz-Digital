"use client";
/* Portal-Beta (v1, wie lebenshacks): Konten, Sitzung und Daten liegen nur im Browser (localStorage).
   Passwort: PBKDF2-SHA256, 210.000 Iterationen, eigener Salt pro Konto. */
type User = { email: string; salt: string; hash: string; created: string };
export type Habit = { id: string; name: string; created: string; done: string[] };
const U = "ld.users", S = "ld.session";
const hex = (b: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(b as ArrayBuffer)).map((x) => x.toString(16).padStart(2, "0")).join("");
const unhex = (h: string) => new Uint8Array(h.match(/../g)!.map((x) => parseInt(x, 16)));
async function derive(pw: string, salt: Uint8Array) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: 210000 }, k, 256));
}
const users = (): User[] => JSON.parse(localStorage.getItem(U) || "[]");
const norm = (e: string) => e.trim().toLowerCase();
export const auth = {
  current: () => (typeof window === "undefined" ? null : localStorage.getItem(S)),
  async register(email: string, pw: string) {
    email = norm(email);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    if (pw.length < 8) throw new Error("Das Passwort muss mindestens 8 Zeichen haben.");
    const all = users();
    if (all.some((u) => u.email === email)) throw new Error("Für diese E-Mail besteht bereits ein Konto.");
    const salt = crypto.getRandomValues(new Uint8Array(16));
    all.push({ email, salt: hex(salt), hash: await derive(pw, salt), created: new Date().toISOString() });
    localStorage.setItem(U, JSON.stringify(all));
    localStorage.setItem(S, email);
  },
  async login(email: string, pw: string) {
    email = norm(email);
    const u = users().find((x) => x.email === email);
    if (!u || (await derive(pw, unhex(u.salt))) !== u.hash) throw new Error("E-Mail oder Passwort ist nicht korrekt.");
    localStorage.setItem(S, email);
  },
  logout: () => localStorage.removeItem(S),
};
export const day = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const habits = {
  list: (email: string): Habit[] => JSON.parse(localStorage.getItem(`ld.habits.${email}`) || "[]"),
  save: (email: string, h: Habit[]) => localStorage.setItem(`ld.habits.${email}`, JSON.stringify(h)),
};
export function streak(done: string[]) {
  const set = new Set(done); const d = new Date();
  if (!set.has(day(d))) d.setDate(d.getDate() - 1);
  let n = 0; while (set.has(day(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
