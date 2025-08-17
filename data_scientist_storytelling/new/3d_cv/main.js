import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Basic scene
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0e0f13, 20, 80);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 2.2, 12);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 3;
controls.maxDistance = 40;
controls.enablePan = false;

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);
const hemi = new THREE.HemisphereLight(0x4f5bff, 0x0b0d12, 0.6);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 1.25);
dir.position.set(6, 10, 6);
dir.castShadow = true;
dir.shadow.mapSize.set(2048, 2048);
dir.shadow.camera.near = 0.5;
dir.shadow.camera.far = 50;
dir.shadow.camera.left = -20;
dir.shadow.camera.right = 20;
dir.shadow.camera.top = 20;
dir.shadow.camera.bottom = -20;
scene.add(dir);

// Accent lights (animated)
const pointA = new THREE.PointLight(0x7a8cff, 0.8, 30, 2);
pointA.position.set(3, 2.2, 5);
pointA.castShadow = true;
scene.add(pointA);

const pointB = new THREE.PointLight(0xff7ab0, 0.6, 25, 2);
pointB.position.set(-5, 1.6, -3);
pointB.castShadow = true;
scene.add(pointB);

// Floor grid for depth
const grid = new THREE.GridHelper(200, 200, 0x2c2f36, 0x1b1f26);
grid.position.y = -1.1;
scene.add(grid);
const groundMat = new THREE.ShadowMaterial({ opacity: 0.25, color: 0x000000 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.12;
ground.receiveShadow = true;
scene.add(ground);

// Utility: create panel
function createPanel({ title, lines, width = 3.8, height = 2.2 }) {
	const group = new THREE.Group();
	group.userData = group.userData || {};
	group.userData.title = title;
	const radius = 0.14;
	const shape = new THREE.Shape();
	const w = width, h = height, r = radius;
	shape.moveTo(-w/2 + r, -h/2);
	shape.lineTo(w/2 - r, -h/2);
	shape.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
	shape.lineTo(w/2, h/2 - r);
	shape.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
	shape.lineTo(-w/2 + r, h/2);
	shape.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
	shape.lineTo(-w/2, -h/2 + r);
	shape.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);

	const extrude = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false });
	const mat = new THREE.MeshStandardMaterial({ color: 0x151821, metalness: 0.3, roughness: 0.6 });
	const board = new THREE.Mesh(extrude, mat);
	board.userData = board.userData || {};
	board.userData.group = group;
	board.castShadow = true;
	board.receiveShadow = true;
	group.add(board);

	// Title as Sprite
	const titleSprite = makeTextSprite(title, 18, '#e8eaf2');
	titleSprite.position.set(0, h/2 + 0.35, 0);
	group.add(titleSprite);

	// Lines as sprites
	const padX = -w/2 + 0.26;
	let y = h/2 - 0.45;
	lines.forEach((line, idx) => {
		const s = makeTextSprite(line, 13, idx === 0 ? '#b9c4ff' : '#cfd6e6');
		s.position.set(padX, y, 0.03);
		s.scale.set(0.011, 0.011, 0.011);
		group.add(s);
		y -= 0.27;
	});

	return group;
}

function makeTextSprite(text, fontSize = 14, color = '#ffffff') {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const padding = 20;
	ctx.font = `bold ${fontSize}px Segoe UI, Roboto, Helvetica, Arial`;
	const metrics = ctx.measureText(text);
	canvas.width = Math.ceil(metrics.width + padding * 2);
	canvas.height = Math.ceil(fontSize * 1.8 + padding * 2);
	ctx.font = `bold ${fontSize}px Segoe UI, Roboto, Helvetica, Arial`;
	ctx.fillStyle = 'rgba(0,0,0,0)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = color;
	ctx.textBaseline = 'middle';
	ctx.fillText(text, padding, canvas.height / 2);

	const texture = new THREE.CanvasTexture(canvas);
	texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
	const sprite = new THREE.Sprite(material);
	const scale = 0.01;
	sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
	return sprite;
}

// Extracted content from your markdown CV (snapshot)
const content = {
	intro: [
		'Prénom NOM',
		'Ville, Pays · Téléphone · Email',
		'LinkedIn · GitHub · Portfolio'
	],
	accroche: [
		"Data Scientist orienté(e) Data Storytelling, spécialisé(e) dans la transformation de données complexes en récits clairs, visuels et actionnables.",
		"ML, statistiques, design d’insights, communication d’impact."
	],
	competences: [
		'Data Storytelling: message, structure, visuels, data journalism',
		'Science des données: stats, features, sup/unsup, A/B, causalité',
		'Visualisation & BI: UX analytique, dashboards, accessibilité',
		'Produit & impact: cadrage, priorisation, valeur, adoption'
	],
	outils: [
		'Langages: Python (pandas, sklearn), SQL, R',
		'DataViz/BI: Power BI, Tableau, Looker, Plotly/Matplotlib',
		'Ingénierie: dbt, Airflow, Git, Docker, CI/CD',
		'Cloud: BigQuery, Snowflake, Redshift, Azure/AWS/GCP'
	],
	experiences: [
		'Data Scientist / Storyteller — Entreprise X',
		'Cadre storytelling: -40% préparation, +25% adoption',
		'Dashboards narratifs (Power BI+Py): +12% efficacité média',
		'A/B one-pager: -30% time-to-decision'
	],
	projets: [
		'Segmentation & narration parcours: +X% upsell, -Y% churn',
		'Détection anomalies IoT: MTTR réduit de Z%',
		'Attribution uplift: visualisation contre-factuelle'
	],
	formation: [
		'Diplôme/Master Data Science — Établissement (Année)',
		'UX dataviz, psychologie cognitive, communication insights'
	],
	langues: [
		'Français (C2)',
		'Anglais (C1)'
	]
};

