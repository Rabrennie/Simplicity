import SpeechBubble from '../objects/SpeechBubble'
import Level from './Level';

class Level1 extends Level {

  preload() {
    super.preload();
    this.layout = [[2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 3, 0, 0]];

    this.triggered = false;

    this.addTrigger(4, 0, () => {this.changeBubble('These blue tiles seem to lead the way')})

    this.levelName = 'Level1';
    this.nextLevel = 'Level2';
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'We need to get to the green tile.'));
  }

}

export default Level1;
