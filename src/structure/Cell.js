import { getBit } from '../helper';

class Cell {
  constructor(bits) {
    this.value = [0, 0];
    this.numBits = 0;
    if (bits && bits instanceof Array) {
      this.addBits(bits);
    }
  }
  get lon() { return this.value[0]; }
  set lon(lon) { this.value[0] = lon; }
  get lat() { return this.value[1]; }
  set lat(lat) { this.value[1] = lat; }
  addBit(bit) {
    if (this.numBits === 52) {
      throw new Error('Cannot store more than 52 bits');
    }
    const i = this.numBits % 2;
    this.value[i] = (this.value[i] << 1) + bit;
    this.numBits += 1;
    return this;
  }
  addBits(bits) {
    bits.forEach(bit => this.addBit(bit));
    return this;
  }
  getBit(n) {
    const i = (this.numBits - 1 - n) % 2;
    const numBit = Math.floor(n / 2);
    return getBit(this.value[i], numBit);
  }
  forEachBit(cb, limit) {
    const endBit = limit ? this.numBits - limit : 0;
    let nBit = this.numBits - 1;
    while (nBit >= endBit) {
      cb(this.getBit(nBit), nBit);
      nBit -= 1;
    }
  }
  clone() {
    const cell = new Cell();
    cell.value = this.value.slice();
    cell.numBits = this.numBits;
    return cell;
  }
}

export default Cell;
