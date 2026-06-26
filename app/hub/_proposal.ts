export const PROPOSAL_HTML = `<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Community Hub · Propuesta de colaboración — Change</title>
<link rel="preconnect" href="https://use.typekit.net">
<link rel="stylesheet" href="https://use.typekit.net/vjn7ksg.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
:root{
  --ink-graphite:#2E2E33; --deep-warm-gray:#4A4A52; --strategic-gray:#667085;
  --soft-stone-gray:#BFC3CB; --mist-gray:#D9DEE4; --pearl-light:#EEF2F6;
  --cloud-white:#F5F6F7; --pure-white:#F9F9F6;
  --change-violet:#6D3BFF; --deep-violet:#5524E0; --pressed-violet:#4218C8;
  --soft-violet:#8A6CFF; --lavender-mist:#D9D2FF; --violet-whisper:#F1EDFF;
  --violet-ink:#1F1148; --violet-subtle:rgba(109,59,255,.10);
  --signal-cyan:#59B8D9; --human-pink:#B86AA4; --opportunity-orange:#C97A3A;
  --success:#5AA67A; --warning:#C98C42; --error:#C85E55;
  --status-success-fg:#2F7C57; --status-warning-fg:#95642A; --status-error-fg:#B04A41;
  --surface-page:var(--cloud-white); --surface-card:var(--pure-white);
  --surface-soft:var(--pearl-light); --surface-inset:#E8ECF0;
  --text-strong:var(--ink-graphite); --text-body:var(--deep-warm-gray);
  --text-muted:var(--strategic-gray); --text-faint:var(--soft-stone-gray);
  --border-subtle:var(--mist-gray); --border-strong:var(--soft-stone-gray);
  --divider:var(--mist-gray); --focus-ring:rgba(109,59,255,.35);
  --track-graphite:rgba(46,46,51,.08);
  --font-primary:"Postea","postea-variable","Helvetica Neue",Arial,system-ui,sans-serif;
  --font-accent:"bd-orange-variable","Postea","Helvetica Neue",Arial,sans-serif;
  --font-mono:"IBM Plex Mono","SFMono-Regular",Consolas,monospace;
  --text-display:clamp(48px,7vw,96px); --text-h1:clamp(36px,5vw,64px);
  --text-h2:clamp(28px,3.4vw,44px); --text-h3:clamp(20px,2vw,26px);
  --text-lead:19px; --text-base:16px; --text-sm:14px; --text-xs:13px; --text-meta:11px;
  --weight-light:300; --weight-regular:400; --weight-medium:500; --weight-semibold:600;
  --leading-tight:1.04; --leading-snug:1.16; --leading-heading:1.22; --leading-body:1.6;
  --tracking-display:-.05em; --tracking-h1:-.04em; --tracking-h2:-.03em; --tracking-h3:-.02em; --tracking-meta:.1em;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-6:24px;
  --space-8:32px; --space-12:48px; --space-18:72px; --space-24:96px;
  --layout-max:1180px; --layout-margin:clamp(20px,5vw,80px);
  --radius:0px; --radius-node:50%;
  --outline-graphite:1px solid rgba(46,46,51,.16);
  --outline-graphite-strong:1px solid rgba(46,46,51,.24);
  --shadow-soft:0 4px 14px rgba(46,46,51,.05);
  --shadow-md:0 10px 28px rgba(46,46,51,.09);
  --shadow-premium:0 18px 48px rgba(46,46,51,.12);
  --shadow-violet:0 12px 32px rgba(109,59,255,.11);
  --ease-premium:cubic-bezier(.22,1,.36,1); --dur-fast:120ms; --dur-std:220ms;
  --ease-strategic:cubic-bezier(.22,1,.36,1); --motion-draw:3600ms; --motion-breathe:7s;
  --pulse-period:3200ms; --pulse-stagger:.75s; --pulse-scale:1.28;
  --gradient-display-cyan:linear-gradient(135deg,#59B8D9 0%,#2C7491 100%);
}
[data-theme="dark"]{
  --surface-page:#0A0E15; --surface-card:#161B2E; --surface-soft:#1A202C; --surface-inset:#121722;
  --text-strong:#F0F4FF; --text-body:rgba(240,244,255,.72); --text-muted:rgba(240,244,255,.45);
  --text-faint:rgba(240,244,255,.30);
  --border-subtle:rgba(255,255,255,.08); --border-strong:rgba(255,255,255,.15);
  --divider:rgba(255,255,255,.10); --track-graphite:rgba(255,255,255,.10);
  --violet-whisper:rgba(109,59,255,.12); --violet-subtle:rgba(138,108,255,.15);
  --change-violet:#8A6CFF; --deep-violet:#B7A8FF; --lavender-mist:#B7A8FF;
  --status-success-fg:#7FC79E; --status-warning-fg:#E1B271; --status-error-fg:#E18A82;
  --outline-graphite:1px solid rgba(255,255,255,.12);
  --outline-graphite-strong:1px solid rgba(255,255,255,.20);
  --shadow-soft:none; --shadow-md:0 18px 48px rgba(10,14,21,.22); --shadow-premium:0 24px 72px rgba(10,14,21,.30);
}
@media (prefers-reduced-motion:reduce){*{animation-duration:1ms!important;transition-duration:1ms!important}}
@keyframes ch-draw{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes ch-draw-v{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes ch-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(var(--pulse-scale));opacity:1}}
@keyframes ch-breathe{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes ch-node-arrive{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.type-display-secondary{font-family:var(--font-accent);text-transform:uppercase;font-weight:var(--weight-light);
  letter-spacing:.01em;background:var(--gradient-display-cyan);-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent}
.draw{clip-path:inset(0 100% 0 0)}
.draw.is-active{animation:ch-draw var(--motion-draw) var(--ease-strategic) forwards}
@media print{*{animation:none!important}.draw{clip-path:none!important}}
@media (prefers-reduced-motion:reduce){.draw{clip-path:none!important;animation:none!important}}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:var(--font-primary); background:var(--surface-page); color:var(--text-body);
  font-size:var(--text-base); line-height:var(--leading-body);
  -webkit-font-smoothing:antialiased; transition:background var(--dur-std) var(--ease-premium),color var(--dur-std) var(--ease-premium);
}
.wrap{max-width:var(--layout-max);margin:0 auto;padding:0 var(--layout-margin)}
.meta{font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:var(--tracking-meta);
  text-transform:uppercase;color:var(--text-muted)}
h1,h2,h3{color:var(--text-strong);font-weight:var(--weight-semibold);line-height:var(--leading-heading)}
a{color:var(--text-strong)}
.topbar{position:sticky;top:0;z-index:100;background:color-mix(in srgb,var(--surface-page) 88%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--divider)}
.topbar-inner{max-width:var(--layout-max);margin:0 auto;padding:0 var(--layout-margin);
  height:64px;display:flex;align-items:center;justify-content:space-between;gap:var(--space-6)}
.brand{display:flex;align-items:center;gap:var(--space-3);font-weight:var(--weight-semibold);color:var(--text-strong);
  letter-spacing:-.02em;font-size:18px}
.brand .node{width:9px;height:9px;border-radius:50%;background:var(--change-violet);display:inline-block;
  box-shadow:0 0 0 4px var(--violet-subtle)}
.nav{display:flex;gap:var(--space-1);overflow-x:auto;scrollbar-width:none}
.nav::-webkit-scrollbar{display:none}
.nav button{font-family:var(--font-primary);font-size:var(--text-sm);color:var(--text-muted);
  background:none;border:none;cursor:pointer;padding:8px 14px;white-space:nowrap;position:relative;
  border-radius:0;transition:color var(--dur-fast) var(--ease-premium)}
.nav button:hover{color:var(--text-strong)}
.nav button.active{color:var(--change-violet)}
.nav button.active::after{content:"";position:absolute;left:14px;right:14px;bottom:0;height:2px;background:var(--change-violet)}
.theme-toggle{font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:var(--tracking-meta);
  text-transform:uppercase;background:none;border:var(--outline-graphite);color:var(--text-muted);
  padding:7px 12px;cursor:pointer;transition:var(--dur-fast)}
.theme-toggle:hover{color:var(--text-strong);border-color:var(--text-strong)}
.panel{display:none;animation:fade .42s var(--ease-premium)}
.panel.active{display:block}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
section{padding:var(--space-18) 0}
.eyebrow{display:inline-flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-4)}
.eyebrow .line{width:28px;height:1px;background:var(--change-violet)}
.hero{padding:var(--space-24) 0 var(--space-18)}
.hero h1{font-size:var(--text-h1);letter-spacing:var(--tracking-h1);max-width:16ch;margin-bottom:var(--space-6)}
.hero .accent{color:var(--change-violet)}
.hero p.lead{font-size:var(--text-lead);color:var(--text-body);max-width:60ch;line-height:var(--leading-body)}
.hero-meta{display:flex;flex-wrap:wrap;gap:var(--space-8);margin-top:var(--space-12);padding-top:var(--space-6);
  border-top:1px solid var(--divider)}
.hero-meta div .meta{display:block;margin-bottom:4px}
.hero-meta div strong{color:var(--text-strong);font-weight:var(--weight-medium);font-size:var(--text-sm)}
h2.section-title{font-size:var(--text-h2);letter-spacing:var(--tracking-h2);margin-bottom:var(--space-4);max-width:20ch}
.section-intro{font-size:var(--text-lead);color:var(--text-body);max-width:62ch;margin-bottom:var(--space-12)}
.card{background:var(--surface-card);border:var(--outline-graphite);box-shadow:var(--shadow-soft);
  padding:var(--space-8);transition:box-shadow var(--dur-std) var(--ease-premium),transform var(--dur-std) var(--ease-premium)}
.card:hover{box-shadow:var(--shadow-md)}
.grid{display:grid;gap:var(--space-4)}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
@media(max-width:860px){.grid-2,.grid-3{grid-template-columns:1fr}}
.card h3{font-size:var(--text-h3);letter-spacing:var(--tracking-h3);margin-bottom:var(--space-3)}
.card p{font-size:var(--text-sm);color:var(--text-body)}
.card .knum{font-family:var(--font-accent);font-weight:var(--weight-light);font-size:40px;line-height:1;
  display:block;margin-bottom:var(--space-3);text-transform:uppercase;letter-spacing:.01em;
  background:var(--gradient-display-cyan);-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent}
.badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:var(--text-meta);
  letter-spacing:.06em;text-transform:uppercase;color:var(--text-strong);padding:5px 10px;border:1px solid var(--border-strong);
  background:var(--surface-card)}
.badge .dot{width:7px;height:7px;border-radius:50%}
.dot-violet{background:var(--change-violet)} .dot-success{background:var(--success)}
.dot-warning{background:var(--warning)} .dot-error{background:var(--error)} .dot-signal{background:var(--signal-cyan)}
.tbl-scroll{overflow-x:auto;border:var(--outline-graphite);background:var(--surface-card)}
table{border-collapse:collapse;width:100%;min-width:880px;font-size:var(--text-sm)}
th,td{text-align:left;padding:var(--space-4);border-bottom:1px solid var(--divider);vertical-align:top}
thead th{background:var(--surface-soft);font-family:var(--font-mono);font-size:var(--text-meta);
  letter-spacing:var(--tracking-meta);text-transform:uppercase;color:var(--text-muted);font-weight:var(--weight-medium);
  position:sticky;top:0}
tbody th{font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:.06em;text-transform:uppercase;
  color:var(--text-muted);font-weight:var(--weight-medium);white-space:nowrap;background:var(--surface-card)}
td strong{color:var(--text-strong);font-weight:var(--weight-medium)}
tr:last-child td,tr:last-child th{border-bottom:none}
.row-accent td{background:var(--violet-whisper)}
.finding{display:flex;gap:var(--space-4);padding:var(--space-6) 0;border-bottom:1px solid var(--divider)}
.finding:last-child{border-bottom:none}
.finding .sev{font-family:var(--font-mono);font-size:18px;line-height:1.2;flex-shrink:0;width:28px}
.finding h4{color:var(--text-strong);font-size:var(--text-base);font-weight:var(--weight-semibold);margin-bottom:4px}
.finding p{font-size:var(--text-sm);color:var(--text-body)}
.price-row{display:grid;grid-template-columns:140px 1fr auto;gap:var(--space-6);align-items:start;
  padding:var(--space-8) 0;border-bottom:1px solid var(--divider)}
@media(max-width:780px){.price-row{grid-template-columns:1fr;gap:var(--space-3)}}
.price-row .phase{font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:.06em;text-transform:uppercase;
  color:var(--change-violet);font-weight:var(--weight-medium)}
.price-row .phase span{display:block;color:var(--text-faint);margin-top:6px;font-size:var(--text-meta)}
.price-row h3{font-size:var(--text-h3);letter-spacing:var(--tracking-h3);margin-bottom:var(--space-2)}
.price-row p{font-size:var(--text-sm);color:var(--text-body);max-width:60ch}
.price-row .amount{text-align:right;white-space:nowrap}
.price-row .amount .num{font-family:var(--font-accent);font-weight:var(--weight-light);font-size:24px;color:var(--text-strong)}
.price-row .amount .pay{display:block;margin-top:6px}
.total-bar{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:var(--space-4);
  margin-top:var(--space-8);padding:var(--space-8);background:var(--surface-soft);border:var(--outline-graphite)}
.total-bar .num{font-family:var(--font-accent);font-weight:var(--weight-light);font-size:var(--text-h2);color:var(--change-violet)}
.assumptions{margin-top:var(--space-12)}
.assumptions ul{list-style:none}
.assumptions li{font-size:var(--text-sm);color:var(--text-body);padding:var(--space-3) 0;padding-left:var(--space-6);
  position:relative;border-bottom:1px solid var(--divider)}
.assumptions li::before{content:"";position:absolute;left:0;top:18px;width:7px;height:7px;border-radius:50%;
  background:var(--change-violet)}
.prose{max-width:68ch}
.prose h3{font-size:var(--text-h3);letter-spacing:var(--tracking-h3);margin:var(--space-12) 0 var(--space-4)}
.prose p{font-size:var(--text-base);color:var(--text-body);margin-bottom:var(--space-4)}
.prose ul{margin:0 0 var(--space-4) 0;padding-left:0;list-style:none}
.prose li{font-size:var(--text-base);color:var(--text-body);padding:var(--space-2) 0 var(--space-2) var(--space-6);
  position:relative}
.prose li::before{content:"";position:absolute;left:0;top:14px;width:18px;height:1px;background:var(--change-violet)}
.prose strong{color:var(--text-strong);font-weight:var(--weight-semibold)}
blockquote{border-left:2px solid var(--change-violet);padding:var(--space-2) 0 var(--space-2) var(--space-6);
  margin:var(--space-6) 0;color:var(--text-strong);font-size:var(--text-lead);font-style:italic}
.flow{display:flex;flex-direction:column;gap:0;margin:var(--space-8) 0}
.flow-step{display:grid;grid-template-columns:32px 1fr;gap:var(--space-6)}
.flow-rail{display:flex;flex-direction:column;align-items:center}
.flow-rail .node{width:14px;height:14px;border-radius:50%;border:2px solid var(--change-violet);
  background:var(--surface-page);flex-shrink:0;margin-top:4px}
.flow-rail .node.filled{background:var(--change-violet)}
.flow-rail .node.live{animation:ch-pulse var(--pulse-period) var(--ease-strategic) infinite;
  animation-delay:calc(var(--nd,0)*var(--pulse-stagger));transform-box:fill-box;will-change:transform}
.flow-rail .stem{width:1px;flex:1;background:var(--divider);margin:6px 0;transform-origin:top;transform:scaleY(0)}
.flow.is-active .stem{animation:ch-draw-v var(--motion-draw) var(--ease-strategic) forwards}
@media print{.flow-rail .stem{transform:none!important}}
@media (prefers-reduced-motion:reduce){.flow-rail .stem{transform:none!important}}
.flow-step:last-child .stem{display:none}
.flow-body{padding-bottom:var(--space-8)}
.flow-body .meta{display:block;margin-bottom:6px}
.flow-body h4{color:var(--text-strong);font-size:var(--text-h3);letter-spacing:var(--tracking-h3);margin-bottom:6px}
.flow-body p{font-size:var(--text-sm);color:var(--text-body);max-width:60ch}
.codewrap{position:relative;border:var(--outline-graphite);background:var(--surface-inset)}
.codewrap .codehead{display:flex;justify-content:space-between;align-items:center;padding:var(--space-3) var(--space-4);
  border-bottom:1px solid var(--divider);background:var(--surface-soft)}
.copybtn{font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:var(--tracking-meta);text-transform:uppercase;
  background:var(--change-violet);color:#fff;border:none;padding:7px 14px;cursor:pointer;transition:var(--dur-fast)}
.copybtn:hover{background:var(--deep-violet)}
pre{font-family:var(--font-mono);font-size:var(--text-xs);line-height:1.7;color:var(--text-body);
  padding:var(--space-6);overflow-x:auto;white-space:pre;max-height:520px}
.cta{background:var(--surface-soft);border:var(--outline-graphite);padding:var(--space-18) var(--space-12);text-align:center;
  margin:var(--space-18) 0}
.cta h2{font-size:var(--text-h2);letter-spacing:var(--tracking-h2);margin-bottom:var(--space-4)}
.cta p{font-size:var(--text-lead);color:var(--text-body);max-width:52ch;margin:0 auto var(--space-8)}
.btn{display:inline-block;font-family:var(--font-primary);font-weight:var(--weight-medium);font-size:var(--text-base);
  background:var(--change-violet);color:#fff;border:none;padding:14px 32px;cursor:pointer;text-decoration:none;
  box-shadow:var(--shadow-violet);transition:var(--dur-std) var(--ease-premium)}
.btn:hover{background:var(--deep-violet);transform:translateY(-1px)}
footer{border-top:1px solid var(--divider);padding:var(--space-12) 0;margin-top:var(--space-18)}
.footgrid{display:flex;justify-content:space-between;flex-wrap:wrap;gap:var(--space-6);align-items:center}
.ds-note{font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:.06em;color:var(--text-faint);text-transform:uppercase}
.warnflag{display:inline-flex;align-items:center;gap:6px;color:var(--status-warning-fg)}
/* ── feedback ── */
.fb-input{width:100%;padding:12px 16px;border:var(--outline-graphite-strong);background:var(--surface-card);
  font-family:var(--font-primary);font-size:var(--text-base);color:var(--text-strong);
  outline:none;border-radius:0;transition:border var(--dur-fast) var(--ease-premium);-webkit-appearance:none}
.fb-input:focus{border-color:var(--change-violet)}
.fb-label{display:block;font-family:var(--font-mono);font-size:var(--text-meta);letter-spacing:var(--tracking-meta);
  text-transform:uppercase;color:var(--text-muted);margin-bottom:var(--space-2)}
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-inner">
    <div class="brand"><span class="node"></span>Change · Community Hub</div>
    <nav class="nav" id="nav">
      <button data-t="resumen" class="active">Resumen</button>
      <button data-t="blueprint">Blueprint</button>
      <button data-t="cotizacion">Cotización</button>
      <button data-t="propuesta">Propuesta</button>
      <button data-t="sprint0">Sprint 0</button>
    </nav>
    <button class="theme-toggle" id="themeBtn">Dark</button>
  </div>
</div>

<!-- ════ RESUMEN ════ -->
<div class="panel active" id="resumen">
  <div class="wrap">
    <div class="hero">
      <div class="eyebrow"><span class="line"></span><span class="meta">Propuesta de colaboración · 26 Jun 2026</span></div>
      <h1>Tu prototipo ya resuelve el dolor. Falta convertirlo en <span class="accent">producto y operación</span>.</h1>
      <p class="lead">Community Hub centraliza la vida de un resort residencial premium en un solo punto de contacto. El frontend está al 90%. Lo que falta no es codear —eso hoy se acelera— sino la arquitectura de datos, la multitenancy y la capa operativa que sostiene el valor.</p>
      <div class="hero-meta">
        <div><span class="meta">Cliente / Prospecto</span><strong>Elmer · Tulum Country Club</strong></div>
        <div><span class="meta">Modelo</span><strong>SaaS multitenant B2B2C</strong></div>
        <div><span class="meta">Stack</span><strong>Next.js · Supabase · Prisma · Vercel</strong></div>
        <div><span class="meta">Modalidad</span><strong>Servicios por fases</strong></div>
      </div>
    </div>

    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Cómo lo vemos</span></div>
      <h2 class="section-title">Tres verdades que valen más que el código</h2>
      <p class="section-intro">Lo que ustedes resuelven no es la fábrica de software; es la arquitectura de negocio. Estas tres decisiones definen si esto es un proyecto único o un activo escalable.</p>
      <div class="grid grid-3">
        <div class="card">
          <span class="knum">01</span>
          <h3>Bespoke vs. SaaS</h3>
          <p>Piñero quiere el sistema "en sus servidores". Si eso dicta la arquitectura, se mata el activo escalable por un proyecto único. Se resuelve diseñando <strong>multitenant desde el día cero</strong>, con instancia dedicada y aislada para Piñero — mismo motor, IP intacta.</p>
        </div>
        <div class="card">
          <span class="knum">02</span>
          <h3>El negocio es la curaduría</h3>
          <p>Alguien tiene que calificar proveedores y capturar datos <strong>todos los días</strong>. Esa capa operativa es el foso defensivo contra clones y el ingreso recurrente. No es un feature: es una operación.</p>
        </div>
        <div class="card">
          <span class="knum">03</span>
          <h3>El diferenciador ya existe</h3>
          <p>El acceso de invitados por voz ("créame un QR para mañana") y los proveedores curados por referencia del vecino. Ahí está el "wow" y ahí enfocamos el alcance de construcción.</p>
        </div>
      </div>
    </section>

    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Las 4 fases</span></div>
      <h2 class="section-title">Una colaboración escalonada</h2>
      <p class="section-intro">Cada fase entrega valor independiente y habilita la siguiente. Empezamos por de-riesgar, no por codear.</p>
      <div class="flow" id="phaseFlow">
        <div class="flow-step"><div class="flow-rail"><div class="node live filled" style="--nd:0"></div><div class="stem"></div></div>
          <div class="flow-body"><span class="meta">Fase 0 · 2–3 semanas</span><h4>Discovery &amp; Arquitectura</h4>
          <p>Service blueprint, validación del modelo de negocio y el Sprint 0 arquitectónico (multitenant-ready + despliegue dual). Es el cimiento; se entrega antes de escribir una línea de producción.</p></div></div>
        <div class="flow-step"><div class="flow-rail"><div class="node live" style="--nd:1"></div><div class="stem"></div></div>
          <div class="flow-body"><span class="meta">Fase 1 · 5–7 semanas</span><h4>Núcleo multitenant</h4>
          <p>Backend completo, modelo de datos, auth + roles, multitenancy (RLS), i18n ES/EN, frontend existente conectado a backend real.</p></div></div>
        <div class="flow-step"><div class="flow-rail"><div class="node live" style="--nd:2"></div><div class="stem"></div></div>
          <div class="flow-body"><span class="meta">Fase 2 · 6–9 semanas</span><h4>Módulos de valor</h4>
          <p>Proveedores curados + panel de curaduría, reservas/integraciones, concierge IA por voz + QR de acceso, marketplace, real estate, feed y alertas.</p></div></div>
        <div class="flow-step"><div class="flow-rail"><div class="node live" style="--nd:3"></div></div>
          <div class="flow-body"><span class="meta">Fase 3 · 3–4 semanas + retainer</span><h4>Despliegue Piñero + replicación</h4>
          <p>Instancia dedicada para el primer resort, hardening y kit de provisioning para el resort #2. Más retainer de curaduría operativa.</p></div></div>
      </div>
    </section>
  </div>
</div>

<!-- ════ BLUEPRINT ════ -->
<div class="panel" id="blueprint">
  <div class="wrap">
    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Fase 0 · Entregable</span></div>
      <h2 class="section-title">Service Blueprint del residente</h2>
      <p class="section-intro">Experiencia del residente premium, desde que llega a vivir al resort hasta el uso cotidiano. Las bandas revelan dónde la operación —no la UI— es la que falla hoy.</p>
      <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-6)">
        <span class="badge"><span class="dot dot-error"></span>Fallo crítico</span>
        <span class="badge"><span class="dot dot-warning"></span>Fricción</span>
        <span class="badge"><span class="dot dot-success"></span>Oportunidad</span>
      </div>
      <div class="tbl-scroll">
        <table>
          <thead><tr>
            <th>Banda</th><th>1 · Onboarding + accesos</th><th>2 · Necesito un servicio</th>
            <th>3 · Reservar amenidad</th><th>4 · Enterarme / emergencia</th><th>5 · SOS seguridad</th><th>6 · Concierge por voz</th>
          </tr></thead>
          <tbody>
            <tr><th>Acción del cliente</th>
              <td>Se muda; quiere invitar a alguien y darle acceso</td>
              <td>Se le rompe una tubería; busca plomero confiable</td>
              <td>Quiere jugar golf / padel hoy</td>
              <td>Hay huracán / se perdió una mascota</td>
              <td>Situación de riesgo, necesita seguridad ya</td>
              <td>"Créame un QR para Andrés para mañana"</td></tr>
            <tr><th>Canal hoy</th>
              <td>WhatsApp + caseta: pide placa del carro, reenvía código que se bloquea</td>
              <td>Pregunta en ~50 grupos de WhatsApp, suerte</td>
              <td>Otra app externa, login aparte</td>
              <td>Revisa ~50 grupos de WhatsApp, ruido total</td>
              <td>Llama por teléfono / grita en grupo</td>
              <td><em>No existe</em></td></tr>
            <tr><th>Frontstage c/ plataforma</th>
              <td><strong>Genera invitación con QR</strong> desde la app, válida por fecha</td>
              <td>Directorio de proveedores curados, reviews 5★ + referencia de vecino</td>
              <td>Reserva embebida o deep-link unificado</td>
              <td>Feed / alertas oficiales priorizadas</td>
              <td>Botón SOS → notifica a seguridad al instante</td>
              <td>Asistente de voz ejecuta la acción y confirma</td></tr>
            <tr><th>Backstage</th>
              <td>Sistema emite AccessPass, registra invitado, notifica caseta</td>
              <td><strong>Curaduría diaria de Change:</strong> alta, verificación y calificación</td>
              <td>Sincroniza disponibilidad con app externa</td>
              <td>Admin del resort publica; motor de alertas segmenta</td>
              <td>Seguridad recibe alerta con ubicación / unidad</td>
              <td>IA mapea intención→AccessPass, dispara WhatsApp</td></tr>
            <tr><th>Sistemas de soporte</th>
              <td>Supabase Auth + tabla AccessPass + generador QR</td>
              <td>Tabla Provider/Review + panel de curaduría</td>
              <td>Integración API / deep-link externa</td>
              <td>Supabase Realtime + segmentación por tenant</td>
              <td>Supabase Realtime + rol security</td>
              <td>Claude (tool-use) + speech-to-text + WhatsApp Cloud API</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Hallazgos</span></div>
      <h2 class="section-title">Puntos de falla = justificación del alcance</h2>
      <div class="card" style="padding:var(--space-8) var(--space-12)">
        <div class="finding"><div class="sev" style="color:var(--error)">🔴</div><div>
          <h4>Acceso de invitados — Momento 1</h4>
          <p>El sistema actual está diseñado para seguridad, <strong>no para el residente</strong>. "Si invito a un amigo le tengo que pedir la placa del carro; el código se bloquea." El concierge por voz + AccessPass lo resuelve y es el diferenciador estrella. → <strong>Prioridad máxima.</strong></p>
        </div></div>
        <div class="finding"><div class="sev" style="color:var(--error)">🔴</div><div>
          <h4>Descubrimiento de proveedores — Momento 2</h4>
          <p>Hoy depende del azar de WhatsApp. El valor no es el listado: es la <strong>curaduría diaria + ponderación por referencia del vecino</strong>. Sin la capa operativa, el módulo es un directorio muerto. → Justifica el retainer.</p>
        </div></div>
        <div class="finding"><div class="sev" style="color:var(--error)">🔴</div><div>
          <h4>Información dispersa — Momento 4</h4>
          <p>~50 grupos de WhatsApp = ruido. En emergencia (huracán) el ruido es peligroso. La plataforma como <strong>canal oficial único</strong> es alto valor y baja complejidad. → Quick win de adopción.</p>
        </div></div>
        <div class="finding"><div class="sev" style="color:var(--warning)">🟡</div><div>
          <h4>Reservas — Momento 3</h4>
          <p>Viven en apps externas. El riesgo técnico depende de la API de cada tercero. → Marcar como integración de esfuerzo variable, no asumir.</p>
        </div></div>
        <div class="finding"><div class="sev" style="color:var(--success)">🟢</div><div>
          <h4>SOS — Momento 5</h4>
          <p>Técnicamente simple (Realtime + rol), impacto emocional altísimo. → Incluir en el núcleo: barato y vendedor.</p>
        </div></div>
      </div>
      <p class="section-intro" style="margin-top:var(--space-8)"><strong style="color:var(--text-strong)">Conclusión:</strong> los dos pain points más profundos (accesos por voz y proveedores curados) son también los dos mayores diferenciadores. Anclan la narrativa de venta y el alcance de F2.</p>
    </section>
  </div>
</div>

<!-- ════ COTIZACIÓN ════ -->
<div class="panel" id="cotizacion">
  <div class="wrap">
    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Inversión · MXN sin IVA</span></div>
      <h2 class="section-title">Cotización por fases</h2>
      <p class="section-intro">Fees fijos por entregable, no por hora — protege el diferenciador. Cada fase es cancelable; decides continuar con resultados en la mano.</p>

      <div class="price-row">
        <div class="phase">Fase 0<span>2–3 semanas</span></div>
        <div><h3>Discovery &amp; Arquitectura</h3><p>Service blueprint + journey, validación de modelo de negocio (economía de proveedores) y Sprint 0 arquitectónico (multitenant-ready + despliegue dual).</p></div>
        <div class="amount"><span class="num">$95K – $140K</span><span class="meta pay">100% al inicio</span></div>
      </div>
      <div class="price-row">
        <div class="phase">Fase 1<span>5–7 semanas</span></div>
        <div><h3>Núcleo multitenant</h3><p>Backend completo, modelo de datos, auth + roles, multitenancy (RLS), i18n ES/EN, frontend existente conectado a backend real.</p></div>
        <div class="amount"><span class="num">$280K – $420K</span><span class="meta pay">50% / 50%</span></div>
      </div>
      <div class="price-row">
        <div class="phase">Fase 2<span>6–9 semanas</span></div>
        <div><h3>Módulos de valor</h3><p>Proveedores curados + panel de curaduría, reservas/integraciones, concierge IA por voz + QR, marketplace P2P, real estate, feed/comunidades/alertas.</p></div>
        <div class="amount"><span class="num">$340K – $540K</span><span class="meta pay">Por hitos de módulo</span></div>
      </div>
      <div class="price-row">
        <div class="phase">Fase 3<span>3–4 semanas</span></div>
        <div><h3>Despliegue Piñero + replicación</h3><p>Instancia dedicada/aislada para el primer resort, hardening y kit de provisioning para el resort #2.</p></div>
        <div class="amount"><span class="num">$160K – $260K</span><span class="meta pay">50% / 50%</span></div>
      </div>
      <div class="price-row">
        <div class="phase" style="color:var(--success)">Recurrente<span>Mensual</span></div>
        <div><h3>Retainer operativo</h3><p>Curaduría diaria de proveedores + soporte + captura de datos. La capa que sostiene el valor del producto.</p></div>
        <div class="amount"><span class="num">$28K – $55K</span><span class="meta pay">/ mes</span></div>
      </div>

      <div class="total-bar">
        <div><span class="meta">Total construcción · Fases 0–3</span><div style="margin-top:8px"><span class="num">$875K – $1.36M</span> <span class="meta">MXN · escalonado y cancelable entre fases</span></div></div>
        <span class="badge"><span class="dot dot-violet"></span>Servicios por fases</span>
      </div>

      <div class="assumptions">
        <div class="eyebrow"><span class="line"></span><span class="meta">Supuestos del alcance</span></div>
        <ul>
          <li>Se reutiliza el frontend React/TS existente (no se rehace).</li>
          <li>Integraciones de reservas externas: hasta 2 incluidas; adicionales se cotizan aparte (dependen de API de terceros).</li>
          <li>WhatsApp vía WhatsApp Cloud API; costos de mensajería / IA (tokens, STT) a costo + 15% o los asume el operador.</li>
          <li>La IP del producto multitenant queda en cabeza de Elmer / Change; el resort recibe licencia / instancia.</li>
          <li>F0 se cobra siempre, aunque no se contraten las fases siguientes — filtra seriedad y financia el diagnóstico.</li>
        </ul>
      </div>
    </section>
  </div>
</div>

<!-- ════ PROPUESTA ════ -->
<div class="panel" id="propuesta">
  <div class="wrap">
    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Documento formal · listo para enviar</span></div>
      <h2 class="section-title">Propuesta de colaboración — Community Hub</h2>
      <p class="meta" style="margin-bottom:var(--space-8)">Para: Elmer&nbsp;&nbsp;·&nbsp;&nbsp;De: Change (Andrés &amp; Miguel)&nbsp;&nbsp;·&nbsp;&nbsp;26 de junio de 2026</p>
      <div class="prose">
        <h3>1 · Lo que escuchamos</h3>
        <p>Construiste, con visión de residente y oficio de ingeniero, un prototipo concierge que resuelve un dolor real y cotidiano: vivir en un resort premium hoy significa saltar entre ~50 grupos de WhatsApp y apps dispersas para cada necesidad. Tu frontend está al 90%. Lo que falta no es "codear" —eso hoy se acelera— sino <strong>convertirlo en producto: arquitectura de datos, multitenancy y la operación que lo sostiene.</strong></p>

        <h3>2 · Cómo lo vemos nosotros</h3>
        <p>Change no es una fábrica de software. Resolvemos <strong>arquitecturas de negocio</strong> donde a veces la salida es tecnología. Vemos tres cosas que tú ya intuyes y que valen más que el código:</p>
        <ul>
          <li><strong>La tensión bespoke vs. SaaS es la decisión que define el negocio.</strong> Piñero quiere "su" sistema. Si dejamos que eso dicte la arquitectura, matamos tu activo escalable a cambio de un proyecto único. Lo resolvemos diseñando multitenant desde el día cero, con despliegue dedicado y aislado para Piñero — mismo motor, tu IP intacta, su instancia.</li>
          <li><strong>El negocio no es la app: es la curaduría.</strong> Lo dijiste tú — alguien tiene que calificar proveedores y capturar datos todos los días. Esa capa operativa es tu foso defensivo y tu ingreso recurrente.</li>
          <li><strong>Tu diferenciador ya está claro:</strong> el acceso de invitados por voz ("créame un QR para mañana") y los proveedores curados por referencia del vecino. Ahí está el "wow" y ahí enfocamos.</li>
        </ul>

        <h3>3 · Cómo proponemos trabajar — servicios por fases</h3>
        <p>Una colaboración escalonada. Cada fase entrega valor independiente y habilita la siguiente. Empezamos por de-riesgar, no por codear.</p>
        <ul>
          <li><strong>F0 · Discovery &amp; Arquitectura</strong> — blueprint del servicio, validación del modelo y el documento de arquitectura multitenant. Lo entregamos antes de escribir una línea de producción.</li>
          <li><strong>F1 · Núcleo multitenant</strong> — backend, datos, roles, multilenguaje; tu prototipo cobra vida.</li>
          <li><strong>F2 · Módulos de valor</strong> — proveedores curados, reservas, y el concierge de voz con QR.</li>
          <li><strong>F3 · Despliegue Piñero + replicación</strong> — tu primer cliente en producción y el kit para el siguiente resort.</li>
          <li><strong>Operación continua</strong> — retainer de curaduría que sostiene la calidad del día a día.</li>
        </ul>

        <h3>4 · Lo que protegemos para ti</h3>
        <ul>
          <li>Tu <strong>IP del producto multitenant</strong> queda contigo; Piñero compra instancia / licencia.</li>
          <li>Arquitectura <strong>lista para escalar</strong> a Quintana Roo y Yucatán sin rehacer nada.</li>
          <li>Avanzamos <strong>fase por fase</strong>: decides continuar con resultados en la mano, sin comprometer todo de golpe.</li>
        </ul>

        <h3>5 · Siguiente paso</h3>
        <p>Aprobar la <strong>Fase 0</strong>. En 2–3 semanas tienes el blueprint, el modelo validado y la arquitectura — material con el que puedes incluso cerrar mejor a Piñero. Y deja abierta, para cuando el SaaS escale, una conversación de sociedad con números reales sobre la mesa.</p>
        <blockquote>"Más allá de desarrollar tecnología, resolvemos la arquitectura de negocio. A veces el outcome es la tecnología, a veces no."</blockquote>
      </div>
    </section>
  </div>
</div>

<!-- ════ SPRINT 0 ════ -->
<div class="panel" id="sprint0">
  <div class="wrap">
    <section>
      <div class="eyebrow"><span class="line"></span><span class="meta">Material interno · prueba de capacidad</span></div>
      <h2 class="section-title">Prompt arquitectónico — Sprint 0</h2>
      <p class="section-intro">El motor técnico que se ejecuta en Claude Code para producir el documento de arquitectura. <strong style="color:var(--status-warning-fg)">No enviar a Elmer por adelantado</strong> — guardarlo como demo de capacidad para la reunión.</p>
      <div class="codewrap">
        <div class="codehead"><span class="meta">SPRINT-0 · Community Hub · multitenant-ready</span><button class="copybtn" id="copyBtn">Copiar</button></div>
        <pre id="code"># SPRINT 0 — ARQUITECTURA: Community Hub (plataforma concierge multitenant)

## CONTEXTO DEL SISTEMA
Community Hub es una plataforma concierge B2B2C para residentes de resorts/residencias
premium. Resuelve la fragmentación operativa de vivir en estos complejos: hoy los
residentes saltan entre ~50 grupos de WhatsApp y apps dispersas para cada necesidad.
La plataforma centraliza comunidad, servicios, reservas, proveedores, accesos y soporte
en un único punto de contacto.

Modelo B2B2C:
- Cliente que paga (B2B): dueño/operador del resort — implementación + suscripción.
- Usuarios finales (B2C): residentes — uso gratuito.
- Proveedores: suscripción mensual (500–1,000 MXN) para aparecer y recibir reviews.

Estado actual: frontend en React + TypeScript ~90% completo. NO hay backend ni base de
datos. El frontend existente debe encapsularse/migrarse dentro de Next.js, no rehacerse.

## CRITERIO DE PRODUCTO
MDP: los 11 módulos del prototipo entran en alcance. El Sprint 0 NO construye; produce
el documento de arquitectura que los soporta a todos.

## RESTRICCIÓN CRÍTICA — MULTITENANCY CON DESPLIEGUE DUAL
Multitenant-ready desde el día cero (escalable a N resorts) PERO con despliegue
single-tenant aislado para el primer cliente (Grupo Piñero), que exige el sistema "en sus
servidores". Diseña para AMBOS modos sin bifurcar el código:
- Modo SaaS multitenant: tenants lógicos, aislamiento por RLS.
- Modo single-tenant dedicado: instancia Supabase aislada, mismo código.
Propón la estrategia de aislamiento (RLS por tenant_id vs. proyecto/DB por tenant) y
justifica el trade-off. La IP del producto la conserva el proveedor; el resort recibe
una instancia/licencia.

## INSTRUCCIONES
1. MODELO DE DATOS — esquema Prisma completo. Entidades: Tenant, User, Role,
   Residence/Unit, Membership, Provider, ProviderSubscription, Review, Listing,
   RealEstateListing, Community/Group, Post, Announcement/Alert, Event, Reservation,
   AccessPass (QR), SosAlert, ConciergeSession. Relaciones, índices, campo de tenancy
   en cada tabla, políticas RLS por tenant.
2. MULTITENANCY — estrategia de aislamiento, resolución de tenant (subdominio por
   resort), provisioning de nuevo tenant, soporte del despliegue dedicado de Piñero,
   modelo de licenciamiento a nivel de datos.
3. AUTH Y ROLES — Supabase Auth. Roles: super_admin (Change), resort_admin, security,
   provider, resident. Matriz de permisos por módulo. Invitación de residentes +
   onboarding de proveedores.
4. MÓDULOS (especificar entidades, Server Actions, reglas):
   feed; SOS (realtime); eventos; reservas (deep-link/API externa + fallback);
   directorio con filtros; comunidades/grupos; avisos/alertas (emergencia);
   proveedores curados (reviews 5★, ponderación por referencia + PANEL DE CURADURÍA
   diaria); marketplace P2P (matching + reputación, pago OFF-platform); real estate
   (controlado por resort_admin); concierge de voz (caso ancla: "créame un QR para
   [nombre] para [fecha]" — AccessPass — WhatsApp; Claude tool-use + STT + WhatsApp
   Cloud API).
5. CRUD GRANULAR — por entidad: operaciones, quién las ejecuta (por rol), validaciones.
6. STACK OPINIONADO — Next.js (App Router) encapsulando el front existente; Server
   Actions + Route Handlers; Supabase (Postgres, RLS, Realtime, Storage); Prisma;
   Vercel / instancia dedicada; next-intl (ES+EN); API de Claude para el concierge;
   imágenes base64 Data URL en JSONB.
7. i18n — UI y contenido dinámico multilenguaje, default ES + EN.
8. DEPENDENCIAS — mapa entre módulos + orden de construcción sugerido.
9. DECISIONES PENDIENTES (señalar, no resolver): modo de despliegue Piñero (instancia
   en su infra vs. tenant aislado gestionado por Change con data-residency);
   integración por cada app de reservas externa; proveedor de STT y de WhatsApp.

## ENTREGABLE
Documento de arquitectura (Markdown): diagrama lógico, esquema Prisma, políticas RLS,
matriz roles×módulos, especificación por módulo, arquitectura del concierge IA,
estrategia i18n, mapa de dependencias, decisiones pendientes con recomendación, y plan
de fases con estimación de esfuerzo. NO escribir código de producción todavía.

## CONFIG RECOMENDADA
Modelo: claude-opus-4 (más capaz) · Esfuerzo: Alto
Siguiente paso: generar el documento → pasarlo por saas-project-reviewer antes de aprobar
construcción.</pre>
      </div>
    </section>

    <div class="cta">
      <h2>Aprobar la Fase 0</h2>
      <p>En 2–3 semanas: blueprint, modelo validado y arquitectura multitenant. El cimiento con el que incluso cierras mejor a Piñero.</p>
      <a class="btn" href="mailto:andres@change.live?subject=Community%20Hub%20%E2%80%94%20Aprobaci%C3%B3n%20Fase%200">Iniciar Fase 0</a>
    </div>
  </div>
</div>

<!-- ════ FEEDBACK MIGUEL ════ -->
<section style="padding:var(--space-18) 0;background:var(--surface-soft);border-top:1px solid var(--divider)">
  <div class="wrap">
    <div class="eyebrow"><span class="line"></span><span class="meta">Miguel · Revisión interna</span></div>
    <h2 class="section-title">Tu feedback aquí</h2>
    <p style="font-size:var(--text-lead);color:var(--text-body);max-width:60ch;margin-bottom:var(--space-8)">
      Tus comentarios y preguntas sobre esta propuesta llegan directo a Andrés.
    </p>
    <div style="display:grid;gap:var(--space-4);max-width:600px">
      <div>
        <label class="fb-label" for="fb-name">Tu nombre</label>
        <input id="fb-name" class="fb-input" type="text" placeholder="Miguel">
      </div>
      <div>
        <label class="fb-label" for="fb-comments">Comentarios</label>
        <textarea id="fb-comments" class="fb-input" rows="6"
          placeholder="¿Qué cambiarías? ¿Preguntas sobre el alcance o el precio? ¿Algo que reforzar para la reunión con Elmer?"></textarea>
      </div>
      <button class="btn" id="fb-send" type="button" style="width:fit-content">
        Enviar a Andrés →
      </button>
    </div>
  </div>
</section>

<footer>
  <div class="wrap footgrid">
    <div class="ds-note">Change · Futurismo Sereno</div>
    <div class="ds-note">DS-Change v2.5 · motion viva · display secundaria · futurist calm</div>
    <div class="ds-note">Confidencial · 26 Jun 2026</div>
  </div>
</footer>

<script>
// tab nav
const nav=document.getElementById('nav'),panels=document.querySelectorAll('.panel');
nav.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  nav.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const t=b.dataset.t;
  panels.forEach(p=>p.classList.toggle('active',p.id===t));
  window.scrollTo({top:0,behavior:'smooth'});
});
// theme toggle
const tb=document.getElementById('themeBtn'),root=document.documentElement;
tb.addEventListener('click',()=>{
  const dark=root.getAttribute('data-theme')==='dark';
  root.setAttribute('data-theme',dark?'light':'dark');
  tb.textContent=dark?'Dark':'Light';
});
// phase flow
const flow=document.getElementById('phaseFlow');
if(flow&&'IntersectionObserver'in window){
  const io=new IntersectionObserver((ents)=>{
    ents.forEach(e=>{if(e.isIntersecting){flow.classList.add('is-active');io.disconnect()}});
  },{threshold:.3});
  io.observe(flow);
}else if(flow){flow.classList.add('is-active')}
// copy sprint 0
const cb=document.getElementById('copyBtn');
cb.addEventListener('click',()=>{
  navigator.clipboard.writeText(document.getElementById('code').textContent).then(()=>{
    cb.textContent='Copiado ✓';setTimeout(()=>cb.textContent='Copiar',1800);
  });
});
// feedback mailto
const fbSend=document.getElementById('fb-send');
if(fbSend){fbSend.addEventListener('click',()=>{
  const n=document.getElementById('fb-name').value||'Miguel';
  const c=document.getElementById('fb-comments').value;
  if(!c.trim()){document.getElementById('fb-comments').focus();return;}
  const sub=encodeURIComponent('Feedback · Community Hub — '+n);
  const body=encodeURIComponent('De: '+n+'\\n\\n'+c);
  window.location.href='mailto:andres@change.live?subject='+sub+'&body='+body;
});}
</script>
</body>
</html>`
