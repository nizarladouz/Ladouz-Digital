"use client";
export const G = "#8dc63f";
export function Brand({ sub }: { sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hub/logo.png" alt="" width={36} height={36} style={{ width: 36, height: 36, borderRadius: 9, outline: "1px solid rgba(255,255,255,.18)", outlineOffset: 3, boxShadow: "0 10px 24px -12px rgba(0,0,0,.7)" }} />
      <div style={{ fontFamily: "var(--font-jost)", lineHeight: 1.1 }}>
        <div style={{ fontWeight: 600, letterSpacing: ".02em" }}>L Digital Hub</div>
        <div style={{ fontSize: 11, opacity: .55, letterSpacing: ".14em", textTransform: "uppercase" }}>{sub ?? "Beta · Ladouz Digital"}</div>
      </div>
    </div>
  );
}

export function Marke({ hell = false }: { hell?: boolean }) {
  return (
    <svg viewBox="0 0 23 34" aria-hidden style={{ position: "relative", zIndex: 1, height: 17, width: "auto", flex: "none" }}>
      <rect width="7" height="34" fill={hell ? "#0b1233" : "#ffffff"} />
      <circle cx="17" cy="28.5" r="5.5" fill={hell ? "#2f5bd7" : "#adbbd1"} />
    </svg>
  );
}

/* Gleiche Formensprache wie die Landingpage (Hero-Atmosphäre, Signatur-Pille, Kacheln). */
export const HUB_CSS = `
.hub-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:
 radial-gradient(900px 520px at 85% -8%,rgba(47,91,215,.38),transparent 60%),
 radial-gradient(700px 480px at -5% 105%,rgba(141,198,63,.10),transparent 60%),
 linear-gradient(100deg,#070d24 0%,#0b1233 55%,#131f5c 100%)}
.hub-bg::before{content:"";position:absolute;inset:0;clip-path:polygon(14% 0,64% 100%,30% 100%,-20% 0);background:linear-gradient(170deg,rgba(47,91,215,.24) 0%,rgba(47,91,215,.10) 70%,rgba(47,91,215,0) 100%)}
.hub-bg::after{content:"";position:absolute;inset:auto 0 0 0;height:40%;background:linear-gradient(to top,#0b1233,rgba(11,18,51,0))}
.hub-z{position:relative;z-index:1}
.hub-pill{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:10px;border:0;border-radius:999px;cursor:pointer;font-weight:500;letter-spacing:-.005em;
 background-image:var(--pill);background-size:170% 100%;background-position:0% 50%;outline:1px solid var(--ring);outline-offset:3px;
 box-shadow:inset 0 1px 0 var(--kante),0 14px 30px -14px var(--schatten);transition:background-position .5s,transform .5s}
.hub-pill:hover,a:hover .hub-pill{background-position:100% 50%;transform:translateY(-2px)}
.hub-pill:disabled{opacity:.5;cursor:not-allowed}
.hub-pill-d{--pill:linear-gradient(100deg,#ffffff 0%,#f1f5fc 45%,#d6e1f4 80%,#b9cbec 100%);--ring:rgba(255,255,255,.32);--kante:rgba(255,255,255,.9);--schatten:rgba(0,0,0,.55);color:#0b1233}
.hub-sweep{position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.5) 50%,transparent 65%);transform:translateX(-120%);transition:transform .75s cubic-bezier(.16,.84,.28,1)}
.hub-pill:hover .hub-sweep,a:hover .hub-sweep{transform:translateX(120%)}
.hub-pill>span{position:relative;z-index:1}
.hub-kachel{background:radial-gradient(120% 90% at 100% 0%,rgba(75,124,232,.22),transparent 55%),linear-gradient(150deg,rgba(255,255,255,.085) 0%,rgba(255,255,255,.025) 55%,rgba(255,255,255,.04) 100%),rgba(9,15,42,.62);
 border:1px solid rgba(255,255,255,.12);outline:1px solid rgba(255,255,255,.09);outline-offset:4px;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 24px 48px -28px rgba(0,0,0,.8);backdrop-filter:blur(6px);
 transition:border-color .4s,outline-color .4s,transform .4s cubic-bezier(.16,.84,.28,1)}
a:hover .hub-kachel{border-color:rgba(255,255,255,.22);outline-color:rgba(141,198,63,.35);transform:translateY(-2px)}
.hub-ghost{background:none;border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;cursor:pointer;transition:background .3s,border-color .3s}
.hub-ghost:hover{border-color:#fff;background:rgba(255,255,255,.1)}
.hub-in{transition:border-color .3s}.hub-in:focus{border-color:rgba(141,198,63,.7)!important}
`;
