import Tile from '../Tile.js';
import Simplicity from 'Simplicity';


class ElectricTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0x0000FF }));

    this.active = true;

    this.afterCallback = (level) => {
      if(this.active) {
        level.reset();
      }
    };
  }

  switchActive() {
    this.active = !this.active;
    if(this.active) {
      this.mesh.material = new THREE.MeshBasicMaterial({ color: 0x0000FF })
    } else {
      this.mesh.material = new THREE.MeshBasicMaterial({ color: 0xEEEEEE })
    }

  }

}

export default ElectricTile;
