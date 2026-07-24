import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold, { GradientTitle } from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import CasoCard from "@/components/CasoCard";
import { type Lang, localizeHref, altLinks } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Decisiones que se convirtieron en capacidad",
  description:
    "Seis tensiones reales, la decisión que cada una hizo posible y el sistema que dejó instalado. Casos anonimizados por tensión y sector.",
  alternates: altLinks("/casos"),
  openGraph: {
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630, alt: "Decisiones que se convirtieron en capacidad" }],
  },
  twitter: { images: ["/assets/og-default.png"] },
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CASOS_ES = [
  {
    k: "Crecer sin diluir", c: "var(--opportunity-orange)", sim: "crecer-sin-diluir",
    img: "/img/proyectos/boardroom-ejecutivo.jpg",
    imgAlt: "Sesión ejecutiva en boardroom de altura — contexto de expansión corporativa",
    h: "La identidad que abrió la puerta no es la que cabe en la siguiente etapa.",
    s: "Una organización en expansión: cada mercado nuevo pedía adaptar la marca, y cada adaptación la volvía un poco menos reconocible. El crecimiento amenazaba justo lo que lo había hecho posible.",
    flow: [
      "Montamos un radar de señales del entorno competitivo y de consumo: qué premiaba cada mercado nuevo y dónde la identidad actual ayudaba o estorbaba.",
      "Un mapa de tensiones reveló que el conflicto no era marca contra mercado, sino núcleo contra superficie: lo innegociable estaba mezclado con lo que sí podía moverse, y nadie había separado las dos capas.",
      "Una matriz de decisión fijó qué elementos de identidad eran constantes en todos los mercados y cuáles eran variables locales — y qué se sacrificaba al cruzar esa línea.",
      "Un sistema de identidad de dos capas: un núcleo fijo y un repertorio de adaptaciones permitidas, con su narrativa de por qué cada parte existe.",
      "La distinción núcleo/superficie quedó instalada en Mission Control como criterio vivo: cada propuesta de adaptación se evalúa contra la misma regla, sin reabrir la discusión de fondo.",
      "La organización dejó de discutir su identidad caso por caso. Ahora sabe qué puede mover sin perderse — y esa es la capacidad que viaja a cada mercado nuevo.",
    ],
  },
  {
    k: "Priorizar apuestas", c: "var(--change-violet)", sim: "demasiadas-iniciativas",
    img: "/img/proyectos/taller-senales.jpg",
    imgAlt: "Organización visual de señales y apuestas en taller estratégico",
    h: "Todo era importante, y por eso nada avanzaba.",
    s: "Más iniciativas valiosas que recursos para sostenerlas. La organización no tenía un problema de ideas: tenía un problema de elegir, y la indecisión se estaba volviendo su estrategia por defecto.",
    flow: [
      "Inventariamos todas las apuestas en curso y las señales que cada una perseguía: cuáles respondían a un cambio real del entorno y cuáles a inercia interna.",
      "El mapa de tensiones mostró que el verdadero conflicto no era entre proyectos, sino entre dos lógicas: defender lo que ya funciona y construir lo que viene.",
      "Una matriz de decisión con criterios explícitos — impacto, reversibilidad, costo de no hacerlo — forzó la conversación que se venía evitando: a qué se le dice que no, y qué se gana al decirlo.",
      "Un roadmap vivo con un puñado de apuestas priorizadas, sus condiciones de continuidad y los puntos donde se revisaría la decisión.",
      "Los criterios de priorización quedaron como memoria estratégica en Mission Control. Cada nueva iniciativa entra por la misma matriz, no por quién la propone con más fuerza.",
      "Decir que no dejó de sentirse como una pérdida y empezó a ser una señal de rumbo. La organización ahora elige con un criterio que puede explicar — y defender.",
    ],
  },
  {
    k: "Transferir juicio", c: "var(--human-pink)", sim: "criterio-en-pocas-cabezas",
    img: "/img/proyectos/transferencia-juicio.jpg",
    imgAlt: "Sesión de facilitación estratégica — participantes anonimizados",
    imgFilter: "grayscale(100%) blur(5px) contrast(1.1) brightness(.92)",
    h: "El juicio que sostiene a la organización vive en pocas cabezas. Y nadie lo escribió.",
    s: "Un relevo entre generaciones —o entre equipos— donde lo que estaba en juego no eran las operaciones, sino el juicio: cómo se decide aquí, y por qué. Eso casi nunca está documentado, y cuando se va, se va completo.",
    flow: [
      "Reconstruimos cómo se habían tomado las decisiones difíciles de los últimos años: qué se consideró, qué se descartó y bajo qué razón. Las señales no estaban afuera, estaban en la historia de la propia organización.",
      "El mapa de tensiones expuso lo no dicho: el relevo confundía transferir tareas con transferir juicio. Lo segundo es lo difícil — y lo que de verdad estaba en riesgo de perderse.",
      "Una matriz de criterios hizo explícitos los principios que guiaban las decisiones clave: qué se prioriza cuando entran en conflicto el corto y el largo plazo, el negocio y la identidad. El juicio dejó de ser intuición privada.",
      "Un roadmap vivo de transferencia: las decisiones que el nuevo equipo tomaría acompañado, con la lógica a la vista, antes de tomarlas solo.",
      "El juicio quedó instalado como memoria estratégica en Mission Control: no un manual que se archiva, sino una referencia viva que se consulta y se actualiza cada vez que una decisión nueva enseña algo.",
      "El rumbo de la organización dejó de depender de la cabeza de una sola persona. El juicio se volvió un activo compartido — y por eso puede sobrevivir a quien lo construyó.",
    ],
  },
  {
    k: "Anticipar la presión", c: "var(--warning)",
    img: "/img/proyectos/perspectiva-cdmx.jpg",
    imgAlt: "Vista estratégica desde altura — lectura del entorno desde un punto de ventaja",
    h: "Lo que aguanta en calma no es lo que aguanta bajo presión.",
    s: "Una organización que funcionaba bien en condiciones normales quería saber, antes de vivirlo, qué parte de su modelo se rompería primero cuando llegara el estrés — de demanda, de mercado o de capital.",
    flow: [
      "Un radar de señales rastreó los puntos de tensión tempranos: dónde aparecían las primeras grietas en operaciones, finanzas y dependencia de proveedores cuando la demanda se movía.",
      "El mapa de tensiones distinguió fragilidad de riesgo: importaban los puntos donde una falla arrastraba a las demás — los nudos, no las puntas.",
      "Una matriz de decisión evaluó qué reforzar primero, sabiendo que blindar todo era imposible: qué se protege, qué se acepta como riesgo vivible y qué señal dispararía la acción.",
      "Un roadmap de resiliencia con escenarios de presión, sus indicadores de alerta temprana y las respuestas ya decididas para cada uno — antes de necesitarlas.",
      "Los indicadores de alerta quedaron instalados en Mission Control como criterio vivo: cuando una señal de presión se enciende, la organización ya sabe qué decidió hacer — no improvisa en el peor momento.",
      "La organización dejó de esperar la crisis para descubrir sus puntos débiles. Ahora los ve venir — y eso convierte la presión en algo que se administra, no que se padece.",
    ],
  },
  {
    k: "Cuando el usuario ya cambió", c: "var(--signal-cyan)", sim: "cliente-que-cambio",
    img: "/img/proyectos/ideacion-usuario.jpg",
    imgAlt: "Sesión de investigación y co-diseño centrada en el usuario",
    h: "El producto seguía igual. El usuario, no.",
    s: "La experiencia funcionaba para un usuario que ya había cambiado: nuevas expectativas, nuevos hábitos, nuevas comparaciones. La organización lo intuía en los números, pero no tenía el lenguaje para nombrar qué se había movido.",
    flow: [
      "Un radar de señales captó cómo se había movido el usuario: qué empezó a esperar por default, con qué otras experiencias se comparaba ahora y dónde la fricción se había vuelto invisible para la organización pero no para él.",
      "El mapa de tensiones nombró la brecha: la organización seguía optimizando lo que sabía hacer, mientras el usuario había cambiado de pregunta. No era un problema de ejecución, era de supuesto.",
      "Una matriz de decisión definió qué partes de la experiencia se rediseñaban a fondo y cuáles se sostenían — porque rediseñar todo a la vez era arriesgar lo que sí seguía funcionando.",
      "Un roadmap vivo de la nueva experiencia, priorizado por dónde la distancia entre lo que el usuario esperaba y lo que recibía era mayor — y por dónde cerrarla rendía más.",
      "Las señales de comportamiento del usuario quedaron como interpretación viva dentro de Mission Control. La experiencia dejó de revisarse cuando los números asustan y pasó a leerse de forma continua.",
      "La organización dejó de diseñar para el usuario que recordaba y empezó a diseñar para el que tiene enfrente. Esa interpretación ahora es un hábito, no un proyecto.",
    ],
  },
  {
    k: "Visión gobernable", c: "var(--change-violet)", sim: "vision-sin-roadmap",
    img: "/img/proyectos/mapeo-vision.jpg",
    imgAlt: "Mapeo colectivo de visión estratégica — organización de criterios e implicaciones",
    h: "Tenían una visión clara. Y ningún modo de gobernarla.",
    s: "Una dirección ambiciosa, articulada y compartida — que en la operación se diluía en decisiones cotidianas que nadie conectaba con ella. La visión existía en los discursos, no en las elecciones de cada semana.",
    flow: [
      "Mapeamos la distancia entre la visión declarada y las decisiones reales: dónde la operación empujaba en la misma dirección y dónde, sin querer, remaba en contra.",
      "El mapa de tensiones mostró que la visión no fallaba por falta de convicción, sino por falta de traducción: nadie había convertido la aspiración en criterios que cupieran en una decisión de martes.",
      "Una matriz de criterios bajó la visión a reglas operables: ante una disyuntiva concreta, qué la acerca a donde quiere ir y qué la aleja. La visión dejó de ser un destino abstracto y empezó a poder usarse.",
      "Un roadmap vivo que conecta cada apuesta con la visión que sirve, con hitos visibles y revisiones donde el rumbo se confirma o se corrige a propósito, no por inercia.",
      "La visión quedó gobernada desde Mission Control como memoria estratégica viva: la dirección, las decisiones que la sostienen y las que la tensionan, todo a la vista del equipo que decide.",
      "La visión dejó de vivir en las presentaciones y empezó a vivir en las decisiones. La organización ahora sabe gobernar su propio rumbo — sin que dependa de repetirlo en cada junta.",
    ],
  },
];

