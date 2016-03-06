import State from './State';
import Simplicity from '../Simplicity';
import Player from '../entities/Player.js';
import Tiles from '../entities/tiles/Tiles.js';


class Level extends State {
  constructor() {
    super();
    this.layout = [[1, 2, 1],[1, 2, 1],[0, 2, 0],[1, 2, 1],[1, 3, 1]];
    this.tiles = [];
  }

  create() {
    this.player = new Player();
    this.player.addToScene(Simplicity.scene);
    this.player.cameraFollow(Simplicity.camera);
    this.spawnTiles();
    Simplicity.UIManager.add('test', '2');
    this.maxSteps = 5;
    this.curSteps = 0;
    this.timeBetween = 2;

  }

  spawnTiles() {
    for (var z = 0; z < this.layout.length; z++) {
      this.tiles.push([]);
      for (var x = 0; x < this.layout[z].length; x++) {
        if(this.layout[z][x] > 0) {
          this.tiles[z][x] = new Tiles[this.layout[z][x]]();
          this.tiles[z][x].addToScene(Simplicity.scene);
          this.tiles[z][x].position.x = x*200;
          this.tiles[z][x].position.z = z*200;
        }
      }
    }
  }

  update() {

    if(this.moved) {
      this.onStep();
    }

    this.afterTrigger();

    if(!this.player.tweening) {
      this.moved = false;
      if(Simplicity.keysDown[68]) {
        this.beforeTrigger(this.player.tileZ,this.player.tileX+1);
        this.player.move('right');
        this.moved = true;
      } else if(Simplicity.keysDown[83]) {
        this.beforeTrigger(this.player.tileZ+1,this.player.tileX);
        this.player.move('down');
        this.moved = true;
      } else if(Simplicity.keysDown[65]) {
        this.beforeTrigger(this.player.tileZ,this.player.tileX-1);
        this.player.move('left');
        this.moved = true;
      } else if(Simplicity.keysDown[87]) {
        this.beforeTrigger(this.player.tileZ-1,this.player.tileX);
        this.player.move('up');
        this.moved = true;
      }
    }

  }

  beforeTrigger(z, x) {
    if(!this.player.tweening) {
      if(this.checkTile(z, x)) {
        this.tiles[z][x].beforeStepOn(this);
      }
    }
  }

  afterTrigger() {
    if(!this.player.tweening) {
      if(this.checkTile(this.player.tileZ, this.player.tileX)) {
        this.tiles[this.player.tileZ][this.player.tileX].afterStepOn(this);
      } else {
        this.fall();
      }

      if(this.checkTile(this.player.tileZ-1, this.player.tileX)) {
        this.tiles[this.player.tileZ-1][this.player.tileX].nextTo(this);
      }

      if(this.checkTile(this.player.tileZ+1, this.player.tileX)) {
        this.tiles[this.player.tileZ+1][this.player.tileX].nextTo(this);
      }

      if(this.checkTile(this.player.tileZ, this.player.tileX-1)) {
        this.tiles[this.player.tileZ][this.player.tileX-1].nextTo(this);
      }

      if(this.checkTile(this.player.tileZ, this.player.tileX+1)) {
        this.tiles[this.player.tileZ][this.player.tileX+1].nextTo(this);
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

  fall() {
    this.timer.stop();
    this.player.fall(() => {this.reset()});
  }

  reset() {
    this.moved = false;
    Simplicity.keysDown = {}
    Simplicity.StateManager.load('test');
  }

  win() {
    this.timer.stop();
    this.player.tweening = true;
    const winContainer = Simplicity.UIManager.add('win', '')
    Simplicity.UIManager.add('title', 'You Win', winContainer)
    const nextBtn = Simplicity.UIManager.add('nextBtn', 'Next Level', winContainer)
    nextBtn.addEventListener('mouseup', () => {
      this.reset();
    });
  }

  onStep() {
    this.curSteps+=1;
    this.moved = false;

    if(this.timer) {
      this.timer.stop();
    }

    if(this.curSteps > this.maxSteps) {
      this.reset();
      return;
    }

    this.time = { val:this.timeBetween };
    this.timer = new TWEEN.Tween(this.time).to({ val:0 }, 2000);

    this.timer.onUpdate(function() {
      Simplicity.UIManager.update('test', Math.round(this.val*10)/10)
    })

    this.timer.start();

  }


}

export default Level;
