'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBit = getBit;
exports.getInitRanges = getInitRanges;
exports.which = which;
exports.getLastBitIdx = getLastBitIdx;
exports.bitAdd = bitAdd;

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBit(value, bit) {
    return (value & 1 << bit) === 0 ? 0 : 1;
}

function getInitRanges() {
    var _ref;

    return _ref = {}, _defineProperty(_ref, _constants.LAT, [-90, 90]), _defineProperty(_ref, _constants.LON, [-180, 180]), _ref;
}

function which(bit) {
    return bit % 2 === 0 ? _constants.LON : _constants.LAT;
}

function getLastBitIdx(bits, angle) {
    var bitLengthIsEven = bits.length % 2 === 0;
    var lastBit = bits.length - 1;
    if (bitLengthIsEven && angle === _constants.LON || !bitLengthIsEven && angle === _constants.LAT) {
        lastBit--;
    }
    return lastBit;
}

function bitAdd(bits, value, angle) {
    var changeBit = value > 0 ? 1 : 0;
    var dir = value > 0 ? 1 : -1;
    var lastBit = angle ? getLastBitIdx(bits, angle) : bits.length - 1;
    var step = angle ? 2 : 1;
    var curBit = lastBit;
    while (value && curBit >= 0) {
        if (bits[curBit] !== changeBit) {
            bits[curBit] = 1 - bits[curBit];
            value -= dir;
            curBit = lastBit;
        } else {
            bits[curBit] = 1 - bits[curBit];
            curBit -= step;
        }
    }
}