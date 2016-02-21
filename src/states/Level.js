import SpeechBubble from '../objects/SpeechBubble'

class Level extends Phaser.State {

  preload() {
    this.layout = [[2, 2, 2, 2, 2, 4, 1],
    [0, 0, 0, 1, 2, 0, 4],
    [0, 0, 1, 0, 2, 0, 4],
    [0, 1, 0, 0, 2, 1, 4],
    [1, 0, 0, 0, 3, 1, 1]];

    this.isoGroup = this.game.add.group();

    this.canPlay = false;
    this.winTriggered = false;
    this.dead = false;
    this.steps = 8;
    this.stepcount = 0;
    this.timer = 2;
    this.timePerTile = 2;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.hasStepped = false;
    this.timerStarted = false;
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    this.offset = 200;

    this.triggers = [];

    this.nextLevel = 'Level';

  }
  create() {
    this.game.camera.x = 624;
    this.game.camera.y = 0;

    this.spawnBubble();
    this.spawnTiles();
    this.spawnPlayer();
  }

  update() {

    if(!this.game.tweens.isTweening(this.bubble)) {
      this.game.add.tween(this.bubble).to({ x: this.player.x, y: this.player.y-19 }, 140, Phaser.Easing.Linear.None, true);
    }

    if(!this.game.tweens.isTweening(this.player) && this.canPlay) {

      if(this.hasStepped && !this.timerStarted) {
        this.timerStarted = true;
        this.timerLoop = this.game.time.events.loop(100, function() {
          this.timer -= 0.1;
          if(this.timer < 0) {
            this.game.time.events.remove(this.timerLoop);
            this.canPlay = false;
            this.changeLevel(this.levelName)
          }
        }, this);
      }
      var currentTileX = ((this.player.isoX-this.offset)/38);
      var currentTileY = ((this.player.isoY-this.offset)/38);



      var tintTile = function(tileX, tileY, tint) {
        if(this.tiles[tileY][tileX].tint !== tint) {
          this.tiles[tileY][tileX].tint = tint
        }
      }.bind(this);

      if(this.checkTile(currentTileX, currentTileY) === 2) {
        tintTile(currentTileX,currentTileY, 0x86bfda);
      }
      if(this.checkTile(currentTileX-1, currentTileY) === 2) {
        tintTile(currentTileX-1,currentTileY, 0x86bfda);
      }
      if(this.checkTile(currentTileX+1, currentTileY) === 2) {
        tintTile(currentTileX+1,currentTileY, 0x86bfda);
      }
      if(this.checkTile(currentTileX, currentTileY+1) === 2) {
        tintTile(currentTileX,currentTileY+1, 0x86bfda);
      }
      if(this.checkTile(currentTileX, currentTileY-1) === 2) {
        tintTile(currentTileX,currentTileY-1, 0x86bfda);
      }

      var nextPosX = this.player.isoX, nextPosY = this.player.isoY, moved = false;


      if (this.cursors.down.isDown) {
        nextPosX = this.player.isoX + 38;
        nextPosY = this.player.isoY;
        moved = true;
      } else if (this.cursors.up.isDown) {
        nextPosX = this.player.isoX - 38;
        nextPosY = this.player.isoY;
        moved = true;
      } else if (this.cursors.right.isDown) {
        nextPosX = this.player.isoX;
        nextPosY = this.player.isoY - 38;
        moved = true;
      } else if (this.cursors.left.isDown) {
        nextPosX = this.player.isoX;
        nextPosY = this.player.isoY +  38;
        moved = true;
      }

      this.checkTrigger((nextPosX-this.offset)/38 , (nextPosY-this.offset)/38);


      if(this.checkTile(currentTileX, currentTileY) === 0) {
        this.game.iso.simpleSort(this.isoGroup);
        moved = false;
        if(!this.dead) {
          this.changeBubble(this.game.failureStrings[Math.floor(Math.random() * this.game.failureStrings.length)]);

          this.game.time.events.add(300, function() {
            this.changeLevel(this.levelName)
            this.dropSprite(this.player, 200, -500, function() {this.canPlay = false}.bind(this))
          }, this);

          this.game.time.events.remove(this.timerLoop);
          this.dead = true;
        }
      } else if(this.checkTile(currentTileX, currentTileY) === 3) {
        if(!this.winTriggered) {
          this.game.time.events.remove(this.timerLoop);
          this.complete();
        }
        moved = false;
      }

      const origNextX = nextPosX;
      const origNextY = nextPosY;
      let isJump = true;

      while(this.checkTile((nextPosX-this.offset)/38, (nextPosY-this.offset)/38) === 4 && moved) {
        isJump = false;
        nextPosX = origNextX + nextPosX - this.player.isoX;
        nextPosY = origNextY + nextPosY - this.player.isoY;
      }

      if(moved) {
        this.hasStepped = true;
        this.stepcount++;
        this.timer = this.timePerTile;
        this.game.add.tween(this.player).to({ isoX: nextPosX, isoY: nextPosY }, 200, Phaser.Easing.Quadratic.InOut, true);
        if(isJump) {
          const jump = this.game.add.tween(this.player.anchor).to({ y: 0.8 }, 100, Phaser.Easing.Quadratic.InOut);
          const land = this.game.add.tween(this.player.anchor).to({ y: 0.5 }, 100, Phaser.Easing.Quadratic.InOut);
          jump.chain(land);
          jump.start()
        }
        if(this.stepcount > this.steps) {
          this.game.time.events.remove(this.timerLoop);
          this.canPlay = false;
          this.game.time.events.add(500, function() {
            this.changeBubble('Too many steps :(')
            this.changeLevel(this.levelName)
          }, this)
        }
      }
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#a7aebe');
    this.game.debug.text(this.stepcount + ' / ' + this.steps , 2, 42, '#a7aebe');
    this.game.debug.text(Math.round(this.timer*10)/10, 2, 28, '#a7aebe');
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'Get me to the green tile'));
  }

  spawnTiles() {
    this.tiles = []
    var count = 0;
    this.layout.forEach(function(a) { count+= a.length});

    this.delay = 0;
    let goalTile = null;

    for (var y = 0; y < this.layout.length; y++) {
      this.tiles.push([]);
      for (var x = 0; x < this.layout[y].length; x++) {
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        if(this.layout[y][x] > 0) {
          this.tiles[y][x] = this.game.add.isoSprite((x*38)+this.offset, (y*38)+this.offset, 500, 'tile', 0, this.isoGroup);
          this.tiles[y][x].anchor.set(0.5, 0);
          this.delay = y*200;

          if(this.layout[y][x] !== 3) {
            this.dropSprite(this.tiles[y][x], this.delay, 0)
          }
        }
        // if(this.layout[y][x] === 2) {
        //   // this.tiles[y][x].tint = 0x86bfda;
        //
        // }
        if(this.layout[y][x] === 3) {
          goalTile = this.tiles[y][x];
          this.tiles[y][x].tint = 0x00FF00;
          this.dropSprite(goalTile, this.layout.length*200+500, 0)
        }
        if(this.layout[y][x] === 4) {
          goalTile = this.tiles[y][x];
          this.tiles[y][x].tint = 0xA5F2F3;
        }

      }
    }

  }

  spawnPlayer() {
    this.player = this.game.add.isoSprite(this.offset, this.offset, 500, 'cube', 0, this.isoGroup);
    this.player.tint = 0x86bfda;
    this.player.anchor.set(0.5);
    this.bubble.x = this.player.x;
    this.bubble.y = this.player.y;
    this.dropSprite(this.player, this.delay+500, 0, function() {this.canPlay = true; this.game.camera.follow(this.player)}.bind(this))
  }

  checkTile(x,y) {
    if((x < 0 || y < 0)) {
      return 0;
    }

    if(this.layout[y] !== undefined) {
      if(this.layout[y][x] === undefined) {
        return 0;
      }
    } else {
      return 0;
    }
    return this.layout[y][x];
  }

  changeBubble(text) {
    this.bubble.kill();
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, text));
    this.bubble.x = this.player.x;
    this.bubble.y = this.player.y;
  }

  complete() {
    this.changeBubble('WE WON')

    this.changeLevel(this.nextLevel);

    this.winTriggered = true;
  }

  changeLevel(level) {

    this.game.camera.follow(null);

    var delay = 0;
    var goalTile;
    var isOnGoal;
    for (var y = 0; y < this.layout.length; y++) {
      for (var x = 0; x < this.layout[y].length; x++) {
        if(this.layout[y][x] > 0) {
          if(this.layout[y][x] !== 3) {
            delay = y*200;
            this.dropSprite(this.tiles[y][x], delay, -500)
            if((this.player.isoX-this.offset)/38 === x && (this.player.isoY-this.offset)/38 === y) {
              this.canPlay = false
              this.dropSprite(this.player, delay+500, -500)
            }
          } else {
            goalTile = this.tiles[y][x]
            if((this.player.isoX-this.offset)/38 === x && (this.player.isoY-this.offset)/38 === y) {
              isOnGoal = true;
            }
          }
        }

      }
    }
    delay += 500;
    this.dropSprite(goalTile, delay, -500);

    if(isOnGoal) {
      this.canPlay = false
      this.dropSprite(this.player, delay+500, -500)
    }

    this.game.time.events.add(delay+1000, function() {
      this.game.world.removeAll()
      this.game.state.start(level, false, true);
    }, this);

  }

  dropSprite(sprite, delay, to, cb) {
    this.game.time.events.add(delay, function() {
      this.game.add.tween(sprite).to({ isoZ: to }, 150, Phaser.Easing.Linear.None, true);
      if(cb) {
        cb();
      }
    }, this);
  }

  addTrigger(x, y, cb) {
    this.triggers.push({ x, y, cb });
  }

  checkTrigger(x, y) {
    this.triggers.forEach((a) => {
      if(a.x === x && a.y === y && a.triggered !== true) {
        this.game.time.events.add(250, () => {
          a.cb();
        });
        a.triggered = true;
      }
    })
  }

}

export default Level;
