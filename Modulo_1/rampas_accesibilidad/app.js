const STEP=5, MAX_MEASURE=45;

const translations={
  es:{
    appTitle:"Diseño de rampas: inclinación y accesibilidad",appSubtitle:"Mide, compara y analiza cómo cambia la inclinación cuando cambia el espacio disponible.",languageLabel:"Idioma",modeCompare:"Comparar",modeDesign:"Diseñar",modePlan:"Plano técnico",newTask:"Nuevo ejercicio",
    compareKicker:r=>`Rampa ${r}`,compareContextTitle:"Mide el ángulo de inclinación",designKicker:"Simulador",designContextTitle:"Analiza el espacio disponible",planKicker:"Plano técnico",planContextTitle:"Convierte e interpreta el ángulo",yourMeasurement:"Tu medición",
    compareTitle:"Compara las rampas",compareIntro:"Selecciona una rampa, mide el ángulo que forma con el suelo y clasifícalo.",checkMeasurement:"Comprobar medición",correctMeasurement:"La medición es correcta.",incorrectMeasurement:"La medición todavía no coincide con la inclinación de la rampa. Ajusta el brazo del transportador.",classifyPrompt:"Ahora clasifica el ángulo:",acute:"Agudo",right:"Recto",obtuse:"Obtuso",straight:"Llano",checkClassification:"Comprobar clasificación",selectClassification:"Selecciona una clasificación.",correctClassification:"Clasificación correcta.",incorrectClassification:"Revisa la definición de cada tipo de ángulo.",summaryTitle:"Resultados de comparación",ramp:"Rampa",angle:"Ángulo",classification:"Clasificación",summaryReflection:"Las tres rampas pertenecen a la misma clasificación. Registra en Canvas qué diferencias observas entre sus medidas.",
    designTitle:"Experimenta con el espacio disponible",designIntro:"Mantén fija la altura y cambia el espacio horizontal. Después mide la inclinación resultante.",height:"Altura",horizontalSpace:"Espacio horizontal disponible",recordCase:"Registrar caso",recordedCases:"Casos registrados",case:"Caso",alreadyRecorded:"Este caso ya fue registrado.",caseRecorded:"Caso registrado.",measureBeforeRecord:"Primero mide correctamente la inclinación.",patternPrompt:"Ya tienes tres casos. Busca una regularidad entre el espacio horizontal y la inclinación, y regístrala en Canvas.",designCorrect:"La medición coincide con la inclinación de esta configuración.",
    planTitle:"Interpreta un plano técnico",planIntro:"El ángulo de una propuesta aparece expresado en radianes. Conviértelo a grados y clasifícalo.",degreesAnswer:"Ángulo en grados",checkAnswer:"Comprobar",planMissing:"Escribe el ángulo en grados y selecciona una clasificación.",planCorrect:"Conversión y clasificación correctas.",planIncorrect:"Revisa la equivalencia entre grados y radianes y vuelve a clasificar el ángulo.",footerText:"Recurso interactivo de práctica"
  },
  en:{
    appTitle:"Ramp design: slope and accessibility",appSubtitle:"Measure, compare, and analyze how slope changes when the available horizontal space changes.",languageLabel:"Language",modeCompare:"Compare",modeDesign:"Design",modePlan:"Technical plan",newTask:"New task",
    compareKicker:r=>`Ramp ${r}`,compareContextTitle:"Measure the angle of inclination",designKicker:"Simulator",designContextTitle:"Analyze the available space",planKicker:"Technical plan",planContextTitle:"Convert and interpret the angle",yourMeasurement:"Your measurement",
    compareTitle:"Compare the ramps",compareIntro:"Select a ramp, measure the angle it makes with the ground, and classify it.",checkMeasurement:"Check measurement",correctMeasurement:"The measurement is correct.",incorrectMeasurement:"The measurement does not yet match the ramp's inclination. Adjust the protractor arm.",classifyPrompt:"Now classify the angle:",acute:"Acute",right:"Right",obtuse:"Obtuse",straight:"Straight",checkClassification:"Check classification",selectClassification:"Select a classification.",correctClassification:"Correct classification.",incorrectClassification:"Review the definition of each type of angle.",summaryTitle:"Comparison results",ramp:"Ramp",angle:"Angle",classification:"Classification",summaryReflection:"All three ramps belong to the same classification. Record in Canvas what differences you observe between their measures.",
    designTitle:"Experiment with available space",designIntro:"Keep the height fixed and change the horizontal space. Then measure the resulting inclination.",height:"Height",horizontalSpace:"Available horizontal space",recordCase:"Record case",recordedCases:"Recorded cases",case:"Case",alreadyRecorded:"This case has already been recorded.",caseRecorded:"Case recorded.",measureBeforeRecord:"First measure the inclination correctly.",patternPrompt:"You now have three cases. Look for a pattern between horizontal space and inclination, and record it in Canvas.",designCorrect:"The measurement matches the inclination of this configuration.",
    planTitle:"Interpret a technical plan",planIntro:"The angle of a proposal is expressed in radians. Convert it to degrees and classify it.",degreesAnswer:"Angle in degrees",checkAnswer:"Check",planMissing:"Enter the angle in degrees and select a classification.",planCorrect:"Correct conversion and classification.",planIncorrect:"Review the equivalence between degrees and radians and classify the angle again.",footerText:"Interactive practice resource"
  }
};

