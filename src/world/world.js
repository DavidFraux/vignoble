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
  constructor(container, poisData, callback) {
    // not declared as this.camera (etc) in order to avoid access to that variables from out of world module 
    this.models = [];//meshes objects will be pushed here for convenience purpose
    this.pois = {};// {id: poi3DObject}
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
    this.createPois(poisData);
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
    createRaycast(renderer, scene.children, camera, callback);
  }

  async init() {
    // asynchronous setup here, load gltf model and any other loaded stuff
    const { press, grape,} = await loadPress();
    this.models.push(press, grape,);
    loop.updatables.push(press,);
    scene.add(press, grape);
    this.resetCam();
  }



  createPois (poisData) {
    //creates pois from high level defined pois data
    //creates {id1:poi3Dobject1; id2:poi3Dobject2}  from {id1:poiData1; id2:poiData2}
    for ( const id in poisData ) {
      const threeObject = createPoi(id, poisData[id]);
      this.pois[id] = threeObject;
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

  goTo(isLooping, poiId) {
    controls.goTo(isLooping, this.pois[poiId]);
    //camera.goTo(isLooping, targetPosition);
    controls.update();//only in case loop is Off, actually it is included in loop
  }
}
  
  export default World;


