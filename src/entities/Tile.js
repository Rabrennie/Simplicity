import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xDEE1B6 });

class Tile extends Entity {
  constructor() {
    super(geometry, material);
    this.mesh.position.y = -150

    this.afterTriggered = false;
    this.beforeTriggered = false;
  }

  nextTo(player) {
    console.log('nextTo');
  }

  beforeStepOn(player) {
    if(!this.beforeTriggered) {
      console.log('beforeStepOn', this.mesh.position);
    }
    this.beforeTriggered = true;
    this.afterTriggered = false;
  }

  afterStepOn(player) {
    if(!this.afterTriggered) {
      console.log('afterStepOn', this.mesh.position);
    }
    this.afterTriggered = true;
    this.beforeTriggered = false;

  }


}

export default Tile;
