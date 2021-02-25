import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from '../systems/setupModel.js';
import parrotFile from '../../assets/models/Parrot.glb';
import flamingoFile from '../../assets/models/Flamingo.glb';
import storkFile from '../../assets/models/Stork.glb';



async function loadBirds() {
  const loader = new GLTFLoader();
  //const parrotData = await loader.loadAsync(parrotFile);
  const [ parrotData, flamingoData, StorkData ] = await Promise.all([
    loader.loadAsync(parrotFile),
    loader.loadAsync(flamingoFile),
    loader.loadAsync(storkFile),
  ])

  const parrot = setupModel(parrotData);
  parrot.position.set(0,0,2.5);
  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5,0,-7);
  const stork = setupModel(StorkData);
  stork.position.set(0,-2.5,-7);
  return { parrot, flamingo, stork };
}

export {loadBirds};