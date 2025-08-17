import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'https://unpkg.com/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'https://unpkg.com/three@0.160.0/examples/jsm/libs/lil-gui.module.min.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import { geoMercator, geoPath, geoCentroid } from 'https://cdn.jsdelivr.net/npm/d3-geo@3.1.1/+esm';
import { feature as topojsonFeature } from 'https://cdn.jsdelivr.net/npm/topojson-client@3/+esm';

// --- DOM references
const container = document.getElementById('scene-container');
const labelLayer = document.getElementById('label-layer');
const kpiCardsEl = document.getElementById('kpi-cards');
const btnPlay = document.getElementById('btn-play');
const btnDayNight = document.getElementById('btn-daynight');
const filterDisciplineEl = document.getElementById('filter-discipline');
const filterYearEl = document.getElementById('filter-year');
const chartEl = document.getElementById('chart');
const popover = document.getElementById('popover');
const popoverClose = document.getElementById('popover-close');
const popoverContent = document.getElementById('popover-content');

// --- Scene core
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f1a);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 2000);
camera.position.set(-120, 220, 260);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 80;
controls.maxDistance = 700;
controls.maxPolarAngle = Math.PI * 0.49;

// Lights
const ambient = new THREE.AmbientLight(0xaec6ff, 0.75);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
dirLight.position.set(-200, 300, 200);
dirLight.castShadow = true;
scene.add(dirLight);

// Ground grid for subtle reference
const grid = new THREE.GridHelper(1600, 40, 0x16324a, 0x0f2740);
grid.position.y = -2;
scene.add(grid);

// Glow-like fog
scene.fog = new THREE.FogExp2(0x0b0f1a, 0.0012);

// Data placeholders (KPI by canton)
const cantonData = {
  ZH: { name: 'Zürich', successRate: 0.91, graduation: 0.88, satisfaction: 0.82, mooc: 120, projects: 18 },
  GE: { name: 'Genève', successRate: 0.87, graduation: 0.84, satisfaction: 0.8, mooc: 96, projects: 14 },
  VD: { name: 'Vaud', successRate: 0.89, graduation: 0.86, satisfaction: 0.81, mooc: 102, projects: 16 },
  BS: { name: 'Basel-Stadt', successRate: 0.88, graduation: 0.85, satisfaction: 0.79, mooc: 90, projects: 12 }
};

// Experience/skills popover content per sample canton
const cantonPortfolio = {
  GE: {
    title: 'Analyses pédagogiques – Canton de Genève',
    text: 'Études de réussite par établissement, corrélations entre engagement étudiant et taux de diplomation, recommandations pour parcours individualisés.',
    tags: ['Python', 'SQL', 'Dashboards', 'A/B Testing', 'Segmentation']
  },
  VD: {
    title: 'Projet données MOOC – Canton de Vaud',
    text: 'Analyse des parcours MOOC (EPFL/UNIL), modélisation des facteurs d’achèvement et stratégies d’augmentation de l’engagement.',
    tags: ['R', 'D3.js', 'Survival Analysis', 'Causal ML']
  },
  ZH: {
    title: 'Optimisation admissions – Canton de Zurich',
    text: 'Prédiction de réussite académique, ajustement des seuils d’admission et répartition des ressources pédagogiques.',
    tags: ['Python', 'XGBoost', 'MLOps', 'Explainability']
  },
  BS: {
    title: 'Satisfaction étudiante – Bâle',
    text: 'Dashboard interactif des retours étudiants, clustering des feedbacks et priorisation des actions pédagogiques.',
    tags: ['NLP', 'Topic Modeling', 'Plotly']
  }
};

// Fetch Swiss cantons TopoJSON (external) and convert to GeoJSON
const CANTONS_TOPOJSON_URL = 'https://unpkg.com/swiss-maps@4/2021/ch-combined.json';

// Projection setup centered on Switzerland
const projection = geoMercator().center([8.2275, 46.8182]).translate([0, 0]);
const pathGen = geoPath(projection);

// Containers
const cantonsGroup = new THREE.Group();
scene.add(cantonsGroup);
// Lay flat on XZ plane so Y is elevation
cantonsGroup.rotation.x = -Math.PI / 2;

