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

Simplicity.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 20000);
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

},{"./state/StateManager":13,"./ui/UIManager":14}],2:[function(require,module,exports){
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
    material = new THREE.MeshBasicMaterial({ color: 0xEEEEEE });

var Tile = (function (_Entity) {
  _inherits(Tile, _Entity);

  function Tile(newMaterial) {
    _classCallCheck(this, Tile);

    if (newMaterial) {
      _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, geometry, newMaterial);
    } else {
      _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, geometry, material);
    }

    this.mesh.position.y = -150;

    this.nextTriggered = false;
    this.afterTriggered = false;
    this.beforeTriggered = false;

    this.nextCallback = function () {};
    this.beforeCallback = function () {};
    this.afterCallback = function () {};
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

},{"../Tile.js":4}],6:[function(require,module,exports){
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

},{"../Tile.js":4,"Simplicity":1}],8:[function(require,module,exports){
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

var _SpikeTile = require('./SpikeTile');

var _SpikeTile2 = _interopRequireDefault(_SpikeTile);

var Tiles = {
  1: _Tile2['default'],
  2: _GuideTile2['default'],
  3: _GoalTile2['default'],
  4: _SpikeTile2['default']

};

exports['default'] = Tiles;
module.exports = exports['default'];

},{"../Tile":4,"./GoalTile":5,"./GuideTile":6,"./SpikeTile":7}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Simplicity = require('Simplicity');

var _Simplicity2 = _interopRequireDefault(_Simplicity);

var _stateLevel = require('./state/Level');

var _stateLevel2 = _interopRequireDefault(_stateLevel);

var _stateInit = require('./state/Init');

var _stateInit2 = _interopRequireDefault(_stateInit);

_Simplicity2['default'].StateManager.add('test', _stateLevel2['default']);
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
  _Simplicity2['default'].StateManager.loop();
  _Simplicity2['default'].renderer.render(_Simplicity2['default'].scene, _Simplicity2['default'].camera);
}

},{"./state/Init":10,"./state/Level":11,"Simplicity":1}],10:[function(require,module,exports){
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
        _Simplicity2['default'].StateManager.load('test');
      });
    }
  }]);

  return Init;
})(_State3['default']);

exports['default'] = Init;
module.exports = exports['default'];

},{"../Simplicity":1,"./State":12}],11:[function(require,module,exports){
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

  function Level() {
    _classCallCheck(this, Level);

    _get(Object.getPrototypeOf(Level.prototype), 'constructor', this).call(this);
    this.layout = [[1, 2, 4], [4, 2, 1], [0, 2, 0], [1, 2, 4], [1, 3, 4]];
    this.tiles = [];
    this.levelName = 'test';
    this.nextLevelName = 'test';
  }

  _createClass(Level, [{
    key: 'create',
    value: function create() {
      this.player = new _entitiesPlayerJs2['default']();
      this.player.addToScene(_Simplicity2['default'].scene);
      this.player.cameraFollow(_Simplicity2['default'].camera);

      this.timeBetween = 2;
      _Simplicity2['default'].UIManager.add('timer', this.timeBetween);

      this.maxSteps = 10;
      this.curSteps = 0;
      _Simplicity2['default'].UIManager.add('counter', this.curSteps + ' / ' + this.maxSteps);

      this.spikeTiles = [];

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
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {

      if (this.moved) {
        this.onStep();
      }

      this.afterTrigger();

      if (_Simplicity2['default'].keysDown[82]) {
        this.reset();
      }

      if (_Simplicity2['default'].keysDown[32] && this.won) {
        this.reset();
      }

      if (!this.player.tweening) {
        this.moved = false;
        if (_Simplicity2['default'].keysDown[68]) {
          this.beforeTrigger(this.player.tileZ, this.player.tileX + 1);
          this.player.move('right');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[83]) {
          this.beforeTrigger(this.player.tileZ + 1, this.player.tileX);
          this.player.move('down');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[65]) {
          this.beforeTrigger(this.player.tileZ, this.player.tileX - 1);
          this.player.move('left');
          this.moved = true;
        } else if (_Simplicity2['default'].keysDown[87]) {
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
      var _this3 = this;

      this.curSteps += 1;
      this.moved = false;

      this.spikeTiles.forEach(function (tile) {
        tile.switchActive();
      });

      var percentageLeft = 1 - this.curSteps / this.maxSteps;
      var color = 0xFFFFFF;

      if (percentageLeft < 0.1) {
        color = 0xFF0000;
      } else if (percentageLeft <= 0.5) {
        color = 0xfff200;
      }

      this.player.material.color.setHex(color);

      _Simplicity2['default'].UIManager.update('counter', this.curSteps + ' / ' + this.maxSteps);

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
  }]);

  return Level;
})(_State3['default']);

exports['default'] = Level;
module.exports = exports['default'];

},{"../Simplicity":1,"../entities/Player.js":3,"../entities/tiles/Tiles.js":8,"./State":12}],12:[function(require,module,exports){
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

},{"../Simplicity":1}],13:[function(require,module,exports){
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

      if (this.currentState.state) {
        this.currentState.state.destroy();
      }

      this.scene = new THREE.Scene();
      var state = new this.states[name]();

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

},{}],14:[function(require,module,exports){
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

},{}]},{},[9])
//# sourceMappingURL=game.js.map
