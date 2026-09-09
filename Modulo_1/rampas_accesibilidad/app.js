const STEP = 5;
const MAX_MEASURE = 45;

const translations = {
  es: {
    appTitle: "Diseño para accesibilidad",
    appSubtitle: "Mide, compara y analiza cómo cambia la inclinación de una rampa cuando cambia el espacio disponible.",
    languageLabel: "Idioma",
    modeCompare: "Comparar",
    modeDesign: "Diseñar",
    newTask: "Nuevo ejercicio",
    compareKicker: ramp => `Rampa ${ramp}`,
    compareContextTitle: "Mide el ángulo de inclinación",
    designKicker: "Simulador",
    designContextTitle: "Analiza el espacio disponible",
    yourMeasurement: "Tu medición",
    compareTitle: "Compara las rampas",
    compareIntro: "Selecciona una rampa, mide el ángulo que forma con el suelo y después clasifícalo.",
    checkMeasurement: "Comprobar medición",
    correctMeasurement: "La medición es correcta.",
    incorrectMeasurement: "La medición todavía no coincide con la inclinación de la rampa. Ajusta el brazo del transportador.",
    classifyPrompt: "Ahora clasifica el ángulo:",
    acute: "Agudo",
    right: "Recto",
    obtuse: "Obtuso",
    straight: "Llano",
    checkClassification: "Comprobar clasificación",
    selectClassification: "Selecciona una clasificación.",
    correctClassification: "Clasificación correcta.",
    incorrectClassification: "Revisa la definición de cada tipo de ángulo.",
    compareNote: "Registra este resultado en tu actividad de Canvas y continúa con otra rampa.",
    designTitle: "Experimenta con el espacio disponible",
    designIntro: "Mantén fija la altura y cambia el espacio horizontal. Después mide la inclinación resultante.",
    height: "Altura",
    horizontalSpace: "Espacio horizontal disponible",
    designCorrect: "La medición coincide con la inclinación de esta configuración.",
    designNote: "Registra en Canvas la altura, el espacio horizontal y el ángulo obtenido. Después prueba otra configuración.",
    footerText: "Recurso interactivo de práctica"
  },
  en: {
    appTitle: "Design for accessibility",
    appSubtitle: "Measure, compare, and analyze how a ramp's slope changes when the available space changes.",
    languageLabel: "Language",
    modeCompare: "Compare",
    modeDesign: "Design",
    newTask: "New task",
    compareKicker: ramp => `Ramp ${ramp}`,
    compareContextTitle: "Measure the angle of inclination",
    designKicker: "Simulator",
    designContextTitle: "Analyze the available space",
    yourMeasurement: "Your measurement",
    compareTitle: "Compare the ramps",
    compareIntro: "Select a ramp, measure the angle it makes with the ground, and then classify it.",
    checkMeasurement: "Check measurement",
    correctMeasurement: "The measurement is correct.",
    incorrectMeasurement: "The measurement does not yet match the ramp's inclination. Adjust the protractor arm.",
    classifyPrompt: "Now classify the angle:",
    acute: "Acute",
    right: "Right",
    obtuse: "Obtuse",
    straight: "Straight",
    checkClassification: "Check classification",
    selectClassification: "Select a classification.",
    correctClassification: "Correct classification.",
    incorrectClassification: "Review the definition of each type of angle.",
    compareNote: "Record this result in your Canvas activity and continue with another ramp.",
    designTitle: "Experiment with the available space",
    designIntro: "Keep the height fixed and change the horizontal space. Then measure the resulting inclination.",
    height: "Height",
    horizontalSpace: "Available horizontal space",
    designCorrect: "The measurement matches the inclination of this configuration.",
    designNote: "Record the height, horizontal space, and angle in Canvas. Then try another configuration.",
    footerText: "Interactive practice resource"
  }
};

const rampAngles = { A: 5, B: 10, C: 15 };

