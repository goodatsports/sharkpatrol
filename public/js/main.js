let container;
let camera;
let renderer;
let scene;

// TO-DO
// - Use a sine wave pattern to animate y-axis position of mesh
// - Reference DOM elements and add them to scene as 3D elements
// - Event listeners for mouse (OrbitControls)
// - Add background
// - Etc.


function init() {
    container = document.querySelector('.scene');

    // Create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    // Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 30);

    // Lighting Setup
    hemiLight = new THREE.AmbientLight( 0xffffff, 1);
    hemiLight.position.set(0, 0, 1);
    scene.add( hemiLight ); 

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Create cube mesh and add to scene
    var geometry = new THREE.BoxBufferGeometry(3, 3, 3);
    var texture = new THREE.TextureLoader().load( '../assets/textures/texture.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Set cube mesh to be center of window
    camera.lookAt(mesh.position);

    animate();
}


 
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.z += 0.002;
    mesh.rotation.x += 0.002;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
window.addEventListener("resize", onWindowResize);
  

init();

