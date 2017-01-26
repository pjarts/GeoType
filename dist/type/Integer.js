'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDecode = exports.decode = exports.encode = undefined;

var _helper = require('../helper');

var _structure = require('../structure');

exports.encode = integerEncode;
exports.decode = integerDecode;
exports.canDecode = canDecode;


/**
* Encode an array of bits into an integer
* @param  {Array} bits
* @return {Number}
*/
function integerEncode(cell, numBits) {
    numBits = numBits || cell.numBits;
    var hash = 0;
    while (--numBits >= 0) {
        hash = hash * 2 + cell.getBit(numBits);
    }
    return hash;
}

/**
* Decode an integer hash into an array of bits
* @param  {Number} hash
* @param  {Number} numBits
* @return {Array}
*/
function integerDecode(hash, numBits) {
    var cell = (0, _structure.Cell)();
    while (--numBits >= 0) {
        cell.addBit((0, _helper.getBit)(hash, numBits));
    }
    return cell;
}

/**
 * Check if value can be decoded
 * @param  {mixed} hash
 * @return {Boolean}
 */
function canDecode(hash) {
    return typeof hash === 'number' && Math.floor(hash) === hash;
}