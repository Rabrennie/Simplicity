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

  nextTo(player) {
    console.log('nextTo', player);
  }

  beforeStepOn(player) {
    if(!this.beforeTriggered) {
      this.beforeCallback(player);
    }
    this.beforeTriggered = true;
    this.afterTriggered = false;
  }

  afterStepOn(player) {
    if(!this.afterTriggered) {
      this.afterCallback(player);
    }
    this.afterTriggered = true;
    this.beforeTriggered = false;

  }


}

export default Tile;
