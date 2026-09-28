
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const canvas=$("#graph"),ctx=canvas.getContext("2d");
const C={pink:"#D31F60",wine:"#3B091B",blue:"#4A74A8",grid:"#E5E6EA",axis:"#787A82",mid:"#A7245C"};
let mode="explore",view={xmin:-2*Math.PI,xmax:2*Math.PI,ymin:-5,ymax:5};
let explore={family:"sin",a:2,b:1,h:0,d:0};
let five={family:"sin",a:2,b:1,h:0,d:0,points:[]};
let identify={family:"sin",a:2,b:1,h:0,d:0};

const trig=(f,x)=>f==="sin"?Math.sin(x):Math.cos(x);
const val=(f,x)=>f.a*trig(f.family,f.b*(x-f.h))+f.d;
const period=f=>2*Math.PI/Math.abs(f.b);
const fmt=n=>Math.abs(n)<1e-9?"0":Number(n.toFixed(3)).toString();

function fmtPi(rad){
  const q=rad/Math.PI;
  if(Math.abs(q)<1e-9)return"0";
  const dens=[1,2,3,4,6,8],best={e:99,n:0,d:1};
  let b=best;
  for(const d of dens){const n=Math.round(q*d),e=Math.abs(q-n/d);if(e<b.e)b={e,n,d}}
  if(b.e<1e-4){
    const sign=b.n<0?"−":"",n=Math.abs(b.n);
    if(b.d===1)return n===1?sign+"π":sign+n+"π";
    return sign+(n===1?"":n)+"π/"+b.d;
  }
  return fmt(q)+"π";
}
function formula(f){
  const fam=f.family==="sin"?(typeof locale!=="undefined"&&locale==="en"?"sin":"sen"):"cos";
  const a=f.a===1?"":f.a===-1?"−":fmt(f.a);
  let arg;
  if(Math.abs(f.h)>1e-9){
    const sign=f.h>0?" − ":" + ";
    const inner=`x${sign}${fmtPi(Math.abs(f.h))}`;
    arg=Math.abs(f.b-1)<1e-9?`(${inner})`:`${fmt(f.b)}(${inner})`;
  }else arg=Math.abs(f.b-1)<1e-9?"x":`${fmt(f.b)}x`;
  let s=`y = ${a}${fam}${arg.startsWith("(") ? arg : "(" + arg + ")"}`;
  if(f.d>0)s+=` + ${fmt(f.d)}`;
  if(f.d<0)s+=` − ${fmt(Math.abs(f.d))}`;
  return s;
}

const pxX=x=>(x-view.xmin)/(view.xmax-view.xmin)*canvas.width;
const pxY=y=>canvas.height-(y-view.ymin)/(view.ymax-view.ymin)*canvas.height;
const xFrom=px=>view.xmin+px/canvas.width*(view.xmax-view.xmin);
const yFrom=py=>view.ymin+(canvas.height-py)/canvas.height*(view.ymax-view.ymin);

