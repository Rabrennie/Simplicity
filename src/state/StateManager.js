class StateManager {
  constructor() {
    this.states = {}
    this.currentState = { name:null, state:null };
    this.scene = new THREE.Scene();
    this.doLoop = true;

  }

  add(name, state) {
    this.states[name] = state;
  }

  load(name) {
    if(!this.states[name]) {
      console.error('Cannot load state ' + name);
      return;
    }

    if(this.currentState.state) {
      this.currentState.state.destroy();
    }

    this.scene = new THREE.Scene();
    const state = new this.states[name]();
    this.currentState = { name, state };

    
    state.preload();
    state.create()

  }

  loop() {
    this.currentState.state.update();
    this.currentState.state.render();
  }
}

export default StateManager;
