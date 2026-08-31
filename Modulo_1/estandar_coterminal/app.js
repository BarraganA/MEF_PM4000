const STEP = 5;

const translations = {
  es: {
    appTitle: "Posición estándar y ángulos coterminales",
    appSubtitle: "Explora rotaciones, construye ángulos en posición estándar y trabaja con coterminales.",
    languageLabel: "Idioma",
    modeExplore: "Explorar",
    modeBuild: "Construye el ángulo",
    modeCoterminal: "Coterminales",
    modeReduce: "Reducir a una vuelta",
    newExercise: "Nuevo ejercicio",
    unitLabel: "Unidad",
    degrees: "Grados",
    radians: "Radianes",
    difficultyLabel: "Tipo de ejercicio",
    mixed: "Mixto",
    standardAngles: "Una vuelta",
    quadrantalAngles: "Cuadrantales",
    negativeAngles: "Negativos",
    multiTurnAngles: "Más de una vuelta",
    stepNote: "Todos los ángulos se generan y ajustan de 5° en 5°.",
    exploreHeading: "Explora la rotación",
    exploreInstruction: "Genera un ángulo y observa su posición estándar.",
    buildHeading: "Construye el ángulo en posición estándar",
    buildInstruction: "Coloca tú mismo el lado terminal del ángulo.",
    coterminalHeading: "Ángulos coterminales",
    coterminalInstructionTop: "Genera ángulos diferentes que terminan en el mismo lado terminal.",
    reduceHeading: "Reduce a una vuelta",
    reduceInstructionTop: "Encuentra el ángulo coterminal equivalente dentro de una sola vuelta.",
    fullTurns: "Vueltas completas",
    residualAngle: "Ángulo restante",
    yourPosition: "Tu posición",
    exploreTitle: "Información del ángulo",
    direction: "Sentido",
    counterclockwise: "Antihorario",
    clockwise: "Horario",
    noRotation: "Sin rotación",
    terminalLocation: "Lado terminal",
    equivalentOneTurn: "Equivalente en una vuelta",
    referenceAngle: "Ángulo de referencia",
    notApplicable: "No aplica",
    coterminalRule: "Regla de coterminalidad",
    buildTitle: "Construye el ángulo",
    buildPrompt: "Arrastra el punto rosa para colocar el lado terminal en la posición correcta.",
    buildHelp: "El lado inicial permanece sobre el eje x positivo. El movimiento se ajusta automáticamente cada 5°.",
    checkAnswer: "Comprobar",
    correct: "Correcto",
    incorrect: "Incorrecto",
    buildCorrect: (target, placed) => `El lado terminal está correctamente colocado. ${target} tiene el mismo lado terminal que ${placed}.`,
    buildIncorrect: (target, placed, reduced) => `Tu lado terminal está en ${placed}. Revisa la rotación de ${target}. Su posición equivalente dentro de una vuelta es ${reduced}.`,
    coterminalTitle: "Genera ángulos coterminales",
    coterminalInstruction: "Escribe un ángulo coterminal positivo y uno negativo.",
    positiveCoterminal: "Coterminal positivo",
    negativeCoterminal: "Coterminal negativo",
    enterBoth: "Escribe ambas respuestas antes de comprobar.",
    invalidFraction: "Escribe numeradores y denominadores enteros válidos. El denominador no puede ser 0.",
    requireMultipleFive: "En grados, usa valores que sean múltiplos de 5°.",
    requirePositiveNegative: "La primera respuesta debe ser positiva y la segunda negativa.",
    coterminalCorrect: "Ambos ángulos son coterminales con el ángulo dado.",
    coterminalIncorrect: "Alguna respuesta no es coterminal. Recuerda sumar o restar vueltas completas.",
    reduceTitle: "Reduce a una vuelta",
    reduceInstruction: "Encuentra el ángulo coterminal en el intervalo de una vuelta.",
    enterAnswer: "Escribe una respuesta antes de comprobar.",
    reduceCorrect: value => `El representante en una vuelta es ${value}.`,
    reduceIncorrect: value => `Revisa las vueltas completas. El representante en una vuelta es ${value}.`,
    footerText: "Recurso interactivo de práctica"
  },

  en: {
    appTitle: "Standard position and coterminal angles",
    appSubtitle: "Explore rotations, build angles in standard position, and work with coterminal angles.",
    languageLabel: "Language",
    modeExplore: "Explore",
    modeBuild: "Build the angle",
    modeCoterminal: "Coterminal angles",
    modeReduce: "Reduce to one turn",
    newExercise: "New exercise",
    unitLabel: "Unit",
    degrees: "Degrees",
    radians: "Radians",
    difficultyLabel: "Exercise type",
    mixed: "Mixed",
    standardAngles: "One turn",
    quadrantalAngles: "Quadrantal",
    negativeAngles: "Negative",
    multiTurnAngles: "More than one turn",
    stepNote: "All angles are generated and snapped in 5° increments.",
    exploreHeading: "Explore the rotation",
    exploreInstruction: "Generate an angle and observe its standard position.",
    buildHeading: "Build the angle in standard position",
    buildInstruction: "Place the terminal side of the angle yourself.",
    coterminalHeading: "Coterminal angles",
    coterminalInstructionTop: "Generate different angles that end on the same terminal side.",
    reduceHeading: "Reduce to one turn",
    reduceInstructionTop: "Find the equivalent coterminal angle within a single turn.",
    fullTurns: "Complete turns",
    residualAngle: "Remaining angle",
    yourPosition: "Your position",
    exploreTitle: "Angle information",
    direction: "Direction",
    counterclockwise: "Counterclockwise",
    clockwise: "Clockwise",
    noRotation: "No rotation",
    terminalLocation: "Terminal side",
    equivalentOneTurn: "Equivalent in one turn",
    referenceAngle: "Reference angle",
    notApplicable: "Not applicable",
    coterminalRule: "Coterminal rule",
    buildTitle: "Build the angle",
    buildPrompt: "Drag the pink point to place the terminal side in the correct position.",
    buildHelp: "The initial side stays on the positive x-axis. Movement automatically snaps every 5°.",
    checkAnswer: "Check",
    correct: "Correct",
    incorrect: "Incorrect",
    buildCorrect: (target, placed) => `The terminal side is correctly placed. ${target} has the same terminal side as ${placed}.`,
    buildIncorrect: (target, placed, reduced) => `Your terminal side is at ${placed}. Review the rotation of ${target}. Its one-turn equivalent is ${reduced}.`,
    coterminalTitle: "Generate coterminal angles",
    coterminalInstruction: "Enter one positive and one negative coterminal angle.",
    positiveCoterminal: "Positive coterminal angle",
    negativeCoterminal: "Negative coterminal angle",
    enterBoth: "Enter both answers before checking.",
    invalidFraction: "Enter valid integer numerators and denominators. The denominator cannot be 0.",
    requireMultipleFive: "In degrees, use values that are multiples of 5°.",
    requirePositiveNegative: "The first answer must be positive and the second negative.",
    coterminalCorrect: "Both angles are coterminal with the given angle.",
    coterminalIncorrect: "At least one answer is not coterminal. Remember to add or subtract complete turns.",
    reduceTitle: "Reduce to one turn",
    reduceInstruction: "Find the coterminal angle in the interval of one turn.",
    enterAnswer: "Enter an answer before checking.",
    reduceCorrect: value => `The one-turn representative is ${value}.`,
    reduceIncorrect: value => `Review the complete turns. The one-turn representative is ${value}.`,
    footerText: "Interactive practice resource"
  }
};

