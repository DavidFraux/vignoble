import { PerspectiveCamera, Box3, Vector3 } from 'three';
import { upZtoY } from '../systems/orientation';

function fitCameraToSelection( camera, controls, selection, fitOffset = 1 ) {
  
  const box = new Box3();
  
  for( const object of selection ) box.expandByObject( object );
  
  const size = box.getSize( new Vector3() );
  const center = box.getCenter( new Vector3() );
  
  const maxSize = Math.max( size.x, size.y, size.z );
  const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
  
  const direction = controls.target.clone()
    .sub( camera.position )
    .normalize()
    .multiplyScalar( distance );

  controls.maxDistance = distance * 10;
  controls.target.copy( center );
  
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy( controls.target ).sub(direction);
  
  controls.update();
  
}


function createCamera() {
  const fov = 45;
  const aspect = 1;
  const near = 0.01;
  const far= 1000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  const initPos =  { x: -2.8067965626621003, y: 4.296325860580075, z: -5.898964314929673 };
  camera.position.set(initPos.x, initPos.y, initPos.z);
  //lookAt is managed by orbitControl.target
  let mvStep;
  const steps = 30;//frames of move animation
  let i =steps;
  camera.tick = (deltaT, elapsedT) => {
    //isZoomingOut ? (camera.position.z += zoomSpeed*deltaT) : (camera.position.z -= zoomSpeed*deltaT);
    //if (Math.floor(camera.position.z) === 20 || Math.ceil(camera.position.z) === 10) {isZoomingOut = !isZoomingOut};
    if (i < steps) {
      i++;
      camera.position.x += mvStep[0];
      camera.position.y += mvStep[1];
      camera.position.z += mvStep[2];
    }
  };
  camera.reset = () => {
    camera.position.set(initPos.x, initPos.y, initPos.z);
  };
  camera.printCamPos = () => {
    console.log('CamPosition', camera.position);
    var vector = new Vector3();
    camera.getWorldDirection( vector );
    console.log('CamDirection', vector);
  }

  camera.goTo = (isLooping, targetPosition) => {
    const offset = 1;// in order to see the target object
    targetPosition.x += offset;
    targetPosition.y += offset;
    targetPosition.z += offset;
    if (isLooping) {
      i = 0;//trigger move animation
      mvStep = [ //x, y z cam steps
        (targetPosition.x-camera.position.x)/steps, 
        (targetPosition.y-camera.position.y)/steps, 
        (targetPosition.z-camera.position.z)/steps
      ];
    } else {
      camera.position.x = targetPosition.x;
      camera.position.y = targetPosition.y;
      camera.position.z = targetPosition.z;
    }
    
  }
  return camera;
}

export {createCamera, fitCameraToSelection};

