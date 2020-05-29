

let container;
let camera;
let renderer;
let scene;

// TO-DO
// - Reference DOM elements and add them to scene as 3D elements
// - Event listeners for mouse (OrbitControls)
// - Add background
// - Etc.


function init() {
    // Declare variables
    container = document.querySelector('.scene');
    const planeSize = 10;
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    // Create scene
    scene = new THREE.Scene();

    // Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 30);

    // Lighting Setup
    
    // Ambient light
    ambien = new THREE.AmbientLight(0xffffff, 0.5);
    ambien.position.set(0, 5, 3);
    scene.add(ambien);

    // Directional light with shadows enabled
    dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(0, 50, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.near = 0.2; 
    scene.add(dirLight); 

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    container.appendChild(renderer.domElement);

    // Create cube mesh and add to scene
    geometry = new THREE.BoxBufferGeometry(3, 3, 3);
    texture = new THREE.TextureLoader().load( '../assets/textures/texture.jpg' );
    material = new THREE.MeshPhongMaterial({ map: texture });
    cubeMesh = new THREE.Mesh(geometry, material);

    cubeMesh.position.set(3,3,3);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;
    scene.add(cubeMesh);

    // Create floor plane and add to scene
    planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    planeMat = new THREE.MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 0.3
    })

    planeMesh = new THREE.Mesh(planeGeo, planeMat);
    
    planeMesh.rotation.x = Math.PI * -.5;
    planeMesh.position.y = cubeMesh.position.y - 5;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // Get starting cubecubeMesh height
    centerHeight = cubeMesh.position.y;

    // Set cubecubeMesh to be center of window
    camera.lookAt(cubeMesh.position);

    //debugTools();
    animate();
}

function animateCube () {
    yPos = centerHeight + 1.5 * Math.sin(performance.now() / 2500);
   cubeMesh.position.y = yPos;
   cubeMesh.rotation.z += 0.002;
   cubeMesh.rotation.x += 0.002;
}

function animate() {
    requestAnimationFrame(animate);
    animateCube();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function debugTools() {
    helper = new THREE.DirectionalLightHelper(dirLight, 5);
    scene.add(helper);
}
  
window.addEventListener("resize", onWindowResize);
init();

