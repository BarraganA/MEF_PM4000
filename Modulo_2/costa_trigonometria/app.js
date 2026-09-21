(() => {
  const translations = {
    es: {
      pageTitle: "¿Cuánto puede retroceder una costa?",
      eyebrow: "Trigonometría aplicada",
      title: "¿Cuánto puede retroceder una costa?",
      subtitle: "Modifica el aumento del nivel del mar y la pendiente del terreno. Observa cómo un cambio vertical puede producir un desplazamiento horizontal mucho mayor.",
      modelTitle: "Modelo de una costa",
      scaleNote: "Visualización vertical amplificada para facilitar la observación.",
      svgTitle: "Simulación de una costa con aumento del nivel del mar",
      svgDesc: "Una sección lateral de una costa muestra el nivel original del mar, el nuevo nivel, el aumento vertical h y el retroceso horizontal d.",
      newSeaLevel: "Nuevo nivel del mar",
      originalSeaLevel: "Nivel original",
      ocean: "Océano",
      terrain: "Terreno",
      riseLabel: "Aumento del nivel del mar",
      slopeLabel: "Pendiente de la costa",
      veryGentle: "0.1° Muy suave",
      gentle: "1° Suave",
      steep: "5° Pronunciada",
      retreatLabel: "La costa retrocede aproximadamente",
      distanceNote: "desplazamiento horizontal estimado por el modelo",
      factorLabel: "Factor de amplificación horizontal:",
      factorText: "Por cada 1 m de aumento vertical, el modelo produce aproximadamente {factor} m de desplazamiento horizontal.",
      mathSummary: "¿De dónde sale este resultado?",
      compareTitle: "Compara el mismo aumento del nivel del mar en tres costas",
      compareNote: "Mantendremos fijo el valor de h que elegiste.",
      compareButton: "Comparar escenarios",
      hideComparison: "Ocultar comparación",
      scenarioVeryGentle: "Pendiente muy suave",
      scenarioGentle: "Pendiente suave",
      scenarioSteep: "Pendiente más pronunciada",
      comparePrompt: "El aumento del nivel del mar es exactamente el mismo en los tres escenarios. ¿Qué variable explica la diferencia en el retroceso?",
      modelDisclaimer: "Este recurso representa un modelo geométrico simplificado. Una costa real también depende de factores como erosión, oleaje, mareas, topografía y obras costeras."
    },

    en: {
      pageTitle: "How far can a coastline retreat?",
      eyebrow: "Applied trigonometry",
      title: "How far can a coastline retreat?",
      subtitle: "Adjust sea-level rise and coastal slope. Observe how a small vertical change can produce a much larger horizontal displacement.",
      modelTitle: "Coastal model",
      scaleNote: "Vertical scale is exaggerated to make the change easier to observe.",
      svgTitle: "Simulation of a coastline affected by sea-level rise",
      svgDesc: "A side view of a coastline shows the original sea level, the new sea level, the vertical rise h, and the horizontal retreat d.",
      newSeaLevel: "New sea level",
      originalSeaLevel: "Original level",
      ocean: "Ocean",
      terrain: "Land",
      riseLabel: "Sea-level rise",
      slopeLabel: "Coastal slope",
      veryGentle: "0.1° Very gentle",
      gentle: "1° Gentle",
      steep: "5° Steeper",
      retreatLabel: "The coastline retreats approximately",
      distanceNote: "horizontal displacement estimated by the model",
      factorLabel: "Horizontal amplification factor:",
      factorText: "For every 1 m of vertical rise, the model produces approximately {factor} m of horizontal displacement.",
      mathSummary: "Where does this result come from?",
      compareTitle: "Compare the same sea-level rise across three coastlines",
      compareNote: "The value of h you selected will remain fixed.",
      compareButton: "Compare scenarios",
      hideComparison: "Hide comparison",
      scenarioVeryGentle: "Very gentle slope",
      scenarioGentle: "Gentle slope",
      scenarioSteep: "Steeper slope",
      comparePrompt: "Sea-level rise is exactly the same in all three scenarios. Which variable explains the difference in coastline retreat?",
      modelDisclaimer: "This resource represents a simplified geometric model. A real coastline also depends on factors such as erosion, waves, tides, topography, and coastal infrastructure."
    }
  };

  const rise = document.getElementById("rise");
  const angle = document.getElementById("angle");

  const riseValue = document.getElementById("riseValue");
  const angleValue = document.getElementById("angleValue");
  const distanceValue = document.getElementById("distanceValue");
  const factorValue = document.getElementById("factorValue");
  const factorText = document.getElementById("factorText");
  const substitution = document.getElementById("substitution");

  const terrainLine = document.getElementById("terrainLine");
  const landShape = document.getElementById("landShape");
  const oldSeaFill = document.getElementById("oldSeaFill");
  const newSeaFill = document.getElementById("newSeaFill");
  const oldSeaLine = document.getElementById("oldSeaLine");
  const newSeaLine = document.getElementById("newSeaLine");
  const oldCoastPoint = document.getElementById("oldCoastPoint");
  const newCoastPoint = document.getElementById("newCoastPoint");
  const hLine = document.getElementById("hLine");
  const dLine = document.getElementById("dLine");
  const hLabel = document.getElementById("hLabel");
  const dLabel = document.getElementById("dLabel");
  const angleLabel = document.getElementById("angleLabel");
  const angleArc = document.getElementById("angleArc");

  const compareBtn = document.getElementById("compareBtn");
  const comparison = document.getElementById("comparison");
  const comparePrompt = document.getElementById("comparePrompt");

  const langButtons = document.querySelectorAll(".lang-btn");

  let currentLanguage = "es";

  function degToRad(degrees) {
    return degrees * Math.PI / 180;
  }

  function calculateDistance(hCm, thetaDeg) {
    const hM = hCm / 100;
    const tangent = Math.tan(degToRad(thetaDeg));
    return tangent === 0 ? 0 : hM / tangent;
  }

  function formatDistance(meters) {
    if (meters >= 10) return `${meters.toFixed(1)} m`;
    if (meters >= 1) return `${meters.toFixed(2)} m`;
    return `${(meters * 100).toFixed(1)} cm`;
  }

  function visualAngle(actualAngle) {
    const normalized = (actualAngle - 0.1) / 4.9;
    return 8 + normalized * 20;
  }

  function pointAtY(x1, y1, x2, y2, y) {
    const dy = y2 - y1;
    if (Math.abs(dy) < 1e-6) return x1;

    const t = (y - y1) / dy;
    return x1 + t * (x2 - x1);
  }

  function translateInterface() {
    const dictionary = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.title = dictionary.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === currentLanguage);
      button.setAttribute(
        "aria-pressed",
        button.dataset.lang === currentLanguage ? "true" : "false"
      );
    });

    updateScene();
    updateCompareButton();
  }

  function updateScene() {
    const hCm = Number(rise.value);
    const theta = Number(angle.value);
    const hM = hCm / 100;
    const factor = 1 / Math.tan(degToRad(theta));
    const distance = calculateDistance(hCm, theta);
    const dictionary = translations[currentLanguage];

    riseValue.textContent = `${hCm.toFixed(0)} cm`;
    angleValue.textContent = `${theta.toFixed(1)}°`;
    distanceValue.textContent = formatDistance(distance);
    factorValue.textContent = factor.toFixed(1);

    factorText.textContent = dictionary.factorText.replace(
      "{factor}",
      factor.toFixed(1)
    );

    substitution.innerHTML = [
      `h = ${hM.toFixed(2)} m`,
      `θ = ${theta.toFixed(1)}°`,
      `d = ${hM.toFixed(2)} · cot(${theta.toFixed(1)}°)`,
      `d ≈ ${formatDistance(distance)}`
    ].join("<br>");

    updateSvg(theta, hCm);
    updateQuickButtons(theta);
    updateComparison();
  }

  function updateSvg(theta, hCm) {
    const displayedAngle = visualAngle(theta);
    const displayedAngleRad = degToRad(displayedAngle);

    const x1 = 250;
    const y1 = 430;
    const length = 650;
    const x2 = x1 + Math.cos(displayedAngleRad) * length;
    const y2 = y1 - Math.sin(displayedAngleRad) * length;

    terrainLine.setAttribute("x1", x1);
    terrainLine.setAttribute("y1", y1);
    terrainLine.setAttribute("x2", x2);
    terrainLine.setAttribute("y2", y2);

    landShape.setAttribute(
      "d",
      `M ${x1} ${y1} L ${x2} ${y2} L 900 ${y2} L 900 505 L ${x1} 505 Z`
    );

    const oldY = 342;
    const risePx = hCm * 0.75;
    const newY = oldY - risePx;

    oldSeaFill.setAttribute("y", oldY);
    oldSeaFill.setAttribute("height", 505 - oldY);
    newSeaFill.setAttribute("y", newY);
    newSeaFill.setAttribute("height", 505 - newY);

    oldSeaLine.setAttribute("y1", oldY);
    oldSeaLine.setAttribute("y2", oldY);
    newSeaLine.setAttribute("y1", newY);
    newSeaLine.setAttribute("y2", newY);

    const oldX = pointAtY(x1, y1, x2, y2, oldY);
    let newX = pointAtY(x1, y1, x2, y2, newY);
    newX = Math.max(0, Math.min(885, newX));

    oldCoastPoint.setAttribute("cx", oldX);
    oldCoastPoint.setAttribute("cy", oldY);

    newCoastPoint.setAttribute("cx", newX);
    newCoastPoint.setAttribute("cy", newY);

    hLine.setAttribute("y1", oldY);
    hLine.setAttribute("y2", newY);
    hLabel.setAttribute("y", (oldY + newY) / 2 + 5);

    const dY = Math.min(470, oldY + 42);

    dLine.setAttribute("x1", oldX);
    dLine.setAttribute("x2", newX);
    dLine.setAttribute("y1", dY);
    dLine.setAttribute("y2", dY);

    dLabel.setAttribute("x", (oldX + newX) / 2 - 4);
    dLabel.setAttribute("y", dY + 27);

    angleLabel.textContent = `θ = ${theta.toFixed(1)}°`;

    const arcCx = 655;
    const arcCy = 426;
    const radius = 43;

    const startX = arcCx + radius;
    const startY = arcCy;
    const endX = arcCx + radius * Math.cos(displayedAngleRad);
    const endY = arcCy - radius * Math.sin(displayedAngleRad);

    angleArc.setAttribute(
      "d",
      `M ${startX} ${startY} A ${radius} ${radius} 0 0 0 ${endX} ${endY}`
    );
  }

  function updateQuickButtons(theta) {
    document.querySelectorAll("[data-angle]").forEach((button) => {
      const buttonAngle = Number(button.dataset.angle);
      button.classList.toggle(
        "active",
        Math.abs(buttonAngle - theta) < 0.001
      );
    });
  }

  function updateComparison() {
    const hCm = Number(rise.value);

    document.getElementById("d01").textContent =
      formatDistance(calculateDistance(hCm, 0.1));

    document.getElementById("d1").textContent =
      formatDistance(calculateDistance(hCm, 1));

    document.getElementById("d5").textContent =
      formatDistance(calculateDistance(hCm, 5));
  }

  function updateCompareButton() {
    const dictionary = translations[currentLanguage];
    const isVisible = comparison.classList.contains("show");

    compareBtn.textContent = isVisible
      ? dictionary.hideComparison
      : dictionary.compareButton;
  }

  rise.addEventListener("input", updateScene);
  angle.addEventListener("input", updateScene);

  document.querySelectorAll("[data-angle]").forEach((button) => {
    button.addEventListener("click", () => {
      angle.value = button.dataset.angle;
      updateScene();
    });
  });

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentLanguage = button.dataset.lang;
      translateInterface();
    });
  });

  compareBtn.addEventListener("click", () => {
    const shouldShow = !comparison.classList.contains("show");

    comparison.classList.toggle("show", shouldShow);
    comparePrompt.hidden = !shouldShow;

    updateCompareButton();
  });

  translateInterface();
})();