const CASOS_EN = [
  {
    k: "Grow without diluting", c: "var(--opportunity-orange)", sim: "crecer-sin-diluir",
    h: "The identity that opened the door isn't the one that fits the next stage.",
    s: "An organization in expansion: each new market asked to adapt the brand, and each adaptation made it a little less recognizable. Growth threatened exactly what had made it possible.",
    flow: [
      "We set up a signal radar of the competitive and consumer environment: what each new market rewarded and where the current identity helped or got in the way.",
      "A tension map revealed the conflict wasn't brand vs. market, but core vs. surface: the non-negotiable was mixed with what could move, and no one had separated the two layers.",
      "A decision matrix fixed which identity elements were constant across all markets and which were local variables — and what was sacrificed by crossing that line.",
      "A two-layer identity system: a fixed core and a repertoire of permitted adaptations, with the narrative of why each part exists.",
      "The core/surface distinction was installed in Mission Control as living criteria: every adaptation proposal is evaluated against the same rule, without reopening the underlying debate.",
      "The organization stopped debating its identity case by case. Now it knows what it can move without losing itself — and that's the capacity that travels to each new market.",
    ],
  },
  {
    k: "Prioritize bets", c: "var(--change-violet)", sim: "demasiadas-iniciativas",
    h: "Everything was important, and that's why nothing moved.",
    s: "More valuable initiatives than resources to sustain them. The organization didn't have an ideas problem: it had a choosing problem, and indecision was becoming its default strategy.",
    flow: [
      "We inventoried every bet in progress and the signals each one chased: which responded to a real shift in the environment and which to internal inertia.",
      "The tension map showed the real conflict wasn't between projects, but between two logics: defending what already works and building what's coming.",
      "A decision matrix with explicit criteria — impact, reversibility, cost of not doing it — forced the conversation being avoided: what gets a no, and what's gained by saying it.",
      "A living roadmap with a handful of prioritized bets, their continuity conditions, and the points where the decision would be revisited.",
      "The prioritization criteria stayed as strategic memory in Mission Control. Every new initiative enters through the same matrix, not through whoever proposes it loudest.",
      "Saying no stopped feeling like a loss and started being a signal of direction. The organization now chooses with criteria it can explain — and defend.",
    ],
  },
  {
    k: "Transfer judgment", c: "var(--human-pink)", sim: "criterio-en-pocas-cabezas",
    h: "The judgment that holds the organization lives in a few heads. And no one wrote it down.",
    s: "A handover between generations —or between teams— where what was at stake wasn't operations, but judgment: how decisions are made here, and why. That's almost never documented, and when it leaves, it leaves whole.",
    flow: [
      "We reconstructed how the hard decisions of recent years had been made: what was considered, what was discarded, and on what grounds. The signals weren't outside, they were in the organization's own history.",
      "The tension map exposed the unspoken: the handover confused transferring tasks with transferring judgment. The latter is the hard part — and what was truly at risk of being lost.",
      "A criteria matrix made explicit the principles that guided key decisions: what's prioritized when short and long term, business and identity, come into conflict. Judgment stopped being private intuition.",
      "A living transfer roadmap: the decisions the new team would make accompanied, with the logic in view, before making them alone.",
      "Judgment was installed as strategic memory in Mission Control: not a manual that gets archived, but a living reference consulted and updated each time a new decision teaches something.",
      "The organization's course stopped depending on a single person's head. Judgment became a shared asset — and that's why it can outlive whoever built it.",
    ],
  },
  {
    k: "Anticipate the pressure", c: "var(--warning)",
    h: "What holds in calm isn't what holds under pressure.",
    s: "An organization that worked well under normal conditions wanted to know, before living it, which part of its model would break first when stress arrived — from demand, market, or capital.",
    flow: [
      "A signal radar tracked the early tension points: where the first cracks appeared in operations, finance, and supplier dependence when demand moved.",
      "The tension map distinguished fragility from risk: what mattered were the points where one failure dragged the others — the knots, not the ends.",
      "A decision matrix evaluated what to reinforce first, knowing that shielding everything was impossible: what's protected, what's accepted as livable risk, and what signal would trigger action.",
      "A resilience roadmap with pressure scenarios, their early-warning indicators, and the responses already decided for each — before needing them.",
      "The warning indicators were installed in Mission Control as living criteria: when a pressure signal lights up, the organization already knows what it decided to do — it doesn't improvise at the worst moment.",
      "The organization stopped waiting for the crisis to discover its weak points. Now it sees them coming — and that turns pressure into something managed, not endured.",
    ],
  },
  {
    k: "When the user already changed", c: "var(--signal-cyan)", sim: "cliente-que-cambio",
    h: "The product stayed the same. The user didn't.",
    s: "The experience worked for a user who had already changed: new expectations, new habits, new comparisons. The organization sensed it in the numbers, but didn't have the language to name what had moved.",
    flow: [
      "A signal radar captured how the user had moved: what they started expecting by default, what other experiences they now compared against, and where friction had become invisible to the organization but not to them.",
      "The tension map named the gap: the organization kept optimizing what it knew how to do, while the user had changed the question. It wasn't an execution problem, it was an assumption problem.",
      "A decision matrix defined which parts of the experience were redesigned deeply and which were kept — because redesigning everything at once was risking what still worked.",
      "A living roadmap of the new experience, prioritized by where the distance between what the user expected and what they got was greatest — and where closing it paid off most.",
      "The user's behavior signals stayed as living interpretation inside Mission Control. The experience stopped being reviewed when the numbers scare and started being read continuously.",
      "The organization stopped designing for the user it remembered and started designing for the one in front of it. That interpretation is now a habit, not a project.",
    ],
  },
  {
    k: "Governable vision", c: "var(--change-violet)", sim: "vision-sin-roadmap",
    h: "They had a clear vision. And no way to govern it.",
    s: "An ambitious, articulate, shared direction — that in operations diluted into everyday decisions no one connected to it. The vision existed in the speeches, not in the choices of each week.",
    flow: [
      "We mapped the distance between the declared vision and the real decisions: where operations pushed in the same direction and where, unintentionally, they rowed against it.",
      "The tension map showed the vision wasn't failing for lack of conviction, but for lack of translation: no one had turned the aspiration into criteria that fit into a Tuesday decision.",
      "A criteria matrix brought the vision down to operable rules: faced with a concrete dilemma, what brings it closer to where it wants to go and what pulls it away. The vision stopped being an abstract destination and became usable.",
      "A living roadmap that connects each bet to the vision it serves, with visible milestones and reviews where the course is confirmed or corrected on purpose, not by inertia.",
      "The vision was governed from Mission Control as living strategic memory: the direction, the decisions that sustain it, and the ones that strain it, all in view of the team that decides.",
      "The vision stopped living in presentations and started living in decisions. The organization now knows how to govern its own course — without it depending on repeating it in every meeting.",
    ],
  },
];

