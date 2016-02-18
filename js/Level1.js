Simplicity.Level1 = function (game) { };

Simplicity.Level1.prototype =
{
  create: function () {

    // Create a group for our tiles.
    isoGroup = game.add.group();

    this.canPlay = false;
    this.winTriggered = false;
    this.dead = false;
    this.steps = 8;
    this.stepcount = 0;
    this.timer = 2;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.hasStepped = false;
    this.timerStarted = false;
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    this.layout = [[2, 2, 2, 2, 2, 4, 1],
    [0, 0, 0, 0, 2, 0, 4],
    [0, 0, 0, 0, 2, 0, 4],
    [0, 0, 0, 0, 2, 1, 4],
    [0, 0, 0, 0, 3, 1, ],
  ];

  this.offset = 200;


  this.bubble = game.world.add(new SpeechBubble(game, 180, 190, 200, "Get me to the green tile"));
  game.camera.x = 624;
  game.camera.y = 0;

  this.spawnTiles();
  this.spawnPlayer();



},
update: function () {

  if(!game.tweens.isTweening(this.bubble)){
    game.add.tween(this.bubble).to({ x: this.player.x, y: this.player.y-19}, 140, Phaser.Easing.Linear.None, true);
  }

  if(!game.tweens.isTweening(this.player) && this.canPlay){

    if(this.hasStepped && !this.timerStarted) {
      this.timerStarted = true;
      this.timerLoop = game.time.events.loop(100, function() {
        this.timer -= 0.1;
        if(this.timer < 0) {
          game.time.events.remove(this.timerLoop);
          this.canPlay = false;
          this.changeLevel('Level1')
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
    } else if (this.cursors.up.isDown ) {
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


    if(this.checkTile(currentTileX, currentTileY) === 0) {
      game.iso.simpleSort(isoGroup);
      moved = false;
      if(!this.dead) {
        this.changeBubble(failureStrings[Math.floor(Math.random() * failureStrings.length)]);

        game.time.events.add(300, function() {
          this.changeLevel('Level1')
          this.dropSprite(this.player, 200, -500, function(){this.canPlay = true}.bind(this))
        }, this);

        game.time.events.remove(this.timerLoop);
        this.dead = true;
      }
    } else if(this.checkTile(currentTileX, currentTileY) === 3) {
      if(!this.winTriggered) {
        game.time.events.remove(this.timerLoop);
        this.complete();
      }
      moved = false;
    }

    var iceTiles = 0;
    var origNextX = nextPosX;
    var origNextY = nextPosY;

    while(this.checkTile((nextPosX-this.offset)/38, (nextPosY-this.offset)/38) === 4 && moved) {
      nextPosX = origNextX + nextPosX - this.player.isoX;
      nextPosY = origNextY + nextPosY - this.player.isoY;
    }

    if(moved) {
      this.hasStepped = true;
      this.stepcount++;
      this.timer = 2.1;
      game.add.tween(this.player).to({ isoX: nextPosX, isoY: nextPosY}, 200, Phaser.Easing.Quadratic.InOut, true);
      if(this.stepcount > this.steps) {
        game.time.events.remove(this.timerLoop);
        this.canPlay = false;
        game.time.events.add(500, function() {
          this.changeBubble('Too many steps :(')
          this.changeLevel('Level1')
        }, this)
      }
    }
  }
},
render: function () {
  game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  game.debug.text(this.stepcount + ' / ' + this.steps , 2, 42, "#a7aebe");
  game.debug.text(Math.round(this.timer*10)/10, 2, 28, "#a7aebe");
},
spawnTiles: function () {
  this.tiles = []
  var count = 0;
  this.layout.forEach(function(a) { count+= a.length});
  var tile;
  var tilesFalling = Math.round(count*0.2);

  this.delay = 0;
  var goalTile;

  for (var y = 0; y < this.layout.length; y++) {
    this.tiles.push([]);
    for (var x = 0; x < this.layout[y].length; x++) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      if(this.layout[y][x] > 0) {
        this.tiles[y][x] = game.add.isoSprite((x*38)+this.offset, (y*38)+this.offset, 500, 'tile', 0, isoGroup);
        this.tiles[y][x].anchor.set(0.5, 0);
        this.delay = y*200;
        console.log((y*x)%tilesFalling)
        if(this.layout[y][x] !== 3) {
          this.dropSprite(this.tiles[y][x], this.delay, 0)
        }
      }
      if(this.layout[y][x] === 2){
        // this.tiles[y][x].tint = 0x86bfda;

      }
      if(this.layout[y][x] === 3){
        goalTile = this.tiles[y][x];
        this.tiles[y][x].tint = 0x00FF00;
      }
      if(this.layout[y][x] === 4){
        goalTile = this.tiles[y][x];
        this.tiles[y][x].tint = 0xA5F2F3;
      }

    }
  }
  this.delay += 500;
  this.dropSprite(goalTile, this.delay, 0)
},

spawnPlayer: function() {
  this.player = game.add.isoSprite(this.offset, this.offset, 500, 'cube', 0, isoGroup);
  this.player.tint = 0x86bfda;
  this.player.anchor.set(0.5);
  this.bubble.x = this.player.x;
  this.bubble.y = this.player.y;
  this.dropSprite(this.player, this.delay+500, 0, function(){this.canPlay = true; game.camera.follow(this.player)}.bind(this))

},

checkTile: function(x,y) {
  if((x < 0 || y < 0)) {
    return 0;
  }

  if(this.layout[y] !== undefined) {
    if(this.layout[y][x] === undefined) {
      return 0;
    } else if(this.layout[y][x] === 0){
      return 0;
    } else {
      return this.layout[y][x];
    }
  } else {
    return 0;
  }
},
changeBubble: function(text) {
  this.bubble.kill();
  this.bubble = game.world.add(new SpeechBubble(game, 180, 190, 200, text));
  this.bubble.x = this.player.x;
  this.bubble.y = this.player.y;
},
complete: function() {
  this.changeBubble('WE WON')

  this.changeLevel('Level1');

  this.winTriggered = true;
},
changeLevel: function(level){

  game.camera.follow(null);

  var level = level;

  var delay = 0;
  var goalTile;
  var isOnGoal;
  for (var y = 0; y < this.layout.length; y++) {
    for (var x = 0; x < this.layout[y].length; x++) {
      if(this.layout[y][x] > 0) {
        if(this.layout[y][x] !== 3) {
          delay = y*200;
          this.dropSprite(this.tiles[y][x], delay, -500)
          if((this.player.isoX-this.offset)/38 === x && (this.player.isoY-this.offset)/38 == y) {
            this.canPlay = false
            this.dropSprite(this.player, delay+500, -500)
          }
        } else {
          goalTile = this.tiles[y][x]
          if((this.player.isoX-this.offset)/38 === x && (this.player.isoY-this.offset)/38 == y) {
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

  game.time.events.add(delay+1000, function() {
    game.world.removeAll()
    game.state.start(level, false, true);
  }, this);

},
dropSprite: function(sprite, delay, to, cb) {
  game.time.events.add(delay, function() {
    game.add.tween(sprite).to({ isoZ: to }, 150, Phaser.Easing.Linear.None, true);
    if(cb) {
      cb();
    }
  }, this);

}
};

game.state.add('Level1', Simplicity.Level1);
