class UIManager {
  constructor() {
    this.elems = {}
    this.wrapper = document.getElementsByClassName('ui')[0];
  }

  add(name, html, parent) {
    const div = document.createElement('div');
    if(parent) {
      parent.appendChild(div);
    } else {
      this.wrapper.appendChild(div);
    }
    div.innerHTML = html;
    div.className = name;
    this.elems[name] = div;

    return div;
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

  clear() {
    for (var elem in this.elems) {
      if (this.elems.hasOwnProperty(elem)) {
        this.get(elem).remove();
      }
    }
  }
}

export default UIManager;