const CAS_COPY = {
  es: {
    kicker: "Casos por tensión · Nuestro trabajo", titlePre: "Decisiones que se convirtieron en", titleAccent: "capacidad.",
    lead: "Seis tensiones reales que Change ha trabajado: la decisión que cada una hizo posible y el sistema que dejó instalado — la capacidad de futuro de volver a decidir sin Change en la sala. Casos reales con nombre y sector anonimizados por confidencialidad estratégica de cada cliente.",
    discK: "Sobre estos casos", discP: "Los nombres de las organizaciones, el sector y los detalles operativos se omiten para proteger el contexto estratégico de cada cliente. La tensión, el método y el sistema instalado son tal cual ocurrieron.",
    patternK: "Lo que tienen en común", patternH: "Distintas tensiones. La misma capacidad.", patternP: "Seis retos sin nada en común — y exactamente el mismo recorrido: leer lo que cambia, interpretar qué significa, decidir con criterio explícito, diseñar la respuesta y dejar instalado un sistema que la sostiene. Lo que entregamos no es el caso. Es la capacidad de volver a hacerlo.",
    pattern: [
      ["Leer", "Un radar de señales para ver qué cambia antes de que sea urgente.", "var(--signal-cyan)"],
      ["Interpretar", "Un mapa de tensiones para entender qué significa, no solo qué pasa.", "var(--soft-violet)"],
      ["Decidir", "Una matriz de decisión que hace el criterio explícito y defendible.", "var(--change-violet)"],
      ["Diseñar", "Un roadmap vivo que le da forma ejecutable a la decisión.", "var(--change-violet)"],
      ["Sostener", "Mission Control: la memoria estratégica donde la capacidad se queda viva.", "var(--lavender-mist)"],
    ],
    ctaH: "¿Cuál de estas tensiones se parece a la tuya?", ctaP: "Ninguna de estas decisiones empezó con un plan. Empezó con una organización que sabía que tenía que actuar antes de tener certeza. Tráenos la decisión que traes atorada y trabajémosla — esa es la entrada.", ctaWork: "Iniciar la conversación", ctaHow: "Ver cómo trabajamos",
  },
  en: {
    kicker: "Cases by tension · Our work", titlePre: "Decisions that became", titleAccent: "capacity.",
    lead: "Six real tensions Change has worked: the decision each one made possible and the system it left installed — the future capacity to decide again without Change in the room. Real cases with names and sectors anonymized for each client's strategic confidentiality.",
    discK: "About these cases", discP: "The names of the organizations, the sector, and operational details are omitted to protect each client's strategic context. The tension, the method, and the installed system are exactly as they happened.",
    patternK: "What they have in common", patternH: "Different tensions. The same capacity.", patternP: "Six challenges with nothing in common — and exactly the same path: read what's changing, interpret what it means, decide with explicit criteria, design the response, and leave installed a system that sustains it. What we deliver isn't the case. It's the capacity to do it again.",
    pattern: [
      ["Read", "A signal radar to see what changes before it's urgent.", "var(--signal-cyan)"],
      ["Interpret", "A tension map to understand what it means, not just what happens.", "var(--soft-violet)"],
      ["Decide", "A decision matrix that makes criteria explicit and defensible.", "var(--change-violet)"],
      ["Design", "A living roadmap that gives the decision an executable form.", "var(--change-violet)"],
      ["Sustain", "Mission Control: the strategic memory where capacity stays alive.", "var(--lavender-mist)"],
    ],
    ctaH: "Which of these tensions looks like yours?", ctaP: "None of these decisions started with a plan. It started with an organization that knew it had to act before having certainty. Bring us the decision you have stuck and let's work it — that's the entry.", ctaWork: "Start the conversation", ctaHow: "See how we work",
  },
};

