export const NAVY = "#0b1233";
export const GREEN = "#8dc63f";
export const CSS = `
.os{position:fixed;inset:0;display:grid;grid-template-columns:280px 1fr;grid-template-rows:64px 1fr;background:#fff;color:${NAVY};font-family:var(--font-dm-sans),system-ui,sans-serif;font-size:14px}
.os *{box-sizing:border-box}
.os-top{grid-column:1/-1;display:flex;align-items:center;gap:16px;padding:0 24px;border-bottom:1px solid #eceef3;background:#fff}
.os-side{border-right:1px solid #eceef3;background:#fafbfc;overflow:auto;padding:20px 14px}
.os-main{overflow:auto;padding:36px clamp(20px,4vw,56px) 80px}
.os-h{font-family:var(--font-jost),sans-serif;font-weight:600;letter-spacing:-.01em;margin:0}
.os-eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7a8199;font-weight:600}
.os-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid #e1e4ec;background:#fff;color:${NAVY};padding:8px 14px;border-radius:9px;font:inherit;font-weight:500;cursor:pointer;transition:all .15s}
.os-btn:hover{border-color:${NAVY}}
.os-btn.pri{background:${NAVY};border-color:${NAVY};color:#fff}
.os-btn.pri:hover{background:#18215a}
.os-btn.ghost{border-color:transparent;background:none;color:#7a8199;padding:6px 8px}
.os-btn.ghost:hover{color:${NAVY};background:#f1f3f7}
.os-in{width:100%;border:1px solid #e1e4ec;border-radius:9px;padding:10px 12px;font:inherit;color:${NAVY};background:#fff;outline:none}
.os-in:focus{border-color:${GREEN};box-shadow:0 0 0 3px rgba(141,198,63,.18)}
.os-nav{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;border:0;background:none;font:inherit;color:#3a4160;cursor:pointer;text-align:left}
.os-nav:hover{background:#f0f2f6}
.os-nav.on{background:#fff;color:${NAVY};font-weight:600;box-shadow:0 1px 2px rgba(11,18,51,.06),0 0 0 1px #eceef3}
.os-bar{height:6px;border-radius:6px;background:#eef0f4;overflow:hidden}
.os-bar>i{display:block;height:100%;background:${GREEN};border-radius:6px;transition:width .4s}
.os-card{border:1px solid #eceef3;border-radius:16px;background:#fff;box-shadow:0 1px 2px rgba(11,18,51,.03)}
.os-task{display:flex;gap:14px;align-items:flex-start;padding:14px 20px;border-top:1px solid #f2f3f7}
.os-task:hover{background:#fbfcfd}
.os-task:hover .os-del{opacity:1}
.os-del{opacity:0;transition:opacity .15s}
.os-chk{flex:none;width:22px;height:22px;border-radius:7px;border:1.5px solid #c9cedb;background:#fff;cursor:pointer;display:grid;place-items:center;margin-top:1px;padding:0}
.os-chk.ip{border-color:#f0a020;background:#fff7e8}
.os-chk.ok{border-color:${GREEN};background:${GREEN};color:#fff}
.os-pill{font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px}
.os-modal{position:fixed;inset:0;background:rgba(11,18,51,.35);backdrop-filter:blur(3px);display:grid;place-items:center;z-index:50;padding:20px}
.os-sel{border:1px solid #e1e4ec;border-radius:9px;padding:8px 10px;font:inherit;font-weight:600;color:${NAVY};background:#fff;max-width:260px}
.os-menu{display:none}
@media(max-width:860px){.os{grid-template-columns:1fr}.os-side{display:none;position:fixed;top:64px;left:0;bottom:0;width:280px;z-index:40;box-shadow:8px 0 24px rgba(0,0,0,.1)}.os-side.open{display:block}.os-menu{display:inline-flex}.os-hide-m{display:none}}
`;
