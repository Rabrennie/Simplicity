class Entity {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material =  material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.canMove = true;
  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
    this.egh.material.linewidth = 1;
    scene.add(this.egh);
  }

  // TODO: add animation
  // some way to pass in tweens
  animate() {
    this.canMove = false;
    var move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x+200 }, 250);
    var rotate = new TWEEN.Tween(this.mesh.rotation).to({ z:  this.mesh.rotation.z-1.5708 }, 250);
    var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    move.start(); rotate.start(), moveUp.start();

    move.onComplete(() => {
      this.canMove = true;
    })
  }

  cameraFollow(camera) {
    camera.follow = this.mesh;
    camera.lookAt(this.mesh.position);
  }

  test() {
    if(this.canMove) {
      this.animate();
    }
  }

  get position() {
    return this.mesh.position;
  }

}

export default Entity;
