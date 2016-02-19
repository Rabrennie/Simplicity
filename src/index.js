import BootState from 'states/BootState';
import Level from 'states/Level';


class Game extends Phaser.Game {

  constructor() {
    super(800, 400, Phaser.AUTO, 'content', null, true, false);
    this.state.add('BootState', BootState, false);
    this.state.add('Level', Level, false);
    this.state.start('BootState');
  }

}

new Game();
