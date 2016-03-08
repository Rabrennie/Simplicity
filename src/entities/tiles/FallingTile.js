import Tile from '../Tile.js';


// TODO: Find a better way to represent the tile
class FallingTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0xFFCCCC }));

    this.stepCallback = (level) => {

      const x = this.mesh.position.x/200;
      const z = this.mesh.position.z/200;

      level.tiles[z][x] = undefined;

      const move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y-2000 }, 600)
      move.start();

      move.onComplete(() => {
        this.mesh.visible = false;
        this.egh.visible = false;

      });

    }
  }
}

export default FallingTile;
