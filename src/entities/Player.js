import Entity from './Entity';

const geometry = new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),
  material =  new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

class Player extends Entity {
  constructor() {
    super(geometry, material);
  }

  fall(cb) {
    this.tweening = true;
    let rotate = null;
    const move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y-2000 }, 600)

    if(this.lastDirection === 'right') {
      rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: -4.7124 }, 600);
    } else if(this.lastDirection === 'left') {
      rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: 4.7124 }, 600);
    } else if(this.lastDirection === 'up') {
      rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: -4.7124 }, 600);
    } else if(this.lastDirection === 'down') {
      rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: 4.7124 }, 600);
    }

    move.onComplete(cb);

    move.start();
    rotate.start();
  }

  get tileX() {
    return this.position.x/200;
  }

  get tileZ() {
    return this.position.z/200;
  }
}

export default Player;
