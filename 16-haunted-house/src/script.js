import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
const guiParameters = {
    bushColor: '#76a367',
    doorColor: '#abd1cc',
    ambientLightColor: '#86cdff',
    ambientLightIntensity: 1,
    directionalLightColor: '#86cdff',
    directionalLightIntensity: 1,
    doorLightColor: '#ff7d46',
    doorLightIntensity: 2.69,
    doorLightDist: 2.48,
    doorLightDecay: 1
}
gui.addColor(guiParameters, 'bushColor')
    .onChange(() => {
        bushMaterial.color.set(guiParameters.bushColor)
})

gui.addColor(guiParameters, 'doorColor')
    .onChange(() => {
        doorMaterial.color.set(guiParameters.doorColor)
})

gui.addColor(guiParameters, 'ambientLightColor')
    .onChange(() => {
        ambientLight.color.set(guiParameters.ambientLightColor)
})
gui.add(guiParameters, 'ambientLightIntensity')
    .onChange(() => {
        ambientLight.intensity = guiParameters.ambientLightIntensity
}).min(0).max(100).step(0.01)

gui.addColor(guiParameters, 'directionalLightColor')
    .onChange(() => {
        directionalLight.color.set(guiParameters.directionalLightColor)
})
gui.add(guiParameters, 'directionalLightIntensity')
    .onChange(() => {
        directionalLight.intensity = guiParameters.directionalLightIntensity
}).min(0).max(100).step(0.01)
gui.addColor(guiParameters, 'doorLightColor')
    .onChange(() => {
        doorLight.color.set(guiParameters.doorLightColor)
})
gui.add(guiParameters, 'doorLightIntensity')
    .onChange(() => {
        doorLight.intensity = guiParameters.doorLightIntensity
}).min(0).max(100).step(0.01)
gui.add(guiParameters, 'doorLightDist')
    .onChange(() => {
        doorLight.distance = guiParameters.doorLightDist
}).min(0).max(100).step(0.01)
gui.add(guiParameters, 'doorLightDecay')
    .onChange(() => {
        doorLight.decay = guiParameters.doorLightDecay
}).min(0).max(100).step(0.01)
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 *Textures 
 */


const textureLoader = new THREE.TextureLoader();

//  Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg');
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg');
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg');
const floorDispTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg');
const floorNorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg');

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorDispTexture.repeat.set(8, 8);
floorNorTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorDispTexture.wrapS = THREE.RepeatWrapping;
floorNorTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorDispTexture.wrapT = THREE.RepeatWrapping;
floorNorTexture.wrapT = THREE.RepeatWrapping;


// Walls Textures

const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg');
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg');
const wallNorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;


// Roof Textures

const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg');
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg');
const roofNorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg');

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofARMTexture.repeat.set(1, 1);
roofColorTexture.repeat.set(1, 1);
roofNorTexture.repeat.set(1, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofNorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapT = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;
roofNorTexture.wrapT = THREE.RepeatWrapping;


// Bush Textures

const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg');
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg');
const bushNorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg');

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushARMTexture.repeat.set(2, 1);
bushColorTexture.repeat.set(2, 1);
bushNorTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushNorTexture.wrapS = THREE.RepeatWrapping;


// Grave Textures

const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg');
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg');
const graveNorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg');

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveARMTexture.repeat.set(0.3, 0.4);
graveColorTexture.repeat.set(0.3, 0.4);
graveNorTexture.repeat.set(0.3, 0.4);

// Door Textures

const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorAOTexture = textureLoader.load('./door/ambientOcclusion.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');
const doorMetalTexture = textureLoader.load('./door/metalness.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNorTexture,
        displacementMap: floorDispTexture,
        displacementScale: 0.373,
        displacementBias: -0.156
    
    })
)
floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001);
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001);

// House container
const house = new THREE.Group();
scene.add(house);

//  Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        normalMap: wallNorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture

    })
)
walls.position.y = 1.25;
house.add(walls);

// Roof

const roofMaterial = new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    normalMap: roofNorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture
})

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    roofMaterial
);

roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
// house.add(roof);

//  Roof from scratch
const roofGeometry = new THREE.BufferGeometry();

const roofHeight = 1.5;
const roofHalfWidth = 2.25;

