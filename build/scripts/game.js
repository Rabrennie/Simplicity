(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stateStateManager = require('./state/StateManager');

var _stateStateManager2 = _interopRequireDefault(_stateStateManager);

var _uiUIManager = require('./ui/UIManager');

var _uiUIManager2 = _interopRequireDefault(_uiUIManager);

var Simplicity = {};

var supportsWebGL = (function () {
  try {
    return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
  } catch (e) {
    return false;
  }
})();

Simplicity.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 5000);
Simplicity.renderer = supportsWebGL ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new _stateStateManager2['default']();
Simplicity.UIManager = new _uiUIManager2['default']();
Simplicity.models = {};
Simplicity.clear = function () {
  Simplicity.UIManager.clear();
};

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1500;
Simplicity.camera.position.y = 1000;
Simplicity.renderer.setClearColor(0x161616, 1);
Simplicity.renderer.domElement.id = 'renderer';
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

Simplicity.hash = null;

exports['default'] = Simplicity;
module.exports = exports['default'];

},{"./state/StateManager":20,"./ui/UIManager":26}],2:[function(require,module,exports){
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
    this.lastDirection;
  }

  _createClass(Entity, [{
    key: 'addToScene',
    value: function addToScene(scene) {
      scene.add(this.mesh);
      this.egh = new THREE.EdgesHelper(this.mesh, 0x515151);
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
      camera.position.x = camera.follow.position.x;
      camera.position.z = camera.follow.position.z + 1500;
      camera.lookAt(this.mesh.position);
    }
  }, {
    key: 'move',
    value: function move(direction) {
      if (!this.tweening) {
        switch (direction) {
          case 'right':
            this.lastDirection = 'right';
            this.moveRightAnim();
            break;

          case 'down':
            this.lastDirection = 'down';
            this.moveDownAnim();
            break;

          case 'left':
            this.lastDirection = 'left';
            this.moveLeftAnim();
            break;

          case 'up':
            this.lastDirection = 'up';
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
    material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

var Player = (function (_Entity) {
  _inherits(Player, _Entity);

  function Player() {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, geometry, material);
  }

  _createClass(Player, [{
    key: 'fall',
    value: function fall(cb) {
      this.tweening = true;
      var rotate = null;
      var move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y - 2000 }, 600);

      if (this.lastDirection === 'right') {
        rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: -4.7124 }, 600);
      } else if (this.lastDirection === 'left') {
        rotate = new TWEEN.Tween(this.mesh.rotation).to({ z: 4.7124 }, 600);
      } else if (this.lastDirection === 'up') {
        rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: -4.7124 }, 600);
      } else if (this.lastDirection === 'down') {
        rotate = new TWEEN.Tween(this.mesh.rotation).to({ x: 4.7124 }, 600);
      }

      move.onComplete(cb);

      move.start();
      rotate.start();
    }
  }, {
    key: 'trampolineDownAnim',
    value: function trampolineDownAnim() {
      var _this = this;

      this.tweening = true;
      var move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z + 400 }, 600);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y + 200 }, 300);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y }, 300);

      moveUp.chain(moveDown);
      moveUp.easing(TWEEN.Easing.Quadratic.Out);
      moveDown.easing(TWEEN.Easing.Quadratic.In);

      move.start();
      moveUp.start();

      moveDown.onComplete(function () {
        _this.tweening = false;
      });
    }
  }, {
    key: 'trampolineUpAnim',
    value: function trampolineUpAnim() {
      var _this2 = this;

      this.tweening = true;
      var move = new TWEEN.Tween(this.mesh.position).to({ z: this.mesh.position.z - 400 }, 600);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y + 200 }, 300);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y }, 300);

      moveUp.chain(moveDown);
      moveUp.easing(TWEEN.Easing.Quadratic.Out);
      moveDown.easing(TWEEN.Easing.Quadratic.In);

      move.start();
      moveUp.start();

      moveDown.onComplete(function () {
        _this2.tweening = false;
      });
    }
  }, {
    key: 'trampolineRightAnim',
    value: function trampolineRightAnim() {
      var _this3 = this;

      this.tweening = true;
      var move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x + 400 }, 600);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y + 200 }, 300);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y }, 300);

      moveUp.chain(moveDown);
      moveUp.easing(TWEEN.Easing.Quadratic.Out);
      moveDown.easing(TWEEN.Easing.Quadratic.In);

      move.start();
      moveUp.start();

      moveDown.onComplete(function () {
        _this3.tweening = false;
      });
    }
  }, {
    key: 'trampolineLeftAnim',
    value: function trampolineLeftAnim() {
      var _this4 = this;

      this.tweening = true;
      var move = new TWEEN.Tween(this.mesh.position).to({ x: this.mesh.position.x - 400 }, 600);
      var moveUp = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y + 200 }, 300);
      var moveDown = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y }, 300);

      moveUp.chain(moveDown);
      moveUp.easing(TWEEN.Easing.Quadratic.Out);
      moveDown.easing(TWEEN.Easing.Quadratic.In);

      move.start();
      moveUp.start();

      moveDown.onComplete(function () {
        _this4.tweening = false;
      });
    }
  }, {
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

var geometry = new THREE.BoxGeometry(200, 100, 200, 1, 1, 1);

var Tile = (function (_Entity) {
  _inherits(Tile, _Entity);

  function Tile(newMaterial) {
    _classCallCheck(this, Tile);

    if (newMaterial) {
      _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, geometry, newMaterial);
    } else {
      _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, geometry, new THREE.MeshBasicMaterial({ color: 0xEEEEEE }));
    }

    this.mesh.position.y = -150;

    this.nextTriggered = false;
    this.afterTriggered = false;
    this.beforeTriggered = false;
    this.stepTriggered = false;

    this.nextCallback = function () {};
    this.beforeCallback = function () {};
    this.afterCallback = function () {};
    this.stepCallback = function () {};
  }

  // can only trigger once for now

  _createClass(Tile, [{
    key: 'nextTo',
    value: function nextTo(level) {
      if (!this.nextTriggered) {
        this.nextCallback(level);
        this.nextTriggered = true;
      }
    }
  }, {
    key: 'beforeStepOn',
    value: function beforeStepOn(level) {
      if (!this.beforeTriggered) {
        this.beforeCallback(level);
      }
      this.beforeTriggered = true;
      this.afterTriggered = false;
    }
  }, {
    key: 'afterStepOn',
    value: function afterStepOn(level) {
      if (!this.afterTriggered) {
        this.afterCallback(level);
      }
      this.afterTriggered = true;
      this.beforeTriggered = false;
    }
  }, {
    key: 'stepOff',
    value: function stepOff(level) {
      if (!this.stepTriggered) {
        this.stepCallback(level);
      }

      this.stepTriggered = true;
    }
  }]);

  return Tile;
})(_Entity3['default']);

