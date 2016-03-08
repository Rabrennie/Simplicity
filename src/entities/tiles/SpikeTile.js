import Tile from '../Tile.js';
import Simplicity from 'Simplicity';


class SpikeTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0xEEEEEE }));
    this.mesh.geometry = Simplicity.models.spikes;
    this.mesh.scale.set(100,100,100)
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
      this.mesh.position.y+=50;
    } else {
      this.mesh.position.y-=50;
    }

  }

}

export default SpikeTile;
