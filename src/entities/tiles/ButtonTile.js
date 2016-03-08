import Tile from '../Tile.js';


// TODO: Find a better way to represent the tile
class ButtonTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0xEEEEFF }));

    this.afterCallback = function(level) {
      level.switchElectric();
    };

  }
}

export default ButtonTile;
