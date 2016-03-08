import Tile from '../Tile.js';

class ButtonTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0xEEEEFF }));

    this.afterCallback = function(level) {
      level.switchElectric();
    };

  }
}

export default ButtonTile;