// Layout panels in 3D space (circular)
const panels = [];
const entries = [
	{ key: 'intro', y: 1.4, r: 6.0 },
	{ key: 'accroche', y: 0.6, r: 5.2 },
	{ key: 'competences', y: -0.2, r: 5.8 },
	{ key: 'outils', y: -1.0, r: 4.8 },
	{ key: 'experiences', y: 0.8, r: 7.0 },
	{ key: 'projets', y: -0.4, r: 6.6 },
	{ key: 'formation', y: 1.2, r: 4.6 },
	{ key: 'langues', y: -1.2, r: 4.2 }
];

entries.forEach((entry, idx) => {
	const title = entry.key.toUpperCase();
	const lines = content[entry.key] || [];
	const p = createPanel({ title, lines });
	const angle = (idx / entries.length) * Math.PI * 2;
	p.position.set(Math.cos(angle) * entry.r, entry.y, Math.sin(angle) * entry.r);
	p.lookAt(new THREE.Vector3(0, entry.y, 0));
	scene.add(p);
	panels.push(p);
});

// Particles background
const starGeo = new THREE.BufferGeometry();
const starCount = 800;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
	positions[i*3 + 0] = (Math.random() - 0.5) * 120;
	positions[i*3 + 1] = (Math.random() - 0.5) * 60;
	positions[i*3 + 2] = (Math.random() - 0.5) * 120;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({ color: 0x7a8cff, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.8 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Raycaster for panel focus
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(e) {
	const rect = renderer.domElement.getBoundingClientRect();
	mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(panels.map(g => g.children[0]));
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        const parent = obj.userData.group || panels.find(g => g.children.includes(obj));
        if (!parent) return;
		// Smooth focus
		const target = parent.position.clone();
		const look = new THREE.Vector3(0, parent.position.y, 0);
		animateCameraTo(target.clone().add(new THREE.Vector3(0, 0.6, 1.8)), look, 600);
	}
}

renderer.domElement.addEventListener('click', onClick);

// Camera animation
let animStart = 0;
let fromPos = new THREE.Vector3();
let toPos = new THREE.Vector3();
let fromLook = new THREE.Vector3();
let toLook = new THREE.Vector3();
let animMs = 0;
let animating = false;

function animateCameraTo(targetPos, lookAtPos, durationMs = 800) {
	animStart = performance.now();
	fromPos.copy(camera.position);
	toPos.copy(targetPos);
	fromLook.copy(getCameraLookAt());
	toLook.copy(lookAtPos);
	animMs = durationMs;
	animating = true;
}

function getCameraLookAt() {
	const dir = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
	return camera.position.clone().add(dir);
}

function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }

// Tooltip showing section title
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

renderer.domElement.addEventListener('mousemove', (e) => {
	const rect = renderer.domElement.getBoundingClientRect();
	mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
	mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(panels.map(g => g.children[0]));
    if (intersects.length > 0) {
        tooltip.style.display = 'block';
        const obj = intersects[0].object;
        const group = obj.userData.group || panels.find(g => g.children.includes(obj));
        tooltip.textContent = group && group.userData && group.userData.title ? group.userData.title : '';
		tooltip.style.left = `${e.clientX}px`;
		tooltip.style.top = `${e.clientY}px`;
		renderer.domElement.style.cursor = 'pointer';
	} else {
		tooltip.style.display = 'none';
		renderer.domElement.style.cursor = 'grab';
	}
});

// Reset camera
window.addEventListener('keydown', (e) => {
	if (e.key.toLowerCase() === 'r') {
		animateCameraTo(new THREE.Vector3(0, 2.2, 12), new THREE.Vector3(0, 0.8, 0), 700);
	}
});

// Animate
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	stars.rotation.y += 0.0006;

	// Animate accent lights
	const t = performance.now() * 0.0003;
	pointA.position.x = Math.cos(t) * 6;
	pointA.position.z = Math.sin(t) * 6 + 2;
	pointB.position.x = Math.cos(-t * 1.5) * -7;
	pointB.position.z = Math.sin(-t * 1.5) * -5;

	if (animating) {
		const elapsed = performance.now() - animStart;
		const t = Math.min(1, elapsed / animMs);
		const k = smooth(t);
		camera.position.set(
			lerp(fromPos.x, toPos.x, k),
			lerp(fromPos.y, toPos.y, k),
			lerp(fromPos.z, toPos.z, k)
		);
		const look = new THREE.Vector3(
			lerp(fromLook.x, toLook.x, k),
			lerp(fromLook.y, toLook.y, k),
			lerp(fromLook.z, toLook.z, k)
		);
		camera.lookAt(look);
		if (t >= 1) animating = false;
	}

	renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

