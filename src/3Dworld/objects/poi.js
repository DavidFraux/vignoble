import {
  SphereBufferGeometry,
  Mesh,
  ShaderMaterial,
  FrontSide,
  AdditiveBlending,
  Box3,
} from 'three'

// ======== MOVES ===========
const sizePerSecond = 0.5;
const maxSize = 1.3;
function dynascale2(delta, meshObj) {
  const factor = 1 + sizePerSecond * delta;
  if (meshObj.scale.x >=  maxSize) {
    meshObj.isGrowing = !meshObj.isGrowing; 
    meshObj.scale.set(maxSize-0.01, maxSize-0.01, maxSize-0.01);
  } else if (meshObj.scale.x <= 1 ){
    meshObj.isGrowing = !meshObj.isGrowing; 
    meshObj.scale.set(1.01, 1.01, 1.01);
  }
  if (meshObj.isGrowing) {
     meshObj.scale.multiplyScalar(factor);
  } else {
    meshObj.scale.multiplyScalar(1/factor);
  };
}



function createPoi(id, poiData) {
  const customMaterial = new ShaderMaterial( 
    {
        uniforms: 
      { 
        "c":   { type: "f", value: 1.0 },
        "p":   { type: "f", value: 1.4 },
        glowColor: { type: "c", value: '#ffff00' },
        //viewVector: { type: "v3", value: camera.position }
      },
      side: FrontSide,
      blending: AdditiveBlending,
      transparent: true
    }   );
  const geometry = new SphereBufferGeometry(0.12, 32, 32);
  const meshObj = new Mesh(geometry);
  //createMaterial(meshObj);
  meshObj.material = customMaterial;
  meshObj.position.set(...poiData.position);
  meshObj.name = poiData.name;
  meshObj.keyname = id;
  meshObj.isGrowing = true;
  const initScale = Math.random() * maxSize-0.1  + 1;
  meshObj.scale.set(initScale, initScale, initScale);
  meshObj.tick = (deltaT, elapsedT) => {//delta is time elapsed since last frame in seconds
    dynascale2(deltaT, meshObj);
  };
  return meshObj;
}

export {createPoi};




//===========