function grid(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle=C.grid;ctx.lineWidth=1;ctx.font="20px system-ui";ctx.fillStyle="#6b6d73";
  const xs=Math.PI/2;
  for(let k=Math.ceil(view.xmin/xs);k<=Math.floor(view.xmax/xs);k++){
    const x=k*xs,p=pxX(x);ctx.beginPath();ctx.moveTo(p,0);ctx.lineTo(p,canvas.height);ctx.stroke();
    if(k!==0){ctx.textAlign="center";ctx.textBaseline="top";ctx.fillText(fmtPi(x),p,Math.max(8,Math.min(canvas.height-28,pxY(0)+7)))}
  }
  for(let y=Math.ceil(view.ymin);y<=Math.floor(view.ymax);y++){
    const p=pxY(y);ctx.beginPath();ctx.moveTo(0,p);ctx.lineTo(canvas.width,p);ctx.stroke();
    if(y!==0){ctx.textAlign="right";ctx.textBaseline="middle";ctx.fillText(y,Math.max(34,Math.min(canvas.width-7,pxX(0)-7)),p)}
  }
  ctx.strokeStyle=C.axis;ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(0,pxY(0));ctx.lineTo(canvas.width,pxY(0));ctx.stroke();
  ctx.beginPath();ctx.moveTo(pxX(0),0);ctx.lineTo(pxX(0),canvas.height);ctx.stroke();
}
function drawFn(f,color,w=5,dash=[]){
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=w;ctx.setLineDash(dash);ctx.beginPath();
  for(let i=0;i<=canvas.width;i++){const x=xFrom(i),y=val(f,x),p=pxY(y);if(i===0)ctx.moveTo(i,p);else ctx.lineTo(i,p)}
  ctx.stroke();ctx.restore();
}
function midline(f){
  const p=pxY(f.d);ctx.save();ctx.strokeStyle=C.mid;ctx.globalAlpha=.35;ctx.setLineDash([10,8]);ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(0,p);ctx.lineTo(canvas.width,p);ctx.stroke();ctx.restore();
}
function drawPts(){
  five.points.forEach((p,i)=>{const x=pxX(p.x),y=pxY(p.y);ctx.beginPath();ctx.fillStyle=C.wine;ctx.arc(x,y,8,0,2*Math.PI);ctx.fill();ctx.fillStyle=C.wine;ctx.font="bold 20px system-ui";ctx.fillText(i+1,x+10,y-8)})
}
function render(){
  grid();
  if(mode==="explore"){
    if($("#showBase").checked)drawFn({family:explore.family,a:1,b:1,h:0,d:0},C.blue,3,[10,8]);
    midline(explore);drawFn(explore,C.pink);
  } else if(mode==="five"){
    midline(five);drawFn(five,C.pink);drawPts();
  } else { midline(identify);drawFn(identify,C.pink); }
}
function resize(){
  const r=canvas.parentElement.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  canvas.width=Math.max(720,Math.round(r.width*dpr));canvas.height=Math.round(canvas.width*9/16);render();
}
window.addEventListener("resize",resize);

function setMode(m){
  mode=m;$$(".tab").forEach(x=>x.classList.toggle("active",x.dataset.mode===m));
  $("#explore").classList.toggle("hidden",m!=="explore");
  $("#five").classList.toggle("hidden",m!=="five");
  $("#identify").classList.toggle("hidden",m!=="identify");
  $("#baseLegend").classList.toggle("hidden",m!=="explore");
  $("#pointLegend").classList.toggle("hidden",m!=="five");
  const meta={explore:["Explorar","Transforma la función y observa la gráfica"],five:["Construir","Marca cinco puntos para construir un ciclo"],identify:["Interpretar","Reconstruye la función a partir de la gráfica"]}[m];
  $("#kicker").textContent=meta[0];$("#modeTitle").textContent=meta[1];
  $("#graphMsg").textContent=m==="five"?"También puedes hacer clic sobre la gráfica para aproximar un punto.":"";
  render();
}
$$(".tab").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));

function updateExplore(){
  explore={family:$("#family").value,a:+$("#a").value,b:+$("#b").value,h:+$("#h").value*Math.PI,d:+$("#d").value};
  $("#ao").textContent=fmt(explore.a);$("#bo").textContent=fmt(explore.b);$("#ho").textContent=fmtPi(explore.h);$("#do").textContent=fmt(explore.d);
  $("#formula").textContent=formula(explore);$("#amp").textContent=fmt(Math.abs(explore.a));$("#per").textContent=fmtPi(period(explore));
  $("#shift").textContent=fmtPi(explore.h);$("#mid").textContent="y = "+fmt(explore.d);render();
}
["family","a","b","h","d","showBase"].forEach(id=>$("#"+id).addEventListener("input",updateExplore));

const choice=a=>a[Math.floor(Math.random()*a.length)];
function randomFn(){
  return {family:choice(["sin","cos"]),a:choice([-3,-2,-1,1,2,3]),b:choice([.5,1,1.5,2]),h:choice([-1,-.5,-.25,0,.25,.5,1])*Math.PI,d:choice([-2,-1,0,1,2])};
}
function newFive(){
  five={...randomFn(),points:[]};fitChallenge(five);$("#fiveFeedback").className="feedback";$("#fiveFeedback").textContent="";updateFive();render();
}
function updateFive(){
  $("#fiveFormula").textContent=formula(five);
  const box=$("#pointList");box.innerHTML="";
  if(!five.points.length){box.innerHTML=`<p class="muted">${tt("empty")}</p>`;return}
  five.points.forEach((p,i)=>{const d=document.createElement("div");d.className="chip";d.innerHTML=`<span>${i+1}. (${fmtPi(p.x)}, ${fmt(p.y)})</span><button>×</button>`;d.querySelector("button").onclick=()=>{five.points.splice(i,1);updateFive();render()};box.appendChild(d)})
}
function addPoint(xPi,y){
  const fb=$("#fiveFeedback");
  if(five.points.length>=5){fb.className="feedback warn";fb.textContent=tt("full");return}
  if(!Number.isFinite(xPi)||!Number.isFinite(y))return;
  five.points.push({x:xPi*Math.PI,y});fb.className="feedback";fb.textContent=tt("added");updateFive();render();
}
$("#addPoint").onclick=()=>{const xx=$("#px").value.trim(),yy=$("#py").value.trim();if(xx===""||yy==="")return;addPoint(Number(xx),Number(yy))};
$("#clearFive").onclick=()=>{five.points=[];updateFive();render()};
$("#newFive").onclick=newFive;