const rampAngles={A:5,B:10,C:15};
const state={language:"es",mode:"compare",selectedRamp:"A",measurement:0,compareCompleted:{A:false,B:false,C:false},measurementCorrect:false,height:0.60,designAngle:5,designMeasurementCorrect:false,recordedCases:[],planAngle:10,dragging:false};
const el={
  language:document.getElementById("language-select"),kicker:document.getElementById("context-kicker"),contextTitle:document.getElementById("context-title"),newTask:document.getElementById("new-task"),svg:document.getElementById("ramp-svg"),rampLine:document.getElementById("ramp-line"),rampRail:document.getElementById("ramp-rail"),railStart:document.getElementById("rail-start"),railEnd:document.getElementById("rail-end"),platformLine:document.getElementById("platform-line"),heightGuide:document.getElementById("height-guide"),runGuide:document.getElementById("run-guide"),heightText:document.getElementById("height-text"),runText:document.getElementById("run-text"),protractorArc:document.getElementById("protractor-arc"),measureRay:document.getElementById("measure-ray"),measureKnob:document.getElementById("measure-knob"),tickGroup:document.getElementById("angle-ticks"),measureValue:document.getElementById("measure-value"),comparePanel:document.getElementById("compare-panel"),designPanel:document.getElementById("design-panel"),planPanel:document.getElementById("plan-panel"),measurementFeedback:document.getElementById("measurement-feedback"),classificationArea:document.getElementById("classification-area"),classificationFeedback:document.getElementById("classification-feedback"),comparisonSummary:document.getElementById("comparison-summary"),summaryBody:document.getElementById("summary-body"),heightSelect:document.getElementById("height-select"),spaceButtons:document.getElementById("space-buttons"),designFeedback:document.getElementById("design-feedback"),recordCase:document.getElementById("record-case"),recordedCasesWrap:document.getElementById("recorded-cases-wrap"),recordedCasesBody:document.getElementById("recorded-cases-body"),patternPrompt:document.getElementById("pattern-prompt"),radianPrompt:document.getElementById("radian-prompt"),degreeAnswer:document.getElementById("degree-answer"),planFeedback:document.getElementById("plan-feedback")
};
const modeButtons={compare:document.getElementById("mode-compare"),design:document.getElementById("mode-design"),plan:document.getElementById("mode-plan")};
const t=k=>translations[state.language][k];

