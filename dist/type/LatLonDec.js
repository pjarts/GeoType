'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDecode = exports.decode = exports.encode = undefined;

var _structure = require('../structure');

var _helper = require('../helper');

exports.encode = latLonDecEncode;
exports.decode = latLonDecDecode;
exports.canDecode = canDecode;


/**
* Encode an array of bits into latitude and longitude
* decimal values
* @param  {Array} bits
* @return {Object} [{
*     lat: Number,
*     lon: Number,
*     error: {
*         lat: Number,
*         lon: Number
*     }
* }]
*/
function latLonDecEncode(cell, numBits) {
    numBits = numBits || cell.numBits;
    var range = (0, _helper.getInitRanges)(),
        i = 0,
        which = void 0;

    while (--numBits >= 0) {
        which = i++ % 2;
        splitRange(range[which], range[which][cell.getBit(numBits)]);
    }

    var res = {
        lon: (range[0][0] + range[0][1]) / 2,
        lat: (range[1][0] + range[1][1]) / 2
    };
    res.error = {
        lon: range[0][1] - res.lon,
        lat: range[1][1] - res.lat
    };

    return res;
}

/**
* Decode latitude and longitude decimal values into
* an array of bits
* @param  {Object} latLon  { lat: number, lon: number }
* @param  {Number} numBits
* @return {Array}
*/
function latLonDecDecode(latLon, numBits) {
    if (!canDecode(latLon)) {
        throw "Cannot decode '" + latLon + "'. " + "Expected an object with `lat` and `lon` properties";
    }
    numBits = numBits || 52;

    var range = (0, _helper.getInitRanges)();

    var target = [latLon.lon, latLon.lat];

    var cell = (0, _structure.Cell)(),
        which = void 0;

    for (var i = 0; i < numBits; i++) {
        which = i % 2;
        cell.addBit(splitRange(range[which], target[which]));
    }

    return cell;
}

function splitRange(range, target) {
    var avg = (range[0] + range[1]) / 2;
    var updateEdge = target > avg ? 0 : 1;
    var producedBit = updateEdge === 0 ? 1 : 0;
    range[updateEdge] = avg;
    return producedBit;
}

function canDecode(value) {
    return value && typeof value.lat === 'number' && typeof value.lon === 'number';
}