const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

const loaderBar=$("#loaderBar"), loaderPercent=$("#loaderPercent"), loader=$("#loader");
let p=0;
const timer=setInterval(()=>{p+=Math.random()*10+4;if(p>=100){p=100;clearInterval(timer);setTimeout(()=>loader.classList.add("done"),250)}loaderBar.style.width=p+"%";loaderPercent.textContent=Math.floor(p)+"%"},80);

const style=document.createElement("style");
style.textContent=".loader.done{opacity:0;pointer-events:none;transition:opacity .8s}.loader.done .loader-inner{transform:translateY(-30px);transition:transform .8s}";
document.head.appendChild(style);

if(window.Typed){
  new Typed(".home-subtitle-text",{
    strings:[
      "Étudiante en BTS SIO SISR",
      "Futur Ingénieur en Cybersécurité",
      "Optimisation et Sobriété Numérique"
    ],
    typeSpeed:90,
    backSpeed:35,
    backDelay:2400,
    startDelay:400,
    loop:true
  });
}

const contactMap=$("#contactMap");
if(window.L && contactMap){
  const campus=[48.9015798,2.2083588];
  const map=L.map(contactMap,{scrollWheelZoom:false}).setView(campus,16);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker(campus).addTo(map).bindPopup("Paris Ynov Campus<br>12, rue Anatole France, 92000 Nanterre");
}

window.addEventListener("mousemove",e=>{
  gsap.to("#cursorDot",{x:e.clientX,y:e.clientY,duration:.08});
  gsap.to("#cursorRing",{x:e.clientX,y:e.clientY,duration:.35,ease:"power3.out"});
});
$$("a,.magnetic,.menu-btn").forEach(el=>{
  el.addEventListener("mouseenter",()=>gsap.to("#cursorRing",{width:52,height:52,borderColor:"#9BCB3B",duration:.25}));
  el.addEventListener("mouseleave",()=>gsap.to("#cursorRing",{width:30,height:30,borderColor:"rgba(17,17,17,.5)",duration:.25}));
});

if(window.gsap){
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
  document.addEventListener("click",event=>{
    const link=event.target.closest('a[href^="#"]');
    if(!link || link.getAttribute("href")==="#") return;
    const target=document.querySelector(link.getAttribute("href"));
    if(!target) return;
    event.preventDefault();
    const offset=parseFloat(getComputedStyle(target).scrollMarginTop)||0;
    const targetY=window.scrollY+target.getBoundingClientRect().top-offset;
    if(window.location.hash!==link.hash) history.pushState(null,"",link.hash);
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      window.scrollTo(0,targetY);
      return;
    }
    gsap.killTweensOf(window);
    gsap.to(window,{duration:.95,ease:"power2.out",scrollTo:{y:targetY,autoKill:true},onUpdate:()=>ScrollTrigger.update()});
  });
  const quickNav=$(".quick-nav");
  const profileSection=$("#profil");
  const quickNavToggle=$(".quick-nav-toggle");
  const updateQuickNavExpanded=()=>{
    const isExpanded=quickNav.classList.contains("is-pinned")
      || quickNav.matches(":hover, :focus-within")
      || quickNavToggle.matches(":hover, :focus-visible");
    quickNavToggle.setAttribute("aria-expanded",String(isExpanded));
    quickNavToggle.setAttribute("aria-label",isExpanded?"Masquer le menu latéral":"Afficher le menu latéral");
  };
  quickNav.addEventListener("focusin",updateQuickNavExpanded);
  quickNav.addEventListener("focusout",updateQuickNavExpanded);
  quickNav.addEventListener("pointerenter",updateQuickNavExpanded);
  quickNav.addEventListener("pointerleave",updateQuickNavExpanded);
  quickNavToggle.addEventListener("pointerenter",updateQuickNavExpanded);
  quickNavToggle.addEventListener("pointerleave",updateQuickNavExpanded);
  quickNavToggle.addEventListener("focus",updateQuickNavExpanded);
  quickNavToggle.addEventListener("blur",updateQuickNavExpanded);
  quickNavToggle.addEventListener("click",()=>{
    const isPinned=quickNav.classList.toggle("is-pinned");
    quickNavToggle.classList.toggle("is-pinned",isPinned);
    updateQuickNavExpanded();
  });
  quickNavToggle.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      quickNav.classList.remove("is-pinned");
      quickNavToggle.classList.remove("is-pinned");
      quickNavToggle.blur();
      updateQuickNavExpanded();
    }
  });
  quickNav.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      quickNav.classList.remove("is-pinned");
      quickNavToggle.classList.remove("is-pinned");
      quickNavToggle.focus();
      updateQuickNavExpanded();
    }
  });
  const updateQuickNav=()=>{
    const hasScrolled=window.scrollY>=profileSection.offsetTop-80;
    quickNav.classList.toggle("has-scrolled",hasScrolled);
    if(!hasScrolled){
      quickNav.classList.remove("is-pinned");
      quickNavToggle.classList.remove("is-pinned");
      updateQuickNavExpanded();
    }
  };
  window.addEventListener("scroll",updateQuickNav,{passive:true});
  window.addEventListener("resize",updateQuickNav);
  updateQuickNav();
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const stackPanels=gsap.utils.toArray(".stack-panel");
    stackPanels.slice(0,-1).forEach((panel,index)=>{
      gsap.to(panel,{y:-80,scale:.94,opacity:.72,ease:"none",scrollTrigger:{trigger:stackPanels[index+1],start:"top bottom",end:"top 15%",scrub:true,invalidateOnRefresh:true}});
    });
  }
  gsap.utils.toArray(".reveal").forEach(el=>{
    gsap.to(el,{opacity:1,y:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
  });
  gsap.from(".hero .line",{yPercent:120,opacity:0,duration:1.2,stagger:.12,delay:1.1,ease:"power4.out"});
  gsap.from(".hero .eyebrow",{opacity:0,y:20,duration:.8,delay:1,ease:"power3.out"});
  gsap.from(".hero-bottom",{opacity:0,y:25,duration:1,delay:1.55,ease:"power3.out"});
  gsap.utils.toArray(".project-card").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotateY:x*5,rotateX:-y*5,transformPerspective:900,duration:.4});
    });
    card.addEventListener("mouseleave",()=>gsap.to(card,{rotateY:0,rotateX:0,duration:.6}));
  });
}
