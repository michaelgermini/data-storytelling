import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let renderer, scene, camera, controls, raycaster, pointerNDC, rootGroup;
let cantonIdToMesh = new Map();
let currentGlowPulse = 0;
let uniforms = { year: { value: 2020 } };

export function initializeScene({ container, data }){
  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x071019, 80, 260);

  camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 2000);
  camera.position.set(0, 90, 160);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 60;
  controls.maxDistance = 420;
  controls.maxPolarAngle = Math.PI * 0.49;

  const hemi = new THREE.HemisphereLight(0xaad4ff, 0x0d1830, 1.0);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(80, 120, 60);
  dir.castShadow = false;
  scene.add(dir);

  const space = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x031016, side: THREE.BackSide })
  );
  scene.add(space);

  rootGroup = new THREE.Group();
  scene.add(rootGroup);

  raycaster = new THREE.Raycaster();
  pointerNDC = new THREE.Vector2();

  buildSwissMockGeometry(data);

  window.addEventListener('resize', () => onResize(container));
}

function onResize(container){
  if(!renderer || !camera) return;
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
}

function buildSwissMockGeometry(data){
  const cantonColor = new THREE.Color(0x1a3952);
  const outlineColor = new THREE.Color(0x49a3ff);

  const cantonMaterial = new THREE.MeshStandardMaterial({
    color: cantonColor,
    metalness: 0.05,
    roughness: 0.9,
    onBeforeCompile: (shader) => {
      shader.uniforms.uYear = uniforms.year;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>\nuniform float uYear;\n`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>\n` +
        `float pulse = smoothstep(0.0,1.0,fract(uYear*0.05));\n` +
        `vec3 glow = vec3(0.15,0.45,1.0) * pulse * 0.25;\n` +
        `gl_FragColor.rgb += glow;\n`
      );
    }
  });

  const outlineMaterial = new THREE.LineBasicMaterial({ color: outlineColor, transparent:true, opacity:0.35 });

  const grid = [
    { id:'GE', name:'Genève', x:-40, z: 10 },
    { id:'VD', name:'Vaud', x:-30, z: 0 },
    { id:'BE', name:'Berne', x:-5, z:-10 },
    { id:'ZH', name:'Zurich', x: 30, z:-5 },
  ];

  for(const c of grid){
    const shape = new THREE.Shape();
    const w = 16, h = 10;
    shape.moveTo(-w/2, -h/2);
    shape.lineTo(w/2, -h/2);
    shape.lineTo(w/2, h/2);
    shape.lineTo(-w/2, h/2);
    shape.lineTo(-w/2, -h/2);
    const geom = new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled:false });
    const mesh = new THREE.Mesh(geom, cantonMaterial.clone());
    mesh.position.set(c.x, 0, c.z);
    mesh.userData.cantonId = c.id;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    rootGroup.add(mesh);
    cantonIdToMesh.set(c.id, mesh);

    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(edges, outlineMaterial);
    line.position.copy(mesh.position);
    rootGroup.add(line);
  }
}

export function animate(){
  requestAnimationFrame(animate);
  if(controls) controls.update();
  currentGlowPulse += 0.02;
  renderer.render(scene, camera);
}

export function setYearUniform(year){
  uniforms.year.value = year;
}

export function pickAtPointer(clientX, clientY){
  if(!renderer || !camera) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointerNDC, camera);
  const meshes = Array.from(cantonIdToMesh.values());
  const hits = raycaster.intersectObjects(meshes, false);
  if(hits.length){
    const m = hits[0].object;
    return { cantonId: m.userData.cantonId, point: hits[0].point };
  }
  return null;
}

export function highlightCanton(cantonId){
  cantonIdToMesh.forEach((mesh, id) => {
    const isTarget = id === cantonId;
    const color = isTarget ? 0x2e6fb1 : 0x1a3952;
    mesh.material.color.setHex(color);
    mesh.scale.setScalar(isTarget ? 1.06 : 1.0);
  });
}

export function clearHighlights(){
  cantonIdToMesh.forEach((mesh) => {
    mesh.material.color.setHex(0x1a3952);
    mesh.scale.setScalar(1.0);
  });
}

export function zoomToCanton(cantonId){
  const mesh = cantonIdToMesh.get(cantonId);
  if(!mesh || !camera || !controls) return;
  const target = mesh.position.clone();
  const camPos = target.clone().add(new THREE.Vector3(0, 40, 48));
  if (window.gsap) {
    window.gsap.to(camera.position, { x: camPos.x, y: camPos.y, z: camPos.z, duration: 1.0, ease: 'power2.out' });
    window.gsap.to(controls.target, { x: target.x, y: target.y, z: target.z, duration: 1.0, ease: 'power2.out' });
  } else {
    camera.position.copy(camPos);
    controls.target.copy(target);
  }
}


