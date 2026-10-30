import Image from "next/image";
import { cookies } from "next/headers";
import { anmelden, abmelden } from "./actions";
import { SESSION } from "./session";
import Board from "./Board";

export const dynamic = "force-dynamic";

export default async function OS({ searchParams }: { searchParams: Promise<{ fehler?: string }> }) {
  const ok = (await cookies()).get("ld_os")?.value === SESSION;
  const { fehler } = await searchParams;
  if (!ok)
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <form action={anmelden} className="w-full max-w-[380px] rounded-2xl border border-[#e7ecf5] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,18,51,.35)]">
          <div className="relative h-[30px] w-[62px]"><Image src="/logo-navy.png" alt="ladouz.digital" fill sizes="62px" className="object-contain object-left" /></div>
          <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#2f5bd7]">Ladouz OS · Kundenbereich</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Willkommen zurück.</h1>
          <p className="mt-2 text-sm text-[#5b6b8a]">Bitte geben Sie Ihren Zugangscode ein.</p>
          <input name="code" autoFocus autoComplete="off" placeholder="Zugangscode" className="mt-6 w-full rounded-lg border border-[#d9e0ee] px-4 py-3 outline-none focus:border-[#2f5bd7]" />
          {fehler && <p className="mt-2 text-sm text-red-600">Der Code ist nicht korrekt.</p>}
          <button className="mt-4 w-full rounded-lg bg-[#0b1233] py-3 font-medium text-white hover:bg-[#1a2558]">Anmelden</button>
        </form>
      </main>
    );
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#2f5bd7]">Ladouz OS · App 1</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Habits für Organisationen</h1>
          <p className="mt-2 max-w-[640px] text-[#43507a]">Kleine Gewohnheiten, die Ihr Team täglich umsetzt – 1 % besser, jeden Tag. Systeme schlagen Ziele.</p>
        </div>
        <form action={abmelden}><button className="text-xs font-semibold uppercase tracking-[0.2em] text-[#43507a] hover:text-[#0b1233]">Abmelden</button></form>
      </header>
      <Board />
    </main>
  );
}