function setMode(mode){
  state.mode=mode;state.measurement=0;state.measurementCorrect=false;state.designMeasurementCorrect=false;
  Object.entries(modeButtons).forEach(([k,b])=>{const a=k===mode;b.classList.toggle("is-active",a);b.setAttribute("aria-pressed",String(a));});
  el.comparePanel.hidden=mode!=="compare";el.designPanel.hidden=mode!=="design";el.planPanel.hidden=mode!=="plan";
  document.getElementById("measure-controls").hidden=mode==="plan";document.getElementById("protractor-group").hidden=mode==="plan";el.tickGroup.hidden=mode==="plan";
  if(mode==="compare"){el.kicker.textContent=t("compareKicker")(state.selectedRamp);el.contextTitle.textContent=t("compareContextTitle");clearCompareFeedback();}
  if(mode==="design"){el.kicker.textContent=t("designKicker");el.contextTitle.textContent=t("designContextTitle");renderSpaceButtons();el.designFeedback.hidden=true;el.recordCase.hidden=true;}
  if(mode==="plan"){el.kicker.textContent=t("planKicker");el.contextTitle.textContent=t("planContextTitle");generatePlanTask();}
  drawCurrentRamp();drawMeasureTool();
}

function setMeasurement(value){
  let next=Math.round(value/STEP)*STEP;next=Math.max(0,Math.min(MAX_MEASURE,next));state.measurement=next;el.measureValue.textContent=`${next}°`;el.measureKnob.setAttribute("aria-valuenow",String(next));state.measurementCorrect=false;state.designMeasurementCorrect=false;
  if(state.mode==="compare"){el.measurementFeedback.hidden=true;el.classificationArea.hidden=true;el.classificationFeedback.hidden=true;}
  if(state.mode==="design"){el.designFeedback.hidden=true;el.recordCase.hidden=true;}
  drawMeasureTool();
}

function currentTargetAngle(){if(state.mode==="compare")return rampAngles[state.selectedRamp];if(state.mode==="design")return state.designAngle;return state.planAngle;}

function drawCurrentRamp(){
  const angle=currentTargetAngle(), endX=620, groundY=340, heightPx=50, endY=groundY-heightPx, runPx=heightPx/Math.tan(angle*Math.PI/180), startX=endX-runPx, railOffset=25;
  el.rampLine.setAttribute("x1",startX);el.rampLine.setAttribute("y1",groundY);el.rampLine.setAttribute("x2",endX);el.rampLine.setAttribute("y2",endY);
  el.rampRail.setAttribute("x1",startX);el.rampRail.setAttribute("y1",groundY-railOffset);el.rampRail.setAttribute("x2",endX);el.rampRail.setAttribute("y2",endY-railOffset);
  el.railStart.setAttribute("x1",startX);el.railStart.setAttribute("y1",groundY-railOffset);el.railStart.setAttribute("x2",startX);el.railStart.setAttribute("y2",groundY);
  el.railEnd.setAttribute("x1",endX);el.railEnd.setAttribute("y1",endY-railOffset);el.railEnd.setAttribute("x2",endX);el.railEnd.setAttribute("y2",endY);
  el.platformLine.setAttribute("x1",endX);el.platformLine.setAttribute("y1",endY);el.platformLine.setAttribute("x2",730);el.platformLine.setAttribute("y2",endY);
  el.heightGuide.setAttribute("x1",endX);el.heightGuide.setAttribute("y1",endY);el.heightGuide.setAttribute("x2",endX);el.heightGuide.setAttribute("y2",groundY);
  el.runGuide.setAttribute("x1",startX);el.runGuide.setAttribute("y1",groundY);el.runGuide.setAttribute("x2",endX);el.runGuide.setAttribute("y2",groundY);
  el.heightText.setAttribute("x",endX+17);el.heightText.setAttribute("y",groundY-10);el.runText.setAttribute("x",(startX+endX)/2);el.runText.setAttribute("y",groundY+28);
  if(state.mode==="design"){const run=state.height/Math.tan(angle*Math.PI/180);el.heightText.textContent=`${state.height.toFixed(2)} m`;el.runText.textContent=`${run.toFixed(2)} m`;}
  else if(state.mode==="plan"){el.heightText.textContent="";el.runText.textContent="";}
  else{el.heightText.textContent="h";el.runText.textContent="d";}
  positionMeasureOrigin(startX,groundY);
}

