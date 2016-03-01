import Simplicity from 'init';
import Player from './entities/Player.js';

const player = new Player();

player.addToScene(Simplicity.scene);

gameLoop();
// function init() {
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
//   camera.position.z = 1000;
//   camera.position.y = 300;
//
//   scene = new THREE.Scene();
//
//   layout = [[1,1,1,1,1,1], [1,1,1], [1,1,1]]
//
//   for (var y = 0; y < layout.length; y++) {
//     for (var x = 0; x < layout[y].length; x++) {
//       var geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1);
//       var material =  new THREE.MeshBasicMaterial({
//         color: 0xfff999fff,
//         wireframe: true,
//         wireframelinewidth:0 })
//       mesh = new THREE.Mesh(geometry, material);
//       mesh.position.x = x*200
//       mesh.position.z = y*200
//       mesh.position.y = -150
//       scene.add( mesh );
//       }
//     }
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  TWEEN.update();
  player.lookAt(Simplicity.camera);
  Simplicity.renderer.render(Simplicity.scene, Simplicity.camera);
  if(Simplicity.keysDown[68]) {
    player.test();
  }
}

    // function movePlayer() {
    //   canPlay = false;
    //   var move = new TWEEN.Tween(mesh.position).to({x: mesh.position.x+200}, 250);
    //   var camMove = new TWEEN.Tween(camera.position).to({x: mesh.position.x+200}, 250);
    //   var rotate = new TWEEN.Tween(mesh.rotation).to({z:  mesh.rotation.z-1.5708}, 250);
    //
    //   var moveUp = new TWEEN.Tween(mesh.position).to({y: 50}, 125);
    //   var moveDown = new TWEEN.Tween(mesh.position).to({y: 0}, 125);
    //
    //   moveUp.chain(moveDown);
    //
    //   move.start(); rotate.start(), moveUp.start(); camMove.start();
    //
    //   move.onComplete(function() {
    //     canPlay = true;
    //   })
    // }
