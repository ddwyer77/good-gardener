import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';

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
  const height = Math.max(scatterSurface.offsetHeight, 540);
  const top = compact ? 90 : 75;
  const bottom = Math.max(top + 1, height - (compact ? 80 : 65));
  const band = (bottom - top) / slots.length;
  const xAnchors = compact ? [12, 78, 42, 88, 20, 62] : [9, 61, 35, 70, 18, 50];
  const minX = compact ? 16 : 8;
  const maxX = compact ? 84 : 72;

  slots.forEach((slot, index) => {
    const x = xAnchors[index % xAnchors.length] + (random() - 0.5) * (compact ? 10 : 12);
    const y = top + band * (index + 0.2 + random() * 0.6);
    const size = (compact ? 68 : 86) + random() * (compact ? 30 : 48);
    const tilt = -13 + random() * 26;

    slot.style.setProperty('--scatter-x', `${Math.max(minX, Math.min(maxX, x)).toFixed(2)}%`);
    slot.style.setProperty('--scatter-y', `${y.toFixed(1)}px`);
    slot.style.setProperty('--scatter-size', `${size.toFixed(1)}px`);
    slot.style.setProperty('--scatter-tilt', `${tilt.toFixed(1)}deg`);

    const fallback = slot.querySelector('.model-fallback');
    if (fallback) fallback.style.animationDelay = `${(-random() * 7).toFixed(2)}s`;
  });
}

placeSlots();
window.addEventListener('load', placeSlots, { once: true });

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
} catch {
  console.info('Floating garden: showing image fallbacks.');
}

if (renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'floating-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  document.body.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777255, 3));

  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(-200, 400, 500);
  scene.add(light);

  const fill = new THREE.DirectionalLight(0xe6efff, 2);
  fill.position.set(300, -100, 400);
  scene.add(fill);

  const camera = new THREE.OrthographicCamera(0, innerWidth, innerHeight, 0, 0.1, 2000);
  camera.position.z = 1000;

  const models = [];
  let paused = document.documentElement.classList.contains('motion-paused');
  let previous = 0;
  let elapsed = 0;
  let raf = 0;
  let resizeTimer = 0;

  function resize() {
    placeSlots();
    renderer.setSize(innerWidth, innerHeight);
    camera.right = innerWidth;
    camera.top = innerHeight;
    camera.updateProjectionMatrix();
    draw();
  }

  function draw() {
    for (const item of models) {
      const rect = item.slot.getBoundingClientRect();
      item.group.visible =
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        rect.right > 0 &&
        rect.left < innerWidth &&
        rect.width > 0;

      if (!item.group.visible) continue;

      const size = Math.min(rect.width, rect.height) * 0.8;
      item.group.scale.setScalar(size);
      item.group.position.set(
        rect.left + rect.width / 2,
        innerHeight - rect.top - rect.height / 2 + Math.sin(elapsed * item.speed + item.phase) * 5,
        0,
      );
      item.group.rotation.set(
        Math.sin(elapsed * 0.4 + item.phase) * 0.09,
        elapsed * item.spin + item.phase * 0.08,
        Math.sin(elapsed * 0.6 + item.phase) * 0.1,
      );
    }
    renderer.render(scene, camera);
  }

  function tick(time) {
    raf = 0;
    if (paused || document.hidden) return;
    if (!previous) previous = time;
    if (time - previous > 40) {
      elapsed += Math.min((time - previous) / 1000, 0.1);
      previous = time;
      draw();
    }
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (!raf && !paused && !document.hidden) {
      previous = 0;
      raf = requestAnimationFrame(tick);
    }
  }

  window.addEventListener('gg-motion', (event) => {
    paused = event.detail.paused;
    if (paused) {
      cancelAnimationFrame(raf);
      raf = 0;
      draw();
    } else {
      start();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      start();
    }
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 80);
  });

  window.addEventListener('scroll', () => {
    if (paused) draw();
  }, { passive: true });

  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    cancelAnimationFrame(raf);
    slots.forEach((slot) => slot.classList.remove('model-ready'));
    renderer.domElement.hidden = true;
  });

  const loader = new GLTFLoader();

  async function load(kind, path) {
    try {
      const gltf = await loader.loadAsync(path);
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 1 / Math.max(size.x, size.y, size.z);

      for (const slot of slots.filter(
        (candidate) =>
          candidate.dataset.model === kind ||
          (kind === 'peace' && candidate.dataset.model === 'black'),
      )) {
        const model = gltf.scene.clone(true);
        model.position.copy(center).multiplyScalar(-scale);
        model.scale.setScalar(scale);
        model.traverse((object) => {
          if (!object.isMesh) return;
          object.material = object.material.clone();
          object.material.side = THREE.DoubleSide;
          if (slot.dataset.model === 'black') {
            object.material.map = null;
            object.material.color.set('#292b29');
            object.material.metalness = 0.12;
            object.material.roughness = 0.65;
          } else if (kind === 'peace') {
            object.material.metalness = 0.35;
            object.material.roughness = 0.3;
          }
        });

        const group = new THREE.Group();
        group.add(model);
        scene.add(group);
        models.push({
          slot,
          group,
          speed: 0.55 + Math.random() * 0.4,
          spin: (0.22 + Math.random() * 0.25) * (Math.random() > 0.5 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
        });
        slot.classList.add('model-ready');
      }
      draw();
    } catch (error) {
      console.warn('Floating garden model could not load:', kind, error.message);
    }
  }

  resize();
  Promise.all([
    load('plant', './assets/models/plant.glb'),
    load('peace', './assets/models/peace.glb'),
  ]).then(start);
}
