import { Cell } from '../structure';
import { getBit } from '../helper';

const CHAR_MAP = '0123456789bcdefghjkmnpqrstuvwxyz';
const CHAR_BITS = 5;

const Base32 = {
  encode(cell, numBits) {
    let hash = '';
    let charVal = 0;
    let i = 1;
    cell.forEachBit((bit) => {
      charVal = (charVal * 2) + bit;
      if (i % 5 === 0) {
        hash += CHAR_MAP[charVal];
        charVal = 0;
      }
      i += 1;
    }, numBits);
    return hash;
  },
  decode(hash) {
    const cell = new Cell();
    let val; let curBit;
    for (let i = 0; i < hash.length; i += 1) {
      val = CHAR_MAP.indexOf(hash[i]);
      curBit = CHAR_BITS - 1;
      while (curBit >= 0) {
        cell.addBit(getBit(val, curBit));
        curBit -= 1;
      }
    }
    return cell;
  },
};

export default Base32;
