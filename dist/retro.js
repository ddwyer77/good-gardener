'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function apply(paused=reduced.matches){
  document.documentElement.classList.toggle('motion-paused',paused);
  window.dispatchEvent(new CustomEvent('gg-motion',{detail:{paused}}));
 }
 reduced.addEventListener('change',event=>apply(event.matches));apply();
})();
