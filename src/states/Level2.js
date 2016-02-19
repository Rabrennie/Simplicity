import SpeechBubble from '../objects/SpeechBubble'
import Level from './Level';

class Level2 extends Level {

  preload() {
    super.preload();
    this.layout = [[2,2,2,3]];
    this.triggered = false;

  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'Follow the blue tiles!'));
  }

}

export default Level2;
