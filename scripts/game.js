(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesBootState = require('states/BootState');

var _statesBootState2 = _interopRequireDefault(_statesBootState);

var _statesLevel1 = require('states/Level1');

var _statesLevel12 = _interopRequireDefault(_statesLevel1);

var Game = (function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, 800, 400, Phaser.AUTO, 'content', null, true, false);
    this.state.add('BootState', _statesBootState2['default'], false);
    this.state.add('Level', _statesLevel12['default'], false);
    this.state.start('BootState');
  }

  return Game;
})(Phaser.Game);

new Game();

},{"states/BootState":3,"states/Level1":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var SpeechBubble = function SpeechBubble(game, x, y, width, text) {
  // from http://jsfiddle.net/lewster32/81pzgs4z/

  Phaser.Sprite.call(this, game, x, y);

  // Some sensible minimum defaults
  width = width || 27;
  var height = 18;

  // Set up our text and run our custom wrapping routine on it
  this.bitmapText = game.make.bitmapText(x + 12, y + 4, 'prstart', text, 12);
  SpeechBubble.wrapBitmapText(this.bitmapText, width);

  // Calculate the width and height needed for the edges
  var bounds = this.bitmapText.getLocalBounds();
  if (bounds.width + 18 > width) {
    width = bounds.width + 18;
  }
  if (bounds.height + 14 > height) {
    height = bounds.height + 14;
  }

  // Create all of our corners and edges
  this.borders = [game.make.tileSprite(x + 9, y + 9, width - 9, height - 9, 'bubble-border', 4), game.make.image(x, y, 'bubble-border', 0), game.make.image(x + width, y, 'bubble-border', 2), game.make.image(x + width, y + height, 'bubble-border', 8), game.make.image(x, y + height, 'bubble-border', 6), game.make.tileSprite(x + 9, y, width - 9, 9, 'bubble-border', 1), game.make.tileSprite(x + 9, y + height, width - 9, 9, 'bubble-border', 7), game.make.tileSprite(x, y + 9, 9, height - 9, 'bubble-border', 3), game.make.tileSprite(x + width, y + 9, 9, height - 9, 'bubble-border', 5)];

  // Add all of the above to this sprite
  for (var b = 0, len = this.borders.length; b < len; b++) {
    this.addChild(this.borders[b]);
  }

  // Add the tail
  this.tail = this.addChild(game.make.image(x + 18, y + 3 + height, 'bubble-tail'));

  // Add our text last so it's on top
  this.addChild(this.bitmapText);
  this.bitmapText.tint = 0x111111;

  // Offset the position to be centered on the end of the tail
  this.pivot.set(x + 25, y + height + 24);
};

SpeechBubble.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBubble.prototype.constructor = SpeechBubble;

SpeechBubble.wrapBitmapText = function (bitmapText, maxWidth) {
  var words = bitmapText.text.split(' '),
      output = '',
      test = '';

  for (var w = 0, len = words.length; w < len; w++) {
    test += words[w] + ' ';
    bitmapText.text = test;
    bitmapText.updateText();
    if (bitmapText.textWidth > maxWidth) {
      output += '\n' + words[w] + ' ';
    } else {
      output += words[w] + ' ';
    }
    test = output;
  }

  output = output.replace(/(\s)$/gm, ' '); // remove trailing spaces
  bitmapText.text = output;
  bitmapText.updateText();
};

exports['default'] = SpeechBubble;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = (function (_Phaser$State) {
  _inherits(BootState, _Phaser$State);

  function BootState() {
    _classCallCheck(this, BootState);

    _get(Object.getPrototypeOf(BootState.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(BootState, [{
    key: 'preload',
    value: function preload() {

      this.game.load.image('tile', './assets/tile.png');
      this.game.load.image('cube', './assets/cube.png');
      this.game.time.advancedTiming = true;
      this.game.world.setBounds(0, 0, 2048, 1024);
      // Add and enable the plug-in.
      this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));

      // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
      // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
      this.game.iso.anchor.setTo(0.5, 0);

      this.game.load.spritesheet('bubble-border', './assets/bubble-border.png', 9, 9);
      this.game.load.image('bubble-tail', './assets/bubble-tail.png');
      this.game.load.bitmapFont('prstart', './assets/prstart.png', './assets/prstart.fnt');

      this.game.failureStrings = ['Did you read the instructions?', 'Good job', 'Great work', 'Thanks a lot', 'Oh S***', 'F YOU', 'Oh dear, I\'m dead'];
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.state.start('Level');
    }
  }]);

  return BootState;
})(Phaser.State);

exports['default'] = BootState;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsSpeechBubble = require('../objects/SpeechBubble');

var _objectsSpeechBubble2 = _interopRequireDefault(_objectsSpeechBubble);

var Level = (function (_Phaser$State) {
  _inherits(Level, _Phaser$State);

  function Level() {
    _classCallCheck(this, Level);

    _get(Object.getPrototypeOf(Level.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Level, [{
    key: 'preload',
    value: function preload() {
      this.layout = [[2, 2, 2, 2, 2, 4, 1], [0, 0, 0, 0, 2, 0, 4], [0, 0, 0, 0, 2, 0, 4], [0, 0, 0, 0, 2, 1, 4], [0, 0, 0, 0, 3, 1, 0]];
    }
  }, {
    key: 'create',
    value: function create() {
      this.isoGroup = this.game.add.group();

      this.canPlay = false;
      this.winTriggered = false;
      this.dead = false;
      this.steps = 8;
      this.stepcount = 0;
      this.timer = 2;
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.hasStepped = false;
      this.timerStarted = false;
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR]);

      this.offset = 200;

      this.bubble = this.game.world.add(new _objectsSpeechBubble2['default'](this.game, 180, 190, 200, 'Get me to the green tile'));
      this.game.camera.x = 624;
      this.game.camera.y = 0;

      this.spawnTiles();
      this.spawnPlayer();
    }
  }, {
    key: 'update',
    value: function update() {

      if (!this.game.tweens.isTweening(this.bubble)) {
        this.game.add.tween(this.bubble).to({ x: this.player.x, y: this.player.y - 19 }, 140, Phaser.Easing.Linear.None, true);
      }

      if (!this.game.tweens.isTweening(this.player) && this.canPlay) {

        if (this.hasStepped && !this.timerStarted) {
          this.timerStarted = true;
          this.timerLoop = this.game.time.events.loop(100, function () {
            this.timer -= 0.1;
            if (this.timer < 0) {
              this.game.time.events.remove(this.timerLoop);
              this.canPlay = false;
              this.changeLevel('Level');
            }
          }, this);
        }
        var currentTileX = (this.player.isoX - this.offset) / 38;
        var currentTileY = (this.player.isoY - this.offset) / 38;

        var tintTile = (function (tileX, tileY, tint) {
          if (this.tiles[tileY][tileX].tint !== tint) {
            this.tiles[tileY][tileX].tint = tint;
          }
        }).bind(this);

        if (this.checkTile(currentTileX, currentTileY) === 2) {
          tintTile(currentTileX, currentTileY, 0x86bfda);
        }
        if (this.checkTile(currentTileX - 1, currentTileY) === 2) {
          tintTile(currentTileX - 1, currentTileY, 0x86bfda);
        }
        if (this.checkTile(currentTileX + 1, currentTileY) === 2) {
          tintTile(currentTileX + 1, currentTileY, 0x86bfda);
        }
        if (this.checkTile(currentTileX, currentTileY + 1) === 2) {
          tintTile(currentTileX, currentTileY + 1, 0x86bfda);
        }
        if (this.checkTile(currentTileX, currentTileY - 1) === 2) {
          tintTile(currentTileX, currentTileY - 1, 0x86bfda);
        }

        var nextPosX = this.player.isoX,
            nextPosY = this.player.isoY,
            moved = false;

        if (this.cursors.down.isDown) {
          nextPosX = this.player.isoX + 38;
          nextPosY = this.player.isoY;
          moved = true;
        } else if (this.cursors.up.isDown) {
          nextPosX = this.player.isoX - 38;
          nextPosY = this.player.isoY;
          moved = true;
        } else if (this.cursors.right.isDown) {
          nextPosX = this.player.isoX;
          nextPosY = this.player.isoY - 38;
          moved = true;
        } else if (this.cursors.left.isDown) {
          nextPosX = this.player.isoX;
          nextPosY = this.player.isoY + 38;
          moved = true;
        }

        if (this.checkTile(currentTileX, currentTileY) === 0) {
          this.game.iso.simpleSort(this.isoGroup);
          moved = false;
          if (!this.dead) {
            this.changeBubble(this.game.failureStrings[Math.floor(Math.random() * this.game.failureStrings.length)]);

            this.game.time.events.add(300, function () {
              this.changeLevel('Level');
              this.dropSprite(this.player, 200, -500, (function () {
                this.canPlay = true;
              }).bind(this));
            }, this);

            this.game.time.events.remove(this.timerLoop);
            this.dead = true;
          }
        } else if (this.checkTile(currentTileX, currentTileY) === 3) {
          if (!this.winTriggered) {
            this.game.time.events.remove(this.timerLoop);
            this.complete();
          }
          moved = false;
        }

        var origNextX = nextPosX;
        var origNextY = nextPosY;

        while (this.checkTile((nextPosX - this.offset) / 38, (nextPosY - this.offset) / 38) === 4 && moved) {
          nextPosX = origNextX + nextPosX - this.player.isoX;
          nextPosY = origNextY + nextPosY - this.player.isoY;
        }

        if (moved) {
          this.hasStepped = true;
          this.stepcount++;
          this.timer = 2.1;
          this.game.add.tween(this.player).to({ isoX: nextPosX, isoY: nextPosY }, 200, Phaser.Easing.Quadratic.InOut, true);
          if (this.stepcount > this.steps) {
            this.game.time.events.remove(this.timerLoop);
            this.canPlay = false;
            this.game.time.events.add(500, function () {
              this.changeBubble('Too many steps :(');
              this.changeLevel('Level');
            }, this);
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.game.debug.text(this.game.time.fps || '--', 2, 14, '#a7aebe');
      this.game.debug.text(this.stepcount + ' / ' + this.steps, 2, 42, '#a7aebe');
      this.game.debug.text(Math.round(this.timer * 10) / 10, 2, 28, '#a7aebe');
    }
  }, {
    key: 'spawnTiles',
    value: function spawnTiles() {
      this.tiles = [];
      var count = 0;
      this.layout.forEach(function (a) {
        count += a.length;
      });
      var tilesFalling = Math.round(count * 0.2);

      this.delay = 0;
      var goalTile = null;

      for (var y = 0; y < this.layout.length; y++) {
        this.tiles.push([]);
        for (var x = 0; x < this.layout[y].length; x++) {
          // Create a tile using the new game.add.isoSprite factory method at the specified position.
          // The last parameter is the group you want to add it to (just like game.add.sprite)
          if (this.layout[y][x] > 0) {
            this.tiles[y][x] = this.game.add.isoSprite(x * 38 + this.offset, y * 38 + this.offset, 500, 'tile', 0, this.isoGroup);
            this.tiles[y][x].anchor.set(0.5, 0);
            this.delay = y * 200;
            console.log(y * x % tilesFalling);
            if (this.layout[y][x] !== 3) {
              this.dropSprite(this.tiles[y][x], this.delay, 0);
            }
          }
          // if(this.layout[y][x] === 2) {
          //   // this.tiles[y][x].tint = 0x86bfda;
          //
          // }
          if (this.layout[y][x] === 3) {
            goalTile = this.tiles[y][x];
            this.tiles[y][x].tint = 0x00FF00;
            this.dropSprite(goalTile, this.layout.length * 200 + 500, 0);
          }
          if (this.layout[y][x] === 4) {
            goalTile = this.tiles[y][x];
            this.tiles[y][x].tint = 0xA5F2F3;
          }
        }
      }
    }
  }, {
    key: 'spawnPlayer',
    value: function spawnPlayer() {
      this.player = this.game.add.isoSprite(this.offset, this.offset, 500, 'cube', 0, this.isoGroup);
      this.player.tint = 0x86bfda;
      this.player.anchor.set(0.5);
      this.bubble.x = this.player.x;
      this.bubble.y = this.player.y;
      this.dropSprite(this.player, this.delay + 500, 0, (function () {
        this.canPlay = true;this.game.camera.follow(this.player);
      }).bind(this));
    }
  }, {
    key: 'checkTile',
    value: function checkTile(x, y) {
      if (x < 0 || y < 0) {
        return 0;
      }

      if (this.layout[y] !== undefined) {
        if (this.layout[y][x] === undefined) {
          return 0;
        }
      } else {
        return 0;
      }
      return this.layout[y][x];
    }
  }, {
    key: 'changeBubble',
    value: function changeBubble(text) {
      this.bubble.kill();
      this.bubble = this.game.world.add(new _objectsSpeechBubble2['default'](this.game, 180, 190, 200, text));
      this.bubble.x = this.player.x;
      this.bubble.y = this.player.y;
    }
  }, {
    key: 'complete',
    value: function complete() {
      this.changeBubble('WE WON');

      this.changeLevel('Level');

      this.winTriggered = true;
    }
  }, {
    key: 'changeLevel',
    value: function changeLevel(level) {

      this.game.camera.follow(null);

      var delay = 0;
      var goalTile;
      var isOnGoal;
      for (var y = 0; y < this.layout.length; y++) {
        for (var x = 0; x < this.layout[y].length; x++) {
          if (this.layout[y][x] > 0) {
            if (this.layout[y][x] !== 3) {
              delay = y * 200;
              this.dropSprite(this.tiles[y][x], delay, -500);
              if ((this.player.isoX - this.offset) / 38 === x && (this.player.isoY - this.offset) / 38 === y) {
                this.canPlay = false;
                this.dropSprite(this.player, delay + 500, -500);
              }
            } else {
              goalTile = this.tiles[y][x];
              if ((this.player.isoX - this.offset) / 38 === x && (this.player.isoY - this.offset) / 38 === y) {
                isOnGoal = true;
              }
            }
          }
        }
      }
      delay += 500;
      this.dropSprite(goalTile, delay, -500);

      if (isOnGoal) {
        this.canPlay = false;
        this.dropSprite(this.player, delay + 500, -500);
      }

      this.game.time.events.add(delay + 1000, function () {
        this.game.world.removeAll();
        this.game.state.start(level, false, true);
      }, this);
    }
  }, {
    key: 'dropSprite',
    value: function dropSprite(sprite, delay, to, cb) {
      this.game.time.events.add(delay, function () {
        this.game.add.tween(sprite).to({ isoZ: to }, 150, Phaser.Easing.Linear.None, true);
        if (cb) {
          cb();
        }
      }, this);
    }
  }]);

  return Level;
})(Phaser.State);

exports['default'] = Level;
module.exports = exports['default'];

},{"../objects/SpeechBubble":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Level2 = require('./Level');

var _Level3 = _interopRequireDefault(_Level2);

var Level1 = (function (_Level) {
  _inherits(Level1, _Level);

  function Level1() {
    _classCallCheck(this, Level1);

    _get(Object.getPrototypeOf(Level1.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Level1, [{
    key: 'preload',
    value: function preload() {
      _get(Object.getPrototypeOf(Level1.prototype), 'preload', this).call(this);
      this.layout = [[2, 2, 2, 2, 2, 4, 1], [1, 1, 1, 1, 2, 1, 4], [1, 1, 1, 1, 2, 1, 4], [1, 1, 1, 1, 2, 1, 4], [1, 1, 1, 1, 3, 1, 1], [1, 1, 1, 1, 4, 1, 1], [1, 1, 1, 1, 4, 1, 1], [1, 1, 1, 1, 4, 1, 1], [1, 1, 1, 1, 4, 1, 1]];
    }
  }]);

  return Level1;
})(_Level3['default']);

exports['default'] = Level1;
module.exports = exports['default'];

},{"./Level":4}]},{},[1])
//# sourceMappingURL=game.js.map
