class BootState extends Phaser.State {

  preload() {

    this.game.load.image('tile', './assets/tile.png');
    this.game.load.image('cube', './assets/cube.png');
    this.game.load.image('playButton', './assets/playbutton.png');

    this.game.time.advancedTiming = true;
    this.game.world.setBounds(0, 0, 2048, 1024);
    // Add and enable the plug-in.
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    this.game.iso.anchor.setTo(0.5, 0);

    this.game.load.spritesheet('bubble-border', './assets/bubble-border.png', 9, 9);
    this.game.load.image('bubble-tail', './assets/bubble-tail.png');
    this.game.load.bitmapFont('prstart', './assets/prstart.png', './assets/prstart.fnt');

    this.game.failureStrings = ['Did you read the instructions?', 'Good job', 'Great work', 'Thanks a lot', 'Oh S***', 'F YOU', 'Oh dear, I\'m dead'];
  }

  create() {
    this.game.state.start('MainMenu');
  }

}

export default BootState;
