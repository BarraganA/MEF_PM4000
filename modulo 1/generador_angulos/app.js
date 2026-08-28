const translations = {
  es: {
    appTitle: "Clasificación y relaciones de ángulos",
    languageLabel: "Idioma",
    classificationMode: "Clasificación",
    relationsMode: "Relaciones",
    classificationTitle: "Clasifica el ángulo",
    classificationInstruction: "Observa el ángulo, selecciona su clasificación y comprueba tu respuesta.",
    relationsTitle: "Relaciones entre ángulos",
    relationsInstruction: "Encuentra el ángulo que completa la relación indicada.",
    newExercise: "Nuevo ejercicio",
    chooseClassification: "Selecciona una clasificación:",
    checkAnswer: "Comprobar",
    relationTypeLabel: "Tipo de relación",
    complementary: "Complementarios",
    supplementary: "Suplementarios",
    conjugate: "Conjugados",
    yourAnswer: "Tu respuesta",
    footerText: "Recurso interactivo de práctica",
    acute: "Agudo",
    right: "Recto",
    obtuse: "Obtuso",
    straight: "Llano",
    reflex: "Entrante",
    full: "Perigonal",
    selectOption: "Selecciona una opción antes de comprobar.",
    correct: "Correcto",
    incorrect: "Incorrecto",
    classificationCorrect: (angle, label) => `${angle}° es un ángulo ${label.toLowerCase()}.`,
    classificationIncorrect: (angle, label) => `Revisa los límites de cada clasificación. ${angle}° corresponde a un ángulo ${label.toLowerCase()}.`,
    complementaryPrompt: angle => `¿Cuál es el complemento de ${angle}°?`,
    supplementaryPrompt: angle => `¿Cuál es el suplemento de ${angle}°?`,
    conjugatePrompt: angle => `¿Cuál es el conjugado de ${angle}°?`,
    relationCorrect: (target, total, given) => `La respuesta es ${target}°, porque ${given}° + ${target}° = ${total}°.` ,
    relationIncorrect: (target, total, given) => `La respuesta correcta es ${target}°. Se debe cumplir ${given}° + β = ${total}°.` ,
    enterNumber: "Escribe una respuesta numérica antes de comprobar.",
    svgAngleTitle: "Ángulo generado",
    svgAngleDesc: "Representación gráfica del ángulo generado.",
    svgRelationTitle: "Ángulo de referencia",
    svgRelationDesc: "Representación gráfica del ángulo dado para completar la relación."
  },
  en: {
    appTitle: "Angle classification and relationships",
    languageLabel: "Language",
    classificationMode: "Classification",
    relationsMode: "Relationships",
    classificationTitle: "Classify the angle",
    classificationInstruction: "Observe the angle, select its classification, and check your answer.",
    relationsTitle: "Angle relationships",
    relationsInstruction: "Find the angle that completes the indicated relationship.",
    newExercise: "New exercise",
    chooseClassification: "Select a classification:",
    checkAnswer: "Check",
    relationTypeLabel: "Relationship type",
    complementary: "Complementary",
    supplementary: "Supplementary",
    conjugate: "Conjugate",
    yourAnswer: "Your answer",
    footerText: "Interactive practice resource",
    acute: "Acute",
    right: "Right",
    obtuse: "Obtuse",
    straight: "Straight",
    reflex: "Reflex",
    full: "Full",
    selectOption: "Select an option before checking.",
    correct: "Correct",
    incorrect: "Incorrect",
    classificationCorrect: (angle, label) => `${angle}° is a ${label.toLowerCase()} angle.`,
    classificationIncorrect: (angle, label) => `Review the limits for each classification. ${angle}° is a ${label.toLowerCase()} angle.`,
    complementaryPrompt: angle => `What is the complement of ${angle}°?`,
    supplementaryPrompt: angle => `What is the supplement of ${angle}°?`,
    conjugatePrompt: angle => `What is the conjugate angle of ${angle}°?`,
    relationCorrect: (target, total, given) => `The answer is ${target}°, because ${given}° + ${target}° = ${total}°.` ,
    relationIncorrect: (target, total, given) => `The correct answer is ${target}°. It must satisfy ${given}° + β = ${total}°.` ,
    enterNumber: "Enter a numerical answer before checking.",
    svgAngleTitle: "Generated angle",
    svgAngleDesc: "Graphical representation of the generated angle.",
    svgRelationTitle: "Reference angle",
    svgRelationDesc: "Graphical representation of the given angle used in the relationship."
  }
};

const classificationRules = {
  acute: { min: 1, max: 89 },
  right: { exact: 90 },
  obtuse: { min: 91, max: 179 },
  straight: { exact: 180 },
  reflex: { min: 181, max: 359 },
  full: { exact: 360 }
};

