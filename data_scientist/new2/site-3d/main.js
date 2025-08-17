import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(6, 4, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 1.0);
dir.position.set(5, 10, 7);
scene.add(dir);

// Background particles group
const backgroundGroup = new THREE.Group();
scene.add(backgroundGroup);

function createParticleField(count, size, color, spread) {
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		const i3 = i * 3;
		positions[i3 + 0] = (Math.random() - 0.5) * spread;
		positions[i3 + 1] = (Math.random() - 0.5) * spread;
		positions[i3 + 2] = (Math.random() - 0.5) * spread;
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	const mat = new THREE.PointsMaterial({
		color,
		size,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.85,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});
	return new THREE.Points(geo, mat);
}

// Two parallax layers
const particlesNear = createParticleField(1800, 1.6, 0x6b7cff, 140);
const particlesFar = createParticleField(3000, 1.0, 0x22d3ee, 300);
backgroundGroup.add(particlesFar);
backgroundGroup.add(particlesNear);

// Center object — torus + wireframe globe
const torus = new THREE.Mesh(
	new THREE.TorusGeometry(2, 0.6, 32, 120),
	new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.6, roughness: 0.3 })
);
torus.position.y = 0.4;
scene.add(torus);

const globe = new THREE.Mesh(
	new THREE.SphereGeometry(2.6, 32, 32),
	new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.2, transparent: true })
);
scene.add(globe);

// Parallax from mouse
let targetRotX = 0;
let targetRotY = 0;
window.addEventListener("pointermove", (e) => {
	const nx = (e.clientX / window.innerWidth) * 2 - 1; // [-1, 1]
	const ny = (e.clientY / window.innerHeight) * 2 - 1; // [-1, 1]
	targetRotY = nx * 0.2;
	targetRotX = ny * 0.15;
});

// Responsive
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// UI helpers
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Animation loop
const clock = new THREE.Clock();
function animate() {
	const t = clock.getElapsedTime();

	// central object motion
	torus.rotation.x = t * 0.25;
	torus.rotation.y = t * 0.35;

	// particles motion
	backgroundGroup.rotation.y += 0.0008;
	backgroundGroup.rotation.x += (targetRotX - backgroundGroup.rotation.x) * 0.05;
	backgroundGroup.rotation.y += (targetRotY - backgroundGroup.rotation.y) * 0.03;
	particlesNear.rotation.y += 0.0006;
	particlesFar.rotation.y += 0.0003;

	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
animate();
