import * as type from './type'
import * as transform from './transform'
import * as structure from './structure'
import * as constant from './constants'

export {
    type,
    transform,
    constant
}

export default GeoCell

import { transformStructure } from './helper'

function GeoCell(toType, toBits) {
    if (!toType || !toType.encode) {
        throw new Error("Cannot convert to type '" + typeof toType + "'")
    }
    let transforms = []
    let fromType = toType, fromBits = toBits
    return {
        transform(trans, opts) {
            if (typeof trans.transform !== 'function') {
                throw new Error("Expected a transform object, got " + typeof trans)
            }
            transforms.push({ trans, opts })
            return this
        },
        from(type, bits) {
            if (!type || !type.decode) {
                throw new Error("Cannot convert from type '" + typeof type + "'")
            }
            fromType = type
            fromBits = bits || fromBits
            return this
        },
        convert(value) {
            console.log(value, 'value')
            if (!fromType.canDecode(value)) {
                throw new Error("Cannot decode value using type '" + fromType.decode.name + "'. "
                + "Please specify the correct from type using the .from() method")
            }
            let struct = fromType.decode(value, fromBits)
            const isCell = (struct) => struct._type === structure.Cell

            transforms.forEach(t => {
                struct = transformStructure(
                    struct,
                    t.trans.canTransform || isCell,
                    (struct) => t.trans.transform(struct, t.opts)
                )
            })

            struct = transformStructure(
                struct,
                toType.canEncode || isCell,
                (struct) => toType.encode(struct, toBits)
            )

            return structure.Container(struct).render()
        }
    }
}
