import Container from './Container';

class List {
  constructor(value) {
    this.value = value ? value.map(v => new Container(v)) : [];
  }
  getContainers() {
    return this.value;
  }
  addCell(cell) {
    this.value.push(new Container(cell));
    return this;
  }
  render() {
    return this.value.map(container => container.render());
  }
}

export default List;