const state = {
  language: "es",
  mode: "explore",
  unit: "deg",
  difficulty: "mixed",
  degrees: 210,
  placedDegrees: 0,
  dragging: false
};

const el = {
  language: document.getElementById("language-select"),
  unit: document.getElementById("unit-select"),
  difficulty: document.getElementById("difficulty-select"),
  heading: document.getElementById("practice-heading"),
  instruction: document.getElementById("practice-instruction"),
  measure: document.getElementById("given-measure"),
  svg: document.getElementById("angle-svg"),
  terminalRay: document.getElementById("terminal-ray"),
  rotationPath: document.getElementById("rotation-path"),
  fullCircle: document.getElementById("full-turn-circle"),
  dragHandle: document.getElementById("drag-handle"),
  buildControls: document.getElementById("build-controls"),
  placedMeasure: document.getElementById("placed-measure"),
  turnsSummary: document.getElementById("turns-summary"),
  turnCount: document.getElementById("turn-count"),
  residual: document.getElementById("residual-angle"),
  explore: document.getElementById("explore-panel"),
  build: document.getElementById("build-panel"),
  coterminal: document.getElementById("coterminal-panel"),
  reduce: document.getElementById("reduce-panel"),
  direction: document.getElementById("explore-direction"),
  location: document.getElementById("explore-location"),
  reduced: document.getElementById("explore-reduced"),
  reference: document.getElementById("explore-reference"),
  rule: document.getElementById("coterminal-rule"),
  buildFeedback: document.getElementById("build-feedback"),
  cotFeedback: document.getElementById("coterminal-feedback"),
  redFeedback: document.getElementById("reduce-feedback"),
  cotDeg: document.getElementById("coterminal-deg-inputs"),
  cotRad: document.getElementById("coterminal-rad-inputs"),
  redDeg: document.getElementById("reduce-deg-input"),
  redRad: document.getElementById("reduce-rad-input"),
  pDeg: document.getElementById("positive-coterminal-deg"),
  nDeg: document.getElementById("negative-coterminal-deg"),
  pNum: document.getElementById("positive-rad-num"),
  pDen: document.getElementById("positive-rad-den"),
  nNum: document.getElementById("negative-rad-num"),
  nDen: document.getElementById("negative-rad-den"),
  rDeg: document.getElementById("reduced-deg"),
  rNum: document.getElementById("reduced-rad-num"),
  rDen: document.getElementById("reduced-rad-den")
};

