import { Raycaster, Vector2, Group } from 'three';

const mouse = new Vector2();
const raycaster = new Raycaster();


function getMouseCoord( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    //sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
  event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  //41 is for header height, I cant get the 
	mouse.y = - ( (event.clientY-41) / (window.innerHeight) ) * 2 + 1;
  raycaster.cast();
  console.log('click)');
}

function createRaycast(renderer, objects, camera) {
  renderer.domElement.addEventListener( 'click', getMouseCoord, false );
  raycaster.cast = () => {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects, false);
    console.log(intersects);
    for ( var i = 0; i < intersects.length; i++ ) {
      console.log( intersects[ i ] ); 
      intersects[ i ].object.material.color.set( 0xff0000 );
    };
  };

}

export { createRaycast};

//===
