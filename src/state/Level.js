import State from './State';
import Simplicity from '../init';
import Player from '../entities/Player.js';


class Level extends State {
  constructor() {
    super();
  }

  create() {
    this.player = new Player();
    this.player.addToScene(Simplicity.StateManager.scene);
  }

  update() {
    if(Simplicity.keysDown[68]) {
      this.player.test();
    }
    this.player.lookAt(Simplicity.camera);
  }
}

export default Level;
