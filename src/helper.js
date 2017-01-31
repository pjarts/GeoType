import * as structure from './structure';

export const getBit = (value, bit) => (value / (2 ** bit)) & 0x01;

export const getInitRanges = () => [[-180, 180], [-90, 90]];

/**
* Run callback on all structures in a tree where test returns true
* @param  {Object}   root
* @param  {Function}   test
* @param  {Function} cb
* @return {Mixed}
*/
export const transformStructure = (root, matchStruct, cb) => {
  if (matchStruct(root) === true) {
    return cb(root);
  }
  if (typeof root.getContainers === 'function') {
    const containers = root.getContainers();
    for (let i = 0; i < containers.length; i += 1) {
      containers[i].structure = transformStructure(
        containers[i].structure, matchStruct, cb,
      );
    }
  }
  return root;
};

export const isCell = struct => struct.constructor === structure.Cell;

export default {
  getBit,
  getInitRanges,
  transformStructure,
  isCell,
};
