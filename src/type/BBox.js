import * as structure from '../structure';

const BBox = type => ({
  encode: (bbox, bits) => ({
    sw: type.encode(bbox.value.sw.structure, bits),
    ne: type.encode(bbox.value.ne.structure, bits),
  }),
  decode: (bbox, bits) => new structure.BBox({
    sw: type.decode(bbox.sw, bits),
    ne: type.decode(bbox.ne, bits),
  }),
  canEncode: struct => struct.constructor === structure.BBox
    && struct.value.sw.structure.constructor === structure.Cell
    && struct.value.ne.structure.constructor === structure.Cell,
  canDecode: value => value && value.sw && value.ne
    && type.canDecode(value.sw)
    && type.canDecode(value.ne),
});

export default BBox;
