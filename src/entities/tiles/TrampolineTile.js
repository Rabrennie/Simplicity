import Tile from '../Tile.js';


// TODO: Find a better way to represent the tile
class TrampolineTile extends Tile {
  constructor() {
    super(new THREE.MeshBasicMaterial({ color: 0xCCFFFF }));

    this.afterCallback = (level) => {

      if(level.player.lastDirection === 'down') {
        level.player.trampolineDownAnim();
      }

      if(level.player.lastDirection === 'up') {
        level.player.trampolineUpAnim();
      }

      if(level.player.lastDirection === 'left') {
        level.player.trampolineLeftAnim();
      }

      if(level.player.lastDirection === 'right') {
        level.player.trampolineRightAnim();
      }

    }
  }
}

export default TrampolineTile;
