import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('./textures/particles/2.png');

/* 
    Particles
*/

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    sizeAttenuation: true,
    transparent: true
})
// particlesMaterial.color = new THREE.Color('#ff88cc');
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

const randomPoints = new THREE.BufferGeometry();
const numPoints = 5000;
const pointsArray = new Float32Array(numPoints * 3); // Length needs to be provided - number of points * 3
const pointsColors = new Float32Array(numPoints * 3)
const distanceMult = 10;
for(let i = 0; i < numPoints * 3; i++){
    pointsArray[i] = (Math.random() - 0.5) * distanceMult;
    pointsColors[i] = Math.random();
}
randomPoints.setAttribute('position', new THREE.BufferAttribute( pointsArray, 3));
randomPoints.setAttribute('color', new THREE.BufferAttribute( pointsColors, 3));
const randomParticles = new THREE.Points(randomPoints, particlesMaterial);
scene.add(randomParticles);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Particles
    // randomParticles.rotation.y = elapsedTime * 0.2;
    for(let i = 0; i < numPoints; i++)
    {
        const i3 = i * 3;
        const x = randomPoints.attributes.position.array[i3];
        randomPoints.attributes.position.array[i3+1] = Math.sin(elapsedTime + x);
    }
    randomPoints.attributes.position.needsUpdate = true;
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()