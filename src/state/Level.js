import State from './State';
import Simplicity from '../Simplicity';
import Player from '../entities/Player.js';
import Tile from '../entities/Tile.js';


class Level extends State {
  constructor() {
    super();
    this.layout = [[1, 1, 1],[1, 1, 1],[1, 1, 1]];
    this.tiles = [];

  }

  create() {
    this.player = new Player();
    this.player.addToScene(Simplicity.scene);
    this.player.cameraFollow(Simplicity.camera);
    this.spawnTiles();
  }

  spawnTiles() {
    for (var y = 0; y < this.layout.length; y++) {
      this.tiles.push([]);
      for (var x = 0; x < this.layout[y].length; x++) {
        this.tiles[y][x] = new Tile();
        this.tiles[y][x].addToScene(Simplicity.scene);
        this.tiles[y][x].position.x = x*200;
        this.tiles[y][x].position.z = y*200;
      }
    }
  }

  update() {
    if(Simplicity.keysDown[68]) {
      this.player.test();
    }
    if(this.player.position.x > 5400) {
      Simplicity.StateManager.load('test');
    }

  }
}

export default Level;
