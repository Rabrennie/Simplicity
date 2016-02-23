import SpeechBubble from '../objects/SpeechBubble'
import Level from './Level';

class Level3 extends Level {

  preload() {
    super.preload();
    this.layout = [[2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 1, 0, 0],
    [2, 2, 2, 2, 3, 0, 0]];

    this.triggered = false;



    this.levelName = 'Level3';
    this.nextLevel = 'MainMenu';
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'I don\'t think we can trust those blue tiles'));
  }

}

export default Level3;