// State
let cantonMeshes = [];
let cantonCentroids = {};
let currentTheme = 'day';
let playing = false;

// Raycaster for interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

function updateRendererSize() {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

window.addEventListener('resize', updateRendererSize);

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
});

container.addEventListener('click', () => {
  if (hovered && hovered.userData && hovered.userData.code) {
    const code = hovered.userData.code;
    const portfolio = cantonPortfolio[code];
    if (portfolio) {
      showPopover(portfolio.title, portfolio.text, portfolio.tags);
    }
    updateChartForCanton(code);
  }
});

popoverClose.addEventListener('click', () => popover.setAttribute('hidden', ''));

function showPopover(title, text, tags) {
  popoverContent.innerHTML = '';
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  const textEl = document.createElement('p');
  textEl.textContent = text;
  const tagsEl = document.createElement('div');
  tagsEl.className = 'tags';
  for (const t of tags) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    tagsEl.appendChild(span);
  }
  popoverContent.appendChild(titleEl);
  popoverContent.appendChild(textEl);
  popoverContent.appendChild(tagsEl);
  popover.removeAttribute('hidden');
}

function setTheme(mode) {
  currentTheme = mode;
  const isNight = mode === 'night';
  ambient.intensity = isNight ? 0.35 : 0.75;
  dirLight.intensity = isNight ? 0.6 : 1.1;
  scene.background.set(isNight ? 0x05070d : 0x0b0f1a);
  scene.fog.density = isNight ? 0.002 : 0.0012;
  btnDayNight.textContent = isNight ? 'Mode Jour' : 'Mode Nuit';
  btnDayNight.setAttribute('aria-pressed', String(isNight));
}

btnDayNight.addEventListener('click', () => {
  setTheme(currentTheme === 'day' ? 'night' : 'day');
});

btnPlay.addEventListener('click', () => {
  if (playing) return;
  playing = true;
  runStoryline().finally(() => (playing = false));
});

filterDisciplineEl.addEventListener('change', () => refreshKpis());
filterYearEl.addEventListener('change', () => refreshKpis());

function refreshKpis(code) {
  const selection = code && cantonData[code] ? cantonData[code] : aggregateAllCantons();
  kpiCardsEl.innerHTML = '';
  const defs = [
    { key: 'successRate', label: 'Taux de réussite', fmt: v => (v * 100).toFixed(1) + '%', cls: 'positive' },
    { key: 'graduation', label: 'Taux de diplomation', fmt: v => (v * 100).toFixed(1) + '%', cls: 'positive' },
    { key: 'satisfaction', label: 'Satisfaction étudiante', fmt: v => (v * 100).toFixed(1) + '%', cls: 'positive' },
    { key: 'mooc', label: 'Cours MOOC actifs', fmt: v => String(v), cls: '' }
  ];
  for (const d of defs) {
    const value = selection[d.key] != null ? selection[d.key] : 0;
    const card = document.createElement('div');
    card.className = 'kpi ' + d.cls;
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = d.label;
    const val = document.createElement('div');
    val.className = 'value';
    val.textContent = d.fmt(value);
    card.appendChild(label);
    card.appendChild(val);
    kpiCardsEl.appendChild(card);
  }
}

function aggregateAllCantons() {
  const keys = Object.keys(cantonData);
  if (keys.length === 0) return { successRate: 0, graduation: 0, satisfaction: 0, mooc: 0 };
  const acc = { successRate: 0, graduation: 0, satisfaction: 0, mooc: 0 };
  for (const k of keys) {
    const v = cantonData[k];
    acc.successRate += v.successRate;
    acc.graduation += v.graduation;
    acc.satisfaction += v.satisfaction;
    acc.mooc += v.mooc;
  }
  acc.successRate /= keys.length;
  acc.graduation /= keys.length;
  acc.satisfaction /= keys.length;
  return acc;
}

// Build extruded shapes for each canton
async function buildCantons() {
  const res = await fetch(CANTONS_TOPOJSON_URL);
  const topo = await res.json();
  const gj = topojsonFeature(topo, topo.objects.cantons);

  // Auto-fit projection scale to target width/height in world units
  const bounds = geoJsonBounds(gj);
  const targetWidth = 900; // world units
  const targetHeight = 600;
  fitProjectionToBounds(projection, bounds, targetWidth, targetHeight);

  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x0f6dbb, roughness: 0.6, metalness: 0.15 });
  const highlightMaterial = new THREE.MeshStandardMaterial({ color: 0x38ffdc, emissive: 0x0e3e4a, roughness: 0.4, metalness: 0.2 });

  for (const feature of gj.features) {
    const { geometry, properties } = feature;
    const code = properties && (properties.cca || properties.abbreviation || properties.kanton || properties.id || properties.CODE || properties.kan_code || properties.name);
    const cantonCode = normalizeCantonCode(code, properties);
    const depth = cantonData[cantonCode] ? 6 + Math.round(cantonData[cantonCode].successRate * 12) : 6;

    const geom = polygonToExtrudeGeometry(geometry, depth);
    if (!geom) continue;

    const mesh = new THREE.Mesh(geom, baseMaterial.clone());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { code: cantonCode, name: properties.name || properties.NAME || cantonCode };
    cantonsGroup.add(mesh);
    cantonMeshes.push(mesh);
    const [cx, cy] = projection(geoCentroid(feature));
    // Local coordinates before group rotation (-90° around X):
    // shape plane = XY, extrusion = +Z. After rotation, Z -> world Y.
    cantonCentroids[cantonCode] = new THREE.Vector3(cx, -cy, depth + 10);

    // Label element
    const label = document.createElement('div');
    label.className = 'canton-label';
    label.textContent = mesh.userData.name;
    labelLayer.appendChild(label);
    mesh.userData.labelEl = label;
  }

  // Merge geometries for performance (optional)
  // const merged = BufferGeometryUtils.mergeGeometries(cantonMeshes.map(m => m.geometry), false);
  // ... keep separate for interaction

  // Center group
  centerGroup(cantonsGroup);

  // Initial KPIs
  refreshKpis();

  // Initial chart
  const initial = 'GE';
  updateChartForCanton(initial);
}

function normalizeCantonCode(code, properties) {
  if (!code) {
    const n = (properties && (properties.abbreviation || properties.abb || properties.KUERZEL)) || '';
    return String(n).slice(0, 2).toUpperCase();
  }
  const s = String(code).slice(0, 2).toUpperCase();
  return s;
}

function geoJsonBounds(geojson) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  function addCoord([x, y]) { if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y; }
  function processCoords(coords) { for (const c of coords) Array.isArray(c[0]) ? processCoords(c) : addCoord(c); }
  for (const f of geojson.features) processCoords(f.geometry.coordinates);
  return [[minX, minY], [maxX, maxY]];
}

function fitProjectionToBounds(proj, bounds, targetW, targetH) {
  const [[minX, minY], [maxX, maxY]] = bounds;
  const width = maxX - minX; const height = maxY - minY;
  const k = Math.min(targetW / width, targetH / height);
  proj.scale(150 * k); // base scale multiplier suitable for mercator
}

function polygonToExtrudeGeometry(geometry, depth) {
  const type = geometry.type;
  const shapes = [];
  const holesByShape = [];

  function projectPoint(lon, lat) {
    const [x, y] = projection([lon, lat]);
    return new THREE.Vector2(x, -y);
  }

  function ringsToShapes(rings) {
    const shape = new THREE.Shape();
    let first = true;
    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      const pts = ring.map(([lon, lat]) => projectPoint(lon, lat));
      if (pts.length < 3) continue;
      if (first) {
        shape.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length; j++) shape.lineTo(pts[j].x, pts[j].y);
        first = false;
      } else {
        const holePath = new THREE.Path();
        holePath.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length; j++) holePath.lineTo(pts[j].x, pts[j].y);
        shape.holes.push(holePath);
      }
    }
    return shape;
  }

  if (type === 'Polygon') {
    const shape = ringsToShapes(geometry.coordinates);
    shapes.push(shape);
  } else if (type === 'MultiPolygon') {
    for (const poly of geometry.coordinates) {
      const shape = ringsToShapes(poly);
      shapes.push(shape);
    }
  } else {
    return null;
  }

  const extrudeSettings = { depth, bevelEnabled: false, curveSegments: 2 };
  const geoms = shapes.map(s => new THREE.ExtrudeGeometry(s, extrudeSettings));
  const geom = BufferGeometryUtils.mergeGeometries(geoms, false);
  return geom;
}

