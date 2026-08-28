const translations = {
  es: {
    appTitle: "Conversión entre grados y radianes",
    appSubtitle: "Practica la equivalencia entre ambas unidades de medida angular.",
    languageLabel: "Idioma",
    degToRad: "Grados → radianes",
    radToDeg: "Radianes → grados",
    practiceTitle: "Convierte la medida",
    instructionDegRad: "Convierte el ángulo dado a radianes y expresa tu respuesta como una fracción de π.",
    instructionRadDeg: "Convierte el ángulo dado a grados.",
    newExercise: "Nuevo ejercicio",
    answerAsPiFraction: "Escribe tu respuesta como una fracción de π:",
    fractionNote: "Puedes escribir una fracción equivalente; la retroalimentación mostrará la forma simplificada.",
    answerInDegrees: "Escribe tu respuesta en grados:",
    showHint: "Mostrar pista",
    hideHint: "Ocultar pista",
    hintTitle: "Pista",
    hintDegRad: "Para convertir de grados a radianes, multiplica por π/180.",
    hintRadDeg: "Para convertir de radianes a grados, multiplica por 180/π.",
    checkAnswer: "Comprobar",
    correct: "Correcto",
    incorrect: "Incorrecto",
    enterFraction: "Escribe un numerador y un denominador válido antes de comprobar.",
    denominatorZero: "El denominador no puede ser 0.",
    enterDegrees: "Escribe una respuesta numérica en grados antes de comprobar.",
    correctDegRad: (deg, exact) => `${deg}° = ${exact}.`,
    incorrectDegRad: (deg, exact) => `Revisa la conversión. ${deg}° = ${exact}.`,
    equivalentNotSimplified: (exact) => `Tu fracción es equivalente. La forma simplificada es ${exact}.`,
    correctRadDeg: (rad, deg) => `${rad} = ${deg}°.`,
    incorrectRadDeg: (rad, deg) => `Revisa la conversión. ${rad} = ${deg}°.`,
    footerText: "Recurso interactivo de práctica",
    svgTitle: "Representación del ángulo",
    svgDesc: "Ángulo representado desde el eje horizontal positivo."
  },
  en: {
    appTitle: "Degrees and radians conversion",
    appSubtitle: "Practice the equivalence between both units of angular measure.",
    languageLabel: "Language",
    degToRad: "Degrees → radians",
    radToDeg: "Radians → degrees",
    practiceTitle: "Convert the measure",
    instructionDegRad: "Convert the given angle to radians and express your answer as a fraction of π.",
    instructionRadDeg: "Convert the given angle to degrees.",
    newExercise: "New exercise",
    answerAsPiFraction: "Write your answer as a fraction of π:",
    fractionNote: "You may enter an equivalent fraction; feedback will show the simplified form.",
    answerInDegrees: "Write your answer in degrees:",
    showHint: "Show hint",
    hideHint: "Hide hint",
    hintTitle: "Hint",
    hintDegRad: "To convert degrees to radians, multiply by π/180.",
    hintRadDeg: "To convert radians to degrees, multiply by 180/π.",
    checkAnswer: "Check",
    correct: "Correct",
    incorrect: "Incorrect",
    enterFraction: "Enter a valid numerator and denominator before checking.",
    denominatorZero: "The denominator cannot be 0.",
    enterDegrees: "Enter a numerical answer in degrees before checking.",
    correctDegRad: (deg, exact) => `${deg}° = ${exact}.`,
    incorrectDegRad: (deg, exact) => `Review the conversion. ${deg}° = ${exact}.`,
    equivalentNotSimplified: (exact) => `Your fraction is equivalent. The simplified form is ${exact}.`,
    correctRadDeg: (rad, deg) => `${rad} = ${deg}°.`,
    incorrectRadDeg: (rad, deg) => `Review the conversion. ${rad} = ${deg}°.`,
    footerText: "Interactive practice resource",
    svgTitle: "Angle representation",
    svgDesc: "Angle represented from the positive horizontal axis."
  }
};

const degreePool = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];

