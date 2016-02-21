import BootState from 'states/BootState';
import MainMenu from 'states/MainMenu';
import Level1 from 'states/Level1';


class Game extends Phaser.Game {

  constructor() {
    super(800, 400, Phaser.AUTO, 'content', null, true, false);
    this.state.add('BootState', BootState, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.add('Level1', Level1, false);
    this.state.start('BootState');
  }

}

new Game();
