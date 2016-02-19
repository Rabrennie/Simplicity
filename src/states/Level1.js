import SpeechBubble from '../objects/SpeechBubble'
import Level from './Level';

class Level1 extends Level {

  preload() {
    super.preload();


    this.triggered = false;

    this.nextLevel = 'Level2';

    this.addTrigger(4, 0, () => {this.changeBubble('Get to the green tile')})
  }

  spawnBubble() {
    this.bubble = this.game.world.add(new SpeechBubble(this.game, 180, 190, 200, 'Follow the blue tiles!'));
  }

}

export default Level1;
