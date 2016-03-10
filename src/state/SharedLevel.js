import Simplicity from '../Simplicity';
import State from './State';
import Level from './Level';

class SharedLevel extends State {
  create() {

    const hash = window.location.hash.substring(1)
    const level = JSON.parse(atob(hash));

    var layout = [];

    for (var h = 0; h < level.h; h++) {
      layout.push([]);
      for (var w = 0; w < level.w; w++) {
        layout[h].push(parseInt(level.m.charAt((h*level.w)+w)));
      }
    }

    console.log(layout)

    var pos = {};
    var found;

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

    console.log(pos)

    class temp extends Level {
      constructor() {
        super(layout);
        console.log(layout)
        this.playerStart = pos;

        this.levelName = 'temp';
        this.nextLevelName = 'temp';
      }
    }
    Simplicity.StateManager.add('temp', temp);
    Simplicity.StateManager.load('temp');

    return false;
  }


}

export default SharedLevel;
