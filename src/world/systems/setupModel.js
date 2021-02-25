import { AnimationMixer } from 'three';


function setupModel(data) {
  // multiple mesh or single mesh, this avoid creating a useless additional in-between node in the scene
  const model = (data.scene.children.length > 1) ? data.scene : data.scene.children[0];

  if (data.animations && data.animations.length) {
    //ie. if there is at leat 1 animation
    const mixer = new AnimationMixer(model);
    let actions = [];
    for (const anim of data.animations) {
      actions.push(mixer.clipAction(anim));
    };
    for (const action of actions) {
      action.play();
    }
    // const rotBarre = data.animations[0];
    // const levFut = data.animations[1];
    // const levEcrou = data.animations[2];
    
    // const barreAction = mixer.clipAction(rotBarre);
    // const futAction = mixer.clipAction(levFut);
    // const ecrouAction = mixer.clipAction(levEcrou);
    // barreAction.play();
    // futAction.play();
    // ecrouAction.play();
    model.tick = (delta) => { mixer.update(delta) ; };
  }
  
  return model;
}

export { setupModel };