import Container from './Container';

class BBox {
  constructor(value) {
    this.value = {
      sw: new Container(value.sw),
      ne: new Container(value.ne),
    };
  }
  getContainers() {
    return [this.value.sw, this.value.ne];
  }
  render() {
    return {
      sw: this.value.sw.render(),
      ne: this.value.ne.render(),
    };
  }
}

export default BBox;
