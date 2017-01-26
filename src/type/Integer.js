export {
    integerEncode as encode,
    integerDecode as decode,
    canDecode
}

import { getBit } from '../helper'
import { Cell } from '../structure'

/**
* Encode an array of bits into an integer
* @param  {Array} bits
* @return {Number}
*/
function integerEncode(cell, numBits) {
    numBits = numBits || cell.numBits
    let hash = 0
    while (--numBits >= 0) {
        hash = hash * 2 + cell.getBit(numBits)
    }
    return hash
}

/**
* Decode an integer hash into an array of bits
* @param  {Number} hash
* @param  {Number} numBits
* @return {Array}
*/
function integerDecode(hash, numBits) {
    let cell = Cell()
    while (--numBits >= 0) {
        cell.addBit(getBit(hash, numBits))
    }
    return cell
}

/**
 * Check if value can be decoded
 * @param  {mixed} hash
 * @return {Boolean}
 */
function canDecode(hash) {
    return typeof hash === 'number' && Math.floor(hash) === hash
}
