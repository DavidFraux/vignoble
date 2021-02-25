import {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from 'three'
import Gradient from "javascript-color-gradient";
import colorTextureFile from '../../assets/textures/uv-test-col.png';
import bwTextureFile from '../../assets/textures/uv-test-bw.png';

// ======== material ===========
const colorGradient = new Gradient();
const midpoints = 200;
colorGradient.setMidpoint(midpoints);
colorGradient.setGradient("#3F2CAF", "#e9446a", "#edc988", "#607D8B", "#3F2CAF");
const colorArray = colorGradient.getArray();
function getRandomColor() {
  //from the colorGradiant object range : [1 - midpoints]
  const randomNumber =  Math.floor(Math.random() * midpoints ) + 1;
  return colorGradient.getColor(randomNumber);
}

function shiftColor (elapsedT, cube) {
  const actualColor = '#' + cube.material.color.getHexString();
  const actualColorIndex = colorArray.indexOf(actualColor);
  const nextColorIndex = (actualColorIndex+1)%midpoints;
  const newcolor = colorGradient.getColor(nextColorIndex+1);
  cube.material.color.set(newcolor);
}


function createMaterial (isBasicMaterial, cube, callback) {
  const textureLoader = new TextureLoader();
  let material;
  // textureLoader.load(
  //   // resource URL
  //   colorTextureFile,
  //   // onLoad callback
  //   function ( texture ) {
  //     // in this example we create the material when the texture is loaded
  //     material = new MeshStandardMaterial({ map: texture } );
  //     cube.material = material;
  //     console.log('incallBack');
  //   }
  // );
  const colTexture = textureLoader.load(colorTextureFile);
  const bwTexture = textureLoader.load(bwTextureFile);
  if (isBasicMaterial) {
    material = new MeshBasicMaterial({color: getRandomColor(),});
    material.map = colTexture;
  } else {
    material = new MeshStandardMaterial({color: getRandomColor(), map: colTexture,});
    material.alphaMap = bwTexture;
    material.transparent = true;
  };
  cube.material = material;
}





// ======== MOVES ===========
const rpm = 5;//we want x rotations per minute
const radiansPerSecond = MathUtils.degToRad(360*rpm/60);
function rotate (delta, cube) {
  //console.log(`a ${rpm} rpm it is ${radiansPerSecond} rad per sec. Lewy uses ${MathUtils.degToRad(30)}`);
  cube.rotation.z += radiansPerSecond * delta;
  cube.rotation.y += radiansPerSecond * delta;
  cube.rotation.x += radiansPerSecond * delta;
}




function createCube(position, isBasicMaterial) {
  const geometry = new BoxBufferGeometry(2,2,2);
  const cube = new Mesh(geometry);
  createMaterial(isBasicMaterial, cube);
  cube.position.set(...position);
  cube.rotation.set(Math.random(), Math.random(), Math.random());
  //let sumDelta = 0;
  //this tick() method will be called once per frame
  cube.tick = (deltaT, elapsedT) => {//delta is time elapsed since last frame in seconds
    rotate(deltaT, cube);
    shiftColor(elapsedT, cube);
  };
  return cube;
}

export {createCube};
