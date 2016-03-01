(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Entity = (function () {
  function Entity(geometry, material) {
    _classCallCheck(this, Entity);

    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  _createClass(Entity, [{
    key: 'addToScene',
    value: function addToScene(scene) {
      scene.add(this.mesh);
    }

    // TODO: add animation
  }, {
    key: 'animate',
    value: function animate() {}
  }, {
    key: 'lookAt',
    value: function lookAt(camera) {
      camera.lookAt(this.mesh.position);
    }
  }, {
    key: 'test',
    value: function test() {
      this.mesh.position.x += 100;
      console.log('test');
    }
  }]);

  return Entity;
})();

exports['default'] = Entity;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var geometry = new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),
    material = new THREE.MeshBasicMaterial({ color: 0xE1B866 });

var Player = (function (_Entity) {
  _inherits(Player, _Entity);

  function Player() {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, geometry, material);
  }

  return Player;
})(_Entity3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"./Entity":1}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _init = require('init');

var _init2 = _interopRequireDefault(_init);

var _entitiesPlayerJs = require('./entities/Player.js');

var _entitiesPlayerJs2 = _interopRequireDefault(_entitiesPlayerJs);

var player = new _entitiesPlayerJs2['default']();

player.addToScene(_init2['default'].scene);

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
  player.lookAt(_init2['default'].camera);
  _init2['default'].renderer.render(_init2['default'].scene, _init2['default'].camera);
  if (_init2['default'].keysDown[68]) {
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

},{"./entities/Player.js":2,"init":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Simplicity = {};

Simplicity.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
Simplicity.scene = new THREE.Scene();
Simplicity.renderer = new THREE.WebGLRenderer({ antialias: true });
Simplicity.keysDown = {};

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1000;
Simplicity.camera.position.y = 300;
Simplicity.renderer.setClearColor(0x373B44, 1);

document.body.appendChild(Simplicity.renderer.domElement);

window.addEventListener('keydown', function (e) {
  Simplicity.keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  delete Simplicity.keysDown[e.keyCode];
});

exports['default'] = Simplicity;
module.exports = exports['default'];

},{}]},{},[3])
//# sourceMappingURL=game.js.map
