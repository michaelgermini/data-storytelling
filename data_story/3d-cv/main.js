import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'https://cdn.skypack.dev/gsap@3.12.5';

// ---- CV CONTENT (concise extract) -------------------------------------------------
const CV_DATA = {
  profile: {
    title: 'Profil',
    html: `
      <div class="tagline">Data Scientist & Data Storyteller — visualisation narrative pour la décision</div>
      <p>Expérience multi-secteurs (banque privée, assurances, Big Pharma, énergie, secteur public). Expertise en analyse prédictive, visualisation 3D/immersive, dashboards interactifs et communication d’insights.</p>
    `,
    color: 0x6ee7b7,
  },
  skills: {
    title: 'Compétences',
    html: `
      <h4>Data Science</h4>
      <ul>
        <li>Python, R, SQL, scikit-learn, TensorFlow, PyTorch, NLP</li>
        <li>Séries temporelles, modélisation, optimisation</li>
      </ul>
      <h4>Data Viz & Storytelling</h4>
      <ul>
        <li>Power BI, Tableau, Looker Studio</li>
        <li>D3.js, Plotly, Three.js, Deck.gl, WebGL, React</li>
      </ul>
      <h4>Big Data & Cloud</h4>
      <ul>
        <li>AWS (S3, Redshift, SageMaker), Azure ML, GCP BigQuery</li>
        <li>Spark, Hadoop, Databricks, Airflow, Kafka</li>
      </ul>
    `,
    color: 0x93c5fd,
  },
  experience: {
    title: 'Expériences',
    html: `
      <h4>Pictet Group — Senior Data Scientist (2021–2025)</h4>
      <ul>
        <li>Dashboards 3D immersifs pour comités d’investissement (Three.js / Deck.gl).</li>
        <li>Modèles prédictifs risques (séries temporelles, scikit-learn, XGBoost).</li>
        <li>Automatisation de rapports via NLP, déploiements AWS + Airflow.</li>
      </ul>
      <h4>Novartis — Lead Data Storyteller (2018–2021)</h4>
      <ul>
        <li>Visualisations interactives essais cliniques (FDA/EMA), D3/Tableau.</li>
        <li>Storytelling 3D/VR pour congrès (Unity/Unreal).</li>
      </ul>
      <h4>Ville de Genève — Consultant Data Science (2016–2018)</h4>
      <ul>
        <li>Indicateurs pollution et transition énergétique (prévisions ARIMA/Prophet).</li>
        <li>Pipelines ingestion/transformation (Airflow, Kafka).</li>
      </ul>
    `,
    color: 0xfca5a5,
  },
  projects: {
    title: 'Projets',
    html: `
      <ul>
        <li><strong>Dashboard 3D Pollution Genève</strong> — temps réel, prévisions météo, AR.</li>
        <li><strong>Storytelling Pharma en VR</strong> — phases d’essais cliniques immersives.</li>
        <li><strong>Plateforme Prévisionnelle Marchés</strong> — LSTM/XGBoost + dashboards exécutifs.</li>
      </ul>
    `,
    color: 0xfcd34d,
  },
  education: {
    title: 'Formation',
    html: `
      <ul>
        <li>MSc Data Science — EPFL</li>
        <li>Certificat Data Visualization — MIT Sloan</li>
        <li>Machine Learning Specialization — Stanford Online</li>
      </ul>
    `,
    color: 0xa78bfa,
  },
  contact: {
    title: 'Contact',
    html: `
      <p>📍 Genève, Suisse<br/>📧 email@email.com<br/>📞 +41 XX XXX XX XX<br/>🌐 portfolio.com<br/>💼 LinkedIn / GitHub</p>
    `,
    color: 0xfdba74,
  },
};

// ---- RENDERER, SCENE, CAMERA -----------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(16, 14, 16);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 4;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI * 0.48;

// ---- LIGHTING --------------------------------------------------------------------
const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x0b0f17, 0.7);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(10, 18, 6);
dir.castShadow = true;
scene.add(dir);

// ---- FLOOR / GRID ----------------------------------------------------------------
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x0f1724, metalness: 0.1, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(100, 100, 0x1f2a44, 0x182235);
grid.position.y = 0.01;
scene.add(grid);

// ---- CITY: BUILDINGS FOR SECTIONS ------------------------------------------------
const sectionLayout = [
  { key: 'profile', position: new THREE.Vector3(-6, 0, -6), size: 2.2 },
  { key: 'skills', position: new THREE.Vector3(6, 0, -6), size: 2.8 },
  { key: 'experience', position: new THREE.Vector3(-6, 0, 6), size: 3.4 },
  { key: 'projects', position: new THREE.Vector3(6, 0, 6), size: 2.6 },
  { key: 'education', position: new THREE.Vector3(-6, 0, 0), size: 2.2 },
  { key: 'contact', position: new THREE.Vector3(6, 0, 0), size: 1.8 },
];

