Simplicity.Level1 = function (game) { };

Simplicity.Level1.prototype =
{
  create: function () {

    // Create a group for our tiles.
    isoGroup = game.add.group();

    this.winTriggered = false;
    this.dead = false;

    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    this.layout = [[2, 2, 2, 2, 2, 1, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 1, 1],
    [0, 0, 0, 0, 3, 1, ],
  ];

  this.bubble = game.world.add(new SpeechBubble(game, 180, 190, 200, "Get me to the green tile"));

    this.spawnTiles();
    this.spawnPlayer();

  },
  update: function () {

    if(!game.tweens.isTweening(this.bubble)){
      game.add.tween(this.bubble).to({ x: this.player.x, y: this.player.y-19}, 140, Phaser.Easing.Linear.None, true);
    }

    if(!game.tweens.isTweening(this.player)){
      var currentTileX = ((this.player.isoX-50)/38);
      var currentTileY = ((this.player.isoY-50)/38);


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


      if(this.checkTile(currentTileX, currentTileY) === 0) {
        game.add.tween(this.player).to({ isoZ :this.player.isoZ-100}, 500, Phaser.Easing.Linear.None, true);
        game.iso.simpleSort(isoGroup);
        moved = false;
        if(!this.dead) {
          this.changeBubble(failureStrings[Math.floor(Math.random() * failureStrings.length)]);
        }
      } else if(this.checkTile(currentTileX, currentTileY) === 3) {
        if(!this.winTriggered) {
          this.complete();
        }
        moved = false;
      }

      if(moved) {

        game.add.tween(this.player).to({ isoX: nextPosX, isoY: nextPosY}, 200, Phaser.Easing.Quadratic.InOut, true);
      }
    }
  },
  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  },
  spawnTiles: function () {
  this.tiles = []
  var tile;
  for (var y = 0; y < this.layout.length; y++) {
    this.tiles.push([]);
    for (var x = 0; x < this.layout[y].length; x++) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      if(this.layout[y][x] > 0) {
        this.tiles[y][x] = game.add.isoSprite((x*38)+50, (y*38)+50, 0, 'tile', 0, isoGroup);
        this.tiles[y][x].anchor.set(0.5, 0);
      }
      if(this.layout[y][x] === 2){
        this.tiles[y][x].tint = 0x86bfda;
      }
      if(this.layout[y][x] === 3){
        this.tiles[y][x].tint = 0x00FF00;
      }

    }
  }
},

spawnPlayer: function() {
  this.player = game.add.isoSprite(50, 50, 1, 'cube', 0, isoGroup);
  this.player.tint = 0x86bfda;
  this.player.anchor.set(0.5);
  this.bubble.x = this.player.x;
  this.bubble.y = this.player.y;
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
  dropTile = function(tile, delay) {
    var tile = tile;
    window.setTimeout(function() {
      game.add.tween(tile).to({ isoZ: -500 }, 150, Phaser.Easing.Linear.None, true);
    }, delay)
  }

  var delay = 0;

  for (var y = 0; y < this.layout.length; y++) {
    for (var x = 0; x < this.layout[y].length; x++) {
      if(this.layout[y][x] > 0) {
        delay += 100;
        dropTile(this.tiles[y][x], delay)
      }

    }
  }

  delay += 200;
  var _player = this.player;
  window.setTimeout(function() {
    game.add.tween(_player).to({ isoZ: -500 }, 150, Phaser.Easing.Linear.None, true);
  }, delay)

  window.setTimeout(function() {
    game.state.start('Level1', false, false);
  }, delay+1000)

  this.winTriggered = true;
}
};

game.state.add('Level1', Simplicity.Level1);
