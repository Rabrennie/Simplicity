import StateManager from './state/StateManager';
import UIManager from './ui/UIManager';

const Simplicity = {};

var supportsWebGL = (function() { try { return !! window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })();

Simplicity.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 5000);
Simplicity.renderer = supportsWebGL? new THREE.WebGLRenderer({ antialias: true }): new THREE.CanvasRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new StateManager();
Simplicity.UIManager = new UIManager();
Simplicity.models = {};
Simplicity.clear = ()=> {
  Simplicity.UIManager.clear();
}

Simplicity.sound = {
  move: new Howl({
    urls: ['./assets/sounds/move.wav']
  })
}

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1500;
Simplicity.camera.position.y = 1000;
Simplicity.renderer.setClearColor(0x161616, 1);
Simplicity.renderer.domElement.id = 'renderer';
Object.defineProperties(Simplicity, {
  scene: { get: function() { return this.StateManager.scene; } } // eslint-disable-line object-shorthand
});

document.body.appendChild(Simplicity.renderer.domElement);

window.addEventListener('keydown', (e) => {
  Simplicity.keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', (e) => {
  delete Simplicity.keysDown[e.keyCode];
});

Simplicity.hash = null;


export default Simplicity;
