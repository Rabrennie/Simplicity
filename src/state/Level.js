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
    for (var z = 0; z < this.layout.length; z++) {
      this.tiles.push([]);
      for (var x = 0; x < this.layout[z].length; x++) {
        this.tiles[z][x] = new Tile();
        this.tiles[z][x].addToScene(Simplicity.scene);
        this.tiles[z][x].position.x = x*200;
        this.tiles[z][x].position.z = z*200;
      }
    }
  }

  update() {

    this.afterTrigger();

    if(!this.player.tweening) {
      if(Simplicity.keysDown[68]) {
        this.beforeTrigger(this.player.tileZ,this.player.tileX+1);
        this.player.move('right');
      } else if(Simplicity.keysDown[83]) {
        this.beforeTrigger(this.player.tileZ+1,this.player.tileX);
        this.player.move('down');
      } else if(Simplicity.keysDown[65]) {
        this.beforeTrigger(this.player.tileZ,this.player.tileX-1);
        this.player.move('left');
      } else if(Simplicity.keysDown[87]) {
        this.beforeTrigger(this.player.tileZ-1,this.player.tileX);
        this.player.move('up');
      }
    }

  }

  beforeTrigger(z, x) {
    if(!this.player.tweening) {
      if(this.checkTile(z, x)) {
        this.tiles[z][x].beforeStepOn();
      }
    }
  }

  afterTrigger() {
    if(!this.player.tweening) {
      if(this.checkTile(this.player.tileZ, this.player.tileX)) {
        this.tiles[this.player.tileZ][this.player.tileX].afterStepOn();
      }
    }
  }

  checkTile(z, x) {
    if(this.tiles[z] !== undefined) {
      if(this.tiles[z][x]) {
        return true;
      }
    }

    return false;
  }
}

export default Level;
