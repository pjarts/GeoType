export {
    base32Encode as encode,
    base32Decode as decode,
    canDecode
}

import * as Integer from './Integer'

const CHAR_MAP = '0123456789bcdefghjkmnpqrstuvwxyz'
const CHAR_BITS = 5

/**
* Encode an array of bits into a base 32 string
* @param  {Array} bits
* @return {String}
*/
function base32Encode(bits) {
    let hash = ''

    for (var i = 0, len = bits.length; i < len; i += CHAR_BITS) {
        hash += CHAR_MAP[Integer.encode(bits.slice(i, i + CHAR_BITS))]
    }

    return hash
}

/**
* Decode a base 32 string into an array of bits
* @param  {String} hash
* @return {Array}
*/
function base32Decode(hash) {
    if (!canDecode(hash)) {
        throw "Cannot decode '" + hash + "'. "
            + "Expected a string containing only characters "
            + "from the base 32 character map"
    }
    let bits = [], val
    for (var i = 0; i < hash.length; i++) {
        val = CHAR_MAP.indexOf(hash[i])
        bits = bits.concat(Integer.decode(val, CHAR_BITS))
    }
    return bits
}

/**
 * Check if value can be decoded
 * @param  {mixed} value
 * @return {Boolean}
 */
function canDecode(value) {
    if (typeof value !== 'string') return false
    let len = value.length
    while (--len >= 0) {
        if (CHAR_MAP.indexOf(value[len]) < 0) return false
    }
    return true
}
