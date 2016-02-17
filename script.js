// Code goes here

var game = new Phaser.Game(800, 400, Phaser.AUTO, 'test', null, true, false)



var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor;


BasicGame.Boot.prototype =
{
  preload: function () {

    game.load.image('tile', './assets/tile.png');
    game.load.image('cube', './assets/cube.png');
    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0);

    game.load.spritesheet('bubble-border', './assets/bubble-border.png', 9, 9);
    game.load.image('bubble-tail', './assets/bubble-tail.png');
    game.load.bitmapFont('prstart', './assets/prstart.png', './assets/prstart.fnt');
  },
  create: function () {

    // Create a group for our tiles.
    isoGroup = game.add.group();
    bubble = game.world.add(new SpeechBubble(game, 180, 190, 100, "Lets move forwards"));
    // Let's make a load of tiles on a grid.
    this.spawnTiles();

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

    winTriggered = false;


  },
  update: function () {
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    game.iso.unproject(game.input.activePointer.position, cursorPos);

    if(!game.tweens.isTweening(bubble)){
      game.add.tween(bubble).to({ x: player.x, y: player.y-19}, 140, Phaser.Easing.Linear.None, true);
    }

    if(!game.tweens.isTweening(player)){
      var currentTileX = ((player.isoX-50)/38);
      var currentTileY = ((player.isoY-50)/38);


      var nextPosX = player.isoX, nextPosY = player.isoY, moved = false;

      if (this.cursors.down.isDown) {
        nextPosX = player.isoX + 38;
        nextPosY = player.isoY;
        moved = true;
      } else if (this.cursors.up.isDown) {
        nextPosX = player.isoX - 38;
        nextPosY = player.isoY;
        moved = true;
      } else if (this.cursors.right.isDown) {
        nextPosX = player.isoX;
        nextPosY = player.isoY - 38;
        moved = true;
      } else if (this.cursors.left.isDown) {
        nextPosX = player.isoX;
        nextPosY = player.isoY +  38;
        moved = true;
      }


      if(this.checkTile(currentTileX, currentTileY) === 0) {
        game.add.tween(player).to({ isoZ :player.isoZ-100}, 500, Phaser.Easing.Linear.None, true);
        game.iso.simpleSort(isoGroup);
        moved = false;
      } else if(this.checkTile(currentTileX, currentTileY) === 3) {
        if(!winTriggered) {
          bubble.kill();
          bubble = game.world.add(new SpeechBubble(game, 180, 190, 100, "We Won!"));
          bubble.x = player.x;
          bubble.y = player.y;
          winTriggered = true;
        }
        moved = false;
      }

      if(moved) {

        game.add.tween(player).to({ isoX: nextPosX, isoY: nextPosY}, 200, Phaser.Easing.Quadratic.InOut, true);
      }
    }
  },
  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  },
  spawnTiles: function () {

    layout = [[2, 2, 2, 2, 2, 1, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 1, 1],
    [0, 0, 0, 0, 3, 1, ],
  ];
  var tile;
  for (var y = 0; y < layout.length; y++) {
    for (var x = 0; x < layout[y].length; x++) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      if(layout[y][x] > 0) {
        tile = game.add.isoSprite((x*38)+50, (y*38)+50, 0, 'tile', 0, isoGroup);
      }
      if(layout[y][x] === 2){
        tile.tint = 0x86bfda;
      }
      if(layout[y][x] === 3){
        tile.tint = 0x00FF00;
      }
      tile.anchor.set(0.5, 0);
    }
  }

  player = game.add.isoSprite(50, 50, 1, 'cube', 0, isoGroup);
  player.tint = 0x86bfda;
  player.anchor.set(0.5);
  bubble.x = player.x;
  bubble.y = player.y;

  this.cursors = game.input.keyboard.createCursorKeys();

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR
  ]);
},

checkTile : function(x,y) {
  if((x < 0 || y < 0)) {
    return 0;
  }

  if(layout[y] !== undefined) {
    if(layout[y][x] === undefined) {
      return 0;
    } else if(layout[y][x] === 0){
      return 0;
    } else {
      return layout[y][x];
    }
  } else {
    return 0;
  }
}
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
