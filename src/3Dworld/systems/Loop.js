import { Clock } from 'three';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    clock.start();
    this.renderer.setAnimationLoop( () => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    clock.stop();
    this.renderer.setAnimationLoop(null);
  }

  tick () {
    const deltaT = clock.getDelta();//time elapsed since last call of getDelta. 
    const elapsedT = clock.getElapsedTime ();
    //console.log(
    //  `The last frame rendered in ${delta * 1000} milliseconds`,
    //);
    for (const object of this.updatables) {
      if (object.paused) {continue;};
      object.tick(deltaT, elapsedT);
    }

  }

}

export { Loop }