import {
  SphereBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MathUtils,
} from 'three'

function createMaterial (meshObj) {
  const material = new MeshBasicMaterial({color: 'yellow'});
  material.wireframe = true;
  meshObj.material = material;
}


// ======== MOVES ===========
const rpm = 5;//we want x rotations per minute
const radiansPerSecond = MathUtils.degToRad(360*rpm/60);
function rotate (delta, meshObj) {
  //console.log(`a ${rpm} rpm it is ${radiansPerSecond} rad per sec. Lewy uses ${MathUtils.degToRad(30)}`);
  meshObj.rotation.z += radiansPerSecond * delta;
  meshObj.rotation.y += radiansPerSecond * delta;
  meshObj.rotation.x += radiansPerSecond * delta;
}




function createEmpty(position) {
  const geometry = new SphereBufferGeometry(0.1, 32, 32);
  const meshObj = new Mesh(geometry);
  createMaterial(meshObj);
  meshObj.position.set(...position);

  meshObj.tick = (deltaT, elapsedT) => {//delta is time elapsed since last frame in seconds
    rotate(deltaT, meshObj);
  };
  return meshObj;
}

export {createEmpty};
