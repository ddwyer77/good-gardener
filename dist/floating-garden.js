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

function elementRects(selector) {
  if (!scatterSurface) return [];
  const surfaceRect = scatterSurface.getBoundingClientRect();
  return [...document.querySelectorAll(selector)]
    .filter(element => !element.closest('.garden-overlay'))
    .map(element => element.getBoundingClientRect())
    .filter(rect => rect.width > 0 && rect.height > 0)
    .map(rect => ({
      left: rect.left - surfaceRect.left,
      right: rect.right - surfaceRect.left,
      top: rect.top - surfaceRect.top,
      bottom: rect.bottom - surfaceRect.top,
    }));
}

function overlapArea(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return width * height;
}

function openContentPosition(width, height, random, hardBlockers, softBlockers, placed, index) {
  if (!scatterSurface) return null;
  const surfaceRect = scatterSurface.getBoundingClientRect();
  const main = scatterSurface.querySelector('main');
  const mainRect = main?.getBoundingClientRect();
  const contentLeft = mainRect ? Math.max(0, mainRect.left - surfaceRect.left) : 0;
  const contentRight = mainRect ? Math.min(surfaceRect.width, mainRect.right - surfaceRect.left) : surfaceRect.width;
  const contentTop = mainRect ? Math.max(0, mainRect.top - surfaceRect.top) : 0;
  const contentBottom = mainRect ? Math.min(scatterSurface.offsetHeight, mainRect.bottom - surfaceRect.top) : scatterSurface.offsetHeight;
  const minX = contentLeft + width / 2 + 4;
  const maxX = contentRight - width / 2 - 4;
  const minY = contentTop + height / 2 + 12;
  const maxY = contentBottom - height / 2 - 12;
  if (minX >= maxX || minY >= maxY) return null;

  const usableHeight = maxY - minY;
  const bandHeight = usableHeight / slots.length;
  const bandCenter = minY + (index + 0.5) * bandHeight;
  let best = null;

  for (let attempt = 0; attempt < 300; attempt += 1) {
    const x = minX + random() * (maxX - minX);
    const y = clamp(bandCenter + (random() - 0.5) * Math.min(180, bandHeight * 0.7), minY, maxY);
    const candidate = {
      left: x - width / 2,
      right: x + width / 2,
      top: y - height / 2,
      bottom: y + height / 2,
    };
    const candidateArea = width * height;
    const controlOverlap = hardBlockers.reduce((total, blocker) => total + overlapArea(candidate, blocker), 0) / candidateArea;
    const contentOverlap = softBlockers.reduce((total, blocker) => total + overlapArea(candidate, blocker), 0) / candidateArea;
    const floaterOverlap = placed.reduce((total, other) => total + overlapArea(candidate, other), 0) / candidateArea;
    const distanceFromBand = Math.abs(y - bandCenter) / Math.max(1, bandHeight);
    const score = controlOverlap * 40 + contentOverlap * 2 + floaterOverlap * 80 + distanceFromBand;

    if (!best || score < best.score) best = { x, y, rect: candidate, score };
    if (score < 0.04) break;
  }
  return best;
}

function lanePosition(width, height, random, index, mainHeight) {
  if (!scatterSurface) return null;
  const anchors = [14, 42, 75, 28, 68];
  const rows = [0, 0, 0, 1, 1];
  const rowY = rows[index % rows.length] ? 158 : 62;
  const x = scatterSurface.clientWidth * ((anchors[index % anchors.length] + (random() - 0.5) * 4) / 100);
  const y = mainHeight + rowY + (random() - 0.5) * 10;
  return {
    x: clamp(x, width / 2, scatterSurface.clientWidth - width / 2),
    y: clamp(y, mainHeight + height / 2 + 8, scatterSurface.offsetHeight - height / 2 - 10),
  };
}

function placeSlots() {
  if (!scatterSurface || !slots.length) return;

  const random = seededRandom(hashString(location.pathname || 'good-gardener'));
  const compact = window.innerWidth < 650;
  scatterSurface.classList.remove('has-garden-lane');

  const main = scatterSurface.querySelector('main');
  const mainHeight = main?.offsetHeight || 620;
  const hardBlockers = elementRects([
    'main button', 'main select', 'main input', 'main textarea',
    'main summary', 'main .size-options', 'main .add-to-cart', '.page-tools',
  ].join(','));
  const softBlockers = elementRects([
    'main h1', 'main h2', 'main h3', 'main p', 'main li', 'main address',
    'main a', 'main table', 'main details', 'main img:not(.model-fallback)',
  ].join(','));
  const placed = [];

  slots.forEach((slot, index) => {
    const kind = slot.dataset.model;
    const size = (compact ? 54 : 72) + random() * (compact ? 12 : 24);
    const widthFactor = kind === 'scuba' ? 1.75 : kind === 'bird' ? 1.35 : 1;
    const width = size * widthFactor;
    const tilt = -12 + random() * 24;

    slot.style.setProperty('--scatter-size', `${size.toFixed(1)}px`);
    slot.style.setProperty('--scatter-width', `${width.toFixed(1)}px`);
    slot.style.setProperty('--scatter-tilt', `${tilt.toFixed(1)}deg`);

    const saved = savedPosition(slot);
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      slot.dataset.userMoved = 'true';
      setSlotCenter(slot, saved.x * scatterSurface.clientWidth, saved.y * scatterSurface.offsetHeight);
    } else {
      const position = openContentPosition(width, size, random, hardBlockers, softBlockers, placed, index);
      if (!position) scatterSurface.classList.add('has-garden-lane');
      const fallback = position || lanePosition(width, size, random, index, mainHeight);
      if (fallback) {
        setSlotCenter(slot, fallback.x, fallback.y);
        placed.push(fallback.rect || {
          left: fallback.x - width / 2,
          right: fallback.x + width / 2,
          top: fallback.y - size / 2,
          bottom: fallback.y + size / 2,
        });
      }
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
