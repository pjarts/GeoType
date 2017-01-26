export default BBoxType

import { BBox } from '../structure'

function BBoxType(type) {
    return {
        encode: (bbox, bits) => ({
            sw: type.encode(bbox.value.sw.structure, bits),
            ne: type.encode(bbox.value.ne.structure, bits)
        }),
        decode: (bbox, bits) => BBox({
            sw: type.decode(bbox.sw, bits),
            ne: type.decode(bbox.ne, bits)
        }),
        canEncode: (struct) => struct._type === BBox
            && struct.value.sw.structure._type === Cell
            && struct.value.ne.structure._type === Cell,
        canDecode: (value) => value && value.sw && value.ne
            && type.canDecode(value.sw)
            && type.canDecode(value.ne)
    }
}