const modeButtons = {
  explore: document.getElementById("mode-explore"),
  build: document.getElementById("mode-build"),
  coterminal: document.getElementById("mode-coterminal"),
  reduce: document.getElementById("mode-reduce")
};

function t(key) {
  return translations[state.language][key];
}

function snapFive(value) {
  return Math.round(value / STEP) * STEP;
}

function randomMultiple(min, max) {
  const minStep = Math.ceil(min / STEP);
  const maxStep = Math.floor(max / STEP);
  return (Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep) * STEP;
}

function generateAngle() {
  switch (state.difficulty) {
    case "standard":
      return randomMultiple(0, 355);

    case "quadrantal":
      return [0, 90, 180, 270, 360, -90, -180, -270, -360][Math.floor(Math.random() * 9)];

    case "negative":
      return randomMultiple(-720, -5);

    case "multi": {
      const magnitude = randomMultiple(365, 1080);
      return Math.random() < 0.5 ? magnitude : -magnitude;
    }

    default: {
      const type = ["standard", "quadrantal", "negative", "multi"][Math.floor(Math.random() * 4)];
      const old = state.difficulty;
      state.difficulty = type;
      const value = generateAngle();
      state.difficulty = old;
      return value;
    }
  }
}

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a || 1;
}

function degreeToPiFraction(degrees) {
  if (degrees === 0) return { n: 0, d: 1 };

  const divisor = gcd(degrees, 180);
  let n = degrees / divisor;
  let d = 180 / divisor;

  if (d < 0) {
    n *= -1;
    d *= -1;
  }

  return { n, d };
}

function formatPiFraction({ n, d }) {
  if (n === 0) return "0";

  const sign = n < 0 ? "−" : "";
  const absN = Math.abs(n);

  if (d === 1) {
    return absN === 1 ? `${sign}π` : `${sign}${absN}π`;
  }

  return `${sign}${absN === 1 ? "π" : absN + "π"}/${d}`;
}

function displayAngle(degrees) {
  return state.unit === "deg"
    ? `${degrees}°`
    : formatPiFraction(degreeToPiFraction(degrees));
}

function generateExercise() {
  state.degrees = generateAngle();
  state.placedDegrees = 0;

  clearInputs();
  update();

  if (state.mode === "build") {
    drawPlacedAngle(0);
  } else {
    animateTargetAngle(state.degrees);
  }
}

function clearInputs() {
  [
    el.pDeg, el.nDeg, el.pNum, el.pDen,
    el.nNum, el.nDen, el.rDeg, el.rNum, el.rDen
  ].forEach(input => input.value = "");

  [el.buildFeedback, el.cotFeedback, el.redFeedback].forEach(node => node.hidden = true);
}

function getLocationKey(degrees) {
  const a = normalizeDegrees(degrees);

  if (a === 0) return "positiveX";
  if (a === 90) return "positiveY";
  if (a === 180) return "negativeX";
  if (a === 270) return "negativeY";

  if (a < 90) return "quadrantI";
  if (a < 180) return "quadrantII";
  if (a < 270) return "quadrantIII";
  return "quadrantIV";
}

function getReferenceAngle(reduced) {
  if ([0, 90, 180, 270].includes(reduced)) return null;
  if (reduced < 90) return reduced;
  if (reduced < 180) return 180 - reduced;
  if (reduced < 270) return reduced - 180;
  return 360 - reduced;
}

