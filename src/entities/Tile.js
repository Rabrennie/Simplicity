import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xDEE1B6 });

class Tile extends Entity {
  constructor() {
    super(geometry, material);
    this.mesh.position.y = -150
  }
}

export default Tile;
