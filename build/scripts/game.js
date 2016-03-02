(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stateStateManager = require('./state/StateManager');

var _stateStateManager2 = _interopRequireDefault(_stateStateManager);

var Simplicity = {};

var supportsWebGL = (function () {
  try {
    return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
  } catch (e) {
    return false;
  }
})();

Simplicity.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 20000);
Simplicity.renderer = supportsWebGL ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new _stateStateManager2['default']();

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1500;
Simplicity.camera.position.y = 1000;
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
    this.tweening = false;
    console.log(this.mesh);
  }

  _createClass(Entity, [{
    key: 'addToScene',
    value: function addToScene(scene) {
      scene.add(this.mesh);
      this.egh = new THREE.EdgesHelper(this.mesh, 0x373B44);
      this.egh.material.linewidth = 1;
      scene.add(this.egh);
    }
  }, {
    key: 'moveRightAnim',
    value: function moveRightAnim() {
      var _this = this;

      this.tweening = true;

      var move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x + 200 }, 250);
      var rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: this.mesh.rotation.z - 1.5708 }, 250);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

      moveUp.chain(moveDown);

      rotate.onComplete(function () {
        _this.mesh.rotation.set(0, 0, 0);
        _this.tweening = false;
      });

      move.start();
      rotate.start();
      moveUp.start();
    }
  }, {
    key: 'moveLeftAnim',
    value: function moveLeftAnim() {
      var _this2 = this;

      this.tweening = true;

      var move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x - 200 }, 250);
      var rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: this.mesh.rotation.z + 1.5708 }, 250);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

      moveUp.chain(moveDown);

      rotate.onComplete(function () {
        _this2.mesh.rotation.set(0, 0, 0);
        _this2.tweening = false;
      });

      move.start();
      rotate.start();
      moveUp.start();
    }
  }, {
    key: 'moveDownAnim',
    value: function moveDownAnim() {
      var _this3 = this;

      this.tweening = true;

      var move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z + 200 }, 250);
      var rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: this.mesh.rotation.x + 1.5708 }, 250);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

      moveUp.chain(moveDown);

      rotate.onComplete(function () {
        _this3.mesh.rotation.set(0, 0, 0);
        _this3.tweening = false;
      });

      move.start();
      rotate.start();
      moveUp.start();
    }
  }, {
    key: 'moveUpAnim',
    value: function moveUpAnim() {
      var _this4 = this;

      this.tweening = true;

      var move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z - 200 }, 250);
      var rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: this.mesh.rotation.x - 1.5708 }, 250);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: 50 }, 125);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: 0 }, 125);

      moveUp.chain(moveDown);

      rotate.onComplete(function () {
        _this4.mesh.rotation.set(0, 0, 0);
        _this4.tweening = false;
      });

      move.start();
      rotate.start();
      moveUp.start();
    }
  }, {
    key: 'cameraFollow',
    value: function cameraFollow(camera) {
      camera.follow = this.mesh;
      camera.lookAt(this.mesh.position);
    }
  }, {
    key: 'move',
    value: function move(direction) {
      if (!this.tweening) {
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
  }, {
    key: 'position',
    get: function get() {
      return this.mesh.position;
    }
  }]);

  return Entity;
})();

exports['default'] = Entity;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

  _createClass(Player, [{
    key: 'tileX',
    get: function get() {
      return this.position.x / 200;
    }
  }, {
    key: 'tileZ',
    get: function get() {
      return this.position.z / 200;
    }
  }]);

  return Player;
})(_Entity3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"./Entity":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

    this.afterTriggered = false;
    this.beforeTriggered = false;
  }

  _createClass(Tile, [{
    key: 'nextTo',
    value: function nextTo(player) {
      console.log('nextTo');
    }
  }, {
    key: 'beforeStepOn',
    value: function beforeStepOn(player) {
      if (!this.beforeTriggered) {
        console.log('beforeStepOn', this.mesh.position);
      }
      this.beforeTriggered = true;
      this.afterTriggered = false;
    }
  }, {
    key: 'afterStepOn',
    value: function afterStepOn(player) {
      if (!this.afterTriggered) {
        console.log('afterStepOn', this.mesh.position);
      }
      this.afterTriggered = true;
      this.beforeTriggered = false;
    }
  }]);

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

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  TWEEN.update();
  if (_Simplicity2['default'].camera.follow) {
    _Simplicity2['default'].camera.position.x = _Simplicity2['default'].camera.follow.position.x;
    _Simplicity2['default'].camera.position.z = _Simplicity2['default'].camera.follow.position.z + 1500;
  }
  _Simplicity2['default'].StateManager.loop();
  _Simplicity2['default'].renderer.render(_Simplicity2['default'].scene, _Simplicity2['default'].camera);
}

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
    this.layout = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    this.tiles = [];
  }

  _createClass(Level, [{
    key: 'create',
    value: function create() {
      this.player = new _entitiesPlayerJs2['default']();
      this.player.addToScene(_Simplicity2['default'].scene);
      this.player.cameraFollow(_Simplicity2['default'].camera);
      this.spawnTiles();
    }
  }, {
    key: 'spawnTiles',
    value: function spawnTiles() {
      for (var z = 0; z < this.layout.length; z++) {
        this.tiles.push([]);
        for (var x = 0; x < this.layout[z].length; x++) {
          this.tiles[z][x] = new _entitiesTileJs2['default']();
          this.tiles[z][x].addToScene(_Simplicity2['default'].scene);
          this.tiles[z][x].position.x = x * 200;
          this.tiles[z][x].position.z = z * 200;
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {

      this.afterTrigger();

      if (!this.player.tweening) {
        if (_Simplicity2['default'].keysDown[68]) {
          this.beforeTrigger(this.player.tileZ, this.player.tileX + 1);
          this.player.move('right');
        } else if (_Simplicity2['default'].keysDown[83]) {
          this.beforeTrigger(this.player.tileZ + 1, this.player.tileX);
          this.player.move('down');
        } else if (_Simplicity2['default'].keysDown[65]) {
          this.beforeTrigger(this.player.tileZ, this.player.tileX - 1);
          this.player.move('left');
        } else if (_Simplicity2['default'].keysDown[87]) {
          this.beforeTrigger(this.player.tileZ - 1, this.player.tileX);
          this.player.move('up');
        }
      }
    }
  }, {
    key: 'beforeTrigger',
    value: function beforeTrigger(z, x) {
      if (!this.player.tweening) {
        if (this.checkTile(z, x)) {
          this.tiles[z][x].beforeStepOn();
        }
      }
    }
  }, {
    key: 'afterTrigger',
    value: function afterTrigger() {
      if (!this.player.tweening) {
        if (this.checkTile(this.player.tileZ, this.player.tileX)) {
          this.tiles[this.player.tileZ][this.player.tileX].afterStepOn();
        }
      }
    }
  }, {
    key: 'checkTile',
    value: function checkTile(z, x) {
      if (this.tiles[z] !== undefined) {
        if (this.tiles[z][x]) {
          return true;
        }
      }

      return false;
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