function targetFive(f){
  const T=period(f),out=[];for(let i=0;i<5;i++){const x=f.h+i*T/4;out.push({x,y:val(f,x)})}return out;
}
function checkFive(){
  const fb=$("#fiveFeedback");if(five.points.length!==5){fb.className="feedback warn";fb.textContent=tt("need");return}
  const target=targetFive(five),used=new Set();let matched=0,dup=false;
  for(const p of five.points){
    let found=-1;for(let j=0;j<target.length;j++)if(Math.abs(p.x-target[j].x)<.045*Math.PI&&Math.abs(p.y-target[j].y)<.16){found=j;break}
    if(found>=0){if(used.has(found))dup=true;else{used.add(found);matched++}}
  }
  if(matched===5&&!dup){fb.className="feedback good";fb.textContent=tt("ok")}
  else if(dup){fb.className="feedback warn";fb.textContent=tt("duplicate")}
  else{fb.className="feedback bad";fb.textContent=tt("wrong")}
}
$("#checkFive").onclick=checkFive;

// Mouse and touch: dragging pans the viewport; a tap adds a point only in five-point mode.
let gesture=null,ignoreClick=false;
canvas.addEventListener("pointerdown",e=>{
  if(e.button!==0)return;
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,original:{...view},moved:false};
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove",e=>{
  if(!gesture||e.pointerId!==gesture.id)return;
  const r=canvas.getBoundingClientRect(),dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(Math.hypot(dx,dy)>5)gesture.moved=true;
  if(!gesture.moved)return;
  const w=gesture.original.xmax-gesture.original.xmin,h=gesture.original.ymax-gesture.original.ymin;
  view.xmin=gesture.original.xmin-dx/r.width*w;
  view.xmax=gesture.original.xmax-dx/r.width*w;
  view.ymin=gesture.original.ymin+dy/r.height*h;
  view.ymax=gesture.original.ymax+dy/r.height*h;
  canvas.classList.add("dragging");render();
});
canvas.addEventListener("pointerup",e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const wasDrag=gesture.moved;gesture=null;canvas.classList.remove("dragging");
  if(wasDrag||mode!=="five")return;
  const r=canvas.getBoundingClientRect(),sx=canvas.width/r.width,sy=canvas.height/r.height;
  let x=xFrom((e.clientX-r.left)*sx),y=yFrom((e.clientY-r.top)*sy);
  x=Math.round((x/Math.PI)*8)/8*Math.PI;y=Math.round(y*4)/4;
  addPoint(x/Math.PI,y);
});
canvas.addEventListener("pointercancel",()=>{gesture=null;canvas.classList.remove("dragging")});

