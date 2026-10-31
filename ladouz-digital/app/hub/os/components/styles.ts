export const NAVY = "#0b1233";
export const GREEN = "#8dc63f";
/* Premium-Look wie L Digital Hub: Navy-Atmosphäre (hub-bg), Glas-Flächen, Signatur-Pillen. */
export const CSS = `
.os{position:fixed;inset:0;display:grid;grid-template-columns:280px 1fr;grid-template-rows:64px 1fr;background:${NAVY};color:#fff;font-family:var(--font-dm-sans),system-ui,sans-serif;font-size:14px}
.os *{box-sizing:border-box}
.os>header,.os>aside,.os>main{position:relative;z-index:1}
.os-top{grid-column:1/-1;display:flex;align-items:center;gap:16px;padding:0 24px;border-bottom:1px solid rgba(255,255,255,.1);background:rgba(7,13,36,.55);backdrop-filter:blur(10px)}
.os-side{border-right:1px solid rgba(255,255,255,.1);background:rgba(9,15,42,.45);backdrop-filter:blur(8px);overflow:auto;padding:20px 14px}
.os-main{overflow:auto;padding:36px clamp(20px,4vw,56px) 80px}
.os-h{font-family:var(--font-jost),sans-serif;font-weight:600;letter-spacing:-.01em;margin:0;color:#fff}
.os-eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:600}
.os-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.04);color:#fff;padding:8px 14px;border-radius:999px;font:inherit;font-weight:500;cursor:pointer;transition:all .3s}
.os-btn:hover{border-color:#fff;background:rgba(255,255,255,.1)}
.os-btn.pri{background:linear-gradient(100deg,#fff 0%,#f1f5fc 45%,#d6e1f4 80%,#b9cbec 100%);border-color:transparent;color:${NAVY};outline:1px solid rgba(255,255,255,.32);outline-offset:3px}
.os-btn.ghost{border-color:transparent;background:none;color:rgba(255,255,255,.55);padding:6px 8px}
.os-btn.ghost:hover{color:#fff;background:rgba(255,255,255,.08)}
.os-in{width:100%;border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:10px 12px;font:inherit;color:#fff;background:rgba(255,255,255,.05);outline:none;transition:border-color .3s}
.os-in::placeholder{color:rgba(255,255,255,.4)}
.os-in:focus{border-color:rgba(141,198,63,.7);box-shadow:0 0 0 3px rgba(141,198,63,.15)}
.os-nav{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;border:1px solid transparent;background:none;font:inherit;color:rgba(255,255,255,.75);cursor:pointer;text-align:left;transition:all .25s}
.os-nav:hover{background:rgba(255,255,255,.06);color:#fff}
.os-nav.on{background:linear-gradient(150deg,rgba(255,255,255,.1),rgba(255,255,255,.03));color:#fff;font-weight:600;border-color:rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}
.os-bar{height:6px;border-radius:6px;background:rgba(255,255,255,.1);overflow:hidden}
.os-bar>i{display:block;height:100%;background:${GREEN};border-radius:6px;transition:width .4s}
.os-card{border-radius:18px;background:radial-gradient(120% 90% at 100% 0%,rgba(75,124,232,.16),transparent 55%),linear-gradient(150deg,rgba(255,255,255,.075) 0%,rgba(255,255,255,.02) 55%,rgba(255,255,255,.035) 100%),rgba(9,15,42,.62);
 border:1px solid rgba(255,255,255,.12);outline:1px solid rgba(255,255,255,.06);outline-offset:4px;box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 24px 48px -28px rgba(0,0,0,.8);backdrop-filter:blur(6px);transition:border-color .4s,outline-color .4s}
.os-card:hover{border-color:rgba(255,255,255,.2);outline-color:rgba(141,198,63,.25)}
.os-task{display:flex;gap:14px;align-items:flex-start;padding:14px 20px;border-top:1px solid rgba(255,255,255,.07)}
.os-task:hover{background:rgba(255,255,255,.03)}
.os-task:hover .os-del{opacity:1}
.os-del{opacity:0;transition:opacity .15s}
.os-chk{flex:none;width:22px;height:22px;border-radius:7px;border:1.5px solid rgba(255,255,255,.35);background:rgba(255,255,255,.04);color:#fff;cursor:pointer;display:grid;place-items:center;margin-top:1px;padding:0}
.os-chk.ip{border-color:#f0a020;background:rgba(240,160,32,.12)}
.os-chk.ok{border-color:${GREEN};background:${GREEN};color:#fff}
.os-pill{font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px}
.os-pill a{color:#fff}
.os-modal{position:fixed;inset:0;background:rgba(7,13,36,.6);backdrop-filter:blur(4px);display:grid;place-items:center;z-index:50;padding:20px}
.os-sel{border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:8px 14px;font:inherit;font-weight:600;color:#fff;background:rgba(255,255,255,.06);max-width:260px}
.os-sel option{color:${NAVY};background:#fff}
.os-menu{display:none}
@media(max-width:860px){.os{grid-template-columns:1fr}.os-side{display:none;position:fixed;top:64px;left:0;bottom:0;width:280px;z-index:40;background:#0b1233;box-shadow:8px 0 24px rgba(0,0,0,.4)}.os-side.open{display:block}.os-menu{display:inline-flex}.os-hide-m{display:none}}
/* Hauptfläche hell: weiß mit dezentem CI-Grün, Sidebar/Topbar bleiben Navy-Premium */
.os-main{background:radial-gradient(900px 420px at 100% 0%,rgba(141,198,63,.07),transparent 60%),#fff;color:#0b1233;border-top-left-radius:18px;box-shadow:inset 1px 1px 0 rgba(255,255,255,.6)}
.os-main .os-h{color:#0b1233}
.os-main .os-eyebrow{color:#6b7385}
.os-main .os-btn{border-color:rgba(11,18,51,.16);background:#fff;color:#0b1233}
.os-main .os-btn:hover{border-color:${GREEN};background:rgba(141,198,63,.07)}
.os-main .os-btn.ghost{border-color:transparent;background:none;color:#7a8296}
.os-main .os-btn.ghost:hover{color:#0b1233;background:rgba(11,18,51,.05)}
.os-main .os-in{border-color:rgba(11,18,51,.14);background:#fff;color:#0b1233}
.os-main .os-in::placeholder{color:#9aa1b2}
.os-main .os-bar{background:rgba(11,18,51,.07)}
.os-main .os-card{background:#fff;border:1px solid rgba(11,18,51,.08);outline:0;box-shadow:0 1px 2px rgba(11,18,51,.04),0 14px 32px -22px rgba(11,18,51,.25);backdrop-filter:none;border-left:3px solid rgba(141,198,63,.55)}
.os-main .os-card:hover{border-color:rgba(11,18,51,.12);border-left-color:${GREEN}}
.os-main .os-task{border-top-color:rgba(11,18,51,.06)}
.os-main .os-task:hover{background:rgba(141,198,63,.04)}
.os-main .os-chk{border-color:rgba(11,18,51,.25);background:#fff;color:#fff}
.os-main .os-chk.ok{border-color:${GREEN};background:${GREEN}}
.os-main .os-pill a{color:#0b1233}
.os-main .hub-pill-d{--pill:linear-gradient(100deg,#0b1233 0%,#16205a 100%);--ring:rgba(141,198,63,.45);--kante:rgba(255,255,255,.2);--schatten:rgba(11,18,51,.25);color:#fff}
@media(max-width:860px){.os-main{border-radius:0}}
`;
