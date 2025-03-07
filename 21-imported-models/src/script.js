import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


/**
 * Base
 */
// Debug
const gui = new GUI()




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures

const rgbeLoader = new RGBELoader();
console.log('rgbeLoader', rgbeLoader);
rgbeLoader.load('textures/environmentMap/2k.hdr',
(environmentMap) => 
    {
        console.log('env');
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = environmentMap;
        scene.environment = environmentMap;
    }
)
console.log(scene.environment)
/**
 * Models
 */
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader)


let mixer = null;

console.log('gltfLoader', gltfLoader);

const lamp = null;
gltfLoader.load(
    '/models/FloorLamp/FloorLamp.gltf',
    (gltf) =>
    {
    // {
    //     const children = [...gltf.scene.children]
    //     for(const child of children)
    //     {
    //         scene.add(child);
    //     }
    // }
    
    // Animation
    // mixer = new THREE.AnimationMixer(gltf.scene);
    // const action = mixer.clipAction(gltf.animations[0])

    // action.play();
    // gltf.scene.scale.set(0.025, 0.025, 0.025);
    console.log('gltf', gltf);
    gltf.scene.children[0].castShadow = true;
    gltf.scene.children[0].receiveShadowShadow = true;
    // gltf.scene.position.y = 3;
    scene.add(gltf.scene);
    }
)

// Test Box

// const material = new THREE.MeshStandardMaterial();
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const box = new THREE.Mesh(boxGeometry, material);
// box.castShadow = true;
// material.color.set('#666666');
// scene.add(box);
// box.position.y = 1;
// box.position.z = 2;

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */

// const spotLight = new THREE.SpotLight('#ffffff', 1000);
// spotLight.lookAt(box.position);
// spotLight.angle = Math.PI * 0.9;
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// // spotLight.rotateX
// spotLight.position.y = 10;
// scene.add(spotLight);

// gui.add(spotLight.position, 'y').min(0).max(20).step(0.01);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);

gui.add(directionalLight, 'intensity').min(0).max(100).step(0.01);

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //  Update Mixer

    // if(mixer !== null)
    // {
    //     mixer.update(deltaTime);
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()