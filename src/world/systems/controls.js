import { OrbitControls, } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box3, Vector3 } from 'three';
import { upZtoY } from '../systems/orientation';
import TWEEN from '@tweenjs/tween.js';


function tweenCamera(camera, controls, selectedObject, duration) { 
  new TWEEN.Tween(controls.target).to( {
    x: selectedObject.position.x,
    y: selectedObject.position.y,
    z: selectedObject.position.z + 0.5
  }, duration)
  .easing( TWEEN.Easing.Quadratic.InOut)
  .start();
  new TWEEN.Tween(camera.position).to({
    x: selectedObject.position.x - 1.5,
    y: selectedObject.position.y + 1.5,
    z: selectedObject.position.z - 1.5
  }, duration)
  .easing( TWEEN.Easing.Quadratic.InOut)
  .start();
}

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
  //tweenCamera(camera, direction, 2000);
  camera.position.copy( controls.target ).sub(direction);
  controls.update();
}

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  //controls.enableDamping = true;//works only if loop is on
  const initTarget = upZtoY({ x: 4.2, y: -2.13, z: 1.35 });
  controls.target.set( initTarget.x, initTarget.y, initTarget.z  );
  controls.tick = (deltaT, elapsedT) => {
    controls.update();
    TWEEN.update();
  };
  controls.resetTarget = () => {
    controls.target.set(initTarget.x, initTarget.y, initTarget.z);
    controls.update();
  }

  controls.goTo = (isLooping, target) => {
        if (isLooping) {
          tweenCamera(camera, controls, target, 500);
        } else {
          fitCameraToSelection( camera, controls, [target], 10)
        }
        
  }

  return controls;
}

export { createControls, fitCameraToSelection };


