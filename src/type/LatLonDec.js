import { Cell } from '../structure';
import { getInitRanges } from '../helper';

function splitRange(range, target) {
  const avg = (range[0] + range[1]) / 2;
  const updateEdge = target > avg ? 0 : 1;
  const newRange = range.slice();
  newRange[updateEdge] = avg;
  return {
    range: newRange,
    bit: 1 - updateEdge,
  };
}

const LatLonDec = {
  encode(cell, numBits) {
    const range = getInitRanges();
    let i = 0;
    let which;
    cell.forEachBit((bit) => {
      which = i % 2;
      range[which] = splitRange(range[which], range[which][bit]).range;
      i += 1;
    }, numBits);
    const res = {
      lon: (range[0][0] + range[0][1]) / 2,
      lat: (range[1][0] + range[1][1]) / 2,
    };
    res.error = {
      lon: range[0][1] - res.lon,
      lat: range[1][1] - res.lat,
    };
    return res;
  },
  decode(latLon, numBits = 52) {
    const range = getInitRanges();
    const target = [latLon.lon, latLon.lat];
    const cell = new Cell();
    let which;
    let split;
    for (let i = 0; i < numBits; i += 1) {
      which = i % 2;
      split = splitRange(range[which], target[which]);
      range[which] = split.range;
      cell.addBit(split.bit);
    }
    return cell;
  },
};

export default LatLonDec;