const state = { language:"es", mode:"deg-rad", degrees:150, numerator:5, denominator:6, hintVisible:false };
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const elements = {
  languageSelect:document.getElementById("language-select"),
  modeDegRad:document.getElementById("mode-deg-rad"),
  modeRadDeg:document.getElementById("mode-rad-deg"),
  practiceInstruction:document.getElementById("practice-instruction"),
  newExercise:document.getElementById("new-exercise"),
  givenMeasure:document.getElementById("given-measure"),
  movingRay:document.getElementById("moving-ray"),
  angleArc:document.getElementById("angle-arc"),
  fullAngleCircle:document.getElementById("full-angle-circle"),
  degToRadAnswer:document.getElementById("deg-to-rad-answer"),
  radToDegAnswer:document.getElementById("rad-to-deg-answer"),
  piNumerator:document.getElementById("pi-numerator"),
  piDenominator:document.getElementById("pi-denominator"),
  degreeAnswer:document.getElementById("degree-answer"),
  toggleHint:document.getElementById("toggle-hint"),
  formulaCard:document.getElementById("formula-card"),
  formulaContent:document.getElementById("formula-content"),
  checkAnswer:document.getElementById("check-answer"),
  feedback:document.getElementById("feedback"),
  svgTitle:document.getElementById("angle-svg-title"),
  svgDesc:document.getElementById("angle-svg-desc")
};

function t(key){ return translations[state.language][key]; }
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b!==0){ const temp=b; b=a%b; a=temp; } return a||1; }
function reduceFraction(numerator,denominator){ if(numerator===0) return {numerator:0,denominator:1}; const divisor=gcd(numerator,denominator); let n=numerator/divisor; let d=denominator/divisor; if(d<0){n*=-1;d*=-1;} return {numerator:n,denominator:d}; }
function degreeToPiFraction(degrees){ return reduceFraction(degrees,180); }
function chooseRandom(array){ return array[Math.floor(Math.random()*array.length)]; }
function formatPiFraction(numerator,denominator){
  if(numerator===0) return "0 rad";
  const sign=numerator<0?"−":""; const absN=Math.abs(numerator);
  if(denominator===1){ if(absN===1) return `${sign}π rad`; return `${sign}${absN}π rad`; }
  const numeratorText=absN===1?"π":`${absN}π`;
  return `${sign}${numeratorText}/${denominator} rad`;
}

function generateExercise(){
  const degrees=chooseRandom(degreePool); const fraction=degreeToPiFraction(degrees);
  state.degrees=degrees; state.numerator=fraction.numerator; state.denominator=fraction.denominator; state.hintVisible=false;
  elements.formulaCard.hidden=true; elements.feedback.hidden=true;
  elements.piNumerator.value=""; elements.piDenominator.value=""; elements.degreeAnswer.value="";
  elements.givenMeasure.textContent=state.mode==="deg-rad"?`${degrees}°`:formatPiFraction(fraction.numerator,fraction.denominator).replace(" rad","");
  updateHint(); animateSvgAngle(degrees);
}

function setMode(mode){
  state.mode=mode; const degRadActive=mode==="deg-rad";
  elements.modeDegRad.classList.toggle("is-active",degRadActive);
  elements.modeRadDeg.classList.toggle("is-active",!degRadActive);
  elements.modeDegRad.setAttribute("aria-pressed",String(degRadActive));
  elements.modeRadDeg.setAttribute("aria-pressed",String(!degRadActive));
  elements.degToRadAnswer.hidden=!degRadActive; elements.radToDegAnswer.hidden=degRadActive;
  elements.practiceInstruction.textContent=degRadActive?t("instructionDegRad"):t("instructionRadDeg");
  generateExercise();
}

function toggleHint(){ state.hintVisible=!state.hintVisible; elements.formulaCard.hidden=!state.hintVisible; updateHint(); }
function updateHint(){
  elements.toggleHint.textContent=state.hintVisible?t("hideHint"):t("showHint");
  if(state.mode==="deg-rad") elements.formulaContent.innerHTML=`${t("hintDegRad")}<br><span aria-hidden="true">θ<sub>rad</sub> = θ<sub>°</sub> · π/180</span>`;
  else elements.formulaContent.innerHTML=`${t("hintRadDeg")}<br><span aria-hidden="true">θ<sub>°</sub> = θ<sub>rad</sub> · 180/π</span>`;
}

function checkAnswer(){ state.mode==="deg-rad"?checkDegreesToRadians():checkRadiansToDegrees(); }

function checkDegreesToRadians(){
  const rawN=elements.piNumerator.value.trim(), rawD=elements.piDenominator.value.trim();
  if(rawN===""||rawD===""){ showFeedback(t("enterFraction"),"warning"); return; }
  const n=Number(rawN), d=Number(rawD);
  if(!Number.isFinite(n)||!Number.isFinite(d)||!Number.isInteger(n)||!Number.isInteger(d)){ showFeedback(t("enterFraction"),"warning"); return; }
  if(d===0){ showFeedback(t("denominatorZero"),"warning"); return; }
  const expectedN=state.numerator, expectedD=state.denominator;
  const equivalent=n*expectedD===expectedN*d; const simplified=reduceFraction(n,d); const exact=formatPiFraction(expectedN,expectedD);
  if(equivalent){
    const enteredSimplified=simplified.numerator===n&&simplified.denominator===d&&d>0;
    const extra=enteredSimplified?"":` ${t("equivalentNotSimplified")(exact)}`;
    showFeedback(`<strong>${t("correct")}.</strong> ${t("correctDegRad")(state.degrees,exact)}${extra}`,"correct",true);
  } else showFeedback(`<strong>${t("incorrect")}.</strong> ${t("incorrectDegRad")(state.degrees,exact)}`,"incorrect",true);
}

