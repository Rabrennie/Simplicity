class MainMenu extends Phaser.State {

  preload() {
    this.buttons = []
  }
  create() {
    this.game.camera.focusOnXY(this.game.world.centerX, this.game.world.centerY)
    const test = new Phaser.Plugin.Isometric.Point3();
    this.game.iso.unproject(new Phaser.Point(this.game.world.centerX,this.game.world.centerY), test)
    this.tile = this.game.add.isoSprite(test.x, test.y, 0, 'playButton', 0);
    this.tile.anchor.set(0.5, 0);

    this.cursorPos = new Phaser.Plugin.Isometric.Point3();
  }

  update() {


    this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);

    var inBounds = this.tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y);

    if (!this.tile.selected && inBounds && this.game.input.activePointer.isDown) {
      this.tile.mouseDown = true;
      this.tile.selected = true;
      this.tile.tint = 0xAAFFAA;
      this.game.add.tween(this.tile).to({ isoZ: -4 }, 100, Phaser.Easing.Quadratic.InOut, true);
    } else if (this.tile.selected && !inBounds) {
      this.tile.mouseDown = false;
      this.tile.selected = false;
      this.tile.tint = 0xffffff;
      this.game.add.tween(this.tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
    } else if (this.tile.selected && inBounds && !this.game.input.activePointer.isDown && this.tile.mouseDown) {
      this.state.start('Level1');
    }


  }


}

export default MainMenu;
