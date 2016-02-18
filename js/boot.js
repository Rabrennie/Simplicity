Simplicity.Boot = function (game) { };

var isoGroup, cursorPos, cursor;

var failureStrings = ['Did you read the instructions?', 'Good job', 'Great work', 'Thanks a lot', 'Oh S***', 'F YOU', 'Oh dear, I\'m dead'];

Simplicity.Boot.prototype =
{
  preload: function () {

    game.load.image('tile', './assets/tile.png');
    game.load.image('cube', './assets/cube.png');
    game.time.advancedTiming = true;
    game.world.setBounds(0, 0, 2048, 1024);



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
    game.state.start('Level1');
  },

};
game.state.add('Boot', Simplicity.Boot);
game.state.start('Boot');
