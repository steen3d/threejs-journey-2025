import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time - Native JS Method
// let time = Date.now(); // Saving current time so it can be used in tick function

// Clock - Three Method
const clock = new THREE.Clock();

gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});

// Animations
const tick = () => 
{        
    // Time - Native JS Method
    // const currentTime = Date.now(); // Getting current time
    // const deltaTime = currentTime - time; // Getting difference between time in this tick and the last one
    // time = currentTime; // Updating the time variable in order to check next tick
    // console.log(deltaTime);

    // Clock
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);
    // Update Objects
    // mesh.rotation.y += 0.002 * deltaTime; // Mult by delta to divorce the animation timing from the frame rate
    // mesh.rotation.y = elapsedTime * Math.PI * 2;
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    // camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();