function centerGroup(group) {
  const box = new THREE.Box3().setFromObject(group);
  const center = new THREE.Vector3();
  box.getCenter(center);
  group.position.x = -center.x;
  group.position.z = -center.z;
}

function updateLabels() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const proj = new THREE.Vector3();
  for (const mesh of cantonMeshes) {
    const el = mesh.userData.labelEl;
    if (!el) continue;
    const code = mesh.userData.code;
    const centroid = cantonCentroids[code];
    const local = centroid ? centroid.clone() : mesh.position.clone();
    const pos = cantonsGroup.localToWorld(local);
    proj.copy(pos).project(camera);
    const x = (proj.x * 0.5 + 0.5) * width;
    const y = (-proj.y * 0.5 + 0.5) * height;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.display = proj.z > 1 || proj.z < -1 ? 'none' : 'block';
  }
}

function updateHover() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cantonMeshes, false);
  if (hovered && (!intersects.length || intersects[0].object !== hovered)) {
    hovered.material.emissive = new THREE.Color(0x000000);
    hovered.scale.set(1, 1, 1);
    hovered = null;
    container.style.cursor = 'default';
  }
  if (intersects.length) {
    const hit = intersects[0].object;
    if (hovered !== hit) {
      if (hovered) {
        hovered.material.emissive = new THREE.Color(0x000000);
        hovered.scale.set(1, 1, 1);
      }
      hovered = hit;
      hovered.material.emissive = new THREE.Color(0x083f4a);
      hovered.scale.set(1.02, 1.02, 1.02);
      container.style.cursor = 'pointer';
    }
  }
}

function updateChartForCanton(code) {
  const data = cantonData[code] || aggregateAllCantons();
  const trace = {
    x: ['Réussite', 'Diplomation', 'Satisfaction', 'MOOC'],
    y: [data.successRate * 100, data.graduation * 100, data.satisfaction * 100, data.mooc],
    marker: { color: ['#2ecc71', '#27ae60', '#38ffdc', '#00e0ff'] },
    type: 'bar',
    hovertemplate: '%{x}: %{y:.1f}<extra></extra>'
  };
  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { l: 30, r: 10, t: 10, b: 30 },
    xaxis: { tickfont: { color: '#cfe7ff' } },
    yaxis: { tickfont: { color: '#cfe7ff' } }
  };
  window.Plotly.newPlot(chartEl, [trace], layout, { displayModeBar: false, responsive: true });
}

async function runStoryline() {
  const tour = ['GE', 'VD', 'ZH', 'BS'];
  for (const code of tour) {
    await focusOnCanton(code, { duration: 2.2 });
    updateChartForCanton(code);
    refreshKpis(code);
    await delay(0.6);
  }
}

function delay(s) { return new Promise(r => setTimeout(r, s * 1000)); }

async function focusOnCanton(code, { duration = 2 } = {}) {
  const localTarget = cantonCentroids[code];
  const target = localTarget ? cantonsGroup.localToWorld(localTarget.clone()) : null;
  if (!target) return;
  const from = camera.position.clone();
  const to = target.clone().add(new THREE.Vector3(80, 160, 120));
  const controlsTargetFrom = controls.target.clone();
  const controlsTargetTo = target.clone();
  return new Promise((resolve) => {
    gsap.to(from, { x: to.x, y: to.y, z: to.z, duration, ease: 'power2.inOut', onUpdate: () => camera.position.copy(from) });
    gsap.to(controlsTargetFrom, { x: controlsTargetTo.x, y: controlsTargetTo.y, z: controlsTargetTo.z, duration, ease: 'power2.inOut', onUpdate: () => controls.target.copy(controlsTargetFrom), onComplete: resolve });
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  updateHover();
  updateLabels();
  renderer.render(scene, camera);
}

// Initialize
(async function init() {
  // Hint
  const hint = document.createElement('div');
  hint.className = 'hint';
  hint.textContent = 'Astuce: utilisez la souris pour orbiter et zoomer, cliquez sur un canton pour voir les détails. Parcourez le scénario avec Lecture.';
  container.appendChild(hint);

  await buildCantons();
  updateRendererSize();
  setTheme('day');
  animate();
})();


