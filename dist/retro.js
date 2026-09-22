'use strict';
(()=>{
 const toggle=document.getElementById('motion-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let saved=null;try{saved=localStorage.getItem('gg-motion')}catch{}
 let paused=saved===null?reduced.matches:saved==='paused';
 function apply(){
  document.documentElement.classList.toggle('motion-paused',paused);
  toggle.textContent=paused?'Play animations':'Pause animations';toggle.setAttribute('aria-pressed',String(paused));
  window.dispatchEvent(new CustomEvent('gg-motion',{detail:{paused}}));
 }
 toggle.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('gg-motion',paused?'paused':'playing')}catch{}apply()});
 reduced.addEventListener('change',e=>{paused=e.matches;apply()});apply();
})();
