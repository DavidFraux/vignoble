import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from '../systems/setupModel.js';
import pressFile from '../../3Dassets/models/lgFutCentered.glb';


async function loadPress(pressURL) {
  const loader = new GLTFLoader();
  // in order to load several 3D assets
  //const [ pressData, grapeData ] = await Promise.all([
    //loader.loadAsync(pressFile),
    //loader.loadAsync(grapeFile),
  //]);
  const pressData = await loader.loadAsync(pressURL)
  const press = setupModel(pressData);
  return press ;
}

export {loadPress};