export function CasosView({ lang }: { lang: Lang }) {
  const t = CAS_COPY[lang];
  const CASOS = lang === "en" ? CASOS_EN : CASOS_ES;
  return (
    <PageScaffold
      lang={lang}
      kicker={t.kicker}
      title={<GradientTitle pre={t.titlePre} accent={t.titleAccent} accentGradient="var(--gradient-type-dark-warm)" />}
      lead={t.lead}
    >
      {/* ═══ DISCLAIMER DE CREDIBILIDAD — destacado ═══ */}
      <section style={{ background: "var(--surface-page)" }}>
        <div style={{ width: WRAP, margin: "0 auto", padding: "clamp(36px,4vw,52px) 0" }}>
          <Reveal className="ch-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "start", border: "1px solid var(--border-violet)", background: "rgba(109,59,255,.04)", padding: "22px 26px" }}>
            <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 6, width: 8, height: 8, borderRadius: "50%", background: "var(--change-violet)" }} />

            <div>
              <span style={{ display: "block", marginBottom: 6, font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--change-violet)" }}>{t.discK}</span>
              <p style={{ margin: 0, font: "500 15.5px/1.55 var(--font-primary)", color: "var(--ink-graphite)", maxWidth: "78ch" }}>{t.discP}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ LOS 6 CASOS ═══ */}
      {CASOS.map((caso, idx) => (
        <CasoCard
          key={caso.k}
          caso={{ ...caso, img: CASOS_ES[idx].img, imgAlt: CASOS_ES[idx].imgAlt }}
          idx={idx}
          lang={lang}
          bg={idx % 2 === 0 ? "var(--gradient-sky-pearl)" : "var(--gradient-white-pearl)"}
        />
      ))}

      {/* ═══ EL PATRÓN ═══ */}
      <section className="change-dark" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 38%),linear-gradient(180deg,var(--surface-dark) 0%,var(--surface-dark-secondary) 100%)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{t.patternK}</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.patternH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "62ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.patternP}</Reveal>
          <div className="cs-pattern" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {t.pattern.map(([v, p, c], i) => (
              <Reveal key={v} delay={i * 70} style={{ position: "relative", paddingTop: 20, borderTop: "2px solid rgba(255,255,255,.14)" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: -6, left: 0, width: 9, height: 9, borderRadius: "50%", background: c }} />
                <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "var(--text-on-dark)" }}>{v}</strong>
                <span style={{ display: "block", marginTop: 8, font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "var(--text-on-dark)", textWrap: "balance" }}>{t.ctaH}</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{t.ctaP}</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href={localizeHref("/contacto", lang)} className="btn btn-light">{t.ctaWork}</Link>
            <Link href={localizeHref("/capacidades", lang)} className="btn btn-dghost">{t.ctaHow}</Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .cs-flow { grid-template-columns: 1fr 1fr !important; }
          .cs-pattern { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .cs-flow, .cs-pattern { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageScaffold>
  );
}

export default function CasosPage() {
  return <CasosView lang="es" />;
}
