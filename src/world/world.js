import { createCamera } from './objects/camera.js';
import { createPoi } from './objects/poi.js';
import { createScene } from './objects/scene.js';
import { createLights } from './objects/lights.js';
import { loadPress } from './objects/loadPress.js'
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRaycast } from './systems/raycaster.js';
import { createControls, fitCameraToSelection  } from './systems/controls.js';



// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;

// function getRandomNumber(min, max) {
//   const randomNumber =  Math.floor(Math.random() * (max - min)) + min;
//   return randomNumber;
// }

class World {
  constructor(container) {
    // not declared as this.camera (etc) in order to avoid access to that variables from out of world module 
    this.models = [];//meshes objects will be pushed here for convenience purpose
    this.pois = [];
    //const targets = new Group;
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
    this.createPois();
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
    createRaycast(renderer, scene.children, camera);
  }

  async init() {
    // asynchronous setup here, load gltf model and any other loaded stuff
    const { press, grape,} = await loadPress();
    this.models.push(press, grape,);
    loop.updatables.push(press,);
    scene.add(press, grape);
    this.resetCam();
  }


  createPois () {
    const poisToCreate = [
      {name: 'tonneau',   position: [1.16, 0.5, -3.2]   },
      {name: 'mouton',    position: [3.55, 1.43, -1.54], buttonName: 'couchages' },
      {name: 'vis',       position: [4.1, 1, -4.76]     },
      {name: 'aiguilles', position: [3.64, 2, -0.31]    },
    ];
    for (const poi of poisToCreate) {
      const threeObject = createPoi(poi);
      this.pois.push(threeObject);
      this.models.push(threeObject);
      loop.updatables.push(threeObject);
    };
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

  gotTo(isLooping, target) {
    controls.goTo(isLooping, target);
    //camera.goTo(isLooping, targetPosition);
    controls.update();//only in case loop is Off, actually it is included in loop
  }
}
  
  export default World;


