import StateManager from './state/StateManager';

const Simplicity = {};

var supportsWebGL = (function() { try { return !! window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })();

Simplicity.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 20000);
Simplicity.renderer = supportsWebGL? new THREE.WebGLRenderer({ antialias: true }): new THREE.CanvasRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new StateManager();

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1500;
Simplicity.camera.position.y = 1000;
Simplicity.renderer.setClearColor(0x373B44, 1);

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

export default Simplicity;