const buildingsGroup = new THREE.Group();
scene.add(buildingsGroup);

const sectionKeyToMesh = new Map();

for (const item of sectionLayout) {
  const section = CV_DATA[item.key];
  const baseSize = item.size;
  const geo = new THREE.BoxGeometry(baseSize, baseSize * 2.2, baseSize);
  const mat = new THREE.MeshStandardMaterial({
    color: section.color,
    emissive: section.color,
    emissiveIntensity: 0.08,
    metalness: 0.2,
    roughness: 0.6,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(item.position);
  mesh.position.y = (baseSize * 2.2) / 2;
  mesh.castShadow = true;
  mesh.userData.sectionKey = item.key;
  buildingsGroup.add(mesh);
  sectionKeyToMesh.set(item.key, mesh);

  // subtle floating animation per building
  const phase = Math.random() * Math.PI * 2;
  const amplitude = 0.08 + Math.random() * 0.04;
  mesh.userData.float = { phase, amplitude };
}

// ---- RAYCAST & UI ----------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const pointerNormalized = new THREE.Vector2();
let currentlyHovered = null;

const hoverTip = document.getElementById('hoverTip');
const panel = document.getElementById('infoPanel');
const panelTitle = document.getElementById('panelTitle');
const panelContent = document.getElementById('panelContent');
const closePanelBtn = document.getElementById('closePanel');

closePanelBtn.addEventListener('click', () => {
  panel.classList.add('closed');
});

function openSection(sectionKey) {
  const section = CV_DATA[sectionKey];
  if (!section) return;

  panelTitle.textContent = section.title;
  panelContent.innerHTML = section.html;
  panel.classList.remove('closed');

  const mesh = sectionKeyToMesh.get(sectionKey);
  if (!mesh) return;

  const worldPos = mesh.getWorldPosition(new THREE.Vector3());
  const offset = new THREE.Vector3(0, mesh.geometry.parameters.height * 0.5 + 2.2, 4.2);
  const targetPos = worldPos.clone().add(offset);

  gsap.to(controls.target, { x: worldPos.x, y: worldPos.y, z: worldPos.z, duration: 0.8, ease: 'power2.out' });
  gsap.to(camera.position, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration: 0.9, ease: 'power2.out' });
}

function updateHoverTipPosition(clientX, clientY) {
  hoverTip.style.left = `${clientX}px`;
  hoverTip.style.top = `${clientY}px`;
}

function handlePointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  pointerNormalized.set(x, y);

  raycaster.setFromCamera(pointerNormalized, camera);
  const intersections = raycaster.intersectObjects(buildingsGroup.children, false);

  if (intersections.length > 0) {
    const top = intersections[0].object;
    if (currentlyHovered !== top) {
      if (currentlyHovered) currentlyHovered.scale.set(1, 1, 1);
      currentlyHovered = top;
      currentlyHovered.scale.set(1.04, 1.04, 1.04);
      hoverTip.classList.remove('hidden');
    }
    updateHoverTipPosition(event.clientX, event.clientY);
    document.body.style.cursor = 'pointer';
  } else {
    if (currentlyHovered) currentlyHovered.scale.set(1, 1, 1);
    currentlyHovered = null;
    hoverTip.classList.add('hidden');
    document.body.style.cursor = 'default';
  }
}

function handleClick() {
  if (!currentlyHovered) return;
  const sectionKey = currentlyHovered.userData.sectionKey;
  openSection(sectionKey);
}

renderer.domElement.addEventListener('pointermove', handlePointerMove);
renderer.domElement.addEventListener('click', handleClick);

// ---- RESIZE ----------------------------------------------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// ---- ANIMATION LOOP --------------------------------------------------------------
const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  for (const mesh of buildingsGroup.children) {
    const f = mesh.userData.float;
    if (!f) continue;
    mesh.position.y = mesh.geometry.parameters.height / 2 + Math.sin(t + f.phase) * f.amplitude;
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// ---- START: Fly-in intro ---------------------------------------------------------
gsap.from(camera.position, { x: 26, y: 28, z: 26, duration: 1.2, ease: 'power2.out' });
gsap.from(controls.target, { x: 0, y: 0, z: 0, duration: 1.2, ease: 'power2.out' });

// Pre-open profile on start for guidance
setTimeout(() => openSection('profile'), 800);


