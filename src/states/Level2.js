import SpeechBubble from '../objects/SpeechBubble'
import Level from './Level';

class Level2 extends Level {

  preload() {
    super.preload();
    this.layout = [[2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 2],
    [0, 0, 0, 0, 1, 0, 2],
    [0, 0, 0, 0, 1, 0, 2],
    [0, 0, 0, 0, 3, 2, 2]];

    this.triggered = false;

    this.addTrigger(4, 0, () => {this.changeBubble('That doesn\'t look like the right way')})

    this.levelName = 'Level2';
    this.nextLevel = 'Level3';
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'Follow the blue tiles!'));
  }

}

export default Level2;
