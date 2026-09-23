'use strict';
const sizeButtons=[...document.querySelectorAll('.size-choice')];
const addButton=document.querySelector('.add-preview');
const status=document.querySelector('.product-status');
const count=document.querySelector('[data-bag-count]');
const thumbButtons=[...document.querySelectorAll('.thumb')];
const heroCrop=document.querySelector('.product-hero .catalog-crop');
let selectedSize='';
let bagCount=0;
thumbButtons.forEach((button,index)=>button.addEventListener('click',()=>{
  thumbButtons.forEach(choice=>choice.classList.toggle('active',choice===button));
  heroCrop?.classList.toggle('zoomed',index===1);
  heroCrop?.classList.toggle('closer',index===2);
}));
sizeButtons.forEach(button=>button.addEventListener('click',()=>{
  selectedSize=button.dataset.size;
  sizeButtons.forEach(choice=>choice.classList.toggle('selected',choice===button));
  status.textContent=`Size ${selectedSize} selected.`;
}));
addButton?.addEventListener('click',()=>{
  if(!selectedSize){status.textContent='Choose a size first.';sizeButtons[0]?.focus();return;}
  bagCount+=1;
  count.textContent=String(bagCount);
  status.textContent=`${addButton.dataset.product}, size ${selectedSize}, added to your preview bag.`;
});
