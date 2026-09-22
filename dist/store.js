'use strict';
const bag = new Map();
const items = document.querySelector('#cart-items');
const status = document.querySelector('#status');
function renderBag(){
  items.replaceChildren();
  let count=0;
  for(const [key,item] of bag){
    count+=item.quantity;
    const row=document.createElement('div');row.className='cart-line';
    const text=document.createElement('span');text.textContent=`${item.name} · ${item.size} × ${item.quantity}`;
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.setAttribute('aria-label',`Remove ${item.name}, size ${item.size}`);
    remove.addEventListener('click',()=>{bag.delete(key);renderBag();status.textContent=`${item.name} removed from your preview bag.`;document.querySelector('[data-add]').focus();});
    row.append(text,remove);items.append(row);
  }
  if(!count){const empty=document.createElement('p');empty.textContent='Your bag is empty.';items.append(empty);}
  document.querySelector('#cart-count').textContent=String(count);
}
document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.add,name=button.dataset.name,size=document.getElementById(`${id}-size`).value;
  const key=`${id}-${size}`,existing=bag.get(key);
  bag.set(key,{name,size,quantity:existing?existing.quantity+1:1});renderBag();status.textContent=`${name}, size ${size}, added to your preview bag.`;
}));
