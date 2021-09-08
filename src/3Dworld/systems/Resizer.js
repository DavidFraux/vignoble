class Resizer {
  constructor(container, camera, renderer) {
    // set initial size on load
    this.setSize(container, camera, renderer);
    window.addEventListener('resize', () => {
      this.setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }

  setSize(container, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    //console.log(container.clientWidth , container.clientHeight );
    // update the camera's frustum
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth , container.clientHeight );
    // set the pixel ratio (for mobile devices)
    //console.log(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  // hook anchor, empty method, customizable from outside the class, perform any custom actions
  onResize() {}
}

export {Resizer};