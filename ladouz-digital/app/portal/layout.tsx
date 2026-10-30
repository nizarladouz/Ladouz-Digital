import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portal – ladouz.digital",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1233] text-white antialiased selection:bg-[#8dc63f] selection:text-[#0b1233]" style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}>
      <header className="border-b border-white/10 px-6">
        <div className="mx-auto flex h-[78px] max-w-[960px] items-center justify-between">
          <a href="/portal/apps" className="text-[15px] font-semibold tracking-tight">ladouz<span className="text-[#8dc63f]">.</span>digital <span className="ml-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/50">Portal</span></a>
          <span className="rounded-full border border-[#8dc63f]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8dc63f]">Beta</span>
        </div>
      </header>
      <main className="px-6 py-[clamp(48px,8vw,96px)]"><div className="mx-auto max-w-[960px]">{children}</div></main>
    </div>
  );
}
