(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stateStateManager = require('./state/StateManager');

var _stateStateManager2 = _interopRequireDefault(_stateStateManager);

var Simplicity = {};

Simplicity.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
Simplicity.renderer = new THREE.WebGLRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new _stateStateManager2['default']();

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1000;
Simplicity.camera.position.y = 300;
Simplicity.renderer.setClearColor(0x373B44, 1);

Object.defineProperties(Simplicity, {
  scene: { get: function get() {
      return this.StateManager.scene;
    } } // eslint-disable-line object-shorthand
});

document.body.appendChild(Simplicity.renderer.domElement);

window.addEventListener('keydown', function (e) {
  Simplicity.keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  delete Simplicity.keysDown[e.keyCode];
});

exports['default'] = Simplicity;
module.exports = exports['default'];

},{"./state/StateManager":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = (function () {
  function Entity(geometry, material) {
    _classCallCheck(this, Entity);

    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  _createClass(Entity, [{
    key: "addToScene",
    value: function addToScene(scene) {
      scene.add(this.mesh);
      this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
      this.egh.material.linewidth = 1;
      scene.add(this.egh);
    }

    // TODO: add animation
    // some way to pass in tweens
  }, {
    key: "animate",
    value: function animate() {}
  }, {
    key: "lookAt",
    value: function lookAt(camera) {
      camera.lookAt(this.mesh.position);
    }
  }, {
    key: "test",
    value: function test() {
      this.mesh.position.x += 100;
    }
  }, {
    key: "position",
    get: function get() {
      return this.mesh.position;
    }
  }]);

  return Entity;
})();

exports["default"] = Entity;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
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

},{"./Entity":2}],4:[function(require,module,exports){
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

var geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1),
    material = new THREE.MeshBasicMaterial({ color: 0xDEE1B6 });

var Tile = (function (_Entity) {
  _inherits(Tile, _Entity);

  function Tile() {
    _classCallCheck(this, Tile);

    _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, geometry, material);
    this.mesh.position.y = -150;
  }

  return Tile;
})(_Entity3['default']);

exports['default'] = Tile;
module.exports = exports['default'];

},{"./Entity":2}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Simplicity = require('Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _stateLevel = require('./state/Level');

var _stateLevel2 = _interopRequireDefault(_stateLevel);

_Simplicity2['default'].StateManager.add('test', new _stateLevel2['default']());
_Simplicity2['default'].StateManager.load('test');

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
  _Simplicity2['default'].StateManager.loop();
  _Simplicity2['default'].renderer.render(_Simplicity2['default'].scene, _Simplicity2['default'].camera);
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

},{"./state/Level":6,"Simplicity":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Simplicity = require('../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _entitiesPlayerJs = require('../entities/Player.js');

var _entitiesPlayerJs2 = _interopRequireDefault(_entitiesPlayerJs);

var _entitiesTileJs = require('../entities/Tile.js');

var _entitiesTileJs2 = _interopRequireDefault(_entitiesTileJs);

var Level = (function (_State) {
  _inherits(Level, _State);

  function Level() {
    _classCallCheck(this, Level);

    _get(Object.getPrototypeOf(Level.prototype), 'constructor', this).call(this);
  }

  _createClass(Level, [{
    key: 'create',
    value: function create() {
      this.player = new _entitiesPlayerJs2['default']();
      this.tile = new _entitiesTileJs2['default']();
      this.player.addToScene(_Simplicity2['default'].scene);
      this.tile.addToScene(_Simplicity2['default'].scene);
    }
  }, {
    key: 'update',
    value: function update() {
      if (_Simplicity2['default'].keysDown[68]) {
        this.player.test();
      }
      if (this.player.position.x > 5400) {
        _Simplicity2['default'].StateManager.load('test');
      }
      this.player.lookAt(_Simplicity2['default'].camera);
    }
  }]);

  return Level;
})(_State3['default']);

exports['default'] = Level;
module.exports = exports['default'];

},{"../Simplicity":1,"../entities/Player.js":3,"../entities/Tile.js":4,"./State":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = (function () {
  function State() {
    _classCallCheck(this, State);
  }

  _createClass(State, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {}
  }]);

  return State;
})();

exports["default"] = State;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var StateManager = (function () {
  function StateManager() {
    _classCallCheck(this, StateManager);

    this.states = {};
    this.currentState = { name: null, state: null };
    this.scene = new THREE.Scene();
  }

  _createClass(StateManager, [{
    key: 'add',
    value: function add(name, state) {
      this.states[name] = state;
    }
  }, {
    key: 'load',
    value: function load(name) {
      if (!this.states[name]) {
        console.error('Cannot load state ' + name);
        return;
      }

      this.scene = new THREE.Scene();

      var state = this.states[name];

      state.preload();
      state.create();

      this.currentState = { name: name, state: state };
    }
  }, {
    key: 'loop',
    value: function loop() {
      this.currentState.state.update();
      this.currentState.state.render();
    }
  }]);

  return StateManager;
})();

exports['default'] = StateManager;
module.exports = exports['default'];

},{}]},{},[5])
//# sourceMappingURL=game.js.map
