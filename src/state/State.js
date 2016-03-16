import Simplicity from '../Simplicity';

class State {
  constructor() {}
  preload() {}
  create() {}
  update() {}
  render() {}
  destroy() {
    Simplicity.clear();
  }
}

export default State;
