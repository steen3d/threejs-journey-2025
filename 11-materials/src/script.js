import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg');
const matcapTexture = textureLoader.load('./textures/matcaps/1.png');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Objects
 */

//  MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('#ff0000');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.2;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial

// const material = new THREE.MeshNormalMaterial();

// MeshMatcapMaterial

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
const material = new THREE.MeshLambertMaterial();

const sphereMesh = new THREE.Mesh( 
    new THREE.SphereGeometry(0.5), 
    material
);
const planeMesh = new THREE.Mesh( 
    new THREE.PlaneGeometry(), 
    material
);
const coneMesh = new THREE.Mesh( 
    new THREE.ConeGeometry(0.5), 
    material
);

sphereMesh.position.x = -1.5;
// planeMesh.rotation.x = Math.PI * -0.25;
coneMesh.position.x = 1.5;
scene.add(sphereMesh, planeMesh, coneMesh);



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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphereMesh.rotation.y = 0.1 * elapsedTime;
    planeMesh.rotation.y = 0.1 * elapsedTime;
    coneMesh.rotation.y = 0.1 * elapsedTime;
    sphereMesh.rotation.x = - 0.15 * elapsedTime;
    planeMesh.rotation.x = - 0.15 * elapsedTime;
    coneMesh.rotation.x = - 0.15 * elapsedTime;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()