"use client";
// Beta: lokale Konten (localStorage), PBKDF2-gehasht. Kein Server-Backend.
const USERS = "ldhub_users";
const SESSION = "ldhub_session";
type User = { email: string; name: string; salt: string; hash: string };

const enc = new TextEncoder();
const hex = (b: ArrayBuffer) => Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");

async function derive(pw: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 210000, hash: "SHA-256" }, key, 256);
  return hex(bits);
}
const users = (): User[] => JSON.parse(localStorage.getItem(USERS) || "[]");

export async function register(name: string, email: string, pw: string) {
  email = email.trim().toLowerCase();
  if (pw.length < 8) throw new Error("Das Passwort benötigt mindestens 8 Zeichen.");
  const list = users();
  if (list.some((u) => u.email === email)) throw new Error("Für diese E-Mail besteht bereits ein Zugang.");
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)).buffer);
  list.push({ email, name: name.trim(), salt, hash: await derive(pw, salt) });
  localStorage.setItem(USERS, JSON.stringify(list));
  startSession(email);
}
export async function login(email: string, pw: string) {
  email = email.trim().toLowerCase();
  const u = users().find((x) => x.email === email);
  if (!u || (await derive(pw, u.salt)) !== u.hash) throw new Error("E-Mail oder Passwort ist nicht korrekt.");
  startSession(email);
}
function startSession(email: string) {
  sessionStorage.setItem(SESSION, JSON.stringify({ email, exp: Date.now() + 8 * 3600e3 }));
}
export function currentUser(): User | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION) || "null");
    if (!s || s.exp < Date.now()) return null;
    return users().find((u) => u.email === s.email) || null;
  } catch { return null; }
}
export function logout() { sessionStorage.removeItem(SESSION); }
