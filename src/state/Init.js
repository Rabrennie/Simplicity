import State from './State';
import Simplicity from '../Simplicity';

class Init extends State {
  preload() {
    var loader = new THREE.JSONLoader();
    loader.load('./assets/test.json', function(geometry) {
      Simplicity.models.spikes = geometry;
      if(window.location.hash) {
        Simplicity.StateManager.load('SharedLevel');
      } else {
        Simplicity.StateManager.load('MainMenu');

      }
    });

  }
}

export default Init;
