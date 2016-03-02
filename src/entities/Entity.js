class Entity {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material =  material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.tweening = false;
    console.log(this.mesh)
  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
    this.egh.material.linewidth = 1;
    scene.add(this.egh);
  }

  moveRightAnim() {
    this.tweening = true;

    const move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x+200 }, 250);
    const rotate = new TWEEN.Tween(this.mesh.rotation).to({ z:  this.mesh.rotation.z-1.5708 }, 250);
    const moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    const moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    rotate.onComplete(() => {
      this.mesh.rotation.set(0, 0, 0);
      this.tweening = false;
    })

    move.start();
    rotate.start();
    moveUp.start();
  }

  moveLeftAnim() {
    this.tweening = true;

    const move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x-200 }, 250);
    const rotate = new TWEEN.Tween(this.mesh.rotation).to({ z:  this.mesh.rotation.z+1.5708 }, 250);
    const moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    const moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    rotate.onComplete(() => {
      this.mesh.rotation.set(0, 0, 0);
      this.tweening = false;
    })

    move.start();
    rotate.start();
    moveUp.start();
  }

  moveDownAnim() {
    this.tweening = true;

    const move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z+200 }, 250);
    const rotate = new TWEEN.Tween(this.mesh.rotation).to({ x:  this.mesh.rotation.x+1.5708 }, 250);
    const moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    const moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    rotate.onComplete(() => {
      this.mesh.rotation.set(0, 0, 0);
      this.tweening = false;
    })

    move.start();
    rotate.start();
    moveUp.start();
  }

  moveUpAnim() {
    this.tweening = true;

    const move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z-200 }, 250);
    const rotate = new TWEEN.Tween(this.mesh.rotation).to({ x:  this.mesh.rotation.x-1.5708 }, 250);
    const moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
    const moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

    moveUp.chain(moveDown);

    rotate.onComplete(() => {
      this.mesh.rotation.set(0, 0, 0);
      this.tweening = false;
    })

    move.start();
    rotate.start();
    moveUp.start();
  }


  cameraFollow(camera) {
    camera.follow = this.mesh;
    camera.lookAt(this.mesh.position);
  }

  move(direction) {
    if(!this.tweening) {
      switch (direction) {
          case 'right':
            this.moveRightAnim();
            break;

          case 'down':
            this.moveDownAnim();
            break;

          case 'left':
            this.moveLeftAnim();
            break;

          case 'up':
            this.moveUpAnim();
            break;

          default:
            break;
      }
    }
  }

  get position() {
    return this.mesh.position;
  }

}

export default Entity;
