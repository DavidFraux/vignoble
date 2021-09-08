import { PointLight , SpotLight} from 'three';

function createLights() {
  const lights = [];
  const light1 = new PointLight('white', 50);
  light1.position.set(-5,10,10);
  lights.push(light1);
  const light2 =  new SpotLight('white', 20);
  light2.position.set(5,10,0);
  light2.target.position.set(0, 0, 0);
  lights.push(light2);
  return lights;
}

export { createLights };