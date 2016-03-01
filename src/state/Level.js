import State from './State';
import Simplicity from '../Simplicity';
import Player from '../entities/Player.js';
import Tile from '../entities/Tile.js';


class Level extends State {
  constructor() {
    super();
  }

  create() {
    this.player = new Player();
    this.tile = new Tile();
    this.player.addToScene(Simplicity.scene);
    this.tile.addToScene(Simplicity.scene);
  }

  update() {
    if(Simplicity.keysDown[68]) {
      this.player.test();
    }
    if(this.player.position.x > 5400) {
      Simplicity.StateManager.load('test');
    }
    this.player.lookAt(Simplicity.camera);
  }
}

export default Level;
