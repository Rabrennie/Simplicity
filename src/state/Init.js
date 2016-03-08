import State from './State';
import Simplicity from '../Simplicity';

class Init extends State {
  preload() {
    var loader = new THREE.JSONLoader();
    loader.load('./assets/test.json', function(geometry) {
      Simplicity.models.spikes = geometry;
      Simplicity.StateManager.load('test');
    });

  }
}

export default Init;
