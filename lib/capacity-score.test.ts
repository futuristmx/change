/**
 * Pruebas de la lógica pura del Score de Capacidad de Futuro.
 * Runner nativo de Node, sin framework: node --experimental-strip-types --test
 * (ver package.json → "verify:score"). Gates de calidad, no TDD estricto.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreCapacity, buildScorePayload, DIMENSIONS, type Answers } from "./capacity-score.ts";

/* ── fixtures de entrada/salida ── */
const FIX = {
  perfecto: { leer: 3, interpretar: 3, decidir: 3, disenar: 3, sostener: 3 } as Answers,
  cero: { leer: 0, interpretar: 0, decidir: 0, disenar: 0, sostener: 0 } as Answers,
  // byDim: leer100 interpretar33 decidir67 disenar100 sostener0 → total 60, weakest sostener
  mixto: { leer: 3, interpretar: 1, decidir: 2, disenar: 3, sostener: 0 } as Answers,
  // interpretar el más débil, total 80 → sostenido
  debilInterpretar: { leer: 3, interpretar: 0, decidir: 3, disenar: 3, sostener: 3 } as Answers,
  incompleto: { leer: 3, interpretar: 2, decidir: 2, disenar: 1 } as Answers, // falta sostener
  invalido: { leer: 3, interpretar: 2, decidir: 5, disenar: 1, sostener: 2 } as Answers, // decidir fuera de rango
};

function ok(a: Answers) {
  const r = scoreCapacity(a);
  assert.equal(r.status, "ok");
  if (r.status !== "ok") throw new Error("esperaba ok");
  return r;
}

// 1 · score total correcto
test("1 · score total correcto", () => {
  assert.equal(ok(FIX.perfecto).total, 100);
  assert.equal(ok(FIX.cero).total, 0);
  assert.equal(ok(FIX.mixto).total, 60);
  assert.equal(ok(FIX.debilInterpretar).total, 80);
});

// 2 · score por dimensión (las 5)
test("2 · score por dimensión", () => {
  const r = ok(FIX.mixto);
  assert.deepEqual(r.byDimension, { leer: 100, interpretar: 33, decidir: 67, disenar: 100, sostener: 0 });
  // las 5 dimensiones presentes
  for (const d of DIMENSIONS) assert.ok(typeof r.byDimension[d] === "number");
});

// 3 · detección de dimensión más vulnerable
test("3 · dimensión más vulnerable", () => {
  assert.equal(ok(FIX.mixto).weakest, "sostener");
  assert.equal(ok(FIX.debilInterpretar).weakest, "interpretar");
  // empate (todas iguales) → primera del arco, determinista
  assert.equal(ok(FIX.perfecto).weakest, "leer");
  assert.equal(ok(FIX.cero).weakest, "leer");
});

// 4 · asignación de nivel/rango
test("4 · nivel/rango", () => {
  assert.equal(ok(FIX.cero).level, "reactivo"); // 0
  assert.equal(ok(FIX.mixto).level, "en-construccion"); // 60
  assert.equal(ok(FIX.debilInterpretar).level, "sostenido"); // 80
  assert.equal(ok(FIX.perfecto).level, "sostenido"); // 100
  // frontera 40 → emergente (leer1 resto0: 20? ajustamos para 40)
  // leer=1(33) interpretar=1(33) decidir=1(33) disenar=1(33) sostener=1(33) → 33 reactivo
  assert.equal(ok({ leer: 1, interpretar: 1, decidir: 1, disenar: 1, sostener: 1 }).level, "reactivo");
  // todos 2 → 67 → en-construccion
  assert.equal(ok({ leer: 2, interpretar: 2, decidir: 2, disenar: 2, sostener: 2 }).level, "en-construccion");
});

// 5 · recomendación según dimensión débil
test("5 · recomendación según dimensión débil", () => {
  const r = ok(FIX.mixto); // weakest sostener
  assert.match(r.recommendation, /Sostener/);
  assert.equal(r.risk, "Reinventar el rumbo en cada coyuntura y perder lo aprendido.");
  assert.match(r.firstMove, /memoria/);
  const r2 = ok(FIX.debilInterpretar); // weakest interpretar
  assert.match(r2.recommendation, /Interpretar/);
  assert.match(r2.firstMove, /mapa de tensiones/);
});

// 6 · respuestas incompletas
test("6 · respuestas incompletas", () => {
  const r = scoreCapacity(FIX.incompleto);
  assert.equal(r.status, "incomplete");
  if (r.status !== "incomplete") throw new Error();
  assert.deepEqual(r.missing, ["sostener"]);
  assert.equal(r.answered, 4);
  // null cuenta como sin contestar
  const r2 = scoreCapacity({ leer: 1, interpretar: null, decidir: 2, disenar: 2, sostener: 2 });
  assert.equal(r2.status, "incomplete");
});

// 7 · valores inválidos
test("7 · valores inválidos", () => {
  const r = scoreCapacity(FIX.invalido); // decidir=5
  assert.equal(r.status, "invalid");
  if (r.status !== "invalid") throw new Error();
  assert.deepEqual(r.invalid, ["decidir"]);
  // no entero
  const r2 = scoreCapacity({ leer: 1.5 as never, interpretar: 2, decidir: 2, disenar: 2, sostener: 2 });
  assert.equal(r2.status, "invalid");
  // tipo equivocado
  const r3 = scoreCapacity({ leer: "2" as never, interpretar: 2, decidir: 2, disenar: 2, sostener: 2 });
  assert.equal(r3.status, "invalid");
  // inválido tiene prioridad sobre incompleto
  const r4 = scoreCapacity({ leer: 9 as never, interpretar: 2 });
  assert.equal(r4.status, "invalid");
});

// 8 · consistencia entre resultado visible y payload guardado
test("8 · consistencia resultado visible vs payload", () => {
  const a = FIX.mixto;
  const r = scoreCapacity(a);
  const payload = buildScorePayload(a, r, { nombre: "Test", email: "t@x.com" });
  assert.deepEqual(payload.result, r); // mismo resultado mostrado y guardado
  assert.deepEqual(payload.answers, a);
  assert.equal(payload.source, "score-capacidad-futuro");
  assert.equal(payload.contact?.nombre, "Test");
});
