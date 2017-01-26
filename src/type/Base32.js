export {
    base32Encode as encode,
    base32Decode as decode,
    canDecode
}

import { Cell } from '../structure'

import { getBit } from '../helper'

const CHAR_MAP = '0123456789bcdefghjkmnpqrstuvwxyz'
const CHAR_BITS = 5

/**
* Encode an array of bits into a base 32 string
* @param  {Array} bits
* @return {String}
*/
function base32Encode(cell, numBits) {
    numBits = numBits || cell.numBits
    let hash = '',
        charVal = 0

    while (--numBits >= 0) {
        charVal = charVal * 2 + cell.getBit(numBits)
        if ((cell.numBits - numBits) % 5 === 0) {
            hash += CHAR_MAP[charVal]
            charVal = 0
        }
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
    let cell = Cell(), val, curBit
    for (var i = 0; i < hash.length; i++) {
        val = CHAR_MAP.indexOf(hash[i])
        curBit = CHAR_BITS
        while (--curBit >= 0) {
            cell.addBit(getBit(val, curBit))
        }
    }
    return cell
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
