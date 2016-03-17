import Entity from './Entity';
import Simplicity from '../Simplicity'

const geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1);

class Tile extends Entity {
  constructor(newMaterial) {

    if(newMaterial) {
      super(geometry, newMaterial);

    } else {
      super(geometry, new THREE.MeshBasicMaterial({ color: 0xEEEEEE }));
    }

    this.mesh.position.y = -150

    this.nextTriggered = false;
    this.afterTriggered = false;
    this.beforeTriggered = false;
    this.stepTriggered = false;

    this.nextCallback = function() {};
    this.beforeCallback = function() {};
    this.afterCallback = function() {};
    this.stepCallback = function() {};

    this.sound = Simplicity.sound.move;

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
      this.sound.play();
      this.afterCallback(level);
    }
    this.afterTriggered = true;
    this.beforeTriggered = false;

  }

  stepOff(level) {
    if(!this.stepTriggered) {
      this.stepCallback(level);
    }

    this.stepTriggered = true;

  }


}

export default Tile;