const state = {
  language: "es",
  mode: "compare",
  selectedRamp: "A",
  measurement: 0,
  measurementCorrect: false,
  height: 0.60,
  designAngle: 5,
  designMeasurementCorrect: false,
  dragging: false
};

const el = {
  language: document.getElementById("language-select"),
  kicker: document.getElementById("context-kicker"),
  contextTitle: document.getElementById("context-title"),
  svg: document.getElementById("ramp-svg"),
  rampLine: document.getElementById("ramp-line"),
  rampRail: document.getElementById("ramp-rail"),
  railStart: document.getElementById("rail-start"),
  railEnd: document.getElementById("rail-end"),
  platformLine: document.getElementById("platform-line"),
  heightGuide: document.getElementById("height-guide"),
  runGuide: document.getElementById("run-guide"),
  heightText: document.getElementById("height-text"),
  runText: document.getElementById("run-text"),
  protractorArc: document.getElementById("protractor-arc"),
  measureRay: document.getElementById("measure-ray"),
  measureKnob: document.getElementById("measure-knob"),
  tickGroup: document.getElementById("angle-ticks"),
  measureValue: document.getElementById("measure-value"),
  comparePanel: document.getElementById("compare-panel"),
  designPanel: document.getElementById("design-panel"),
  measurementFeedback: document.getElementById("measurement-feedback"),
  classificationArea: document.getElementById("classification-area"),
  classificationFeedback: document.getElementById("classification-feedback"),
  compareNote: document.getElementById("compare-note"),
  heightSelect: document.getElementById("height-select"),
  spaceButtons: document.getElementById("space-buttons"),
  designFeedback: document.getElementById("design-feedback"),
  designNote: document.getElementById("design-note")
};

const modeButtons = {
  compare: document.getElementById("mode-compare"),
  design: document.getElementById("mode-design")
};

function t(key) { return translations[state.language][key]; }