function positionMeasureOrigin(x,y){el.measureRay.setAttribute("x1",x);el.measureRay.setAttribute("y1",y);el.measureKnob.dataset.originX=x;el.measureKnob.dataset.originY=y;drawProtractorTicks(x,y);}
function drawMeasureTool(){
  if(state.mode==="plan")return;const ox=Number(el.measureKnob.dataset.originX||126),oy=Number(el.measureKnob.dataset.originY||340),len=145,rad=state.measurement*Math.PI/180,x2=ox+len*Math.cos(rad),y2=oy-len*Math.sin(rad);
  el.measureRay.setAttribute("x2",x2.toFixed(2));el.measureRay.setAttribute("y2",y2.toFixed(2));el.measureKnob.setAttribute("cx",x2.toFixed(2));el.measureKnob.setAttribute("cy",y2.toFixed(2));
  el.protractorArc.setAttribute("d",`M ${ox+120} ${oy} A 120 120 0 0 0 ${(ox+120*Math.cos(Math.PI/4)).toFixed(2)} ${(oy-120*Math.sin(Math.PI/4)).toFixed(2)}`);el.measureValue.textContent=`${state.measurement}°`;
}
function drawProtractorTicks(ox,oy){
  el.tickGroup.innerHTML="";for(let deg=0;deg<=45;deg+=5){const rad=deg*Math.PI/180,inner=deg%10===0?105:111,outer=120,x1=ox+inner*Math.cos(rad),y1=oy-inner*Math.sin(rad),x2=ox+outer*Math.cos(rad),y2=oy-outer*Math.sin(rad);const line=document.createElementNS("http://www.w3.org/2000/svg","line");line.setAttribute("x1",x1);line.setAttribute("y1",y1);line.setAttribute("x2",x2);line.setAttribute("y2",y2);line.setAttribute("class",`tick-line ${deg%10===0?"major":""}`);el.tickGroup.appendChild(line);if(deg%10===0){const tx=ox+91*Math.cos(rad),ty=oy-91*Math.sin(rad)+4,text=document.createElementNS("http://www.w3.org/2000/svg","text");text.setAttribute("x",tx);text.setAttribute("y",ty);text.setAttribute("class","tick-label");text.setAttribute("text-anchor","middle");text.textContent=deg;el.tickGroup.appendChild(text);}}
}

function checkCompareMeasurement(){const correct=state.measurement===rampAngles[state.selectedRamp];state.measurementCorrect=correct;showFeedback(el.measurementFeedback,correct?t("correctMeasurement"):t("incorrectMeasurement"),correct?"correct":"incorrect");el.classificationArea.hidden=!correct;if(!correct)el.classificationFeedback.hidden=true;}
function checkClassification(){const selected=document.querySelector('input[name="classification"]:checked');if(!selected){showFeedback(el.classificationFeedback,t("selectClassification"),"warning");return;}const correct=selected.value==="acute";showFeedback(el.classificationFeedback,correct?t("correctClassification"):t("incorrectClassification"),correct?"correct":"incorrect");if(correct){state.compareCompleted[state.selectedRamp]=true;renderSummary();}}
function renderSummary(){const completed=Object.values(state.compareCompleted).filter(Boolean).length;el.summaryBody.innerHTML=["A","B","C"].map(r=>state.compareCompleted[r]?`<tr><td>${r}</td><td>${rampAngles[r]}°</td><td>${t("acute")}</td></tr>`:`<tr><td>${r}</td><td>—</td><td>—</td></tr>`).join("");el.comparisonSummary.hidden=completed===0;}
function selectRamp(ramp){state.selectedRamp=ramp;state.measurement=0;state.measurementCorrect=false;document.querySelectorAll(".ramp-choice").forEach(b=>b.classList.toggle("is-active",b.dataset.ramp===ramp));document.querySelectorAll('input[name="classification"]').forEach(i=>i.checked=false);el.kicker.textContent=t("compareKicker")(ramp);clearCompareFeedback();drawCurrentRamp();drawMeasureTool();}
function clearCompareFeedback(){el.measurementFeedback.hidden=true;el.classificationArea.hidden=true;el.classificationFeedback.hidden=true;}

