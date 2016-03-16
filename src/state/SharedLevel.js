import Simplicity from '../Simplicity';
import State from './State';
import Level from './Level';

class SharedLevel extends State {
  create() {

    const hash = Simplicity.hash;
    var level = JSON.parse(atob(hash));

    var layout = [];

    // puts layout back into array
    for (var h = 0; h < level.h; h++) {
      layout.push([]);
      for (var w = 0; w < level.w; w++) {
        layout[h].push(parseInt(level.m.charAt((h*level.w)+w)));
      }
    }


    var pos = {};
    var found;

    // look for first normal tile.
    // TODO: make this look for a starting tile
    for (var z = 0; z < layout.length; z++) {
      for (var x = 0; x < layout[z].length; x++) {
        if(layout[z][x] === 1) {
          pos = { x:x*200, z:z*200 };
          found = true;
          break;
        }
      }
      if(found) {
        break;
      }
    }

    // use localstorage to save shared levels the player has played
    let levels = JSON.parse(localStorage.getItem('levels'));

    if(!levels) {
      levels = [];
    }

    found = false;

    for (var i = 0; i < levels.length; i++) {
      if(levels[i] === hash) {
        found = true;
        break;
      }
    }

    if(!found) {
      levels.push(hash);

      localStorage.setItem('levels', JSON.stringify(levels));
    }


    // make a new temp level class
    class temp extends Level {z
      constructor() {
        super(layout);
        this.playerStart = pos;

        this.levelName = 'temp';
        this.nextLevelName = 'temp';
        this.timeBetween = level.t;
        this.maxSteps = level.s;
        this.name = level.n;
      }
    }

    // add the temp level to the state manager and load it
    Simplicity.StateManager.add('temp', temp);
    Simplicity.StateManager.load('temp');

  }


}

export default SharedLevel;