function setMode(mode) {
  state.mode = mode;
  state.measurement = 0;
  state.measurementCorrect = false;
  state.designMeasurementCorrect = false;

  Object.entries(modeButtons).forEach(([key, button]) => {
    const active = key === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  el.comparePanel.hidden = mode !== "compare";
  el.designPanel.hidden = mode !== "design";

  if (mode === "compare") {
    el.kicker.textContent = t("compareKicker")(state.selectedRamp);
    el.contextTitle.textContent = t("compareContextTitle");
    clearCompareFeedback();
  } else {
    el.kicker.textContent = t("designKicker");
    el.contextTitle.textContent = t("designContextTitle");
    renderSpaceButtons();
    el.designFeedback.hidden = true;
    el.designNote.hidden = true;
  }

  drawCurrentRamp();
  drawMeasureTool();
}

function setMeasurement(value) {
  let next = Math.round(value / STEP) * STEP;
  next = Math.max(0, Math.min(MAX_MEASURE, next));
  state.measurement = next;
  el.measureValue.textContent = `${next}°`;
  el.measureKnob.setAttribute("aria-valuenow", String(next));
  state.measurementCorrect = false;
  state.designMeasurementCorrect = false;

  if (state.mode === "compare") {
    el.measurementFeedback.hidden = true;
    el.classificationArea.hidden = true;
    el.classificationFeedback.hidden = true;
    el.compareNote.hidden = true;
  } else {
    el.designFeedback.hidden = true;
    el.designNote.hidden = true;
  }
  drawMeasureTool();
}

function currentTargetAngle() {
  return state.mode === "compare" ? rampAngles[state.selectedRamp] : state.designAngle;
}

function drawCurrentRamp() {
  const angle = currentTargetAngle();
  const height = state.mode === "compare" ? 0.60 : state.height;
  const run = height / Math.tan(angle * Math.PI / 180);
  drawRampForAngle(angle, height, run);
}

function drawRampForAngle(angle, heightMeters, runMeters) {
  const startX = 126;
  const groundY = 340;
  const maxRunPx = 470;
  const maxHeightPx = 165;
  const heightPx = Math.min(maxHeightPx, 88 + heightMeters * 62);
  const endY = groundY - heightPx;
  const scale = Math.min(maxRunPx / runMeters, 560 / Math.max(runMeters, 1));
  const runPx = Math.min(maxRunPx, Math.max(170, runMeters * scale));
  const endX = startX + runPx;
  const railOffset = 26;

  el.rampLine.setAttribute("x1", startX); el.rampLine.setAttribute("y1", groundY);
  el.rampLine.setAttribute("x2", endX); el.rampLine.setAttribute("y2", endY);
  el.rampRail.setAttribute("x1", startX); el.rampRail.setAttribute("y1", groundY - railOffset);
  el.rampRail.setAttribute("x2", endX); el.rampRail.setAttribute("y2", endY - railOffset);
  el.railStart.setAttribute("x1", startX); el.railStart.setAttribute("y1", groundY - railOffset);
  el.railStart.setAttribute("x2", startX); el.railStart.setAttribute("y2", groundY);
  el.railEnd.setAttribute("x1", endX); el.railEnd.setAttribute("y1", endY - railOffset);
  el.railEnd.setAttribute("x2", endX); el.railEnd.setAttribute("y2", endY);
  el.platformLine.setAttribute("x1", endX); el.platformLine.setAttribute("y1", endY);
  el.platformLine.setAttribute("x2", 705); el.platformLine.setAttribute("y2", endY);
  el.heightGuide.setAttribute("x1", endX); el.heightGuide.setAttribute("y1", endY);
  el.heightGuide.setAttribute("x2", endX); el.heightGuide.setAttribute("y2", groundY);
  el.runGuide.setAttribute("x1", startX); el.runGuide.setAttribute("y1", groundY);
  el.runGuide.setAttribute("x2", endX); el.runGuide.setAttribute("y2", groundY);
  el.heightText.setAttribute("x", endX + 18); el.heightText.setAttribute("y", (groundY + endY) / 2);
  el.runText.setAttribute("x", (startX + endX) / 2); el.runText.setAttribute("y", groundY + 28);

  if (state.mode === "design") {
    el.heightText.textContent = `${heightMeters.toFixed(2)} m`;
    el.runText.textContent = `${runMeters.toFixed(2)} m`;
  } else {
    el.heightText.textContent = "h";
    el.runText.textContent = "d";
  }

  positionMeasureOrigin(startX, groundY);
}

function positionMeasureOrigin(x, y) {
  el.measureRay.setAttribute("x1", x);
  el.measureRay.setAttribute("y1", y);
  el.measureKnob.dataset.originX = x;
  el.measureKnob.dataset.originY = y;
  drawProtractorTicks(x, y);
}

function drawMeasureTool() {
  const ox = Number(el.measureKnob.dataset.originX || 126);
  const oy = Number(el.measureKnob.dataset.originY || 340);
  const len = 145;
  const rad = state.measurement * Math.PI / 180;
  const x2 = ox + len * Math.cos(rad);
  const y2 = oy - len * Math.sin(rad);
  el.measureRay.setAttribute("x2", x2.toFixed(2));
  el.measureRay.setAttribute("y2", y2.toFixed(2));
  el.measureKnob.setAttribute("cx", x2.toFixed(2));
  el.measureKnob.setAttribute("cy", y2.toFixed(2));
  el.protractorArc.setAttribute("d", `M ${ox + 120} ${oy} A 120 120 0 0 0 ${(ox + 120 * Math.cos(Math.PI/4)).toFixed(2)} ${(oy - 120 * Math.sin(Math.PI/4)).toFixed(2)}`);
  el.measureValue.textContent = `${state.measurement}°`;
}

function drawProtractorTicks(ox, oy) {
  el.tickGroup.innerHTML = "";
  for (let deg = 0; deg <= 45; deg += 5) {
    const rad = deg * Math.PI / 180;
    const inner = deg % 10 === 0 ? 105 : 111;
    const outer = 120;
    const x1 = ox + inner * Math.cos(rad), y1 = oy - inner * Math.sin(rad);
    const x2 = ox + outer * Math.cos(rad), y2 = oy - outer * Math.sin(rad);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    line.setAttribute("class", `tick-line ${deg % 10 === 0 ? "major" : ""}`);
    el.tickGroup.appendChild(line);
    if (deg % 10 === 0) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", ox + 92 * Math.cos(rad));
      text.setAttribute("y", oy - 92 * Math.sin(rad) + 4);
      text.setAttribute("class", "tick-label");
      text.setAttribute("text-anchor", "middle");
      text.textContent = deg;
      el.tickGroup.appendChild(text);
    }
  }
}

function checkCompareMeasurement() {
  const correct = state.measurement === rampAngles[state.selectedRamp];
  state.measurementCorrect = correct;
  showFeedback(el.measurementFeedback, correct ? t("correctMeasurement") : t("incorrectMeasurement"), correct ? "correct" : "incorrect");
  el.classificationArea.hidden = !correct;
  if (!correct) {
    el.classificationFeedback.hidden = true;
    el.compareNote.hidden = true;
  }
}

function checkClassification() {
  const selected = document.querySelector('input[name="classification"]:checked');
  if (!selected) {
    showFeedback(el.classificationFeedback, t("selectClassification"), "warning");
    return;
  }
  const correct = selected.value === "acute";
  showFeedback(el.classificationFeedback, correct ? t("correctClassification") : t("incorrectClassification"), correct ? "correct" : "incorrect");
  el.compareNote.hidden = !correct;
}

function selectRamp(ramp) {
  state.selectedRamp = ramp;
  state.measurement = 0;
  state.measurementCorrect = false;
  document.querySelectorAll(".ramp-choice").forEach(button => button.classList.toggle("is-active", button.dataset.ramp === ramp));
  document.querySelectorAll('input[name="classification"]').forEach(input => input.checked = false);
  el.kicker.textContent = t("compareKicker")(ramp);
  clearCompareFeedback();
  drawCurrentRamp();
  drawMeasureTool();
}

function clearCompareFeedback() {
  el.measurementFeedback.hidden = true;
  el.classificationArea.hidden = true;
  el.classificationFeedback.hidden = true;
  el.compareNote.hidden = true;
}

function designAngles() { return [5, 10, 15, 20, 25]; }

function renderSpaceButtons() {
  const values = designAngles().map(angle => ({ angle, run: state.height / Math.tan(angle * Math.PI / 180) }));
  if (!values.some(item => item.angle === state.designAngle)) state.designAngle = 5;
  el.spaceButtons.innerHTML = values.map(item => `<button type="button" class="space-button ${item.angle === state.designAngle ? "is-active" : ""}" data-angle="${item.angle}">${item.run.toFixed(2)} m</button>`).join("");
  el.spaceButtons.querySelectorAll(".space-button").forEach(button => button.addEventListener("click", () => {
    state.designAngle = Number(button.dataset.angle);
    state.measurement = 0;
    state.designMeasurementCorrect = false;
    el.designFeedback.hidden = true;
    el.designNote.hidden = true;
    renderSpaceButtons();
    drawCurrentRamp();
    drawMeasureTool();
  }));
}

function checkDesignMeasurement() {
  const correct = state.measurement === state.designAngle;
  state.designMeasurementCorrect = correct;
  showFeedback(el.designFeedback, correct ? t("designCorrect") : t("incorrectMeasurement"), correct ? "correct" : "incorrect");
  el.designNote.hidden = !correct;
}

function showFeedback(node, message, type) {
  node.className = `feedback is-${type}`;
  node.textContent = message;
  node.hidden = false;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const value = translations[state.language][node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });
  if (state.mode === "compare") {
    el.kicker.textContent = t("compareKicker")(state.selectedRamp);
    el.contextTitle.textContent = t("compareContextTitle");
  } else {
    el.kicker.textContent = t("designKicker");
    el.contextTitle.textContent = t("designContextTitle");
  }
}

