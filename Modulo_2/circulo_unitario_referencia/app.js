const STEP = 5;
const CX = 310;
const CY = 310;
const R = 250;

const notableAngles = [
  0, 30, 45, 60, 90,
  120, 135, 150, 180,
  210, 225, 240, 270,
  300, 315, 330, 360
];

const practiceAngles = [
  20, 25, 35, 40, 50, 55, 65, 70,
  110, 115, 125, 130, 140, 145, 155, 160,
  200, 205, 215, 220, 230, 235, 245, 250,
  290, 295, 305, 310, 320, 325, 335, 340
];

const translations = {
  es: {
    appTitle: "Explora el círculo unitario",
    appSubtitle: "Relaciona el ángulo, su posición, el ángulo de referencia y las coordenadas del punto terminal.",
    languageLabel: "Idioma",
    modeExplore: "Explorar",
    modePractice: "Practicar",
    exploreKicker: "Exploración",
    exploreTitle: "Mueve el punto sobre el círculo",
    practiceKicker: "Práctica",
    practiceContextTitle: "Analiza el ángulo mostrado",
    newTask: "Nuevo ejercicio",
    explorePanelTitle: "Observa qué cambia",
    exploreIntro: "Arrastra el punto sobre la circunferencia o utiliza los botones para cambiar el ángulo.",
    snapNotable: "Ajustar a ángulos notables",
    angleTheta: "Ángulo θ",
    angleRadians: "En radianes",
    quadrant: "Cuadrante",
    referenceAngle: "Ángulo de referencia",
    quadrantal: "Ángulo cuadrantal",
    showTrig: "Mostrar razones trigonométricas",
    hideTrig: "Ocultar razones trigonométricas",
    trigIntro: "En el círculo unitario, el radio vale 1. Por eso las coordenadas del punto terminal coinciden con coseno y seno.",
    signNote: (sinSign, cosSign, tanSign) => `Signos: sen ${sinSign}, cos ${cosSign}, tan ${tanSign}.`,
    practiceTitle: "Analiza el ángulo",
    practiceIntro: "Para el ángulo mostrado, identifica el cuadrante, el ángulo de referencia y los signos de seno, coseno y tangente.",
    quadrantQuestion: "¿En qué cuadrante está?",
    referenceQuestion: "¿Cuál es su ángulo de referencia?",
    signQuestion: "Indica el signo de cada razón:",
    checkAnswer: "Comprobar",
    practiceMissing: "Completa el cuadrante, el ángulo de referencia y los tres signos.",
    practiceCorrect: "Correcto. El ángulo de referencia indica la magnitud; el cuadrante determina los signos.",
    practiceIncorrect: "Revisa la posición del lado terminal. El ángulo de referencia siempre es agudo y se mide respecto al eje x más cercano.",
    footerText: "Recurso interactivo de práctica"
  },

  en: {
    appTitle: "Explore the unit circle",
    appSubtitle: "Connect the angle, its position, the reference angle, and the coordinates of the terminal point.",
    languageLabel: "Language",
    modeExplore: "Explore",
    modePractice: "Practice",
    exploreKicker: "Exploration",
    exploreTitle: "Move the point around the circle",
    practiceKicker: "Practice",
    practiceContextTitle: "Analyze the displayed angle",
    newTask: "New task",
    explorePanelTitle: "Observe what changes",
    exploreIntro: "Drag the point around the circumference or use the buttons to change the angle.",
    snapNotable: "Snap to notable angles",
    angleTheta: "Angle θ",
    angleRadians: "In radians",
    quadrant: "Quadrant",
    referenceAngle: "Reference angle",
    quadrantal: "Quadrantal angle",
    showTrig: "Show trigonometric ratios",
    hideTrig: "Hide trigonometric ratios",
    trigIntro: "On the unit circle, the radius is 1. Therefore, the coordinates of the terminal point match cosine and sine.",
    signNote: (sinSign, cosSign, tanSign) => `Signs: sin ${sinSign}, cos ${cosSign}, tan ${tanSign}.`,
    practiceTitle: "Analyze the angle",
    practiceIntro: "For the displayed angle, identify the quadrant, the reference angle, and the signs of sine, cosine, and tangent.",
    quadrantQuestion: "Which quadrant is it in?",
    referenceQuestion: "What is its reference angle?",
    signQuestion: "Choose the sign of each ratio:",
    checkAnswer: "Check",
    practiceMissing: "Complete the quadrant, reference angle, and all three signs.",
    practiceCorrect: "Correct. The reference angle determines the magnitude; the quadrant determines the signs.",
    practiceIncorrect: "Review the terminal side position. The reference angle is always acute and is measured from the nearest x-axis.",
    footerText: "Interactive practice resource"
  }
};

