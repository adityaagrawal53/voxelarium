import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ===== Cube Factory Function =====
function createCube({
  size = 1,
  color = 0xffffff,
  x = 0,
  y = 0,
  z = 0
} = {}) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);

  // Position
  cube.position.set(x, y, z);

  // Border
  const edges = new THREE.EdgesGeometry(geometry);
  const border = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  cube.add(border);

  scene.add(cube);
  return cube;
}

// cubes creation array
const cubeData = [
  { id: "a", x: 0, y: 0, z: 0, color: 0xffffff },
  { id: "b", x: 1, y: 0, z: 0, color: 0xffff00 },
  { id: "c", x: -1, y: 0, z: 0, color: 0xff0000 },
  { id: "ax", x: 0, y: 1, z: 0, color: 0xffffff },
  { id: "bx", x: 1, y: 1, z: 0, color: 0xffff00 },
  { id: "cx", x: -1, y: 1, z: 0, color: 0xff0000 },
];

const cubes = [];

cubeData.forEach(data => {
  const cube = createCube(data);
  cubes[data.id] = cube; // store by name
});

// animation loop
function animate(time) {
  const radius = 10;
  const speed = 0.0003;
  const angle = time * speed;

  // Camera orbit
  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);
  camera.lookAt(0, 0, 0);

	// the slight hover up and down stuff
  cubes.forEach((c, i) => {
    c.position.y = 0.1 * Math.sin(time * 0.002 );
  });

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// handle resizing 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