function pointFromEvent(event) {
  const rect = el.svg.getBoundingClientRect();
  return { x: (event.clientX - rect.left) * (760 / rect.width), y: (event.clientY - rect.top) * (430 / rect.height) };
}

function measurementFromPoint(point) {
  const ox = Number(el.measureKnob.dataset.originX || 126), oy = Number(el.measureKnob.dataset.originY || 340);
  const dx = point.x - ox, dy = oy - point.y;
  let deg = Math.atan2(dy, dx) * 180 / Math.PI;
  if (deg < 0) deg = 0;
  if (deg > MAX_MEASURE) deg = MAX_MEASURE;
  return Math.round(deg / STEP) * STEP;
}

el.svg.addEventListener("pointerdown", event => {
  state.dragging = true;
  el.measureKnob.classList.add("is-dragging");
  el.svg.setPointerCapture(event.pointerId);
  setMeasurement(measurementFromPoint(pointFromEvent(event)));
});

el.svg.addEventListener("pointermove", event => {
  if (!state.dragging) return;
  setMeasurement(measurementFromPoint(pointFromEvent(event)));
});

el.svg.addEventListener("pointerup", event => {
  state.dragging = false;
  el.measureKnob.classList.remove("is-dragging");
  if (el.svg.hasPointerCapture(event.pointerId)) el.svg.releasePointerCapture(event.pointerId);
});

