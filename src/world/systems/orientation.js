import { Object3D, MathUtils } from 'three';

function setOrientation(xyz) {
  Object3D.DefaultUp.set(...xyz);
}

function rotate(x, y, z, degToRad, isArray) {
  let x2, y2, z2;
  if (degToRad) {
    x2 = MathUtils.degToRad(x);
    y2 = MathUtils.degToRad(z);
    z2 = MathUtils.degToRad(-y);
  }
  x2 = x;
  y2 = z;
  z2 = -y;
  if (isArray) {
    return ([x2, y2, z2]);
  } else {
    return ({x:x2, y:y2, z:z2});
  }
}

function upZtoY(xyz, degToRad=false) {
  let x, y, z;
  if (typeof xyz === 'array') {
    x= xyz[0];
    y= xyz[1];
    z= xyz[2];
    return(rotate(x, y, z, degToRad, true));
  } else if (typeof xyz === 'object') {
    x= xyz.x;
    y= xyz.y;
    z= xyz.z;
    return(rotate(x, y, z, degToRad, false));
  }
}


export {setOrientation, upZtoY};