exports['default'] = Tile;
module.exports = exports['default'];

},{"./Entity":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

// TODO: Find a better way to represent the tile

var ButtonTile = (function (_Tile) {
  _inherits(ButtonTile, _Tile);

  function ButtonTile() {
    _classCallCheck(this, ButtonTile);

    _get(Object.getPrototypeOf(ButtonTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0xEEEEFF }));

    this.afterCallback = function (level) {
      level.switchElectric();
    };
  }

  return ButtonTile;
})(_TileJs2['default']);

exports['default'] = ButtonTile;
module.exports = exports['default'];

},{"../Tile.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

var EditorTile = (function (_Tile) {
  _inherits(EditorTile, _Tile);

  function EditorTile() {
    _classCallCheck(this, EditorTile);

    _get(Object.getPrototypeOf(EditorTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0x00E500, visible: false }));
  }

  _createClass(EditorTile, [{
    key: 'addToScene',
    value: function addToScene(scene) {
      scene.add(this.mesh);
      this.egh = new THREE.EdgesHelper(this.mesh, 0xAAAAAA);
      this.egh.material.linewidth = 1;
      scene.add(this.egh);
    }
  }]);

  return EditorTile;
})(_TileJs2['default']);

exports['default'] = EditorTile;
module.exports = exports['default'];

},{"../Tile.js":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

// TODO: find a different style for the tile

var ElectricTile = (function (_Tile) {
  _inherits(ElectricTile, _Tile);

  function ElectricTile() {
    var _this = this;

    _classCallCheck(this, ElectricTile);

    _get(Object.getPrototypeOf(ElectricTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0x0000FF }));

    this.active = true;

    this.afterCallback = function (level) {
      if (_this.active) {
        level.reset();
      }
    };
  }

  _createClass(ElectricTile, [{
    key: 'switchActive',
    value: function switchActive() {
      this.active = !this.active;
      if (this.active) {
        this.mesh.material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
      } else {
        this.mesh.material = new THREE.MeshBasicMaterial({ color: 0xEEEEEE });
      }
    }
  }]);

  return ElectricTile;
})(_TileJs2['default']);

exports['default'] = ElectricTile;
module.exports = exports['default'];

},{"../Tile.js":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

// TODO: Find a better way to represent the tile

var FallingTile = (function (_Tile) {
  _inherits(FallingTile, _Tile);

  function FallingTile() {
    var _this = this;

    _classCallCheck(this, FallingTile);

    _get(Object.getPrototypeOf(FallingTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0xFFCCCC }));

    this.stepCallback = function (level) {

      var x = _this.mesh.position.x / 200;
      var z = _this.mesh.position.z / 200;

      level.tiles[z][x] = undefined;

      var move = new TWEEN.Tween(_this.mesh.position).to({ y: _this.mesh.position.y - 4000 }, 1200);
      move.start();

      move.onComplete(function () {
        _this.mesh.visible = false;
        _this.egh.visible = false;
      });
    };
  }

  return FallingTile;
})(_TileJs2['default']);

exports['default'] = FallingTile;
module.exports = exports['default'];

},{"../Tile.js":4}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

var GoalTile = (function (_Tile) {
  _inherits(GoalTile, _Tile);

  function GoalTile() {
    _classCallCheck(this, GoalTile);

    _get(Object.getPrototypeOf(GoalTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0x00E500 }));
    this.afterCallback = function (level) {
      level.win();
    };
  }

  return GoalTile;
})(_TileJs2['default']);

exports['default'] = GoalTile;
module.exports = exports['default'];

},{"../Tile.js":4}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

var GuideTile = (function (_Tile) {
  _inherits(GuideTile, _Tile);

  function GuideTile() {
    _classCallCheck(this, GuideTile);

    _get(Object.getPrototypeOf(GuideTile.prototype), 'constructor', this).call(this);

    this.nextCallback = function () {
      this.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00B4FF });
    };
  }

  return GuideTile;
})(_TileJs2['default']);

exports['default'] = GuideTile;
module.exports = exports['default'];

},{"../Tile.js":4}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

var _Simplicity = require('Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var SpikeTile = (function (_Tile) {
  _inherits(SpikeTile, _Tile);

  function SpikeTile() {
    var _this = this;

    _classCallCheck(this, SpikeTile);

    _get(Object.getPrototypeOf(SpikeTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0xEEEEEE }));
    this.mesh.geometry = _Simplicity2['default'].models.spikes;
    this.mesh.scale.set(100, 100, 100);
    this.active = true;

    this.afterCallback = function (level) {
      if (_this.active) {
        level.reset();
      }
    };
  }

  _createClass(SpikeTile, [{
    key: 'switchActive',
    value: function switchActive() {
      this.active = !this.active;
      if (this.active) {
        var move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y + 50 }, 150);
        move.start();
      } else {
        var move = new TWEEN.Tween(this.mesh.position).to({ y: this.mesh.position.y - 50 }, 150);
        move.start();
      }
    }
  }]);

  return SpikeTile;
})(_TileJs2['default']);

