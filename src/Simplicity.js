import StateManager from './state/StateManager';

const Simplicity = {};

Simplicity.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
Simplicity.renderer = new THREE.WebGLRenderer({ antialias: true });
Simplicity.keysDown = {};
Simplicity.StateManager = new StateManager();

Simplicity.renderer.setSize(window.innerWidth, window.innerHeight);
Simplicity.camera.position.z = 1000;
Simplicity.camera.position.y = 300;
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