function checkRadiansToDegrees(){
  const raw=elements.degreeAnswer.value.trim(); if(raw===""){showFeedback(t("enterDegrees"),"warning");return;}
  const answer=Number(raw); if(!Number.isFinite(answer)){showFeedback(t("enterDegrees"),"warning");return;}
  const radText=formatPiFraction(state.numerator,state.denominator).replace(" rad","");
  const isCorrect=Math.abs(answer-state.degrees)<1e-9;
  if(isCorrect) showFeedback(`<strong>${t("correct")}.</strong> ${t("correctRadDeg")(radText,state.degrees)}`,"correct",true);
  else showFeedback(`<strong>${t("incorrect")}.</strong> ${t("incorrectRadDeg")(radText,state.degrees)}`,"incorrect",true);
}

function showFeedback(message,type,html=false){ elements.feedback.className=`feedback is-${type}`; html?elements.feedback.innerHTML=message:elements.feedback.textContent=message; elements.feedback.hidden=false; }

function applyLanguage(){
  document.documentElement.lang=state.language;
  document.querySelectorAll("[data-i18n]").forEach(node=>{ const value=translations[state.language][node.dataset.i18n]; if(typeof value==="string") node.textContent=value; });
  elements.svgTitle.textContent=t("svgTitle"); elements.svgDesc.textContent=t("svgDesc");
  elements.practiceInstruction.textContent=state.mode==="deg-rad"?t("instructionDegRad"):t("instructionRadDeg");
  updateHint(); elements.feedback.hidden=true;
}

function animateSvgAngle(targetAngle){
  const duration=prefersReducedMotion.matches?0:520; const startTime=performance.now(); elements.fullAngleCircle.hidden=true;
  function frame(now){ const progress=duration===0?1:Math.min((now-startTime)/duration,1); const eased=1-Math.pow(1-progress,3); const currentAngle=targetAngle*eased; drawSvgAngle(currentAngle,targetAngle===360&&progress===1); if(progress<1) requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
}

function drawSvgAngle(angle,forceFullCircle=false){
  const cx=210, cy=160, rayLength=112, arcRadius=72; const normalized=Math.max(0,Math.min(angle,360)); const radians=normalized*Math.PI/180;
  const x2=cx+rayLength*Math.cos(radians), y2=cy-rayLength*Math.sin(radians);
  elements.movingRay.setAttribute("x2",x2.toFixed(2)); elements.movingRay.setAttribute("y2",y2.toFixed(2));
  if(forceFullCircle){ elements.angleArc.setAttribute("d",""); elements.fullAngleCircle.hidden=false; return; }
  elements.fullAngleCircle.hidden=true; if(normalized<=0.01){elements.angleArc.setAttribute("d","");return;}
  const startX=cx+arcRadius, startY=cy, endX=cx+arcRadius*Math.cos(radians), endY=cy-arcRadius*Math.sin(radians), largeArcFlag=normalized>180?1:0;
  elements.angleArc.setAttribute("d",["M",startX.toFixed(2),startY.toFixed(2),"A",arcRadius,arcRadius,0,largeArcFlag,0,endX.toFixed(2),endY.toFixed(2)].join(" "));
}

function initialize(){
  elements.languageSelect.value=state.language; applyLanguage(); setMode("deg-rad");
  elements.languageSelect.addEventListener("change",event=>{state.language=event.target.value;applyLanguage();});
  elements.modeDegRad.addEventListener("click",()=>setMode("deg-rad"));
  elements.modeRadDeg.addEventListener("click",()=>setMode("rad-deg"));
  elements.newExercise.addEventListener("click",generateExercise);
  elements.toggleHint.addEventListener("click",toggleHint);
  elements.checkAnswer.addEventListener("click",checkAnswer);
  [elements.piNumerator,elements.piDenominator,elements.degreeAnswer].forEach(input=>input.addEventListener("keydown",event=>{if(event.key==="Enter")checkAnswer();}));
}
initialize();
