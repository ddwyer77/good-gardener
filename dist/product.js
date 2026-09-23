'use strict';
const sizeButtons=[...document.querySelectorAll('.size-choice')];
const addButton=document.querySelector('.add-preview');
const status=document.querySelector('.product-status');
const count=document.querySelector('[data-bag-count]');
const thumbButtons=[...document.querySelectorAll('.thumb')];
const heroImage=document.querySelector('.product-main-image');
const menuButton=document.querySelector('.mobile-menu-toggle');
const menu=document.querySelector('#product-menu');
let selectedSize='';
let bagCount=0;
thumbButtons.forEach(button=>button.addEventListener('click',()=>{
  thumbButtons.forEach(choice=>choice.classList.toggle('active',choice===button));
  if(heroImage){heroImage.src=button.dataset.image;heroImage.alt=button.dataset.alt||'';}
}));
sizeButtons.forEach(button=>button.addEventListener('click',()=>{
  selectedSize=button.dataset.size;
  sizeButtons.forEach(choice=>choice.classList.toggle('selected',choice===button));
  if(status) status.textContent=`Size ${selectedSize} selected.`;
}));
addButton?.addEventListener('click',()=>{
  if(!selectedSize){if(status) status.textContent='Choose a size first.';sizeButtons[0]?.focus();return;}
  bagCount+=1;
  if(count) count.textContent=String(bagCount);
  if(status) status.textContent=`${addButton.dataset.product}, size ${selectedSize}, added to your cart preview.`;
});
menuButton?.addEventListener('click',()=>{
  const open=menu?.classList.toggle('is-open')||false;
  menuButton.setAttribute('aria-expanded',String(open));
});
