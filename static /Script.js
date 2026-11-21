:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);--bg:#E8F6F8;--card:#fff;--ink:#06222B;--mut:#5B7480;--deep:#0B3C5D;--water:#2BB3C9;--amber:#E8912D;--red:#D6454B;--ok:#1F9D6B;--line:#d5e6ea;--soft:#E8F6F8;--bt:#fff}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#071A20;--card:#0E2C36;--ink:#E6F4F7;--mut:#8FB0BA;--deep:#2BB3C9;--line:#1b4350;--soft:#12394a;--bt:#06222B}}
:root[data-theme="dark"]{--bg:#071A20;--card:#0E2C36;--ink:#E6F4F7;--mut:#8FB0BA;--deep:#2BB3C9;--line:#1b4350;--soft:#12394a;--bt:#06222B}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Avenir Next","Segoe UI",Roboto,sans-serif}
.app{max-width:460px;margin:0 auto;min-height:100vh}
header{background:#06222B;color:#fff;padding:16px 18px 10px}
header h1{margin:0;font-size:22px}header p{margin:2px 0 8px;font-size:13px;color:#8fc9d6}
.bar{display:flex;gap:6px;flex-wrap:wrap}
.bar button,.bar select{font:inherit;font-size:12px;font-weight:700;border:0;border-radius:8px;padding:7px 10px;background:#12394a;color:#fff}
main{padding:14px 14px 90px}
.card{background:var(--card);border-radius:14px;padding:14px;margin-bottom:12px;box-shadow:0 1px 3px rgba(6,34,43,.15)}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px}
.pill{padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;color:#fff;background:var(--ok)}
.pill.low{background:var(--amber)}.pill.over,.pill.leak{background:var(--red)}
.pct{font-size:34px;font-weight:800}.pct small{font-size:16px}
.mut{color:var(--mut);font-size:13px}
.g{height:14px;border-radius:8px;background:var(--soft);overflow:hidden;margin:8px 0}
.g i{display:block;height:100%;background:var(--water);transition:width .5s}
.g.low i{background:var(--amber)}.g.over i,.g.leak i{background:var(--red)}
.btns{display:flex;gap:8px;margin-top:10px}
.btns button{flex:1;border:0;border-radius:10px;padding:11px 6px;font:inherit;font-size:13px;font-weight:700;background:var(--deep);color:var(--bt);cursor:pointer}
.btns button.alt{background:transparent;color:var(--ink);border:2px solid var(--line)}
button:focus-visible,select:focus-visible{outline:3px solid var(--amber);outline-offset:2px}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.stat{background:var(--card);border-radius:12px;padding:12px}.stat b{font-size:22px;display:block}
.bars{display:flex;align-items:flex-end;gap:6px;height:150px;margin-top:8px}
.b{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;font-size:11px;color:var(--mut)}
.b i{display:block;width:100%;background:var(--water);border-radius:5px 5px 0 0;min-height:2px}.b.t i{background:var(--deep)}
.al{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line)}.al:last-child{border:0}
.dot{width:11px;height:11px;border-radius:50%;margin-top:5px;background:var(--amber);flex:none}.dot.over,.dot.leak{background:var(--red)}
nav{position:fixed;bottom:0;left:0;right:0;max-width:460px;margin:0 auto;display:flex;background:var(--card);border-top:1px solid var(--line);padding-bottom:env(safe-area-inset-bottom,0px)}
nav button{flex:1;border:0;background:none;color:var(--mut);padding:14px 4px;font:inherit;font-size:14px;font-weight:700}
nav button.on{color:var(--deep);box-shadow:inset 0 3px 0 var(--water)}
.badge{background:var(--red);color:#fff;border-radius:10px;font-size:11px;padding:1px 6px;margin-left:4px}
.tip{font-size:14px;padding:7px 0 0;color:var(--ink)}
.ed{border:0;background:var(--soft);color:var(--ink);border-radius:6px;padding:2px 8px;margin-left:6px;font-size:12px}
input{font:inherit;width:100%;padding:12px;border-radius:10px;border:2px solid var(--line);background:var(--bg);color:var(--ink);margin:8px 0}
.gobtn{width:100%;border:0;border-radius:10px;padding:12px;font:inherit;font-weight:700;background:var(--deep);color:var(--bt);cursor:pointer}
.card .row{padding:5px 0}
.bad,.stat.bad b{color:var(--red)}
.dot.autoon,.dot.autooff{background:var(--water)}
.lb{display:flex;align-items:center;gap:8px;margin-top:8px}.lb span{width:118px;font-size:13px}.lb .g{flex:1;margin:0}.lb b{width:30px;text-align:right}
