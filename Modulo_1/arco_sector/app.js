const ANGLE_STEP = 5;
const RADIUS_MIN = 2;
const RADIUS_MAX = 20;

const translations = {
  es: {
    appTitle: "Longitud de arco y sector circular",
    appSubtitle: "Explora cómo el radio y el ángulo determinan la longitud de arco y el área de un sector circular.",
    languageLabel: "Idioma",
    modeExplore: "Explorar",
    modeArc: "Longitud de arco",
    modeSector: "Área del sector",
    newExercise: "Nuevo ejercicio",
    unitLabel: "Mostrar ángulo en",
    degrees: "Grados",
    radians: "Radianes",
    angleSetLabel: "Tipo de ángulos",
    mixedAngles: "Mixto",
    commonAngles: "Ángulos comunes",
    fiveAngles: "Múltiplos de 5°",
    stepNote: "En modo explorar, el ángulo se ajusta de 5° en 5°.",
    exploreHeading: "Explora la relación",
    exploreInstruction: "Modifica el radio y el ángulo para observar cómo cambian el arco y el sector.",
    arcHeading: "Practica longitud de arco",
    arcInstruction: "Utiliza s = rθ para calcular la longitud del arco.",
    sectorHeading: "Practica área del sector",
    sectorInstruction: "Utiliza A = ½r²θ para calcular el área del sector circular.",
    radiusLabel: "Radio",
    angleLabel: "Ángulo",
    exploreTitle: "Observa qué cambia",
    degreesValue: "Ángulo en grados",
    radiansValue: "Ángulo en radianes",
    arcLength: "Longitud de arco",
    sectorArea: "Área del sector",
    formulaReminder: "Recuerda",
    radianReminder: "En estas fórmulas, θ debe estar expresado en radianes.",
    circleFraction: "Fracción de la circunferencia",
    arcQuestionTitle: "Calcula la longitud de arco",
    sectorQuestionTitle: "Calcula el área del sector",
    arcQuestion: "Calcula la longitud del arco indicado.",
    sectorQuestion: "Calcula el área del sector circular indicado.",
    answerFormat: "Formato de respuesta",
    exactAnswer: "Exacta",
    decimalAnswer: "Decimal",
    exactPiPrompt: "Escribe la respuesta como múltiplo de π.",
    exactHelp: "Por ejemplo, para 6π escribe 6/1; para 7π/4 escribe 7/4.",
    decimalPrompt: "Escribe una aproximación decimal.",
    decimalTolerance: "Se acepta una diferencia de hasta 0.02.",
    showHint: "Mostrar pista",
    checkAnswer: "Comprobar",
    hintArcDeg: "Primero convierte el ángulo a radianes. Después usa s = rθ.",
    hintArcRad: "Usa directamente s = rθ.",
    hintSectorDeg: "Primero convierte el ángulo a radianes. Después usa A = ½r²θ.",
    hintSectorRad: "Usa directamente A = ½r²θ.",
    enterExact: "Escribe un numerador y un denominador válidos.",
    enterDecimal: "Escribe una respuesta decimal.",
    correct: "Correcto",
    incorrect: "Incorrecto",
    correctMessage: "La respuesta es correcta.",
    incorrectMessage: "Revisa la conversión a radianes y la sustitución en la fórmula.",
    solutionHeading: "Procedimiento",
    convertStep: (deg, rad) => `${deg}° = ${rad} rad`,
    arcSubstitution: (r, rad) => `s = ${r}(${rad})`,
    sectorSubstitution: (r, rad) => `A = ½(${r})²(${rad})`,
    exactResult: value => `Resultado exacto: ${value}`,
    decimalResult: value => `Aproximación decimal: ${value}`,
    footerText: "Recurso interactivo de práctica"
  },

  en: {
    appTitle: "Arc length and circular sector",
    appSubtitle: "Explore how radius and angle determine arc length and the area of a circular sector.",
    languageLabel: "Language",
    modeExplore: "Explore",
    modeArc: "Arc length",
    modeSector: "Sector area",
    newExercise: "New exercise",
    unitLabel: "Display angle in",
    degrees: "Degrees",
    radians: "Radians",
    angleSetLabel: "Angle type",
    mixedAngles: "Mixed",
    commonAngles: "Common angles",
    fiveAngles: "Multiples of 5°",
    stepNote: "In Explore mode, the angle snaps in 5° increments.",
    exploreHeading: "Explore the relationship",
    exploreInstruction: "Change the radius and angle to observe how the arc and sector change.",
    arcHeading: "Practice arc length",
    arcInstruction: "Use s = rθ to calculate arc length.",
    sectorHeading: "Practice sector area",
    sectorInstruction: "Use A = ½r²θ to calculate the area of a circular sector.",
    radiusLabel: "Radius",
    angleLabel: "Angle",
    exploreTitle: "Observe what changes",
    degreesValue: "Angle in degrees",
    radiansValue: "Angle in radians",
    arcLength: "Arc length",
    sectorArea: "Sector area",
    formulaReminder: "Remember",
    radianReminder: "In these formulas, θ must be expressed in radians.",
    circleFraction: "Fraction of the circumference",
    arcQuestionTitle: "Calculate the arc length",
    sectorQuestionTitle: "Calculate the sector area",
    arcQuestion: "Calculate the indicated arc length.",
    sectorQuestion: "Calculate the area of the indicated circular sector.",
    answerFormat: "Answer format",
    exactAnswer: "Exact",
    decimalAnswer: "Decimal",
    exactPiPrompt: "Enter the answer as a multiple of π.",
    exactHelp: "For example, for 6π enter 6/1; for 7π/4 enter 7/4.",
    decimalPrompt: "Enter a decimal approximation.",
    decimalTolerance: "A difference up to 0.02 is accepted.",
    showHint: "Show hint",
    checkAnswer: "Check",
    hintArcDeg: "First convert the angle to radians. Then use s = rθ.",
    hintArcRad: "Use s = rθ directly.",
    hintSectorDeg: "First convert the angle to radians. Then use A = ½r²θ.",
    hintSectorRad: "Use A = ½r²θ directly.",
    enterExact: "Enter a valid numerator and denominator.",
    enterDecimal: "Enter a decimal answer.",
    correct: "Correct",
    incorrect: "Incorrect",
    correctMessage: "The answer is correct.",
    incorrectMessage: "Review the conversion to radians and substitution into the formula.",
    solutionHeading: "Procedure",
    convertStep: (deg, rad) => `${deg}° = ${rad} rad`,
    arcSubstitution: (r, rad) => `s = ${r}(${rad})`,
    sectorSubstitution: (r, rad) => `A = ½(${r})²(${rad})`,
    exactResult: value => `Exact result: ${value}`,
    decimalResult: value => `Decimal approximation: ${value}`,
    footerText: "Interactive practice resource"
  }
};

