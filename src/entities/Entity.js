class Entity {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material =  material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.canMove = true;
    this.animations = { moveRight: this.moveRightAnim };
  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
    this.egh.material.linewidth = 1;
    scene.add(this.egh);
  }

  moveRightAnim() {
    this.canMove = false;

    const move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x+200 }, 250);
    const rotate = new TWEEN.Tween(this.mesh.rotation).to({ z:  this.mesh.rotation.z-1.5708 }, 250);
    const moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    const moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    move.onComplete(() => {
      this.canMove = true;
    })

    move.start();
    rotate.start();
    moveUp.start();
  }


  cameraFollow(camera) {
    camera.follow = this.mesh;
    camera.lookAt(this.mesh.position);
  }

  test() {
    if(this.canMove) {
      this.moveRightAnim();
    }
  }

  get position() {
    return this.mesh.position;
  }

}

export default Entity;
