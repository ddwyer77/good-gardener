'use strict';

const slots = [...document.querySelectorAll('.float-slot')];
const scatterSurface = document.querySelector('.site-world');
const storagePrefix = `good-gardener-float:${location.pathname || '/'}:`;

function hashString(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function savedPosition(slot) {
  try {
    return JSON.parse(sessionStorage.getItem(`${storagePrefix}${slot.dataset.model}`));
  } catch {
    return null;
  }
}

function savePosition(slot, centerX, centerY) {
  if (!scatterSurface) return;
  try {
    sessionStorage.setItem(`${storagePrefix}${slot.dataset.model}`, JSON.stringify({
      x: centerX / scatterSurface.clientWidth,
      y: centerY / scatterSurface.offsetHeight,
    }));
  } catch {
    // Dragging still works when browser storage is unavailable.
  }
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function setSlotCenter(slot, centerX, centerY) {
  if (!scatterSurface) return;
  const halfWidth = slot.offsetWidth / 2;
  const halfHeight = slot.offsetHeight / 2;
  const x = clamp(centerX, halfWidth, Math.max(halfWidth, scatterSurface.clientWidth - halfWidth));
  const y = clamp(centerY, halfHeight, Math.max(halfHeight, scatterSurface.offsetHeight - halfHeight));
  slot.style.setProperty('--scatter-x', `${x.toFixed(1)}px`);
  slot.style.setProperty('--scatter-y', `${y.toFixed(1)}px`);
  return { x, y };
}

function placeSlots() {
  if (!scatterSurface || !slots.length) return;

  const random = seededRandom(hashString(location.pathname || 'good-gardener'));
  const compact = window.innerWidth < 650;
  const homePage = location.pathname === '/' || location.pathname.endsWith('/index.html');
  const height = Math.max(scatterSurface.offsetHeight, 620);
  const top = compact ? 105 : 90;
  const bottom = Math.max(top + 1, height - (compact ? 90 : 75));
  const band = (bottom - top) / slots.length;
  const xAnchors = compact ? [16, 72, 38, 76, 22] : [10, 64, 34, 70, 18];
  const minX = compact ? 15 : 8;
  const maxX = compact ? 78 : 72;

  slots.forEach((slot, index) => {
    const kind = slot.dataset.model;
    let x = xAnchors[index % xAnchors.length] + (random() - 0.5) * (compact ? 8 : 12);
    let y = top + band * (index + 0.2 + random() * 0.6);
    let size = (compact ? 66 : 82) + random() * (compact ? 28 : 46);
    const widthFactor = kind === 'scuba' ? 1.75 : kind === 'bird' ? 1.35 : 1;
    const tilt = -12 + random() * 24;

    if (homePage && kind === 'plant') {
      x = compact ? 9 : 12;
      y = compact ? 145 : 180;
      size = compact ? 76 : 92;
    }

    slot.style.setProperty('--scatter-size', `${size.toFixed(1)}px`);
    slot.style.setProperty('--scatter-width', `${(size * widthFactor).toFixed(1)}px`);
    slot.style.setProperty('--scatter-tilt', `${tilt.toFixed(1)}deg`);

    const saved = savedPosition(slot);
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      slot.dataset.userMoved = 'true';
      setSlotCenter(slot, saved.x * scatterSurface.clientWidth, saved.y * height);
    } else {
      slot.style.setProperty('--scatter-x', `${Math.max(minX, Math.min(maxX, x)).toFixed(2)}%`);
      slot.style.setProperty('--scatter-y', `${y.toFixed(1)}px`);
    }

    const image = slot.querySelector('.model-fallback');
    if (image) {
      image.draggable = false;
      image.style.animationDelay = `${(-random() * 8).toFixed(2)}s`;
    }
  });
}

function makeDraggable(slot) {
  let drag = null;

  slot.addEventListener('dragstart', event => event.preventDefault());
  slot.addEventListener('pointerdown', event => {
    if (!scatterSurface || event.button > 0) return;
    event.preventDefault();
    event.stopPropagation();
    const surfaceRect = scatterSurface.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      centerX: slotRect.left - surfaceRect.left + slotRect.width / 2,
      centerY: slotRect.top - surfaceRect.top + slotRect.height / 2,
    };
    slot.dataset.userMoved = 'true';
    slot.classList.add('is-dragging');
    slot.setPointerCapture(event.pointerId);
  });

  slot.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    const position = setSlotCenter(
      slot,
      drag.centerX + event.clientX - drag.startX,
      drag.centerY + event.clientY - drag.startY,
    );
    if (position) savePosition(slot, position.x, position.y);
  });

  const finishDrag = event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    slot.classList.remove('is-dragging');
    if (slot.hasPointerCapture(event.pointerId)) slot.releasePointerCapture(event.pointerId);
    drag = null;
  };

  slot.addEventListener('pointerup', finishDrag);
  slot.addEventListener('pointercancel', finishDrag);
  slot.addEventListener('lostpointercapture', () => {
    slot.classList.remove('is-dragging');
    drag = null;
  });
}

let resizeTimer = 0;
placeSlots();
slots.forEach(makeDraggable);
window.addEventListener('load', placeSlots, { once: true });
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(placeSlots, 100);
});
