import Tile from '../Tile.js';

class EditorTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0x00E500, visible:false }));

  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.egh = new THREE.EdgesHelper(this.mesh, 0xAAAAAA);
    this.egh.material.linewidth = 1;
    scene.add(this.egh);
  }
}

export default EditorTile;
