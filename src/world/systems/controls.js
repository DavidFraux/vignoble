import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { upZtoY } from '../systems/orientation';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  //controls.enableDamping = true;//works only if loop is on
  const initTarget = upZtoY({ x: 4.2, y: -2.13, z: 1.35 });
  controls.target.set( initTarget.x, initTarget.y, initTarget.z  );
  console.log(initTarget);

  //soft moves
  let mvStep;
  const steps = 30;//frames of move animation
  let i = steps;//init
  controls.tick = (deltaT, elapsedT) => {
    //isZoomingOut ? (camera.position.z += zoomSpeed*deltaT) : (camera.position.z -= zoomSpeed*deltaT);
    //if (Math.floor(camera.position.z) === 20 || Math.ceil(camera.position.z) === 10) {isZoomingOut = !isZoomingOut};
    if (i < steps) {
      i++;
      controls.target.x += mvStep[0];
      controls.target.y += mvStep[1];
      controls.target.z += mvStep[2];
    };
    controls.update();
  };
  //controls.autoRotate = true;
  //controls.autoRotateSpeed = 10;
  //controls.target.set(1,2,3);
  controls.resetTarget = () => {
    controls.target.set(initTarget.x, initTarget.y, initTarget.z);
    controls.update();
  }

  controls.randomTarget = (isLooping, targetPosition) => {
        if (isLooping) {
          i = 0;//trigger move animation
          mvStep = [//x, y z controls steps
            (targetPosition.x-controls.target.x)/steps, 
            (targetPosition.y-controls.target.y)/steps, 
            (targetPosition.z-controls.target.z)/steps,
          ]; 
        } else {
          controls.target.copy(targetPosition);
        }
        
  }

  return controls;
}

export { createControls };
