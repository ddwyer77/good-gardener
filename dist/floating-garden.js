'use strict';

const slots = [...document.querySelectorAll('.float-slot')];
const scatterSurface = document.querySelector('.site-world');

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

function placeSlots() {
  if (!scatterSurface || !slots.length) return;

  const random = seededRandom(hashString(location.pathname || 'good-gardener'));
  const compact = window.innerWidth < 650;
  const height = Math.max(scatterSurface.offsetHeight, 620);
  const top = compact ? 105 : 90;
  const bottom = Math.max(top + 1, height - (compact ? 90 : 75));
  const band = (bottom - top) / slots.length;
  const xAnchors = compact ? [16, 72, 38, 76, 22] : [10, 64, 34, 70, 18];
  const minX = compact ? 15 : 8;
  const maxX = compact ? 78 : 72;

  slots.forEach((slot, index) => {
    const kind = slot.dataset.model;
    const x = xAnchors[index % xAnchors.length] + (random() - 0.5) * (compact ? 8 : 12);
    const y = top + band * (index + 0.2 + random() * 0.6);
    const size = (compact ? 66 : 82) + random() * (compact ? 28 : 46);
    const widthFactor = kind === 'scuba' ? 1.75 : kind === 'bird' ? 1.35 : 1;
    const tilt = -12 + random() * 24;

    slot.style.setProperty('--scatter-x', `${Math.max(minX, Math.min(maxX, x)).toFixed(2)}%`);
    slot.style.setProperty('--scatter-y', `${y.toFixed(1)}px`);
    slot.style.setProperty('--scatter-size', `${size.toFixed(1)}px`);
    slot.style.setProperty('--scatter-width', `${(size * widthFactor).toFixed(1)}px`);
    slot.style.setProperty('--scatter-tilt', `${tilt.toFixed(1)}deg`);

    const image = slot.querySelector('.model-fallback');
    if (image) image.style.animationDelay = `${(-random() * 8).toFixed(2)}s`;
  });
}

let resizeTimer = 0;
placeSlots();
window.addEventListener('load', placeSlots, { once: true });
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(placeSlots, 80);
});