const state = {
  language: "es",
  mode: "explore",
  unit: "deg",
  angleSet: "mixed",
  answerFormat: "exact",
  radius: 6,
  degrees: 120,
  dragging: false
};

const el = {
  language: document.getElementById("language-select"),
  unit: document.getElementById("unit-select"),
  angleSet: document.getElementById("angle-set-select"),
  heading: document.getElementById("practice-heading"),
  instruction: document.getElementById("practice-instruction"),
  newExercise: document.getElementById("new-exercise"),

  svg: document.getElementById("circle-svg"),
  sectorPath: document.getElementById("sector-path"),
  arcPath: document.getElementById("arc-path"),
  terminalRadius: document.getElementById("terminal-radius"),
  angleArc: document.getElementById("angle-arc"),
  dragHandle: document.getElementById("drag-handle"),
  thetaLabel: document.getElementById("theta-label-svg"),
  arcLabel: document.getElementById("arc-label-svg"),

  radiusDisplay: document.getElementById("radius-display"),
  angleDisplay: document.getElementById("angle-display"),
  radiusControlValue: document.getElementById("radius-control-value"),
  angleControlValue: document.getElementById("angle-control-value"),
  exploreControls: document.getElementById("explore-controls"),

  degreesValue: document.getElementById("degrees-value"),
  radiansValue: document.getElementById("radians-value"),
  arcValue: document.getElementById("arc-value"),
  areaValue: document.getElementById("area-value"),
  fractionTurn: document.getElementById("fraction-turn"),
  turnProgress: document.getElementById("turn-progress"),

  explorePanel: document.getElementById("explore-panel"),
  practicePanel: document.getElementById("practice-panel-inner"),
  practiceTitle: document.getElementById("practice-question-title"),
  practiceText: document.getElementById("practice-question-text"),
  problemRadius: document.getElementById("problem-radius"),
  problemAngle: document.getElementById("problem-angle"),

  answerExact: document.getElementById("answer-exact"),
  answerDecimal: document.getElementById("answer-decimal"),
  exactArea: document.getElementById("exact-answer-area"),
  decimalArea: document.getElementById("decimal-answer-area"),
  exactNum: document.getElementById("exact-num"),
  exactDen: document.getElementById("exact-den"),
  decimalAnswer: document.getElementById("decimal-answer"),

  hintButton: document.getElementById("hint-button"),
  hintBox: document.getElementById("hint-box"),
  checkAnswer: document.getElementById("check-answer"),
  feedback: document.getElementById("practice-feedback"),
  solutionBox: document.getElementById("solution-box"),
  solutionContent: document.getElementById("solution-content")
};

