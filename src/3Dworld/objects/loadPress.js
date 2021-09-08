import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from '../systems/setupModel.js';
import pressFile from '../../3Dassets/models/lgFutCentered.glb';
import grapeFile from '../../3Dassets/models/grapeLP.glb';

async function loadPress() {
  const loader = new GLTFLoader();
  const [ pressData, grapeData ] = await Promise.all([
    loader.loadAsync(pressFile),
    loader.loadAsync(grapeFile),
  ]);
  const press = setupModel(pressData);
  const grape = setupModel(grapeData);
  grape.position.set(1.82, 0.59, -1.72);
  grape.rotation.z = 3.14/2;//pi/2
  return { press, grape };
}

export {loadPress};