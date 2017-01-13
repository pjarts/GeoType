'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDecode = exports.decode = exports.encode = undefined;

var _constants = require('../constants');

var _helper = require('../helper');

exports.encode = integerEncode;
exports.decode = integerDecode;
exports.canDecode = canDecode;


/**
* Encode an array of bits into an integer
* @param  {Array} bits
* @return {Number}
*/
function integerEncode(bits) {
    return bits.reduce(function (hash, bit) {
        return hash * 2 + bit;
    }, 0);
}

/**
* Decode an integer hash into an array of bits
* @param  {Number} hash
* @param  {Number} numBits
* @return {Array}
*/
function integerDecode(hash, numBits) {
    if (!canDecode(hash)) {
        throw 'Cannot decode' + hash + '. Expected an integer.';
    }
    numBits = numBits || 52;
    var bits = [];
    while (--numBits >= 0) {
        bits.push((0, _helper.getBit)(hash, numBits));
    }
    return bits;
}

/**
 * Check if value can be decoded
 * @param  {mixed} hash
 * @return {Boolean}
 */
function canDecode(hash) {
    return typeof hash === 'number' && Math.floor(hash) === hash;
}