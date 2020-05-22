Physijs.scripts.worker =  '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

//Scene Variables
let light, scene, camera, ambientLight;
let renderer;
let controls;
var frameNumber = 0;


//EnvironmentPlatform
let planet;
let world = new THREE.Object3D();

//CovidCarnival Text Variable
let covidCarnivalText;
var geoText;
var matText;

//Barrier Variables used in EnvironmentPlatform js
let wholeBarrier;
let barrier1, barrier2, barrier3, barrier4;
let tbarrier1, tbarrier2, tbarrier3, tbarrier4;
let cover1, cover2, cover3, cover4;
let cylinder1, cylinder2,cylinder3,cylinder4;

//Loaders
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.GLTFLoader();
var textLoader = new THREE.FontLoader();

//Moon stall
let moonStall, moon, moonText;
let stallHolder = new THREE.Group();
let sphereCamera;

function setupScene(){
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-10,0));

    //Creation of camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        10000 );

    //position of camera in 3D space
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 1500;

    // A light shining from the direction of the camera which moves with the camera.
    light = new THREE.DirectionalLight(0xFFFFFF,0.6);
    light.position.set(0,0,1);
    camera.add(light);
    scene.add(camera);

    //Add ambient light
    ambientLight = new THREE.AmbientLight(0xE6E686);
    scene.add(ambientLight);

    //Creates the controls and imposes restriction for how the player can navigate the world
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.maxDistance = 2000;
    controls.minDistance = 800;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI/2;
    controls.mouseButtons = {
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    }

    var textureURLs = [  // URLs of the six faces of the cubeMap map

        "../Resources/CubeMaps/red/bkg1_right1.png",
        "../Resources/CubeMaps/red/bkg1_left2.png",
        "../Resources/CubeMaps/red/bkg1_top3.png",
        "../Resources/CubeMaps/red/bkg1_bottom4.png",
        "../Resources/CubeMaps/red/bkg1_front5.png",
        "../Resources/CubeMaps/red/bkg1_back6.png"
    ];
    var materials = [];

    for (var i = 0; i < 6; i++) {
        var texture = new textureLoader.load( textureURLs[i] );
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",
            side: THREE.DoubleSide,

            map: texture
        } ) );

    }

    cubeMap = new THREE.Mesh( new THREE.CubeGeometry(5000,5000,5000),
        materials );
    scene.add(cubeMap);

}

//Ray Caster Variables
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

function doMouseDown(event) {

    if(event.button == 0){
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //gets the mouse co-oridnates and converts it to clip-coordinates
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObjects(scene.children);

        if (intersects[0].object == moonStall) { //check if the raycaster(mouse) click intersects with game stalls and takes player to level
            document.getElementById("loadGame");
            window.location.href = "../Shoot/Level1/ShootingGame.html";
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateFrame() {
    planet.rotation.x += 0.1;
    planet.rotation.y += 0.1;

    // covidCarnivalText.rotation.y += 0.5;

    // planet2.rotation.x += 0.06;
    // planet2.rotation.y += 0.06;

}

//Animates the entire scene
function animate () {
    frameNumber++;
    updateFrame();

    if (frameNumber >= 30) {
        frameNumber = 0;
    } //sets frame number to 0 so that animation movements can begin again

    if (frameNumber >= 0 && frameNumber < 15) { //Moves the cylinders in the various barriers in their respective directions

        barrier1.children[0].position.y += 0.5;
        barrier1.children[1].position.y -= 0.5;
        barrier1.children[2].position.y += 0.5;
        barrier1.children[3].position.y -= 0.5;

        barrier2.children[0].position.y += 0.5;
        barrier2.children[1].position.y -= 0.5;
        barrier2.children[2].position.y += 0.5;
        barrier2.children[3].position.y -= 0.5;

        barrier3.children[0].position.y += 0.5;
        barrier3.children[1].position.y -= 0.5;
        barrier3.children[2].position.y += 0.5;
        barrier3.children[3].position.y -= 0.5;

        barrier4.children[0].position.y += 0.5;
        barrier4.children[1].position.y -= 0.5;
        barrier4.children[2].position.y += 0.5;
        barrier4.children[3].position.y -= 0.5;
    }else if (frameNumber >= 15 && frameNumber < 30) {
        //Reverses the movement of the cylinders in the various barriers from the previous if statement

        barrier1.children[0].position.y -= 0.5;
        barrier1.children[1].position.y += 0.5;
        barrier1.children[2].position.y -= 0.5;
        barrier1.children[3].position.y += 0.5;

        barrier2.children[0].position.y -= 0.5;
        barrier2.children[1].position.y += 0.5;
        barrier2.children[2].position.y -= 0.5;
        barrier2.children[3].position.y += 0.5;

        barrier3.children[0].position.y -= 0.5;
        barrier3.children[1].position.y += 0.5;
        barrier3.children[2].position.y -= 0.5;
        barrier3.children[3].position.y += 0.5;

        barrier4.children[0].position.y -= 0.5;
        barrier4.children[1].position.y += 0.5;
        barrier4.children[2].position.y -= 0.5;
        barrier4.children[3].position.y += 0.5;

    }


    scene.simulate(); //Runs the scene
    moon.rotation.y += 0.01; //Rotates the moon atop the Moon stall

    requestAnimationFrame( animate );
    controls.update(); //Updates the orbit controls
    renderer.render( scene, camera ); //Renders the scene
    sphereCamera.update( renderer, scene );
};