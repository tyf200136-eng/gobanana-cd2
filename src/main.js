// GoBanana — CD preview: sections, crate, booklet, Discman player, i18n, sound
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const T={
 en:{n1:"Services",n2:"Space",n3:"Models",n5:"Packages",lead:"We turn bold ideas into brands, campaigns and content that move people.",book:"Book the space",load:"Reading disc…",tl:"Our services — pick a track",mh:"Hover a case · book the face",c1:"Cyclorama",c2:"Lighting kit",c3:"3D walkthrough soon",slot:"Book a slot →",tour:"Take the tour",ph:"Essential · Pro · Signature",n6:"Work",wnp:"Now playing",wopen:"Open the booklet →",fin:"Last track — your turn",note:"Preview · sample copy, models and packages",un:"Up next",lang:"ع"},
 ar:{n1:"الخدمات",n2:"المساحة",n3:"المودلز",n5:"الباقات",lead:"نحوّل الأفكار الجريئة إلى علامات وحملات ومحتوى يحرّك الناس.",book:"احجز المساحة",load:"جاري قراءة الأسطوانة…",tl:"خدماتنا — اختر المقطع",mh:"مرّر على العلبة · احجز الوجه",c1:"خلفية سايكلوراما",c2:"عدة إضاءة",c3:"جولة 3D قريبًا",slot:"احجز موعد ←",tour:"جولة في المساحة",ph:"الأساسية · الاحترافية · المتكاملة",n6:"أعمالنا",wnp:"يعمل الآن",wopen:"افتح الكتيّب ←",fin:"المقطع الأخير — دورك",note:"معاينة · النصوص والمودلز والباقات مؤقتة",un:"التالي",lang:"EN"}
};
const TRACKS=[["Created to create","Created to create",204],["Tracklist","خدماتنا",178],["Selected work","أعمال مختارة",236],["The Space","المساحة",250],["The Models","المودلز",215],["Packages","الباقات",192],["Let's create","لنبدأ",168]];
const SERV=[["Brand identity","الهوية البصرية","Logo · guidelines","3:24"],["Photography","التصوير","Product · fashion · events","2:58"],["Studio space","المساحة","Hourly · daily","4:10"],["Models","المودلز","Casting · booking","3:02"],["Marketing","التسويق","Campaigns · social","3:45"],["Product management","إدارة المنتجات","Listings · content","2:36"]];
const MODELS=[["Model 01","Editorial"],["Model 02","Commercial"],["Model 03","Fashion"],["Model 04","Lifestyle"],["Model 05","Beauty"]];
const PACKS=[["Essential","الأساسية",["1 studio session","10 edited photos","Delivery in 5 days"],["جلسة تصوير واحدة","١٠ صور معدّلة","تسليم خلال ٥ أيام"]],["Pro","الاحترافية",["Session + model","30 photos + 1 reel","Styling included"],["جلسة + مودل","٣٠ صورة + ريل","التنسيق مشمول"]],["Signature","المتكاملة",["Full campaign","Content + marketing","Dedicated manager"],["حملة كاملة","محتوى + تسويق","مدير حساب مخصص"]]];
let lang="en";
const fmt=s=>Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
const cdHTML=(trk)=>`<div class="cd"><div class="base"></div><div class="rot"><div class="print"><b>GoBanana<s></s></b><small>Creative agency</small></div>${trk?`<div class="trk">${trk}</div>`:""}</div><div class="rain"></div><div class="gloss"></div></div>`;
const sil=k=>{const x=150+(k%2?20:-15),r=k*7%3;return `<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="300" fill="#d9d9d6"/><rect width="300" height="300" fill="url(#dots)" opacity="${.18+r*.05}"/><g class="rough"><circle cx="${x}" cy="${110+r*6}" r="${46+r*4}" fill="url(#dots2)"/><path d="M${x-110} 320 C${x-100} 210 ${x-50} 180 ${x} 180 S${x+100} 210 ${x+110} 320Z" fill="url(#dots2)"/></g><text x="16" y="34" font-family="Courier Prime,monospace" font-size="15" fill="#0B0B0B" letter-spacing="2">GOBANANA / VOL.0${k+1}</text></svg>`};
function render(){
  $("#rows").innerHTML=SERV.map((s,i)=>`<div class="row" data-k="${i}"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="t"><b>${lang==="ar"?s[1]:s[0]}</b><span>${s[2]}</span></span><span class="d">${s[3]}</span></div>`).join("");
  $("#shelf").innerHTML=MODELS.map((m,i)=>`<div class="jc">${cdHTML()}<div class="shell">${sil(i)}</div><div class="tape">GoBanana<small>Models®</small></div><p class="mono"><span>${lang==="ar"?"مودل ٠"+(i+1):m[0]}</span><span>${m[1]}</span></p></div>`).join("");
  $("#packs").innerHTML=PACKS.map((p,i)=>`<div class="pack"><div class="cover">${i===1?`<span class="hot">${lang==="ar"?"الأكثر طلبًا":"Most picked"}</span>`:""}${cdHTML()}<span class="mono">${["Slim case","Jewel case","Double case"][i]} · Side A</span><span class="big">${lang==="ar"?p[1]:p[0]}</span></div><ul>${(lang==="ar"?p[3]:p[2]).map(x=>`<li>${x}</li>`).join("")}</ul><span class="price">SAR —</span></div>`).join("");
  $$(".row").forEach(r=>{const k=+r.dataset.k;r.addEventListener("mouseenter",()=>setLabel(k));r.addEventListener("click",()=>setLabel(k))});
}
function setLabel(k){const s=SERV[k];$("#tltrk").textContent=String(k+1).padStart(2,"0")+" · "+s[0];$$(".row").forEach(r=>r.classList.toggle("act",+r.dataset.k===k))}
const bar=$("#bar");bar.innerHTML=Array.from({length:34},(_,i)=>`<i style="width:${[1,2,1,3,1,2][i*7%6]}px"></i>`).join("");
function setLang(l){lang=l;const d=document.documentElement;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";$$("[data-t]").forEach(e=>{const v=T[l][e.dataset.t];if(v)e.textContent=v});$("#lang").textContent=T[l].lang;render();renderWork();layout();onScroll()}
$("#lang").addEventListener("click",()=>setLang(lang==="en"?"ar":"en"));
render();
const secs=$$("section[data-i]");let idx=0,prog=0,playing=true;
/* ---------- selected work: crate digging ---------- */
const PROJ=[
 {img:"img/p1.jpg",t:["Created to create","Created to create"],s:["Art direction","إخراج فني"],c:"GoBanana",d:["Our own campaign: the disc, the hand and the slash.","حملتنا الخاصة: الأسطوانة واليد والشرطة."]},
 {ty:"y",t:["Summer launch","إطلاق الصيف"],s:["Campaign","حملة"],c:"Client 01"},
 {ty:"k",t:["Night drop","إصدار الليل"],s:["Product shoot","تصوير منتجات"],c:"Client 02"},
 {img:"img/p3.jpg",t:["Models book","كتالوج المودلز"],s:["Casting · Print","اختيار · طباعة"],c:"GoBanana Models",d:["A photocopied lookbook for the GoBanana Models roster.","كتالوج بطابع الفوتوكوبي لمودلز GoBanana."]},
 {ty:"w",t:["Fresh identity","هوية جديدة"],s:["Brand identity","هوية بصرية"],c:"Client 03"},
 {ty:"g",t:["Café menu","منيو مقهى"],s:["Food photography","تصوير أكل"],c:"Client 04"},
 {img:"img/p2.jpg",t:["Jewel case","علبة الأسطوانة"],s:["Packaging","تغليف"],c:"GoBanana",d:["Packaging study built around the CD jewel case.","دراسة تغليف مبنية على علبة السي دي."]},
 {ty:"n",num:"26",t:["SS/26","SS/26"],s:["Fashion editorial","تحريري أزياء"],c:"Client 05"},
 {img:"img/p4.jpg",t:["Hands on","باليد"],s:["Photography","تصوير"],c:"GoBanana",d:["Studio test for hand and product framing.","تجربة استوديو لتأطير اليد مع المنتج."]},
 {ty:"k",t:["Ramadan film","فيلم رمضان"],s:["Video · Social","فيديو · سوشال"],c:"Client 06"}
];
const LL=(a)=>lang==="ar"?a[1]:a[0];
const wsec=$("#work"),wstage=$("#wstage"),crate=$("#crate"),c3=$("#crate3d");
let recs=[],wf=0,wfT=0,wk=-1,S=300;
const cover=p=>p.img?`<img class="m" src="${p.img}" alt="" draggable="false">`:`<div class="ty ${p.ty==="n"?"n y":p.ty}"><span class="mono">${p.c} · 2026</span><b>${p.ty==="n"?p.num:LL(p.t).replace(" ","<br>")}</b><i></i></div>`;
function renderWork(){
  wsec.style.setProperty("--wh",(PROJ.length*48+110)+"vh");
  c3.innerHTML=PROJ.map((p,i)=>`<button class="rec" data-i="${i}" aria-label="${LL(p.t)}">${cover(p)}<span class="tag">${String(i+1).padStart(2,"0")}</span></button>`).join("")+`<div class="cfront mono"><i></i><span>GoBanana — Selected work — Vol.01</span></div>`;
  recs=$$("#crate3d .rec");
  recs.forEach(r=>r.addEventListener("click",()=>openBooklet(+r.dataset.i)));
  $("#wdots").innerHTML=PROJ.map(()=>"<i></i>").join("");
  wk=-1;layoutWork();
}
function layoutWork(){
  const W=crate.clientWidth,H=crate.clientHeight,m=innerWidth<=820;
  S=Math.round(m?Math.min(W*.66,H*.62):Math.min(W*.5,H*.62));
  crate.style.setProperty("--S",S+"px");crate.style.setProperty("--cb",Math.round(S*.3)+"px");
  workScroll();placeRecs();
}
function workScroll(){const r=wsec.getBoundingClientRect();const p=clamp(-r.top/(r.height-innerHeight));wfT=p*(PROJ.length-1)}
function placeRecs(){
  recs.forEach((el,i)=>{const d=i-wf;let tf,op=1,dk=0;
    if(d>=0){tf=`translateZ(${-d*S*.17}px) translateY(${-d*S*.07}px) rotateX(-12deg)`;dk=Math.min(.8,d*.16);op=d>6?0:1}
    else{const t=Math.min(1,-d);tf=`translateZ(${t*S*.1}px) rotateX(${-12+t*96}deg)`;op=t>.85?(1-t)/.15:1;dk=t*.35}
    el.style.transform=tf;el.style.opacity=Math.max(0,op);el.style.setProperty("--dk",dk.toFixed(3));el.style.zIndex=100-i;el.style.pointerEvents=Math.abs(d)<.5?"auto":"none"});
  const k=Math.round(clamp(wf,0,PROJ.length-1));
  if(k!==wk){wk=k;const p=PROJ[k];$("#wnum").textContent=String(k+1).padStart(2,"0");$("#wtitle").textContent=LL(p.t);$("#wmeta").textContent=p.c+" · "+LL(p.s);
    $$("#wdots i").forEach((d,j)=>d.classList.toggle("on",j===k));
    if(idx===secs.indexOf(wsec)){$("#mq").textContent=("Now playing: "+p.t[0]+" — "+p.c).toUpperCase()}}
}
function clamp(v,a=0,b=1){return Math.min(b,Math.max(a,v))}
(function wloop(){wf+=(wfT-wf)*(reduce?1:.1);const r=wsec.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)placeRecs();requestAnimationFrame(wloop)})();
$("#wopen").onclick=()=>openBooklet(wk<0?0:wk);

