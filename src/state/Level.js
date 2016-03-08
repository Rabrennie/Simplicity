import State from './State';
import Simplicity from '../Simplicity';
import Player from '../entities/Player.js';
import Tiles from '../entities/tiles/Tiles.js';


class Level extends State {
  constructor() {
    super();
    this.layout = [[1, 2, 5],[6, 5, 1],[0, 2, 0],[1, 2, 4],[1, 3, 4]];
    this.tiles = [];
    this.levelName = 'test';
    this.nextLevelName = 'test';

  }

  create() {
    this.player = new Player();
    this.player.addToScene(Simplicity.scene);
    this.player.cameraFollow(Simplicity.camera);


    this.timeBetween = 2;
    Simplicity.UIManager.add('timer', this.timeBetween);

    this.maxSteps = 10;
    this.curSteps = 0;
    Simplicity.UIManager.add('counter', `${this.curSteps} / ${this.maxSteps}`);

    this.spikeTiles = [];
    this.electricTiles = [];

    this.spawnTiles();
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

        if(this.layout[z][x] === 4) {
          const test = new Tiles[1]();
          test.addToScene(Simplicity.scene);
          test.position.x = x*200;
          test.position.z = z*200;
          this.spikeTiles.push(this.tiles[z][x]);
        }

        if(this.layout[z][x] === 5) {
          this.electricTiles.push(this.tiles[z][x]);
        }
      }
    }
  }

  update() {

    if(this.moved) {
      this.onStep();
    }

    this.afterTrigger();

    if(Simplicity.keysDown[82]) {
      this.reset();
    }

    if(Simplicity.keysDown[32] && this.won) {
      this.reset();
    }

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

  reset(nextLevel) {
    if(this.timer) {
      this.timer.stop();
    }
    this.moved = false;
    Simplicity.keysDown = {}
    const color = new THREE.Color(1, 1, 1);
    this.player.material.color.setHex(color.getHex());

    if(nextLevel) {
      this.nextLevel();
    } else {
      this.restartLevel();
    }
  }


  restartLevel() {
    Simplicity.StateManager.load(this.levelName);
  }

  nextLevel() {
    Simplicity.StateManager.load(this.nextName);
  }

  win() {
    this.won = true;
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

    this.spikeTiles.forEach((tile) =>{
      tile.switchActive();
    });

    const percentageLeft = 1-(this.curSteps/this.maxSteps);
    let color = 0xFFFFFF;

    if(percentageLeft < 0.1) {
      color = 0xFF0000;
    } else if(percentageLeft <= 0.5) {
      color = 0xfff200;
    }

    this.player.material.color.setHex(color);

    Simplicity.UIManager.update('counter', `${this.curSteps} / ${this.maxSteps}`)

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
      Simplicity.UIManager.update('timer', Math.round(this.val*10)/10)
    })

    this.timer.onComplete(() => {
      this.reset();
    })

    this.timer.start();

  }

  switchElectric() {
    this.electricTiles.forEach((tile) =>{
      tile.switchActive();
    });
  }


}

export default Level;