function zoomAt(factor,fx=.5,fy=.5){
  const w=view.xmax-view.xmin,h=view.ymax-view.ymin;
  const cx=view.xmin+w*fx,cy=view.ymax-h*fy;
  const nw=Math.min(80*Math.PI,Math.max(Math.PI/4,w*factor));
  const nh=Math.min(100,Math.max(1,h*factor));
  view={xmin:cx-nw*fx,xmax:cx+nw*(1-fx),ymin:cy-nh*(1-fy),ymax:cy+nh*fy};
  render();
}
canvas.addEventListener("wheel",e=>{
  e.preventDefault();const r=canvas.getBoundingClientRect();
  zoomAt(e.deltaY>0?1.12:1/1.12,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
},{passive:false});
$("#zoomIn").onclick=()=>zoomAt(.8);
$("#zoomOut").onclick=()=>zoomAt(1.25);
function fitChallenge(fn){
  const t=period(fn),left=Math.min(-Math.PI,fn.h-t*.25),right=Math.max(Math.PI,fn.h+t*1.25);
  const range=Math.max(4,Math.abs(fn.a)+Math.abs(fn.d)+1);
  view={xmin:left,xmax:right,ymin:-range,ymax:range};
}
function newGraph(){identify=randomFn();fitChallenge(identify);$("#identifyFeedback").className="feedback";$("#identifyFeedback").textContent="";render()}
function guess(){return{family:$("#gf").value,a:+$("#ga").value,b:+$("#gb").value,h:+$("#gh").value*Math.PI,d:+$("#gd").value}}
function updateGuess(){$("#guessFormula").textContent=formula(guess())}
["gf","ga","gb","gh","gd"].forEach(id=>$("#"+id).addEventListener("input",updateGuess));
$("#newGraph").onclick=newGraph;
$("#checkGraph").onclick=()=>{
  const g=guess(),fb=$("#identifyFeedback");
  if(![g.a,g.b,g.h,g.d].every(Number.isFinite)||g.b<=0){fb.className="feedback warn";fb.textContent=tt("invalid");return}
  let err=0;for(let i=0;i<=300;i++){const x=view.xmin+(view.xmax-view.xmin)*i/300;err=Math.max(err,Math.abs(val(g,x)-val(identify,x)))}
  if(err<.08){fb.className="feedback good";fb.textContent=tt("correctFn")}
  else{fb.className="feedback bad";fb.textContent=tt("wrongFn")}
};

const I18N={
  es:{eyebrow:"Módulo V · Laboratorio interactivo",title:"Laboratorio de funciones sinusoidales",subtitle:"Representación y análisis de funciones seno y coseno.",
    tabs:["Explorar","Cinco puntos","Identificar función"],reset:"Restablecer vista",zoomIn:"Acercar",zoomOut:"Alejar",
    modes:{explore:["Explorar","Transforma la función y observa la gráfica"],five:["Construir","Marca cinco puntos para construir un ciclo"],identify:["Interpretar","Reconstruye la función a partir de la gráfica"]},
    legend:["Función","Función base","Tus puntos"],ctrl:"Controles",family:"Familia",families:["seno","coseno"],base:"Mostrar función base",current:"Función actual",metrics:["Amplitud","Período","Desplazamiento","Línea media"],
    fiveTitle:"Construye un ciclo con cinco puntos",fiveIntro:"Calcula un ciclo completo y coloca sus cinco puntos de referencia. El laboratorio solo comprobará tu propuesta.",challenge:"Función del ejercicio",newExercise:"Nuevo ejercicio",clear:"Borrar puntos",add:"Agregar punto",verifyPoints:"Comprobar cinco puntos",
    identifyTitle:"Identifica una función a partir de su gráfica",identifyIntro:"Propón una función seno o coseno equivalente. Se comprueba la curva completa, no una cadena exacta de símbolos.",newGraph:"Nueva gráfica",proposal:"Tu propuesta",verifyFn:"Comprobar función",
    footer:"Las funciones usan radianes. En h/π y x/π escribe el múltiplo de π, por ejemplo 0.5 para π/2.",
    graphHint:"Puedes hacer clic para colocar un punto. Arrastra para desplazar la vista y usa + o − para acercar o alejar.",
    empty:"Aún no has agregado puntos.",full:"Ya tienes cinco puntos. Borra uno si deseas sustituirlo.",added:"Punto agregado.",need:"Necesitas exactamente cinco puntos antes de comprobar.",ok:"Tus cinco puntos corresponden a un ciclo correcto.",duplicate:"Alguno de los cinco puntos está repetido.",wrong:"Hay puntos que no coinciden con los cinco puntos de referencia del ciclo. Revisa período, desplazamiento y orden vertical.",invalid:"Introduce valores válidos; b debe ser positivo.",correctFn:"Tu expresión representa la misma función en el intervalo mostrado.",wrongFn:"La expresión no coincide con toda la curva. Revisa línea media, amplitud y período antes de ajustar el desplazamiento."},
  en:{eyebrow:"Module V · Interactive laboratory",title:"Sinusoidal functions laboratory",subtitle:"Representation and analysis of sine and cosine functions.",
    tabs:["Explore","Five points","Identify function"],reset:"Reset view",zoomIn:"Zoom in",zoomOut:"Zoom out",
    modes:{explore:["Explore","Transform the function and observe the graph"],five:["Construct","Mark five points to build one cycle"],identify:["Interpret","Reconstruct the function from its graph"]},
    legend:["Function","Base function","Your points"],ctrl:"Controls",family:"Family",families:["sine","cosine"],base:"Show base function",current:"Current function",metrics:["Amplitude","Period","Horizontal shift","Midline"],
    fiveTitle:"Build one cycle with five points",fiveIntro:"Calculate a complete cycle and place its five reference points. The laboratory only checks your proposal.",challenge:"Exercise function",newExercise:"New exercise",clear:"Clear points",add:"Add point",verifyPoints:"Check five points",
    identifyTitle:"Identify a function from its graph",identifyIntro:"Propose an equivalent sine or cosine expression. The full curve is checked, rather than an exact string of symbols.",newGraph:"New graph",proposal:"Your proposal",verifyFn:"Check function",
    footer:"Functions use radians. In h/π and x/π, enter the multiple of π, for example 0.5 for π/2.",
    graphHint:"Click to place a point. Drag to pan, and use + or − to zoom.",
    empty:"You have not added any points yet.",full:"You already have five points. Delete one to replace it.",added:"Point added.",need:"You need exactly five points before checking.",ok:"Your five points match a correct full cycle.",duplicate:"One of the five points is duplicated.",wrong:"Some points do not match the five reference points. Review period, horizontal shift, and vertical order.",invalid:"Enter valid values; b must be positive.",correctFn:"Your expression represents the same function over the displayed interval.",wrongFn:"The expression does not match the entire curve. Review midline, amplitude, and period before adjusting the shift."}
};
let locale="es";const tt=k=>I18N[locale][k];
function directText(el,value){
  const textNode=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());
  if(textNode)textNode.textContent=value;else el.insertBefore(document.createTextNode(value),el.firstChild);
}
function applyLanguage(){
  const v=I18N[locale];document.documentElement.lang=locale;document.title=v.title;
  $(".eyebrow").textContent=v.eyebrow;$("#title").textContent=v.title;$("#subtitle").textContent=v.subtitle;
  $$(".tab").forEach((e,i)=>e.textContent=v.tabs[i]);$("#reset").textContent=v.reset;
  $("#zoomIn").setAttribute("aria-label",v.zoomIn);$("#zoomOut").setAttribute("aria-label",v.zoomOut);
  $$(".legend span").forEach((el,i)=>directText(el,v.legend[i]));
  $("#explore h3").textContent=v.ctrl;directText($("#explore>label"),v.family);
  $$("#family option").forEach((el,i)=>el.textContent=v.families[i]);
  $$("#gf option").forEach((el,i)=>el.textContent=v.families[i]);
  directText($("#explore .check"),v.base);
  $("#explore .formula small").textContent=v.current;
  $$("#explore .metrics small").forEach((el,i)=>el.textContent=v.metrics[i]);
  $("#five h3").textContent=v.fiveTitle;$("#five>p").textContent=v.fiveIntro;
  $("#five .formula small").textContent=v.challenge;$("#newFive").textContent=v.newExercise;
  $("#clearFive").textContent=v.clear;$("#addPoint").textContent=v.add;$("#checkFive").textContent=v.verifyPoints;
  $("#identify h3").textContent=v.identifyTitle;$("#identify>p").textContent=v.identifyIntro;
  $("#newGraph").textContent=v.newGraph;directText($("#identify .guess label"),v.family);
  $("#identify .formula small").textContent=v.proposal;$("#checkGraph").textContent=v.verifyFn;
  $("footer").textContent=v.footer;
  const [kick,title]=v.modes[mode];$("#kicker").textContent=kick;$("#modeTitle").textContent=title;
  $("#graphMsg").textContent=mode==="five"?v.graphHint:"";
  updateExplore();updateFive();updateGuess();
}
$("#lang").onclick=()=>{locale=locale==="es"?"en":"es";$("#lang").textContent=locale==="es"?"EN":"ES";applyLanguage()};
$("#reset").onclick=()=>{view={xmin:-2*Math.PI,xmax:2*Math.PI,ymin:-5,ymax:5};render()};

// Localize feedback while retaining the same validation logic.
const origSetMode=setMode;
setMode=function(m){origSetMode(m);const [kick,title]=I18N[locale].modes[m];$("#kicker").textContent=kick;$("#modeTitle").textContent=title;$("#graphMsg").textContent=m==="five"?tt("graphHint"):""};
newFive();newGraph();updateExplore();updateGuess();resize();setMode("explore");applyLanguage();