const relationRules = {
  complementary: { total: 90, min: 1, max: 89 },
  supplementary: { total: 180, min: 1, max: 179 },
  conjugate: { total: 360, min: 1, max: 359 }
};

const state = {
  language: "es",
  mode: "classification",
  classification: {
    angle: 45,
    category: "acute",
    selected: null
  },
  relation: {
    type: "complementary",
    given: 35,
    target: 55
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const elements = {
  languageSelect: document.getElementById("language-select"),
  modeClassification: document.getElementById("mode-classification"),
  modeRelations: document.getElementById("mode-relations"),
  classificationPanel: document.getElementById("classification-panel"),
  relationsPanel: document.getElementById("relations-panel"),
  newClassification: document.getElementById("new-classification"),
  newRelation: document.getElementById("new-relation"),
  angleMeasure: document.getElementById("angle-measure"),
  movingRay: document.getElementById("moving-ray"),
  angleArc: document.getElementById("angle-arc"),
  fullAngleCircle: document.getElementById("full-angle-circle"),
  classificationOptions: document.getElementById("classification-options"),
  checkClassification: document.getElementById("check-classification"),
  classificationFeedback: document.getElementById("classification-feedback"),
  relationType: document.getElementById("relation-type"),
  relationAngleMeasure: document.getElementById("relation-angle-measure"),
  relationMovingRay: document.getElementById("relation-moving-ray"),
  relationAngleArc: document.getElementById("relation-angle-arc"),
  relationPrompt: document.getElementById("relation-prompt"),
  relationAnswer: document.getElementById("relation-answer"),
  checkRelation: document.getElementById("check-relation"),
  relationFeedback: document.getElementById("relation-feedback"),
  angleSvgTitle: document.getElementById("angle-svg-title"),
  angleSvgDesc: document.getElementById("angle-svg-desc"),
  relationSvgTitle: document.getElementById("relation-svg-title"),
  relationSvgDesc: document.getElementById("relation-svg-desc")
};

function t(key) {
  return translations[state.language][key];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateClassificationExercise() {
  const category = chooseRandom(Object.keys(classificationRules));
  const rule = classificationRules[category];
  const angle = Object.prototype.hasOwnProperty.call(rule, "exact")
    ? rule.exact
    : randomInt(rule.min, rule.max);

  state.classification = { angle, category, selected: null };
  elements.angleMeasure.textContent = `θ = ${angle}°`;
  elements.classificationFeedback.hidden = true;
  renderClassificationOptions();
  animateSvgAngle(angle, elements.movingRay, elements.angleArc, elements.fullAngleCircle);
}

function renderClassificationOptions() {
  const categories = Object.keys(classificationRules);
  elements.classificationOptions.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(state.classification.selected === category));
    button.textContent = t(category);

    if (state.classification.selected === category) {
      button.classList.add("is-selected");
    }

    button.addEventListener("click", () => {
      state.classification.selected = category;
      renderClassificationOptions();
      elements.classificationFeedback.hidden = true;
    });

    elements.classificationOptions.appendChild(button);
  });
}

function checkClassificationAnswer() {
  const selected = state.classification.selected;

  if (!selected) {
    showFeedback(elements.classificationFeedback, t("selectOption"), false, false);
    return;
  }

  const correctCategory = state.classification.category;
  const isCorrect = selected === correctCategory;
  const label = t(correctCategory);
  const body = isCorrect
    ? t("classificationCorrect")(state.classification.angle, label)
    : t("classificationIncorrect")(state.classification.angle, label);

  showFeedback(elements.classificationFeedback, body, true, isCorrect);
}

function generateRelationExercise() {
  const type = elements.relationType.value;
  const rule = relationRules[type];
  const given = randomInt(rule.min, rule.max);
  const target = rule.total - given;

  state.relation = { type, given, target };
  elements.relationAngleMeasure.textContent = `α = ${given}°`;
  elements.relationAnswer.value = "";
  elements.relationFeedback.hidden = true;
  elements.relationPrompt.textContent = buildRelationPrompt(type, given);
  animateSvgAngle(given, elements.relationMovingRay, elements.relationAngleArc, null);
}

function buildRelationPrompt(type, angle) {
  const keyMap = {
    complementary: "complementaryPrompt",
    supplementary: "supplementaryPrompt",
    conjugate: "conjugatePrompt"
  };

  return t(keyMap[type])(angle);
}