const topVert =   [0, 1 * roofHeight, 0];
const baseVert1 = [roofHalfWidth, 0, -roofHalfWidth];
const baseVert2 = [roofHalfWidth, 0, roofHalfWidth];
const baseVert3 = [-roofHalfWidth, 0, roofHalfWidth];
const baseVert4 = [-roofHalfWidth, 0, -roofHalfWidth];


const roofVerts = new Float32Array([
    topVert[0],    topVert[1],    topVert[2],
    baseVert2[0],  baseVert2[1],  baseVert2[2],
    baseVert1[0],  baseVert1[1],  baseVert1[2],

    topVert[0],    topVert[1],    topVert[2],
    baseVert3[0],  baseVert3[1],  baseVert3[2],
    baseVert2[0],  baseVert2[1],  baseVert2[2],
     
    topVert[0],    topVert[1],    topVert[2],
    baseVert4[0],  baseVert4[1],  baseVert4[2],
    baseVert3[0],  baseVert3[1],  baseVert3[2],

    topVert[0],    topVert[1],    topVert[2],
    baseVert1[0],  baseVert1[1],  baseVert1[2],
    baseVert4[0],  baseVert4[1],  baseVert4[2],

    baseVert1[0],  baseVert1[1],  baseVert1[2],
    baseVert2[0],  baseVert2[1],  baseVert2[2],
    baseVert3[0],  baseVert3[1],  baseVert3[2],
    
    baseVert3[0],  baseVert3[1],  baseVert3[2],
    baseVert4[0],  baseVert4[1],  baseVert4[2],
    baseVert1[0],  baseVert1[1],  baseVert1[2],
]);

const roofUV = new Float32Array([
    0.5, 1,
      0, 0,
      1, 0,

    0.5, 1,
      0, 0,
      1, 0,

    0.5, 1,
      0, 0,
      1, 0,

    0.5, 1,
      0, 0,
      1, 0,

      1, 1,
      0, 1,
      0, 0,

      0, 0,
      0, 1,
      1, 1    
      
])

roofGeometry.setAttribute( 'position', new THREE.BufferAttribute( roofVerts, 3 ) );
const roofFromScratch = new THREE.Mesh( 
    roofGeometry, 
    roofMaterial
);


roofGeometry.computeVertexNormals();
console.log(roofGeometry);
roofGeometry.setAttribute('uv', new THREE.BufferAttribute(roofUV, 2));



// roofFromScratch.position.y = 5;
roofFromScratch.position.y = 2.5;
gui.add(roofFromScratch.position, 'y').min(0).max(10).step(0.01).name('Roof Y Position');

house.add(roofFromScratch);



//  Door
const doorMaterial = new THREE.MeshStandardMaterial({
    color: guiParameters.doorColor,
    map: doorColorTexture,
    displacementMap: doorHeightTexture,
    aoMap: doorAOTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    displacementScale: 0.1,
    displacementBias: -0.025
})
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    doorMaterial
)
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes




const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: guiParameters.bushColor,
    map: bushColorTexture,
    normalMap: bushNorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture
});




const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = - 0.75;
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = - 0.75;
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = - 0.75;
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = - 0.75;

house.add(bush1, bush2, bush3, bush4);


// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNorTexture
})

const graves = new THREE.Group()
scene.add(graves);

for(let i = 0; i < 30; i++)
{

    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.x = x;
    grave.position.y = Math.random() * 0.4;
    grave.position.z = z;

    grave.rotation.x = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    // Add graves to group
    graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(guiParameters.ambientLightColor, guiParameters.ambientLightIntensity)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(guiParameters.directionalLightColor, guiParameters.directionalLightIntensity)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight(guiParameters.doorLightColor, guiParameters.doorLightIntensity, guiParameters.doorLightDist, guiParameters.doorLightDecay)
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

//  Ghosts

const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#ff0000', 6);
scene.add(ghost1, ghost2, ghost3);

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

//  Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;

roof.castShadow = true;

floor.receiveShadow = true;

for(const grave of graves.children){
    grave.castShadow = true;
    grave.receiveShadow = true;
}

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45);
    
    const ghost2Angle = - elapsedTime * 0.38;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);
    
    const ghost3Angle = - elapsedTime * 0.23;
    ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y = Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()