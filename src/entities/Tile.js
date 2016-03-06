import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xEEEEEE });

class Tile extends Entity {
  constructor(newMaterial) {

    if(newMaterial) {
      super(geometry, newMaterial);

    } else {
      super(geometry, material);
    }

    this.mesh.position.y = -150

    this.nextTriggered = false;
    this.afterTriggered = false;
    this.beforeTriggered = false;

    this.nextCallback = function() {};
    this.beforeCallback = function() {};
    this.afterCallback = function() {};

  }

  // can only trigger once for now
  nextTo(level) {
    if(!this.nextTriggered) {
      this.nextCallback(level);
      this.nextTriggered = true;
    }
  }

  beforeStepOn(level) {
    if(!this.beforeTriggered) {
      this.beforeCallback(level);
    }
    this.beforeTriggered = true;
    this.afterTriggered = false;
  }

  afterStepOn(level) {
    if(!this.afterTriggered) {
      this.afterCallback(level);
    }
    this.afterTriggered = true;
    this.beforeTriggered = false;

  }


}

export default Tile;
