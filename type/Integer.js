export {
    integerEncode as encode,
    integerDecode as decode,
    canDecode
}

import { LAT, LON } from '../constants'

import { getBit } from '../helper'

/**
* Encode an array of bits into an integer
* @param  {Array} bits
* @return {Number}
*/
function integerEncode(bits) {
    return bits.reduce((hash, bit) => hash * 2 + bit, 0)
}

/**
* Decode an integer hash into an array of bits
* @param  {Number} hash
* @param  {Number} numBits
* @return {Array}
*/
function integerDecode(hash, numBits) {
    if (!canDecode(hash)) {
        throw 'Cannot decode' + hash + '. Expected an integer.'
    }
    numBits = numBits || 52
    let bits = []
    while (--numBits >= 0) {
        bits.push(getBit(hash, numBits))
    }
    return bits
}

/**
 * Check if value can be decoded
 * @param  {mixed} hash
 * @return {Boolean}
 */
function canDecode(hash) {
    return typeof hash === 'number' && Math.floor(hash) === hash
}