exports['default'] = SpikeTile;
module.exports = exports['default'];

},{"../Tile.js":4,"Simplicity":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Tile = require('../Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _GuideTile = require('./GuideTile');

var _GuideTile2 = _interopRequireDefault(_GuideTile);

var _GoalTile = require('./GoalTile');

var _GoalTile2 = _interopRequireDefault(_GoalTile);

var _ElectricTile = require('./ElectricTile');

var _ElectricTile2 = _interopRequireDefault(_ElectricTile);

var _SpikeTile = require('./SpikeTile');

var _SpikeTile2 = _interopRequireDefault(_SpikeTile);

var _ButtonTile = require('./ButtonTile');

var _ButtonTile2 = _interopRequireDefault(_ButtonTile);

var _FallingTile = require('./FallingTile');

var _FallingTile2 = _interopRequireDefault(_FallingTile);

var _TrampolineTile = require('./TrampolineTile');

var _TrampolineTile2 = _interopRequireDefault(_TrampolineTile);

var _EditorTile = require('./EditorTile');

var _EditorTile2 = _interopRequireDefault(_EditorTile);

var Tiles = {
  1: _Tile2['default'],
  2: _GuideTile2['default'],
  3: _GoalTile2['default'],
  4: _SpikeTile2['default'],
  5: _ElectricTile2['default'],
  6: _ButtonTile2['default'],
  7: _FallingTile2['default'],
  8: _TrampolineTile2['default'],
  9: _EditorTile2['default']
};

exports['default'] = Tiles;
module.exports = exports['default'];

},{"../Tile":4,"./ButtonTile":5,"./EditorTile":6,"./ElectricTile":7,"./FallingTile":8,"./GoalTile":9,"./GuideTile":10,"./SpikeTile":11,"./TrampolineTile":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TileJs = require('../Tile.js');

var _TileJs2 = _interopRequireDefault(_TileJs);

// TODO: Find a better way to represent the tile

var TrampolineTile = (function (_Tile) {
  _inherits(TrampolineTile, _Tile);

  function TrampolineTile() {
    _classCallCheck(this, TrampolineTile);

    _get(Object.getPrototypeOf(TrampolineTile.prototype), 'constructor', this).call(this, new THREE.MeshBasicMaterial({ color: 0xCCFFFF }));

    this.afterCallback = function (level) {

      level.resetTimer();

      if (level.player.lastDirection === 'down') {
        level.player.trampolineDownAnim();
      }

      if (level.player.lastDirection === 'up') {
        level.player.trampolineUpAnim();
      }

      if (level.player.lastDirection === 'left') {
        level.player.trampolineLeftAnim();
      }

      if (level.player.lastDirection === 'right') {
        level.player.trampolineRightAnim();
      }
    };
  }

  return TrampolineTile;
})(_TileJs2['default']);

exports['default'] = TrampolineTile;
module.exports = exports['default'];

},{"../Tile.js":4}],14:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Simplicity = require('Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _stateLevel = require('./state/Level');

var _stateLevel2 = _interopRequireDefault(_stateLevel);

var _stateMenusMainMenu = require('./state/menus/MainMenu');

var _stateMenusMainMenu2 = _interopRequireDefault(_stateMenusMainMenu);

var _stateMenusRecentMenu = require('./state/menus/RecentMenu');

var _stateMenusRecentMenu2 = _interopRequireDefault(_stateMenusRecentMenu);

var _stateMenusPlayMenu = require('./state/menus/PlayMenu');

var _stateMenusPlayMenu2 = _interopRequireDefault(_stateMenusPlayMenu);

var _stateInit = require('./state/Init');

var _stateInit2 = _interopRequireDefault(_stateInit);

var _stateLevelEditor = require('./state/LevelEditor');

var _stateLevelEditor2 = _interopRequireDefault(_stateLevelEditor);

var _stateSharedLevel = require('./state/SharedLevel');

var _stateSharedLevel2 = _interopRequireDefault(_stateSharedLevel);

_Simplicity2['default'].StateManager.add('test', _stateLevel2['default']);
_Simplicity2['default'].StateManager.add('MainMenu', _stateMenusMainMenu2['default']);
_Simplicity2['default'].StateManager.add('RecentMenu', _stateMenusRecentMenu2['default']);
_Simplicity2['default'].StateManager.add('PlayMenu', _stateMenusPlayMenu2['default']);
_Simplicity2['default'].StateManager.add('LevelEditor', _stateLevelEditor2['default']);
_Simplicity2['default'].StateManager.add('SharedLevel', _stateSharedLevel2['default']);
_Simplicity2['default'].StateManager.add('Init', _stateInit2['default']);
_Simplicity2['default'].StateManager.load('Init');

gameLoop();

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  TWEEN.update();
  if (_Simplicity2['default'].camera.follow) {
    _Simplicity2['default'].camera.position.x = _Simplicity2['default'].camera.follow.position.x;
    _Simplicity2['default'].camera.position.z = _Simplicity2['default'].camera.follow.position.z + 1500;
  }
  if (_Simplicity2['default'].StateManager.doLoop) {
    _Simplicity2['default'].StateManager.loop();
  }
  _Simplicity2['default'].renderer.render(_Simplicity2['default'].scene, _Simplicity2['default'].camera);
}

},{"./state/Init":15,"./state/Level":16,"./state/LevelEditor":17,"./state/SharedLevel":18,"./state/menus/MainMenu":23,"./state/menus/PlayMenu":24,"./state/menus/RecentMenu":25,"Simplicity":1}],15:[function(require,module,exports){
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

var Init = (function (_State) {
  _inherits(Init, _State);

  function Init() {
    _classCallCheck(this, Init);

    _get(Object.getPrototypeOf(Init.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Init, [{
    key: 'preload',
    value: function preload() {
      var loader = new THREE.JSONLoader();
      loader.load('./assets/test.json', function (geometry) {
        _Simplicity2['default'].models.spikes = geometry;
        if (window.location.hash) {
          _Simplicity2['default'].hash = window.location.hash.substring(1);
          _Simplicity2['default'].StateManager.load('SharedLevel');
        } else {
          _Simplicity2['default'].StateManager.load('MainMenu');
        }
      });
    }
  }]);

  return Init;
})(_State3['default']);

exports['default'] = Init;
module.exports = exports['default'];

},{"../Simplicity":1,"./State":19}],16:[function(require,module,exports){
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

var _entitiesTilesTilesJs = require('../entities/tiles/Tiles.js');

var _entitiesTilesTilesJs2 = _interopRequireDefault(_entitiesTilesTilesJs);

var Level = (function (_State) {
  _inherits(Level, _State);

  function Level(layout) {
    _classCallCheck(this, Level);

    _get(Object.getPrototypeOf(Level.prototype), 'constructor', this).call(this);
    if (layout) {
      this.layout = layout;
    } else {
      this.layout = [[7, 7, 7], [7, 7, 7], [7, 8, 7], [7, 0, 7], [7, 8, 7], [7, 0, 7], [7, 3, 7]];
    }
    this.tiles = [];
    this.name = 'Level One';
    this.levelName = 'test';
    this.nextLevelName = 'test';
    this.playerStart = { x: 0, z: 0 };
    this.timeBetween = 2;
    this.maxSteps = 10;
  }

  _createClass(Level, [{
    key: 'create',
    value: function create() {
      this.player = new _entitiesPlayerJs2['default']();
      this.player.addToScene(_Simplicity2['default'].scene);
      this.player.cameraFollow(_Simplicity2['default'].camera);

      this.player.mesh.position.x = this.playerStart.x;
      this.player.mesh.position.z = this.playerStart.z;

      _Simplicity2['default'].UIManager.add('timer', this.timeBetween);

      this.curSteps = 0;
      _Simplicity2['default'].UIManager.add('counter', this.curSteps + ' / ' + this.maxSteps);

      this.name = this.htmlEscape(this.name);

      this.levelElem = _Simplicity2['default'].UIManager.add('levelName', '' + this.name);
      this.player.tweening = true;

      this.spikeTiles = [];
      this.electricTiles = [];

      this.spawnTiles();
    }
  }, {
    key: 'spawnTiles',
    value: function spawnTiles() {
      for (var z = 0; z < this.layout.length; z++) {
        this.tiles.push([]);
        for (var x = 0; x < this.layout[z].length; x++) {
          if (this.layout[z][x] > 0) {
            this.tiles[z][x] = new _entitiesTilesTilesJs2['default'][this.layout[z][x]]();
            this.tiles[z][x].addToScene(_Simplicity2['default'].scene);
            this.tiles[z][x].position.x = x * 200;
            this.tiles[z][x].position.z = z * 200;
          }

          if (this.layout[z][x] === 4) {
            var test = new _entitiesTilesTilesJs2['default'][1]();
            test.addToScene(_Simplicity2['default'].scene);
            test.position.x = x * 200;
            test.position.z = z * 200;
            this.spikeTiles.push(this.tiles[z][x]);
          }

          if (this.layout[z][x] === 5) {
            this.electricTiles.push(this.tiles[z][x]);
          }
        }
      }
    }
  }, {
    key: 'htmlEscape',
    value: function htmlEscape(str) {
      return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }, {
    key: 'update',
    value: function update() {

      if (this.player.tweening && Object.keys(_Simplicity2['default'].keysDown).length > 0 && this.levelElem) {
        _Simplicity2['default'].UIManager.remove('levelName');
        this.player.tweening = false;
        this.levelElem = false;
      }

      if (this.moved) {
        this.onStep();
      }

      this.afterTrigger();

      if (_Simplicity2['default'].keysDown[82]) {
        this.reset();
      }

      if (_Simplicity2['default'].keysDown[27]) {
        if (this.timer) {
          this.timer.stop();
        }
        this.moved = false;
        _Simplicity2['default'].keysDown = {};
        _Simplicity2['default'].StateManager.load('MainMenu');
      }

      if (_Simplicity2['default'].keysDown[32] && this.won) {
        this.reset();
      }

      if (!this.player.tweening) {
        this.moved = false;
        if (_Simplicity2['default'].keysDown[68]) {
          this.lastPosition = { x: this.player.tileX, z: this.player.tileZ };
          this.beforeTrigger(this.player.tileZ, this.player.tileX + 1);
          this.player.move('right');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[83]) {
          this.lastPosition = { x: this.player.tileX, z: this.player.tileZ };
          this.beforeTrigger(this.player.tileZ + 1, this.player.tileX);
          this.player.move('down');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[65]) {
          this.lastPosition = { x: this.player.tileX, z: this.player.tileZ };
          this.beforeTrigger(this.player.tileZ, this.player.tileX - 1);
          this.player.move('left');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[87]) {
          this.lastPosition = { x: this.player.tileX, z: this.player.tileZ };
          this.beforeTrigger(this.player.tileZ - 1, this.player.tileX);
          this.player.move('up');
          this.moved = true;
        }
      }
    }
  }, {
    key: 'beforeTrigger',
    value: function beforeTrigger(z, x) {
      if (!this.player.tweening) {
        if (this.checkTile(z, x)) {
          this.tiles[z][x].beforeStepOn(this);
        }
      }
    }
  }, {
    key: 'afterTrigger',
    value: function afterTrigger() {
      if (!this.player.tweening) {
        if (this.checkTile(this.player.tileZ, this.player.tileX)) {
          this.tiles[this.player.tileZ][this.player.tileX].afterStepOn(this);
        } else {
          this.fall();
        }

        if (this.checkTile(this.player.tileZ - 1, this.player.tileX)) {
          this.tiles[this.player.tileZ - 1][this.player.tileX].nextTo(this);
        }

        if (this.checkTile(this.player.tileZ + 1, this.player.tileX)) {
          this.tiles[this.player.tileZ + 1][this.player.tileX].nextTo(this);
        }

        if (this.checkTile(this.player.tileZ, this.player.tileX - 1)) {
          this.tiles[this.player.tileZ][this.player.tileX - 1].nextTo(this);
        }

        if (this.checkTile(this.player.tileZ, this.player.tileX + 1)) {
          this.tiles[this.player.tileZ][this.player.tileX + 1].nextTo(this);
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
  }, {
    key: 'fall',
    value: function fall() {
      var _this = this;

      this.timer.stop();
      this.player.fall(function () {
        _this.reset();
      });
    }
  }, {
    key: 'reset',
    value: function reset(nextLevel) {
      if (this.timer) {
        this.timer.stop();
      }
      this.moved = false;
      _Simplicity2['default'].keysDown = {};
      var color = new THREE.Color(1, 1, 1);
      this.player.material.color.setHex(color.getHex());

      if (nextLevel) {
        this.nextLevel();
      } else {
        this.restartLevel();
      }
    }
  }, {
    key: 'restartLevel',
    value: function restartLevel() {
      _Simplicity2['default'].StateManager.load(this.levelName);
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      _Simplicity2['default'].StateManager.load(this.nextName);
    }
  }, {
    key: 'win',
    value: function win() {
      var _this2 = this;

      this.won = true;
      this.timer.stop();
      this.player.tweening = true;
      var winContainer = _Simplicity2['default'].UIManager.add('win', '');
      _Simplicity2['default'].UIManager.add('title', 'You Win', winContainer);
      var nextBtn = _Simplicity2['default'].UIManager.add('nextBtn', 'Next Level', winContainer);
      nextBtn.addEventListener('mouseup', function () {
        _this2.reset();
      });
    }
  }, {
    key: 'onStep',
    value: function onStep() {
      this.curSteps += 1;
      this.moved = false;

      this.spikeTiles.forEach(function (tile) {
        tile.switchActive();
      });

      if (this.lastPosition) {
        this.tiles[this.lastPosition.z][this.lastPosition.x].stepOff(this);
      }

      var percentageLeft = 1 - this.curSteps / this.maxSteps;
      var color = 0xFFFFFF;

      if (percentageLeft < 0.1) {
        color = 0xFF0000;
      } else if (percentageLeft <= 0.5) {
        color = 0xfff200;
      }

      this.player.material.color.setHex(color);

      _Simplicity2['default'].UIManager.update('counter', this.curSteps + ' / ' + this.maxSteps);

      this.resetTimer();
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      var _this3 = this;

      if (this.timer) {
        this.timer.stop();
      }

      if (this.curSteps > this.maxSteps) {
        this.reset();
        return;
      }

      this.time = { val: this.timeBetween };
      this.timer = new TWEEN.Tween(this.time).to({ val: 0 }, 2000);

      this.timer.onUpdate(function () {
        _Simplicity2['default'].UIManager.update('timer', Math.round(this.val * 10) / 10);
      });

      this.timer.onComplete(function () {
        _this3.reset();
      });

      this.timer.start();
    }
  }, {
    key: 'switchElectric',
    value: function switchElectric() {
      this.electricTiles.forEach(function (tile) {
        tile.switchActive();
      });
    }
  }]);

  return Level;
})(_State3['default']);

exports['default'] = Level;
module.exports = exports['default'];

},{"../Simplicity":1,"../entities/Player.js":3,"../entities/tiles/Tiles.js":12,"./State":19}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Simplicity = require('../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Level2 = require('./Level');

var _Level3 = _interopRequireDefault(_Level2);

var _entitiesTilesTilesJs = require('../entities/tiles/Tiles.js');

var _entitiesTilesTilesJs2 = _interopRequireDefault(_entitiesTilesTilesJs);

var _entitiesPlayerJs = require('../entities/Player.js');

var _entitiesPlayerJs2 = _interopRequireDefault(_entitiesPlayerJs);

var LevelEditor = (function (_State) {
  _inherits(LevelEditor, _State);

  function LevelEditor() {
    _classCallCheck(this, LevelEditor);

    _get(Object.getPrototypeOf(LevelEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LevelEditor, [{
    key: 'create',
    value: function create() {
      var _this = this;

      this.tiles = [];
      this.meshes = [];
      this.layout = [];
      this.options = { s: 1, n: 'Level', t: 1 };
      this.spawnTiles();
      this.player = new _entitiesPlayerJs2['default']();
      this.player.addToScene(_Simplicity2['default'].scene);
      this.player.cameraFollow(_Simplicity2['default'].camera);
      this.player.mesh.visible = false;
      this.player.egh.visible = false;

      this.tileId = 1;

      this.setTile(1);

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      window.addEventListener('mousemove', function (e) {
        return _this.onMouseMove(e);
      }, false);
      window.addEventListener('mouseup', function (e) {
        return _this.onMouseUp(e);
      }, false);

      var menuBar = _Simplicity2['default'].UIManager.add('menuBar', '');
      var TileBtn = _Simplicity2['default'].UIManager.add('btn', 'Tile', menuBar);
      var GuideTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Guide', menuBar);
      var GoalTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Goal', menuBar);
      var SpikeTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Spiked', menuBar);
      var ElectricTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Electric', menuBar);
      var ButtonTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Button', menuBar);
      var FallingTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Falling', menuBar);
      var TrampolineTileBtn = _Simplicity2['default'].UIManager.add('btn', 'Trampoline', menuBar);
      var PlayBtn = _Simplicity2['default'].UIManager.add('btn', 'Play', menuBar);
      var ShareBtn = _Simplicity2['default'].UIManager.add('btn', 'Share', menuBar);
      var OptionsBtn = _Simplicity2['default'].UIManager.add('btn', 'Options', menuBar);

      TileBtn.addEventListener('mouseup', function () {
        _this.setTile(1);
      });
      GuideTileBtn.addEventListener('mouseup', function () {
        _this.setTile(2);
      });
      GoalTileBtn.addEventListener('mouseup', function () {
        _this.setTile(3);
      });
      SpikeTileBtn.addEventListener('mouseup', function () {
        _this.setTile(4);
      });
      ElectricTileBtn.addEventListener('mouseup', function () {
        _this.setTile(5);
      });
      ButtonTileBtn.addEventListener('mouseup', function () {
        _this.setTile(6);
      });
      FallingTileBtn.addEventListener('mouseup', function () {
        _this.setTile(7);
      });
      TrampolineTileBtn.addEventListener('mouseup', function () {
        _this.setTile(8);
      });
      PlayBtn.addEventListener('mouseup', function () {
        _this.play();
      });
      ShareBtn.addEventListener('mouseup', function () {
        _this.share();
      });
      OptionsBtn.addEventListener('mouseup', function () {
        _this.option();
      });
    }
  }, {
    key: 'spawnTiles',
    value: function spawnTiles() {
      if (_Simplicity2['default'].editorTiles) {

        this.tiles = _Simplicity2['default'].editorTiles;
        this.layout = _Simplicity2['default'].editorLayout;
        this.options = _Simplicity2['default'].editorOptions;
        for (var z = 0; z < this.tiles.length; z++) {
          for (var x = 0; x < this.tiles[z].length; x++) {
            this.meshes.push(this.tiles[z][x].mesh);
            this.tiles[z][x].addToScene(_Simplicity2['default'].scene);
            this.tiles[z][x].position.x = x * 200;
            this.tiles[z][x].position.z = z * 200;
          }
        }
      } else {
        for (var _z = 0; _z < 5; _z++) {
          this.tiles.push([]);
          this.layout.push([]);
          for (var _x = 0; _x < 5; _x++) {

            this.tiles[_z][_x] = new _entitiesTilesTilesJs2['default'][9]();
            this.meshes.push(this.tiles[_z][_x].mesh);
            this.tiles[_z][_x].addToScene(_Simplicity2['default'].scene);
            this.tiles[_z][_x].position.x = _x * 200;
            this.tiles[_z][_x].position.z = _z * 200;
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse.clone(), _Simplicity2['default'].camera);
      // calculate objects intersecting the picking ray
      var intersects = this.raycaster.intersectObjects(this.meshes);

      // this.meshes.forEach(function(tile) {
      //   tile.material.color.setHex(0xEEEEEE);
      // });

      if (intersects.length > 0) {
        this.place = true;
        this.tempTile.position.x = intersects[0].object.position.x;
        this.tempTile.position.z = intersects[0].object.position.z;
        this.tempTile.mesh.material.transparent = true;
        this.tempTile.mesh.material.opacity = 0.7;
      } else {
        this.place = false;

        this.tempTile.position.x = 10000;
        this.tempTile.position.z = 10000;
      }

      if (_Simplicity2['default'].keysDown[68]) {
        this.player.mesh.position.x += 10;
      }
      if (_Simplicity2['default'].keysDown[83]) {
        this.player.mesh.position.z += 10;
      }

      if (_Simplicity2['default'].keysDown[65]) {
        this.player.mesh.position.x -= 10;
      }
      if (_Simplicity2['default'].keysDown[87]) {
        this.player.mesh.position.z -= 10;
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {

      event.preventDefault();

      if (this.shareContainer) {
        if (event.target.className === 'ui') {
          _Simplicity2['default'].UIManager.remove('shareContainer');
          this.shareContainer = null;
          return;
        }
      }

      if (this.optionContainer) {
        if (event.target.className === 'ui') {
          _Simplicity2['default'].UIManager.remove('optionContainer');
          this.optionContainer = null;
          return;
        }
      }

      if (event.target.className !== 'ui') {
        return;
      }

      if (this.place && event.button === 2) {
        var z = this.tempTile.mesh.position.z / 200;
        var x = this.tempTile.mesh.position.x / 200;

        var index = this.meshes.indexOf(this.tiles[z][x]);
        if (index !== -1) {
          this.meshes.splice(index, 1);
        }

        _Simplicity2['default'].scene.remove(this.tiles[z][x].mesh);
        _Simplicity2['default'].scene.remove(this.tiles[z][x].egh);

        this.tiles[z][x] = new _entitiesTilesTilesJs2['default'][9]();
        this.tiles[z][x].mesh.position.z = this.tempTile.mesh.position.z;
        this.tiles[z][x].mesh.position.x = this.tempTile.mesh.position.x;
        this.tiles[z][x].addToScene(_Simplicity2['default'].scene);

        this.meshes.push(this.tiles[z][x].mesh);

        this.layout[z][x] = null;
      }

      if (this.place && event.button === 0) {
        var z = this.tempTile.mesh.position.z / 200;
        var x = this.tempTile.mesh.position.x / 200;

        this.tempTile.mesh.material.transparent = false;

        var index = this.meshes.indexOf(this.tiles[z][x]);
        if (index !== -1) {
          this.meshes.splice(index, 1);
        }

        _Simplicity2['default'].scene.remove(this.tiles[z][x].mesh);
        _Simplicity2['default'].scene.remove(this.tiles[z][x].egh);

        this.tiles[z][x] = this.tempTile;
        this.layout[z][x] = this.tileId;

        this.meshes.push(this.tiles[z][x].mesh);

        this.setTile(this.tileId);

        if (z === this.tiles.length - 1) {
          this.addDown();
        }

        if (x === this.tiles[z].length - 1) {
          this.addRight();
        }

        if (x === 0) {
          this.addLeft();
        }

        if (z === 0) {
          this.addUp();
        }
      }
    }
  }, {
    key: 'addRight',
    value: function addRight() {
      for (var tZ = 0; tZ < this.tiles.length; tZ++) {
        var tX = this.tiles[tZ].length;
        this.tiles[tZ][tX] = new _entitiesTilesTilesJs2['default'][9]();
        this.meshes.push(this.tiles[tZ][tX].mesh);
        this.tiles[tZ][tX].addToScene(_Simplicity2['default'].scene);
        this.tiles[tZ][tX].position.x = tX * 200;
        this.tiles[tZ][tX].position.z = tZ * 200;
      }
    }
  }, {
    key: 'addDown',
    value: function addDown() {
      this.layout.push([]);
      this.tiles.push([]);
      for (var tX = 0; tX < this.tiles[0].length; tX++) {
        var tZ = this.tiles.length - 1;
        this.tiles[tZ][tX] = new _entitiesTilesTilesJs2['default'][9]();
        this.meshes.push(this.tiles[tZ][tX].mesh);
        this.tiles[tZ][tX].addToScene(_Simplicity2['default'].scene);
        this.tiles[tZ][tX].position.x = tX * 200;
        this.tiles[tZ][tX].position.z = tZ * 200;
      }
    }
  }, {
    key: 'addLeft',
    value: function addLeft() {
      this.tiles.forEach(function (e) {
        e.forEach(function (tile) {
          tile.position.x += 200;
        });
      });

      for (var tZ = 0; tZ < this.tiles.length; tZ++) {
        this.tiles[tZ].unshift(new _entitiesTilesTilesJs2['default'][9]());
        this.layout[tZ].unshift(null);
        this.meshes.push(this.tiles[tZ][0].mesh);
        this.tiles[tZ][0].addToScene(_Simplicity2['default'].scene);
        this.tiles[tZ][0].position.x = 0 * 200;
        this.tiles[tZ][0].position.z = tZ * 200;
      }

      this.player.position.x += 200;
    }
  }, {
    key: 'addUp',
    value: function addUp() {
      this.tiles.forEach(function (e) {
        e.forEach(function (tile) {
          tile.position.z += 200;
        });
      });
      this.layout.unshift([]);
      this.tiles.unshift([]);

      for (var tX = 0; tX < this.tiles[1].length; tX++) {
        this.tiles[0][tX] = new _entitiesTilesTilesJs2['default'][9]();
        this.meshes.push(this.tiles[0][tX].mesh);
        this.tiles[0][tX].addToScene(_Simplicity2['default'].scene);
        this.tiles[0][tX].position.x = tX * 200;
      }

      this.player.position.z += 200;
    }
  }, {
    key: 'setTile',
    value: function setTile(id) {
      this.tileId = id;
      this.tempTile = new _entitiesTilesTilesJs2['default'][id]();
      this.tempTile.addToScene(_Simplicity2['default'].scene);
      this.tempTile.position.x = 10000;
      this.tempTile.position.z = 10000;
      this.place = false;
    }
  }, {
    key: 'play',
    value: function play() {

      var self = this;
      var found = false;
      var pos;

      _Simplicity2['default'].editorTiles = this.tiles;
      _Simplicity2['default'].editorLayout = this.layout;
      _Simplicity2['default'].editorOptions = this.options;

      // TODO: change this to be a spawn tile at some point
      for (var z = 0; z < this.layout.length; z++) {
        for (var x = 0; x < this.layout[z].length; x++) {
          if (this.layout[z][x] === 1) {
            pos = { x: x * 200, z: z * 200 };
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }

      var temp = (function (_Level) {
        _inherits(temp, _Level);

        function temp() {
          _classCallCheck(this, temp);

          _get(Object.getPrototypeOf(temp.prototype), 'constructor', this).call(this, self.layout);
          this.playerStart = pos;

          this.levelName = 'temp';
          this.nextLevelName = 'temp';
          this.timeBetween = self.options.t;
          this.maxSteps = self.options.s;
          this.name = self.options.n;
        }

        return temp;
      })(_Level3['default']);

      _Simplicity2['default'].StateManager.add('temp', temp);
      _Simplicity2['default'].StateManager.load('temp');
    }
  }, {
    key: 'share',
    value: function share() {
      var _this2 = this;

      if (this.shareContainer) {
        _Simplicity2['default'].UIManager.remove('shareContainer');
      }

      var level = this.encodeLevel();
      var text = 'http://rabrennie.com/Simplicity/?t=' + Date.now() + '#' + level;

      this.shareContainer = _Simplicity2['default'].UIManager.add('shareContainer', '');
      _Simplicity2['default'].UIManager.add('share', 'Send this to your friend <textarea onclick="this.focus();this.select()">' + text + '</textarea>', this.shareContainer);

      var redditLink = '//www.reddit.com/r/SimplicityGame/submit?url=' + encodeURIComponent(text);

      _Simplicity2['default'].UIManager.add('reddit', '<a href="#" onclick="window.location = \'' + redditLink + '\'"> <img src="//www.redditstatic.com/spreddit12.gif" alt="submit to reddit" border="0" /> </a>', this.shareContainer);
      var close = _Simplicity2['default'].UIManager.add('close', 'X', this.shareContainer);

      close.addEventListener('mouseup', function () {
        _Simplicity2['default'].UIManager.remove('shareContainer');
        _this2.shareContainer = null;
      });
    }
  }, {
    key: 'option',
    value: function option() {
      var _this3 = this;

      if (this.optionContainer) {
        _Simplicity2['default'].UIManager.remove('optionContainer');
      }

      this.optionContainer = _Simplicity2['default'].UIManager.add('optionContainer', '');
      var close = _Simplicity2['default'].UIManager.add('close', 'X', this.optionContainer);
      var name = _Simplicity2['default'].UIManager.add('name', 'Name: <input type="text" value="' + this.options.n + '" />', this.optionContainer);
      var steps = _Simplicity2['default'].UIManager.add('steps', 'Steps:  <input type="text" value="' + this.options.s + '" />', this.optionContainer);
      var time = _Simplicity2['default'].UIManager.add('time', 'Time: <input type="text" value="' + this.options.t + '" />', this.optionContainer);
      var saveBtn = _Simplicity2['default'].UIManager.add('saveBtn', 'Save', this.optionContainer);

      close.addEventListener('mouseup', function () {
        _Simplicity2['default'].UIManager.remove('optionContainer');
        _this3.optionContainer = null;
      });

      saveBtn.addEventListener('mouseup', function () {
        _this3.options.n = name.childNodes[1].value;
        _this3.options.s = parseInt(steps.childNodes[1].value);
        _this3.options.t = parseInt(time.childNodes[1].value);
        _Simplicity2['default'].UIManager.remove('optionContainer');
        _this3.optionContainer = null;
      });
    }
  }, {
    key: 'encodeLevel',
    value: function encodeLevel() {
      var levelString = '';

      var length = 0;

      for (var z = 0; z < this.layout.length; z++) {
        if (this.layout[z].length > length) {
          length = this.layout[z].length;
        }
      }

      for (z = 0; z < this.layout.length; z++) {
        for (var x = 0; x < length; x++) {
          if (this.layout[z][x] === null || !this.layout[z][x]) {
            levelString += 0;
          } else {
            levelString += this.layout[z][x];
          }
        }
      }

      var level = { w: length, h: this.layout.length, m: levelString };

      level.s = this.options.s;
      level.n = this.options.n;
      level.t = this.options.t;

      var base64 = btoa(JSON.stringify(level));

      return base64;
    }
  }]);

  return LevelEditor;
})(_State3['default']);

exports['default'] = LevelEditor;
module.exports = exports['default'];

},{"../Simplicity":1,"../entities/Player.js":3,"../entities/tiles/Tiles.js":12,"./Level":16,"./State":19}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Simplicity = require('../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Level2 = require('./Level');

var _Level3 = _interopRequireDefault(_Level2);

var SharedLevel = (function (_State) {
  _inherits(SharedLevel, _State);

  function SharedLevel() {
    _classCallCheck(this, SharedLevel);

    _get(Object.getPrototypeOf(SharedLevel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SharedLevel, [{
    key: 'create',
    value: function create() {

      var hash = _Simplicity2['default'].hash;
      var level = JSON.parse(atob(hash));

      var layout = [];

      // puts layout back into array
      for (var h = 0; h < level.h; h++) {
        layout.push([]);
        for (var w = 0; w < level.w; w++) {
          layout[h].push(parseInt(level.m.charAt(h * level.w + w)));
        }
      }

      var pos = {};
      var found;

      // look for first normal tile.
      // TODO: make this look for a starting tile
      for (var z = 0; z < layout.length; z++) {
        for (var x = 0; x < layout[z].length; x++) {
          if (layout[z][x] === 1) {
            pos = { x: x * 200, z: z * 200 };
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }

      // use localstorage to save shared levels the player has played
      var levels = JSON.parse(localStorage.getItem('levels'));

      if (!levels) {
        levels = [];
      }

      found = false;

      for (var i = 0; i < levels.length; i++) {
        if (levels[i] === hash) {
          found = true;
          break;
        }
      }

      if (!found) {
        levels.push(hash);

        localStorage.setItem('levels', JSON.stringify(levels));
      }

      // make a new temp level class

      var temp = (function (_Level) {
        _inherits(temp, _Level);

        function temp() {
          _classCallCheck(this, temp);

          _get(Object.getPrototypeOf(temp.prototype), 'constructor', this).call(this, layout);
          this.playerStart = pos;

          this.levelName = 'temp';
          this.nextLevelName = 'temp';
          this.timeBetween = level.t;
          this.maxSteps = level.s;
          this.name = level.n;
        }

        // add the temp level to the state manager and load it
        return temp;
      })(_Level3['default']);

      _Simplicity2['default'].StateManager.add('temp', temp);
      _Simplicity2['default'].StateManager.load('temp');
    }
  }]);

  return SharedLevel;
})(_State3['default']);

exports['default'] = SharedLevel;
module.exports = exports['default'];

},{"../Simplicity":1,"./Level":16,"./State":19}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Simplicity = require('../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var State = (function () {
  function State() {
    _classCallCheck(this, State);
  }

  _createClass(State, [{
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      _Simplicity2['default'].clear();
    }
  }]);

  return State;
})();

exports['default'] = State;
module.exports = exports['default'];

},{"../Simplicity":1}],20:[function(require,module,exports){
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
    this.doLoop = true;
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

      if (this.currentState.state) {
        this.currentState.state.destroy();
      }

      this.scene = new THREE.Scene();
      var state = new this.states[name]();
      this.currentState = { name: name, state: state };

      state.preload();
      state.create();
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

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _LevelJs = require('../Level.js');

var _LevelJs2 = _interopRequireDefault(_LevelJs);

var LevelOne = (function (_Level) {
  _inherits(LevelOne, _Level);

  function LevelOne() {
    _classCallCheck(this, LevelOne);

    _get(Object.getPrototypeOf(LevelOne.prototype), 'constructor', this).call(this);
  }

  return LevelOne;
})(_LevelJs2['default']);

exports['default'] = LevelOne;
module.exports = exports['default'];

},{"../Level.js":16}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _LevelOne = require('./LevelOne');

var _LevelOne2 = _interopRequireDefault(_LevelOne);

var Levels = {
  'Level One': _LevelOne2['default']
};

exports['default'] = Levels;
module.exports = exports['default'];

},{"./LevelOne":21}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Simplicity = require('../../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _State2 = require('../State');

var _State3 = _interopRequireDefault(_State2);

var MainMenu = (function (_State) {
  _inherits(MainMenu, _State);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    _get(Object.getPrototypeOf(MainMenu.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MainMenu, [{
    key: 'create',
    value: function create() {
      var menuContainer = _Simplicity2['default'].UIManager.add('menuContainer', '');
      var recentBtn = _Simplicity2['default'].UIManager.add('recentBtn', 'Play Recent', menuContainer);
      var playBtn = _Simplicity2['default'].UIManager.add('playBtn', 'Play', menuContainer);
      var levelEditBtn = _Simplicity2['default'].UIManager.add('levelEditBtn', 'Level Editor', menuContainer);
      _Simplicity2['default'].UIManager.add('title', 'Simplicity', menuContainer);

      recentBtn.addEventListener('mouseup', function () {
        _Simplicity2['default'].StateManager.load('RecentMenu');
      });

      playBtn.addEventListener('mouseup', function () {
        _Simplicity2['default'].StateManager.load('PlayMenu');
      });

      levelEditBtn.addEventListener('mouseup', function () {
        _Simplicity2['default'].StateManager.load('LevelEditor');
      });
    }
  }]);

  return MainMenu;
})(_State3['default']);

exports['default'] = MainMenu;
module.exports = exports['default'];

},{"../../Simplicity":1,"../State":19}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Simplicity = require('../../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _State2 = require('../State');

var _State3 = _interopRequireDefault(_State2);

var _levelsLevels = require('../levels/Levels');

var _levelsLevels2 = _interopRequireDefault(_levelsLevels);

var PlayMenu = (function (_State) {
  _inherits(PlayMenu, _State);

  function PlayMenu() {
    _classCallCheck(this, PlayMenu);

    _get(Object.getPrototypeOf(PlayMenu.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PlayMenu, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var menuContainer = _Simplicity2['default'].UIManager.add('menuContainer', '');
      _Simplicity2['default'].UIManager.add('title', 'Levels', menuContainer);
      var list = _Simplicity2['default'].UIManager.add('list', '', menuContainer);
      var backBtn = _Simplicity2['default'].UIManager.add('backBtn', 'Back', menuContainer);

      backBtn.addEventListener('mouseup', function () {
        _Simplicity2['default'].StateManager.load('MainMenu');
      });

      for (var level in _levelsLevels2['default']) {
        if (_levelsLevels2['default'].hasOwnProperty(level)) {
          var levelElem = _Simplicity2['default'].UIManager.add(level, '', list);
          _Simplicity2['default'].UIManager.add('name', level, levelElem);
          var playBtn = _Simplicity2['default'].UIManager.add('play', '', levelElem);

          levelElem.className += ' item';

          playBtn.addEventListener('mouseup', function () {
            console.log(level);
            _this.play(level, _levelsLevels2['default'][level]);
          });
        }
      }
    }
  }, {
    key: 'play',
    value: function play(levelName, level) {
      console.log(levelName, level);
      _Simplicity2['default'].StateManager.add(levelName, level);
      _Simplicity2['default'].StateManager.load(levelName);
    }
  }]);

  return PlayMenu;
})(_State3['default']);

exports['default'] = PlayMenu;
module.exports = exports['default'];

},{"../../Simplicity":1,"../State":19,"../levels/Levels":22}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Simplicity = require('../../Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _State2 = require('../State');

var _State3 = _interopRequireDefault(_State2);

var RecentMenu = (function (_State) {
  _inherits(RecentMenu, _State);

  function RecentMenu() {
    _classCallCheck(this, RecentMenu);

    _get(Object.getPrototypeOf(RecentMenu.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RecentMenu, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var menuContainer = _Simplicity2['default'].UIManager.add('menuContainer', '');
      _Simplicity2['default'].UIManager.add('title', 'Recently Played', menuContainer);
      var list = _Simplicity2['default'].UIManager.add('list', '', menuContainer);
      var backBtn = _Simplicity2['default'].UIManager.add('backBtn', 'Back', menuContainer);

      backBtn.addEventListener('mouseup', function () {
        _Simplicity2['default'].StateManager.load('MainMenu');
      });

      var levels = JSON.parse(window.localStorage.levels);
      levels.forEach(function (level) {
        var levelElem = _Simplicity2['default'].UIManager.add(level, '', list);
        _Simplicity2['default'].UIManager.add('name', JSON.parse(atob(level)).n, levelElem);
        var playBtn = _Simplicity2['default'].UIManager.add('play', '', levelElem);

        levelElem.className += ' item';

        playBtn.addEventListener('mouseup', function () {
          _this.play(level);
        });
      });
    }
  }, {
    key: 'play',
    value: function play(level) {
      _Simplicity2['default'].hash = level;
      _Simplicity2['default'].StateManager.load('SharedLevel');
    }
  }]);

  return RecentMenu;
})(_State3['default']);

exports['default'] = RecentMenu;
module.exports = exports['default'];

},{"../../Simplicity":1,"../State":19}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UIManager = (function () {
  function UIManager() {
    _classCallCheck(this, UIManager);

    this.elems = {};
    this.wrapper = document.getElementsByClassName('ui')[0];
  }

  _createClass(UIManager, [{
    key: 'add',
    value: function add(name, html, parent) {
      var div = document.createElement('div');
      if (parent) {
        parent.appendChild(div);
      } else {
        this.wrapper.appendChild(div);
      }
      div.innerHTML = html;
      div.className = name;
      this.elems[name] = div;

      return div;
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.elems[name];
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      this.get(name).remove();
    }
  }, {
    key: 'update',
    value: function update(name, html) {
      this.get(name).innerHTML = html;
    }
  }, {
    key: 'clear',
    value: function clear() {
      for (var elem in this.elems) {
        if (this.elems.hasOwnProperty(elem)) {
          this.get(elem).remove();
        }
      }
    }
  }]);

  return UIManager;
})();

exports['default'] = UIManager;
module.exports = exports['default'];

},{}]},{},[14])
//# sourceMappingURL=game.js.map