/* booklet */
const bkw=$("#bkw"),bk=$("#bk");let lastF=null;
function openBooklet(i){
  const p=PROJ[i];lastF=document.activeElement;
  const m=innerWidth<=820,B=Math.round(m?Math.min(innerWidth*.86,(innerHeight-160)/2):Math.min(innerWidth*.44,innerHeight*.74,620));
  bk.style.setProperty("--B",B+"px");
  $("#bkface").innerHTML=cover(p);
  $("#bkback").innerHTML=`<span class="mono">${lang==="ar"?"ملاحظات الإصدار":"Liner notes"}</span><div class="big">${String(i+1).padStart(2,"0")}/</div><div class="liner">${lang==="ar"?"إخراج فني — GoBanana<br>تصوير — GoBanana Studio<br>العميل — ":"Art direction — GoBanana<br>Photography — GoBanana Studio<br>Client — "}${p.c}<br>℗ © 2026</div>`;
  $("#bkpg").innerHTML=`<div><span class="mono" style="color:rgba(11,11,11,.5)">${String(i+1).padStart(2,"0")} / ${String(PROJ.length).padStart(2,"0")}</span><h3>${LL(p.t)}</h3></div><p>${p.d?LL(p.d):(lang==="ar"?"مشروع مؤقت — هنا تنحط القصة الحقيقية والصور والنتائج.":"Placeholder project — the real story, photos and results go here.")}</p><dl><dt>${lang==="ar"?"العميل":"Client"}</dt><dd>${p.c}</dd><dt>${lang==="ar"?"الخدمة":"Service"}</dt><dd>${LL(p.s)}</dd><dt>${lang==="ar"?"السنة":"Year"}</dt><dd>2026</dd></dl><a class="cta" href="#s6" id="bkcta">${lang==="ar"?"ابدأ مشروع مشابه ←":"Start a similar project →"}</a>`;
  $("#bkcta").onclick=()=>closeBooklet();
  bkw.hidden=false;document.body.style.overflow="hidden";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{bkw.classList.add("on");setTimeout(()=>bkw.classList.add("open"),reduce?0:250)}));
  $("#bkx").focus({preventScroll:true});
}
function closeBooklet(){bkw.classList.remove("open");setTimeout(()=>{bkw.classList.remove("on");setTimeout(()=>{bkw.hidden=true;document.body.style.overflow="";lastF&&lastF.focus&&lastF.focus({preventScroll:true})},reduce?0:350)},reduce?0:700)}
$("#bkx").onclick=closeBooklet;$("#bkbg").onclick=closeBooklet;
addEventListener("keydown",e=>{if(!bkw.hidden&&e.key==="Escape")closeBooklet()});