function designAngles(){return[5,10,15,20,25];}
function renderSpaceButtons(){
  const values=designAngles().map(angle=>({angle,run:state.height/Math.tan(angle*Math.PI/180)}));if(!values.some(v=>v.angle===state.designAngle))state.designAngle=5;
  el.spaceButtons.innerHTML=values.map(v=>`<button type="button" class="space-button ${v.angle===state.designAngle?"is-active":""}" data-angle="${v.angle}">${v.run.toFixed(2)} m</button>`).join("");
  el.spaceButtons.querySelectorAll(".space-button").forEach(b=>b.addEventListener("click",()=>{state.designAngle=Number(b.dataset.angle);state.measurement=0;state.designMeasurementCorrect=false;el.designFeedback.hidden=true;el.recordCase.hidden=true;renderSpaceButtons();drawCurrentRamp();drawMeasureTool();}));
}
function checkDesignMeasurement(){const correct=state.measurement===state.designAngle;state.designMeasurementCorrect=correct;showFeedback(el.designFeedback,correct?t("designCorrect"):t("incorrectMeasurement"),correct?"correct":"incorrect");el.recordCase.hidden=!correct;}
function recordDesignCase(){if(!state.designMeasurementCorrect){showFeedback(el.designFeedback,t("measureBeforeRecord"),"warning");return;}const run=state.height/Math.tan(state.designAngle*Math.PI/180),key=`${state.height.toFixed(2)}-${run.toFixed(2)}`;if(state.recordedCases.some(i=>i.key===key)){showFeedback(el.designFeedback,t("alreadyRecorded"),"warning");return;}state.recordedCases.push({key,height:state.height,run,angle:state.designAngle});showFeedback(el.designFeedback,t("caseRecorded"),"correct");renderRecordedCases();}
function renderRecordedCases(){el.recordedCasesWrap.hidden=state.recordedCases.length===0;el.recordedCasesBody.innerHTML=state.recordedCases.map((i,n)=>`<tr><td>${n+1}</td><td>${i.height.toFixed(2)} m</td><td>${i.run.toFixed(2)} m</td><td>${i.angle}°</td></tr>`).join("");el.patternPrompt.hidden=state.recordedCases.length<3;}

function generatePlanTask(){const pool=[5,10,15,20,25];state.planAngle=pool[Math.floor(Math.random()*pool.length)];el.radianPrompt.textContent=formatPiFraction(degreeToPiFraction(state.planAngle));el.degreeAnswer.value="";document.querySelectorAll('input[name="plan-classification"]').forEach(i=>i.checked=false);el.planFeedback.hidden=true;drawCurrentRamp();}
function checkPlan(){const raw=el.degreeAnswer.value.trim(),classification=document.querySelector('input[name="plan-classification"]:checked');if(raw===""||!classification){showFeedback(el.planFeedback,t("planMissing"),"warning");return;}const correct=Number(raw)===state.planAngle&&classification.value==="acute";showFeedback(el.planFeedback,correct?t("planCorrect"):t("planIncorrect"),correct?"correct":"incorrect");}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b!==0){const tmp=b;b=a%b;a=tmp;}return a||1;}
function degreeToPiFraction(deg){const g=gcd(deg,180);return{n:deg/g,d:180/g};}
function formatPiFraction({n,d}){if(n===0)return"0";if(d===1)return n===1?"π":`${n}π`;return`${n===1?"":n}π/${d}`;}
function showFeedback(node,msg,type){node.className=`feedback is-${type}`;node.textContent=msg;node.hidden=false;}

