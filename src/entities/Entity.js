class Entity {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material =  material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  addToScene(scene) {
    scene.add(this.mesh);
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

}

export default Entity;