el.svg.addEventListener("pointercancel", () => {
  state.dragging = false;
  el.measureKnob.classList.remove("is-dragging");
});

el.measureKnob.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") { event.preventDefault(); setMeasurement(state.measurement + STEP); }
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") { event.preventDefault(); setMeasurement(state.measurement - STEP); }
});

document.getElementById("measure-minus").addEventListener("click", () => setMeasurement(state.measurement - STEP));
document.getElementById("measure-plus").addEventListener("click", () => setMeasurement(state.measurement + STEP));
Object.entries(modeButtons).forEach(([mode, button]) => button.addEventListener("click", () => setMode(mode)));
document.querySelectorAll(".ramp-choice").forEach(button => button.addEventListener("click", () => selectRamp(button.dataset.ramp)));
document.getElementById("check-measurement").addEventListener("click", checkCompareMeasurement);
document.getElementById("check-classification").addEventListener("click", checkClassification);
document.getElementById("check-design-measurement").addEventListener("click", checkDesignMeasurement);

el.heightSelect.addEventListener("change", event => {
  state.height = Number(event.target.value);
  state.measurement = 0;
  state.designMeasurementCorrect = false;
  el.designFeedback.hidden = true;
  el.designNote.hidden = true;
  renderSpaceButtons();
  drawCurrentRamp();
  drawMeasureTool();
});

el.language.addEventListener("change", event => {
  state.language = event.target.value;
  applyLanguage();
});

document.getElementById("new-task").addEventListener("click", () => {
  if (state.mode === "compare") {
    const ramps = ["A", "B", "C"];
    selectRamp(ramps[(ramps.indexOf(state.selectedRamp) + 1) % ramps.length]);
  } else {
    const pool = designAngles();
    const i = pool.indexOf(state.designAngle);
    state.designAngle = pool[(i + 1) % pool.length];
    state.measurement = 0;
    state.designMeasurementCorrect = false;
    renderSpaceButtons();
    el.designFeedback.hidden = true;
    el.designNote.hidden = true;
    drawCurrentRamp();
    drawMeasureTool();
  }
});

el.language.value = state.language;
el.heightSelect.value = state.height.toFixed(2);
applyLanguage();
renderSpaceButtons();
setMode("compare");
