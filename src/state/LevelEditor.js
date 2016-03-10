import Simplicity from '../Simplicity';
import State from './State';
import Tiles from '../entities/tiles/Tiles.js';
import Player from '../entities/Player.js';

class LevelEditor extends State {

  create() {
    this.tiles = [];
    this.meshes = [];
    this.layout = [];
    this.spawnTiles();
    this.player = new Player();
    this.player.addToScene(Simplicity.scene);
    this.player.cameraFollow(Simplicity.camera);
    this.player.mesh.visible = false;
    this.player.egh.visible = false;
    this.tempTile = new Tiles[1];
    this.tempTile.addToScene(Simplicity.scene);
    this.tempTile.position.x =  10000;
    this.tempTile.position.z = 10000;
    this.place = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (e) => this.onMouseMove(e) , false);
    window.addEventListener('mouseup', (e) => this.onMouseUp(e) , false);

  }

  spawnTiles() {
    for (var z = 0; z < 5; z++) {
      this.tiles.push([]);
      this.layout.push([])
      for (var x = 0; x < 5; x++) {

        this.tiles[z][x] = new Tiles[9]();
        this.meshes.push(this.tiles[z][x].mesh);
        this.tiles[z][x].addToScene(Simplicity.scene);
        this.tiles[z][x].position.x = x*200;
        this.tiles[z][x].position.z = z*200;

      }
    }
  }

  update() {
    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse.clone(), Simplicity.camera);
    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.meshes);

    this.meshes.forEach(function(tile) {
      tile.material.color.setHex(0xEEEEEE);
    });

    if(intersects.length > 0) {
      this.place = true;
      this.tempTile.position.x = intersects[0].object.position.x;
      this.tempTile.position.z = intersects[0].object.position.z;
      this.tempTile.mesh.material.transparent = true;
      this.tempTile.mesh.material.opacity = 0.7;

    } else {
      this.place = false;

      this.tempTile.position.x =  10000;
      this.tempTile.position.z = 10000;

    }

    if(Simplicity.keysDown[68]) {
      this.player.mesh.position.x += 10;
    }
    if(Simplicity.keysDown[83]) {
      this.player.mesh.position.z += 10;
    }

    if(Simplicity.keysDown[65]) {
      this.player.mesh.position.x -= 10;
    }
    if(Simplicity.keysDown[87]) {
      this.player.mesh.position.z -= 10;
    }
  }


  onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  onMouseUp(event) {

    event.preventDefault();

    if(this.place && event.button === 2) {
      const z = this.tempTile.mesh.position.z/200;
      const x = this.tempTile.mesh.position.x/200;

      Simplicity.scene.remove(this.tiles[z][x].mesh);
      Simplicity.scene.remove(this.tiles[z][x].egh);

      this.tiles[z][x] = new Tiles[9]();
      this.tiles[z][x].mesh.position.z = this.tempTile.mesh.position.z;
      this.tiles[z][x].mesh.position.x = this.tempTile.mesh.position.x;
      this.tiles[z][x].addToScene(Simplicity.scene);

      this.layout[z][x] = null;

      const index = this.meshes.indexOf(this.tiles[z][x]);
      if(index !== -1) {
        this.meshes[index] = this.tiles[z][x];
      }

    }

    if(this.place && event.button === 0) {
      const z = this.tempTile.mesh.position.z/200;
      const x = this.tempTile.mesh.position.x/200;

      this.tempTile.mesh.material.transparent = false;

      Simplicity.scene.remove(this.tiles[z][x].mesh);
      Simplicity.scene.remove(this.tiles[z][x].egh);

      this.tiles[z][x] = this.tempTile;
      this.layout[z][x] = 1;

      const index = this.meshes.indexOf(this.tiles[z][x]);
      if(index !== -1) {
        this.meshes[index] = this.tiles[z][x];
      }

      if(z === this.tiles.length-1) {
        this.addDown();
      }

      if(x === this.tiles[z].length-1) {
        this.addRight();
      }

      if(x === 0) {
        this.addLeft();
      }

      if(z === 0) {
        this.addUp();
      }

      this.tempTile = new Tiles[1];
      this.tempTile.addToScene(Simplicity.scene);
      this.tempTile.position.x =  10000;
      this.tempTile.position.z = 10000;

    }
  }

  addRight() {
    for (var tZ = 0; tZ < this.tiles.length; tZ++) {
      const tX = this.tiles[tZ].length;
      this.tiles[tZ][tX] = new Tiles[9]();
      this.meshes.push(this.tiles[tZ][tX].mesh);
      this.tiles[tZ][tX].addToScene(Simplicity.scene);
      this.tiles[tZ][tX].position.x = (tX)*200;
      this.tiles[tZ][tX].position.z = tZ*200;

    }
  }

  addDown() {
    this.layout.push([])
    this.tiles.push([]);
    for (var tX = 0; tX < this.tiles[0].length; tX++) {
      const tZ = this.tiles.length-1;
      this.tiles[tZ][tX] = new Tiles[9]();
      this.meshes.push(this.tiles[tZ][tX].mesh);
      this.tiles[tZ][tX].addToScene(Simplicity.scene);
      this.tiles[tZ][tX].position.x = tX*200;
      this.tiles[tZ][tX].position.z = tZ*200;

    }
  }

  addLeft() {
    this.tiles.forEach((e) => {
      e.forEach((tile) => {
        tile.position.x += 200;
      })
    })

    for (var tZ = 0; tZ < this.tiles.length; tZ++) {
      this.tiles[tZ].unshift(new Tiles[9]());
      this.layout[tZ].unshift(null);
      this.meshes.push(this.tiles[tZ][0].mesh);
      this.tiles[tZ][0].addToScene(Simplicity.scene);
      this.tiles[tZ][0].position.x = 0*200;
      this.tiles[tZ][0].position.z = tZ*200;
    }

    this.player.position.x += 200;
  }

  addUp() {
    this.tiles.forEach((e) => {
      e.forEach((tile) => {
        tile.position.z += 200;
      })
    })
    this.layout.unshift([])
    this.tiles.unshift([]);

    for (var tX = 0; tX < this.tiles[1].length; tX++) {
      this.tiles[0][tX] = new Tiles[9]();
      this.meshes.push(this.tiles[0][tX].mesh);
      this.tiles[0][tX].addToScene(Simplicity.scene);
      this.tiles[0][tX].position.x = tX*200;
    }

    this.player.position.z += 200;
  }

}

export default LevelEditor;
