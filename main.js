import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const geometry2 = new THREE.BoxGeometry( 1.4, 1.4, 1.4 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry2, material );
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const border = new THREE.LineSegments(edges, lineMaterial);
cube.add(border);
const edges2 = new THREE.EdgesGeometry(geometry2);
const border2 = new THREE.LineSegments(edges2, lineMaterial);
cube2.add(border2);
scene.add( cube );
scene.add( cube2 );
cube.position.x = -1.5;
cube2.position.x = 1.5;
camera.position.z = 5;


function animate(time) {
  const radius = 5;
  const speed = 0.001;

  const angle = time * speed;

  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);

  camera.lookAt(0, 0, 0); // always face center

  cube.rotation.x = 1000 / 2000;
  cube.rotation.y = 1000 / 1000;
  cube2.rotation.x = 1000 / 2000;
  cube2.rotation.y = 1000 / 1000;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );
