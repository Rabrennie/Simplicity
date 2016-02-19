import Level from './Level';

class Level1 extends Level {

  preload() {
    super.preload();
    this.layout = [[2, 2, 2, 2, 2, 4, 1],
    [1, 1, 1, 1, 2, 1, 4],
    [1, 1, 1, 1, 2, 1, 4],
    [1, 1, 1, 1, 2, 1, 4],
    [1, 1, 1, 1, 3, 1, 1],
    [1, 1, 1, 1, 4, 1, 1],
    [1, 1, 1, 1, 4, 1, 1],
    [1, 1, 1, 1, 4, 1, 1],
    [1, 1, 1, 1, 4, 1, 1]];
  }
}

export default Level1;
