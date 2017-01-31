class Container {
  constructor(struct) {
    this.structure = struct;
  }
  render() {
    if (typeof this.structure.render === 'function') {
      return this.structure.render();
    }
    return this.structure;
  }
}

export default Container;
