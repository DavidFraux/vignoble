import { createCamera, fitCameraToSelection } from './objects/camera.js';
import { createEmpty } from './objects/empty.js';
import { createScene } from './objects/scene.js';
import { createLights } from './objects/lights.js';
import { setOrientation } from './systems/orientation.js';
import { loadBirds } from './objects/birds.js'
import { loadPress } from './objects/loadPress.js'

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createControls } from './systems/controls.js';



// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;

function getRandomNumber(min, max) {
  //from the colorGradiant object range : 
  const randomNumber =  Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
}

class World {
  constructor(container) {
    // not declared as this.camera (etc) in order to avoid access to that variables from out of world module 
    this.models = [];//meshes objects will be pushed here for convenience purpose
    //setOrientation([0, 0, 1]);//z up
    renderer = createRenderer();
    camera = createCamera();
    scene = createScene();
    container.append(renderer.domElement);
    loop = new Loop(camera, scene, renderer);
    controls = createControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
      this.render();
    });
    this.populateEmpties();
    loop.updatables.push(camera);
    loop.updatables.push(controls);
    const lights = createLights()
    scene.add(...lights);
    scene.add(...this.models);
    const resizer = new Resizer(container, camera, renderer);
    //hook from Resizer trigger here, useless in loop styles
    resizer.onResize = () => {
      this.render();
    };
  }

  async init() {
    // asynchronous setup here, load gltf model and any other loaded stuff
    const { press, grape,} = await loadPress();
    this.models.push(press, grape,);
    loop.updatables.push(press,);
    scene.add(press, grape);
    this.resetCam();
  }

  populateEmpties () {
    this.models.push(createEmpty([1.16, 0.5, -3.2]));//tonneau
    this.models.push(createEmpty([3.55, 1.43, -1.54]));//mouton
    this.models.push(createEmpty([4.1, 1, -4.76]));//barre
    this.models.push(createEmpty([3.64, 2, -0.31]));//aiguilles
    loop.updatables.push(...this.models);
  }
  
  // 2. Render the scene
  render() {
    // draw a single frame, render on demand
    renderer.render(scene, camera);
  }

  start() {
    // produces a steam of frames
    loop.start();
  }
  
  stop() {
    loop.stop();
  }

  printCamPos() {
    camera.printCamPos();
  }

  resetCam() {
    camera.reset();
    controls.resetTarget();
    fitCameraToSelection( camera, controls, this.models);
  }

  gotTo(isLooping, targetPosition) {
    if (!targetPosition) {//define a target randomly among first level objects
      const positions = this.models.map(x => x.position);
      const randomIndex = getRandomNumber(0, positions.length);
      targetPosition = {...positions[randomIndex]};//copy of the position, in order not to affect object's real position
    }
    //camera.randomPos(renderer);
    controls.randomTarget(isLooping, targetPosition);
    camera.goTo(isLooping, targetPosition);
    controls.update();//only in case loop is Off, actually it is included in loop
  }
}
  
  export default World;


