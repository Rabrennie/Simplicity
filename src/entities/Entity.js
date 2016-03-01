class Entity {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material =  material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
    this.egh.material.linewidth = 1;
    scene.add(this.egh);
  }

  // TODO: add animation
  // some way to pass in tweens
  animate() {}

  lookAt(camera) {
    camera.lookAt(this.mesh.position);
  }

  test() {
    this.mesh.position.x += 100;
  }

  get position() {
    return this.mesh.position;
  }

}

export default Entity;
