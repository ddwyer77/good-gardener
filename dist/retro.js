'use strict';
(()=>{
 const toggle=document.getElementById('motion-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let saved=null;try{saved=localStorage.getItem('gg-motion')}catch{}
 let paused=saved===null?reduced.matches:saved==='paused';
 const pictures=[...document.querySelectorAll('.retro-gif')];
 function freeze(img){
   if(!img.complete||!img.naturalWidth)return;
   let canvas=img.parentElement.querySelector('canvas');
   if(!canvas){canvas=document.createElement('canvas');canvas.width=88;canvas.height=31;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',img.alt);img.after(canvas)}
   canvas.getContext('2d').drawImage(img,0,0,88,31);canvas.hidden=!paused;canvas.style.display=paused?'block':'none';img.style.display=paused?'none':'block';
 }
 function apply(){
  document.documentElement.classList.toggle('motion-paused',paused);
  toggle.textContent=paused?'Play animations':'Pause animations';toggle.setAttribute('aria-pressed',String(paused));
  pictures.forEach(freeze);window.dispatchEvent(new CustomEvent('gg-motion',{detail:{paused}}));
 }
 pictures.forEach(img=>img.addEventListener('load',()=>freeze(img)));
 toggle.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('gg-motion',paused?'paused':'playing')}catch{}apply()});
 reduced.addEventListener('change',e=>{paused=e.matches;apply()});apply();
})();