const state = {
  language: "es",
  mode: "explore",
  angle: 40,
  dragging: false,
  showTrig: false,
  practiceAngle: 140
};

const el = {
  language: document.getElementById("language-select"),

  kicker: document.getElementById("context-kicker"),
  contextTitle: document.getElementById("context-title"),
  newTask: document.getElementById("new-task"),

  svg: document.getElementById("unit-circle-svg"),
  point: document.getElementById("terminal-point"),
  pointLabel: document.getElementById("point-label"),
  radiusLine: document.getElementById("radius-line"),
  horizontalLeg: document.getElementById("horizontal-leg"),
  verticalLeg: document.getElementById("vertical-leg"),
  thetaArc: document.getElementById("theta-arc"),
  referenceArc: document.getElementById("reference-arc"),
  thetaLabel: document.getElementById("theta-label"),
  alphaLabel: document.getElementById("alpha-label"),

  angleValue: document.getElementById("angle-value"),
  angleControls: document.getElementById("angle-controls"),

  explorePanel: document.getElementById("explore-panel"),
  practicePanel: document.getElementById("practice-panel"),

  snapNotable: document.getElementById("snap-notable"),

  thetaDisplay: document.getElementById("theta-display"),
  radianDisplay: document.getElementById("radian-display"),
  quadrantDisplay: document.getElementById("quadrant-display"),
  referenceDisplay: document.getElementById("reference-display"),
  coordinateDisplay: document.getElementById("coordinate-display"),

  toggleTrig: document.getElementById("toggle-trig"),
  trigPanel: document.getElementById("trig-panel"),
  cosDisplay: document.getElementById("cos-display"),
  sinDisplay: document.getElementById("sin-display"),
  tanDisplay: document.getElementById("tan-display"),
  signNote: document.getElementById("sign-note"),

  practiceAngle: document.getElementById("practice-angle"),
  quadrantAnswer: document.getElementById("quadrant-answer"),
  referenceAnswer: document.getElementById("reference-answer"),
  practiceFeedback: document.getElementById("practice-feedback")
};

const modeButtons = {
  explore: document.getElementById("mode-explore"),
  practice: document.getElementById("mode-practice")
};

function t(key) {
  return translations[state.language][key];
}

function normalizeAngle(angle) {
  let result = angle % 360;
  if (result < 0) result += 360;
  if (Math.abs(result) < 1e-9 && angle > 0) return 360;
  return result;
}

function canonicalAngle(angle) {
  const n = normalizeAngle(angle);
  return n === 360 ? 0 : n;
}

