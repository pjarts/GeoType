const type = require('./type')
const transform = require('./transform')

export {
    type,
    transform
}
export default GeoType

/**
 * Some transform functions may output an array of bit arrays.
 * This function looks deep into nested arrays and runs a callback
 * on all arrays that looks like bit arrays
 * @param  {Array} output
 * @param  {Function} cb
 * @param  {Mixed} opts
 * @return {Array}
 */
function runDeep(output, cb, opts) {
    return Array.isArray(output[0])
        ? output.map(val => runDeep(val, cb, opts))
        : cb(output, opts)
}

function GeoType(toType, toBits) {
    if (!toType || !toType.encode) {
        throw new Error("Cannot convert to type '" + typeof toType + "'")
    }
    let transforms = []
    let fromType = toType, fromBits = toBits
    return {
        transform(tFunc, opts) {
            if (typeof tFunc !== 'function') {
                throw new Error("Expected a transform function, got " + typeof tFunc)
            }
            transforms.push({ func: tFunc, opts: opts })
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
            if (!fromType.canDecode(value)) {
                throw new Error("Cannot decode value using type '" + fromType.decode.name + "'. "
                + "Please specify the correct from type using the .from() method")
            }
            let output = fromType.decode(value, fromBits)
            transforms.forEach(trans => {
                output = runDeep(output, trans.func, trans.opts)
            })
            output = runDeep(output, toType.encode, toBits || fromBits)
            return output
        }
    }
}
