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
      const move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y+50 }, 150);
      move.start();
    } else {
      const move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y-50 }, 150);
      move.start();
    }

  }

}

export default SpikeTile;