/* scratches */
$$("section").forEach(s=>{for(let i=0;i<3;i++){const d=document.createElement("i");d.className="scratch";d.style.cssText=`top:${Math.random()*100}%;left:${Math.random()*60}%;width:${15+Math.random()*30}%;transform:rotate(${-14+Math.random()*12}deg)`;s.appendChild(d)}});

/* hero geometry: case on the edge, disc slides out */
const hero=$("#s1"),cd=$("#hcd"),cs=$("#hcase"),stk=$("#stk");
let mobile=false,slide=0;
function layout(){
  const W=hero.clientWidth,H=hero.clientHeight;mobile=W<=820;const rtl=document.documentElement.dir==="rtl";
  let S,cx,cy;
  if(mobile){S=Math.min(W*.9,H*.42);cx=W/2;cy=H*.2}else{S=Math.min(H*.82,W*.44);cx=rtl?W-S*.12:S*.12;cy=H*.5}
  Object.assign(cs.style,{width:S+"px",height:S+"px",left:cx-S/2+"px",top:cy-S/2+"px"});
  const D=S*.88,ox=cx-S/2+S*.53,oy=cy;
  Object.assign(cd.style,{width:D+"px",height:D+"px",left:ox-D/2+"px",top:oy-D/2+"px","--fs":D/26+"px"});
  slide=mobile?0:(rtl?-1:1)*S*.58;
  const slideY=mobile?S*.12:0;
  cd.dataset.sx=slide;cd.dataset.sy=slideY;
  Object.assign(stk.style,{left:mobile?"0":(rtl?cx-S*.9:cx+S*.95)+"px",top:cy-S*.46+"px"});
  place();
}
function place(){const on=document.body.classList.contains("on");cd.style.transform=on?`translate(${cd.dataset.sx}px,${cd.dataset.sy}px)`:"none"}
layout();addEventListener("resize",layout);

