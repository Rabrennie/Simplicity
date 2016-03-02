import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xE1B866 });

class Player extends Entity {
  constructor() {
    super(geometry, material);
  }

  get tileX() {
    return this.position.x/200;
  }

  get tileZ() {
    return this.position.z/200;
  }
}

export default Player;