const modeButtons = {
  explore: document.getElementById("mode-explore"),
  arc: document.getElementById("mode-arc"),
  sector: document.getElementById("mode-sector")
};

function t(key) {
  return translations[state.language][key];
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

function reduceFraction(n, d) {
  if (n === 0) return { n: 0, d: 1 };

  const divisor = gcd(n, d);
  n /= divisor;
  d /= divisor;

  if (d < 0) {
    n *= -1;
    d *= -1;
  }

  return { n, d };
}

function degToPiFraction(degrees) {
  return reduceFraction(degrees, 180);
}

function formatPiFraction(frac) {
  if (frac.n === 0) return "0";

  const sign = frac.n < 0 ? "−" : "";
  const absN = Math.abs(frac.n);

  if (frac.d === 1) {
    return absN === 1 ? `${sign}π` : `${sign}${absN}π`;
  }

  return `${sign}${absN === 1 ? "π" : absN + "π"}/${frac.d}`;
}

function formatPiCoefficient(frac) {
  return formatPiFraction(frac);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAngle() {
  const common = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

  if (state.angleSet === "common") {
    return common[randomInt(0, common.length - 1)];
  }

  if (state.angleSet === "five") {
    return randomInt(1, 71) * 5;
  }

  return Math.random() < 0.5
    ? common[randomInt(0, common.length - 1)]
    : randomInt(1, 71) * 5;
}

function generateExercise() {
  state.radius = randomInt(RADIUS_MIN, RADIUS_MAX);
  state.degrees = randomAngle();

  clearPractice();

  if (state.mode === "explore") {
    state.radius = Math.max(2, Math.min(20, state.radius));
  }

  updateAll();
}

function setMode(mode) {
  state.mode = mode;

  Object.entries(modeButtons).forEach(([key, button]) => {
    const active = key === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  el.explorePanel.hidden = mode !== "explore";
  el.practicePanel.hidden = mode === "explore";
  el.exploreControls.hidden = mode !== "explore";
  el.dragHandle.hidden = mode !== "explore";

  const headings = {
    explore: ["exploreHeading", "exploreInstruction"],
    arc: ["arcHeading", "arcInstruction"],
    sector: ["sectorHeading", "sectorInstruction"]
  };

  el.heading.textContent = t(headings[mode][0]);
  el.instruction.textContent = t(headings[mode][1]);

  if (mode === "arc") {
    el.practiceTitle.textContent = t("arcQuestionTitle");
    el.practiceText.textContent = t("arcQuestion");
  }

  if (mode === "sector") {
    el.practiceTitle.textContent = t("sectorQuestionTitle");
    el.practiceText.textContent = t("sectorQuestion");
  }

  clearPractice();
  updateAll();
}

function setAnswerFormat(format) {
  state.answerFormat = format;

  const exact = format === "exact";

  el.answerExact.classList.toggle("is-active", exact);
  el.answerDecimal.classList.toggle("is-active", !exact);
  el.answerExact.setAttribute("aria-pressed", String(exact));
  el.answerDecimal.setAttribute("aria-pressed", String(!exact));

  el.exactArea.hidden = !exact;
  el.decimalArea.hidden = exact;

  el.feedback.hidden = true;
  el.solutionBox.hidden = true;
}

function clearPractice() {
  el.exactNum.value = "";
  el.exactDen.value = "1";
  el.decimalAnswer.value = "";
  el.feedback.hidden = true;
  el.hintBox.hidden = true;
  el.solutionBox.hidden = true;
}

function updateAll() {
  el.radiusDisplay.textContent = String(state.radius);
  el.radiusControlValue.textContent = String(state.radius);

  const shownAngle = state.unit === "deg"
    ? `${state.degrees}°`
    : `${formatPiFraction(degToPiFraction(state.degrees))}`;

  el.angleDisplay.textContent = shownAngle;
  el.angleControlValue.textContent = `${state.degrees}°`;

  el.problemRadius.textContent = String(state.radius);
  el.problemAngle.textContent = shownAngle;

  updateExploreData();
  drawDiagram();
}

function updateExploreData() {
  const radFrac = degToPiFraction(state.degrees);
  const arcFrac = arcExactFraction();
  const areaFrac = areaExactFraction();

  el.degreesValue.textContent = `${state.degrees}°`;
  el.radiansValue.textContent = `${formatPiFraction(radFrac)} rad`;

  const arcDecimal = arcDecimalValue().toFixed(2);
  const areaDecimal = areaDecimalValue().toFixed(2);

  el.arcValue.textContent = `${formatPiCoefficient(arcFrac)} ≈ ${arcDecimal}`;
  el.areaValue.textContent = `${formatPiCoefficient(areaFrac)} ≈ ${areaDecimal}`;

  const turnFrac = reduceFraction(state.degrees, 360);
  el.fractionTurn.textContent = `${state.degrees}° / 360° = ${turnFrac.n}/${turnFrac.d}`;
  el.turnProgress.style.width = `${(state.degrees / 360) * 100}%`;
}

function arcExactFraction() {
  const radFrac = degToPiFraction(state.degrees);
  return reduceFraction(state.radius * radFrac.n, radFrac.d);
}

function areaExactFraction() {
  const radFrac = degToPiFraction(state.degrees);
  return reduceFraction(state.radius * state.radius * radFrac.n, 2 * radFrac.d);
}

function arcDecimalValue() {
  return state.radius * state.degrees * Math.PI / 180;
}

function areaDecimalValue() {
  return 0.5 * state.radius * state.radius * state.degrees * Math.PI / 180;
}

function targetExactFraction() {
  return state.mode === "arc" ? arcExactFraction() : areaExactFraction();
}

function targetDecimalValue() {
  return state.mode === "arc" ? arcDecimalValue() : areaDecimalValue();
}

function checkPracticeAnswer() {
  let correct = false;

  if (state.answerFormat === "exact") {
    const rawN = el.exactNum.value.trim();
    const rawD = el.exactDen.value.trim();

    if (rawN === "" || rawD === "") {
      showFeedback(t("enterExact"), "warning");
      return;
    }

    const n = Number(rawN);
    const d = Number(rawD);

    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) {
      showFeedback(t("enterExact"), "warning");
      return;
    }

    const user = reduceFraction(n, d);
    const target = targetExactFraction();

    correct = user.n === target.n && user.d === target.d;
  } else {
    const raw = el.decimalAnswer.value.trim();

    if (raw === "") {
      showFeedback(t("enterDecimal"), "warning");
      return;
    }

    const value = Number(raw);

    if (!Number.isFinite(value)) {
      showFeedback(t("enterDecimal"), "warning");
      return;
    }

    correct = Math.abs(value - targetDecimalValue()) <= 0.02;
  }

  showFeedback(
    `<strong>${correct ? t("correct") : t("incorrect")}.</strong> ${
      correct ? t("correctMessage") : t("incorrectMessage")
    }`,
    correct ? "correct" : "incorrect"
  );

  showSolution();
}

function showFeedback(message, type) {
  el.feedback.className = `feedback is-${type}`;
  el.feedback.innerHTML = message;
  el.feedback.hidden = false;
}

function showHint() {
  const key =
    state.mode === "arc"
      ? (state.unit === "deg" ? "hintArcDeg" : "hintArcRad")
      : (state.unit === "deg" ? "hintSectorDeg" : "hintSectorRad");

  el.hintBox.textContent = t(key);
  el.hintBox.hidden = false;
}

function showSolution() {
  const rad = formatPiFraction(degToPiFraction(state.degrees));
  const exact = formatPiFraction(targetExactFraction());
  const decimal = targetDecimalValue().toFixed(2);

  const lines = [];

  if (state.unit === "deg") {
    lines.push(`<p>${t("convertStep")(state.degrees, rad)}</p>`);
  }

  if (state.mode === "arc") {
    lines.push(`<p>${t("arcSubstitution")(state.radius, rad)}</p>`);
  } else {
    lines.push(`<p>${t("sectorSubstitution")(state.radius, rad)}</p>`);
  }

  lines.push(`<p><strong>${t("exactResult")(exact)}</strong></p>`);
  lines.push(`<p>${t("decimalResult")(decimal)}</p>`);

  el.solutionContent.innerHTML = lines.join("");
  el.solutionBox.hidden = false;
}

function setRadius(value) {
  state.radius = Math.max(RADIUS_MIN, Math.min(RADIUS_MAX, value));
  clearPractice();
  updateAll();
}

function setDegrees(value) {
  let next = Math.round(value / ANGLE_STEP) * ANGLE_STEP;

  if (next < 5) next = 355;
  if (next > 355) next = 5;

  state.degrees = next;
  clearPractice();
  updateAll();
}

function svgPointFromEvent(event) {
  const rect = el.svg.getBoundingClientRect();

  return {
    x: (event.clientX - rect.left) * (520 / rect.width),
    y: (event.clientY - rect.top) * (420 / rect.height)
  };
}

function degreesFromPoint(point) {
  const dx = point.x - 260;
  const dy = 215 - point.y;

  let angle = Math.atan2(dy, dx) * 180 / Math.PI;

  if (angle < 0) angle += 360;

  angle = Math.round(angle / ANGLE_STEP) * ANGLE_STEP;

  if (angle === 0) angle = 355;
  if (angle >= 360) angle = 355;

  return angle;
}

function drawDiagram() {
  const cx = 260;
  const cy = 215;
  const radius = 145;
  const angle = state.degrees;
  const radians = angle * Math.PI / 180;

  const endX = cx + radius * Math.cos(radians);
  const endY = cy - radius * Math.sin(radians);

  el.terminalRadius.setAttribute("x2", endX.toFixed(2));
  el.terminalRadius.setAttribute("y2", endY.toFixed(2));

  el.dragHandle.setAttribute("cx", endX.toFixed(2));
  el.dragHandle.setAttribute("cy", endY.toFixed(2));
  el.dragHandle.setAttribute("aria-valuenow", String(angle));

  const largeArcFlag = angle > 180 ? 1 : 0;

  const sector = [
    `M ${cx} ${cy}`,
    `L ${cx + radius} ${cy}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX.toFixed(2)} ${endY.toFixed(2)}`,
    "Z"
  ].join(" ");

  const arc = [
    `M ${cx + radius} ${cy}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX.toFixed(2)} ${endY.toFixed(2)}`
  ].join(" ");

  el.sectorPath.setAttribute("d", sector);
  el.arcPath.setAttribute("d", arc);

  const angleRadius = 54;
  const angleX = cx + angleRadius * Math.cos(radians);
  const angleY = cy - angleRadius * Math.sin(radians);

  const angleArc = [
    `M ${cx + angleRadius} ${cy}`,
    `A ${angleRadius} ${angleRadius} 0 ${largeArcFlag} 0 ${angleX.toFixed(2)} ${angleY.toFixed(2)}`
  ].join(" ");

  el.angleArc.setAttribute("d", angleArc);

  const midAngle = (angle / 2) * Math.PI / 180;
  const thetaX = cx + 78 * Math.cos(midAngle);
  const thetaY = cy - 78 * Math.sin(midAngle);

  el.thetaLabel.setAttribute("x", thetaX.toFixed(2));
  el.thetaLabel.setAttribute("y", thetaY.toFixed(2));

  const arcMidX = cx + 165 * Math.cos(midAngle);
  const arcMidY = cy - 165 * Math.sin(midAngle);

  el.arcLabel.setAttribute("x", arcMidX.toFixed(2));
  el.arcLabel.setAttribute("y", arcMidY.toFixed(2));
}

function applyLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const value = translations[state.language][node.dataset.i18n];

    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  setMode(state.mode);
  updateAll();
}

el.svg.addEventListener("pointerdown", event => {
  if (state.mode !== "explore") return;

  state.dragging = true;
  el.dragHandle.classList.add("is-dragging");
  el.svg.setPointerCapture(event.pointerId);

  const point = svgPointFromEvent(event);
  setDegrees(degreesFromPoint(point));
});

el.svg.addEventListener("pointermove", event => {
  if (!state.dragging || state.mode !== "explore") return;

  const point = svgPointFromEvent(event);
  setDegrees(degreesFromPoint(point));
});

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
  if (state.mode !== "explore") return;

  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    setDegrees(state.degrees + ANGLE_STEP);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    setDegrees(state.degrees - ANGLE_STEP);
  }
});

