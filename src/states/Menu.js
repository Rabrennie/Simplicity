class Menu extends Phaser.State {

  preload() {
    this.buttons = []
  }
  create() {
    this.game.camera.focusOnXY(this.game.world.centerX, this.game.world.centerY)
    this.addButtons();
  }

  addButton(x,y,text, onClick) {
    const txt = this.game.add.text(x, y, text, { font: '65px Arial', fill: '#ff0044', align: 'center' });
    txt.anchor.set(0.5);

    txt.inputEnabled = true;

    txt.events.onInputUp.add(onClick);

    this.buttons.push(txt);
  }

}

export default Menu;
