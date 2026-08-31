const translations = {
  es: {
    appTitle: "Posición estándar y ángulos coterminales",
    appSubtitle: "Explora rotaciones, posición estándar y familias de ángulos coterminales.",
    modeExplore: "Explorar",
    modePosition: "Posición estándar",
    modeCoterminal: "Coterminales",
    modeReduce: "Reducir a una vuelta",
    newExercise: "Nuevo ejercicio",
    unitLabel: "Unidad",
    degrees: "Grados",
    radians: "Radianes",
    difficultyLabel: "Tipo de ejercicio",
    mixed: "Mixto",
    standardAngles: "Ángulos comunes",
    quadrantalAngles: "Cuadrantales",
    negativeAngles: "Negativos",
    multiTurnAngles: "Más de una vuelta",
    exploreHeading: "Explora la rotación",
    exploreInstruction: "Genera un ángulo y observa cómo cambia su lado terminal.",
    positionHeading: "Posición estándar",
    positionInstruction: "Identifica dónde termina el lado terminal del ángulo.",
    coterminalHeading: "Ángulos coterminales",
    coterminalInstructionTop: "Genera ángulos diferentes que terminan en el mismo lado terminal.",
    reduceHeading: "Reduce a una vuelta",
    reduceInstructionTop: "Encuentra el ángulo coterminal equivalente dentro de una sola vuelta.",
    fullTurns: "Vueltas completas",
    residualAngle: "Ángulo restante",
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
    positionTitle: "Identifica el lado terminal",
    positionPrompt: "¿Dónde termina el lado terminal del ángulo?",
    quadrantI: "Cuadrante I",
    quadrantII: "Cuadrante II",
    quadrantIII: "Cuadrante III",
    quadrantIV: "Cuadrante IV",
    positiveX: "Eje x positivo",
    positiveY: "Eje y positivo",
    negativeX: "Eje x negativo",
    negativeY: "Eje y negativo",
    checkAnswer: "Comprobar",
    selectOption: "Selecciona una ubicación antes de comprobar.",
    correct: "Correcto",
    incorrect: "Incorrecto",
    positionCorrect: location => `El lado terminal se encuentra en ${location}.`,
    positionIncorrect: location => `Revisa la rotación. El lado terminal se encuentra en ${location}.`,
    coterminalTitle: "Genera ángulos coterminales",
    coterminalInstruction: "Escribe un ángulo coterminal positivo y uno negativo.",
    positiveCoterminal: "Coterminal positivo",
    negativeCoterminal: "Coterminal negativo",
    enterBoth: "Escribe ambas respuestas antes de comprobar.",
    invalidFraction: "Escribe numeradores y denominadores enteros válidos. El denominador no puede ser 0.",
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
    appSubtitle: "Explore rotations, standard position, and families of coterminal angles.",
    modeExplore: "Explore",
    modePosition: "Standard position",
    modeCoterminal: "Coterminal angles",
    modeReduce: "Reduce to one turn",
    newExercise: "New exercise",
    unitLabel: "Unit",
    degrees: "Degrees",
    radians: "Radians",
    difficultyLabel: "Exercise type",
    mixed: "Mixed",
    standardAngles: "Common angles",
    quadrantalAngles: "Quadrantal",
    negativeAngles: "Negative",
    multiTurnAngles: "More than one turn",
    exploreHeading: "Explore the rotation",
    exploreInstruction: "Generate an angle and observe how its terminal side changes.",
    positionHeading: "Standard position",
    positionInstruction: "Identify where the terminal side of the angle ends.",
    coterminalHeading: "Coterminal angles",
    coterminalInstructionTop: "Generate different angles that end on the same terminal side.",
    reduceHeading: "Reduce to one turn",
    reduceInstructionTop: "Find the equivalent coterminal angle within a single turn.",
    fullTurns: "Complete turns",
    residualAngle: "Remaining angle",
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
    positionTitle: "Identify the terminal side",
    positionPrompt: "Where does the terminal side of the angle end?",
    quadrantI: "Quadrant I",
    quadrantII: "Quadrant II",
    quadrantIII: "Quadrant III",
    quadrantIV: "Quadrant IV",
    positiveX: "Positive x-axis",
    positiveY: "Positive y-axis",
    negativeX: "Negative x-axis",
    negativeY: "Negative y-axis",
    checkAnswer: "Check",
    selectOption: "Select a location before checking.",
    correct: "Correct",
    incorrect: "Incorrect",
    positionCorrect: location => `The terminal side lies in ${location}.`,
    positionIncorrect: location => `Review the rotation. The terminal side lies in ${location}.`,
    coterminalTitle: "Generate coterminal angles",
    coterminalInstruction: "Enter one positive and one negative coterminal angle.",
    positiveCoterminal: "Positive coterminal angle",
    negativeCoterminal: "Negative coterminal angle",
    enterBoth: "Enter both answers before checking.",
    invalidFraction: "Enter valid integer numerators and denominators. The denominator cannot be 0.",
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

const pools = {
  standard: [-330,-300,-270,-240,-225,-210,-180,-150,-135,-120,-90,-60,-45,-30,0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330],
  quadrantal: [-720,-630,-540,-450,-360,-270,-180,-90,0,90,180,270,360,450,540,630,720],
  negative: [-1110,-990,-810,-750,-690,-510,-450,-390,-330,-300,-240,-210,-150,-120,-60,-30],
  multi: [-1110,-990,-810,-750,-690,-630,-450,390,420,450,510,570,630,690,750,810,930,1110]
};

const state = { language:"es", mode:"explore", unit:"deg", difficulty:"mixed", degrees:210, selected:null };

const el = {
  language: document.getElementById("language-select"),
  unit: document.getElementById("unit-select"),
  difficulty: document.getElementById("difficulty-select"),
  heading: document.getElementById("practice-heading"),
  instruction: document.getElementById("practice-instruction"),
  measure: document.getElementById("given-measure"),
  terminalRay: document.getElementById("terminal-ray"),
  rotationPath: document.getElementById("rotation-path"),
  fullCircle: document.getElementById("full-turn-circle"),
  turnCount: document.getElementById("turn-count"),
  residual: document.getElementById("residual-angle"),
  explore: document.getElementById("explore-panel"),
  position: document.getElementById("position-panel"),
  coterminal: document.getElementById("coterminal-panel"),
  reduce: document.getElementById("reduce-panel"),
  direction: document.getElementById("explore-direction"),
  location: document.getElementById("explore-location"),
  reduced: document.getElementById("explore-reduced"),
  reference: document.getElementById("explore-reference"),
  rule: document.getElementById("coterminal-rule"),
  locationOptions: document.getElementById("location-options"),
  posFeedback: document.getElementById("position-feedback"),
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

const buttons = {
  explore: document.getElementById("mode-explore"),
  position: document.getElementById("mode-position"),
  coterminal: document.getElementById("mode-coterminal"),
  reduce: document.getElementById("mode-reduce")
};

function t(k){ return translations[state.language][k]; }
function choose(a){ return a[Math.floor(Math.random()*a.length)]; }
function norm(d){ return ((d%360)+360)%360; }
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; }
function frac(n,d){ const g=gcd(n,d); n/=g; d/=g; if(d<0){n=-n;d=-d;} return {n,d}; }
function degFrac(d){ return frac(d,180); }

function formatPi(f){
  if(f.n===0) return "0";
  const sign=f.n<0?"−":"";
  const a=Math.abs(f.n);
  if(f.d===1) return a===1 ? `${sign}π` : `${sign}${a}π`;
  return `${sign}${a===1?"π":a+"π"}/${f.d}`;
}

function displayAngle(deg){
  return state.unit==="deg" ? `${deg}°` : formatPi(degFrac(deg));
}

function getPool(){
  if(state.difficulty!=="mixed") return pools[state.difficulty];
  return [...pools.standard,...pools.quadrantal,...pools.negative,...pools.multi];
}

function generate(){
  state.degrees=choose(getPool());
  state.selected=null;
  clearInputs();
  update();
  animate(state.degrees);
}

function clearInputs(){
  [el.pDeg,el.nDeg,el.pNum,el.pDen,el.nNum,el.nDen,el.rDeg,el.rNum,el.rDen].forEach(x=>x.value="");
  [el.posFeedback,el.cotFeedback,el.redFeedback].forEach(x=>x.hidden=true);
}

function locationKey(deg){
  const a=norm(deg);
  if(a===0)return"positiveX"; if(a===90)return"positiveY"; if(a===180)return"negativeX"; if(a===270)return"negativeY";
  if(a<90)return"quadrantI"; if(a<180)return"quadrantII"; if(a<270)return"quadrantIII"; return"quadrantIV";
}

function referenceAngle(a){
  if([0,90,180,270].includes(a)) return null;
  if(a<90)return a; if(a<180)return 180-a; if(a<270)return a-180; return 360-a;
}

function update(){
  const reduced=norm(state.degrees);
  el.measure.textContent=displayAngle(state.degrees);
  el.turnCount.textContent=Math.floor(Math.abs(state.degrees)/360);
  el.residual.textContent=displayAngle(reduced);
  el.direction.textContent=state.degrees>0?t("counterclockwise"):state.degrees<0?t("clockwise"):t("noRotation");
  el.location.textContent=t(locationKey(state.degrees));
  el.reduced.textContent=displayAngle(reduced);
  const ref=referenceAngle(reduced);
  el.reference.textContent=ref===null?t("notApplicable"):displayAngle(ref);
  el.rule.innerHTML=state.unit==="deg"?'θ<sub>cot</sub> = θ + 360°k, &nbsp; k ∈ ℤ':'θ<sub>cot</sub> = θ + 2πk, &nbsp; k ∈ ℤ';
  el.cotDeg.hidden=state.unit!=="deg"; el.cotRad.hidden=state.unit==="deg";
  el.redDeg.hidden=state.unit!=="deg"; el.redRad.hidden=state.unit==="deg";
  renderOptions();
}

function setMode(mode){
  state.mode=mode;
  Object.entries(buttons).forEach(([k,b])=>b.classList.toggle("is-active",k===mode));
  el.explore.hidden=mode!=="explore"; el.position.hidden=mode!=="position"; el.coterminal.hidden=mode!=="coterminal"; el.reduce.hidden=mode!=="reduce";
  const map={
    explore:["exploreHeading","exploreInstruction"],
    position:["positionHeading","positionInstruction"],
    coterminal:["coterminalHeading","coterminalInstructionTop"],
    reduce:["reduceHeading","reduceInstructionTop"]
  };
  el.heading.textContent=t(map[mode][0]);
  el.instruction.textContent=t(map[mode][1]);
  clearInputs();
}

function renderOptions(){
  const keys=["quadrantI","quadrantII","quadrantIII","quadrantIV","positiveX","positiveY","negativeX","negativeY"];
  el.locationOptions.innerHTML="";
  keys.forEach(k=>{
    const b=document.createElement("button");
    b.type="button"; b.className="option-button"; b.textContent=t(k);
    if(state.selected===k)b.classList.add("is-selected");
    b.addEventListener("click",()=>{state.selected=k;renderOptions();el.posFeedback.hidden=true;});
    el.locationOptions.appendChild(b);
  });
}

function feedback(node,msg,type){
  node.className=`feedback is-${type}`; node.innerHTML=msg; node.hidden=false;
}

function checkPosition(){
  if(!state.selected){feedback(el.posFeedback,t("selectOption"),"warning");return;}
  const correct=locationKey(state.degrees), ok=state.selected===correct;
  feedback(el.posFeedback,`<strong>${ok?t("correct"):t("incorrect")}.</strong> ${ok?t("positionCorrect")(t(correct)):t("positionIncorrect")(t(correct))}`,ok?"correct":"incorrect");
}

function coterminalDeg(base,candidate){
  const k=(candidate-base)/360;
  return Math.abs(k-Math.round(k))<1e-9;
}
function coterminalPi(base,candidate){
  const k=(candidate-base)/2;
  return Math.abs(k-Math.round(k))<1e-9;
}

function checkCoterminal(){
  if(state.unit==="deg"){
    if(el.pDeg.value===""||el.nDeg.value===""){feedback(el.cotFeedback,t("enterBoth"),"warning");return;}
    const p=Number(el.pDeg.value), n=Number(el.nDeg.value);
    if(!(p>0&&n<0)){feedback(el.cotFeedback,t("requirePositiveNegative"),"warning");return;}
    const ok=coterminalDeg(state.degrees,p)&&coterminalDeg(state.degrees,n);
    feedback(el.cotFeedback,`<strong>${ok?t("correct"):t("incorrect")}.</strong> ${ok?t("coterminalCorrect"):t("coterminalIncorrect")}`,ok?"correct":"incorrect");
  } else {
    const vals=[el.pNum.value,el.pDen.value,el.nNum.value,el.nDen.value];
    if(vals.some(v=>v==="")){feedback(el.cotFeedback,t("enterBoth"),"warning");return;}
    const [pn,pd,nn,nd]=vals.map(Number);
    if(![pn,pd,nn,nd].every(Number.isInteger)||pd===0||nd===0){feedback(el.cotFeedback,t("invalidFraction"),"warning");return;}
    const p=pn/pd,n=nn/nd;
    if(!(p>0&&n<0)){feedback(el.cotFeedback,t("requirePositiveNegative"),"warning");return;}
    const base=state.degrees/180, ok=coterminalPi(base,p)&&coterminalPi(base,n);
    feedback(el.cotFeedback,`<strong>${ok?t("correct"):t("incorrect")}.</strong> ${ok?t("coterminalCorrect"):t("coterminalIncorrect")}`,ok?"correct":"incorrect");
  }
}

function checkReduce(){
  const reduced=norm(state.degrees);
  if(state.unit==="deg"){
    if(el.rDeg.value===""){feedback(el.redFeedback,t("enterAnswer"),"warning");return;}
    const ok=Math.abs(Number(el.rDeg.value)-reduced)<1e-9, ans=`${reduced}°`;
    feedback(el.redFeedback,`<strong>${ok?t("correct"):t("incorrect")}.</strong> ${ok?t("reduceCorrect")(ans):t("reduceIncorrect")(ans)}`,ok?"correct":"incorrect");
  } else {
    if(el.rNum.value===""||el.rDen.value===""){feedback(el.redFeedback,t("enterAnswer"),"warning");return;}
    const n=Number(el.rNum.value),d=Number(el.rDen.value);
    if(!Number.isInteger(n)||!Number.isInteger(d)||d===0){feedback(el.redFeedback,t("invalidFraction"),"warning");return;}
    const expected=reduced/180, ok=Math.abs(n/d-expected)<1e-9, ans=formatPi(degFrac(reduced));
    feedback(el.redFeedback,`<strong>${ok?t("correct"):t("incorrect")}.</strong> ${ok?t("reduceCorrect")(ans):t("reduceIncorrect")(ans)}`,ok?"correct":"incorrect");
  }
}

function animate(target){
  const duration=700,start=performance.now();
  function frame(now){
    const p=Math.min((now-start)/duration,1), eased=1-Math.pow(1-p,3);
    draw(target*eased);
    if(p<1)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function draw(deg){
  const cx=230,cy=195,r=128,arcR=85,a=norm(deg),rad=a*Math.PI/180;
  el.terminalRay.setAttribute("x2",(cx+r*Math.cos(rad)).toFixed(2));
  el.terminalRay.setAttribute("y2",(cy-r*Math.sin(rad)).toFixed(2));

  const abs=Math.abs(deg), rem=abs%360;
  if(abs>0&&rem===0){ el.rotationPath.setAttribute("d",""); el.fullCircle.hidden=false; return; }
  el.fullCircle.hidden=true;
  if(abs<.01){el.rotationPath.setAttribute("d","");return;}

  const signed=deg>=0?rem:-rem, rr=signed*Math.PI/180;
  const sx=cx+arcR,sy=cy,ex=cx+arcR*Math.cos(rr),ey=cy-arcR*Math.sin(rr);
  const large=rem>180?1:0,sweep=deg>=0?0:1;
  el.rotationPath.setAttribute("d",`M ${sx} ${sy} A ${arcR} ${arcR} 0 ${large} ${sweep} ${ex.toFixed(2)} ${ey.toFixed(2)}`);
}

function applyLanguage(){
  document.documentElement.lang=state.language;
  document.querySelectorAll("[data-i18n]").forEach(n=>{const v=translations[state.language][n.dataset.i18n];if(typeof v==="string")n.textContent=v;});
  setMode(state.mode); update();
}

buttons.explore.addEventListener("click",()=>setMode("explore"));
buttons.position.addEventListener("click",()=>setMode("position"));
buttons.coterminal.addEventListener("click",()=>setMode("coterminal"));
buttons.reduce.addEventListener("click",()=>setMode("reduce"));
document.getElementById("new-exercise").addEventListener("click",generate);
document.getElementById("check-position").addEventListener("click",checkPosition);
document.getElementById("check-coterminal").addEventListener("click",checkCoterminal);
document.getElementById("check-reduce").addEventListener("click",checkReduce);

el.language.addEventListener("change",e=>{state.language=e.target.value;applyLanguage();});
el.unit.addEventListener("change",e=>{state.unit=e.target.value;clearInputs();update();});
el.difficulty.addEventListener("change",e=>{state.difficulty=e.target.value;generate();});

el.language.value=state.language; el.unit.value=state.unit; el.difficulty.value=state.difficulty;
applyLanguage(); generate();