document.getElementById("radius-minus").addEventListener("click", () => setRadius(state.radius - 1));
document.getElementById("radius-plus").addEventListener("click", () => setRadius(state.radius + 1));
document.getElementById("angle-minus").addEventListener("click", () => setDegrees(state.degrees - ANGLE_STEP));
document.getElementById("angle-plus").addEventListener("click", () => setDegrees(state.degrees + ANGLE_STEP));

Object.entries(modeButtons).forEach(([mode, button]) => {
  button.addEventListener("click", () => setMode(mode));
});

el.newExercise.addEventListener("click", generateExercise);
el.answerExact.addEventListener("click", () => setAnswerFormat("exact"));
el.answerDecimal.addEventListener("click", () => setAnswerFormat("decimal"));
el.hintButton.addEventListener("click", showHint);
el.checkAnswer.addEventListener("click", checkPracticeAnswer);

el.language.addEventListener("change", event => {
  state.language = event.target.value;
  applyLanguage();
});

el.unit.addEventListener("change", event => {
  state.unit = event.target.value;
  clearPractice();
  updateAll();
});

el.angleSet.addEventListener("change", event => {
  state.angleSet = event.target.value;
  generateExercise();
});

el.language.value = state.language;
el.unit.value = state.unit;
el.angleSet.value = state.angleSet;

applyLanguage();
setAnswerFormat("exact");
updateAll();
