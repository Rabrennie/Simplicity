class StateManager {
  constructor() {
    this.states = {}
    this.currentState = { name:null, state:null };
    this.scene = new THREE.Scene();
  }

  add(name, state) {
    this.states[name] = state;
  }

  load(name) {
    if(!this.states[name]) {
      console.error('Cannot load state ' + name);
      return;
    }

    this.scene = new THREE.Scene();

    const state = this.states[name];

    state.preload();
    state.create();

    this.currentState = { name, state };
  }

  loop() {
    this.currentState.state.update();
    this.currentState.state.render();
  }
}

export default StateManager;