/* rainbow streak follows the cursor */
let la=40,tla=40;
addEventListener("pointermove",e=>{tla=40+(e.clientX/innerWidth-.5)*120+(e.clientY/innerHeight-.5)*40});

/* player */
function onScroll(){
  const mid=innerHeight*.5;let i=0;secs.forEach((s,k)=>{if(s.getBoundingClientRect().top<=mid)i=k});
  const r=secs[i].getBoundingClientRect();const local=Math.min(Math.max((mid-r.top)/r.height,0),1);
  const max=document.documentElement.scrollHeight-innerHeight;prog=max>0?scrollY/max:0;
  const tr=TRACKS[i],nx=TRACKS[i+1];
  if(i!==idx||!$("#mq").dataset.set){idx=i;$("#mq").dataset.set=1;$("#trn").textContent=String(i+1).padStart(2,"0");$("#mq").textContent=(tr[0]+" — GOBANANA — "+tr[1]).toUpperCase();if(secs[i]===wsec)wk=-1;$("#htrk").textContent=String(i+1).padStart(2,"0")+" · "+tr[0]}
  $("#nxt").textContent=nx?(lang==="ar"?nx[1]:nx[0]):(lang==="ar"?"إعادة من البداية":"Back to track 01");
  $("#time").textContent=fmt(local*tr[2])+" / "+fmt(tr[2]);
  $("#pbar").style.width=prog*100+"%";
}
addEventListener("scroll",()=>{onScroll();workScroll()},{passive:true});
addEventListener("resize",layoutWork);
renderWork();
const go=k=>{k=(k+secs.length)%secs.length;secs[k].scrollIntoView({behavior:reduce?"auto":"smooth"})};
$("#next").onclick=()=>go(idx+1);$("#prev").onclick=()=>go(idx-1);
$("#pp").onclick=()=>{playing=!playing;$("#ppi").innerHTML=playing?'<path d="M4 2h3v12H4zM9 2h3v12H9z"/>':'<path d="M4 2v12l10-6z"/>';$(".lcd .mq span")&&($(".lcd .mq span").style.animationPlayState=playing?"running":"paused");if(audio)audio.g.gain.setTargetAtTime(playing&&sndOn?.35:0,actx.currentTime,.1)};

