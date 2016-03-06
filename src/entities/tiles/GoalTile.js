import Tile from '../Tile.js';

class GoalTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0x00E500 }));
    this.afterCallback = (level) => {
      level.win();
    }
  }
}

export default GoalTile;
