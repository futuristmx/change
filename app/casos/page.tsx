import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/PageScaffold";
import Reveal from "@/components/Reveal";
import CasoCard from "@/components/CasoCard";

export const metadata: Metadata = {
  title: "Decisiones que se convirtieron en capacidad",
  description:
    "No mostramos proyectos terminados. Mostramos seis tensiones reales, la decisión que cada una hizo posible y el sistema que dejó instalado. Casos anonimizados por tensión y sector.",
};

const WRAP = "min(1340px, calc(100% - clamp(40px,8vw,128px)))";

const CASOS = [
  {
    k: "Crecer sin diluir", c: "var(--opportunity-orange)",
    h: "La identidad que abrió la puerta no es la que cabe en la siguiente etapa.",
    s: "Una organización en expansión: cada mercado nuevo pedía adaptar la marca, y cada adaptación la volvía un poco menos reconocible. El crecimiento amenazaba justo lo que lo había hecho posible.",
    flow: [
      "Montamos un radar de señales del entorno competitivo y de consumo: qué premiaba cada mercado nuevo y dónde la identidad actual ayudaba o estorbaba.",
      "Un mapa de tensiones reveló que el conflicto no era marca contra mercado, sino núcleo contra superficie: lo innegociable estaba mezclado con lo que sí podía moverse, y nadie había separado las dos capas.",
      "Una matriz de trade-offs fijó qué elementos de identidad eran constantes en todos los mercados y cuáles eran variables locales — y qué se sacrificaba al cruzar esa línea.",
      "Un sistema de identidad de dos capas: un núcleo fijo y un repertorio de adaptaciones permitidas, con su narrativa de por qué cada parte existe.",
      "La distinción núcleo/superficie quedó instalada en Mission Control como criterio vivo: cada propuesta de adaptación se evalúa contra la misma regla, sin reabrir la discusión de fondo.",
      "La organización dejó de discutir su identidad caso por caso. Ahora sabe qué puede mover sin perderse — y esa es la capacidad que viaja a cada mercado nuevo.",
    ],
  },
  {
    k: "Priorizar apuestas", c: "var(--change-violet)",
    h: "Todo era importante, y por eso nada avanzaba.",
    s: "Más iniciativas valiosas que recursos para sostenerlas. La organización no tenía un problema de ideas: tenía un problema de elegir, y la indecisión se estaba volviendo su estrategia por defecto.",
    flow: [
      "Inventariamos todas las apuestas en curso y las señales que cada una perseguía: cuáles respondían a un cambio real del entorno y cuáles a inercia interna.",
      "El mapa de tensiones mostró que el verdadero conflicto no era entre proyectos, sino entre dos lógicas: defender lo que ya funciona y construir lo que viene.",
      "Una matriz de trade-offs con criterios explícitos — impacto, reversibilidad, costo de no hacerlo — forzó la conversación que se venía evitando: a qué se le dice que no, y qué se gana al decirlo.",
      "Un roadmap vivo con un puñado de apuestas priorizadas, sus condiciones de continuidad y los puntos donde se revisaría la decisión.",
      "Los criterios de priorización quedaron como memoria estratégica en Mission Control. Cada nueva iniciativa entra por la misma matriz, no por quién la propone con más fuerza.",
      "Decir que no dejó de sentirse como una pérdida y empezó a ser una señal de rumbo. La organización ahora elige con un criterio que puede explicar — y defender.",
    ],
  },
  {
    k: "Transferir juicio", c: "var(--human-pink)",
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
    h: "Lo que aguanta en calma no es lo que aguanta bajo presión.",
    s: "Una organización que funcionaba bien en condiciones normales quería saber, antes de vivirlo, qué parte de su modelo se rompería primero cuando llegara el estrés — de demanda, de mercado o de capital.",
    flow: [
      "Un radar de señales rastreó los puntos de tensión tempranos: dónde aparecían las primeras grietas en operaciones, finanzas y dependencia de proveedores cuando la demanda se movía.",
      "El mapa de tensiones distinguió fragilidad de riesgo: importaban los puntos donde una falla arrastraba a las demás — los nudos, no las puntas.",
      "Una matriz de trade-offs evaluó qué reforzar primero, sabiendo que blindar todo era imposible: qué se protege, qué se acepta como riesgo vivible y qué señal dispararía la acción.",
      "Un roadmap de resiliencia con escenarios de presión, sus indicadores de alerta temprana y las respuestas ya decididas para cada uno — antes de necesitarlas.",
      "Los indicadores de alerta quedaron instalados en Mission Control como criterio vivo: cuando una señal de presión se enciende, la organización ya sabe qué decidió hacer — no improvisa en el peor momento.",
      "La organización dejó de esperar la crisis para descubrir sus puntos débiles. Ahora los ve venir — y eso convierte la presión en algo que se administra, no que se padece.",
    ],
  },
  {
    k: "Cuando el usuario ya cambió", c: "var(--signal-cyan)",
    h: "El producto seguía igual. El usuario, no.",
    s: "La experiencia funcionaba para un usuario que ya había cambiado: nuevas expectativas, nuevos hábitos, nuevas comparaciones. La organización lo intuía en los números, pero no tenía el lenguaje para nombrar qué se había movido.",
    flow: [
      "Un radar de señales captó cómo se había movido el usuario: qué empezó a esperar por default, con qué otras experiencias se comparaba ahora y dónde la fricción se había vuelto invisible para la organización pero no para él.",
      "El mapa de tensiones nombró la brecha: la organización seguía optimizando lo que sabía hacer, mientras el usuario había cambiado de pregunta. No era un problema de ejecución, era de supuesto.",
      "Una matriz de trade-offs definió qué partes de la experiencia se rediseñaban a fondo y cuáles se sostenían — porque rediseñar todo a la vez era arriesgar lo que sí seguía funcionando.",
      "Un roadmap vivo de la nueva experiencia, priorizado por dónde la distancia entre lo que el usuario esperaba y lo que recibía era mayor — y por dónde cerrarla rendía más.",
      "Las señales de comportamiento del usuario quedaron como lectura viva dentro de Mission Control. La experiencia dejó de revisarse cuando los números asustan y pasó a leerse de forma continua.",
      "La organización dejó de diseñar para el usuario que recordaba y empezó a diseñar para el que tiene enfrente. Esa lectura ahora es un hábito, no un proyecto.",
    ],
  },
  {
    k: "Visión gobernable", c: "var(--change-violet)",
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

export default function CasosPage() {
  return (
    <PageScaffold
      kicker="Casos por tensión"
      title="Decisiones que se convirtieron en capacidad."
      lead="No mostramos proyectos terminados. Mostramos seis tensiones reales, la decisión que cada una hizo posible y el sistema que dejó instalado — la capacidad de futuro de volver a decidir sin nosotros. Casos anonimizados por tensión y sector."
    >
      {/* ═══ LOS 6 CASOS ═══ */}
      {CASOS.map((caso, idx) => (
        <CasoCard
          key={caso.k}
          caso={caso}
          idx={idx}
          bg={idx % 2 === 0 ? "var(--gradient-sky-pearl)" : "linear-gradient(180deg,#FFFFFF,var(--pure-white))"}
        />
      ))}

      {/* ═══ EL PATRÓN ═══ */}
      <section className="change-dark" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 82% 0%,color-mix(in srgb, var(--change-violet) 22%, transparent),transparent 38%),linear-gradient(180deg,var(--surface-dark) 0%,var(--surface-dark-secondary) 100%)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,11vw,160px) 0" }}>
          <Reveal style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
            <span data-pulse style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal-cyan)" }} />
            <span style={{ font: "600 var(--text-meta) var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>El patrón detrás de los seis</span>
          </Reveal>
          <Reveal delay={60} as="h2" style={{ margin: "0 0 16px", maxWidth: "20ch", font: "600 clamp(30px,4.2vw,58px)/.99 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>Distintas tensiones. La misma capacidad.</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "0 0 clamp(40px,5vw,56px)", maxWidth: "62ch", font: "400 clamp(16px,1.3vw,19px)/1.55 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Seis retos sin nada en común — y exactamente el mismo recorrido: leer lo que cambia, interpretar qué significa, decidir con criterio explícito, diseñar la respuesta y dejar instalado un sistema que la sostiene. Lo que entregamos no es el caso. Es la capacidad de volver a hacerlo.</Reveal>
          <div className="cs-pattern" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {[
              ["Leer", "Un radar de señales para ver qué cambia antes de que sea urgente.", "var(--signal-cyan)"],
              ["Interpretar", "Un mapa de tensiones para entender qué significa, no solo qué pasa.", "var(--soft-violet)"],
              ["Decidir", "Una matriz de trade-offs que hace el criterio explícito y defendible.", "var(--change-violet)"],
              ["Diseñar", "Un roadmap vivo que le da forma ejecutable a la decisión.", "var(--change-violet)"],
              ["Sostener", "Mission Control: la memoria estratégica donde la capacidad se queda viva.", "var(--lavender-mist)"],
            ].map(([v, p, c], i, arr) => (
              <Reveal key={v} delay={i * 70} style={{ position: "relative", paddingTop: 20, borderTop: "2px solid rgba(255,255,255,.14)" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: -6, left: 0, width: 9, height: 9, borderRadius: "50%", background: c }} />
                <strong style={{ display: "block", font: "600 16px var(--font-primary)", letterSpacing: "-.02em", color: "#fff" }}>{v}</strong>
                <span style={{ display: "block", marginTop: 8, font: "400 13px/1.5 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>{p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", background: "radial-gradient(circle at 50% -10%,color-mix(in srgb, var(--change-violet) 24%, transparent),transparent 52%),var(--surface-dark-secondary)" }}>
        <div style={{ position: "relative", width: WRAP, margin: "0 auto", padding: "clamp(88px,12vw,168px) 0", textAlign: "center" }}>
          <Reveal as="h2" style={{ margin: "0 auto", maxWidth: "20ch", font: "600 clamp(34px,5vw,72px)/1.0 var(--font-primary)", letterSpacing: "-.05em", color: "#fff", textWrap: "balance" }}>¿Cuál de estas tensiones se parece a la tuya?</Reveal>
          <Reveal delay={100} as="p" style={{ margin: "24px auto 0", maxWidth: 580, font: "400 clamp(16px,1.4vw,19px)/1.6 var(--font-primary)", color: "rgba(255,255,255,.8)" }}>Ninguna de estas decisiones empezó con un plan. Empezó con una organización que sabía que tenía que actuar antes de tener certeza. Tráenos la decisión que traes atorada y trabajémosla — esa es la entrada.</Reveal>
          <Reveal delay={160} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <Link href="/contacto" className="btn btn-light">Trabajar una decisión</Link>
            <Link href="/capacidades" className="btn btn-dghost">Ver cómo trabajamos</Link>
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