/* disc whirr (Web Audio, off by default) */
let actx=null,audio=null,sndOn=false;
$("#snd").onclick=()=>{try{
  if(!actx){actx=new (window.AudioContext||window.webkitAudioContext)();const len=actx.sampleRate*2,buf=actx.createBuffer(1,len,actx.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*.05;
    const src=actx.createBufferSource();src.buffer=buf;src.loop=true;const f=actx.createBiquadFilter();f.type="bandpass";f.frequency.value=900;f.Q.value=.8;
    const o=actx.createOscillator();o.frequency.value=120;const og=actx.createGain();og.gain.value=.02;o.connect(og);
    const g=actx.createGain();g.gain.value=0;src.connect(f).connect(g);og.connect(g);g.connect(actx.destination);src.start();o.start();audio={g}}
  sndOn=!sndOn;actx.resume();audio.g.gain.setTargetAtTime(sndOn&&playing?.35:0,actx.currentTime,.1);$("#snd").classList.toggle("on",sndOn);
}catch(e){}};

/* spin loop */
const hrot=$("#hrot");let ang=0,vel=0,last=performance.now();
function tick(t){const dt=Math.min((t-last)/1000,.1);last=t;
  const target=playing&&document.body.classList.contains("on")?140:0;vel+=(target-vel)*Math.min(1,dt*(target?1.2:2));ang+=vel*dt;hrot.style.transform=`rotate(${ang}deg)`;
  la+=(tla-la)*Math.min(1,dt*5);document.documentElement.style.setProperty("--la",la.toFixed(1)+"deg");
  requestAnimationFrame(tick)}
if(!reduce)requestAnimationFrame(tick);

const start=()=>{document.body.classList.add("on");place();onScroll()};
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(start,reduce?0:800));
onScroll();