function update() {
  const reduced = normalizeDegrees(state.degrees);

  el.measure.textContent = displayAngle(state.degrees);
  el.turnCount.textContent = Math.floor(Math.abs(state.degrees) / 360);
  el.residual.textContent = displayAngle(reduced);

  el.direction.textContent =
    state.degrees > 0 ? t("counterclockwise") :
    state.degrees < 0 ? t("clockwise") :
    t("noRotation");

  el.location.textContent = t(getLocationKey(state.degrees));
  el.reduced.textContent = displayAngle(reduced);

  const reference = getReferenceAngle(reduced);
  el.reference.textContent = reference === null ? t("notApplicable") : displayAngle(reference);

  el.rule.innerHTML = state.unit === "deg"
    ? 'θ<sub>cot</sub> = θ + 360°k, &nbsp; k ∈ ℤ'
    : 'θ<sub>cot</sub> = θ + 2πk, &nbsp; k ∈ ℤ';

  el.cotDeg.hidden = state.unit !== "deg";
  el.cotRad.hidden = state.unit === "deg";
  el.redDeg.hidden = state.unit !== "deg";
  el.redRad.hidden = state.unit === "deg";

  updatePlacedMeasure();
}

function setMode(mode) {
  state.mode = mode;

  Object.entries(modeButtons).forEach(([key, button]) => {
    const active = key === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  el.explore.hidden = mode !== "explore";
  el.build.hidden = mode !== "build";
  el.coterminal.hidden = mode !== "coterminal";
  el.reduce.hidden = mode !== "reduce";

  el.dragHandle.hidden = mode !== "build";
  el.buildControls.hidden = mode !== "build";
  el.turnsSummary.hidden = mode === "build";

  const headings = {
    explore: ["exploreHeading", "exploreInstruction"],
    build: ["buildHeading", "buildInstruction"],
    coterminal: ["coterminalHeading", "coterminalInstructionTop"],
    reduce: ["reduceHeading", "reduceInstructionTop"]
  };

  el.heading.textContent = t(headings[mode][0]);
  el.instruction.textContent = t(headings[mode][1]);

  clearInputs();

  if (mode === "build") {
    state.placedDegrees = 0;
    drawPlacedAngle(0);
  } else {
    animateTargetAngle(state.degrees);
  }
}

function updatePlacedMeasure() {
  el.placedMeasure.textContent = `${state.placedDegrees}°`;
  el.dragHandle.setAttribute("aria-valuenow", String(state.placedDegrees));
}

function svgPointFromEvent(event) {
  const rect = el.svg.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (460 / rect.width);
  const y = (event.clientY - rect.top) * (390 / rect.height);
  return { x, y };
}

function angleFromPoint(point) {
  const dx = point.x - 230;
  const dy = 195 - point.y;
  let degrees = Math.atan2(dy, dx) * 180 / Math.PI;

  if (degrees < 0) degrees += 360;

  return normalizeDegrees(snapFive(degrees));
}

function setPlacedDegrees(degrees) {
  state.placedDegrees = normalizeDegrees(snapFive(degrees));
  drawPlacedAngle(state.placedDegrees);
  el.buildFeedback.hidden = true;
}

function drawPlacedAngle(degrees) {
  drawRay(normalizeDegrees(degrees));
  drawArc(normalizeDegrees(degrees), false);
  updatePlacedMeasure();
  positionDragHandle(normalizeDegrees(degrees));
}

function positionDragHandle(degrees) {
  const radians = degrees * Math.PI / 180;
  const x = 230 + 128 * Math.cos(radians);
  const y = 195 - 128 * Math.sin(radians);

  el.dragHandle.setAttribute("cx", x.toFixed(2));
  el.dragHandle.setAttribute("cy", y.toFixed(2));
}

function checkBuild() {
  const targetReduced = normalizeDegrees(state.degrees);
  const placed = normalizeDegrees(state.placedDegrees);
  const correct = targetReduced === placed;

  const targetText = displayAngle(state.degrees);
  const placedText = `${placed}°`;
  const reducedText = `${targetReduced}°`;

  if (correct) {
    showFeedback(
      el.buildFeedback,
      `<strong>${t("correct")}.</strong> ${t("buildCorrect")(targetText, placedText)}`,
      "correct"
    );
  } else {
    showFeedback(
      el.buildFeedback,
      `<strong>${t("incorrect")}.</strong> ${t("buildIncorrect")(targetText, placedText, reducedText)}`,
      "incorrect"
    );
  }
}

function checkCoterminal() {
  if (state.unit === "deg") {
    if (el.pDeg.value === "" || el.nDeg.value === "") {
      showFeedback(el.cotFeedback, t("enterBoth"), "warning");
      return;
    }

    const positive = Number(el.pDeg.value);
    const negative = Number(el.nDeg.value);

    if (positive % STEP !== 0 || negative % STEP !== 0) {
      showFeedback(el.cotFeedback, t("requireMultipleFive"), "warning");
      return;
    }

    if (!(positive > 0 && negative < 0)) {
      showFeedback(el.cotFeedback, t("requirePositiveNegative"), "warning");
      return;
    }

    const correct =
      isCoterminalDegrees(state.degrees, positive) &&
      isCoterminalDegrees(state.degrees, negative);

    showFeedback(
      el.cotFeedback,
      `<strong>${correct ? t("correct") : t("incorrect")}.</strong> ${
        correct ? t("coterminalCorrect") : t("coterminalIncorrect")
      }`,
      correct ? "correct" : "incorrect"
    );
  } else {
    const values = [el.pNum.value, el.pDen.value, el.nNum.value, el.nDen.value];

    if (values.some(value => value === "")) {
      showFeedback(el.cotFeedback, t("enterBoth"), "warning");
      return;
    }

    const [pn, pd, nn, nd] = values.map(Number);

    if (![pn, pd, nn, nd].every(Number.isInteger) || pd === 0 || nd === 0) {
      showFeedback(el.cotFeedback, t("invalidFraction"), "warning");
      return;
    }

    const positive = pn / pd;
    const negative = nn / nd;

    if (!(positive > 0 && negative < 0)) {
      showFeedback(el.cotFeedback, t("requirePositiveNegative"), "warning");
      return;
    }

    const base = state.degrees / 180;
    const correct =
      isCoterminalPiMultiple(base, positive) &&
      isCoterminalPiMultiple(base, negative);

    showFeedback(
      el.cotFeedback,
      `<strong>${correct ? t("correct") : t("incorrect")}.</strong> ${
        correct ? t("coterminalCorrect") : t("coterminalIncorrect")
      }`,
      correct ? "correct" : "incorrect"
    );
  }
}

function checkReduce() {
  const reduced = normalizeDegrees(state.degrees);

  if (state.unit === "deg") {
    if (el.rDeg.value === "") {
      showFeedback(el.redFeedback, t("enterAnswer"), "warning");
      return;
    }

    const answer = Number(el.rDeg.value);

    if (answer % STEP !== 0) {
      showFeedback(el.redFeedback, t("requireMultipleFive"), "warning");
      return;
    }

    const correct = answer === reduced;
    const correctText = `${reduced}°`;

    showFeedback(
      el.redFeedback,
      `<strong>${correct ? t("correct") : t("incorrect")}.</strong> ${
        correct ? t("reduceCorrect")(correctText) : t("reduceIncorrect")(correctText)
      }`,
      correct ? "correct" : "incorrect"
    );
  } else {
    if (el.rNum.value === "" || el.rDen.value === "") {
      showFeedback(el.redFeedback, t("enterAnswer"), "warning");
      return;
    }

    const n = Number(el.rNum.value);
    const d = Number(el.rDen.value);

    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) {
      showFeedback(el.redFeedback, t("invalidFraction"), "warning");
      return;
    }

    const expected = reduced / 180;
    const correct = Math.abs(n / d - expected) < 1e-10;
    const correctText = formatPiFraction(degreeToPiFraction(reduced));

    showFeedback(
      el.redFeedback,
      `<strong>${correct ? t("correct") : t("incorrect")}.</strong> ${
        correct ? t("reduceCorrect")(correctText) : t("reduceIncorrect")(correctText)
      }`,
      correct ? "correct" : "incorrect"
    );
  }
}

function isCoterminalDegrees(base, candidate) {
  const turns = (candidate - base) / 360;
  return Math.abs(turns - Math.round(turns)) < 1e-10;
}

function isCoterminalPiMultiple(basePiMultiple, candidatePiMultiple) {
  const turns = (candidatePiMultiple - basePiMultiple) / 2;
  return Math.abs(turns - Math.round(turns)) < 1e-10;
}

function showFeedback(node, message, type) {
  node.className = `feedback is-${type}`;
  node.innerHTML = message;
  node.hidden = false;
}

function animateTargetAngle(targetDegrees) {
  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
  const start = performance.now();

  function frame(now) {
    const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    drawTargetAngle(targetDegrees * eased);

    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function drawTargetAngle(degrees) {
  const reduced = normalizeDegrees(degrees);
  drawRay(reduced);
  drawArc(degrees, true);
}

function drawRay(degrees) {
  const radians = degrees * Math.PI / 180;
  const x = 230 + 128 * Math.cos(radians);
  const y = 195 - 128 * Math.sin(radians);

  el.terminalRay.setAttribute("x2", x.toFixed(2));
  el.terminalRay.setAttribute("y2", y.toFixed(2));
}

function drawArc(degrees, allowFullCircle) {
  const cx = 230;
  const cy = 195;
  const radius = 85;
  const abs = Math.abs(degrees);

  if (abs < 0.01) {
    el.rotationPath.setAttribute("d", "");
    el.fullCircle.hidden = true;
    return;
  }

  const remainder = abs % 360;

  if (allowFullCircle && abs >= 360 && remainder < 0.01) {
    el.rotationPath.setAttribute("d", "");
    el.fullCircle.hidden = false;
    return;
  }

  el.fullCircle.hidden = true;

  const shown = allowFullCircle ? remainder : normalizeDegrees(degrees);

  if (shown < 0.01) {
    el.rotationPath.setAttribute("d", "");
    return;
  }

  const signed = allowFullCircle && degrees < 0 ? -shown : shown;
  const radians = signed * Math.PI / 180;

  const startX = cx + radius;
  const startY = cy;
  const endX = cx + radius * Math.cos(radians);
  const endY = cy - radius * Math.sin(radians);

  const largeArcFlag = shown > 180 ? 1 : 0;
  const sweepFlag = signed >= 0 ? 0 : 1;

  el.rotationPath.setAttribute(
    "d",
    `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX.toFixed(2)} ${endY.toFixed(2)}`
  );
}

function applyLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const value = translations[state.language][node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });

  setMode(state.mode);
  update();
}

function onPointerMove(event) {
  if (!state.dragging || state.mode !== "build") return;

  const point = svgPointFromEvent(event);
  setPlacedDegrees(angleFromPoint(point));
}

el.svg.addEventListener("pointerdown", event => {
  if (state.mode !== "build") return;

  state.dragging = true;
  el.dragHandle.classList.add("is-dragging");
  el.svg.setPointerCapture(event.pointerId);

  const point = svgPointFromEvent(event);
  setPlacedDegrees(angleFromPoint(point));
});

el.svg.addEventListener("pointermove", onPointerMove);

el.svg.addEventListener("pointerup", event => {
  state.dragging = false;
  el.dragHandle.classList.remove("is-dragging");

  if (el.svg.hasPointerCapture(event.pointerId)) {
    el.svg.releasePointerCapture(event.pointerId);
  }
});

el.svg.addEventListener("pointercancel", () => {
  state.dragging = false;
  el.dragHandle.classList.remove("is-dragging");
});

el.dragHandle.addEventListener("keydown", event => {
  if (state.mode !== "build") return;

  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    setPlacedDegrees(state.placedDegrees + STEP);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    setPlacedDegrees(state.placedDegrees - STEP);
  }
});

document.getElementById("minus-five").addEventListener("click", () => {
  setPlacedDegrees(state.placedDegrees - STEP);
});

document.getElementById("plus-five").addEventListener("click", () => {
  setPlacedDegrees(state.placedDegrees + STEP);
});

Object.entries(modeButtons).forEach(([mode, button]) => {
  button.addEventListener("click", () => setMode(mode));
});

document.getElementById("new-exercise").addEventListener("click", generateExercise);
document.getElementById("check-build").addEventListener("click", checkBuild);
document.getElementById("check-coterminal").addEventListener("click", checkCoterminal);
document.getElementById("check-reduce").addEventListener("click", checkReduce);

el.language.addEventListener("change", event => {
  state.language = event.target.value;
  applyLanguage();
});

el.unit.addEventListener("change", event => {
  state.unit = event.target.value;
  clearInputs();
  update();

  if (state.mode === "build") {
    drawPlacedAngle(state.placedDegrees);
  } else {
    drawTargetAngle(state.degrees);
  }
});

el.difficulty.addEventListener("change", event => {
  state.difficulty = event.target.value;
  generateExercise();
});

el.language.value = state.language;
el.unit.value = state.unit;
el.difficulty.value = state.difficulty;

applyLanguage();
generateExercise();
