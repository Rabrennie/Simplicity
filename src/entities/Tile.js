import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xDEE1B6 });

class Tile extends Entity {
  constructor() {
    super(geometry, material);
    this.mesh.position.y = -150

    this.afterTriggered = false;
    this.beforeTriggered = false;

    this.beforeCallback = function() {console.log('test')};
    this.afterCallback = function() {console.log('test')};
  }

  // TODO: make the callback setable
  nextTo(player) {
    console.log('nextTo');
  }

  // TODO: make the callback setable
  beforeStepOn(player) {
    if(!this.beforeTriggered) {
      this.beforeCallback(player);
    }
    this.beforeTriggered = true;
    this.afterTriggered = false;
  }

  // TODO: make the callback setable
  afterStepOn(player) {
    if(!this.afterTriggered) {
      this.afterCallback(player);
    }
    this.afterTriggered = true;
    this.beforeTriggered = false;

  }


}

export default Tile;
