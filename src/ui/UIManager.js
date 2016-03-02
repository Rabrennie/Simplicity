class UIManager {
  constructor() {
    this.elems = {}
    this.wrapper = document.getElementsByClassName('ui')[0];
  }

  add(name, html, parent) {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.className = name;
    if(parent) {
      parent.appendChild(div);
    } else {
      this.wrapper.appendChild(div);
    }
    this.elems[name] = div;
  }

  get(name) {
    return this.elems[name];
  }

  remove(name) {
    this.get(name).remove();
  }

  update(name, html) {
    this.get(name).innerHTML = html;
  }
}

export default UIManager;