function setMode(mode) {
  state.mode = mode;

  Object.entries(modeButtons).forEach(([key, button]) => {
    const active = key === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  el.explorePanel.hidden = mode !== "explore";
  el.practicePanel.hidden = mode !== "practice";
  el.angleControls.hidden = mode !== "explore";
  el.newTask.hidden = mode !== "practice";

  if (mode === "explore") {
    el.kicker.textContent = t("exploreKicker");
    el.contextTitle.textContent = t("exploreTitle");
    drawAngle(state.angle);
  } else {
    el.kicker.textContent = t("practiceKicker");
    el.contextTitle.textContent = t("practiceContextTitle");
    generatePractice();
  }
}

function setAngle(angle) {
  let next;

  if (el.snapNotable.checked) {
    next = nearestNotable(angle);
  } else {
    next = Math.round(angle / STEP) * STEP;
  }

  next = Math.max(0, Math.min(360, next));

  state.angle = next;
  drawAngle(state.angle);
}

function drawAngle(angle) {
  const displayAngle = normalizeAngle(angle);
  const a = canonicalAngle(angle);
  const rad = a * Math.PI / 180;

  const x = Math.cos(rad);
  const y = Math.sin(rad);

  const px = CX + R * x;
  const py = CY - R * y;

  el.point.setAttribute("cx", px.toFixed(2));
  el.point.setAttribute("cy", py.toFixed(2));
  el.point.setAttribute("aria-valuenow", String(displayAngle));

  el.radiusLine.setAttribute("x2", px.toFixed(2));
  el.radiusLine.setAttribute("y2", py.toFixed(2));

  el.horizontalLeg.setAttribute("x1", CX);
  el.horizontalLeg.setAttribute("y1", py.toFixed(2));
  el.horizontalLeg.setAttribute("x2", px.toFixed(2));
  el.horizontalLeg.setAttribute("y2", py.toFixed(2));

  el.verticalLeg.setAttribute("x1", px.toFixed(2));
  el.verticalLeg.setAttribute("y1", CY);
  el.verticalLeg.setAttribute("x2", px.toFixed(2));
  el.verticalLeg.setAttribute("y2", py.toFixed(2));

  drawThetaArc(a);
  drawReferenceArc(a, px, py);

  const pointOffsetX = x >= 0 ? 16 : -110;
  const pointOffsetY = y >= 0 ? -14 : 26;

  el.pointLabel.setAttribute("x", (px + pointOffsetX).toFixed(2));
  el.pointLabel.setAttribute("y", (py + pointOffsetY).toFixed(2));

  el.thetaDisplay.textContent = `${displayAngle}°`;
  el.angleValue.textContent = `${displayAngle}°`;

  const ref = referenceAngle(a);
  const quad = quadrant(a);

  el.quadrantDisplay.textContent = quad || t("quadrantal");
  el.referenceDisplay.textContent = ref === null ? t("quadrantal") : `${ref}°`;

  el.coordinateDisplay.textContent = formatCoordinates(a, x, y);
  el.pointLabel.textContent = `P${formatCoordinates(a, x, y)}`;

  el.radianDisplay.textContent = formatRadians(a);

  updateTrig(a, x, y);
  updateLabels(a, px, py, ref);
}

function drawThetaArc(angle) {
  if (angle === 0) {
    el.thetaArc.setAttribute("d", "");
    return;
  }

  const arcR = 58;
  const startX = CX + arcR;
  const startY = CY;

  const endRad = angle * Math.PI / 180;
  const endX = CX + arcR * Math.cos(endRad);
  const endY = CY - arcR * Math.sin(endRad);

  const largeArc = angle > 180 ? 1 : 0;

  el.thetaArc.setAttribute(
    "d",
    `M ${startX} ${startY} A ${arcR} ${arcR} 0 ${largeArc} 0 ${endX.toFixed(2)} ${endY.toFixed(2)}`
  );
}

function drawReferenceArc(angle, px, py) {
  const ref = referenceAngle(angle);

  if (ref === null) {
    el.referenceArc.setAttribute("d", "");
    el.alphaLabel.textContent = "";
    return;
  }

  const arcR = 42;
  let startDeg;
  let endDeg;

  if (angle > 0 && angle < 90) {
    startDeg = 0;
    endDeg = angle;
  } else if (angle > 90 && angle < 180) {
    startDeg = 180 - ref;
    endDeg = 180;
  } else if (angle > 180 && angle < 270) {
    startDeg = 180;
    endDeg = 180 + ref;
  } else {
    startDeg = 360 - ref;
    endDeg = 360;
  }

  const startRad = startDeg * Math.PI / 180;
  const endRad = endDeg * Math.PI / 180;

  const sx = CX + arcR * Math.cos(startRad);
  const sy = CY - arcR * Math.sin(startRad);
  const ex = CX + arcR * Math.cos(endRad);
  const ey = CY - arcR * Math.sin(endRad);

  const sweep = startDeg < endDeg ? 0 : 1;

  el.referenceArc.setAttribute(
    "d",
    `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${arcR} ${arcR} 0 0 ${sweep} ${ex.toFixed(2)} ${ey.toFixed(2)}`
  );

  el.alphaLabel.textContent = "α";

  const midDeg = (startDeg + endDeg) / 2;
  const midRad = midDeg * Math.PI / 180;

  el.alphaLabel.setAttribute("x", (CX + 65 * Math.cos(midRad)).toFixed(2));
  el.alphaLabel.setAttribute("y", (CY - 65 * Math.sin(midRad)).toFixed(2));
}

function updateLabels(angle, px, py, ref) {
  const midAngle = Math.min(angle / 2, 150);
  const thetaRad = midAngle * Math.PI / 180;

  el.thetaLabel.setAttribute("x", (CX + 78 * Math.cos(thetaRad)).toFixed(2));
  el.thetaLabel.setAttribute("y", (CY - 78 * Math.sin(thetaRad)).toFixed(2));

  if (angle === 0) {
    el.thetaLabel.setAttribute("x", CX + 72);
    el.thetaLabel.setAttribute("y", CY - 12);
  }
}

function quadrant(angle) {
  if (angle > 0 && angle < 90) return "I";
  if (angle > 90 && angle < 180) return "II";
  if (angle > 180 && angle < 270) return "III";
  if (angle > 270 && angle < 360) return "IV";
  return null;
}

function referenceAngle(angle) {
  if (angle % 90 === 0) return null;

  if (angle > 0 && angle < 90) return angle;
  if (angle > 90 && angle < 180) return 180 - angle;
  if (angle > 180 && angle < 270) return angle - 180;
  if (angle > 270 && angle < 360) return 360 - angle;

  return null;
}

function nearestNotable(angle) {
  let a = Math.max(0, Math.min(360, angle));
  return notableAngles.reduce((best, current) => {
    return Math.abs(current - a) < Math.abs(best - a) ? current : best;
  }, notableAngles[0]);
}

function formatCoordinates(angle, x, y) {
  const exact = exactCoordinates(angle);

  if (exact) {
    return `(${exact[0]}, ${exact[1]})`;
  }

  return `(${cleanNumber(x)}, ${cleanNumber(y)})`;
}

function exactCoordinates(angle) {
  const table = {
    0: ["1", "0"],
    30: ["√3/2", "1/2"],
    45: ["√2/2", "√2/2"],
    60: ["1/2", "√3/2"],
    90: ["0", "1"],
    120: ["−1/2", "√3/2"],
    135: ["−√2/2", "√2/2"],
    150: ["−√3/2", "1/2"],
    180: ["−1", "0"],
    210: ["−√3/2", "−1/2"],
    225: ["−√2/2", "−√2/2"],
    240: ["−1/2", "−√3/2"],
    270: ["0", "−1"],
    300: ["1/2", "−√3/2"],
    315: ["√2/2", "−√2/2"],
    330: ["√3/2", "−1/2"]
  };

  return table[angle] || null;
}

function formatRadians(angle) {
  if (angle === 0) return "0";

  const g = gcd(angle, 180);
  const n = angle / g;
  const d = 180 / g;

  if (d === 1) {
    return n === 1 ? "π" : `${n}π`;
  }

  return `${n === 1 ? "" : n}π/${d}`;
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

function cleanNumber(value) {
  if (Math.abs(value) < 0.0005) return "0";
  if (Math.abs(value - 1) < 0.0005) return "1";
  if (Math.abs(value + 1) < 0.0005) return "−1";

  return value
    .toFixed(3)
    .replace("-", "−");
}

function updateTrig(angle, x, y) {
  el.cosDisplay.textContent = `= ${exactTrigValue("cos", angle, x)}`;
  el.sinDisplay.textContent = `= ${exactTrigValue("sin", angle, y)}`;

  if (Math.abs(x) < 1e-10) {
    el.tanDisplay.textContent = state.language === "es" ? "= indefinida" : "= undefined";
  } else {
    const tan = y / x;
    el.tanDisplay.textContent = `= ${cleanNumber(tan)}`;
  }

  const signs = trigSigns(angle);

  if (signs.quadrantal) {
    el.signNote.textContent = state.language === "es"
      ? "Este es un ángulo cuadrantal; alguno de los valores puede ser 0 o estar indefinido."
      : "This is a quadrantal angle; one or more values may be 0 or undefined.";
  } else {
    el.signNote.textContent = t("signNote")(signs.sin, signs.cos, signs.tan);
  }
}

function exactTrigValue(kind, angle, numeric) {
  const coords = exactCoordinates(angle);

  if (coords) {
    return kind === "cos" ? coords[0] : coords[1];
  }

  if (angle === 0) {
    return kind === "cos" ? "1" : "0";
  }

  return cleanNumber(numeric);
}

function trigSigns(angle) {
  const q = quadrant(angle);

  if (!q) {
    return { quadrantal: true };
  }

  if (q === "I") return { sin: "+", cos: "+", tan: "+" };
  if (q === "II") return { sin: "+", cos: "−", tan: "−" };
  if (q === "III") return { sin: "−", cos: "−", tan: "+" };
  return { sin: "−", cos: "+", tan: "−" };
}

function pointFromEvent(event) {
  const rect = el.svg.getBoundingClientRect();

  return {
    x: (event.clientX - rect.left) * (620 / rect.width),
    y: (event.clientY - rect.top) * (620 / rect.height)
  };
}

function angleFromPoint(point) {
  const dx = point.x - CX;
  const dy = CY - point.y;

  let angle = Math.atan2(dy, dx) * 180 / Math.PI;

  if (angle < 0) angle += 360;

  return angle;
}

function toggleTrig() {
  state.showTrig = !state.showTrig;
  el.trigPanel.hidden = !state.showTrig;
  el.toggleTrig.textContent = state.showTrig ? t("hideTrig") : t("showTrig");
}

function generatePractice() {
  state.practiceAngle = practiceAngles[Math.floor(Math.random() * practiceAngles.length)];
  el.practiceAngle.textContent = `${state.practiceAngle}°`;

  el.quadrantAnswer.value = "";
  el.referenceAnswer.value = "";

  document.querySelectorAll('input[name="sin-sign"], input[name="cos-sign"], input[name="tan-sign"]')
    .forEach(input => input.checked = false);

  el.practiceFeedback.hidden = true;

  drawAngle(state.practiceAngle);
}

function checkPractice() {
  const q = el.quadrantAnswer.value;
  const refRaw = el.referenceAnswer.value.trim();

  const sinSign = document.querySelector('input[name="sin-sign"]:checked');
  const cosSign = document.querySelector('input[name="cos-sign"]:checked');
  const tanSign = document.querySelector('input[name="tan-sign"]:checked');

  if (!q || refRaw === "" || !sinSign || !cosSign || !tanSign) {
    showFeedback(el.practiceFeedback, t("practiceMissing"), "warning");
    return;
  }

  const correctQ = quadrant(state.practiceAngle);
  const correctRef = referenceAngle(state.practiceAngle);
  const correctSigns = trigSigns(state.practiceAngle);

  const correct =
    q === correctQ &&
    Number(refRaw) === correctRef &&
    sinSign.value === correctSigns.sin &&
    cosSign.value === correctSigns.cos &&
    tanSign.value === correctSigns.tan;

  showFeedback(
    el.practiceFeedback,
    correct ? t("practiceCorrect") : t("practiceIncorrect"),
    correct ? "correct" : "incorrect"
  );
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

    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  if (state.mode === "explore") {
    el.kicker.textContent = t("exploreKicker");
    el.contextTitle.textContent = t("exploreTitle");
  } else {
    el.kicker.textContent = t("practiceKicker");
    el.contextTitle.textContent = t("practiceContextTitle");
  }

  el.toggleTrig.textContent = state.showTrig ? t("hideTrig") : t("showTrig");

  drawAngle(state.mode === "practice" ? state.practiceAngle : state.angle);
}

el.svg.addEventListener("pointerdown", event => {
  if (state.mode !== "explore") return;

  state.dragging = true;
  el.point.classList.add("is-dragging");
  el.svg.setPointerCapture(event.pointerId);

  setAngle(angleFromPoint(pointFromEvent(event)));
});

el.svg.addEventListener("pointermove", event => {
  if (!state.dragging || state.mode !== "explore") return;

  setAngle(angleFromPoint(pointFromEvent(event)));
});

el.svg.addEventListener("pointerup", event => {
  state.dragging = false;
  el.point.classList.remove("is-dragging");

  if (el.svg.hasPointerCapture(event.pointerId)) {
    el.svg.releasePointerCapture(event.pointerId);
  }
});

el.svg.addEventListener("pointercancel", () => {
  state.dragging = false;
  el.point.classList.remove("is-dragging");
});

el.point.addEventListener("keydown", event => {
  if (state.mode !== "explore") return;

  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    setAngle(state.angle + STEP);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    setAngle(state.angle - STEP);
  }
});

document.getElementById("angle-minus").addEventListener("click", () => {
  setAngle(state.angle - STEP);
});

document.getElementById("angle-plus").addEventListener("click", () => {
  setAngle(state.angle + STEP);
});

Object.entries(modeButtons).forEach(([mode, button]) => {
  button.addEventListener("click", () => setMode(mode));
});

el.snapNotable.addEventListener("change", () => {
  setAngle(state.angle);
});

el.toggleTrig.addEventListener("click", toggleTrig);

document.getElementById("check-practice").addEventListener("click", checkPractice);

el.newTask.addEventListener("click", generatePractice);

el.language.addEventListener("change", event => {
  state.language = event.target.value;
  applyLanguage();
});

el.language.value = state.language;

applyLanguage();
setMode("explore");
