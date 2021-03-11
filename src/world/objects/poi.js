import {
  SphereBufferGeometry,
  Mesh,
  ShaderMaterial,
  FrontSide,
  AdditiveBlending,
  MeshBasicMaterial
} from 'three'

// ======== MOVES ===========
const sizePerSecond = 1.3;
const cycleDuration = 5; //in seconds
const cycleFrames = 60 * cycleDuration;
let isGrowing = true;
let frame = 1; //initialized
function dynascale(delta, meshObj) {
  const factor = 1 + sizePerSecond * delta;
  //isGrowing ? (currentSize = currenSize * variation) : (currentSize = currenSize / variation);
  if (frame === cycleFrames || frame === 0) {isGrowing = !isGrowing};
  if (isGrowing) {
     meshObj.scale.multiplyScalar(factor);
     frame += 1;
  } else {
    meshObj.scale.multiplyScalar(1/factor);
    frame -= 1;
  };
}




function createPoi(poi) {
  const customMaterial = new ShaderMaterial( 
    {
        uniforms: 
      { 
        "c":   { type: "f", value: 1.0 },
        "p":   { type: "f", value: 1.4 },
        glowColor: { type: "c", value: '0xffff00' },
        //viewVector: { type: "v3", value: camera.position }
      },
      side: FrontSide,
      blending: AdditiveBlending,
      transparent: true
    }   );
  const simpleMaterial = new MeshBasicMaterial({color: 0x00ff00});
  const geometry = new SphereBufferGeometry(0.1, 32, 32);
  const meshObj = new Mesh(geometry);
  //createMaterial(meshObj);
  meshObj.material = simpleMaterial;
  meshObj.position.set(...poi.position);
  meshObj.name = poi.name;
  meshObj.buttonName = (poi.buttonName ? poi.buttonName : poi.name);

  meshObj.tick = (deltaT, elapsedT) => {//delta is time elapsed since last frame in seconds
    dynascale(deltaT, meshObj);
  };
  return meshObj;
}

export {createPoi};




//===========

