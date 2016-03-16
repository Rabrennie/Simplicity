import Tile from '../Tile.js';

class GuideTile extends Tile {
  constructor() {
    super();

    this.nextCallback = function() {
      this.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00B4FF });
    };

  }
}

export default GuideTile;