function checkRelationAnswer() {
  const raw = elements.relationAnswer.value.trim();

  if (raw === "") {
    showFeedback(elements.relationFeedback, t("enterNumber"), false, false);
    return;
  }

  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) {
    showFeedback(elements.relationFeedback, t("enterNumber"), false, false);
    return;
  }

  const rule = relationRules[state.relation.type];
  const isCorrect = numeric === state.relation.target;
  const body = isCorrect
    ? t("relationCorrect")(state.relation.target, rule.total, state.relation.given)
    : t("relationIncorrect")(state.relation.target, rule.total, state.relation.given);

  showFeedback(elements.relationFeedback, body, true, isCorrect);
}

function showFeedback(container, body, includeStatus, isCorrect) {
  const prefix = includeStatus
    ? `<strong>${isCorrect ? t("correct") : t("incorrect")}.</strong> `
    : "";

  container.innerHTML = `${prefix}${body}`;
  container.hidden = false;
}

function setMode(mode) {
  state.mode = mode;
  const classificationActive = mode === "classification";

  elements.classificationPanel.hidden = !classificationActive;
  elements.relationsPanel.hidden = classificationActive;

  elements.modeClassification.classList.toggle("is-active", classificationActive);
  elements.modeRelations.classList.toggle("is-active", !classificationActive);
  elements.modeClassification.setAttribute("aria-pressed", String(classificationActive));
  elements.modeRelations.setAttribute("aria-pressed", String(!classificationActive));
}

function applyLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    const value = translations[state.language][key];
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  elements.angleSvgTitle.textContent = t("svgAngleTitle");
  elements.angleSvgDesc.textContent = t("svgAngleDesc");
  elements.relationSvgTitle.textContent = t("svgRelationTitle");
  elements.relationSvgDesc.textContent = t("svgRelationDesc");

  renderClassificationOptions();
  elements.relationPrompt.textContent = buildRelationPrompt(state.relation.type, state.relation.given);
  elements.classificationFeedback.hidden = true;
  elements.relationFeedback.hidden = true;
}

function animateSvgAngle(targetAngle, movingRay, arcPath, fullCircle) {
  const duration = prefersReducedMotion.matches ? 0 : 520;
  const startTime = performance.now();

  if (fullCircle) {
    fullCircle.hidden = true;
  }

  function frame(now) {
    const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentAngle = targetAngle * eased;

    drawSvgAngle(currentAngle, movingRay, arcPath, fullCircle, targetAngle === 360 && progress === 1);

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function drawSvgAngle(angle, movingRay, arcPath, fullCircle, forceFullCircle = false) {
  const cx = 210;
  const cy = 165;
  const rayLength = 125;
  const arcRadius = 58;
  const normalized = Math.max(0, Math.min(angle, 360));
  const radians = normalized * Math.PI / 180;

  const x2 = cx + rayLength * Math.cos(radians);
  const y2 = cy - rayLength * Math.sin(radians);
  movingRay.setAttribute("x2", x2.toFixed(2));
  movingRay.setAttribute("y2", y2.toFixed(2));

  if (forceFullCircle && fullCircle) {
    arcPath.setAttribute("d", "");
    fullCircle.hidden = false;
    return;
  }

  if (fullCircle) {
    fullCircle.hidden = true;
  }

  if (normalized <= 0.01) {
    arcPath.setAttribute("d", "");
    return;
  }

  const startX = cx + arcRadius;
  const startY = cy;
  const endX = cx + arcRadius * Math.cos(radians);
  const endY = cy - arcRadius * Math.sin(radians);
  const largeArcFlag = normalized > 180 ? 1 : 0;

  const path = [
    "M", startX.toFixed(2), startY.toFixed(2),
    "A", arcRadius, arcRadius, 0, largeArcFlag, 0, endX.toFixed(2), endY.toFixed(2)
  ].join(" ");

  arcPath.setAttribute("d", path);
}

function initialize() {
  elements.languageSelect.value = state.language;
  elements.relationType.value = state.relation.type;
  applyLanguage();
  setMode("classification");
  generateClassificationExercise();
  generateRelationExercise();

  elements.languageSelect.addEventListener("change", event => {
    state.language = event.target.value;
    applyLanguage();
  });

  elements.modeClassification.addEventListener("click", () => setMode("classification"));
  elements.modeRelations.addEventListener("click", () => setMode("relations"));
  elements.newClassification.addEventListener("click", generateClassificationExercise);
  elements.checkClassification.addEventListener("click", checkClassificationAnswer);
  elements.newRelation.addEventListener("click", generateRelationExercise);
  elements.checkRelation.addEventListener("click", checkRelationAnswer);

  elements.relationType.addEventListener("change", event => {
    state.relation.type = event.target.value;
    generateRelationExercise();
  });

  elements.relationAnswer.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      checkRelationAnswer();
    }
  });
}

initialize();