function applyLanguage(){document.documentElement.lang=state.language;document.querySelectorAll("[data-i18n]").forEach(node=>{const val=translations[state.language][node.dataset.i18n];if(typeof val==="string")node.textContent=val;});if(state.mode==="compare"){el.kicker.textContent=t("compareKicker")(state.selectedRamp);el.contextTitle.textContent=t("compareContextTitle");}else if(state.mode==="design"){el.kicker.textContent=t("designKicker");el.contextTitle.textContent=t("designContextTitle");}else{el.kicker.textContent=t("planKicker");el.contextTitle.textContent=t("planContextTitle");}renderSummary();renderRecordedCases();}
function pointFromEvent(event){const r=el.svg.getBoundingClientRect();return{x:(event.clientX-r.left)*(760/r.width),y:(event.clientY-r.top)*(430/r.height)};}
function measurementFromPoint(p){const ox=Number(el.measureKnob.dataset.originX||126),oy=Number(el.measureKnob.dataset.originY||340),dx=p.x-ox,dy=oy-p.y;let deg=Math.atan2(dy,dx)*180/Math.PI;if(deg<0)deg=0;if(deg>MAX_MEASURE)deg=MAX_MEASURE;return Math.round(deg/STEP)*STEP;}

el.svg.addEventListener("pointerdown",e=>{if(state.mode==="plan")return;state.dragging=true;el.measureKnob.classList.add("is-dragging");el.svg.setPointerCapture(e.pointerId);setMeasurement(measurementFromPoint(pointFromEvent(e)));});
el.svg.addEventListener("pointermove",e=>{if(!state.dragging||state.mode==="plan")return;setMeasurement(measurementFromPoint(pointFromEvent(e)));});
el.svg.addEventListener("pointerup",e=>{state.dragging=false;el.measureKnob.classList.remove("is-dragging");if(el.svg.hasPointerCapture(e.pointerId))el.svg.releasePointerCapture(e.pointerId);});
el.svg.addEventListener("pointercancel",()=>{state.dragging=false;el.measureKnob.classList.remove("is-dragging");});
el.measureKnob.addEventListener("keydown",e=>{if(state.mode==="plan")return;if(e.key==="ArrowRight"||e.key==="ArrowUp"){e.preventDefault();setMeasurement(state.measurement+STEP);}if(e.key==="ArrowLeft"||e.key==="ArrowDown"){e.preventDefault();setMeasurement(state.measurement-STEP);}});
document.getElementById("measure-minus").addEventListener("click",()=>setMeasurement(state.measurement-STEP));document.getElementById("measure-plus").addEventListener("click",()=>setMeasurement(state.measurement+STEP));
Object.entries(modeButtons).forEach(([m,b])=>b.addEventListener("click",()=>setMode(m)));document.querySelectorAll(".ramp-choice").forEach(b=>b.addEventListener("click",()=>selectRamp(b.dataset.ramp)));
document.getElementById("check-measurement").addEventListener("click",checkCompareMeasurement);document.getElementById("check-classification").addEventListener("click",checkClassification);document.getElementById("check-design-measurement").addEventListener("click",checkDesignMeasurement);el.recordCase.addEventListener("click",recordDesignCase);document.getElementById("check-plan").addEventListener("click",checkPlan);
el.heightSelect.addEventListener("change",e=>{state.height=Number(e.target.value);state.measurement=0;state.designMeasurementCorrect=false;el.designFeedback.hidden=true;el.recordCase.hidden=true;renderSpaceButtons();drawCurrentRamp();drawMeasureTool();});
el.language.addEventListener("change",e=>{state.language=e.target.value;applyLanguage();});
el.newTask.addEventListener("click",()=>{if(state.mode==="compare"){const ramps=["A","B","C"],next=ramps[(ramps.indexOf(state.selectedRamp)+1)%ramps.length];selectRamp(next);}else if(state.mode==="design"){const pool=designAngles(),i=pool.indexOf(state.designAngle);state.designAngle=pool[(i+1)%pool.length];state.measurement=0;state.designMeasurementCorrect=false;renderSpaceButtons();el.designFeedback.hidden=true;el.recordCase.hidden=true;drawCurrentRamp();drawMeasureTool();}else generatePlanTask();});

el.language.value=state.language;el.heightSelect.value=state.height.toFixed(2);applyLanguage();renderSpaceButtons();renderRecordedCases();setMode("compare");
