'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function apply(paused=reduced.matches){
  document.documentElement.classList.toggle('motion-paused',paused);
 }
 reduced.addEventListener('change',event=>apply(event.matches));apply();
})();
