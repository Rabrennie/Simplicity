(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var camera, scene, renderer;
var mesh, layout;
var canPlay = true;
var key = null;

init();
animation();
function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 1000;
  camera.position.y = 300;

  scene = new THREE.Scene();

  layout = [[1, 1, 1, 1, 1, 1], [1, 1, 1], [1, 1, 1]];

  for (var y = 0; y < layout.length; y++) {
    for (var x = 0; x < layout[y].length; x++) {
      var geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1);
      var material = new THREE.MeshBasicMaterial({
        color: 0xfff999fff,
        wireframe: true,
        wireframelinewidth: 0 });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = x * 200;
      mesh.position.z = y * 200;
      mesh.position.y = -150;
      scene.add(mesh);
    }
  }

  geometry = new THREE.BoxGeometry(200, 200, 200, 1, 1, 1);
  material = new THREE.MeshBasicMaterial({
    color: 0xfff999fff,
    wireframe: false,
    wireframelinewidth: 0 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  window.addEventListener('keypress', function (e) {
    key = e.keyCode;
  });
}
function animation() {
  window.requestAnimationFrame(animation);
  TWEEN.update();
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  if (canPlay) {
    if (key === 100) {
      movePlayer();
      key = null;
    }
  } else {
    key = null;
  }
}

function movePlayer() {
  canPlay = false;
  var move = new TWEEN.Tween(mesh.position).to({ x: mesh.position.x + 200 }, 250);
  var camMove = new TWEEN.Tween(camera.position).to({ x: mesh.position.x + 200 }, 250);
  var rotate = new TWEEN.Tween(mesh.rotation).to({ z: mesh.rotation.z - 1.5708 }, 250);

  var moveUp = new TWEEN.Tween(mesh.position).to({ y: 50 }, 125);
  var moveDown = new TWEEN.Tween(mesh.position).to({ y: 0 }, 125);

  moveUp.chain(moveDown);

  move.start();rotate.start(), moveUp.start();camMove.start();

  move.onComplete(function () {
    canPlay = true;
  });
}

},{}]},{},[1])
//# sourceMappingURL=game.js.map
