import { getBit } from '../helper';
import { Cell } from '../structure';

const Integer = {
  encode(cell, numBits) {
    let hash = 0;
    cell.forEachBit((bit) => {
      hash = (hash * 2) + bit;
    }, numBits);
    return hash;
  },
  decode(hash, numBits) {
    let nBit = numBits - 1;
    const cell = new Cell();
    while (nBit >= 0) {
      cell.addBit(getBit(hash, nBit));
      nBit -= 1;
    }
    return cell;
  },
};

export default Integer;
