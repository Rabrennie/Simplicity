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

    this.addTrigger(4, 0, () => {this.changeBubble('Get to the green tile')})

    this.levelName = 'Level1';
    this.nextLevel = 'MainMenu';
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'Follow the blue tiles!'));
  }

}

export default Level1;
