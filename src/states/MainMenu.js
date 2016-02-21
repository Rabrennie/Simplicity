import Menu from './Menu';

class MainMenu extends Menu {

  addButtons() {
    this.addButton(this.game.world.centerX, this.game.world.centerY, 'Play', () => {this.state.start('Level1')});
  }

}

export default MainMenu;
