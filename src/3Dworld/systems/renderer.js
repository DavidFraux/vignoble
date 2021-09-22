import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ alpha: true });
  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export {createRenderer};